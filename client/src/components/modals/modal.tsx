import "./styles/modal.sass";

interface ModalProps {
    children: any;
    active: boolean;
    setActive: (value: boolean) => void;
}

export default function Modal(props: ModalProps): JSX.Element {
    function closeHandler(e: any): void {
        e.stopPropagation();
        props.setActive(false);
    }

    function stopPropagation(e: any): void {
        e.stopPropagation();
    }

    return (
        <div
            className={`Modal ${props.active && "active"}`}
            onClick={closeHandler}
        >
            <div className="Modal_container" onClick={stopPropagation}>
                <div className="Modal_controls">
                    <button onClick={closeHandler}>
                        <svg viewBox="0 0 24.00 24.00" fill="none">
                            <path
                                d="M9.16998 14.83L14.83 9.17004"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            <path
                                d="M14.83 14.83L9.16998 9.17004"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            <path
                                d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div className="Modal_main">{props.children}</div>
            </div>
        </div>
    );
}
