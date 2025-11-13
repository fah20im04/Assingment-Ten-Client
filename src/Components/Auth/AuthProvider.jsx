// src/context/AuthProvider.jsx
import React, { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../Firebase/Firebase.init";
import { AuthContext } from "./AuthContext";
import LoadingSpinner from "../Pages/Loading/LoadingSpinner";
import axiosInstance from "../../Api/axiosInstance";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create user with email/password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login with email/password
  const signIn = async (email, password) => {
    setLoading(true);
    const result = await signInWithEmailAndPassword(auth, email, password);
    await getJWT(result.user);
    return result;
  };

  // Login with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, googleProvider);
    await getJWT(result.user);
    return result;
  };

  // Update user profile
  const updateUserProfile = (name, photoURL) => {
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, { displayName: name, photoURL });
    }
  };

  // Logout
  const logOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      localStorage.removeItem("accessToken");
      setUser(null);
      // DO NOT use navigate here
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Get JWT from backend for a Firebase user
  const getJWT = async (firebaseUser) => {
    try {
      const email = firebaseUser.email;
      const res = await axiosInstance.post("/login", { email });
      localStorage.setItem("accessToken", res.data.token);
      setUser(firebaseUser);
    } catch (err) {
      console.error("Failed to get JWT:", err);
    } finally {
      setLoading(false);
    }
  };

  // Observe Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await getJWT(currentUser);
      } else {
        setUser(null);
        localStorage.removeItem("accessToken");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    updateUserProfile,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
