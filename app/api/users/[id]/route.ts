import { prisma } from "@/db/client";

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id, 10)
    try {
        const userWithTodos = await prisma.user.findUnique({
            where: { id },
            include: { todos: true },
          });
        return new Response(JSON.stringify(userWithTodos), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch(error) {
        return new Response(JSON.stringify({error}), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const req = await request.json();
    const id = parseInt(params.id, 10)
    try{
        const { oldPassword, newPassword } = req;
        // Validate incoming data (simple validation for example purposes)
        if (!oldPassword || !newPassword || newPassword.length < 6) {
            return new Response(JSON.stringify({ message: 'Invalid data provided' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
        // Compare old password with the stored hash
        const isPasswordValid = await bcrypt.compare(oldPassword, user.passwordHash);
        if (!isPasswordValid) {
            return new Response(JSON.stringify({ message: 'Old password does not match' }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        // UpdatedAt
        const now = new Date();
        // Use the Prisma client to update the user's password
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                passwordHash: hashedPassword,
                updatedAt: now.toISOString()
            },
        });
        // Return the new user data (excluding password hash for security)
        const { passwordHash, ...userData } = user;
        return new Response(JSON.stringify(userData), {
            status: 200,
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