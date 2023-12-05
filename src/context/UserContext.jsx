import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const UserContext = createContext({});
export const UserContextProvider = ({ children }) => {
    const ls = window.localStorage;
    const [loggedUser, setLoggedUser] = useState({
        username: JSON.parse(ls.getItem('user'))?.username,
        id: JSON.parse(ls.getItem('user'))?.id
    });
    const [pets, setPets] = useState(JSON.parse(ls.getItem('pets')));
    const [reports, setReports] = useState(JSON.parse(ls.getItem('reports')));
    const isAuthenticated = !loggedUser;

    async function logout() {
        ls.removeItem('user');
        ls.removeItem('reports');
        ls.removeItem('pets');
        setLoggedUser(null);
    }
    async function login(username, password) {
        const credentials = { username: username, password: password };
        try {
            const response = await api.post('/login', credentials)
            const { token, id, username, message } = response.data;
            const authData = {
                token: token,
                id: id,
                username: username
            }
            ls.setItem('user', JSON.stringify(authData));
            setLoggedUser({ username: username, id: id });

            const reports = await api.get(`/reports?id=${id}`)
            ls.setItem('reports', JSON.stringify(reports.data));
            setReports('reports', reports);
            
            const pets = await api.get(`/pets?id=${id}`)
            ls.setItem('pets', JSON.stringify(pets.data));
            setPets('pets', pets);
            
            api.defaults.headers['Authorization'] = `Bearer ${authData.token}`
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
    async function updateReports(report, callback) {
        if(report) {
            await api.post(`/reports?id=${loggedUser.id}`, report).then(callback);
        }
        const response = await api.get(`/reports?id=${loggedUser.id}`);
        ls.setItem('reports', JSON.stringify(response.data));
    }
    async function updatePets(pet, callback) {
        if(pet) {
            await api.post(`/pets?id=${loggedUser.id}`, pet).then(callback)
        }
        const response = await api.get(`/pets?id=${loggedUser.id}`);
        ls.setItem('pets', JSON.stringify(response.data));
    }
    useEffect(() => {
        const authData = JSON.parse(ls.getItem('user'));
        if (!authData?.token) {
            setLoggedUser({});
            api.defaults.headers['Authorization'] = '';
        }
    }, [])
    return (
        <UserContext.Provider value={{ loggedUser, reports, pets, isAuthenticated, login, logout, updateReports, updatePets }}>
            {children}
        </UserContext.Provider>
    );
}