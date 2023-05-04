'use client'

import { useStore } from '@/store'
import { FC } from 'react'
import Graph from '../Graph'
import RiskPieChart from '../RiskPieChart'
import DataTable from '../DataTable'

const DataRepresentation: FC = () => {
    const pieChartData = useStore(state => state.pieChartData)

    return (
        <div className="flex-[1] p-5 lg:h-screen overflow-y-scroll">
            <Graph />
            <DataTable />
            <RiskPieChart data={pieChartData} />
        </div>
    )
}

export default DataRepresentation;