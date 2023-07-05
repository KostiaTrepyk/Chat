import { useState } from "react";
import { chatAPI } from "../../../services/ChatService";
import Modal from "../../modals/modal";

interface chatList_ModalProps {
    active: boolean;
    setActive: (value?: boolean) => void;
}

export default function ModalAddChat(props: chatList_ModalProps) {
    const [newCaht_title, setNewChat_title] = useState("");

    const addChatMutationFnc = chatAPI.useAddChatMutation()[0];

    function send(e: any): void {
        e.preventDefault();
        addChatMutationFnc(newCaht_title);
        setNewChat_title("");
        props.setActive(false);
    }

    return (
        <Modal active={props.active} setActive={props.setActive}>
            <h1 className="Modal_title">Add chat</h1>
            <form className="Modal_form">
                <div>title</div>
                <input
                    type="text"
                    value={newCaht_title}
                    onChange={(e: any) => {
                        setNewChat_title(e.target.value);
                    }}
                />
                <button onClick={send}>Add</button>
            </form>
        </Modal>
    );
}
