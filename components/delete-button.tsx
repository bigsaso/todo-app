import axios from 'axios';

import { TrashIcon } from '@radix-ui/react-icons'

import { Button } from "@/components/ui/button"

interface DeleteButtonProps {
    id?: number
}

async function handleDelete(id?: number) {

    const api_url = process.env.NEXT_PUBLIC_API_URL;

    console.log("Delete " + id);

    try {
        const response = await axios.delete(`${api_url}/api/todos/${id}`);
        console.log("Todo deleted successfully:", response.data);
        location.reload();
    } catch (error: any) {
        console.error("Error updating todo:", error.response ? error.response.data : error.message);
    }
}

export function DeleteButton({ id }: DeleteButtonProps) {
    return (
      <Button className="max-w-44" variant="destructive" onClick={(e) => handleDelete(id)}>
        <TrashIcon className="mr-2 h-4 w-4" /> Delete
      </Button>
    )
}