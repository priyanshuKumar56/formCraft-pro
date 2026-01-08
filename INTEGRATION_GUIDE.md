# FormCraft Frontend-Backend Integration Guide

This guide explains how to set up and run the complete FormCraft application with both frontend and backend connected.

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp env.example .env
   ```

4. Edit `.env` with your database configuration:
   ```env
   PORT=3001
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=formcraft
   DB_USER=postgres
   DB_PASSWORD=your_password
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=http://localhost:3000
   ```

5. Set up the database:
   ```bash
   # Create database
   createdb formcraft
   
   # Run schema
   psql -d formcraft -f database/schema.sql
   ```

6. Start the backend server:
   ```bash
   npm run dev
   ```

The backend will be running at `http://localhost:3001`

### 2. Frontend Setup

1. Navigate to the root directory (if not already there):
   ```bash
   cd ..
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables for the frontend:
   ```bash
   cp env.local.example .env.local
   ```

4. Edit `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

5. Start the frontend development server:
   ```bash
   npm run dev
   ```

The frontend will be running at `http://localhost:3000`

## API Integration Overview

### Authentication System

The frontend now includes a complete authentication system that connects to the backend:

- **Login**: `/auth/login` - User login with email/password
- **Register**: `/auth/register` - New user registration
- **Logout**: `/auth/logout` - User logout
- **Profile**: `/auth/profile` - Get user profile

### Form Management

Form operations are handled through the FormService:

- **Get Forms**: `GET /api/forms` - List user's forms
- **Create Form**: `POST /api/forms` - Create new form
- **Update Form**: `PUT /api/forms/:id` - Update existing form
- **Delete Form**: `DELETE /api/forms/:id` - Delete form
- **Duplicate Form**: `POST /api/forms/:id/duplicate` - Duplicate form
- **Public Form**: `GET /api/forms/public/:slug` - Get public form

### Submission Handling

Form submissions are managed through the SubmissionService:

- **Submit Form**: `POST /api/submissions/form/:formId` - Submit form data
- **Get Submissions**: `GET /api/submissions/form/:formId` - Get form submissions
- **Export**: `GET /api/submissions/form/:formId/export` - Export submissions

### Analytics

Analytics data is provided by the AnalyticsService:

- **Overview**: `GET /api/analytics/form/:formId/overview` - Form analytics overview
- **Daily Stats**: `GET /api/analytics/form/:formId/daily` - Daily analytics
- **Field Analytics**: `GET /api/analytics/form/:formId/fields` - Field-level analytics
- **Dashboard**: `GET /api/analytics/dashboard` - User dashboard analytics

## Key Integration Points

### 1. API Client (`lib/api-client.ts`)

The API client handles:
- HTTP requests with proper headers
- Authentication token management
- Error handling
- File uploads

### 2. Authentication Context (`contexts/AuthContext.tsx`)

Provides authentication state and methods:
- User login/logout
- Token management
- Protected route handling

### 3. Service Classes

- **AuthService**: Authentication operations
- **FormService**: Form CRUD operations
- **SubmissionService**: Form submission handling
- **AnalyticsService**: Analytics data retrieval

## Testing the Integration

### 1. Test Authentication

1. Navigate to `http://localhost:3000/auth/register`
2. Create a new account
3. Verify you can login at `http://localhost:3000/auth/login`
4. Check that you're redirected to the dashboard

### 2. Test Form Creation

1. After login, navigate to the dashboard
2. Click "Create New Form"
3. Build a form with the drag-and-drop interface
4. Save the form
5. Verify it appears in your forms list

### 3. Test Form Submission

1. Publish a form (make it public)
2. Open the form in a new browser (or incognito window)
3. Fill out and submit the form
4. Check that the submission appears in the analytics

### 4. Test Analytics

1. Navigate to a form's analytics page
2. Verify that views and submissions are tracked
3. Check the export functionality

## Common Issues and Solutions

### CORS Issues

If you encounter CORS errors, ensure:
1. Backend `FRONTEND_URL` is set correctly in `.env`
2. Frontend `NEXT_PUBLIC_API_URL` is set correctly in `.env.local`

### Database Connection Issues

1. Verify PostgreSQL is running
2. Check database credentials in `.env`
3. Ensure the database was created with the schema

### Authentication Issues

1. Check that JWT_SECRET is set in backend `.env`
2. Verify token storage in browser localStorage
3. Check API endpoints are accessible

## Development Workflow

1. Start both servers (backend on port 3001, frontend on port 3000)
2. Make changes to frontend or backend
3. Test the integration
4. Check browser console and network tabs for errors
5. Check backend console for API errors

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in backend
2. Use proper database credentials
3. Set secure JWT_SECRET
4. Configure CORS for production domain
5. Set up SSL certificates
6. Use process managers (PM2 for backend)
7. Set up reverse proxy (nginx)

## API Documentation

Detailed API documentation is available in the backend README.md file, including:
- Endpoint descriptions
- Request/response formats
- Authentication requirements
- Error handling

## Support

For issues with the integration:
1. Check console errors in browser
2. Check backend server logs
3. Verify environment variables
4. Test API endpoints directly (Postman/curl)
5. Review this guide for common issues
