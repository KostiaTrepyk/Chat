export type IMessage = {
    id: number;
    text: string;
    time: string;
    user: {
        id: number;
        username: string;
        email: string;
        role: any;
        ban: boolean;
        ban_reason: string;
    };
}
