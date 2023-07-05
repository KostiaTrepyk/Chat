import { ReactNode, useEffect, useLayoutEffect } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { IUser } from "../../models/IUser";
import { userAPI } from "../../services/UserService";
import { userActions } from "../../store/slices/user/userSlice";
import jwtDecode from "jwt-decode";

import Navbar from "../common/navbar";
import Footer from "../common/footer";
import LoadingWindow from "../modals/loadingWindow";
import { useLocalStorage } from "../../hooks/useLocalStorage";

type CheckTokenProps = {
    children: ReactNode | undefined;
    isFooter?: boolean;
    isNavbar?: boolean;
};

export default function CheckToken(props: CheckTokenProps) {
    const [token, setToken] = useLocalStorage<string>("token", "");
    const dispatch = useAppDispatch();
    const [checkTokenQueryFnc, checkTokenQuery] =
        userAPI.useLazyCheckTokenQuery({
            refetchOnFocus: true,
        });

    useLayoutEffect(() => {
        if (typeof token === "string") checkTokenQueryFnc(token);
        else setToken("");
    }, [checkTokenQueryFnc, token, setToken]);

    useEffect(() => {
        if (checkTokenQuery.isSuccess && typeof token === "string") {
            let res = jwtDecode<IUser>(token);
            dispatch(userActions.login(res));
        }
    }, [checkTokenQuery.isSuccess, dispatch, token]);

    useEffect(() => {
        if (checkTokenQuery.isError) {
            dispatch(userActions.logout());
        }
    }, [checkTokenQuery.isError, dispatch]);

    return (
        <>
            {checkTokenQuery.isLoading ? (
                <div
                    style={{
                        height: `calc(100dvh  - ${
                            props.isNavbar ? "60px" : "0px"
                        } - ${props.isFooter ? "100px" : "0px"})`,
                    }}
                >
                    {props.isNavbar && <Navbar />}
                    <LoadingWindow
                        theme={localStorage.getItem("theme") || "light"}
                    ></LoadingWindow>
                    {props.isFooter && <Footer />}
                </div>
            ) : (
                props.children
            )}
        </>
    );
}
