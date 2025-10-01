import { StatGrid, Chart } from "../components/analytics"
import { Users } from "lucide-react"

const Dashboard = () => {
    return (
        <div className="p-[15px] md:p-[30px]">
            <h1 className="text-text-light dark:text-text-dark text-3xl">Dashboard</h1>
            <div className="mt-[27px]">
                <StatGrid>
                    <StatGrid.StatCard title="Total User" value="40,689" direction="up" percent={8.5} lastDifference="yesterday" iconColor="blue" Icon={Users} />
                    <StatGrid.StatCard title="Total User" value="40,689" direction="up" percent={8.5} lastDifference="yesterday" iconColor="blue" Icon={Users} />
                    <StatGrid.StatCard title="Total User" value="40,689" direction="up" percent={8.5} lastDifference="yesterday" iconColor="blue" Icon={Users} />
                    <StatGrid.StatCard title="Total User" value="40,689" direction="up" percent={8.5} lastDifference="yesterday" iconColor="blue" Icon={Users} />

                </StatGrid>
            </div>
            <div className="mt-[27px]">
                <Chart />
            </div>
        </div>
    )
}


export default Dashboard