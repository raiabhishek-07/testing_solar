import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, progress } = body;
    const filePath = path.join(process.cwd(), 'data', 'users.json');
    
    // Read current users
    const data = await fs.readFile(filePath, 'utf8');
    let users = JSON.parse(data);
    
    // Find and update user (use == for numeric vs string ID comparison)
    const userIndex = users.findIndex(u => u.id == userId);
    
    if (userIndex !== -1) {
      const currentProgress = users[userIndex].progress || {};
      const newProgress = {
        ...currentProgress,
        ...progress,
        totalXP: (currentProgress.totalXP || 0) + (progress.xpAdded || 0)
      };
      
      // Remove xpAdded from the progress object itself so it doesn't clutter
      delete newProgress.xpAdded;

      users[userIndex].progress = newProgress;
      
      await fs.writeFile(filePath, JSON.stringify(users, null, 2));
      
      const { password, ...userWithoutPassword } = users[userIndex];
      return NextResponse.json({ message: 'Progress saved successfully', user: userWithoutPassword }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Update failed', error: error.message }, { status: 500 });
  }
}
