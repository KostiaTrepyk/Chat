import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { userActions } from "../../store/slices/user/userSlice";
import { useNavigate } from "react-router-dom";
import { userAPI } from "../../services/UserService";
import jwtDecode from "jwt-decode";

import { IUser } from "../../models/IUser";
import Navbar from "../../components/common/navbar";
import Footer from "../../components/common/footer";
import AuthForm from "../../components/auth/authForm/authForm";

import "./styles/authorization.page.sass";

export default function AuthorizationPage() {
    const [singInMutationFnc, singInMutation] = userAPI.useSingInMutation();
    const [singUpMutationFnc, singUpMutation] = userAPI.useSingUpMutation();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (singInMutation.isSuccess) {
            /* Decoding data from token */
            localStorage.setItem("token", JSON.stringify(singInMutation.data.access_token));
            const { id, username, email, role, ban, ban_reason } =
                jwtDecode<IUser>(singInMutation.data.access_token);

            /* Adding user data from token to store */
            dispatch(
                userActions.login({
                    id,
                    username,
                    email,
                    role,
                    ban,
                    ban_reason,
                })
            );
            navigate("/");
        }
    }, [singInMutation.isSuccess, singInMutation.data, dispatch, navigate]);

    async function signInHandler(data: { email: string; password: string }) {
        singInMutationFnc(data);
    }

    async function signUpHandler(data: {
        username: string;
        email: string;
        password: string;
    }) {
        await singUpMutationFnc(data);
        await signInHandler(data);
    }

    return (
        <div className="AuthorizationPage">
            <Navbar />
            <div className="AuthorizationPage_container">
                <AuthForm
                    signInHandler={signInHandler}
                    signUpHandler={signUpHandler}
                    isLoading={
                        singInMutation.isLoading || singUpMutation.isLoading
                    }
                />
            </div>
            <Footer />
        </div>
    );
}
