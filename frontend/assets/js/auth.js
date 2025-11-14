// Authentication JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;
            
            // Validation
            if (!username || !password || !role) {
                showAlert('Please fill in all fields', 'warning');
                return;
            }
            
            // Demo authentication
            const demoAccounts = {
                'admin': { 
                    password: 'admin123', 
                    redirect: '../dashboard/admin/index.html',
                    user: { name: 'System Admin', role: 'admin' }
                },
                'operator': { 
                    password: 'operator123', 
                    redirect: '../dashboard/operator/index.html',
                    user: { name: 'Department Operator', role: 'operator', department: 'Cleaning' }
                },
                'staff': { 
                    password: 'staff123', 
                    redirect: '../dashboard/staff/index.html',
                    user: { name: 'John Doe', role: 'staff', department: 'Cleaning' }
                }
            };
            
            if (demoAccounts[username] && demoAccounts[username].password === password) {
                // Store user session
                const userData = {
                    ...demoAccounts[username].user,
                    username: username,
                    loginTime: new Date().toISOString()
                };
                localStorage.setItem('currentUser', JSON.stringify(userData));
                
                showAlert('Login successful! Redirecting...', 'success');
                
                // Redirect after delay
                setTimeout(() => {
                    window.location.href = demoAccounts[username].redirect;
                }, 1000);
            } else {
                showAlert('Invalid credentials! Please use demo accounts.', 'danger');
            }
        });
    }
    
    // Check if already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && window.location.pathname.includes('login.html')) {
        const user = JSON.parse(currentUser);
        window.location.href = `../dashboard/${user.role}/index.html`;
    }
});

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `medical-alert alert-${type}`;
    alertDiv.innerHTML = `
        <i class="fas fa-${getAlertIcon(type)}"></i>
        ${message}
    `;
    
    // Add styles for alert
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '10000';
    alertDiv.style.minWidth = '300px';
    alertDiv.style.padding = '15px 20px';
    alertDiv.style.borderRadius = '8px';
    alertDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    
    document.body.appendChild(alertDiv);
    
    // Remove alert after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

function getAlertIcon(type) {
    const icons = {
        'success': 'check-circle',
        'danger': 'exclamation-triangle',
        'warning': 'exclamation-circle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}