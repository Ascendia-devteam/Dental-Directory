-- ============================================================
--  DENTAL DIRECTORY — Database schema (Supabase Free)
--  Run in full at: Supabase Dashboard > SQL Editor > New query
-- ============================================================

-- ------------------------------------------------------------
-- 1. PROFILES TABLE
--    auth.users is managed by Supabase (email + password).
--    profiles stores everything else, 1-to-1 with the user.
-- ------------------------------------------------------------
create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  username     text unique not null,
  full_name    text,
  phone        text,
  address      text,
  specialty    text,
  license_no   text,
  bio          text,
  avatar_url   text,
  is_published boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),

  constraint username_length  check (char_length(username) between 3 and 30),
  constraint username_format  check (username ~ '^[a-z0-9_]+$')
);

create index if not exists profiles_username_idx  on public.profiles (username);
create index if not exists profiles_specialty_idx on public.profiles (specialty);

-- automatic updated_at
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- ------------------------------------------------------------
-- 2. TRIGGER: automatically create the profile on sign-up
--    Reads the username from raw_user_meta_data (sent by the
--    frontend in signUp -> options.data).
-- ------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username, full_name, phone, address)
  values (
    new.id,
    coalesce(
      lower(new.raw_user_meta_data ->> 'username'),
      'user_' || substr(new.id::text, 1, 8)
    ),
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'phone',
    new.raw_user_meta_data ->> 'address'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ------------------------------------------------------------
-- 3. ROW LEVEL SECURITY
--    Rule: everyone edits only their own profile.
--    Public read access only for published profiles
--    (this feeds the public dentist directory, in the style of
--    Psychology Today's professional listings).
-- ------------------------------------------------------------
alter table public.profiles enable row level security;

drop policy if exists "published profiles visible to everyone" on public.profiles;
create policy "published profiles visible to everyone"
  on public.profiles for select
  using (is_published = true);

drop policy if exists "each user reads their own profile" on public.profiles;
create policy "each user reads their own profile"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "each user edits their own profile" on public.profiles;
create policy "each user edits their own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "each user inserts their own profile" on public.profiles;
create policy "each user inserts their own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

-- ------------------------------------------------------------
-- 4. RPC: check whether a username is available
--    Called WITHOUT a session (registration step 1), which is
--    why it's security definer and only returns a boolean.
-- ------------------------------------------------------------
create or replace function public.username_available(candidate text)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select not exists (
    select 1 from public.profiles where username = lower(candidate)
  );
$$;

grant execute on function public.username_available(text) to anon, authenticated;

-- ------------------------------------------------------------
-- 5. STORAGE: public bucket for profile photos
--    Each user can only write inside their own <uid>/ folder
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

drop policy if exists "avatars public read" on storage.objects;
create policy "avatars public read"
  on storage.objects for select
  using (bucket_id = 'avatars');

drop policy if exists "avatars own upload" on storage.objects;
create policy "avatars own upload"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "avatars own update" on storage.objects;
create policy "avatars own update"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "avatars own delete" on storage.objects;
create policy "avatars own delete"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- ------------------------------------------------------------
-- 6. PROFILE DETAIL FIELDS
--    Richer fields for the public profile page: about, services,
--    insurance, education, contact/office details. Added with
--    ALTER TABLE (rather than folded into the CREATE TABLE above)
--    so this file stays idempotent whether profiles already exists
--    or is being created fresh.
-- ------------------------------------------------------------
alter table public.profiles
  add column if not exists degree               text,
  add column if not exists years_experience      integer,
  add column if not exists education             text,
  add column if not exists website               text,
  add column if not exists office_hours          text,
  add column if not exists accepts_new_patients  boolean not null default true,
  add column if not exists languages             text[] not null default '{}',
  add column if not exists services              text[] not null default '{}',
  add column if not exists insurance_accepted    text[] not null default '{}',
  add column if not exists payment_methods       text[] not null default '{}',
  add column if not exists age_groups            text[] not null default '{}';

comment on column public.profiles.degree is 'Professional degree/title shown next to the name, e.g. DDS, DMD.';
comment on column public.profiles.years_experience is 'Years in practice.';
comment on column public.profiles.education is 'Dental school and graduation year, free text.';
comment on column public.profiles.website is 'Practice website URL.';
comment on column public.profiles.office_hours is 'Free-text office hours, e.g. Mon-Fri 9am-5pm.';

-- ------------------------------------------------------------
-- 7. PHONE NUMBER — ADMIN-ONLY READ ACCESS
--    RLS only filters ROWS, not COLUMNS: the "published profiles
--    visible to everyone" policy above already exposes every column
--    of a published row, phone included, to anyone who selects it
--    directly. Closing that requires column-level privileges plus
--    SECURITY DEFINER functions for the two legitimate read paths
--    (the owner reading their own number; an admin browsing the
--    directory) — a plain policy can't express "this column, but
--    only for this role, on this row".
-- ------------------------------------------------------------
alter table public.profiles
  add column if not exists is_admin boolean not null default false;

comment on column public.profiles.is_admin is 'Grants read access to every profile''s phone number via get_public_phone(). Not self-assignable from the app.';

revoke select (phone) on public.profiles from anon, authenticated;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce((select is_admin from public.profiles where id = auth.uid()), false);
$$;

-- The signed-in owner reading their own phone number (e.g. to edit it).
create or replace function public.get_my_phone()
returns text
language sql
security definer
set search_path = public
stable
as $$
  select phone from public.profiles where id = auth.uid();
$$;

-- Anyone browsing the public directory calls this; it only returns a
-- real value when the caller is an admin, so non-admin visitors
-- (including anonymous ones) always get null back.
create or replace function public.get_public_phone(target_username text)
returns text
language sql
security definer
set search_path = public
stable
as $$
  select phone from public.profiles
  where username = lower(target_username)
    and is_published = true
    and public.is_admin();
$$;

grant execute on function public.is_admin() to anon, authenticated;
grant execute on function public.get_my_phone() to authenticated;
grant execute on function public.get_public_phone(text) to anon, authenticated;

-- ------------------------------------------------------------
-- 8. ACCOUNT VERIFICATION
--    An admin reviews each new signup and approves it before it can
--    appear in public search/listings. is_published stays self-service
--    (the dentist controls it); is_verified is admin-only and gates
--    visibility together with it.
-- ------------------------------------------------------------
alter table public.profiles
  add column if not exists is_verified boolean not null default false;

comment on column public.profiles.is_verified is 'Set by an admin after reviewing the account. Required together with is_published for the profile to appear in public search/listings.';

-- Public listings now require BOTH published and verified.
drop policy if exists "published profiles visible to everyone" on public.profiles;
create policy "published profiles visible to everyone"
  on public.profiles for select
  using (is_published = true and is_verified = true);

-- Admins can update any profile (approve/unapprove, moderate).
drop policy if exists "admins update any profile" on public.profiles;
create policy "admins update any profile"
  on public.profiles for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- UPDATE also requires the target row to be visible under a SELECT
-- policy (Postgres needs read access to locate the row), so the
-- UPDATE policy above is not sufficient by itself — without this,
-- an admin's attempt to verify someone else's unpublished/unverified
-- profile silently matches zero rows.
drop policy if exists "admins read any profile" on public.profiles;
create policy "admins read any profile"
  on public.profiles for select
  to authenticated
  using (public.is_admin());

-- Admin inbox: every account, including phone and email, for review.
-- SECURITY DEFINER bypasses the phone column revoke and per-row RLS,
-- but the is_admin() check means it returns nothing for non-admins.
create or replace function public.list_all_profiles_admin()
returns table (
  id uuid,
  username text,
  full_name text,
  email text,
  phone text,
  address text,
  specialty text,
  license_no text,
  avatar_url text,
  is_published boolean,
  is_verified boolean,
  is_admin boolean,
  created_at timestamptz
)
language sql
security definer
set search_path = public
stable
as $$
  select
    p.id, p.username, p.full_name, u.email, p.phone, p.address,
    p.specialty, p.license_no, p.avatar_url, p.is_published, p.is_verified,
    p.is_admin, p.created_at
  from public.profiles p
  join auth.users u on u.id = p.id
  where public.is_admin()
  order by p.created_at desc;
$$;

grant execute on function public.list_all_profiles_admin() to authenticated;

-- Keep the public phone RPC consistent with the new verification gate.
create or replace function public.get_public_phone(target_username text)
returns text
language sql
security definer
set search_path = public
stable
as $$
  select phone from public.profiles
  where username = lower(target_username)
    and is_published = true
    and is_verified = true
    and public.is_admin();
$$;

-- ------------------------------------------------------------
-- 9. ADDRESS PRIVACY & CLINICS
--    The personal address gets the same admin-only treatment as
--    phone. Public "where do I find this practice" info moves to a
--    proper clinics table instead, since a doctor can practice at
--    more than one location (each with its own address/phone/website).
-- ------------------------------------------------------------
revoke select (address) on public.profiles from anon, authenticated;

create or replace function public.get_my_address()
returns text
language sql security definer set search_path = public stable
as $$
  select address from public.profiles where id = auth.uid();
$$;

create or replace function public.get_public_address(target_username text)
returns text
language sql security definer set search_path = public stable
as $$
  select address from public.profiles
  where username = lower(target_username)
    and is_published = true
    and is_verified = true
    and public.is_admin();
$$;

grant execute on function public.get_my_address() to authenticated;
grant execute on function public.get_public_address(text) to anon, authenticated;

create table if not exists public.clinics (
  id           uuid primary key default gen_random_uuid(),
  profile_id   uuid not null references public.profiles(id) on delete cascade,
  name         text,
  address      text,
  phone        text,
  website      text,
  office_hours text,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists clinics_profile_id_idx on public.clinics (profile_id);

drop trigger if exists clinics_touch_updated_at on public.clinics;
create trigger clinics_touch_updated_at
  before update on public.clinics
  for each row execute function public.touch_updated_at();

alter table public.clinics enable row level security;

drop policy if exists "clinics of published profiles are public" on public.clinics;
create policy "clinics of published profiles are public"
  on public.clinics for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = clinics.profile_id
        and p.is_published = true
        and p.is_verified = true
    )
  );

drop policy if exists "owner reads own clinics" on public.clinics;
create policy "owner reads own clinics"
  on public.clinics for select
  to authenticated
  using (profile_id = auth.uid());

drop policy if exists "admin reads any clinics" on public.clinics;
create policy "admin reads any clinics"
  on public.clinics for select
  to authenticated
  using (public.is_admin());

drop policy if exists "owner inserts own clinics" on public.clinics;
create policy "owner inserts own clinics"
  on public.clinics for insert
  to authenticated
  with check (profile_id = auth.uid());

drop policy if exists "owner updates own clinics" on public.clinics;
create policy "owner updates own clinics"
  on public.clinics for update
  to authenticated
  using (profile_id = auth.uid())
  with check (profile_id = auth.uid());

drop policy if exists "owner deletes own clinics" on public.clinics;
create policy "owner deletes own clinics"
  on public.clinics for delete
  to authenticated
  using (profile_id = auth.uid());
