# todo-app-backend

A simple todo app backend.

## Setup

1. Create db in supabase from `./db/seed.sql`.
2. Create `.env` file with these variables.

    ```toml
    PORT=3000
    DB_USER=
    DB_PASSWORD=
    DB_HOST=
    DB_PORT=
    DB_NAME=
    ```

3. Run locally.
    ```bash
    npm run dev
    ```
4. Deploy the backend on [Vercel](https://vercel.com/) with those `.env`
   variables.
