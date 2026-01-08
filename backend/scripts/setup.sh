#!/bin/bash

echo "🚀 Setting up FormCraft Backend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create uploads directory
echo "📁 Creating uploads directory..."
mkdir -p uploads

# Copy environment file
if [ ! -f .env ]; then
    echo "⚙️ Creating environment file..."
    cp env.example .env
    echo "✅ Please edit .env file with your database configuration"
fi

# Prompt for database setup
read -p "Do you want to set up the database now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗄️ Setting up database..."
    
    # Prompt for database credentials
    read -p "Enter PostgreSQL username (default: postgres): " db_user
    db_user=${db_user:-postgres}
    
    read -s -p "Enter PostgreSQL password: " db_password
    echo
    
    read -p "Enter database name (default: formcraft): " db_name
    db_name=${db_name:-formcraft}
    
    # Update .env file
    sed -i.bak "s/DB_USER=.*/DB_USER=$db_user/" .env
    sed -i.bak "s/DB_PASSWORD=.*/DB_PASSWORD=$db_password/" .env
    sed -i.bak "s/DB_NAME=.*/DB_NAME=$db_name/" .env
    
    # Create database
    echo "Creating database..."
    createdb -U $db_user $db_name 2>/dev/null || echo "Database might already exist"
    
    # Run schema
    echo "Running database schema..."
    PGPASSWORD=$db_password psql -U $db_user -d $db_name -f database/schema.sql
    
    echo "✅ Database setup complete!"
fi

echo "🎉 Setup complete! You can now run:"
echo "   npm run dev  # for development"
echo "   npm start    # for production"
