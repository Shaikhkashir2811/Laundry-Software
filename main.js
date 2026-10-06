// FILE: main.js
// This file is the main process and handles IPC communication with the renderer process.
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const bcrypt = require('bcrypt');
const api = require('./database/api');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'src/js/preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    win.loadFile(path.join(__dirname, 'src/index.html'));
    // win.webContents.openDevTools();
}

app.whenReady().then(() => {
    Menu.setApplicationMenu(null);
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// IPC handlers for Admin Management
ipcMain.handle('check-admin', async () => {
    try {
        const exists = await api.checkIfAdminExists();
        return { success: true, exists: exists };
    } catch (error) {
        console.error('Failed to check for admin:', error);
        return { success: false, error: error.message };
    }
});

ipcMain.handle('create-admin', async (event, { username, password }) => {
    try {
        const newAdmin = await api.createAdmin(username, password);
        return { success: true, admin: newAdmin };
    } catch (error) {
        console.error('Failed to create admin:', error);
        return { success: false, error: error.message };
    }
});

ipcMain.handle('login-admin', async (event, { username, password }) => {
    try {
        const admin = await api.getAdminByUsername(username);
        if (!admin) {
            return { success: false, error: 'User not found.' };
        }
        const isMatch = await bcrypt.compare(password, admin.password_hash);
        if (isMatch) {
            return { success: true, admin: { admin_id: admin.admin_id, username: admin.username } };
        } else {
            return { success: false, error: 'Incorrect password.' };
        }
    } catch (error) {
        console.error('Login failed:', error);
        return { success: false, error: error.message };
    }
});

ipcMain.handle('update-password', async (event, { username, newPassword }) => {
    try {
        const updatedAdmin = await api.updateAdminPassword(username, newPassword);
        return { success: true, admin: { admin_id: updatedAdmin.admin_id, username: updatedAdmin.username } };
    } catch (error) {
        console.error('Password update failed:', error);
        return { success: false, error: error.message };
    }
});

// IPC handlers for Orders and Records
ipcMain.handle('get-services', async () => {
    try {
        const res = await api.getServices();
        return { success: true, data: res };
    } catch (err) {
        console.error('Failed to get services:', err);
        return { success: false, error: err.message };
    }
});

ipcMain.handle('get-items', async () => {
    try {
        const res = await api.getItems();
        return { success: true, data: res };
    } catch (err) {
        console.error('Failed to get items:', err);
        return { success: false, error: err.message };
    }
});



ipcMain.handle('add-customer', async (event, { name, phone }) => {
    try {
        const res = await api.addCustomer(name, phone);
        return { success: true, data: res };
    } catch (err) {
        console.error('Failed to add customer:', err);
        return { success: false, error: err.message };
    }
});



ipcMain.handle('get-customer-by-phone', async (event, phone) => {
    try {
        const res = await api.getCustomerByPhone(phone);
        return { success: true, data: res };
    } catch (err) {
        console.error('Failed to get customer:', err);
        return { success: false, error: err.message };
    }
});


ipcMain.handle('save-invoice', async (event, invoiceData) => {
    try {
        const res = await api.saveInvoice(invoiceData);
        return { success: true, invoice_id: res.invoice_id };
    } catch (err) {
        console.error('Failed to save invoice:', err);
        return { success: false, error: err.message };
    }
});

ipcMain.handle('get-invoices', async () => {
    try {
        const res = await api.getInvoices();
        return { success: true, data: res };
    } catch (error) {
        console.error("Error getting invoices:", error);
        return { success: false, error: error.message };
    }
});

// In your main.js or ipc.js file
ipcMain.handle('update-invoice-payment-status', async (event, invoiceId, newStatus, paidDate) => {
    try {
        await api.updateInvoicePaymentStatus(invoiceId, newStatus, paidDate);
        return { success: true };
    } catch (error) {
        console.error('Failed to update invoice payment status:', error);
        return { success: false, error: error.message };
    }
});

ipcMain.handle('add-service', async (event, serviceName) => {
    try {
        await api.addService(serviceName);
        return { success: true };
    } catch (err) {
        console.error('Failed to add service:', err);
        return { success: false, error: err.message };
    }
});

ipcMain.handle('delete-service', async (event, serviceName) => {
    try {
        const result = await api.deleteService(serviceName);
        if (result) {
            return { success: true };
        } else {
            return { success: false, error: "Service not found or already deleted." };
        }
    } catch (err) {
        console.error('Failed to delete service:', err);
        return { success: false, error: err.message };
    }
});

ipcMain.handle('add-item', async (event, { item_name }) => {
    try {
        await api.addItem(item_name);
        return { success: true };
    } catch (err) {
        console.error('Failed to add item:', err);
        return { success: false, error: err.message };
    }
});


ipcMain.handle('delete-item', async (event, itemName) => {
    try {
        const result = await api.deleteItem(itemName);
        if (result) {
            return { success: true };
        } else {
            return { success: false, error: "Item not found or already deleted." };
        }
    } catch (err) {
        console.error('Failed to delete item:', err);
        return { success: false, error: err.message };
    }
});



// Correct IPC handlers for staff
ipcMain.handle('get-staff', async () => {
    try {
        const result = await api.getStaff();
        return { success: true, data: result };
    } catch (error) {
        console.error('Error fetching staff:', error);
        return { success: false, error: error.message };
    }
});

// Add new staff member
ipcMain.handle('add-staff', async (event, staffData) => {
    try {
        const result = await api.addStaff(staffData);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error adding staff:', error);
        return { success: false, error: error.message };
    }
});

// Update staff member
ipcMain.handle('update-staff', async (event, staffData) => {
    try {
        const result = await api.updateStaff(staffData);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error updating staff:', error);
        return { success: false, error: error.message };
    }
});

// Delete staff member
ipcMain.handle('delete-staff', async (event, staffId) => {
    try {
        const result = await api.deleteStaff(staffId);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error deleting staff:', error);
        return { success: false, error: error.message };
    }
});

// Get staff member by ID
ipcMain.handle('get-staff-by-id', async (event, staffId) => {
    try {
        const result = await api.getStaffById(staffId);
        return { success: true, data: result };
    } catch (error) {
        console.error('Error fetching staff by ID:', error);
        return { success: false, error: error.message };
    }
});


ipcMain.handle('get-dashboard-data', async (event, month, year) => {
    try {
        const data = await api.getDashboardData(month, year);
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error.message };
    }
});