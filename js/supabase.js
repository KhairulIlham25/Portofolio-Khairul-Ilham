// ============================================
// supabase.js - Supabase Client & Service Layer
// ============================================

const SUPABASE_URL = 'https://dizgkuhcblnonvmwiabu.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpemdrdWhjYmxub252bXdpYWJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyODkyMzUsImV4cCI6MjA5Nzg2NTIzNX0.dyQyanPl602AsXQSF6DaCdc34oGbnuMaXNt3YBW4BzE';

const _db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

// ── Auth ─────────────────────────────────────
const auth = {
    async signIn(email, password) {
        const { data, error } = await _db.auth.signInWithPassword({ email, password });
        return { data, error };
    },
    async signOut() {
        const { error } = await _db.auth.signOut();
        return { error };
    },
    async getUser() {
        const { data, error } = await _db.auth.getUser();
        return { data, error };
    },
    onAuthChange(cb) {
        return _db.auth.onAuthStateChange(cb);
    }
};

// ── Profile ──────────────────────────────────
const profile = {
    async get() {
        const { data, error } = await _db.from('profiles').select('*').limit(1).single();
        return { data, error };
    },
    async update(updates) {
        const { data: existing } = await _db.from('profiles').select('id').limit(1).single();
        if (!existing) return { error: 'No profile found' };
        const { data, error } = await _db.from('profiles').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', existing.id).select().single();
        return { data, error };
    }
};

// ── Contacts / Messages ───────────────────────
const contacts = {
    async getAll() {
        const { data, error } = await _db.from('messages').select('*').order('created_at', { ascending: false });
        return { data, error };
    },
    async add(payload) {
        const { data, error } = await _db.from('messages').insert([payload]).select().single();
        return { data, error };
    },
    async markRead(id, is_read = true) {
        const { data, error } = await _db.from('messages').update({ is_read }).eq('id', id).select().single();
        return { data, error };
    },
    async delete(id) {
        const { error } = await _db.from('messages').delete().eq('id', id);
        return { error };
    }
};

// ── Projects ──────────────────────────────────
const projects = {
    async getAll() {
        const { data, error } = await _db.from('projects').select('*').order('sort_order', { ascending: true });
        return { data, error };
    },
    async getById(id) {
        const { data, error } = await _db.from('projects').select('*').eq('id', id).single();
        return { data, error };
    },
    async create(payload) {
        const { data, error } = await _db.from('projects').insert([payload]).select().single();
        return { data, error };
    },
    async update(id, updates) {
        const { data, error } = await _db.from('projects').update(updates).eq('id', id).select().single();
        return { data, error };
    },
    async delete(id) {
        const { error } = await _db.from('projects').delete().eq('id', id);
        return { error };
    }
};

// ── Articles ──────────────────────────────────
const articles = {
    async getAll() {
        const { data, error } = await _db.from('articles').select('*').order('created_at', { ascending: false });
        return { data, error };
    },
    async getById(id) {
        const { data, error } = await _db.from('articles').select('*').eq('id', id).single();
        return { data, error };
    },
    async getBySlug(slug) {
        const { data, error } = await _db.from('articles').select('*').eq('slug', slug).single();
        return { data, error };
    },
    async create(payload) {
        const { data, error } = await _db.from('articles').insert([payload]).select().single();
        return { data, error };
    },
    async update(id, updates) {
        const { data, error } = await _db.from('articles').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id).select().single();
        return { data, error };
    },
    async delete(id) {
        const { error } = await _db.from('articles').delete().eq('id', id);
        return { error };
    }
};

// ── Experiences ───────────────────────────────
const experiences = {
    async getAll() {
        const { data, error } = await _db.from('experiences').select('*').order('sort_order', { ascending: true });
        return { data, error };
    },
    async create(payload) {
        const { data, error } = await _db.from('experiences').insert([payload]).select().single();
        return { data, error };
    },
    async update(id, updates) {
        const { data, error } = await _db.from('experiences').update(updates).eq('id', id).select().single();
        return { data, error };
    },
    async delete(id) {
        const { error } = await _db.from('experiences').delete().eq('id', id);
        return { error };
    }
};

// ── Skills ────────────────────────────────────
const skills = {
    async getAll() {
        const { data, error } = await _db.from('skill_categories').select('*, skills(*)').order('sort_order', { ascending: true });
        return { data, error };
    },
    async createCategory(payload) {
        const { data, error } = await _db.from('skill_categories').insert([payload]).select().single();
        return { data, error };
    },
    async updateCategory(id, updates) {
        const { data, error } = await _db.from('skill_categories').update(updates).eq('id', id).select().single();
        return { data, error };
    },
    async deleteCategory(id) {
        const { error } = await _db.from('skill_categories').delete().eq('id', id);
        return { error };
    },
    async createItem(payload) {
        const { data, error } = await _db.from('skills').insert([payload]).select().single();
        return { data, error };
    },
    async updateItem(id, updates) {
        const { data, error } = await _db.from('skills').update(updates).eq('id', id).select().single();
        return { data, error };
    },
    async deleteItem(id) {
        const { error } = await _db.from('skills').delete().eq('id', id);
        return { error };
    }
};

// ── Storage ───────────────────────────────────
const storage = {
    async upload(bucket, path, file) {
        const { data, error } = await _db.storage.from(bucket).upload(path, file, { upsert: true });
        return { data, error };
    },
    getUrl(bucket, path) {
        const { data } = _db.storage.from(bucket).getPublicUrl(path);
        return data?.publicUrl || '';
    },
    async delete(bucket, path) {
        const { error } = await _db.storage.from(bucket).remove([path]);
        return { error };
    }
};

// ── Export ────────────────────────────────────
window.SupabaseService = { auth, profile, contacts, projects, articles, experiences, skills, storage };
console.log('[Supabase] Client ready.');

