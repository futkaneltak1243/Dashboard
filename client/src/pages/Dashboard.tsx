import { StatGrid, Chart } from "../components/analytics"
import { Calendar, Package, SquareMenu, UsersRound } from "lucide-react"

const Dashboard = () => {
    return (
        <div className="p-[15px] md:p-[30px]">
            <h1 className="text-text-light dark:text-text-dark text-3xl">Dashboard</h1>
            <div className="mt-[27px]">
                <StatGrid>
                    <StatGrid.StatCard title="Total Users" value="40,689" direction="up" percent={1.5} lastDifference="yesterday" iconColor="blue" Icon={UsersRound} />
                    <StatGrid.StatCard title="Total Products" value="40,689" direction="up" percent={2.5} lastDifference="last month" iconColor="green" Icon={Package} />
                    <StatGrid.StatCard title="Total Orders" value="40,689" direction="down" percent={2.5} lastDifference="yesterday" iconColor="orange" Icon={SquareMenu} />
                    <StatGrid.StatCard title="Total Exhibitions" value="40,689" direction="down" percent={34.7} lastDifference="last year" iconColor="yellow" Icon={Calendar} />

                </StatGrid>
            </div>
            <div className="mt-[27px]">
                <Chart />
            </div>
        </div>
    )
}


export default Dashboard