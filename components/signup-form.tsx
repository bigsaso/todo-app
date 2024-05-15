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

export function SignupForm() {

  const api_url = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submit action
  
    try {
      const response = await axios.post(`${api_url}/api/users/signup`, {
        username,
        email,
        password,
      });

      // console.log('Signup successful:', response.data);
      
      // Redirect or update UI here
      router.push('/login');
    } catch (error: any) {
      // With axios, error.response contains the server response
      const errorMessage = error.response ? error.response.data.message : error.message;
      console.error('Signup error:', errorMessage);
    }
  }
  
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
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
              <Label htmlFor="password">Password</Label>
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
              Create an account
            </Button>
            {/* <Button variant="outline" className="w-full">
              Sign up with GitHub
            </Button> */}
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline" >
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
