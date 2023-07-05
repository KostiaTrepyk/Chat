import { useState } from "react";
import LoginForm from "./loginForm/loginForm";
import RegistrationForm from "./registrationForm/registrationForm";

import "./styles/authForm.sass";

type AuthFormProps = {
    signInHandler: (data: { email: string; password: string }) => void;
    signUpHandler: (data: {
        username: string;
        email: string;
        password: string;
    }) => void;
    isLoading: boolean;
};

export default function AuthForm(props: AuthFormProps) {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [form, setForm] = useState<"login" | "registration">("login");

    function setData(data: {
        username?: string;
        email?: string;
        password?: string;
    }): void {
        data.username && setUsername(data.username);
        data.email && setEmail(data.email);
        data.password && setPassword(data.password);
    }

    return (
        <div className="AuthForm_container">
            <h1 className="AuthForm_title">
                {form === "registration" ? "Registration" : "Login"}
            </h1>
            <div
                className={`${
                    props.isLoading ? "AuthForm_loading" : "AuthForm_loaded"
                }`}
            >
                <form className="AuthForm_form">
                    {form === "login" ? (
                        <LoginForm
                            initData={{ email, password }}
                            setData={setData}
                            changeForm={setForm}
                            signInHandler={props.signInHandler}
                        />
                    ) : (
                        <RegistrationForm
                            initData={{ username, email, password }}
                            setData={setData}
                            changeForm={setForm}
                            signUpHandler={props.signUpHandler}
                        />
                    )}
                </form>
            </div>
        </div>
    );
}
