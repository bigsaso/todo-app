"use client";

import axios from 'axios';
import { FormEvent } from 'react';
import { useState } from "react";

import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useRouter } from 'next/navigation';

export function LoginForm() {

  const api_url = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submit action
  
    try {
      const response = await axios.post(`${api_url}/api/users/login`, {
        email,
        password,
      });

      // console.log('Signup successful:', response.data);

      localStorage.setItem('jwt', response.data.token);
      localStorage.setItem('user_id', response.data.id);
      
      // Redirect or update UI here
      router.push('/');
    } catch (error: any) {
      // With axios, error.response contains the server response
      const errorMessage = error.response ? error.response.data.message : error.message;
      console.error('Signup error:', errorMessage);
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link> */}
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline" >
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
