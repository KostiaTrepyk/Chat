import { useState } from "react";
import { useAppSelector } from "../../../hooks/hooks";
import { chatAPI } from "../../../services/ChatService";
import Modal from "../../modals/modal";

interface Modal_addUserProps {
    active: boolean;
    toggle: (value?: boolean) => void;
}

export default function ModalAddUser(props: Modal_addUserProps) {
    const [email, setEmail] = useState<string>("");

    const chatId = useAppSelector((state) => state.chat.chatId);

    const addUserToChatMutationFnc = chatAPI.useAddUserToChatMutation()[0];

    function addUserToChat(e: any) {
        e.preventDefault();
        if (chatId) {
            addUserToChatMutationFnc({
                chatId: chatId,
                newUser_Email: email,
            });
        }
        props.toggle();
        setEmail("");
    }

    return (
        <Modal active={props.active} setActive={props.toggle}>
            <h1 className="Modal_title">Add user to the chat</h1>
            <form className="Modal_form">
                <div>User Email</div>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <button onClick={addUserToChat}>Add</button>
            </form>
        </Modal>
    );
}
