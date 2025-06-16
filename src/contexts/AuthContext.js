// src/contexts/AuthContext.js
"use client"
import { createContext, useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase/config"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import Cookies from "js-cookie"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Helper function to set auth cookie
  const setAuthCookie = async (user) => {
    try {
      const token = await user.getIdToken(true) // Force refresh
      Cookies.set("currentUser", token, { 
        expires: 1,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      })
      console.log('Auth cookie set successfully')
    } catch (error) {
      console.error('Error setting auth cookie:', error)
    }
  }

  // sign up function with Firestore integration
  async function signup(name, email, password) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    )
    const user = userCredential.user

    // store additional user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      likedActors: [],
      likedMovies: [],
      likedTvShows: [],
      watchLater: [],  
    });

    // fetch the full user profile from Firestore
    const userProfile = await getUserProfile(user.uid)

    // Set auth cookie
    await setAuthCookie(user)

    const userData = { uid: user.uid, email: user.email, ...userProfile }
    setCurrentUser(userData)
    
    // Refresh user data after setting state
    await refreshUserData()

    return user
  }

  // login function with Firestore integration
  async function login(email, password) {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    )
    const user = userCredential.user

    // fetch the full user profile from Firestore
    const userProfile = await getUserProfile(user.uid)

    // Set auth cookie
    await setAuthCookie(user)

    const userData = { uid: user.uid, email: user.email, ...userProfile }
    setCurrentUser(userData)
    
    // Refresh user data after setting state
    await refreshUserData()

    return user
  }

  // fetch user profile from Firestore
  async function getUserProfile(uid) {
    try {
      const userDoc = await getDoc(doc(db, "users", uid))
      return userDoc.exists() ? userDoc.data() : null
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return null
    }
  }

  async function logout() {
    try {
      await signOut(auth)
      Cookies.remove("currentUser")
      setCurrentUser(null)
      console.log('User logged out successfully')
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed:', !!user)
      
      if (user) {
        try {
          // fetch the full user profile from Firestore when the user is authenticated
          const userProfile = await getUserProfile(user.uid)

          // Set auth cookie
          await setAuthCookie(user)

          const userData = { uid: user.uid, email: user.email, ...userProfile }
          setCurrentUser(userData)
        } catch (error) {
          console.error('Error in auth state change:', error)
          setCurrentUser(null)
          Cookies.remove("currentUser")
        }
      } else {
        Cookies.remove("currentUser")
        setCurrentUser(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  // Refresh user data when the user changes
  async function refreshUserData() {
    if (currentUser?.uid) {
      try {
        const userProfile = await getUserProfile(currentUser.uid)
        if (userProfile) {
          setCurrentUser(prev => ({ ...prev, ...userProfile }))
        }
      } catch (error) {
        console.error('Error refreshing user data:', error)
      }
    }
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    refreshUserData, 
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}