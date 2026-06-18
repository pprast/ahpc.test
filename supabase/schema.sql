-- TestCenter Database Schema
-- Актюбинский высший политехнический колледж

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Groups
create table groups (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  specialty text not null,
  year int not null,
  created_at timestamptz default now()
);

-- Profiles (extends Supabase Auth users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  role text not null check (role in ('student', 'teacher', 'admin')),
  group_id uuid references groups(id) on delete set null,
  avatar_url text,
  created_at timestamptz default now()
);

-- Subjects
create table subjects (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  teacher_id uuid references profiles(id) on delete set null,
  created_at timestamptz default now()
);

-- Tests
create table tests (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  subject_id uuid references subjects(id) on delete cascade,
  teacher_id uuid references profiles(id) on delete cascade,
  time_limit int not null default 30,
  pass_score int not null default 70,
  attempts_allowed int not null default 3,
  is_active boolean default true,
  shuffle_questions boolean default false,
  created_at timestamptz default now()
);

-- Questions
create table questions (
  id uuid default uuid_generate_v4() primary key,
  test_id uuid references tests(id) on delete cascade,
  text text not null,
  type text not null check (type in ('single', 'multiple', 'truefalse', 'text')),
  points int not null default 1,
  order_index int not null default 0
);

-- Answers
create table answers (
  id uuid default uuid_generate_v4() primary key,
  question_id uuid references questions(id) on delete cascade,
  text text not null,
  is_correct boolean default false
);

-- Test assignments
create table test_assignments (
  id uuid default uuid_generate_v4() primary key,
  test_id uuid references tests(id) on delete cascade,
  group_id uuid references groups(id) on delete cascade,
  assigned_at timestamptz default now(),
  due_date timestamptz
);

-- Attempts
create table attempts (
  id uuid default uuid_generate_v4() primary key,
  test_id uuid references tests(id) on delete cascade,
  student_id uuid references profiles(id) on delete cascade,
  started_at timestamptz default now(),
  finished_at timestamptz,
  score int,
  passed boolean,
  attempt_number int not null default 1
);

-- Attempt answers
create table attempt_answers (
  id uuid default uuid_generate_v4() primary key,
  attempt_id uuid references attempts(id) on delete cascade,
  question_id uuid references questions(id) on delete cascade,
  answer_ids uuid[],
  text_answer text
);

-- Certificate sequence
create sequence if not exists cert_seq start 1;

-- Certificates
create table certificates (
  id uuid default uuid_generate_v4() primary key,
  student_id uuid references profiles(id) on delete cascade,
  test_id uuid references tests(id) on delete cascade,
  attempt_id uuid references attempts(id) on delete cascade,
  issued_at timestamptz default now(),
  certificate_code text unique default 'AVPK-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('cert_seq')::text, 5, '0')
);

-- Row Level Security
alter table profiles enable row level security;
alter table tests enable row level security;
alter table questions enable row level security;
alter table answers enable row level security;
alter table attempts enable row level security;
alter table certificates enable row level security;

-- Policies: users see their own profile
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Policies: students see active tests assigned to their group
create policy "Students see active tests" on tests for select
  using (is_active = true);

-- Policies: teachers manage their own tests
create policy "Teachers manage own tests" on tests for all
  using (teacher_id = auth.uid());

-- Policies: students see own attempts
create policy "Students see own attempts" on attempts for select
  using (student_id = auth.uid());
create policy "Students create attempts" on attempts for insert
  with check (student_id = auth.uid());

-- Policies: students see own certificates
create policy "Students see own certificates" on certificates for select
  using (student_id = auth.uid());
