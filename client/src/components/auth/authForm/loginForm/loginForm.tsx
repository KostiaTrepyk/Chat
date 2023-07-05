import { useLayoutEffect, useRef } from "react";

interface LoginFormProps {
    initData?: { email?: string; password?: string };
    setData?: (data: { email: string; password: string }) => void;
    signInHandler: (data: { email: string; password: string }) => void;
    changeForm: React.Dispatch<React.SetStateAction<"login" | "registration">>;
}

export default function LoginForm(props: LoginFormProps) {
    const emailRef = useRef<any>();
    const passwordRef = useRef<any>();

    useLayoutEffect(() => {
        emailRef.current.value = props.initData?.email;
        passwordRef.current.value = props.initData?.password;
    }, [props.initData]);

    function signInBtnHandler(e: any) {
        e.preventDefault();
        props.setData &&
            props.setData({
                email: emailRef.current?.value || "",
                password: passwordRef.current?.value || "",
            });
        props.signInHandler({
            email: emailRef.current?.value || "",
            password: passwordRef.current?.value || "",
        });
    }

    function changeForm() {
        props.setData &&
            props.setData({
                email: emailRef.current?.value || "",
                password: passwordRef.current?.value || "",
            });
        props.changeForm("registration");
    }

    return (
        <>
            <div>Email: </div>
            <input type="email" ref={emailRef} />

            <div>Password: </div>
            <input type="password" ref={passwordRef} />

            <button onClick={signInBtnHandler}>Sign in</button>
            <div>
                Lorem ipsum dolor sit amet.
                <button type="button" onClick={changeForm}>
                    registration
                </button>
            </div>
        </>
    );
}
