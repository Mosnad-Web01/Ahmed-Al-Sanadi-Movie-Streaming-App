// src/middleware.js
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the pathname from the URL
  const pathname = request.nextUrl.pathname;
  
  // Extract locale from the pathname
  const localePrefix = `/${pathname.split('/')[1]}`;
  
  // Check if user is authenticated via cookie
  const isAuthenticated = request.cookies.has('currentUser');
  
  // Define public routes (accessible without authentication)
  const publicRoutes = ['/', '/sign-in', '/sign-up'];
  
  // Check if the current path (without locale) is a public route
  const isPublicRoute = publicRoutes.some(route => {
    // Handle both root path and locale-prefixed root path
    if (route === '/' && (pathname === '/' || pathname === localePrefix)) {
      return true;
    }
    // Handle other public routes with potential locale prefix
    return pathname.endsWith(route) || pathname === `${localePrefix}${route}`;
  });
  
  // Define authentication routes
  const authRoutes = ['/sign-in', '/sign-up'];
  
  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some(route => 
    pathname.endsWith(route) || pathname === `${localePrefix}${route}`
  );
  
  // Authentication logic
  if (!isAuthenticated && !isPublicRoute) {
    // User is not authenticated and trying to access a protected route
    // Preserve the locale in the redirect URL
    const locale = pathname.split('/')[1];
    const signInUrl = i18nConfig.locales.includes(locale) 
      ? `/${locale}/sign-in` 
      : '/sign-in';
    
    return NextResponse.redirect(new URL(signInUrl, request.url));
  }
  
  if (isAuthenticated && isAuthRoute) {
    // User is authenticated and trying to access sign-in or sign-up
    // Preserve the locale in the redirect URL
    const locale = pathname.split('/')[1];
    const homeUrl = i18nConfig.locales.includes(locale) 
      ? `/${locale}` 
      : '/';
    
    return NextResponse.redirect(new URL(homeUrl, request.url));
  }
  
  // Apply i18n routing after authentication checks
  return i18nRouter(request, i18nConfig);
}

// Applies this middleware only to relevant routes
export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};