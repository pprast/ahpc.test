# Настройка базы данных

1. Открой Supabase Dashboard → SQL Editor
2. Вставь содержимое файла `schema.sql`
3. Нажми Run

## Тестовые данные

После применения схемы запусти `seed.sql` для загрузки тестовых данных.

### Создание тестовых пользователей

Перейди в Supabase Dashboard → Authentication → Users → Add User и создай:

- `student@avpk.kz` / `password123`
- `teacher@avpk.kz` / `password123`
- `admin@avpk.kz` / `password123`

Затем скопируй их UUID и вставь в `seed.sql` (см. комментарии там).
