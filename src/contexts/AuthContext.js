"use client"
import { createContext, useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase/config"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore" // import getDoc to fetch user data
import Cookies from "js-cookie"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

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

    await refreshUserData()

    // store auth token in cookie
    const token = await user.getIdToken()
    Cookies.set("currentUser", token, { expires: 1 })

    setCurrentUser({ uid: user.uid, email: user.email, ...userProfile }) // Set full user data
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

    await refreshUserData()

    // store auth token in cookie
    const token = await user.getIdToken()
    Cookies.set("currentUser", token, { expires: 1 })

    setCurrentUser({ uid: user.uid, email: user.email, ...userProfile }) // set full user data
    return user
  }

  // fetch user profile from Firestore
  async function getUserProfile(uid) {
    const userDoc = await getDoc(doc(db, "users", uid))
    return userDoc.exists() ? userDoc.data() : null // Return user data if it exists
  }

  async function logout() {
    await signOut(auth)
    Cookies.remove("currentUser") // Remove cookie on logout
    setCurrentUser(null)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // fetch the full user profile from Firestore when the user is authenticated
        const userProfile = await getUserProfile(user.uid)

        // Store auth token in cookie
        const token = await user.getIdToken()
        Cookies.set("currentUser", token, { expires: 1 })

        setCurrentUser({ uid: user.uid, email: user.email, ...userProfile }) // Set full user data
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
    if (currentUser) {
      const userProfile = await getUserProfile(currentUser.uid)
      setCurrentUser({ ...currentUser, ...userProfile })
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
