export interface IUser {
    id: number | null;
    username: string | null;
    email: string | null;
    role: any;
    ban: boolean;
    ban_reason: string | null;
}
