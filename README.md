# Dental Directory

A directory of dentists and dental specialists, inspired by the Psychology Today registry. Two independent parts:

```
directorio-medico/
├── backend/          Supabase: SQL schema, RLS, storage
│   ├── schema.sql
│   └── README.md
└── frontend/         React + Vite + Tailwind
    └── src/
        ├── lib/          Supabase client and validation
        ├── context/      AuthContext (session + profile)
        ├── components/   UI, layout, and form steps
        └── pages/        Home, Profile, Register, Login, Dashboard
```

## Getting started

**1. Backend** — follow `backend/README.md`: create the Supabase project, run `schema.sql`, and disable *Confirm email* while developing.

**2. Frontend**

```bash
cd frontend
npm install
cp .env.example .env      # paste your URL and anon key
npm run dev
```

Open http://localhost:5173 → the public directory (`/`) lists published dentists; `/register` creates a new profile.

## Registration, step by step

| Step | Fields | What happens behind the scenes |
|---|---|---|
| 01 Account | username, email, password | The username is checked against the `username_available` RPC when the field loses focus |
| 02 Profile | name, specialty, license, phone, address, photo | The photo is only previewed; nothing is uploaded yet |
| 03 Review | editable summary | `signUp` creates the user, the trigger creates the profile, the photo is uploaded to Storage, and `profiles` is completed |

Navigation between steps only validates that step's fields, so no one reaches the end with an invalid email.

## Decisions worth knowing

- **Supabase is the backend.** Auth, database, and files. There's no Node server to maintain, and everything fits the free tier.
- **Security lives in the RLS policies**, not in the client. Even if someone tampers with the JavaScript, Postgres still rejects writes to someone else's profile.
- **The username is stored in `user_metadata` during signUp** so the trigger can create the profile in the same transaction, avoiding a second call that could fail and leave users without a profile.
- **The photo is uploaded after there's a session.** Without a session there's no `auth.uid()` and the Storage policy rejects the upload — that's why, with email confirmation enabled, the form warns and leaves the photo for the first sign-in.

## Natural next steps

1. Profile editing from the dashboard — including the richer profile-page fields (bio, services, insurance, languages, education, office hours, website) that `schema.sql` now has columns for but the registration wizard doesn't collect yet.
2. A "publish" toggle on the dashboard, so a dentist can set `is_published = true` once their profile is complete.
3. Dental license verification via an Edge Function with `service_role`.
