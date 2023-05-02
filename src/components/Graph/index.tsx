/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { FC, useEffect, useState } from 'react';
import { LineChart, Line, Tooltip, XAxis, YAxis } from 'recharts';
import { useStore } from '@/store';
import { ClimateRiskData, State } from '@/interfaces';

const Graph: FC = () => {
    const selectedAsset = useStore((state: State) => state.selectedAsset)
    const climateRiskData = useStore(state => state.climateRiskData)
    const [dataToRenderOnGraph, setDataToRenderOnGraph] = useState<ClimateRiskData[]>([])

    useEffect(() => {
        if (!dataToRenderOnGraph) return

        const filteredData = climateRiskData.flat().filter(item => {
            if (item.Lat === selectedAsset.Lat && item.Long === selectedAsset.Long && item['Asset Name'] === selectedAsset['Asset Name'])
                return true;
            return false
        }).sort((a, b) => a.Year - b.Year);

        setDataToRenderOnGraph(filteredData)
    }, [climateRiskData, selectedAsset])

    if (!dataToRenderOnGraph) return (<></>)

    return (
        <LineChart width={700} className='text-sm' height={300} data={dataToRenderOnGraph}>
            <Line dataKey="Risk Rating" dot stroke="green" />
            <XAxis dataKey='Year' />
            <YAxis dataKey='Risk Rating' />
            <Tooltip />
        </LineChart>
    )
}

export default Graph