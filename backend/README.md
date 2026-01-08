# FormCraft Backend API

A robust and scalable backend API for the FormCraft form builder application, built with Express.js and PostgreSQL.

## Features

- **Authentication & Authorization**: JWT-based authentication with session management
- **Form Management**: CRUD operations for forms with advanced features
- **Submission Handling**: Secure form submission with analytics tracking
- **Analytics Dashboard**: Comprehensive analytics and reporting
- **Security**: Rate limiting, CORS, helmet, and input validation
- **File Upload Support**: Handle file uploads for form submissions
- **Export Functionality**: Export submissions as CSV

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database (no Prisma)
- **JWT** - Authentication tokens
- **Joi** - Input validation
- **Bcrypt** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp env.example .env
   ```
   Edit `.env` with your configuration:
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

4. Set up the database:
   ```bash
   # Create database
   createdb formcraft
   
   # Run schema
   psql -d formcraft -f database/schema.sql
   ```

5. Start the server:
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Forms

- `GET /api/forms` - Get user's forms (with pagination)
- `POST /api/forms` - Create new form
- `GET /api/forms/:id` - Get specific form
- `PUT /api/forms/:id` - Update form
- `DELETE /api/forms/:id` - Delete form
- `POST /api/forms/:id/duplicate` - Duplicate form
- `GET /api/forms/public/:slug` - Get public form by slug

### Submissions

- `POST /api/submissions/form/:formId` - Submit form (public)
- `GET /api/submissions/form/:formId` - Get form submissions (owner)
- `GET /api/submissions/:id` - Get specific submission
- `DELETE /api/submissions/:id` - Delete submission
- `GET /api/submissions/form/:formId/export` - Export submissions

### Analytics

- `GET /api/analytics/form/:formId/overview` - Form analytics overview
- `GET /api/analytics/form/:formId/daily` - Daily analytics
- `GET /api/analytics/form/:formId/fields` - Field-level analytics
- `GET /api/analytics/dashboard` - User dashboard analytics

## Database Schema

The backend uses a PostgreSQL database with the following main tables:

- `users` - User accounts and authentication
- `forms` - Form definitions and metadata
- `form_submissions` - Form submission data
- `form_analytics` - Analytics events tracking
- `user_sessions` - JWT session management
- `file_uploads` - File upload management

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Session Management**: Secure session storage with expiration
- **Rate Limiting**: Prevent abuse with configurable rate limits
- **Input Validation**: Comprehensive input validation with Joi
- **Password Security**: Bcrypt hashing for passwords
- **CORS Protection**: Configurable CORS settings
- **Security Headers**: Helmet.js for security headers

## Error Handling

The API includes comprehensive error handling:

- Validation errors return 400 with detailed field information
- Authentication errors return 401
- Authorization errors return 403
- Not found errors return 404
- Server errors return 500 with appropriate logging

## Development

### Running Tests

```bash
npm test
```

### Database Migrations

The schema is managed through SQL files in the `database/` directory. For production, consider using a migration tool.

### Environment Variables

All configuration is done through environment variables. See `env.example` for the complete list.

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a process manager like PM2
3. Configure reverse proxy (nginx)
4. Set up SSL certificates
5. Configure database backups
6. Set up monitoring and logging

## API Usage Examples

### Register a new user

```javascript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe'
  })
});
```

### Create a form

```javascript
const response = await fetch('/api/forms', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_JWT_TOKEN'
  },
  body: JSON.stringify({
    title: 'Contact Form',
    description: 'Get in touch with us',
    formData: {
      pages: [
        {
          id: 'page-1',
          title: 'Contact Information',
          type: 'form',
          sections: [
            {
              id: 'section-1',
              type: 'input-zone',
              layout: { /* layout config */ },
              elements: [
                {
                  id: 'field-1',
                  type: 'text',
                  label: 'Name',
                  required: true
                }
              ],
              children: []
            }
          ],
          layout: { /* page layout config */ }
        }
      ]
    },
    settings: { /* form settings */ }
  })
});
```

## License

MIT License
