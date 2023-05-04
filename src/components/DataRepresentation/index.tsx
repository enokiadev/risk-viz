'use client'

import { DECADES, ORDER, MAX_TABLE_PAGE_SIZE, RISK_FACTORS } from '@/constants'
import { ClimateRiskData, State } from '@/interfaces'
import { useStore } from '@/store'
import { useState, useEffect, FC } from 'react'
import Graph from '../Graph'
import RiskPieChart from '../RiskPieChart'
import DataTable from '../DataTable'

const DataRepresentation: FC = () => {
    const pieChartData = useStore(state=>state.pieChartData)
    
    return (
        <div className="flex-[1] p-5 lg:h-screen overflow-y-scroll">
            <DataTable/>
            <RiskPieChart data={pieChartData} />
            <Graph />
        </div>
    )
} 

export default DataRepresentation;