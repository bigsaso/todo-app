import { prisma } from "@/db/client";

export async function GET() {
    try {
        const todos = await prisma.todo.findMany();
        return new Response(JSON.stringify(todos), {
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

export async function POST(request: Request) {
    const req = await request.json();
    try{
        const { title, userId } = req;
        const newTodo = await prisma.todo.create({
            data: {
                title,
                completed: false,
                userId
            },
        });
        return new Response(JSON.stringify(newTodo), {
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