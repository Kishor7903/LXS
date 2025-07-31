import { Navigate, useLocation, useNavigate } from "react-router-dom";



function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation().pathname;
    let navigate = useNavigate();

    if( location === "/" ) {
        if (!isAuthenticated) {
            navigate("/shop")
        } 
        else {
            if (user?.role === "admin") {
                navigate("/admin/dashboard")
            } else {
                navigate("/shop")
            }
        }
    }

    if ( !isAuthenticated && (location.includes("/checkout") || location.includes("/setting") || location.includes("/orders") || location.includes("/policy"))) {
        navigate("/shop")
    } else if( !isAuthenticated && location.includes("/admin") ){
        navigate("/shop")
    }

    if( isAuthenticated && user?.role !== "admin" && location.includes("/admin") ){
        navigate("/shop")
    } else if( isAuthenticated && user?.role === "admin" && !(location.includes("/admin"))) {
        navigate("/admin/dashboard")
    }

    return <>{children}</>;
}

export default CheckAuth;
