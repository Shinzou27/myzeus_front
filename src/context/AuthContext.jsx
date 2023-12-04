import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext({});
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const isAuthenticated = !user;

    async function logout() {
        localStorage.removeItem('user');
        setUser(null);
    }
    async function login(username, password) {
        const credentials = {username: username, password: password};
        try {
            const response = await api.post('/login', credentials)
            const {token, id, username, message} = response.data;
            const authData = {
                token: token,
                id: id,
                username: username
            }
            localStorage.setItem('user', JSON.stringify(authData));
            api.defaults.headers['Authorization'] = `Bearer ${authData.token}`
            setUser(username);
            return {
                user: authData.username,
                error: null,
                message: message
            };
        } catch (error) {
            return {
                user: null,
                error
            };
        }
    }
    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem('user'));
        if (authData == null) {
            setUser({});
            api.defaults.headers['Authorization'] = '';
        }
    }, [])
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}