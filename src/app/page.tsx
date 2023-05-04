'use client'

import RiskMap from '@/components/RiskMap'
import { useStore } from '@/store'
import { loadClimateRiskData } from '@/utils/loadClimateRiskData.util'
import { useEffect } from 'react'
import DataRepresentation from '@/components/DataRepresentation'

export default function Home() {
  const setClimateRiskData = useStore(state => state.setClimateRiskData)
  const selectedDecade = useStore(state => state.selectedDecade)
  const setFilteredDataByYear = useStore(state => state.setFilteredDataByYear)
  const filteredDataByYear = useStore(state => state.filteredDataByYear)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await loadClimateRiskData()

        setClimateRiskData(data)
        setFilteredDataByYear(data.filter((dataPoint) => {
          return Math.floor(dataPoint.Year / 10) * 10 === selectedDecade // Filters climateRiskData by selectedDecade to set filteredDataByYear
        }))
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }

    if (filteredDataByYear.length < 2) fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDecade])

  return (
    <div className='lg:flex flex-row-reverse'>
      <DataRepresentation />
      <RiskMap />
    </div>
  )
} 