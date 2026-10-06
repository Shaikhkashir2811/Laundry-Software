
// This function renders the 'First-Time Setup' form.
function renderSetupForm() {
    const appContainer = document.getElementById('app-container');
    appContainer.className = '';
    appContainer.innerHTML = `
        <h2 class="title">Admin First-Time Setup</h2>
        <form id="setup-form">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div class="form-group">
                <label for="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" name="confirm-password" required>
            </div>
            <button type="submit">Create Admin</button>
            <p id="message"></p>
        </form>
    `;

    document.getElementById('setup-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const messageEl = document.getElementById('message');

        if (password !== confirmPassword) {
            messageEl.textContent = 'Passwords do not match.';
            return;
        }

        const response = await window.api.createAdmin(username, password);

        if (response.success) {
            messageEl.textContent = 'Admin created successfully! Redirecting to login...';
            messageEl.style.color = '#4caf50';
            setTimeout(() => {
                renderLoginForm();
            }, 2000);
        } else {
            messageEl.textContent = `Error: ${response.error}`;
        }
    });
}

// This function renders the standard login form.
function renderLoginForm() {
    const appContainer = document.getElementById('app-container');
    appContainer.className = '';
    appContainer.innerHTML = `
        <h2 class="title">Admin Login</h2>
        <form id="login-form">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit">Login</button>
            <p id="message"></p>
        </form>
        <span class="switch-link" id="forgot-password-link">Forgot Password?</span>
    `;

    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const messageEl = document.getElementById('message');

        const response = await window.api.loginAdmin(username, password);

        if (response.success) {
            messageEl.textContent = 'Login successful!';
            messageEl.style.color = '#4caf50';
            // On successful login, switch to the animation view.
            // renderAnimatedTransition();
            renderDashboard();
        } else {
            messageEl.textContent = `Error: ${response.error}`;
        }
    });

    document.getElementById('forgot-password-link').addEventListener('click', () => {
        renderForgotPasswordForm();
    });
}

// This function renders the "Forgot Password" form.
function renderForgotPasswordForm() {
    const appContainer = document.getElementById('app-container');
    appContainer.className = '';
    appContainer.innerHTML = `
        <h2 class="title">Reset Password</h2>
        <form id="forgot-password-form">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="new-password">New Password</label>
                <input type="password" id="new-password" name="new-password" required>
            </div>
            <div class="form-group">
                <label for="confirm-new-password">Confirm New Password</label>
                <input type="password" id="confirm-new-password" name="confirm-new-password" required>
            </div>
            <button type="submit">Reset Password</button>
            <p id="message"></p>
        </form>
        <span class="switch-link" id="back-to-login-link">Back to Login</span>
    `;

    document.getElementById('forgot-password-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmNewPassword = document.getElementById('confirm-new-password').value;
        const messageEl = document.getElementById('message');

        if (newPassword !== confirmNewPassword) {
            messageEl.textContent = 'Passwords do not match.';
            return;
        }

        const response = await window.api.updatePassword(username, newPassword);

        if (response.success) {
            messageEl.textContent = 'Password reset successfully! Redirecting to login...';
            messageEl.style.color = '#4caf50';
            setTimeout(() => {
                renderLoginForm();
            }, 2000);
        } else {
            messageEl.textContent = `Error: ${response.error}`;
        }
    });

    document.getElementById('back-to-login-link').addEventListener('click', () => {
        renderLoginForm();
    });
}

// Renders the progress bar animation before the dashboard.
function renderAnimatedTransition() {
    const appContainer = document.getElementById('app-container');
    // Change the main container's class to the full-screen animation class
    appContainer.className = 'animation-container';
    appContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="#000" class="bi bi-water" viewBox="0 0 16 16" style="margin-bottom: 10px;">
          <path d="M5.445 1.45.65 6.845a.5.5 0 0 0 .65 1.05l.385-.226A2.49 2.49 0 0 1 4 10.5C4 11.976 5.235 13 6.75 13c.69 0 1.3-.284 1.75-.826a3.2 3.2 0 0 0 2.222 0C11.986 12.716 12.5 12.433 13 12c1.455-1.029 2.1-3.124 1.524-4.577l-.377-.942c.005-.034.02-.07.05-.118.062-.1.1-.2.13-.243.205-.205.372-.416.505-.623l.111-.174c.241-.393.35-.74.453-.948l.053-.105a1.8 1.8 0 0 0-.256-1.55c-.254-.427-.58-.793-.934-1.12L9.366.509a.5.5 0 0 0-.728.649L12.565 6H.5A.5.5 0 0 0 0 6.5v1A.5.5 0 0 0 .5 8h.5l.383-.225A1.5 1.5 0 0 0 3 6.5C3 6.002 2.822 5.5.5 5.27l.383-.225A1.5 1.5 0 0 0 3 4.5a1.5 1.5 0 0 0-1.285-.945l-.385.226a.5.5 0 0 0-.65-1.05l4.795-5.396.11-.082A.5.5 0 0 0 5.445 1.45z"/>
        </svg>
        <h1 class="laundry-name">Elite Wash</h1>
        <p class="slogan">We wash, you relax.</p>
        <div class="progress-container">
            <div id="progress-bar" class="progress-bar"></div>
        </div>
    `;

    const progressBar = document.getElementById('progress-bar');
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            // After the progress bar is full, transition to the dashboard.
            renderDashboard();
        } else {
            width += 1; // Increase progress by 1% for a longer animation
            progressBar.style.width = width + '%';
        }
    }, 50); // Update every 50ms for a smoother animation
}


// Renders the main dashboard view with the sidebar.
// Function to render the dashboard UI
// Function to render the dashboard UI
// Ensure you have Chart.js included in your HTML file
// <script src="https://cdn.jsdelivr.net/npm/chart.js@^4"></script>

// renderer.js

function renderDashboard() {
    const appContainer = document.getElementById('app-container');
    appContainer.className = 'dashboard-container';
    appContainer.innerHTML = `
        <div class="sidebar">
            <div class="sidebar-title">Elite Wash</div>
            <div class="sidebar-buttons">
                <button class="sidebar-button active" data-content="dashboard">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-speedometer" viewBox="0 0 16 16">
                        <path d="M8 3.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zM4 6.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zM2 9.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zM8 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-1z"/>
                        <path d="M12.9 6.252a8 8 0 1 0-9.8 0A7.965 7.965 0 0 0 1 8a7.965 7.965 0 0 0 1.9 2.748c.621.84.975 1.586 1.15 2.124h6.9a2.592 2.592 0 0 1 .843-2.124A7.965 7.965 0 0 0 15 8a7.965 7.965 0 0 0-2.1-1.748zM8 14A6 6 0 1 1 8 2a6 6 0 0 1 0 12z"/>
                    </svg>
                    Dashboard
                </button>
                <button class="sidebar-button" data-content="orders">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-list-check" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"/>
                        <path d="M1.5 12a.5.5 0 0 0 .5.5h.5a.5.5 0 0 0 .5-.5v-.5a.5.5 0 0 0-.5-.5H2a.5.5 0 0 0-.5.5v.5zm0-4a.5.5 0 0 0 .5.5h.5a.5.5 0 0 0 .5-.5v-.5a.5.5 0 0 0-.5-.5H2a.5.5 0 0 0-.5.5v.5zm0-4a.5.5 0 0 0 .5.5h.5a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2a.5.5 0 0 0-.5.5V4z"/>
                    </svg>
                    Orders
                </button>
                <button class="sidebar-button" data-content="staff">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-badge" viewBox="0 0 16 16">
                        <path d="M6 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V3h-4V2.5zm4 0V3h-4V2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5z"/>
                        <path fill-rule="evenodd" d="M14 6c0-2.209-1.791-4-4-4S6 3.791 6 6s1.791 4 4 4 4-1.791 4-4zm-7 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0zm-1 9a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 1 0v1a.5.5 0 0 1-.5.5z"/>
                    </svg>
                    Staff
                </button>
                <button class="sidebar-button" data-content="services">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                        <path d="M8 12.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                        <path fill-rule="evenodd" d="M14 8a6 6 0 1 1-12 0 6 6 0 0 1 12 0zm-11 0a5 5 0 1 0 10 0 5 5 0 0 0-10 0z"/>
                    </svg>
                    Services & Items
                </button>
                <button class="sidebar-button" data-content="records">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-file-earmark-text" viewBox="0 0 16 16">
                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2z"/>
                        <path fill-rule="evenodd" d="M9.5 3.5V1.5H14v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2.5a1 1 0 0 0 1 1zM4.5 8.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zM4.5 11.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/>
                    </svg>
                    Records
                </button>
            </div>
        </div>
        <div class="main-content">
            <h1 class="content-title" id="content-title">Dashboard</h1>
            <div class="content-area" id="content-area">
                <div class="dashboard-grid">
                    <div class="dashboard-card todays-earnings-card">
                        <h3>Today's Earnings</h3>
                        <p class="earning-amount" id="todays-earning-value">Loading...</p>
                    </div>
                    <div class="dashboard-card">
                        <h3>Weekly Earnings</h3>
                        <canvas id="weekly-chart"></canvas>
                        <table class="data-table" id="weekly-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Earnings (₹)</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                    <div class="dashboard-card">
                        <div class="monthly-header">
                            <h3 class="monthly-title">Monthly Service-wise Earnings</h3>
                            <select id="monthly-select" class="form-select"></select>
                        </div>
                        <canvas id="monthly-chart"></canvas>
                        <table class="data-table" id="monthly-table">
                            <thead>
                                <tr>
                                    <th>Service</th>
                                    <th>Total Earning (₹)</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                            <tfoot>
                                <tr>
                                    <td><strong>Total</strong></td>
                                    <td id="monthly-total"></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;

    appContainer.style.height = '100vh';
    appContainer.style.width = '100vw';

    const contentTitle = document.getElementById('content-title');
    const buttons = document.querySelectorAll('.sidebar-button');
    const monthlySelect = document.getElementById('monthly-select');

    // Populate the month dropdown
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonthIndex = new Date().getMonth();
    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = month;
        if (index === currentMonthIndex) {
            option.selected = true;
        }
        monthlySelect.appendChild(option);
    });

    // Event listeners for sidebar buttons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const contentId = button.dataset.content;
            contentTitle.textContent = contentId.charAt(0).toUpperCase() + contentId.slice(1);

            switch (contentId) {
                case 'orders':
                    renderOrdersPage();
                    break;
                case 'dashboard':
                    renderDashboard();
                    break;
                case 'staff':
                    renderStaffPage();
                    break;
                case 'services':
                    renderServicesPage();
                    break;
                case 'records':
                    renderRecordsPage();
                    break;
                default:
                    renderDashboard();
                    break;
            }
        });
    });

    // Add event listener to the monthly dropdown to update the dashboard
    monthlySelect.addEventListener('change', fetchAndRenderDashboard);

    // Initial data fetch and render
    fetchAndRenderDashboard();
}

/**
 * Fetches dashboard data and updates the UI with charts and tables.
 */
async function fetchAndRenderDashboard() {
    try {
        const monthlySelect = document.getElementById('monthly-select');
        const selectedMonth = monthlySelect ? parseInt(monthlySelect.value) : new Date().getMonth() + 1;
        const selectedYear = new Date().getFullYear();

        const response = await window.api.getDashboardData(selectedMonth, selectedYear);
        
        if (response.success) {
            const { todayEarnings, weeklyData, monthlyServiceEarnings, monthlyTotal } = response.data;
            updateDashboardUI(todayEarnings, weeklyData, monthlyServiceEarnings, monthlyTotal);
        } else {
            console.error("Error fetching dashboard data:", response.error);
            const contentArea = document.getElementById('content-area');
            if (contentArea) {
                contentArea.innerHTML = `<p class="p-4 text-lg text-center" style="color: #d32f2f;">Error fetching data: ${response.error}</p>`;
            }
        }
    } catch (error) {
        console.error("IPC call failed:", error);
        const contentArea = document.getElementById('content-area');
        if (contentArea) {
            contentArea.innerHTML = `<p class="p-4 text-lg text-center" style="color: #d32f2f;">IPC communication error.</p>`;
        }
    }
}

/**
 * Updates the dashboard UI with fetched data.
 * @param {number} todayEarnings - Today's total earnings.
 * @param {Array} weeklyData - Array of daily earnings for the last 7 days.
 * @param {object} monthlyServiceEarnings - Object mapping service names to total earnings.
 * @param {number} monthlyTotal - Total monthly earnings.
 */
function updateDashboardUI(todayEarnings, weeklyData, monthlyServiceEarnings, monthlyTotal) {
    // Today's Earnings
    const todayEarningValue = document.getElementById('todays-earning-value');
    if (todayEarningValue) {
        todayEarningValue.textContent = `₹${Math.round(todayEarnings)}`;
    }

    // Weekly Earnings Bar Graph & Table
    const weeklyCtx = document.getElementById('weekly-chart');
    if (weeklyCtx) {
        const weeklyCtx2d = weeklyCtx.getContext('2d');
        if (window.weeklyChartInstance) {
            window.weeklyChartInstance.destroy();
        }
    
        const weeklyBarColors = ['#1a73e8', '#fbbc05', '#34a853', '#ea4335', '#4285f4', '#f69528', '#00796b'];
        window.weeklyChartInstance = new Chart(weeklyCtx2d, {
            type: 'bar',
            data: {
                labels: weeklyData.map(d => new Date(d.date).toLocaleDateString()),
                datasets: [{
                    label: 'Weekly Earnings',
                    data: weeklyData.map(d => d.amount),
                    backgroundColor: weeklyBarColors,
                    borderColor: weeklyBarColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true, title: { display: true, text: 'Amount (₹)' } },
                    x: { title: { display: true, text: 'Date' } }
                }
            }
        });
    }

    const weeklyTableBody = document.querySelector('#weekly-table tbody');
    if (weeklyTableBody) {
        weeklyTableBody.innerHTML = '';
        weeklyData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${new Date(item.date).toLocaleDateString()}</td><td>₹${Math.round(item.amount)}</td>`;
            weeklyTableBody.appendChild(row);
        });
    }

    // Monthly Service-wise Pie Chart & Table
    const monthlyCtx = document.getElementById('monthly-chart');
    if (monthlyCtx) {
        const monthlyCtx2d = monthlyCtx.getContext('2d');
        if (window.monthlyChartInstance) {
            window.monthlyChartInstance.destroy();
        }

        const vibrantColors = [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56', '#C9CBCE', '#343A40', '#28A745',
            '#DC3545', '#17A2B8', '#6F42C1', '#FD7E14', '#E83E8C', '#F0AD4E', '#5BC0DE', '#20C997', '#E9ECEF', '#6C757D'
        ];

        window.monthlyChartInstance = new Chart(monthlyCtx2d, {
            type: 'pie',
            data: {
                labels: Object.keys(monthlyServiceEarnings),
                datasets: [{
                    label: 'Service Earnings',
                    data: Object.values(monthlyServiceEarnings),
                    backgroundColor: vibrantColors.slice(0, Object.keys(monthlyServiceEarnings).length),
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.label}: ₹${tooltipItem.raw}` } }
                }
            }
        });
    }

    const monthlyTableBody = document.querySelector('#monthly-table tbody');
    if (monthlyTableBody) {
        monthlyTableBody.innerHTML = '';
        for (const [service, amount] of Object.entries(monthlyServiceEarnings)) {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${service}</td><td>₹${amount}</td>`;
            monthlyTableBody.appendChild(row);
        }
    }
    const monthlyTotalElement = document.getElementById('monthly-total');
    if (monthlyTotalElement) {
        monthlyTotalElement.textContent = `₹${monthlyTotal}`;
    }
}

async function initApp() {
    const response = await window.api.checkAdmin();
    if (response.success) {
        if (response.exists) {
            renderLoginForm();
        } else {
            renderSetupForm();
        }
    } else {
        const appContainer = document.getElementById('app-container');
        appContainer.innerHTML = `<h2 class="title" style="color: #d32f2f;">Error checking database: ${response.error}</h2>`;
    }
}

// Initialize the application when the DOM is ready.
document.addEventListener('DOMContentLoaded', initApp);




// records page


// FILE: renderer.js
// This file handles the rendering and user interaction for the laundry application.
// Global state variables to manage the order

// Global state variables to manage the order
// Global state variables to manage the order
let invoiceItems = [];
let currentCustomerId = null;

/**
 * Renders the main orders management page structure into the DOM.
 * This is the entry point for the page logic.
 */
async function renderOrdersPage() {
    const contentTitle = document.getElementById('content-title');
    const contentArea = document.getElementById('content-area');

    contentTitle.textContent = 'Orders Management';

    contentArea.innerHTML = `
        <div class="orders-container">
            <button id="place-order-btn" class="place-order-btn">+ Place New Order</button>
            <div id="order-workspace" class="order-workspace" style="display: none;">
                
                <div class="el-form-section">
                    <div class="el-form-card">
                        <h2 class="el-form-title">Order Details</h2>
                        
                        <div class="el-customer-items-section">
                            <div class="el-form-row el-compact-row">
                                <div class="el-form-group">
                                    <label for="customer-name">Customer Name</label>
                                    <input type="text" id="customer-name" class="el-form-input" placeholder="Enter full name" maxlength="50">
                                    <span class="el-validation-message" id="name-validation"></span>
                                </div>
                                <div class="el-form-group">
                                    <label for="customer-phone">Phone Number</label>
                                    <input type="text" id="customer-phone" class="el-form-input" placeholder="Enter 10-digit mobile number" maxlength="10">
                                    <span class="el-validation-message" id="phone-validation"></span>
                                </div>
                            </div>

                            <div class="el-form-row el-compact-row">
                                <div class="el-form-group">
                                    <label for="service-select">Service Type</label>
                                    <select id="service-select" class="el-form-select">
                                        <option value="">Select Service</option>
                                    </select>
                                </div>
                                <div class="el-form-group">
                                    <label for="item-select">Item</label>
                                    <select id="item-select" class="el-form-select">
                                        <option value="">Select Item</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="el-form-row el-compact-row">
                                <div class="el-form-group">
                                    <label for="quantity">Quantity</label>
                                    <input type="number" id="quantity" class="el-form-input" value="1" min="1" max="999">
                                </div>
                                <div class="el-form-group">
                                    <label for="price-per-item">Price per Item (₹)</label>
                                    <input type="number" id="price-per-item" class="el-form-input" step="0.01" min="0" max="99999">
                                </div>
                                <div class="el-form-group">
                                    <label for="item-total">Total (₹)</label>
                                    <input type="text" id="item-total" class="el-form-input el-total-field" readonly>
                                </div>
                            </div>
                            
                            <button type="button" id="add-item-btn" class="el-add-item-btn">Add Item to Invoice</button>

                            <div class="el-invoice-form-controls">
                                <div class="el-form-group">
                                    <label for="discount-input">Discount (₹)</label>
                                    <input type="number" id="discount-input" class="el-form-input" value="0" min="0" step="1">
                                </div>
                                <div class="el-form-row el-compact-row">
                                    <div class="el-form-group">
                                        <label for="payment-method">Payment Method</label>
                                        <select id="payment-method" class="el-form-select">
                                            <option value="Cash">Cash</option>
                                            <option value="Online">Online</option>
                                            <option value="Card">Card</option>
                                        </select>
                                    </div>
                                    <div class="el-form-group">
                                        <label for="payment-status">Payment Status</label>
                                        <select id="payment-status" class="el-form-select">
                                            <option value="Paid">Paid</option>
                                            <option value="Pending">Pending</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="form-action-buttons" class="el-action-buttons-form">
                            <button id="discard-btn" class="el-action-btn el-discard-btn">Discard</button>
                            <button id="complete-invoice-btn" class="el-action-btn el-complete-btn">Complete Invoice</button>
                        </div>
                        
                        <div id="final-invoice-buttons" class="el-action-buttons-form" style="display: none;">
                            <button id="save-btn" class="el-action-btn el-save-btn">Save</button>
                            <button id="print-btn" class="el-action-btn el-print-btn">Save & Print</button>
                        </div>
                    </div>
                </div>

                <div class="invoice-section">
                    <div class="invoice-container">
                        
                        <div class="invoice-header">
                            <div class="company-details">
                                <h1 class="company-name">Elite Wash</h1>
                                <p class="company-slogan">We wash, you relax.</p>
                                <div class="company-contact">
                                    <p><strong>Phone:</strong> +91 8866729102</p>
                                    <p><strong>Address:</strong> 5/B Shakti Society Gate no 1 Danilimda Ahmedabad</p>
                                </div>
                            </div>
                            <div class="invoice-title">
                                <h2>LAUNDRY INVOICE</h2>
                                <p class="invoice-meta"><strong>Invoice ID:</strong> <span id="display-invoice-id">-</span></p>
                                <p class="invoice-meta"><strong>Date:</strong> <span id="display-order-date">${getCurrentDate()}</span></p>
                            </div>
                        </div>

                        <div class="customer-info-preview">
                            <p><strong>Customer Name:</strong> <span id="display-customer-name">-</span></p>
                            <p><strong>Phone No:</strong> <span id="display-customer-phone">-</span></p>
                        </div>

                        <div class="invoice-table-wrapper">
                            <table class="invoice-table">
                                <thead>
                                    <tr>
                                        <th>Service Type</th>
                                        <th>Item Name</th>
                                        <th>Quantity</th>
                                        <th>Price per Item</th>
                                        <th>Total</th>
                                        <th class="action-column">Action</th>
                                    </tr>
                                </thead>
                                <tbody id="invoice-items">
                                    <tr class="empty-row">
                                        <td colspan="6" class="empty-message">No items added yet</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="invoice-bottom">
                            <div class="invoice-totals">
                                <div class="total-line">
                                    <span>Subtotal:</span>
                                    <span>₹<span id="sub-total">0</span></span>
                                </div>
                                <div class="total-line">
                                    <span>Discount:</span>
                                    <span>₹<span id="display-discount">0</span></span>
                                </div>
                                <div class="total-line grand-total">
                                    <span><strong>Grand Total:</strong></span>
                                    <span><strong>₹<span id="grand-total">0</span></strong></span>
                                </div>
                            </div>
                            <div class="payment-summary">
                                <p><strong>Payment Method:</strong> <span id="display-payment-method">-</span></p>
                                <p><strong>Payment Status:</strong> <span id="display-payment-status">-</span></p>
                            </div>
                        </div>

                        <div class="thank-you">
                            <p>Thank you for choosing Elite Wash!</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div id="status-message" class="status-message"></div>
        </div>
    `;

    // Initialize the form with a single call to setup functions
    setupInitialState();
    setupEventListeners();
}

/**
 * Sets up the initial state and event listener for the 'Place New Order' button.
 */
async function setupInitialState() {
    const placeOrderBtn = document.getElementById('place-order-btn');
    const orderWorkspace = document.getElementById('order-workspace');

    // Show order workspace on button click
    placeOrderBtn.addEventListener('click', async () => {
        placeOrderBtn.style.display = 'none';
        orderWorkspace.style.display = 'flex';
        await loadDropdownData();
    });
}

/**
 * Fetches and populates the service and item dropdowns from the API.
 */
async function loadDropdownData() {
    try {
        const [servicesRes, itemsRes] = await Promise.all([
            window.api.getServices(),
            window.api.getItems()
        ]);

        const serviceSelect = document.getElementById('service-select');
        const itemSelect = document.getElementById('item-select');

        if (servicesRes.success) {
            serviceSelect.innerHTML = '<option value="">Select Service</option>';
            servicesRes.data.forEach(service => {
                serviceSelect.innerHTML += `<option value="${service.service_name}">${service.service_name}</option>`;
            });
        }

        if (itemsRes.success) {
            itemSelect.innerHTML = '<option value="">Select Item</option>';
            itemsRes.data.forEach(item => {
                itemSelect.innerHTML += `<option value="${item.item_name}" data-price="${item.price_per_piece}">${item.item_name}</option>`;
            });
        }
    } catch (error) {
        showMessage('Error loading data: ' + error.message, 'error');
    }
}

/**
 * Sets up all the necessary event listeners for form inputs and buttons.
 * This function is called only once to prevent multiple event listeners.
 */
function setupEventListeners() {
    const customerName = document.getElementById('customer-name');
    const customerPhone = document.getElementById('customer-phone');
    const serviceSelect = document.getElementById('service-select');
    const itemSelect = document.getElementById('item-select');
    const quantity = document.getElementById('quantity');
    const pricePerItem = document.getElementById('price-per-item');
    const itemTotal = document.getElementById('item-total');
    const addItemBtn = document.getElementById('add-item-btn');
    const discountInput = document.getElementById('discount-input');
    const paymentMethodSelect = document.getElementById('payment-method');
    const paymentStatusSelect = document.getElementById('payment-status');
    const discardBtn = document.getElementById('discard-btn');
    const completeInvoiceBtn = document.getElementById('complete-invoice-btn');
    const saveBtn = document.getElementById('save-btn');
    const printBtn = document.getElementById('print-btn');
    
    // Customer name validation
    customerName.addEventListener('input', validateCustomerName);
    customerName.addEventListener('blur', validateCustomerName);

    // Phone validation
    customerPhone.addEventListener('input', validatePhoneNumber);
    customerPhone.addEventListener('blur', validatePhoneNumber);

    // Update display when customer info changes
    customerName.addEventListener('input', updateCustomerDisplay);
    customerPhone.addEventListener('input', updateCustomerDisplay);

    // Item selection and calculation
    itemSelect.addEventListener('change', updateItemPrice);
    quantity.addEventListener('input', calculateItemTotal);
    pricePerItem.addEventListener('input', calculateItemTotal);

    // Add item to invoice
    addItemBtn.addEventListener('click', addItemToInvoice);

    // Discount and Payment calculation
    discountInput.addEventListener('input', calculateGrandTotal);
    paymentMethodSelect.addEventListener('change', updatePaymentDisplay);
    paymentStatusSelect.addEventListener('change', updatePaymentDisplay);

    // Order action buttons
    discardBtn.addEventListener('click', discardOrder);
    completeInvoiceBtn.addEventListener('click', completeInvoice);
    saveBtn.addEventListener('click', saveInvoice);
    printBtn.addEventListener('click', saveAndPrint);

    // Initial state setup on page load
    resetForm();

    // --- Core Functions ---

    /**
     * Validates the customer's name input field.
     * @returns {boolean} True if the name is valid, false otherwise.
     */
    function validateCustomerName() {
        const name = customerName.value.trim();
        const validation = document.getElementById('name-validation');
        const cleanName = name.replace(/[^a-zA-Z\s]/g, '');
        if (cleanName !== name) {
            customerName.value = cleanName;
        }

        if (cleanName.length === 0) {
            validation.textContent = 'Customer name is required';
            validation.className = 'validation-message error';
            customerName.classList.add('error');
            return false;
        } else if (cleanName.length < 2) {
            validation.textContent = 'Name must be at least 2 characters';
            validation.className = 'validation-message error';
            customerName.classList.add('error');
            return false;
        } else {
            validation.textContent = '✓ Valid name';
            validation.className = 'validation-message success';
            customerName.classList.remove('error');
            return true;
        }
    }

    /**
     * Validates the customer's phone number input field.
     * @returns {boolean} True if the phone number is valid, false otherwise.
     */
    function validatePhoneNumber() {
        const phone = customerPhone.value.trim();
        const validation = document.getElementById('phone-validation');
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        if (cleanPhone !== phone) {
            customerPhone.value = cleanPhone;
        }

        if (cleanPhone.length === 0) {
            validation.textContent = 'Phone number is required';
            validation.className = 'validation-message error';
            customerPhone.classList.add('error');
            return false;
        } else if (cleanPhone.length !== 10) {
            validation.textContent = 'Phone number must be exactly 10 digits';
            validation.className = 'validation-message error';
            customerPhone.classList.add('error');
            return false;
        } else if (!cleanPhone.match(/^[6-9][0-9]{9}$/)) {
            validation.textContent = 'Invalid Indian mobile number format';
            validation.className = 'validation-message error';
            customerPhone.classList.add('error');
            return false;
        } else {
            validation.textContent = '✓ Valid phone number';
            validation.className = 'validation-message success';
            customerPhone.classList.remove('error');
            return true;
        }
    }

    /**
     * Updates the customer information displayed on the invoice preview.
     */
    function updateCustomerDisplay() {
        document.getElementById('display-customer-name').textContent = customerName.value.trim() || '-';
        document.getElementById('display-customer-phone').textContent = customerPhone.value.trim() || '-';
    }
    
    /**
     * Updates the payment method and status on the invoice preview.
     */
    function updatePaymentDisplay() {
        document.getElementById('display-payment-method').textContent = paymentMethodSelect.value;
        document.getElementById('display-payment-status').textContent = paymentStatusSelect.value;
    }

    /**
     * Automatically sets the price per item based on the selected item.
     */
    function updateItemPrice() {
        const selectedOption = itemSelect.selectedOptions[0];
        if (selectedOption && selectedOption.dataset.price) {
            pricePerItem.value = parseFloat(selectedOption.dataset.price).toFixed(2);
            calculateItemTotal();
        } else {
            pricePerItem.value = '0.00';
            itemTotal.value = '0.00';
        }
    }

    /**
     * Calculates and displays the total for a single item.
     */
    function calculateItemTotal() {
        const qty = parseInt(quantity.value) || 0;
        const price = parseFloat(pricePerItem.value) || 0;
        const total = (qty * price).toFixed(2);
        itemTotal.value = `₹${total}`;
    }

    /**
     * Validates item details and adds a new item to the invoice.
     */
    async function addItemToInvoice() {
        // Validate customer info first
        if (!validateCustomerName() || !validatePhoneNumber()) {
            showMessage('Please enter valid customer information first', 'error');
            return;
        }

        const service = serviceSelect.value;
        const item = itemSelect.value;
        const qty = parseInt(quantity.value);
        const price = parseFloat(pricePerItem.value);

        if (!service) {
            showMessage('Please select a service type', 'error');
            return;
        }
        if (!item) {
            showMessage('Please select an item', 'error');
            return;
        }
        if (qty <= 0 || qty > 999 || isNaN(qty)) {
            showMessage('Please enter a valid quantity (1-999)', 'error');
            return;
        }
        if (price <= 0 || price > 99999 || isNaN(price)) {
            showMessage('Please enter a valid price', 'error');
            return;
        }

        // Check or create customer
        await ensureCustomerExists();

        const newItem = {
            serviceType: service,
            itemName: item,
            quantity: qty,
            pricePerItem: price,
            total: qty * price
        };

        invoiceItems.push(newItem);
        renderInvoiceTable();
        clearItemForm();
        showMessage('Item added successfully!', 'success');
    }

    /**
     * Checks if a customer exists and gets their ID, or creates a new one.
     */
    async function ensureCustomerExists() {
        const name = customerName.value.trim();
        const phone = customerPhone.value.trim();

        try {
            const customerRes = await window.api.getCustomerByPhone(phone);
            
            if (customerRes.success && customerRes.data) {
                currentCustomerId = customerRes.data.customer_id;
            } else {
                const newCustomerRes = await window.api.addCustomer(name, phone);
                if (newCustomerRes.success) {
                    currentCustomerId = newCustomerRes.data.customer_id;
                }
            }
        } catch (error) {
            console.error('Error managing customer:', error);
        }
    }

    /**
     * Renders the items in the invoice table.
     * @param {boolean} removeActionColumn - If true, hides the 'Action' column.
     */
    function renderInvoiceTable(removeActionColumn = false) {
        const tbody = document.getElementById('invoice-items');
        
        tbody.innerHTML = '';
        let subtotal = 0;

        if (invoiceItems.length === 0) {
            tbody.innerHTML = `<tr class="empty-row"><td colspan="${removeActionColumn ? '5' : '6'}" class="empty-message">No items added yet</td></tr>`;
        } else {
            invoiceItems.forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.serviceType}</td>
                    <td>${item.itemName}</td>
                    <td>${item.quantity}</td>
                    <td>₹${item.pricePerItem.toFixed(2)}</td>
                    <td>₹${item.total.toFixed(2)}</td>
                    ${removeActionColumn ? '' : `<td><button class="remove-item" data-index="${index}">Remove</button></td>`}
                `;
                tbody.appendChild(row);
                subtotal += item.total;
            });
        }
        
        document.getElementById('sub-total').textContent = subtotal.toFixed(2);
        calculateGrandTotal();

        if (!removeActionColumn) {
            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const index = parseInt(e.target.dataset.index);
                    invoiceItems.splice(index, 1);
                    renderInvoiceTable();
                    showMessage('Item removed', 'info');
                });
            });
        }
    }

    /**
     * Calculates and displays the grand total, including discount.
     */
    function calculateGrandTotal() {
        const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0);
        const discount = parseFloat(discountInput.value) || 0;
        const grandTotal = Math.max(0, subtotal - discount);
        
        document.getElementById('grand-total').textContent = grandTotal.toFixed(2);
        document.getElementById('display-discount').textContent = discount.toFixed(2);
    }

    /**
     * Clears the item addition form fields.
     */
    function clearItemForm() {
        serviceSelect.value = '';
        itemSelect.value = '';
        quantity.value = '1';
        pricePerItem.value = '';
        itemTotal.value = '';
    }

    /**
     * Validates the complete order form before saving or printing.
     * @returns {boolean} True if the form is valid, false otherwise.
     */
    function validateOrderForm() {
        const nameValid = validateCustomerName();
        const phoneValid = validatePhoneNumber();
        
        if (!nameValid || !phoneValid) {
            showMessage('Please fix customer information errors', 'error');
            return false;
        }

        if (invoiceItems.length === 0) {
            showMessage('Please add at least one item to the invoice', 'error');
            return false;
        }

        return true;
    }

    /**
     * Finalizes the invoice for saving, hiding the form controls.
     */
    function completeInvoice() {
        if (!validateOrderForm()) return;

        // Hide form controls and add item button
        document.getElementById('add-item-btn').style.display = 'none';
        document.getElementById('form-action-buttons').style.display = 'none';
        
        // Show finalization buttons
        document.getElementById('final-invoice-buttons').style.display = 'flex';
        
        // Remove action column from invoice table
        const actionColumnHeader = document.querySelector('.invoice-table thead .action-column');
        if (actionColumnHeader) {
            actionColumnHeader.style.display = 'none';
        }
        renderInvoiceTable(true); // Rerender table without the action column
        
        showMessage('Invoice is ready to be saved.', 'success');
    }

    /**
     * Saves the invoice data to the database via the API.
     */
    async function saveInvoice() {
        if (!validateOrderForm()) return;

        try {
            const invoiceData = {
                customer_id: currentCustomerId,
                customer_name: customerName.value.trim(),
                customer_phone: customerPhone.value.trim(),
                order_date: new Date().toISOString(),
                items: JSON.stringify(invoiceItems),
                discount: parseFloat(discountInput.value) || 0,
                total_amount: parseFloat(document.getElementById('grand-total').textContent),
                payment_method: document.getElementById('payment-method').value,
                payment_status: document.getElementById('payment-status').value 
            };

            const result = await window.api.saveInvoice(invoiceData);
            
            if (result.success) {
                showMessage('Invoice saved successfully!', 'success');
                document.getElementById('display-invoice-id').textContent = `#${result.invoice_id}`;
                resetForm();
            } else {
                showMessage('Error saving invoice: ' + result.error, 'error');
            }
        } catch (error) {
            showMessage('Error saving invoice: ' + error.message, 'error');
        }
    }

    /**
     * Saves the invoice and then triggers the browser's print dialog.
     */
    async function saveAndPrint() {
        if (!validateOrderForm()) return;
    
        try {
            const invoiceData = {
                customer_id: currentCustomerId,
                customer_name: customerName.value.trim(),
                customer_phone: customerPhone.value.trim(),
                order_date: new Date().toISOString(),
                items: JSON.stringify(invoiceItems),
                discount: parseFloat(discountInput.value) || 0,
                total_amount: parseFloat(document.getElementById('grand-total').textContent),
                payment_method: document.getElementById('payment-method').value,
                payment_status: document.getElementById('payment-status').value
            };
    
            const result = await window.api.saveInvoice(invoiceData);
            
            if (result.success) {
                showMessage('Invoice saved! Opening print dialog...', 'success');
                document.getElementById('display-invoice-id').textContent = `#${result.invoice_id}`;
                resetForm();
    
                setTimeout(() => {
                    window.print();
                    // Optional: reset form after printing is complete or dismissed.
                    resetForm();
                }, 1000);
            } else {
                showMessage('Error saving invoice: ' + result.error, 'error');
            }
        } catch (error) {
            showMessage('Error saving invoice: ' + error.message, 'error');
        }
    }
    

    /**
     * Discards the current order and resets the form to its initial state.
     */
    function discardOrder() {
        if (confirm('Are you sure you want to discard this order? All data will be lost.')) {
            resetForm();
            showMessage('Order discarded', 'info');
        }
    }

    /**
     * Resets all form fields and invoice data to their initial, empty state.
     */
    function resetForm() {
    // Reset form fields...
    customerName.value = '';
    customerPhone.value = '';
    serviceSelect.value = '';
    itemSelect.value = '';
    quantity.value = '1';
    pricePerItem.value = '';
    itemTotal.value = '';
    discountInput.value = '0';
    document.getElementById('payment-method').value = 'Cash';
    document.getElementById('payment-status').value = 'Pending';

    // Reset validation messages
    document.getElementById('name-validation').textContent = '';
    document.getElementById('phone-validation').textContent = '';
    customerName.classList.remove('error');
    customerPhone.classList.remove('error');

    // Reset invoice
    invoiceItems = [];
    currentCustomerId = null;
    updateCustomerDisplay();
    updatePaymentDisplay();
    document.getElementById('display-invoice-id').textContent = '-';
    renderInvoiceTable();

    // Restore form buttons and invoice column
    document.getElementById('add-item-btn').style.display = 'block';
    document.getElementById('form-action-buttons').style.display = 'flex';
    document.getElementById('final-invoice-buttons').style.display = 'none';
    const actionColumnHeader = document.querySelector('.invoice-table thead .action-column');
    if (actionColumnHeader) {
        actionColumnHeader.style.display = 'table-cell';
    }

    // ✅ Re-select the DOM elements here
    const orderWorkspace = document.getElementById('order-workspace');
    const placeOrderBtn = document.getElementById('place-order-btn');

    // Hide workspace and show place order button
    orderWorkspace.style.display = 'none';
    placeOrderBtn.style.display = 'block';
}


    
}

/**
 * Displays a temporary status message to the user.
 * @param {string} text The message to display.
 * @param {string} type The type of message ('success', 'error', 'info').
 */
function showMessage(text, type) {
    const statusMessage = document.getElementById('status-message');
    statusMessage.textContent = text;
    statusMessage.className = `status-message ${type}`;
    
    setTimeout(() => {
        statusMessage.textContent = '';
        statusMessage.className = 'status-message';
    }, 4000);
}

/**
 * Gets the current date in DD-MM-YYYY format.
 * @returns {string} The formatted date string.
 */
function getCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
}

// Call the main function to render the page and set up logic.
document.addEventListener('DOMContentLoaded', renderOrdersPage);




// FILE: src/js/records.FsaveInvoice
// FILE: src/js/records.

document.addEventListener('DOMContentLoaded', () => {
    // Function to render the records page
    window.renderRecordsPage = async () => {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="records-container">
                
                <div class="records-filters">
                    <input type="text" id="search-input" placeholder="Search by name or phone number">
                    <input type="date" id="date-input">
                    <select id="status-filter">
                        <option value="All">All Statuses</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>
                <div class="records-table-container">
                    <table id="invoices-table">
                        <thead>
                            <tr>
                                <th>Invoice ID</th>
                                <th>Customer Name</th>
                                <th>Phone Number</th>
                                <th>Order Date</th>
                                <th>Total Amount</th>
                                <th>Payment Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>

            <div id="records-invoice-modal" class="records-invoice-modal">
                <div class="records-modal-content">
                    <div id="records-invoice-details-content"></div>
                </div>
                <span class="records-close-button">&times;</span>
            </div>
        `;

        // DOM elements
        const searchInput = document.getElementById('search-input');
        const dateInput = document.getElementById('date-input');
        const statusFilter = document.getElementById('status-filter');
        const invoicesTableBody = document.querySelector('#invoices-table tbody');
        const modal = document.getElementById('records-invoice-modal');
        const modalCloseBtn = document.querySelector('.records-close-button');
        const invoiceDetailsContent = document.getElementById('records-invoice-details-content');

        let allInvoices = [];

        async function fetchInvoices() {
            try {
                const response = await window.api.getInvoices();
                if (response.success) {
                    allInvoices = response.data;
                    renderInvoices(allInvoices);
                } else {
                    console.error('Error fetching invoices:', response.error);
                    alert('Failed to load invoices.');
                }
            } catch (error) {
                console.error('Error fetching invoices:', error);
                alert('An unexpected error occurred while fetching invoices.');
            }
        }

        function renderInvoices(invoices) {
            invoicesTableBody.innerHTML = '';
            if (invoices.length === 0) {
                invoicesTableBody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No invoices found.</td></tr>';
                return;
            }

            invoices.forEach(invoice => {
                const row = document.createElement('tr');
                const orderDate = new Date(invoice.order_date).toLocaleDateString('en-US');
                const statusClass = invoice.payment_status === 'Paid' ? 'status-paid' : 'status-pending';

                const invoiceId = invoice.invoice_id;
                const customerName = invoice.customer_name || "N/A";
                const customerPhone = invoice.customer_phone || "N/A";
                const totalAmount = Number(invoice.total_amount).toFixed(2);
                const paymentStatus = invoice.payment_status;

                row.innerHTML = `
                    <td>${invoiceId}</td>
                    <td>${customerName}</td>
                    <td>${customerPhone}</td>
                    <td>${orderDate}</td>
                    <td>₹${totalAmount}</td>
                    <td class="${statusClass}">${paymentStatus}</td>
                    <td>
                        <div class="action-buttons">
                            <button class="view-invoice-btn" data-id="${invoiceId}">View</button>
                            ${paymentStatus === 'Pending' ? `<button class="update-status-btn" data-id="${invoiceId}">Mark as Paid</button>` : ''}
                        </div>
                    </td>
                `;
                invoicesTableBody.appendChild(row);
            });
        }
        
        function filterAndSearch() {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedDate = dateInput.value;
            const status = statusFilter.value;
            
            const filteredInvoices = allInvoices.filter(invoice => {
                const matchesSearch = (invoice.customer_name?.toLowerCase() || "").includes(searchTerm) || (invoice.customer_phone || "").includes(searchTerm);
                
                let matchesDate = true;
                if (selectedDate) {
                    const invoiceDateString = new Date(invoice.order_date).toISOString().split('T')[0];
                    matchesDate = invoiceDateString === selectedDate;
                }
                
                const matchesStatus = status === 'All' || invoice.payment_status === status;
                
                return matchesSearch && matchesDate && matchesStatus;
            });
            
            renderInvoices(filteredInvoices);
        }

        function displayInvoiceModal(invoice) {
    let itemsHtml = '';
    let subtotal = 0;

    try {
        const items = typeof invoice.items === 'string' ? JSON.parse(invoice.items) : invoice.items;
        if (Array.isArray(items) && items.length > 0) {
            itemsHtml = items.map(item => {
                const itemTotal = Number(item.total || (item.pricePerItem * item.quantity)) || 0;
                subtotal += itemTotal;
                return `
                    <tr>
                        <td>${item.serviceType || 'N/A'}</td>
                        <td>${item.itemName || 'N/A'}</td>
                        <td>${item.quantity || 0}</td>
                        <td>₹${Number(item.pricePerItem).toFixed(2)}</td>
                        <td>₹${itemTotal.toFixed(2)}</td>
                    </tr>
                `;
            }).join('');
        } else {
            itemsHtml = '<tr><td colspan="5" class="records-no-items">No items found or malformed data.</td></tr>';
        }
    } catch (e) {
        console.error("Failed to parse invoice items:", e);
        itemsHtml = '<tr><td colspan="5" class="records-no-items">Error loading items: Malformed data.</td></tr>';
    }

    const grandTotal = subtotal - Number(invoice.discount || 0);

    invoiceDetailsContent.innerHTML = `
        <div class="records-invoice-container">
            <div class="records-invoice-header">
                <div class="left-header">
                    <h2>Elite Wash</h2>
                    <p class="tagline">We wash, you relax.</p>
                    <p><strong>Phone:</strong> +91 8866729102</p>
                    <p><strong>Address:</strong> 5/B Shakti Society Gate no 1, Danilimda, Ahmedabad</p>
                </div>
                <div class="right-header">
                    <h3>LAUNDRY INVOICE</h3>
                    <p><strong>Invoice ID:</strong> ${invoice.invoice_id}</p>
                    <p><strong>Date:</strong> ${new Date(invoice.order_date).toLocaleDateString('en-GB')}</p>
                </div>
            </div>

            <div class="records-customer-info">
                <p><strong>Customer Name:</strong> ${invoice.customer_name}</p>
                <p><strong>Phone No:</strong> ${invoice.customer_phone}</p>
            </div>
            
            <table class="records-items-table">
                <thead>
                    <tr>
                        <th>Service Type</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Price per Item</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                </tbody>
            </table>
            
            <div class="records-invoice-summary">
                <div class="summary-box">
                    <p><strong>Subtotal:</strong> ₹${subtotal.toFixed(2)}</p>
                    <p><strong>Discount:</strong> ₹${Number(invoice.discount || 0).toFixed(2)}</p>
                    <p class="grand-total"><strong>Grand Total:</strong> ₹${grandTotal.toFixed(2)}</p>
                </div>
                <div class="payment-info">
                    <p><strong>Payment Method:</strong> ${invoice.payment_method || 'Cash'}</p>
                    <p><strong>Payment Status:</strong> ${invoice.payment_status}</p>
                </div>
            </div>
            
            <div class="records-invoice-footer">
                <p>Thank you for choosing Elite Wash!</p>
            </div>
        </div>
    `;

    modal.style.display = ('block');
}


        // Event listeners
        searchInput.addEventListener('input', filterAndSearch);
        dateInput.addEventListener('change', filterAndSearch);
        statusFilter.addEventListener('change', filterAndSearch);

        invoicesTableBody.addEventListener('click', async (event) => {
    const target = event.target;
    const invoiceId = parseInt(target.getAttribute('data-id'));
    
    if (target.classList.contains('view-invoice-btn')) {
        const invoice = allInvoices.find(inv => inv.invoice_id === invoiceId);
        if (invoice) {
            displayInvoiceModal(invoice);
        }
    } else if (target.classList.contains('update-status-btn')) {
        const confirmed = confirm('Are you sure you want to mark this invoice as Paid?');
        if (confirmed) {
            // New: Create a timestamp for the paid date
            const paidDate = new Date().toISOString(); 
            
            // Pass the paidDate in the IPC call
            const response = await window.api.updateInvoicePaymentStatus(invoiceId, 'Paid', paidDate);
            
            if (response.success) {
                alert('Invoice payment status updated successfully!');
                await fetchInvoices();
            } else {
                alert('Failed to update payment status: ' + response.error);
            }
        }
    }
});

        modalCloseBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };

        fetchInvoices();
    };
});

// Page for the services and items management
document.addEventListener('DOMContentLoaded', () => {
    // This function sets up the entire services and items page.
    window.renderServicesPage = async () => {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="page-container">
                <div class="content-grid">
                    <!-- Services Table Card -->
                    <div class="card">
                        <div class="card-header">
                            <h3>Our Services</h3>
                            <button id="add-service-btn" class="btn btn-add">Add Service</button>
                        </div>
                        <div class="table-wrapper">
                            <table id="services-table">
                                <thead>
                                    <tr>
                                        <th>Service Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody><!-- Service rows will be injected here --></tbody>
                            </table>
                        </div>
                    </div>
                    
                    <!-- Items Table Card -->
                    <div class="card">
                        <div class="card-header">
                            <h3>Items</h3>
                            <button id="add-item-btn" class="btn btn-add">Add Item</button>
                        </div>
                        <div class="table-wrapper">
                            <table id="items-table">
                                <thead>
                                    <tr>
                                        <th>Item Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody><!-- Item rows will be injected here --></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal for Adding/Deleting Data -->
            <div id="data-modal" class="services-data-modal">
                <div class="services-modal-content">
                    <span class="services-modal-close-btn">&times;</span>
                    <h3 id="modal-title"></h3>
                    <div class="services-modal-body">
                        <input type="text" id="modal-input-name" class="text-input" placeholder="Enter name">
                    </div>
                    <div class="services-modal-actions">
                        <button id="modal-save-btn" class="btn">Save</button>
                    </div>
                </div>
            </div>
            
            <!-- Toast Notification Element -->
            <div id="toast-notification" class="toast"></div>
        `;

        // --- DOM Element References ---
        const servicesTableBody = document.querySelector('#services-table tbody');
        const itemsTableBody = document.querySelector('#items-table tbody');
        const modal = document.getElementById('data-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalInputName = document.getElementById('modal-input-name');
        const modalSaveBtn = document.getElementById('modal-save-btn');
        const toast = document.getElementById('toast-notification');
        
        // --- Modal State ---
        let modalState = { action: null, type: null, name: null };

        // --- Toast Notification Logic ---
        const showToast = (message, type = 'success') => {
            if (!toast) return;
            toast.textContent = message;
            // The class controls the color (success=green, error=red) and visibility
            toast.className = `toast toast-${type} toast-visible`;
            // Hide the toast after 3 seconds
            setTimeout(() => {
                toast.className = 'toast';
            }, 3000);
        };

        // --- Data Fetching & Rendering ---
        const fetchAndRenderServices = async () => {
            try {
                const result = await window.api.getServices();
                servicesTableBody.innerHTML = ''; // Clear existing table data
                result.data.forEach(service => {
                    const row = servicesTableBody.insertRow();
                    row.innerHTML = `
                        <td>${service.service_name}</td>
                        <td><button class="btn btn-delete" data-type="service" data-name="${service.service_name}">Delete</button></td>
                    `;
                });
            } catch (error) {
                showToast(`Failed to load services: ${error.message || 'Unknown error'}`, 'error');
            }
        };

        const fetchAndRenderItems = async () => {
            try {
                const result = await window.api.getItems();
                itemsTableBody.innerHTML = ''; // Clear existing table data
                result.data.forEach(item => {
                    const row = itemsTableBody.insertRow();
                    row.innerHTML = `
                        <td>${item.item_name}</td>
                        <td><button class="btn btn-delete" data-type="item" data-name="${item.item_name}">Delete</button></td>
                    `;
                });
            } catch (error) {
                showToast(`Failed to load items: ${error.message || 'Unknown error'}`, 'error');
            }
        };

        const fetchAndRenderAll = () => {
            fetchAndRenderServices();
            fetchAndRenderItems();
        };

        // --- Modal Controls ---
        const openModal = (action, type, name = '') => {
            modalState = { action, type, name };
            const typeName = type.charAt(0).toUpperCase() + type.slice(1);
            
            modalInputName.value = ''; // Always clear input on open
            modalInputName.style.display = 'block';

            if (action === 'add') {
                modalTitle.textContent = `Add New ${typeName}`;
                modalInputName.placeholder = `Enter ${type} name`;
                modalSaveBtn.textContent = 'Save';
                modalSaveBtn.className = 'btn btn-add';
            } else if (action === 'delete') {
                modalTitle.textContent = `Delete ${typeName}`;
                // For delete, we show a confirmation message instead of an input field at first
                modalInputName.placeholder = `Type "${name}" to confirm`;
                modalSaveBtn.textContent = 'Confirm Delete';
                modalSaveBtn.className = 'btn btn-delete';
            }
            modal.style.display = 'block';
            modalInputName.focus();
        };

        const closeModal = () => {
            modal.style.display = 'none';
        };

        // --- Event Listeners ---

        // Use event delegation on the content area for robust button handling
        contentArea.addEventListener('click', (event) => {
            const target = event.target;
            if (target.matches('#add-service-btn')) {
                openModal('add', 'service');
            } else if (target.matches('#add-item-btn')) {
                openModal('add', 'item');
            } else if (target.matches('.btn-delete')) {
                openModal('delete', target.dataset.type, target.dataset.name);
            } else if (target.matches('.services-modal-close-btn')) {
                closeModal();
            }
        });

        modalSaveBtn.addEventListener('click', async () => {
    // Get the element reference directly inside the event listener
    const modalInputName = document.getElementById('modal-input-name');
    const nameValue = modalInputName.value.trim();
    const { action, type, name } = modalState;

    // Input validation
    if (action === 'add' && !nameValue) {
        showToast('Name cannot be empty.', 'error');
        return;
    }
    if (action === 'delete' && nameValue.toLowerCase() !== name.toLowerCase()) {
        showToast('Confirmation text does not match. Deletion cancelled.', 'error');
        return;
    }

    let result;
    try {
        if (action === 'add') {
            if (type === 'service') {
                result = await window.api.addService(nameValue);
            } else if (type === 'item') {
                result = await window.api.addItem({item_name: nameValue });

            }
        } else if (action === 'delete') {
            // Use the original name for deletion to ensure accuracy
            if (type === 'service') {
                result = await window.api.deleteService(name);
            } else if (type === 'item') {
                result = await window.api.deleteItem(name);
            }
        }

        if (result && result.success) {
            const actionPastTense = action === 'add' ? 'Added' : 'Deleted';
            const typeName = type.charAt(0).toUpperCase() + type.slice(1);
            showToast(`${typeName} ${actionPastTense} Successfully!`, 'success');
            closeModal();
            fetchAndRenderAll(); // Refresh data
        } else {
            // This handles API errors gracefully
            throw new Error(result ? result.message : 'Operation failed');
        }
    } catch (error) {
        showToast(`Error: ${error.message || 'An unknown error occurred.'}`, 'error');
    }
});
        // Close modal if user clicks outside of it
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });

        // Initial data load
        fetchAndRenderAll();
    };
});

// staff

let currentStaffData = [];

// Initialize the staff page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderStaffPage();
});

// Main function to render staff page
async function renderStaffPage() {
    const contentArea = document.getElementById('content-area');

    // Dynamically generate and insert the HTML content with buttons AND modals
    contentArea.innerHTML = `
        <div class="action-buttons">
            <button id="addStaffBtn" class="btn btn-primary">
                Add Staff
            </button>
            <button id="deleteStaffBtn" class="btn btn-danger">
                Delete Staff
            </button>
        </div>
        <div id="staff-container">
            <div class="loading">Loading staff members...</div>
        </div>

        <div id="addStaffModal" class="staff-modal" style="display: none;">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Add New Staff Member</h2>
                    <span class="close" onclick="closeStaffModal('addStaffModal')">&times;</span>
                </div>
                <form id="addStaffForm">
                    <div class="form-group">
                        <label for="addName">Name:</label>
                        <input type="text" id="addName" name="name" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="addPhone">Phone:</label>
                        <input type="tel" id="addPhone" name="phone" class="form-control" required maxlength="10" placeholder="Enter 10-digit phone number">
                    </div>
                    <div class="form-group">
                        <label for="addEmail">Email:</label>
                        <input type="email" id="addEmail" name="email" class="form-control" placeholder="Optional">
                    </div>
                    <div class="form-group">
                        <label for="addSalary">Salary (₹):</label>
                        <input type="number" id="addSalary" name="salary" class="form-control" required min="0" step="0.01" placeholder="Enter salary amount">
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">Add Staff</button>
                        <button type="button" class="btn btn-secondary" onclick="closeStaffModal('addStaffModal')">Cancel</button>
                    </div>
                </form>
            </div>
        </div>

        <div id="deleteStaffModal" class="staff-modal" style="display: none;">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Delete Staff Member</h2>
                    <span class="close" onclick="closeStaffModal('deleteStaffModal')">&times;</span>
                </div>
                <div class="form-group">
                    <label for="deleteStaffId">Enter Staff ID to Delete:</label>
                    <input type="number" id="deleteStaffId" class="form-control" placeholder="Enter Staff ID">
                </div>
                <div class="form-actions">
                    <button type="button" id="confirmDeleteStaffBtn" class="btn btn-danger">Delete Staff</button>
                    <button type="button" class="btn btn-secondary" onclick="closeStaffModal('deleteStaffModal')">Cancel</button>
                </div>
            </div>
        </div>
    `;

    // Now attach event listeners to the buttons
    document.getElementById('addStaffBtn').addEventListener('click', () => {
        openStaffModal('addStaffModal');
    });

    document.getElementById('deleteStaffBtn').addEventListener('click', () => {
        openStaffModal('deleteStaffModal');
    });

    await loadStaffMembers();
    setupModalEventListeners();
}

// Load and display staff members
async function loadStaffMembers() {
    try {
        const result = await window.api.getStaff();
        const staffContainer = document.getElementById('staff-container');

        if (result.success) {
            currentStaffData = result.data;
            if (result.data.length === 0) {
                staffContainer.innerHTML = `
                    <div class="empty-state">
                        <h3>No Staff Members Found</h3>
                        <p>Click "Add Staff" to add your first staff member.</p>
                    </div>
                `;
            } else {
                displayStaffCards(result.data);
            }
        } else {
            staffContainer.innerHTML = `
                <div class="error-message">
                    Error loading staff members: ${result.error}
                </div>
            `;
        }
    } catch (error) {
        document.getElementById('staff-container').innerHTML = `
            <div class="error-message">
                Failed to load staff members: ${error.message}
            </div>
        `;
    }
}

// Display staff cards
function displayStaffCards(staffData) {
    const staffContainer = document.getElementById('staff-container');

    // Create HTML for each staff card
    const cardsHTML = staffData.map(staff => {
        return `
            <div class="staff-card">
                <div class="staff-details">
                    <div class="staff-id-badge">ID: ${staff.staff_id}</div>
                    <div class="staff-name">${staff.name}</div>
                    <div class="staff-info">
                        <div class="info-item">
                            <span class="info-label">Phone:</span>
                            <span>${staff.phone}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Email:</span>
                            <span>${staff.email || 'Not provided'}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Salary:</span>
                            <span class="salary">₹${parseFloat(staff.salary).toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    staffContainer.innerHTML = `<div class="staff-grid">${cardsHTML}</div>`;
}

// Setup event listeners for forms and modals
function setupModalEventListeners() {
    // Add staff form
    const addStaffForm = document.getElementById('addStaffForm');
    if (addStaffForm) {
        addStaffForm.addEventListener('submit', handleAddStaff);
    }
    
    // Delete staff member on button click inside modal
    const confirmDeleteStaffBtn = document.getElementById('confirmDeleteStaffBtn');
    if (confirmDeleteStaffBtn) {
        confirmDeleteStaffBtn.addEventListener('click', deleteStaff);
    }
    
    // Allow Enter key to trigger delete staff
    const deleteStaffIdInput = document.getElementById('deleteStaffId');
    if (deleteStaffIdInput) {
        deleteStaffIdInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                deleteStaff();
            }
        });
    }
}

// Handle add staff form submission
async function handleAddStaff(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    // Validate form data
    const staffFormData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        salary: parseFloat(formData.get('salary'))
    };

    const validationErrors = validateForm(staffFormData);
    if (validationErrors.length > 0) {
        showMessage('Validation errors: ' + validationErrors.join(', '), 'error');
        return;
    }

    try {
        const staffData = {
            name: staffFormData.name,
            phone: staffFormData.phone,
            email: staffFormData.email,
            salary: staffFormData.salary,
        };

        const result = await window.api.addStaff(staffData);

        if (result.success) {
            closeStaffModal('addStaffModal');
            document.getElementById('addStaffForm').reset();
            await loadStaffMembers();
            showMessage('Staff member added successfully!', 'success');
        } else {
            showMessage('Error adding staff member: ' + result.error, 'error');
        }
    } catch (error) {
        showMessage('Failed to add staff member: ' + error.message, 'error');
    }
}

// Delete staff member
async function deleteStaff() {
    const staffId = document.getElementById('deleteStaffId').value;

    if (!staffId) {
        showMessage('Please enter a Staff ID', 'error');
        return;
    }

    if (!confirm(`Are you sure you want to delete staff member with ID ${staffId}?`)) {
        return;
    }

    try {
        const result = await window.api.deleteStaff(parseInt(staffId));

        if (result.success) {
            closeStaffModal('deleteStaffModal');
            document.getElementById('deleteStaffId').value = '';
            await loadStaffMembers();
            showMessage('Staff member deleted successfully!', 'success');
        } else {
            showMessage('Error deleting staff member: ' + result.error, 'error');
        }
    } catch (error) {
        showMessage('Failed to delete staff member: ' + error.message, 'error');
    }
}

// Utility functions

// Open modal
function openStaffModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        
        // Add focus to appropriate input based on modal type
        setTimeout(() => {
            if (modalId === 'addStaffModal') {
                const firstInput = document.getElementById('addName');
                if (firstInput) firstInput.focus();
            } else if (modalId === 'deleteStaffModal') {
                const deleteIdInput = document.getElementById('deleteStaffId');
                if (deleteIdInput) deleteIdInput.focus();
            }
        }, 150);
    } else {
        console.error(`Modal with ID ${modalId} not found`);
    }
}

// Close modal
function closeStaffModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';

        // Reset forms when closing
        if (modalId === 'addStaffModal') {
            const form = document.getElementById('addStaffForm');
            if (form) form.reset();
        } else if (modalId === 'deleteStaffModal') {
            const staffIdInput = document.getElementById('deleteStaffId');
            if (staffIdInput) staffIdInput.value = '';
        }
    }
}

// Show success/error messages
function showMessage(message, type) {
    const existingMessage = document.querySelector('.success-message, .error-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;

    const contentArea = document.getElementById('content-area');
    contentArea.insertBefore(messageDiv, contentArea.firstChild);

    // Auto remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('staff-modal')) {
        closeStaffModal(e.target.id);
    }
});

// Handle escape key to close modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.staff-modal[style*="block"]');
        if (openModal) {
            closeStaffModal(openModal.id);
        }
    }
});

// Phone number validation - real-time input formatting
document.addEventListener('input', (e) => {
    if (e.target.type === 'tel') {
        // Remove non-digits
        e.target.value = e.target.value.replace(/\D/g, '');

        // Limit to 10 digits
        if (e.target.value.length > 10) {
            e.target.value = e.target.value.slice(0, 10);
        }
    }
});

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form validation
function validateForm(formData) {
    const errors = [];

    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }

    if (!formData.phone || formData.phone.replace(/\D/g, '').length !== 10) {
        errors.push('Phone number must be exactly 10 digits');
    }

    if (formData.email && formData.email.trim() !== '' && !validateEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }

    if (!formData.salary || isNaN(formData.salary) || formData.salary <= 0) {
        errors.push('Salary must be a positive number');
    }

    return errors;
}

// Refresh staff list
async function refreshStaffList() {
    await loadStaffMembers();
}

// Search functionality (for future enhancement)
function searchStaff(searchTerm) {
    const filteredData = currentStaffData.filter(staff =>
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.phone.includes(searchTerm) ||
        (staff.email && staff.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    displayStaffCards(filteredData);
}

// Format currency for display
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}