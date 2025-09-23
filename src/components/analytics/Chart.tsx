import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



const Chart = () => {
    const data = crateData()

    return (
        <div className='bg-white rounded-2xl mx-0 md:mx-[33px]'>
            <div className='w-full flex py-[37px] px-[32px] items-center justify-between'>
                <p className='font-semibold text-xl'>Revenue</p>
                <p>Revenue</p>
            </div>
            <div className=' block h-[278px]'>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid vertical={false} color='lightgray' opacity={0.4} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} tickMargin={12} />
                        <YAxis axisLine={false} tickLine={false} tickCount={5} tickMargin={20} fontSize={12} />
                        <Tooltip />
                        <Area type="monotone" dataKey="value1" stackId="1" stroke={""} fill="#FF8F6D" />
                        <Area type="monotone" dataKey="value2" stackId="1" stroke={""} fill="#DBA5FF" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className='w-full py-[31px] flex items-center justify-center'>
                <div className='mr-[58px] flex items-center'>
                    <div className='w-[12px] h-[12px] bg-[#F9978A] mr-[16px] rounded-full'></div>
                    <div className='text-md font-semibold'>Sales</div>
                </div>
                <div className='flex items-center'>
                    <div className='w-[12px] h-[12px] bg-[#E3B9FF] mr-[16px] rounded-full'></div>
                    <div className='text-md font-semibold'>Profit</div>
                </div>

            </div>

        </div>

    )
}


function crateData() {
    let data = []
    for (let i = 5; i <= 60; i = i + 5) {
        data.push({
            name: `${i}k`,
            value1: (Math.random() * 80 + 20).toFixed(2),
            value2: (Math.random() * 80 + 20).toFixed(2)
        })
    }
    return data
}

export default Chart