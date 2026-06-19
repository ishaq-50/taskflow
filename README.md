# TaskFlow - Full Stack Task Management Application

A modern full-stack task management application built with React, Express, and Prisma.

## Features

- User authentication (register/login)
- Create, read, update, and delete tasks
- Task filtering and organization
- Real-time task updates
- Responsive UI design

## Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- React Router
- Axios

### Backend
- Express.js
- Node.js
- Prisma ORM
- PostgreSQL/SQLite
- JWT Authentication
- Bcrypt for password hashing

### Tools
- TypeScript
- Zod (Validation)

## Development Setup

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/taskflow.git
cd taskflow
```

2. Install dependencies
```bash
npm run install:all
```

3. Set up environment variables

Create `.env` in the server directory:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```
PORT=3001
DATABASE_URL=file:./dev.db
JWT_ACCESS_SECRET=dev-secret-change-in-production
JWT_REFRESH_SECRET=dev-secret-change-in-production
CLIENT_URL=http://localhost:5173
```

4. Set up database
```bash
npm run db:migrate
npm run db:seed
```

5. Run development servers
```bash
npm run dev
```

Or run separately:
- Server: `npm run dev:server`
- Client: `npm run dev:client`

## Production Build

```bash
npm run build
npm start
```

## Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

### Quick Deploy to Render

1. Push to GitHub
2. Go to [render.com](https://render.com)
3. Create new service from GitHub repository
4. Render will auto-detect `render.yaml` configuration
5. Add environment variables and deploy

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── api/           # API calls
│   │   ├── context/       # React context
│   │   └── types/         # TypeScript types
│   └── index.html
├── server/                 # Express backend
│   ├── src/
│   │   ├── modules/       # Auth, Tasks, Users modules
│   │   ├── middleware/    # Express middleware
│   │   ├── config/        # Configuration
│   │   └── utils/         # Utilities
│   └── prisma/            # Database schema & migrations
├── Dockerfile             # Docker configuration
├── render.yaml           # Render deployment config
└── DEPLOYMENT.md         # Deployment guide
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh token

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Users
- `GET /api/users/me` - Get current user
- `PUT /api/users/:id` - Update user

## Environment Variables

See `.env.example` for all available environment variables.

## Troubleshooting

### Port already in use
Change the PORT in `.env`

### Database errors
- Ensure DATABASE_URL is correct
- Run migrations: `npm run db:migrate`

### Build errors
- Delete `node_modules` and `dist` folders
- Run `npm run install:all` again
- Check Node.js version (requires 20+)

## Contributing

1. Create a feature branch
2. Make your changes
3. Push to GitHub
4. Create a Pull Request

## License

MIT

## Support

For issues and questions, please open a GitHub issue.
