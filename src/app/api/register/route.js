import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    const filePath = path.join(process.cwd(), 'data', 'users.json');
    
    // Read current users
    let users = [];
    try {
      const data = await fs.readFile(filePath, 'utf8');
      users = JSON.parse(data);
    } catch (err) {
      // If file doesn't exist yet
      users = [];
    }
    
    // Check if user exists
    if (users.find(u => u.email === email)) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }
    
    // Register
    const newUser = { id: Date.now(), name, email, password, progress: {} };
    users.push(newUser);
    
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
    
    const { password: _, ...userWithoutPassword } = newUser;
    return NextResponse.json({ message: 'User registered successfully', user: userWithoutPassword }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Registration failed', error: error.message }, { status: 500 });
  }
}
