import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation().pathname;
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect from root path
        if (location === "/") {
            if (!isAuthenticated) {
                navigate("/shop");
            } else {
                if (user?.role === "admin") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/shop");
                }
            }
        }

        if(isAuthenticated && location === "/setting"){
            navigate("/setting/dashboard")
        }

        // Block unauthenticated users from certain routes
        if (
            !isAuthenticated &&
            (location.includes("/checkout") ||
                location.includes("/setting") ||
                location.includes("/orders") ||
                location.includes("/policy"))
        ) {
            navigate("/shop");
        } else if (!isAuthenticated && location.includes("/admin")) {
            navigate("/shop");
        }

        // Prevent non-admin from accessing admin routes
        if (isAuthenticated && user?.role !== "admin" && location.includes("/admin")) {
            navigate("/shop");
        } else if (isAuthenticated && user?.role === "admin" && !location.includes("/admin")) {
            navigate("/admin/dashboard");
        }
    }, [isAuthenticated, user, location, navigate]);

    return <>{children}</>;
}

export default CheckAuth;
