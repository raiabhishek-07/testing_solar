import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const filePath = path.join(process.cwd(), 'data', 'users.json');
    
    // Read current users
    const data = await fs.readFile(filePath, 'utf8');
    const users = JSON.parse(data);
    
    // Check credentials
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // return everything except password
      const { password, ...userWithoutPassword } = user;
      return NextResponse.json({ message: 'Login successful', user: userWithoutPassword }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Login failed', error: error.message }, { status: 500 });
  }
}
