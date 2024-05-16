"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';

import { DeleteButton } from '@/components/delete-button';
import { TodoButton, DoneButton } from '@/components/todo-buttons';
import { AddButton } from '@/components/add-button';

// Interfaces to define the data structures
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface User {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  profilePicUrl: string | null;
  status: string;
  todos: Todo[];
}

import { useRedirectToLoginIfNotAuthenticated } from '@/lib/auth';

export default function Home() {

  const api_url = process.env.NEXT_PUBLIC_API_URL;

  useRedirectToLoginIfNotAuthenticated();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const [todo, setTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const user_id = localStorage.getItem("user_id");
      try {
        const response = await axios.get(`${api_url}/api/users/${user_id}`);
        setTodos(response.data.todos);
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch todos');
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <div className="space-y-2">
      <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">{user ? `Todos for ${user.username}` : 'No user logged in'}</h1>
      {todos.map(todo => (
        <div id={`${todo.id}`} key={todo.id} className="grid grid-cols-2 items-center">
          <label
            htmlFor={`${todo.id}`}
            className={todo.completed ? "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 line-through" : "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"}
          >
            {todo.title}
          </label>
          <div className="flex items-center space-x-2">
            {todo.completed ? <TodoButton id={todo.id} /> : <DoneButton id={todo.id} />}
            <DeleteButton id={todo.id}/>
          </div>
        </div>
      ))}
      <div className="flex items-center space-x-2">
        <Input
          id="todo"
          type="text"
          placeholder="New task"
          required
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        {user ? <AddButton userId={user.id} title={todo}/> : <></>}
      </div>
    </div>
  );
}
