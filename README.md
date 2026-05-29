# CognitiveTrainer

Платформа когнитивных тестов на SvelteKit. Аутентификация - better-auth, БД - PostgreSQL через Drizzle ORM, локально поднимается в Docker.

## Быстрый старт после `git clone`

### 1. Установите Docker Desktop

Если ещё нет - поставьте с https://www.docker.com/products/docker-desktop и запустите.

Проверить:
```
docker --version
docker compose version
```

### 2. Создайте `.env` в корне проекта

Файла нет в репозитории.


### 3. Поднимите Postgres

```
docker compose up -d
```


### 4. Генерация/миграция таблиц БД

`npx drizzle-kit generate`

Если нужна миграция:
`npx drizzle-kit migrate`

Проверить таблицы:

Должно быть 6 таблиц: `user`, `session`, `account`, `verification`, `test_attempt`, `test_answer`.

### 5. Запустите dev-сервер

```
npm run dev
```

Откройте http://localhost:5173. Регистрация / вход - на `/demo/better-auth/login`.


## Полезные команды

```
# Веб-интерфейс для БД (открывает https://local.drizzle.studio)
npx drizzle-kit studio
```

---

## Деплой на Vercel + Neon

### 1. Настройка Neon БД

1. Зарегистрируйтесь на [neon.tech](https://neon.tech)
2. Создайте новый проект
3. Скопируйте Connection String в формате `postgresql://user:password@host/database`

### 2. Настройка Vercel

1. Залейте репозиторий на GitHub
2. Зайдите на [vercel.com](https://vercel.com)
3. Импортируйте ваш репозиторий
4. На этапе конфигурации добавьте переменные окружения:

| Переменная | Значение |
|---|---|
| `DATABASE_URL` | Connection String от Neon |
| `BETTER_AUTH_SECRET` | 32-символный ключ с высокой энтропией (используйте `openssl rand -hex 16`) |
| `ORIGIN` | Ваш URL на Vercel (например, `https://psytrainer.vercel.app`) |

5. Нажмите "Deploy"

### 3. Что происходит при деплое

`vercel.json` автоматически запустит:
```bash
npm run db:push  # Применяет миграции к Neon БД
npm run build    # Собирает приложение
```

**Важно:** Таблицы создадутся автоматически при первом деплое благодаря `drizzle-kit push`.

### 4. Проверка

После успешного деплоя:
1. Откройте ваше приложение
2. Попробуйте зарегистрироваться на `/demo/better-auth/login`
3. Данные должны сохраняться в Neon БД

---


## Структура проекта

```
src/
├── lib/
│   ├── server/
│   │   ├── auth.ts                  better-auth конфиг
│   │   ├── db/
│   │   │   ├── index.ts             клиент Drizzle
│   │   │   ├── auth.schema.ts       схема пользователей (сгенерирована better-auth)
│   │   │   ├── stats.schema.ts      схема попыток и ответов
│   │   │   └── schema.ts            re-export всего
│   │   └── stats/
│   │       ├── record.ts            запись попытки + ответов в транзакции
│   │       └── queries.ts           готовые запросы для админ-панели
│   ├── stats/
│   │   └── contracts.ts             TypeScript-типы для meta каждого теста
│   └── tests/
│       ├── recordAttempt.ts         клиентский хелпер submitAttempt()
│       ├── testRegistry.ts          реестр тестов (slug → title + lazy-import)
│       └── *.svelte                 сами тесты
├── routes/
│   ├── api/attempts/+server.ts      POST /api/attempts
│   └── test/[slug]/                 рендер теста по slug
├── hooks.server.ts                  better-auth middleware (наполняет locals.user)
└── app.d.ts                         типы App.Locals
drizzle/                             SQL-миграции
docker-compose.yml                   локальный Postgres
drizzle.config.ts                    конфиг Drizzle Kit
```

## Как тесты пишут статистику

Каждый тест в момент завершения вызывает `submitAttempt()` из `$lib/tests/recordAttempt`. Формат данных описан в `src/lib/stats/contracts.ts`. Сервер пишет в `test_attempt` + `test_answer` транзакцией.

