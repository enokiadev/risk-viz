'use client'

import RiskMap from '@/components/RiskMap'
import Graph from '@/components/Graph'
import { useStore } from '@/store'
import DataTable from '@/components/DataTable'
import { loadClimateRiskData } from '@/utils/loadClimateRiskData.util'
import { useEffect } from 'react'

export default function Home() {
  const setClimateRiskData = useStore(state => state.setClimateRiskData)
  const climateRiskData = useStore(state => state.climateRiskData)
  const selectedDecade = useStore(state => state.selectedDecade)
  const setFilteredDataByYear = useStore(state => state.setFilteredDataByYear)
  const filteredDataByYear = useStore(state => state.filteredDataByYear)

  useEffect(() => {
    if (filteredDataByYear.length < 2) fetchData()
  })

  useEffect(() => {
    fetchData()
  }, [selectedDecade])

  async function fetchData() {
    try {
      const data = await loadClimateRiskData()

      setClimateRiskData(data)
      setFilteredDataByYear(climateRiskData.filter((dataPoint) => {
        return Math.floor(dataPoint.Year / 10) * 10 === selectedDecade
      }))

      console.log('data ->', data)
      console.count('data')
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  return (
    <>
      <DataTable />
      <Graph />
      <RiskMap />
    </>
  )
} 