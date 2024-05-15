"use client";

import { jwtDecode } from "jwt-decode";
import { useRouter } from 'next/navigation';
import { useEffect, useCallback } from 'react';

export const useRedirectToLoginIfNotAuthenticated = () => {
  const router = useRouter();

  const checkJWTExpiration = useCallback(() => {
    const token = localStorage.getItem('jwt');
    if(token) {
      const { exp } = jwtDecode<{ exp: number }>(token);
      const expirationDate: any = new Date(exp * 1000);
      const now: any = new Date();
      if (now >= expirationDate) {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user_id');
        router.push('/login');
      } else {
        const timeout = setTimeout(checkJWTExpiration, expirationDate - now);
        return () => clearTimeout(timeout);
      }
    }
  }, [router]); // Dependency array

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      router.push('/login');
    } else {
      checkJWTExpiration();
    }
  }, [router, checkJWTExpiration]); // Include checkJWTExpiration in the dependency array
};
