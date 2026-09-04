// Where Supabase should send the user after they click the link in a
// password-reset email. Derived from the current origin so it works on
// localhost and on the deployed site without a rebuild — but the exact
// URL must also be allow-listed under Authentication > URL Configuration
// > Redirect URLs in the Supabase dashboard, or the link falls back to
// the project's Site URL.
export const passwordResetRedirectTo = () => `${window.location.origin}/reset-password`
