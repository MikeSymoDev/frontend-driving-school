import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_USER } from "./slices/currentUserSlice";


export default function RequireAuth(props) {

    const loggedUser = useSelector((store) => store.currentUser)
    const localStorageUser = JSON.parse(localStorage.getItem("currentUser"))
    const dispatch = useDispatch();

    if (!loggedUser.token) {

        if(localStorageUser && localStorageUser.token){
            dispatch(SET_USER(localStorageUser));
            return props.children
        }
        return <Navigate to="/login"/>
    }

    else {
        return props.children;
    }
}