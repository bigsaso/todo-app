import { prisma } from "@/db/client";

import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    const req = await request.json();
    try{
        const { username, email, password } = req;
        // Validate incoming data (simple validation for example purposes)
        if (!email || !email.includes('@') || !username || username.trim() === '' || !password || password.length < 6) {
            return new Response(JSON.stringify({ message: 'Invalid data provided' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
        // Check if the user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username }
                ],
            },
        });
        if (existingUser) {
            return new Response(JSON.stringify({ message: 'User already exists' }), {
                status: 409,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user in the database
        const user = await prisma.user.create({
            data: {
                username,
                email,
                passwordHash: hashedPassword,
                profilePicUrl: null,  // Optional, can default to null or a placeholder
                status: 'active',     // Default status
            },
        });
        // Return the new user data (excluding password hash for security)
        const { passwordHash, ...userData } = user;
        return new Response(JSON.stringify(userData), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch(error){
        return new Response(JSON.stringify({error}), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}