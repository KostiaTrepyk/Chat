import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { userActions } from "../../store/slices/user/userSlice";

export default function LogoutPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(userActions.logout());
        localStorage.removeItem("token");
        navigate("/login");
    }, [dispatch, navigate]);

    return <h1>Error!</h1>;
}
