document.addEventListener('DOMContentLoaded', function() {
    const themeSelect = document.getElementById('theme-select');
    const saveButton = document.getElementById('save-theme');

    // Load the saved theme from localStorage, or default to 'dark-theme'
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    document.documentElement.className = savedTheme;
    themeSelect.value = savedTheme.replace('-theme', '');

    saveButton.addEventListener('click', function() {
        const selectedTheme = themeSelect.value + '-theme';
        document.documentElement.className = selectedTheme;
        localStorage.setItem('theme', selectedTheme);
    });
});
