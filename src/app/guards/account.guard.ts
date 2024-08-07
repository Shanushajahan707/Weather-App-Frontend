import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


export const accountGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if (!token) {
    return true; // Allow access if no token is found
  }

  try {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp > currentTime) {
      router.navigateByUrl('/home'); 
      return false; 
    }
    return true;
  } catch (error) {
    localStorage.removeItem('token');
    return true; 
  }
};

export const tokenGuard: CanActivateFn = (route, state) => {
  try {
    const router = inject(Router);

    const token = localStorage.getItem('token');
    if (!token) {
      router.navigateByUrl('/login');
      return false;
    }
    return true;
  } catch (error) {
    localStorage.removeItem('token');
    return true;
  }
};
