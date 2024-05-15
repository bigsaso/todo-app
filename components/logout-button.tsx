"use client";

import { ExitIcon } from '@radix-ui/react-icons'

import { Button } from "@/components/ui/button"

async function handleLogout() {
  localStorage.removeItem('jwt');
  localStorage.removeItem('user_id');
  location.reload();
}

export function LogoutButton() {

  return (
    <Button className="max-w-44" onClick={(e) => handleLogout()}>
      <ExitIcon className="mr-2 h-4 w-4" /> Logout
    </Button>
  )
}