# Backend — Supabase (Free plan)

In this project Supabase **is** the backend: Postgres database, authentication, and file storage. No server of your own is needed for login/registration.

## Setup (5 minutes)

1. **Create a project** at https://supabase.com → New project. Save the database password.
2. **Run the schema**: SQL Editor → New query → paste all of `schema.sql` → Run.
3. **Configure Auth**: Authentication → Providers → Email.
   - In development, disable *Confirm email*. That way `signUp` returns a session instantly and the photo-upload step works without leaving the form.
   - In production, enable it and use the email confirmation flow.
4. **Copy credentials**: Project Settings → API. You need the `Project URL` and the `anon public` key. These go in the frontend's `.env`.

## What the schema creates

| Object | Purpose |
|---|---|
| `public.profiles` | Dentist data: username, name, phone, address, specialty, photo, plus profile-page detail fields (degree, education, years of experience, languages, services offered, insurance accepted, payment methods, age groups treated, office hours, website, accepting-new-patients status) |
| `handle_new_user()` | Trigger that creates the `profiles` row as soon as the user is created in `auth.users` |
| RLS policies | Each user only reads and edits their own profile; profiles with `is_published = true` are public |
| `username_available(text)` | Public function to validate the username in step 1, before the account exists |
| `avatars` bucket | Profile photos. Each user writes only inside `avatars/<their-uid>/` |

## About the `anon` key

It's a public key, it goes in the frontend, and it's not a secret: real security comes from the RLS policies. The `service_role` key must **never** leave the server — don't put it in React.

## If you want your own backend later

When business rules appear that don't fit in RLS (payments, dental license verification, sending emails), add Supabase Edge Functions or a separate Express server that uses `service_role`. The frontend doesn't change: it still talks to `supabase-js` for login.
