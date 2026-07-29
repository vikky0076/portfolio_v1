'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  sendSignInLinkToEmail, 
  isSignInWithEmailLink, 
  signInWithEmailLink,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  sendMagicLink: (email: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  setError: (err: string | null) => void;
  magicLinkSent: boolean;
  setMagicLinkSent: (sent: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  // Sync user metadata to Firestore
  const syncUserToFirestore = async (firebaseUser: FirebaseUser) => {
    if (typeof window !== 'undefined' && !navigator.onLine) {
      console.warn('Firestore user sync deferred: browser is offline.');
      return;
    }
    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userRef);

      const photoURL = firebaseUser.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${firebaseUser.email}`;
      const name = firebaseUser.displayName || localStorage.getItem('pendingRegisterName') || firebaseUser.email?.split('@')[0] || 'Anonymous';
      
      const provider = firebaseUser.providerData[0]?.providerId || 'email-link';

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: firebaseUser.uid,
          name,
          email: firebaseUser.email,
          photoURL,
          provider,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
        });
      } else {
        await updateDoc(userRef, {
          lastLogin: serverTimestamp(),
          name: firebaseUser.displayName || userSnap.data().name || name,
          photoURL: firebaseUser.photoURL || userSnap.data().photoURL || photoURL,
        });
      }
      
      // Cleanup temporary storage
      localStorage.removeItem('pendingRegisterName');
    } catch (err: any) {
      if (err.code === 'unavailable' || err.message?.includes('offline')) {
        console.warn('Firestore is currently offline. User data sync deferred.');
      } else {
        console.error('Error syncing user to Firestore:', err);
      }
    }
  };

  // Google OAuth Popup
  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await syncUserToFirestore(result.user);
    } catch (err: any) {
      console.error('Google login error:', err);
      setError(err.message || 'Failed to sign in with Google');
      setLoading(false);
    }
  };

  // Send Magic Link
  const sendMagicLink = async (email: string, name?: string) => {
    setLoading(true);
    setError(null);
    
    const actionCodeSettings = {
      url: window.location.origin + '/login',
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      
      // Save email and name locally to complete login later
      window.localStorage.setItem('emailForSignIn', email);
      if (name) {
        window.localStorage.setItem('pendingRegisterName', name);
      }
      
      setMagicLinkSent(true);
      setLoading(false);
    } catch (err: any) {
      console.error('Magic link send error:', err);
      setError(err.message || 'Failed to send login email.');
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (err: any) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Monitor Auth State & Magic Link callbacks
  useEffect(() => {
    const handleMagicLinkCallback = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        setLoading(true);
        let email = window.localStorage.getItem('emailForSignIn');
        
        if (!email) {
          // Fallback if email not found in local storage
          email = window.prompt('Please enter your email to confirm registration:');
        }

        if (email) {
          try {
            const result = await signInWithEmailLink(auth, email, window.location.href);
            await syncUserToFirestore(result.user);
            window.localStorage.removeItem('emailForSignIn');
            
            // Clean URL query parameters
            window.history.replaceState({}, document.title, window.location.pathname);
          } catch (err: any) {
            console.error('Error signing in with magic link:', err);
            setError(err.message || 'Invalid or expired email sign-in link.');
          }
        }
        setLoading(false);
      }
    };

    handleMagicLinkCallback();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await syncUserToFirestore(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        sendMagicLink,
        logout,
        error,
        setError,
        magicLinkSent,
        setMagicLinkSent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
