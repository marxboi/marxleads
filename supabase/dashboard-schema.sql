-- Marxleads dashboard tables. Run once in Supabase SQL Editor after the profiles table exists.
create table if not exists public.businesses (
 id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade,
 name text not null, category text, city text, description text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.services (
 id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade,
 business_id uuid references public.businesses(id) on delete set null, title text not null, description text,
 price numeric(12,2) not null default 0 check (price >= 0), currency text not null default 'NGN', created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.leads (
 id uuid primary key default gen_random_uuid(), recipient_id uuid not null references auth.users(id) on delete cascade,
 customer_id uuid references auth.users(id) on delete set null, customer_name text, customer_email text, message text not null,
 status text not null default 'new' check (status in ('new','contacted','qualified','closed')), created_at timestamptz not null default now()
);
create table if not exists public.bookings (
 id uuid primary key default gen_random_uuid(), provider_id uuid not null references auth.users(id) on delete cascade,
 customer_id uuid references auth.users(id) on delete set null, customer_name text, service_title text not null,
 starts_at timestamptz not null, status text not null default 'pending' check (status in ('pending','confirmed','completed','cancelled')), created_at timestamptz not null default now()
);
create table if not exists public.conversations (
 id uuid primary key default gen_random_uuid(), created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.conversation_participants (
 conversation_id uuid not null references public.conversations(id) on delete cascade,
 user_id uuid not null references auth.users(id) on delete cascade, primary key(conversation_id,user_id)
);
create table if not exists public.messages (
 id uuid primary key default gen_random_uuid(), conversation_id uuid not null references public.conversations(id) on delete cascade,
 sender_id uuid not null references auth.users(id) on delete cascade, body text not null, created_at timestamptz not null default now(), read_at timestamptz
);
create table if not exists public.portfolio_items (
 id uuid primary key default gen_random_uuid(), owner_id uuid not null references auth.users(id) on delete cascade,
 title text not null, description text, image_url text, created_at timestamptz not null default now()
);

alter table public.businesses enable row level security;
alter table public.services enable row level security;
alter table public.leads enable row level security;
alter table public.bookings enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_participants enable row level security;
alter table public.messages enable row level security;
alter table public.portfolio_items enable row level security;

drop policy if exists "Owners manage own businesses" on public.businesses;
create policy "Owners manage own businesses" on public.businesses for all to authenticated using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id);
drop policy if exists "Owners manage own services" on public.services;
create policy "Owners manage own services" on public.services for all to authenticated using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id);
drop policy if exists "Recipients view leads" on public.leads;
create policy "Recipients view leads" on public.leads for select to authenticated using ((select auth.uid()) = recipient_id);
drop policy if exists "Customers create leads" on public.leads;
create policy "Customers create leads" on public.leads for insert to authenticated with check ((select auth.uid()) = customer_id);
drop policy if exists "Recipients update leads" on public.leads;
create policy "Recipients update leads" on public.leads for update to authenticated using ((select auth.uid()) = recipient_id) with check ((select auth.uid()) = recipient_id);
drop policy if exists "Booking participants view bookings" on public.bookings;
create policy "Booking participants view bookings" on public.bookings for select to authenticated using ((select auth.uid()) = provider_id or (select auth.uid()) = customer_id);
drop policy if exists "Customers create bookings" on public.bookings;
create policy "Customers create bookings" on public.bookings for insert to authenticated with check ((select auth.uid()) = customer_id);
drop policy if exists "Providers update bookings" on public.bookings;
create policy "Providers update bookings" on public.bookings for update to authenticated using ((select auth.uid()) = provider_id) with check ((select auth.uid()) = provider_id);
drop policy if exists "Participants view conversations" on public.conversations;
create policy "Participants view conversations" on public.conversations for select to authenticated using (exists(select 1 from public.conversation_participants p where p.conversation_id=id and p.user_id=(select auth.uid())));
drop policy if exists "Users view own participation" on public.conversation_participants;
create policy "Users view own participation" on public.conversation_participants for select to authenticated using ((select auth.uid())=user_id);
drop policy if exists "Participants view messages" on public.messages;
create policy "Participants view messages" on public.messages for select to authenticated using (exists(select 1 from public.conversation_participants p where p.conversation_id=messages.conversation_id and p.user_id=(select auth.uid())));
drop policy if exists "Participants send messages" on public.messages;
create policy "Participants send messages" on public.messages for insert to authenticated with check ((select auth.uid())=sender_id and exists(select 1 from public.conversation_participants p where p.conversation_id=messages.conversation_id and p.user_id=(select auth.uid())));
drop policy if exists "Owners manage portfolio" on public.portfolio_items;
create policy "Owners manage portfolio" on public.portfolio_items for all to authenticated using ((select auth.uid())=owner_id) with check ((select auth.uid())=owner_id);
