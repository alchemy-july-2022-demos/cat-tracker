const SUPABASE_URL = 'https://jasyhcsqgldsmfkurobj.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imphc3loY3NxZ2xkc21ma3Vyb2JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjEyMDI0NDIsImV4cCI6MTk3Njc3ODQ0Mn0.74E0UgNsbpI3tgSt6yrAijTNHEYMC5GmoIgDrpqctB0';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export function checkAuth() {
    const user = getUser();
    // do we have a user?
    if (!user) {
        // path is different if we are at home page versus any other page
        const authUrl = location.pathname === '/' ? './auth/' : '../auth/';
        // include the current url as a "redirectUrl" search param so user can come
        // back to this page after they sign in...
        location.replace(`${authUrl}?redirectUrl=${encodeURIComponent(location)}`);
    }

    // return the user so can be used in the page if needed
    return user;
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */

export async function addCat(cat) {
    return await client.from('cats').insert(cat).single();
}

export async function getCats() {
    return await client.from('cats').select();
}

export async function deleteCat(id) {
    return await client.from('cats').delete().match({ id });
}

export async function updateCat(id, cat) {
    return await client.from('cats').update(cat).match({ id }).single();
}
