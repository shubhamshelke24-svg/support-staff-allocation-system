// Admin Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminDashboard();
});

function initializeAdminDashboard() {
    // Check authentication
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'admin') {
        window.location.href = '../../auth/login.html';
        return;
    }

    // Update user info
    updateUserInfo(currentUser);

    // Initialize page-specific functionality
    initializePageFeatures();

    // Load dashboard data
    loadDashboardData();
}

function updateUserInfo(user) {
    const userNameElement = document.getElementById('userName');
    const userAvatarElement = document.getElementById('userAvatar');
    
    if (userNameElement) {
        userNameElement.textContent = user.name || 'System Administrator';
    }
    if (userAvatarElement) {
        userAvatarElement.textContent = getInitials(user.name || 'Admin');
    }
}

function getInitials(name) {
    if (!name) return 'A';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function initializePageFeatures() {
    // Initialize charts if they exist on the page
    if (document.getElementById('departmentChart') || 
        document.getElementById('performanceChart') ||
        document.getElementById('departmentPerformanceChart') ||
        document.getElementById('departmentDistributionChart') ||
        document.getElementById('attendanceTrendChart') ||
        document.getElementById('performanceMetricsChart')) {
        initializeCharts();
    }

    // Initialize data tables if they exist
    if (document.querySelector('.table')) {
        initializeDataTables();
    }

    // Initialize modals if they exist
    initializeModals();

    // Initialize form handlers
    initializeFormHandlers();

    // Set up real-time updates for overview page
    if (window.location.pathname.includes('overview.html') || 
        window.location.pathname.includes('index.html')) {
        setupRealTimeUpdates();
    }
}

function initializeCharts() {
    console.log('Initializing charts...');
    
    // Department Distribution Chart (Overview Page)
    const deptChart = document.getElementById('departmentChart');
    if (deptChart) {
        const ctx = deptChart.getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Cleaning', 'Nursing', 'Laboratory', 'Administrative', 'Operational'],
                datasets: [{
                    data: [35, 25, 20, 12, 8],
                    backgroundColor: [
                        '#1a73e8',
                        '#34a853',
                        '#f9ab00',
                        '#ea4335',
                        '#4285f4'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Performance Chart (Overview Page)
    const perfChart = document.getElementById('performanceChart');
    if (perfChart) {
        const ctx = perfChart.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Cleaning', 'Nursing', 'Laboratory', 'Admin', 'Ops'],
                datasets: [{
                    label: 'Average Rating',
                    data: [4.2, 4.5, 4.3, 4.1, 4.0],
                    backgroundColor: '#1a73e8',
                    borderColor: '#0d47a1',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5
                    }
                }
            }
        });
    }

    // Department Performance Chart (Overview Page)
    const deptPerfChart = document.getElementById('departmentPerformanceChart');
    if (deptPerfChart) {
        const ctx = deptPerfChart.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        label: 'Cleaning',
                        data: [85, 88, 90, 92, 91, 89, 92],
                        backgroundColor: '#1a73e8',
                        borderColor: '#0d47a1',
                        borderWidth: 1
                    },
                    {
                        label: 'Nursing',
                        data: [82, 85, 87, 88, 86, 85, 88],
                        backgroundColor: '#34a853',
                        borderColor: '#2e7d32',
                        borderWidth: 1
                    },
                    {
                        label: 'Laboratory',
                        data: [80, 82, 83, 85, 84, 82, 85],
                        backgroundColor: '#f9ab00',
                        borderColor: '#f57c00',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Completion Rate (%)'
                        }
                    }
                }
            }
        });
    }

    // Department Distribution Chart (Overview Page)
    const deptDistChart = document.getElementById('departmentDistributionChart');
    if (deptDistChart) {
        const ctx = deptDistChart.getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Cleaning', 'Nursing', 'Laboratory', 'Administrative', 'Operational'],
                datasets: [{
                    data: [35, 25, 20, 12, 8],
                    backgroundColor: [
                        '#1a73e8',
                        '#34a853',
                        '#f9ab00',
                        '#ea4335',
                        '#4285f4'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Attendance Trend Chart (Overview Page)
    const attendanceChart = document.getElementById('attendanceTrendChart');
    if (attendanceChart) {
        const ctx = attendanceChart.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Attendance Rate',
                    data: [92, 94, 93, 95],
                    borderColor: '#1a73e8',
                    backgroundColor: 'rgba(26, 115, 232, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Attendance Rate (%)'
                        }
                    }
                }
            }
        });
    }

    // Performance Metrics Chart (Overview Page)
    const metricsChart = document.getElementById('performanceMetricsChart');
    if (metricsChart) {
        const ctx = metricsChart.getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Task Completion', 'On-time Performance', 'Quality Rating', 'Efficiency', 'Attendance'],
                datasets: [{
                    label: 'Current Month',
                    data: [89, 85, 87, 82, 94],
                    backgroundColor: 'rgba(26, 115, 232, 0.2)',
                    borderColor: '#1a73e8',
                    borderWidth: 2,
                    pointBackgroundColor: '#1a73e8'
                }, {
                    label: 'Previous Month',
                    data: [85, 82, 84, 80, 92],
                    backgroundColor: 'rgba(52, 168, 83, 0.2)',
                    borderColor: '#34a853',
                    borderWidth: 2,
                    pointBackgroundColor: '#34a853'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    // Attendance Chart (Attendance Page)
    const attendanceCtx = document.getElementById('attendanceChart');
    if (attendanceCtx) {
        const ctx = attendanceCtx.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['1 Jan', '2 Jan', '3 Jan', '4 Jan', '5 Jan', '6 Jan', '7 Jan', '8 Jan', '9 Jan', '10 Jan', '11 Jan', '12 Jan', '13 Jan', '14 Jan', '15 Jan'],
                datasets: [{
                    label: 'Present Staff',
                    data: [138, 140, 142, 139, 141, 143, 140, 142, 141, 143, 142, 140, 139, 141, 142],
                    borderColor: '#34a853',
                    backgroundColor: 'rgba(52, 168, 83, 0.1)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Absent Staff',
                    data: [12, 10, 8, 11, 9, 7, 10, 8, 9, 7, 8, 10, 11, 9, 8],
                    borderColor: '#ea4335',
                    backgroundColor: 'rgba(234, 67, 53, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Staff'
                        }
                    }
                }
            }
        });
    }
}

function initializeDataTables() {
    // Add sorting functionality to tables
    const tables = document.querySelectorAll('.table');
    tables.forEach(table => {
        const headers = table.querySelectorAll('th');
        headers.forEach((header, index) => {
            if (!header.querySelector('.no-sort')) {
                header.style.cursor = 'pointer';
                header.addEventListener('click', () => {
                    sortTable(table, index);
                });
            }
        });
    });
}

function sortTable(table, columnIndex) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const isNumeric = !isNaN(parseFloat(rows[0].cells[columnIndex].textContent));
    
    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent.trim();
        const bValue = b.cells[columnIndex].textContent.trim();
        
        if (isNumeric) {
            return parseFloat(aValue) - parseFloat(bValue);
        } else {
            return aValue.localeCompare(bValue);
        }
    });
    
    // Remove existing rows
    rows.forEach(row => tbody.removeChild(row));
    
    // Add sorted rows
    rows.forEach(row => tbody.appendChild(row));
}

function initializeModals() {
    // Close modals when clicking outside
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Close modals with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
}

function initializeFormHandlers() {
    // Handle all form submissions in admin dashboard
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    });

    // Add input validation
    const requiredInputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

function validateField(field) {
    if (!field.value.trim()) {
        field.style.borderColor = '#ea4335';
        showFieldError(field, 'This field is required');
    } else {
        field.style.borderColor = '#34a853';
        clearFieldError(field);
    }
}

function showFieldError(field, message) {
    clearFieldError(field);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#ea4335';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function handleFormSubmission(form) {
    const formData = new FormData(form);
    const formName = form.id || 'form';
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        showNotification(`${formName.replace('-', ' ')} submitted successfully!`, 'success');
        
        // Reset form and button
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Close modal if this is a modal form
        const modal = form.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }, 1500);
}

function loadDashboardData() {
    console.log('Loading dashboard data...');
    
    // Simulate loading data from API
    setTimeout(() => {
        updateDashboardStats();
        updateRecentActivities();
    }, 1000);
}

function updateDashboardStats() {
    // This would update stats from real API data
    const statCards = document.querySelectorAll('.stat-card .stat-value');
    if (statCards.length > 0) {
        console.log('Updating dashboard statistics...');
    }
}

function updateRecentActivities() {
    // This would update recent activities from real API data
    const activityFeed = document.querySelector('.activity-feed');
    if (activityFeed) {
        console.log('Updating recent activities...');
    }
}

function setupRealTimeUpdates() {
    // Set up periodic updates for real-time data
    setInterval(() => {
        updateRealTimeData();
    }, 30000); // Update every 30 seconds
}

function updateRealTimeData() {
    // This would fetch real-time data from the server
    console.log('Updating real-time data...');
}

// Navigation and UI Functions
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (sidebar && mainContent) {
        sidebar.classList.toggle('active');
        if (sidebar.classList.contains('active')) {
            mainContent.style.marginLeft = '260px';
        } else {
            mainContent.style.marginLeft = '0';
        }
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = '../../auth/login.html';
    }
}

// Staff Management Functions
function showAddStaffModal() {
    document.getElementById('addStaffModal').style.display = 'block';
}

function closeAddStaffModal() {
    document.getElementById('addStaffModal').style.display = 'none';
}

function saveStaff() {
    const form = document.getElementById('addStaffForm');
    if (!form.checkValidity()) {
        alert('Please fill all required fields.');
        return;
    }

    showNotification('Staff member added successfully!', 'success');
    closeAddStaffModal();
    form.reset();
}

function editStaff(staffId) {
    showNotification(`Editing staff member: ${staffId}`, 'info');
    // Implementation for editing staff
}

function viewStaff(staffId) {
    showNotification(`Viewing staff details: ${staffId}`, 'info');
    // Implementation for viewing staff details
}

function deleteStaff(staffId) {
    if (confirm('Are you sure you want to delete this staff member? This action cannot be undone.')) {
        showNotification(`Staff member ${staffId} deleted successfully`, 'success');
        // Implementation for deleting staff
    }
}

function filterStaffByDepartment(dept) {
    console.log('Filtering by department:', dept);
    showNotification(`Filtered by department: ${dept}`, 'info');
}

function filterStaffByStatus(status) {
    console.log('Filtering by status:', status);
    showNotification(`Filtered by status: ${status}`, 'info');
}

function searchStaff(query) {
    console.log('Searching staff:', query);
    if (query.length >= 2) {
        showNotification(`Searching for: ${query}`, 'info');
    }
}

function exportStaffData() {
    showNotification('Exporting staff data to Excel...', 'success');
    // Implementation for data export
}

// Duty Management Functions
function showAssignDutyModal() {
    document.getElementById('assignDutyModal').style.display = 'block';
}

function closeAssignDutyModal() {
    document.getElementById('assignDutyModal').style.display = 'none';
}

function assignDuty() {
    showNotification('Duty assigned successfully!', 'success');
    closeAssignDutyModal();
}

function approveRequest(requestId) {
    if (confirm('Approve this extension request?')) {
        showNotification(`Request ${requestId} approved!`, 'success');
    }
}

function rejectRequest(requestId) {
    if (confirm('Reject this extension request?')) {
        showNotification(`Request ${requestId} rejected!`, 'warning');
    }
}

// Report Generation Functions
function generateReport() {
    const reportType = document.getElementById('reportType').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    if (!reportType || !startDate || !endDate) {
        showNotification('Please fill all required fields', 'warning');
        return;
    }
    
    showNotification('Generating report... This may take a few moments.', 'info');
    
    setTimeout(() => {
        showNotification('Report generated successfully! Starting download...', 'success');
    }, 2000);
}

function quickReport(type) {
    const today = new Date().toISOString().split('T')[0];
    const firstDay = today.substring(0, 8) + '01';
    
    document.getElementById('reportType').value = type;
    document.getElementById('startDate').value = firstDay;
    document.getElementById('endDate').value = today;
    
    generateReport();
}

function downloadReport(reportId) {
    showNotification(`Downloading report: ${reportId}`, 'info');
}

function viewReport(reportId) {
    showNotification(`Opening report: ${reportId}`, 'info');
}

function deleteReport(reportId) {
    if (confirm('Are you sure you want to delete this report?')) {
        showNotification(`Report deleted: ${reportId}`, 'success');
    }
}

// Settings Functions
function showSection(section) {
    // Hide all sections
    document.querySelectorAll('.settings-section').forEach(sec => {
        sec.style.display = 'none';
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section and activate button
    document.getElementById(section + '-section').style.display = 'block';
    event.target.classList.add('active');
}

function createBackup() {
    showNotification('Creating system backup... This may take a few minutes.', 'info');
}

// Notification System
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideInRight 0.3s ease;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#34a853',
        error: '#ea4335',
        warning: '#f9ab00',
        info: '#1a73e8'
    };
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-triangle',
        warning: 'exclamation-circle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Utility Functions
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatTime(time) {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for global access
window.toggleSidebar = toggleSidebar;
window.logout = logout;
window.showAddStaffModal = showAddStaffModal;
window.closeAddStaffModal = closeAddStaffModal;
window.saveStaff = saveStaff;
window.editStaff = editStaff;
window.viewStaff = viewStaff;
window.deleteStaff = deleteStaff;
window.filterStaffByDepartment = filterStaffByDepartment;
window.filterStaffByStatus = filterStaffByStatus;
window.searchStaff = searchStaff;
window.exportStaffData = exportStaffData;
window.showAssignDutyModal = showAssignDutyModal;
window.closeAssignDutyModal = closeAssignDutyModal;
window.assignDuty = assignDuty;
window.approveRequest = approveRequest;
window.rejectRequest = rejectRequest;
window.generateReport = generateReport;
window.quickReport = quickReport;
window.downloadReport = downloadReport;
window.viewReport = viewReport;
window.deleteReport = deleteReport;
window.showSection = showSection;
window.createBackup = createBackup;
window.showNotification = showNotification;

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: auto;
    }
    
    .field-error {
        color: #ea4335;
        font-size: 0.8rem;
        margin-top: 5px;
    }
`;
document.head.appendChild(style);