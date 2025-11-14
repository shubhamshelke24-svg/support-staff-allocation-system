// Operator Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'operator') {
        window.location.href = '../../auth/login.html';
        return;
    }

    // Update user info
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userAvatar').textContent = getInitials(currentUser.name);

    // Load operator data
    loadOperatorData();
});

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function loadOperatorData() {
    // Simulate loading operator-specific data
    console.log('Loading operator dashboard data...');
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    sidebar.classList.toggle('active');
    if (sidebar.classList.contains('active')) {
        mainContent.style.marginLeft = '260px';
    } else {
        mainContent.style.marginLeft = '0';
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '../../auth/login.html';
}

// Duty Allocation Functions
function assignDuty(staffId, taskDetails) {
    // Implementation for duty assignment
    console.log('Assigning duty to staff:', staffId, taskDetails);
}

function approveTask(taskId) {
    if (confirm('Approve this completed task?')) {
        // API call to approve task
        alert('Task approved successfully!');
    }
}

function requestRevision(taskId) {
    const reason = prompt('Enter revision reason:');
    if (reason) {
        // API call to request revision
        alert('Revision requested!');
    }
}