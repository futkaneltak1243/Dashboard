import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Chart = () => {
    const data = createData();

    return (
        <div className="bg-items-light dark:bg-items-dark rounded-2xl">
            {/* Header */}
            <div className="w-full flex py-[37px] px-[32px] items-center justify-between">
                <p className="font-semibold text-xl text-text-light dark:text-text-dark">Revenue Overview</p>
            </div>

            {/* Chart */}
            <div className="block h-[278px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.3} />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            fontSize={12}
                            tickMargin={12}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tickCount={5}
                            tickMargin={20}
                            fontSize={12}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#fff",
                                borderRadius: "8px",
                                border: "none",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
                            }}
                            labelStyle={{ fontWeight: "bold" }}
                            cursor={{ stroke: "#ccc", strokeWidth: 1 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="sales"
                            name="Sales"
                            stroke=""
                            fill="url(#colorSales)"
                        />
                        <Area
                            type="monotone"
                            dataKey="profit"
                            name="Profit"
                            stroke=""
                            fill="url(#colorProfit)"
                        />

                        {/* Gradients */}
                        <defs>
                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FF8F6D" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#FF8F6D" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#DBA5FF" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#DBA5FF" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="w-full py-[31px] flex items-center justify-center">
                <div className="mr-[58px] flex items-center">
                    <div className="w-[12px] h-[12px] bg-[#F9978A] mr-[16px] rounded-full"></div>
                    <div className="text-md font-semibold text-text-light dark:text-text-dark">Sales</div>
                </div>
                <div className="flex items-center">
                    <div className="w-[12px] h-[12px] bg-[#E3B9FF] mr-[16px] rounded-full "></div>
                    <div className="text-md font-semibold text-text-light dark:text-text-dark">Profit</div>
                </div>
            </div>
        </div>
    );
};

function createData() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const data = months.map((month) => ({
        month,
        sales: (Math.random() * 1000 + 1000).toFixed(0), // 10k–20k
        profit: (Math.random() * 400 + 300).toFixed(0),  // 3k–7k
    }));
    return data;
}

export default Chart;
