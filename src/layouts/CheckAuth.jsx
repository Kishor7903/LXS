import { Navigate, useLocation } from "react-router-dom";


function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation().pathname;

    if( location === "/" ) {
        if (!isAuthenticated) {
            return <Navigate to="/shop" />;
        } 
        else {
            if (user?.role === "admin") {
                return <Navigate to="/admin/dashboard" />;
            } else {
                return <Navigate to="/shop" />;
            }
        }
    }

    if ( !isAuthenticated && (location.includes("/checkout") || location.includes("/setting") || location.includes("/orders"))) {
        return <Navigate to="/shop" />;
    } else if( !isAuthenticated && location.includes("/admin") ){
        return <Navigate to="/shop" />;
    }

    if( isAuthenticated && user?.role !== "admin" && location.includes("/admin") ){
        return <Navigate to="/shop" />;
    } else if( isAuthenticated && user?.role === "admin" && !(location.includes("/admin"))) {
        return <Navigate to="/admin/dashboard" />;
    }

    return <>{children}</>;
}

export default CheckAuth;
