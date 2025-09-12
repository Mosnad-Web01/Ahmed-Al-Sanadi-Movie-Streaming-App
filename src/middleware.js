import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get the pathname from the URL
  const pathname = request.nextUrl.pathname;
  console.log('Middleware - pathname:', pathname);
  
  // Extract locale from the pathname
  const pathSegments = pathname.split('/').filter(Boolean);
  const possibleLocale = pathSegments[0];
  const isValidLocale = i18nConfig.locales.includes(possibleLocale);
  
  // Get the actual route path without locale
  const routeWithoutLocale = isValidLocale 
    ? '/' + pathSegments.slice(1).join('/') 
    : pathname;
  
  console.log('Route without locale:', routeWithoutLocale);
  
  // Check if user is authenticated via cookie
  const authCookie = request.cookies.get('currentUser');
  const isAuthenticated = !!authCookie?.value;
  console.log('Is authenticated:', isAuthenticated);
  
  // Define routes that don't require authentication
  const publicRoutes = [
    '/', 
    '/sign-in', 
    '/sign-up'
  ];
  
  // Define routes that require authentication
  const protectedRoutePatterns = [
    /^\/movie\/\d+$/,        // /movie/123
    /^\/tv\/\d+$/,           // /tv/123
    /^\/person\/\d+$/,       // /person/123
    /^\/profile$/,           // /profile
    /^\/search$/,            // /search (if protected)
  ];
  
  // Check if current route is public
  const isPublicRoute = publicRoutes.includes(routeWithoutLocale) || 
                       routeWithoutLocale === '';
  
  // Check if current route is protected
  const isProtectedRoute = protectedRoutePatterns.some(pattern => 
    pattern.test(routeWithoutLocale)
  );
  
  // Check if current route is an auth route
  const isAuthRoute = ['/sign-in', '/sign-up'].includes(routeWithoutLocale);
  
  console.log('Route analysis:', {
    isPublicRoute,
    isProtectedRoute,
    isAuthRoute,
    routeWithoutLocale
  });
  
  // Authentication logic
  if (!isAuthenticated && isProtectedRoute) {
    // User is not authenticated and trying to access a protected route
    console.log('Redirecting to sign-in - not authenticated accessing protected route');
    
    const locale = isValidLocale ? possibleLocale : i18nConfig.defaultLocale;
    const signInUrl = `/${locale}/sign-in`;
    
    return NextResponse.redirect(new URL(signInUrl, request.url));
  }
  
  if (isAuthenticated && isAuthRoute) {
    // User is authenticated and trying to access sign-in or sign-up
    console.log('Redirecting to home - authenticated user accessing auth route');
    
    const locale = isValidLocale ? possibleLocale : i18nConfig.defaultLocale;
    const homeUrl = `/${locale}`;
    
    return NextResponse.redirect(new URL(homeUrl, request.url));
  }
  
  // Apply i18n routing for all other cases
  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};