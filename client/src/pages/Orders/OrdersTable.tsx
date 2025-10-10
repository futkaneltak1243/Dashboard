import type { FC } from "react"
import { ActionButtons } from "../../components/ActionButtons"
import { Table } from "../../components/Table"
import type { Order } from "../../types/orders"
import { Eye } from "lucide-react"


interface OrdersTableProps {
    orders: Order[]
}

const OrdersTable: FC<OrdersTableProps> = ({ orders }) => {
    return (
        <Table>
            <Table.Head>
                <Table.HeadRow>
                    <Table.HeadCell>
                        ID
                    </Table.HeadCell>
                    <Table.HeadCell>
                        NAME
                    </Table.HeadCell>
                    <Table.HeadCell>
                        ADDRESS
                    </Table.HeadCell>
                    <Table.HeadCell centered>
                        DATE
                    </Table.HeadCell>
                    <Table.HeadCell centered>
                        STATUS
                    </Table.HeadCell>
                    <Table.HeadCell centered>
                        ACTIONS
                    </Table.HeadCell>
                </Table.HeadRow>
            </Table.Head>
            <Table.Body>
                {orders.map((order: Order) => {
                    return (
                        <Table.Row key={order.id}>
                            <Table.Cell>
                                {order.id}
                            </Table.Cell>
                            <Table.Cell>
                                {order.user_fullname}
                            </Table.Cell>
                            <Table.Cell>
                                {order.address}
                            </Table.Cell>
                            <Table.Cell centered>
                                {order.date}
                            </Table.Cell>
                            <Table.Cell centered>
                                <Table.Status
                                    color={order.status === "Completed" ? "green"
                                        : order.status === "Rejected" ? "red"
                                            : order.status === "On Hold" ? "yellow"
                                                : "blue"
                                    }
                                >
                                    {order.status}
                                </Table.Status>
                            </Table.Cell>
                            <Table.Cell centered>
                                <ActionButtons>
                                    <ActionButtons.Button type="icon" Icon={Eye} />
                                </ActionButtons>
                            </Table.Cell>
                        </Table.Row>
                    )
                })}
            </Table.Body>
        </Table>
    )
}

export default OrdersTable 