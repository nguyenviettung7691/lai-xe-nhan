-- =============================================================================
-- Lái Xe Nhàn - Supabase Database Schema (Phase 2: Tech Stack & BaaS)
-- =============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. CONTENT METADATA TABLE (Read-heavy, public)
create table if not exists public.content_metadata (
    id uuid primary key default uuid_generate_v4(),
    version text not null unique,
    locale text not null default 'vi-VN',
    release_date timestamptz not null default now(),
    summary text not null,
    total_cards int not null default 0,
    offline_size_kb int not null default 0,
    created_at timestamptz not null default now()
);

alter table public.content_metadata enable row level security;

-- Policy: Everyone can read content metadata
create policy "Allow public read access to content metadata"
    on public.content_metadata for select
    using (true);

-- 2. USER PROGRESS TABLE (Private, RLS protected)
create table if not exists public.user_progress (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references auth.users(id) on delete cascade not null,
    completed_card_ids jsonb not null default '[]'::jsonb,
    updated_at timestamptz not null default now(),
    version int not null default 1,
    constraint user_progress_user_id_key unique (user_id)
);

alter table public.user_progress enable row level security;

-- Policies for user_progress (Owner only)
create policy "Users can view their own progress"
    on public.user_progress for select
    using (auth.uid() = user_id);

create policy "Users can insert their own progress"
    on public.user_progress for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own progress"
    on public.user_progress for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- 3. USER CHECKLIST STATE TABLE (Private, RLS protected)
create table if not exists public.user_checklists (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references auth.users(id) on delete cascade not null,
    scope text not null,
    checked_items jsonb not null default '{}'::jsonb,
    updated_at timestamptz not null default now(),
    version int not null default 1,
    constraint user_checklists_user_scope_key unique (user_id, scope)
);

alter table public.user_checklists enable row level security;

-- Policies for user_checklists (Owner only)
create policy "Users can view their own checklist states"
    on public.user_checklists for select
    using (auth.uid() = user_id);

create policy "Users can insert their own checklist states"
    on public.user_checklists for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own checklist states"
    on public.user_checklists for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- 4. USER FEEDBACK TABLE (RLS protected)
create table if not exists public.user_feedback (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references auth.users(id) on delete set null,
    card_id text,
    feedback_type text not null check (feedback_type in ('bug', 'content_issue', 'suggestion', 'praise')),
    rating int check (rating >= 1 and rating <= 5),
    comment text not null,
    created_at timestamptz not null default now()
);

alter table public.user_feedback enable row level security;

-- Policy: Users can submit feedback
create policy "Users can insert feedback"
    on public.user_feedback for insert
    with check (auth.uid() = user_id or user_id is null);

create policy "Users can view their own feedback"
    on public.user_feedback for select
    using (auth.uid() = user_id);

-- 5. SYNC AUDIT LOG TABLE (Optional, lightweight)
create table if not exists public.sync_audit_logs (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references auth.users(id) on delete cascade not null,
    event_type text not null,
    client_timestamp timestamptz not null,
    synced_at timestamptz not null default now(),
    payload jsonb
);

alter table public.sync_audit_logs enable row level security;

create policy "Users can view their own sync logs"
    on public.sync_audit_logs for select
    using (auth.uid() = user_id);

create policy "Users can insert their own sync logs"
    on public.sync_audit_logs for insert
    with check (auth.uid() = user_id);
