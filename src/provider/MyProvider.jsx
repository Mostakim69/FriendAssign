import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import app from '../firebase/FireBase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const MyProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        // Don't manually set loading here - let the auth state observer handle it
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        // Don't manually set loading here - let the auth state observer handle it
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        // Don't manually set loading here - let the auth state observer handle it
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        
        // Cleanup function
        return () => {
            if (unsubscribe && typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
    }, []);

    const authData = {
        user,
        setUser,
        createUser,
        logOut,
        signIn,
        auth,
        loading,
    };

    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default MyProvider;