// ============================================
// theme.js - Dark/Light Mode Manager
// Uses localStorage to persist theme preference
// ============================================

(function() {
    'use strict';

    const THEME_KEY = 'portfolio-theme';

    /**
     * Apply the given theme to the document root.
     * @param {string} theme - 'dark' | 'light'
     */
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
    }

    /**
     * Get the user's saved preference or default to 'light'.
     * @returns {string}
     */
    function getSavedTheme() {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved) return saved;
        // Respect OS preference if no saved preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    /**
     * Toggle between dark and light mode.
     */
    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        applyTheme(current === 'dark' ? 'light' : 'dark');
    }

    /**
     * Initialize theme on page load — must be called ASAP to prevent flash.
     */
    function initTheme() {
        applyTheme(getSavedTheme());
    }

    // Initialize immediately
    initTheme();

    // Expose to global scope for button onclick
    window.ThemeManager = {
        toggle: toggleTheme,
        apply: applyTheme,
        get: function() {
            return document.documentElement.getAttribute('data-theme') || 'light';
        }
    };

})();
