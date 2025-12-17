# Admin Dashboard Setup Guide

## Prerequisites

1. MongoDB database
2. Uploadthing account (sign up at https://uploadthing.com)

## Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in the required environment variables in `.env`:

   - `MONGODB_URI`: Your MongoDB connection string
   - `AUTH_SECRET`: Generate using `openssl rand -base64 32`
   - `AUTH_URL`: Your app URL (e.g., `http://localhost:3000`)
   - `UPLOADTHING_SECRET`: Get from uploadthing.com dashboard
   - `UPLOADTHING_APP_ID`: Get from uploadthing.com dashboard

## Create First Admin User

Run the admin creation script:

```bash
npm run create-admin
```

Follow the prompts to enter:
- Admin email
- Admin name
- Password (minimum 6 characters)

## Access Admin Dashboard

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:3000/admin/login`

3. Login with your admin credentials

## Admin Dashboard Features

### Routes

- `/admin/login` - Admin login page
- `/admin/dashboard` - Dashboard home with statistics
- `/admin/dashboard/products` - Product management table
- `/admin/dashboard/products/new` - Create new product
- `/admin/dashboard/products/[id]/edit` - Edit existing product

### Product Management

- **Create Products**: Add product name, description, and up to 2 images
- **Edit Products**: Update product details and manage images
- **Delete Products**: Remove products from the database
- **View Products**: Browse all products in a table view

### Security

- Protected routes with NextAuth middleware
- API routes require authentication for create/update/delete operations
- Password hashing with bcrypt
- Session-based authentication with JWT

## Uploadthing Configuration

1. Sign up at https://uploadthing.com
2. Create a new app
3. Copy your App ID and Secret to `.env`
4. Images are automatically uploaded and URLs stored in MongoDB

## Troubleshooting

### "Unauthorized" errors
- Ensure you're logged in
- Check that `AUTH_SECRET` is set in `.env`

### Upload failures
- Verify `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID` are correct
- Check uploadthing.com dashboard for quota limits

### Database connection issues
- Verify `MONGODB_URI` is correct
- Ensure MongoDB is running and accessible
