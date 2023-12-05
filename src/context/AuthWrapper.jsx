import { useEffect } from "react";
import {useAuth} from "./useAuth";
import { useNavigate } from "react-router-dom";

function AuthWrapper({children}) {
    const auth = useAuth();
    const nav = useNavigate();
    useEffect(() => {
        if(!auth.loggedUser) {
            nav('/');
        }
    }, [auth.user, nav]);
    return children;
}

export default AuthWrapper;