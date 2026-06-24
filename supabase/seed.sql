-- TestCenter Seed Data
-- Run this AFTER applying schema.sql
-- Creates test users via Supabase Auth + profiles

-- NOTE: You cannot insert into auth.users directly in the SQL editor on hosted Supabase.
-- Instead, register these users via the app or Supabase Dashboard → Authentication → Users → Add User:
--
--   student@avpk.kz   / password123  (role: student)
--   teacher@avpk.kz   / password123  (role: teacher)
--   admin@avpk.kz     / password123  (role: admin)
--
-- After creating auth users, copy their UUIDs and run the INSERT statements below.
-- Replace the UUIDs with the actual ones from your auth.users table.

-- Step 1: Insert groups
insert into groups (id, name, specialty, year) values
  ('00000000-0000-0000-0000-000000000001', 'ИС-23', 'Информационные системы', 2023),
  ('00000000-0000-0000-0000-000000000002', 'ПО-24', 'Программное обеспечение', 2024)
on conflict (id) do nothing;

-- Step 2: After creating users in Auth, insert profiles.
-- Replace UUIDs below with actual auth user UUIDs.
-- Example (update these UUIDs after creating auth users):
--
-- insert into profiles (id, full_name, role, group_id) values
--   ('<student-uuid>', 'Айдар Нурланов', 'student', '00000000-0000-0000-0000-000000000001'),
--   ('<teacher-uuid>', 'Гүлнәр Сейткали', 'teacher', null),
--   ('<admin-uuid>', 'Администратор Системы', 'admin', null);

-- Step 3: Insert subjects (after inserting teacher profile)
-- insert into subjects (id, name, description, teacher_id) values
--   (uuid_generate_v4(), 'Информационные системы', 'Основы ИС', '<teacher-uuid>'),
--   (uuid_generate_v4(), 'Базы данных', 'SQL и реляционные БД', '<teacher-uuid>'),
--   (uuid_generate_v4(), 'Веб-разработка', 'HTML, CSS, JavaScript', '<teacher-uuid>');
