import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RequireAuth(props) {
  
  const user = useSelector((store) => store.currentUser);

    if(!user.token) {
      return <Navigate to="/login"/>
    } else {
      return props.children; 
    } 
}