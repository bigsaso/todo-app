import { prisma } from "@/db/client";

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
    const req = await request.json();
    try {
        const { email, password } = req;

        // Validate incoming data
        if (!email || !password) {
            return new Response(JSON.stringify({ message: 'Email and Password are required' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        // Compare provided password with the stored hash
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
        // Last Login
        const now = new Date();
        // Use the Prisma client to update the user's last login
        const updatedUser = await prisma.user.update({
            where: { email },
            data: {
                lastLogin: now.toISOString()
            },
        });
        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email }, // Payload
            process.env.JWT_SECRET,                 // Secret key
            { expiresIn: '24h' }                    // Options: Token expires in 24 hours
        );

        // Return the user data (excluding password hash for security)
        const { passwordHash, ...userData } = user;
        return new Response(JSON.stringify({ ...userData, token }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({error}), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
