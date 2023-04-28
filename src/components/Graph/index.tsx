'use client'

import { FC } from 'react';
import { LineChart, Line, XAxis } from 'recharts';
import { useStore } from '@/store';

const Graph: FC = () => {
    const filteredDataByYear = useStore(state => state.filteredDataByYear)

    return (
        <div>
            <LineChart width={1000} height={200} data={filteredDataByYear}>
                <Line dataKey="Lat" dot={false} stroke="red" />
                <Line dataKey="Long" dot={false} stroke="orange" />
                <Line dataKey="Risk Rating" dot={false} stroke="green" />
                <Line dataKey="Business Category" dot={false} stroke="blue" />
                <Line dataKey="Asset Name" dot={false} stroke="blue" />
                <XAxis dataKey="Year" />
            </LineChart>
        </div>
    )
}

export default Graph