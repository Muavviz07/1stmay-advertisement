# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Form Backend (Email)

The site forms now submit to a backend API at `/api/contact` and send structured emails.

### 1) Configure environment

Copy `.env.example` to `.env` and fill SMTP credentials.

- `MAIL_TO` is the recipient inbox for form leads
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` are required to send emails

### 2) Run locally

Run backend and frontend in separate terminals:

```bash
npm install
npm run dev:server
npm run dev
```

### 3) Verify backend quickly

Open this in browser:

`http://localhost:4010/api/health`

Expected response:

`{"ok":true}`

If health works but form still fails, check backend terminal logs for SMTP verification and send errors.
