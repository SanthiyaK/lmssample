# LMS (Learning Management System) - LearnHub

A complete full-stack MERN application for managing online courses, built following a 16-day curriculum.

## Project Structure

\`\`\`
lms-app/
├── src/                          # Frontend React app
│   ├── components/              # Reusable components
│   ├── pages/                   # Page components
│   ├── context/                 # React Context (Auth)
│   ├── hooks/                   # Custom hooks (useAuth)
│   ├── services/                # API integration
│   ├── App.jsx                  # Main app component
│   └── index.css                # Global styles
├── server/                       # Backend Express server
│   ├── models/                  # MongoDB models
│   ├── routes/                  # API routes
│   ├── middleware/              # Auth middleware
│   ├── server.js                # Server entry point
│   └── .env.example             # Environment template
├── scripts/                      # Deployment scripts
├── .github/workflows/           # CI/CD pipelines
├── docker-compose.yml           # Docker compose config
└── vite.config.js              # Vite configuration
\`\`\`

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Frontend Development

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Create `.env` file:
\`\`\`
VITE_API_URL=http://localhost:5000/api
\`\`\`

3. Start development server:
\`\`\`bash
npm run dev
\`\`\`

Frontend will be available at `http://localhost:5173`

### Backend Development

1. Navigate to server directory:
\`\`\`bash
cd server
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create `.env` file:
\`\`\`
MONGODB_URI=mongodb://localhost:27017/lms-app
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key-here
\`\`\`

4. Start backend server:
\`\`\`bash
npm run dev
\`\`\`

Backend will run at `http://localhost:5000`

## Features

### Frontend
- Modern React UI with React Router
- Role-based dashboards (Student, Instructor, Admin)
- Course browsing and enrollment
- Dark/Light theme toggle
- Responsive design
- JWT authentication

### Backend
- Express.js REST API
- MongoDB database with Mongoose ODM
- JWT-based authentication
- Role-based access control
- Course CRUD operations
- User management
- Enrollment tracking

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (Instructor/Admin)
- `PUT /api/courses/:id` - Update course (Instructor/Admin)
- `DELETE /api/courses/:id` - Delete course (Instructor/Admin)
- `POST /api/courses/:id/enroll` - Enroll in course (Student)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

## Docker Deployment

\`\`\`bash
docker-compose up
\`\`\`

This will start:
- MongoDB on port 27017
- Backend on port 5000
- Frontend on port 3000

## AWS Deployment

See `aws-deployment-guide.md` for detailed AWS deployment instructions including:
- S3 frontend hosting
- EC2 backend deployment
- CloudFront CDN
- GitHub Actions CI/CD

## Development Workflow

1. Frontend changes: Make changes in `src/` directory
2. Backend changes: Make changes in `server/` directory
3. Test locally using `npm run dev` for frontend and `npm run dev` in server directory for backend
4. Push to GitHub to trigger CI/CD pipeline

## Testing

### Frontend
\`\`\`bash
npm run dev
# Visit http://localhost:5173
\`\`\`

### Backend
\`\`\`bash
cd server
npm run dev
# API available at http://localhost:5000
\`\`\`

## Default Test Credentials

- **Email**: student@example.com / instructor@example.com / admin@example.com
- **Password**: password123 (set your own in production)

## Roles & Permissions

### Student
- Browse courses
- Enroll in courses
- Track progress
- View personalized dashboard

### Instructor
- Create courses
- Manage course content
- View student progress
- Track revenue

### Admin
- Manage all users
- Monitor platform statistics
- Manage courses
- View system analytics

## Troubleshooting

### Frontend won't load
- Check if backend is running: `http://localhost:5000/api/health`
- Verify `VITE_API_URL` in `.env` matches backend URL
- Clear browser cache

### Backend connection errors
- Verify MongoDB is running
- Check `MONGODB_URI` in `.env`
- Ensure JWT_SECRET is set

### CORS errors
- Backend CORS is configured for `http://localhost:5173`
- For production, update CORS origin in `server/server.js`

## Production Deployment

1. Build frontend:
\`\`\`bash
npm run build
\`\`\`

2. Deploy frontend to S3/CloudFront
3. Deploy backend to EC2
4. Setup MongoDB Atlas for database
5. Configure CI/CD with GitHub Actions

See `aws-deployment-guide.md` for complete instructions.

## License

MIT
