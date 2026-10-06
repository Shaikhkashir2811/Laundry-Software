// FILE: database/api.js

const db = require('./db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * Checks if the 'admins' table exists and has at least one user.
 * If the table does not exist, it creates it.
 * @returns {Promise<boolean>} - True if an admin exists, false otherwise.
 */
async function checkIfAdminExists() {
    try {
        const res = await db.query(`
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables 
                WHERE table_name = 'admins'
            )
        `);
        const tableExists = res.rows[0].exists;

        if (!tableExists) {
            await db.query(`
                CREATE TABLE admins (
                    admin_id SERIAL PRIMARY KEY,
                    username VARCHAR(255) UNIQUE NOT NULL,
                    password_hash VARCHAR(255) NOT NULL
                );
            `);
            return false;
        }

        const adminCount = await db.query('SELECT COUNT(*) FROM admins');
        return parseInt(adminCount.rows[0].count, 10) > 0;
    } catch (err) {
        console.error('Database error in checkIfAdminExists:', err);
        throw err;
    }
}

/**
 * Creates a new admin user.
 */
async function createAdmin(username, password) {
    try {
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const res = await db.query(
            'INSERT INTO admins(username, password_hash) VALUES ($1, $2) RETURNING *',
            [username, passwordHash]
        );
        return res.rows[0];
    } catch (err) {
        console.error('Database error in createAdmin:', err);
        throw err;
    }
}

/**
 * Fetches an admin user by username.
 */
async function getAdminByUsername(username) {
    try {
        const res = await db.query(
            'SELECT admin_id, username, password_hash FROM admins WHERE username = $1',
            [username]
        );
        return res.rows[0];
    } catch (err) {
        console.error('Database error in getAdminByUsername:', err);
        throw err;
    }
}

/**
 * Updates an admin's password.
 */
async function updateAdminPassword(username, newPassword) {
    try {
        const passwordHash = await bcrypt.hash(newPassword, saltRounds);
        const res = await db.query(
            'UPDATE admins SET password_hash = $1 WHERE username = $2 RETURNING *',
            [passwordHash, username]
        );
        return res.rows[0];
    } catch (err) {
        console.error('Password update failed:', err);
        throw err;
    }
}

/**
 * Saves a new invoice.
 */
/*
 * Saves a new invoice to the database.
 * @param {object} invoiceData - The invoice data to be saved.
 */
async function saveInvoice(invoiceData) {
    const { 
        customer_name, 
        customer_phone, 
        items, 
        discount, 
        total_amount, 
        payment_method, 
        payment_status 
    } = invoiceData;

    try {
        // order_date is always the current date of the order creation.
        const order_date = new Date();

        // paid_date is set only if the payment_status is 'Paid'.
        const paid_date = (payment_status === 'Paid') ? new Date() : null;

        const res = await db.query(
            'INSERT INTO invoices(customer_name, customer_phone, order_date, items, discount, total_amount, payment_method, payment_status, paid_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING invoice_id',
            [
                customer_name, 
                customer_phone, 
                order_date, 
                JSON.stringify(items), 
                discount, 
                total_amount, 
                payment_method, 
                payment_status,
                paid_date 
            ]
        );
        
        return res.rows[0];
    } catch (error) {
        console.error('Failed to save invoice:', error);
        throw error;
    }
}

/**
 * Fetches all services.
 */
async function getServices() {
    try {
        const res = await db.query('SELECT service_name FROM services');
        return res.rows;
    } catch (err) {
        throw err;
    }
}

/**
 * Fetches all items.
 */
async function getItems() {
    try {
        const res = await db.query('SELECT item_name     FROM items');
        return res.rows;
    } catch (err) {
        throw err;
    }
}

/**
 * Fetches a customer record by phone number.
 */
async function getCustomerByPhone(phone) {
    try {
        const res = await db.query('SELECT customer_id, customer_name, phone_number FROM customers WHERE phone_number = $1', [phone]);
        return res.rows[0] || null;
    } catch (err) {
        throw err;
    }
}

/**
 * Fetches all invoices.
 */
async function getInvoices() {
    try {
        const result = await db.query(`
            SELECT
                invoice_id,
                customer_name,
                customer_phone,
                order_date,
                total_amount,
                payment_status,
                payment_method,
                discount,
                items
            FROM invoices
            ORDER BY order_date DESC
        `);
        // console.log(result)
        return result.rows;
    } catch (error) {
        throw error;
    }
}

/**
 * Updates the payment status of a specific invoice.
 */
async function updateInvoicePaymentStatus(id, status) {
    try {
        let paid_date = null;
        
        // If the status is 'Paid', set the paid_date to the current timestamp.
        if (status === 'Paid') {
            paid_date = new Date();
        }

        // Update both payment_status and paid_date in the same query.
        await db.query('UPDATE invoices SET payment_status = $1, paid_date = $2 WHERE invoice_id = $3', [status, paid_date, id]);
        
    } catch (error) {
        throw error;
    }
}

/**
 * Adds a new customer.
 */
async function addCustomer(name, phone) {
    try {
        const res = await db.query(
            'INSERT INTO customers (customer_name, phone_number) VALUES ($1, $2) RETURNING customer_id, customer_name, phone_number',
            [name, phone]
        );
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}


async function addService(serviceName) {
    try {
        const res = await db.query(
            'INSERT INTO services (service_name) VALUES ($1) RETURNING service_name',
            [serviceName]
        );
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}

/**
 * Deletes a service by name.
 */
async function deleteService(serviceName) {
    try {
        // Delete all items associated with this service first
        // This is not needed anymore as the item table is separate
        const res = await db.query('DELETE FROM services WHERE service_name = $1 RETURNING *', [serviceName]);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}



/**
 * Adds a new item.
 */
async function addItem(itemName) {
    try {
        const res = await db.query(
            'INSERT INTO items (item_name) VALUES ($1) RETURNING item_name',
            [itemName]
        );
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}

/**
 * Deletes an item by name.
 */
async function deleteItem(itemName) {
    try {
        const res = await db.query('DELETE FROM items WHERE item_name = $1 RETURNING *', [itemName]);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}

async function getStaff() {
    try {
        const res = await db.query('SELECT * FROM staff ORDER BY name');
        return res.rows;
    } catch (err) {
        throw err;
    }
}

/**
 * Adds a new staff member.
 */
async function addStaff(staffData) {
    try {
        const { name, phone, email, salary } = staffData;
        const res = await db.query(
            'INSERT INTO staff (name, phone, email, salary,  updated_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
            [name, phone, email, salary]
        );
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}

/**
 * Updates an existing staff member.
 */


async function updateStaff(staffData) {
    try {
        const { staff_id, name, phone, email, salary } = staffData;

        const query = `
            UPDATE staff 
            SET name = $2, phone = $3, email = $4, salary = $5, updated_at = NOW() 
            WHERE staff_id = $1 
            RETURNING *
        `;
        const values = [staff_id, name, phone, email, salary];

        const res = await db.query(query, values);

        if (res.rows.length === 0) {
            // Throw an error if no staff member was found to update
            throw new Error(`Staff member with ID ${staff_id} not found.`);
        }

        return res.rows[0];
    } catch (err) {
        // Rethrow the error to be handled by the calling function
        throw err;
    }
}

/**
 * Deletes a staff member by ID.
 */
async function deleteStaff(staffId) {
    try {
        const res = await db.query('DELETE FROM staff WHERE staff_id = $1 RETURNING *', [staffId]);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}

/**
 * Gets a staff member by ID.
 */
async function getStaffById(staffId) {
    try {
        const res = await db.query('SELECT * FROM staff WHERE staff_id = $1', [staffId]);
        return res.rows[0];
    } catch (err) {
        throw err;
    }
}


async function getDashboardData(month, year) {
    try {
        const res = await db.query(
            `SELECT
                paid_date,
                total_amount,
                items
            FROM invoices
            WHERE payment_status = $1 AND paid_date IS NOT NULL`,
            ['Paid']
        );
        
        const paidInvoices = res.rows;

        const todayString = new Date().toISOString().split('T')[0];
        const todayEarnings = paidInvoices
            .filter(invoice => {
                const invoiceDate = new Date(invoice.paid_date);
                return invoiceDate.toISOString().split('T')[0] === todayString;
            })
            .reduce((sum, invoice) => sum + Number(invoice.total_amount), 0);

        const weeklyData = {};
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            weeklyData[dateString] = 0;
        }

        paidInvoices.forEach(invoice => {
            const invoiceDateString = new Date(invoice.paid_date).toISOString().split('T')[0];
            if (weeklyData[invoiceDateString] !== undefined) {
                weeklyData[invoiceDateString] += Number(invoice.total_amount);
            }
        });

        const sortedWeeklyData = Object.keys(weeklyData)
            .map(date => ({ date, amount: weeklyData[date] }))
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        const monthlyServiceEarnings = {};
        let monthlyTotal = 0;

        const invoicesForMonth = paidInvoices.filter(invoice => {
            const d = new Date(invoice.paid_date);
            return d.getMonth() + 1 === month && d.getFullYear() === year;
        });

        invoicesForMonth.forEach(invoice => {
            let items = [];
            try {
                // Attempt to parse the items as JSON
                if (typeof invoice.items === 'string') {
                    items = JSON.parse(invoice.items);
                } else if (typeof invoice.items === 'object' && invoice.items !== null) {
                    // If it's already an object, use it directly
                    items = invoice.items;
                }
            } catch (e) {
                console.error("Failed to parse items for invoice:", invoice, e);
                // In case of a parse error, skip this invoice's items
                items = [];
            }

            items.forEach(item => {
                if (!monthlyServiceEarnings[item.serviceType]) {
                    monthlyServiceEarnings[item.serviceType] = 0;
                }
                monthlyServiceEarnings[item.serviceType] += item.total;
            });
            monthlyTotal += Number(invoice.total_amount);
        });
        
        return {
            todayEarnings,
            weeklyData: sortedWeeklyData,
            monthlyServiceEarnings,
            monthlyTotal,
        };
    } catch (error) {
        console.error("Error in getDashboardData:", error);
        throw error;
    }
}




module.exports = {
    checkIfAdminExists,
    createAdmin,
    getAdminByUsername,
    updateAdminPassword,
    getServices,
    saveInvoice,
    getItems,
    getCustomerByPhone,
    updateInvoicePaymentStatus,
    getInvoices,
    addCustomer,
    addService,
    deleteService,
    addItem,
    deleteItem,
    getStaff,
    addStaff,
    updateStaff,
    deleteStaff,
    getStaffById,
    getDashboardData
};

