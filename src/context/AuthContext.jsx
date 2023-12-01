import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext({});
export function AuthContextProvider({children}) {
    const [user, setUser] = useState({});
    const isAuthenticated = !user;

    async function logout() {
        localStorage.removeItem('user');
        setUser(null);
    }
    async function login(username, password) {
        try {
            api.post('/login', {
                username: username,
                password: password
            }).then((response) => {
                const authData = {
                    token: response.data.token,
                    user: response.data.user
                }
                localStorage.setItem('user', JSON.stringify(authData));
                api.defaults.headers['Authorization'] = `Bearer ${authData.token}`
                setUser(user);
            })
        } catch (error) {
            console.log(error);
            return;
        }
    }
    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem('user'));
        if (!authData.token) {
            api.defaults.headers['Authorization'] = '';
            setUser({});
        }
    }, [])
    return (
        <AuthContext.Provider value={{user, isAuthenticated, logout}}>
            {children}
        </AuthContext.Provider>
    );
}