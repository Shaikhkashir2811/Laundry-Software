// FILE: src/js/preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    // Admin setup and login functions
    checkAdmin: () => ipcRenderer.invoke('check-admin'),
    createAdmin: (username, password) => ipcRenderer.invoke('create-admin', { username, password }),
    loginAdmin: (username, password) => ipcRenderer.invoke('login-admin', { username, password }),
    updatePassword: (username, newPassword) => ipcRenderer.invoke('update-password', { username, newPassword }),
    getAdmins: () => ipcRenderer.invoke('get-admins'),

    // Invoice and record management functions
    getServices: () => ipcRenderer.invoke('get-services'),
    getItems: () => ipcRenderer.invoke('get-items'),
    getCustomerByPhone: (phone) => ipcRenderer.invoke('get-customer-by-phone', phone),
    addCustomer: (name, phone) => ipcRenderer.invoke('add-customer', { name, phone }),
    saveInvoice: (invoiceData) => ipcRenderer.invoke('save-invoice', invoiceData),
    getInvoices: () => ipcRenderer.invoke('get-invoices'),
    updateInvoicePaymentStatus: (id, status) => ipcRenderer.invoke('update-invoice-payment-status', id, status),
    addService: (serviceName) => ipcRenderer.invoke('add-service', serviceName),
    deleteService: (serviceId) => ipcRenderer.invoke('delete-service', serviceId),
    addItem: (itemData) => ipcRenderer.invoke('add-item', itemData),
    deleteItem: (itemId) => ipcRenderer.invoke('delete-item', itemId),
    getStaff: () => ipcRenderer.invoke('get-staff'),
    addStaff: (staffData) => ipcRenderer.invoke('add-staff', staffData),
    updateStaff: (staffData) => ipcRenderer.invoke('update-staff', staffData),
    deleteStaff: (staffId) => ipcRenderer.invoke('delete-staff', staffId),
    getStaffById: (staffId) => ipcRenderer.invoke('get-staff-by-id', staffId),
    getDashboardData: (month, year) => ipcRenderer.invoke('get-dashboard-data', month, year),
});

