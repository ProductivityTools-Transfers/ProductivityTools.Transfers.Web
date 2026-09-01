import { createContext, useEffect, useContext, useState } from 'react';
import { auth } from './firebase';



const AuthContext = createContext({
    user: null,
    loading: true,
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onIdTokenChanged(async (currentUser) => {
            if (!currentUser) {
                setUser(null);
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
            } else {
                const token = await currentUser.getIdToken();
                setUser(currentUser);
                localStorage.setItem("token", token);
                localStorage.setItem("refreshToken", currentUser.refreshToken);
                console.log("Token updated in localStorage");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
    );
}


export const useAuth = () => {
    return useContext(AuthContext);
}