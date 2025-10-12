import { useLocation } from "react-router-dom";
import { Pagination } from "../components/advaned";
import { Table } from "../components/Table"
import useFetch from "../hooks/useFetch/useFetch";

type NotificationType = "user_edited" | "order_created" | "user_created" | "user_deleted"

type Notification = {
    id: number;
    type: NotificationType;
    message: string;
}

interface Data {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    count: number;
    data: Notification[]

}


const Notifications = () => {
    const location = useLocation()
    const { data, loading, error } = useFetch<Data>(location.pathname + location.search)

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-red-600 text-2xl mb-2">Oops! Something went wrong.</p>
                <p className="text-gray-600">{error}</p>
            </div>
        );
    }

    const notificationsData = data?.data || []
    return (
        <div className="p-[15px] md:p-[30px]">
            <h1 className="text-text-light dark:text-text-dark text-3xl">Notifications</h1>
            <div className="mt-4">
                <Table>
                    <Table.Head>
                        <Table.HeadRow>
                            <Table.HeadCell>
                                ID
                            </Table.HeadCell>
                            <Table.HeadCell>
                                Message
                            </Table.HeadCell>
                            <Table.HeadCell centered>
                                Type
                            </Table.HeadCell>
                        </Table.HeadRow>
                    </Table.Head>
                    <Table.Body>
                        {notificationsData.map((notification: Notification) => {
                            return (
                                <Table.Row key={notification.id}>
                                    <Table.Cell>
                                        {notification.id}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {notification.message}
                                    </Table.Cell>
                                    <Table.Cell centered>
                                        <Table.Status color={
                                            notification.type === "order_created" ? "green"
                                                : notification.type === "user_deleted" ? "red"
                                                    : notification.type === "user_created" ? "yellow"
                                                        : "blue"
                                        }>
                                            {notification.type.split("_").join(" ")}
                                        </Table.Status>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}

                    </Table.Body>
                </Table>
                <Pagination
                    currentPage={data?.page}
                    limit={data?.limit}
                    total={data?.total}
                    totalPages={data?.totalPages}
                />

            </div>

        </div>
    )
}

export default Notifications