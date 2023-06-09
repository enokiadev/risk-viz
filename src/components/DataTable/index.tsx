'use client'

import { DECADES, ORDER, MAX_TABLE_PAGE_SIZE, RISK_FACTORS } from '@/constants'
import { ClimateRiskData, State } from '@/interfaces'
import { useStore } from '@/store'
import { useState, useEffect, FC } from 'react'

const DataTable: FC = () => {
    const filteredDataByYear = useStore(state => state.filteredDataByYear)
    const selectedDecade = useStore((state: State) => state.selectedDecade)
    const setSelectedDecade = useStore((state: State) => state.setSelectedDecade)
    const setPieChartData = useStore((state: State) => state.setPieChartData)

    const [currentPage, setCurrentPage] = useState(1)
    const [data, setData] = useState<ClimateRiskData[]>([])
    const [allPieChartData, setAllPieChartData] = useState<{ name: string; value: number; }[]>([])
    const [businessCategories, setBusinessCategories] = useState<string[]>([])
    const [assetNames, setAssetNames] = useState<string[]>([])
    const [selectedBusinessCategory, setSelectedBusinessCategory] = useState('All')
    const [selectedAssetName, setSelectedAssetName] = useState('All')
    const [selectedRiskFactorIndex, setSelectedRiskFactorIndex] = useState(0)
    const [selectedRiskFactor, setSelectedRiskFactor] = useState('All')
    const [order, setOrder] = useState(ORDER[0])

    const startIdx = (currentPage - 1) * MAX_TABLE_PAGE_SIZE
    const endIdx = startIdx + MAX_TABLE_PAGE_SIZE
    const currentData = data.slice(startIdx, endIdx)
    const totalPages = Math.ceil(data.length / MAX_TABLE_PAGE_SIZE)

    useEffect(() => {
        if (filteredDataByYear) {
            const businessCategories = [...new Set(filteredDataByYear.map(obj => obj['Business Category']))]
            businessCategories.push('All')
            businessCategories.reverse()

            setBusinessCategories(businessCategories)
        }
    }, [filteredDataByYear])

    useEffect(() => {
        if (data) {
            const assetNames_ = [...new Set(filteredDataByYear.map(obj => obj['Asset Name']))]
            assetNames_.push('All')
            assetNames_.reverse()

            setAssetNames(assetNames_)
        }
    }, [data, filteredDataByYear])

    useEffect(() => {
        try {
            let filteredData = filteredDataByYear

            // Filter data by the selected business category
            if (selectedBusinessCategory !== 'All') {
                filteredData = filteredData.filter(obj => obj["Business Category"] === selectedBusinessCategory)
            }

            // Filters data based on selected risk factor. Returns all filtered data if 'All' is selected
            if (selectedRiskFactor) {
                filteredData = filteredData.filter(obj => {
                    const filteredDataset = JSON.parse(obj["Risk Factors"])

                    if (selectedRiskFactor === 'All') return filteredDataset
                    return filteredDataset[selectedRiskFactor] === selectedRiskFactorIndex
                })
            }

            // Filter data by the selected asset name
            if (selectedAssetName !== 'All') {
                filteredData = filteredData.filter(obj => obj["Asset Name"] === selectedAssetName)
            }

            // Sorts filteredData array by ascending/descending order of 'Risk Rating'
            if (order === ORDER[0])
                filteredData = filteredData.sort((a, b) => a['Risk Rating'] - b['Risk Rating'])
            else filteredData = filteredData.sort((a, b) => b['Risk Rating'] - a['Risk Rating'])

            const filteredPieChartData = filteredData.map(item => {
                return {
                    name: item['Asset Name'],
                    value: parseFloat(item['Risk Rating'].toString())
                }
            })

            setData(filteredData)
            setCurrentPage(1)
            setAllPieChartData(filteredPieChartData)
        } catch (error) {
            console.error(error)
        }
    }, [filteredDataByYear, selectedAssetName, selectedBusinessCategory, selectedRiskFactor, selectedRiskFactorIndex, order])

    useEffect(() => {
        // sets the data to be rendered on pie chart in the format { name: string, value: number}
        setPieChartData(allPieChartData.slice(startIdx, endIdx))
    }, [allPieChartData, endIdx, setPieChartData, startIdx])

    const handlePageClick = (page: number) => {
        setCurrentPage(page)
    }

    // Creates an array of pagination numbers as list items, adds an active class to the current page and returns the list
    const renderPageNumbers = () => {
        const pageNumbers = []

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <li key={i} onClick={() => handlePageClick(i)}>
                    <p className={i === currentPage ? styles.activePageNum : styles.pageNum}>{i}</p>
                </li>
            )
        }

        return pageNumbers
    }

    return (
        <div className="w-full flex-col flex">
            <ul className="flex flex-wrap items-center gap-3 mb-10">
                <li className="flex items-center text-sm whitespace-nowrap gap-2">
                    <p>Order</p>
                    <select className={styles.select} value={order} onChange={(e) => setOrder(e.target.value)}>
                        {ORDER.map((order) => (
                            <option key={order} value={order}>
                                {order}
                            </option>
                        ))}
                    </select>
                </li>
                <li className="flex items-center text-sm whitespace-nowrap gap-2">
                    <p>Current decade</p>
                    <select className={styles.select} value={selectedDecade} onChange={(e) => setSelectedDecade(parseInt(e.target.value))}>
                        {DECADES.map((decade) => (
                            <option key={decade} value={decade}>
                                {decade}
                            </option>
                        ))}
                    </select>
                </li>
                <li className="flex items-center text-sm whitespace-nowrap gap-2">
                    <p>Business categories</p>
                    <select className={styles.select} value={selectedBusinessCategory} onChange={event => setSelectedBusinessCategory(event.target.value)}>
                        {businessCategories.map((item: string, index: number) => <option key={index}>{item}</option>)}
                    </select>
                </li>
                <li className="flex items-center text-sm whitespace-nowrap gap-2">
                    <p>Asset names</p>
                    <select className={styles.select} value={selectedAssetName} onChange={event => setSelectedAssetName(event.target.value)}>
                        {assetNames.map((item: string, index: number) => <option key={index}>{item}</option>)}
                    </select>
                </li>
                <li className="flex items-center text-sm whitespace-nowrap gap-2">
                    <p>Risk factors</p>
                    <select className={styles.select} value={selectedRiskFactor} onChange={event => setSelectedRiskFactor(event.target.value)}>
                        {RISK_FACTORS.map((item: string, index: number) => <option key={index}>{item}</option>)}
                    </select>
                    <input type='range' value={selectedRiskFactorIndex} onChange={event => setSelectedRiskFactorIndex(Number(event.target.value))} max={1} min={0} step={0.1} />
                    <b>{selectedRiskFactorIndex}</b>
                </li>
            </ul>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                    <div className="inline-block min-w-full">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-white border-b">
                                    <tr>
                                        <th className={styles.th}>Asset name</th>
                                        <th className={styles.th}>Business Category</th>
                                        <th className={styles.th}>Lat</th>
                                        <th className={styles.th}>Long</th>
                                        <th className={styles.th}>Risk rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.map((item, index: number) => <tr key={index}>
                                        <td className={styles.td}>{item["Asset Name"]}</td>
                                        <td className={styles.td}>{item["Business Category"]}</td>
                                        <td className={styles.td}>{item.Lat}</td>
                                        <td className={styles.td}>{item.Long}</td>
                                        <td className={styles.td}>{item["Risk Rating"]}</td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center py-3'>
                    <ul className="flex items-center gap-3 max-w-2xl overflow-x-scroll">
                        {renderPageNumbers()}
                    </ul>
                </div>
            </div>
        </div>
    )
}

const sharedPageNumStyles = 'cursor-pointer border px-2'

const styles = {
    td: 'text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap border-b',
    th: 'text-sm whitespace-nowrap font-bold text-gray-900 px-4 py-2 bg-gray-100 text-left',
    select: 'border p-1 px-2 max-w-[120px] outline-none',
    pageNum: `${sharedPageNumStyles}`,
    activePageNum: `${sharedPageNumStyles} font-bold text-blue-600`,
}

export default DataTable;