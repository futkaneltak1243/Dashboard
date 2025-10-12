import { SquareMenu, Pencil, CirclePlus, Trash2 } from "lucide-react"
import { Notification } from "../../Notification"
import useFetch from "../../../hooks/useFetch/useFetch"
import type { Notification as Not } from "../../../types/notifications";

interface Data {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    count: number;
    data: Not[]

}

type IconEntry = {
    color: "green" | "blue" | "yellow" | "red";
    Icon: React.ComponentType<any>;
};

type IconTypes =
    | "order_created"
    | "user_edited"
    | "user_created"
    | "user_deleted";

const icons: Record<IconTypes, IconEntry> = {
    order_created: {
        color: "green",
        Icon: SquareMenu,
    },
    user_edited: {
        color: "blue",
        Icon: Pencil,
    },
    user_created: {
        color: "yellow",
        Icon: CirclePlus,
    },
    user_deleted: {
        color: "red",
        Icon: Trash2,
    },
};

const Notifications = () => {
    const { data } = useFetch<Data>("/notifications?limit=4")

    const notifications = data?.data || []

    return (
        <Notification
            className="mr-3 sm:mr-[31px]"
            zIndex={50}
            bottomLink="/notifications"
        >
            {
                notifications.map((notification: Not) => {
                    return (<Notification.Item
                        key={notification.id}
                        iconColor={icons[notification.type]["color"]}
                        Icon={icons[notification.type]["Icon"]}
                        title={notification.type.split("_").join(" ")}
                        desicription={notification.message}
                    />)

                })
            }
        </Notification>
    )
}

export default Notifications