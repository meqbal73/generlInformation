/**
 * Ultimate Solutions LMS - Core Application Logic
 * Architecture: Modular, LocalStorage-driven
 */

const AppState = {
    theme: 'light',
    xp: 0,
    level: 1,
    streak: 1,
    progress: 0, // percentage
    completedLessons: [],
    bookmarks: [],
    notes: {}
};

// ==========================================================================
// Initialization & Local Storage
// ==========================================================================

function initApp() {
    loadData();
    applyTheme();
    updateUI();
    setupEventListeners();
}

function loadData() {
    const savedData = localStorage.getItem('ultimate_lms_data');
    if (savedData) {
        Object.assign(AppState, JSON.parse(savedData));
    } else {
        saveData(); // Initial save
    }
}

function saveData() {
    localStorage.setItem('ultimate_lms_data', JSON.stringify(AppState));
}

// ==========================================================================
// Core Features: Theme, UI, Progress
// ==========================================================================

function applyTheme() {
    if (AppState.theme === 'dark') {
        document.body.classList.replace('light-theme', 'dark-theme');
    } else {
        document.body.classList.replace('dark-theme', 'light-theme');
    }
}

function toggleTheme() {
    AppState.theme = AppState.theme === 'light' ? 'dark' : 'light';
    applyTheme();
    saveData();
    showToast(`Switched to ${AppState.theme} theme`);
}

function updateUI() {
    document.getElementById('user-xp').textContent = AppState.xp;
    document.getElementById('user-level').textContent = AppState.level;
    document.getElementById('user-streak').textContent = AppState.streak;
}

// ==========================================================================
// Utility Functions (Toast, Scroll Tracking)
// ==========================================================================

function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // Add basic styling dynamically for the toast
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = 'var(--text-main)';
    toast.style.color = 'var(--bg-color)';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    
    container.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.style.opacity = '1', 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Scroll Progress Tracker
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progress-bar').style.width = scrolled + '%';
});

function setupEventListeners() {
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    // Basic Routing/Navigation Listener setup
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
            // Future implementation: load specific module content
        });
    });
}

// Boot the application
document.addEventListener('DOMContentLoaded', initApp);
