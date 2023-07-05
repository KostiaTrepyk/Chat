import { useLayoutEffect, useRef } from "react";

interface RegistrationFormProps {
    initData?: { username?: string; email?: string; password?: string };
    setData?: (data: {
        username: string;
        email: string;
        password: string;
    }) => void;
    signUpHandler: (data: {
        username: string;
        email: string;
        password: string;
    }) => void;
    changeForm: React.Dispatch<React.SetStateAction<"login" | "registration">>;
}

export default function RegistrationForm(props: RegistrationFormProps) {
    const usernameRef = useRef<any>();
    const emailRef = useRef<any>();
    const passwordRef = useRef<any>();

    useLayoutEffect(() => {
        usernameRef.current.value = props.initData?.username;
        emailRef.current.value = props.initData?.email;
        passwordRef.current.value = props.initData?.password;
    }, [props.initData]);

    function signUpBtnHandler(e: any): void {
        e.preventDefault();
        props.setData &&
            props.setData({
                username: usernameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });
        props.signUpHandler({
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        });
    }

    function changeForm(): void {
        props.setData &&
            props.setData({
                username: usernameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });
        props.changeForm("login");
    }

    return (
        <>
            <div>Name: </div>
            <input type="text" ref={usernameRef} />

            <div>Email: </div>
            <input type="text" ref={emailRef} />

            <div>Password: </div>
            <input type="password" ref={passwordRef} />

            <button onClick={signUpBtnHandler}>Sign Up</button>
            <div>
                Lorem ipsum dolor sit amet.
                <button type="button" onClick={changeForm}>
                    login
                </button>
            </div>
        </>
    );
}
