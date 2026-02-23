import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            try {
                setCurrentUser(user);
                if (user) {
                    // Fetch extra user data from Firestore (like role)
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        setUserData(userDoc.data());
                    } else {
                        setUserData(null);
                    }
                } else {
                    setUserData(null);
                }
            } catch (error) {
                console.error("AuthContext Error:", error);
                setUserData(null);
            } finally {
                setLoading(false);
            }
        });

        return unsubscribe;
    }, []);

    const isAdmin = userData?.role === 'admin';

    const value = {
        currentUser,
        userData,
        isAdmin,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
