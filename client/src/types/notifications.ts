export type NotificationType = "user_edited" | "order_created" | "user_created" | "user_deleted"

export type Notification = {
    id: number;
    type: NotificationType;
    message: string;
}

