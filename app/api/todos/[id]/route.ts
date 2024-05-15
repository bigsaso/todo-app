import { prisma } from "@/db/client";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    if (!params || !params.id) {
        return new Response(JSON.stringify({ error: "No ID provided" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    const id = parseInt(params.id, 10)
    if (isNaN(id)) {
        return new Response(JSON.stringify({ error: "Invalid ID" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    try {
        const todos = await prisma.todo.findUnique({
            where: {id},
        })
        return new Response(JSON.stringify(todos), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    } catch(error) {
        return new Response(JSON.stringify({error}), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const req = await request.json() // Parse the incoming request data
    const { completed } = req // Extract completed status from the request body
    const id = parseInt(params.id, 10)
    if (isNaN(id)) {
        return new Response(JSON.stringify({ error: "Invalid ID" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    try {
        // Use the Prisma client to update the todo item
        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: {
                completed
            },
        });

        // Return the updated todo item as a JSON response
        return new Response(JSON.stringify(updatedTodo), {
            status: 200, // OK status
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        // Handle errors, such as when the todo item is not found
        return new Response(JSON.stringify({ error: "Todo not found or update failed" }), {
            status: 404, // Not Found status or 500 Internal Server Error could be used depending on error type
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params?: { id?: string } }
) {
    if (!params || !params.id) {
        return new Response(JSON.stringify({ error: "No ID provided" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    const id = parseInt(params.id, 10)
    if (isNaN(id)) {
        return new Response(JSON.stringify({ error: "Invalid ID" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    try {
        const todo = await prisma.todo.findUnique({
            where: { id },
        });
        if (!todo) {
            return new Response(JSON.stringify({ error: "Todo not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        await prisma.todo.delete({
            where: { id },
        });
        return new Response(JSON.stringify({ message: "Todo deleted successfully" }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch(error) {
        return new Response(JSON.stringify({error}), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
}