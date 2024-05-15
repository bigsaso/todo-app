"use client";

import { jwtDecode } from "jwt-decode";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Call this function on every page where you need to protect the route
export const redirectToLoginIfNotAuthenticated = () => {

  const router = useRouter();

  const checkJWTExpiration = () => {
    const token = localStorage.getItem('jwt');
    if(token){
      const { exp } = jwtDecode<{ exp: number }>(token);
      console.log(exp);
      const expirationdate: any = new Date(exp*1000);
      const now: any = new Date();
      if(now>=expirationdate){
          localStorage.removeItem('jwt');
          localStorage.removeItem('user_id');
          router.push('/login');
      } else{
          setTimeout(checkJWTExpiration, expirationdate-now);
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (!token) {
      router.push('/login');
    }
    else {
      checkJWTExpiration();
    }
  }, [router]);

};