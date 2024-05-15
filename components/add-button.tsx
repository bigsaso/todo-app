import axios from 'axios';

import { PlusIcon } from '@radix-ui/react-icons'

import { Button } from "@/components/ui/button"

interface AddButtonProps {
    userId: number,
    title: String
}

async function handleAdd(userId: number, title: String) {

  const api_url = process.env.NEXT_PUBLIC_API_URL;

  console.log("Add " + userId + title);

  try {
    const response = await axios.post(`${api_url}/api/todos`, {
      title,
      userId,
    });
    console.log("Todo added successfully:", response.data);
    location.reload();
  } catch (error: any) {
    console.error("Error adding todo:", error.response ? error.response.data : error.message);
  }
}

export function AddButton({ userId, title }: AddButtonProps) {
  return (
  <Button className="max-w-44" onClick={(e) => handleAdd(userId, title)}>
    <PlusIcon className="mr-2 h-4 w-4" /> Add
  </Button>
  )
}