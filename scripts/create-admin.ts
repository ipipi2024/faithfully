import mongoose from 'mongoose';
import * as readline from 'readline';
import Admin from '../app/models/Admin';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

async function createAdmin() {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      console.error('Error: MONGODB_URI is not set in environment variables');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const email = await question('Enter admin email: ');
    const name = await question('Enter admin name: ');
    const password = await question('Enter admin password (min 6 characters): ');

    if (!email || !name || !password) {
      console.error('All fields are required');
      process.exit(1);
    }

    if (password.length < 6) {
      console.error('Password must be at least 6 characters');
      process.exit(1);
    }

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.error('Admin with this email already exists');
      process.exit(1);
    }

    const admin = await Admin.create({
      email,
      name,
      password,
    });

    console.log('\nAdmin created successfully!');
    console.log('Email:', admin.email);
    console.log('Name:', admin.name);

    await mongoose.connection.close();
    rl.close();
  } catch (error: any) {
    console.error('Error creating admin:', error.message);
    await mongoose.connection.close();
    rl.close();
    process.exit(1);
  }
}

createAdmin();
