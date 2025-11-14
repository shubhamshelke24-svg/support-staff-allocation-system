// Staff Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.role !== 'staff') {
        window.location.href = '../../auth/login.html';
        return;
    }

    // Update user info
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userAvatar').textContent = getInitials(currentUser.name);

    // Load staff data
    loadStaffData();
});

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function loadStaffData() {
    // Simulate loading staff-specific data
    console.log('Loading staff dashboard data...');
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

// Task Management Functions
function checkIn(taskId) {
    // Simulate QR scanning
    const qrCode = prompt('Scan QR code or enter manually:');
    if (qrCode) {
        // API call to check in
        alert('Checked in successfully for task!');
    }
}

function checkOut(taskId) {
    const qrCode = prompt('Scan QR code or enter manually:');
    if (qrCode) {
        // API call to check out
        alert('Checked out successfully!');
    }
}

function uploadProof(taskId) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // API call to upload proof
            alert('Proof uploaded successfully! Waiting for operator approval.');
        }
    };
    fileInput.click();
}

function requestExtension(taskId) {
    const minutes = prompt('Enter extension time in minutes (max 20):');
    if (minutes && minutes <= 20) {
        const reason = prompt('Reason for extension:');
        if (reason) {
            // API call to request extension
            alert('Extension request submitted!');
        }
    } else {
        alert('Maximum extension time is 20 minutes.');
    }
}