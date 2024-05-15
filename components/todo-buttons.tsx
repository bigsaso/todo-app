import axios from 'axios';

import { CheckIcon } from '@radix-ui/react-icons'

import { Button } from "@/components/ui/button"

interface ButtonProps {
    id?: number
}

async function handleTodo(id?: number) {

    const api_url = process.env.NEXT_PUBLIC_API_URL;

    console.log("Todo: " + id);
    const data = {
        completed: false
    };

    try {
        const response = await axios.put(`${api_url}/api/todos/${id}`, data);
        console.log("Todo updated successfully:", response.data);
        location.reload();
    } catch (error: any) {
        console.error("Error updating todo:", error.response ? error.response.data : error.message);
    }
}

async function handleDone(id?: number) {

    const api_url = process.env.NEXT_PUBLIC_API_URL;

    console.log("Done: " + id);
    const data = {
        completed: true
    };

    try {
        const response = await axios.put(`${api_url}/api/todos/${id}`, data);
        console.log("Todo updated successfully:", response.data);
        location.reload();
    } catch (error: any) {
        console.error("Error updating todo:", error.response ? error.response.data : error.message);
    }
}

export function TodoButton({ id }: ButtonProps) {
    return (
      <Button className="max-w-44" onClick={(e) => handleTodo(id)}>
        <CheckIcon className="mr-2 h-4 w-4" /> Mark as ToDo
      </Button>
    )
}

export function DoneButton({ id }: ButtonProps) {
    return (
      <Button className="max-w-44" onClick={(e) => handleDone(id)}>
        <CheckIcon className="mr-2 h-4 w-4" /> Mark as Done
      </Button>
    )
}