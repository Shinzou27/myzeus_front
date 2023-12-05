import { UserContext } from "./UserContext";
import { useContext } from "react";
export function useAuth() {
    const userContext = useContext(UserContext);
    return userContext;
}