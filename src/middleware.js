// src/middleware.js
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Language handling
  const i18nResponse = i18nRouter(request, i18nConfig);

  // Authentication logic
  const protectedRoutes = ['/movie', '/tv', '/search', '/actors', '/profile']; // Define protected routes
  const currentUser = request.cookies.get('currentUser')?.value;

  // Check if the current route is protected
  if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    // If user is not authenticated, redirect to login
    if (!currentUser) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  // If user is authenticated, restrict access to sign-in and sign-up
  if (currentUser && ['/sign-in', '/sign-up'].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', request.url)); // Redirect authenticated users to home if trying to access sign-in or sign-up
  }

  // Return the i18n response if no redirect happened
  return i18nResponse;
}

// Applies this middleware only to files in the app directory and ignores the below files
export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
