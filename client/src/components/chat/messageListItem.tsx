import { useAppSelector } from "../../hooks/hooks";

import "./styles/messageItem.sass";

interface MessageProps {
    messageText: string;
    messageTime: string;
    messageFrom: {
        id: number;
        username: string;
        email: string;
        role: any;
        ban: boolean;
        ban_reason: string;
    };
}

export default function MessageListItem(props: MessageProps) {
    const user = useAppSelector((state) => state.user.user);

    if (props.messageFrom.id === user.id) {
        return (
            <div className="MessageItem MessageItem_My">
                <div>
                    <div className="MessageItem_from">You</div>
                    <div className="MessageItem_text">{props.messageText}</div>
                </div>
                <div className="MessageItem_time">{props.messageTime}</div>
            </div>
        );
    }

    return (
        <div className="MessageItem">
            <div>
                <div className="MessageItem_from">
                    {props.messageFrom.username}
                </div>
                <div className="MessageItem_text">{props.messageText}</div>
            </div>
            <div className="MessageItem_time">{props.messageTime}</div>
        </div>
    );
}
