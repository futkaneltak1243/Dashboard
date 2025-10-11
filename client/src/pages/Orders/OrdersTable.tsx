import { useCallback, useState, type FC } from "react"
import { ActionButtons } from "../../components/ActionButtons"
import { Table } from "../../components/Table"
import type { Order, OrderProduct } from "../../types/orders"
import { Eye } from "lucide-react"
import { InvoiceDialog } from "../../components/InvoiceDialog"


interface OrdersTableProps {
    orders: Order[]
}

const OrdersTable: FC<OrdersTableProps> = ({ orders }) => {
    const [invoiceOpen, setInvoiceOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState<Order>(orders[0])

    const handleViewClick = useCallback((order: Order) => {
        setSelectedOrder(order)
        setInvoiceOpen(true)
    }, [])

    return (
        <>
            <InvoiceDialog
                open={invoiceOpen}
                setOpen={setInvoiceOpen}
            >
                <InvoiceDialog.Body
                    title={"Order Details - " + selectedOrder?.id}
                    description="Complete order information and items"
                    name={selectedOrder.user_fullname}
                    email={selectedOrder.user_email}
                    address={selectedOrder.address}
                    orderId={String(selectedOrder.id)}
                    date={selectedOrder.date}
                    total={selectedOrder.total}
                    status={
                        <Table.Status
                            className="h-5 rounded-full w-20"
                            color={selectedOrder.status === "Completed" ? "green"
                                : selectedOrder.status === "Rejected" ? "red"
                                    : selectedOrder.status === "On Hold" ? "yellow"
                                        : "blue"
                            }
                        >
                            {selectedOrder.status}
                        </Table.Status>
                    }
                >
                    {selectedOrder.products.map((product: OrderProduct) => {
                        return (
                            <InvoiceDialog.Item
                                name={product.name}
                                price={product.price}
                            />
                        )
                    })}
                </InvoiceDialog.Body>
            </InvoiceDialog>
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
                                        <ActionButtons.Button
                                            type="icon"
                                            Icon={Eye}
                                            onClick={() => handleViewClick(order)}
                                        />
                                    </ActionButtons>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </>

    )
}

export default OrdersTable 