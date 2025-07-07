import Cookies from "js-cookie"
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({children}) =>{
    const JWTTOKEN = Cookies.get("JWTTOKEN");
    if(JWTTOKEN===undefined){
        return <Navigate to="/login" replace />
    }
    return children
}

export default ProtectedRoute
