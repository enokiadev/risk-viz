'use client'

import { FC, useEffect, useState } from 'react';
import { LineChart, Line, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useStore } from '@/store';
import { ClimateRiskData, State } from '@/interfaces';

const Graph: FC = () => {
    const selectedAsset = useStore((state: State) => state.selectedAsset)
    const climateRiskData = useStore(state => state.climateRiskData)
    const [dataToRenderOnGraph, setDataToRenderOnGraph] = useState<ClimateRiskData[]>([])

    useEffect(() => {
        if (!dataToRenderOnGraph) return

        // filters an array of ClimateRiskData objects based on their latitude, longitude, and asset name, and sorts the resulting filtered array in ascending order of year.
        const filteredData = climateRiskData.flat().filter(item => {
            if (item.Lat === selectedAsset.Lat && item.Long === selectedAsset.Long && item['Asset Name'] === selectedAsset['Asset Name'])
                return true;
            return false
        }).sort((a, b) => a.Year - b.Year);

        setDataToRenderOnGraph(filteredData)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [climateRiskData, selectedAsset])

    return (
        <div className='w-full my-20 relative h-[300px]'>
            <h2 className='mb-5 font-bold'>Selected asset graph</h2>
            {dataToRenderOnGraph.length === 0 && <div className='bg-[#edededab] w-full h-full flex items-center justify-center absolute top-0 left-0'>
                <p>Select an asset marker from the map to view the line graph data</p>
            </div>}
            <ResponsiveContainer className='-ml-5'>
                <LineChart width={700} className='text-sm' height={300} data={dataToRenderOnGraph}>
                <Line dataKey="Risk Rating" dot stroke="green" />
                <XAxis dataKey='Year' />
                <YAxis dataKey='Risk Rating' />
                <Tooltip />
            </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Graph