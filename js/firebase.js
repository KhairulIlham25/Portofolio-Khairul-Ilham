// ============================================
// firebase.js - Firebase Integration
// ============================================

const firebaseConfig = {
    apiKey: "AIzaSyARTikix8fmIdzJZLAXZmy4UcoIi16MIRQ",
    authDomain: "portfolio-khairul-ilham.firebaseapp.com",
    projectId: "portfolio-khairul-ilham",
    storageBucket: "portfolio-khairul-ilham.firebasestorage.app",
    messagingSenderId: "1029096419197",
    appId: "1:1029096419197:web:90484d8274166a700de614",
    measurementId: "G-FVHDPZCV7F"
};

// Initialize Firebase
let app, db, auth;
try {
    app = firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    auth = firebase.auth();
    console.log('[Firebase] Initialized successfully.');
} catch (e) {
    console.error('[Firebase] Initialization error:', e);
}

/**
 * Contact Form Submission via Firebase Firestore
 * @param {Object} data - { name, email, subject, message }
 * @returns {Promise}
 */
async function saveContactToFirebase(data) {
    try {
        await db.collection('contacts').add({
            ...data,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            read: false
        });
        console.log('[Firebase] Contact saved successfully.');
        return { success: true };
    } catch (e) {
        console.error('[Firebase] Error saving contact:', e);
        return { success: false, error: e.message };
    }
}

/**
 * Admin Login via Firebase Auth
 * @param {string} email
 * @param {string} password
 * @returns {Promise}
 */
async function adminLogin(email, password) {
    try {
        const result = await auth.signInWithEmailAndPassword(email, password);
        return { success: true, user: result.user };
    } catch (e) {
        return { success: false, error: e.message };
    }
}

/**
 * Admin Logout
 * @returns {Promise}
 */
async function adminLogout() {
    try {
        await auth.signOut();
        console.log('[Firebase] Admin logged out.');
        return { success: true };
    } catch (e) {
        return { success: false, error: e.message };
    }
}

// Export for use in other scripts
window.FirebaseService = {
    saveContact: saveContactToFirebase,
    adminLogin: adminLogin,
    adminLogout: adminLogout,
    config: firebaseConfig
};
