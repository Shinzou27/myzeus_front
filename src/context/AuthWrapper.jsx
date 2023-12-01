import { useEffect } from "react";
import useAuth from "./useAuth";
import { useLocation, useNavigate } from "react-router-dom";

function AuthWrapper({children}) {
    const auth = useAuth();
    const location = useLocation();
    const nav = useNavigate();

    useEffect(() => {
        if(!auth.user) {
            nav('/', {
                state: {
                    from: location
                },
                replace: true
            });
        }
    }, [auth.user, location, nav]);
    return children;
}

export default AuthWrapper;