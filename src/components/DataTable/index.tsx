'use client'

import { MAX_PAGE_CONTENT_NUMBER, RISK_FACTORS } from "@/constants"
import { ClimateRiskData } from "@/interfaces"
import { useStore } from "@/store"
import { FC, useEffect, useState } from "react"

const DataTable: FC = () => {
    const filteredDataByYear = useStore(state => state.filteredDataByYear)

    const [data, setData] = useState<ClimateRiskData[]>(filteredDataByYear)
    const [businessCategories, setBusinessCategories] = useState<string[]>([])
    const [assetNames, setAssetNames] = useState<string[]>([])
    const [selectedBusinessCategory, setSelectedBusinessCategory] = useState('All')
    const [selectedAssetName, setSelectedAssetName] = useState('All')
    const [selectedRiskFactorIndex, setSelectedRiskFactorIndex] = useState(0)
    const [selectedRiskFactor, setSelectedRiskFactor] = useState('All')
    const [currentPage, setCurrentPage] = useState(1)

    const filteredDataSet = data.filter((obj) =>
        selectedBusinessCategory === "All" ||
        obj["Business Category"] === selectedBusinessCategory
    )

    const startIndex = (currentPage - 1) * MAX_PAGE_CONTENT_NUMBER
    const endIndex = startIndex + MAX_PAGE_CONTENT_NUMBER
    const maxPage = Math.ceil(filteredDataSet.length / MAX_PAGE_CONTENT_NUMBER)

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

            if (selectedBusinessCategory !== 'All')
                filteredData = filteredData.filter(obj => obj["Business Category"] === selectedBusinessCategory)

            if (selectedRiskFactor) filteredData = filteredData.filter(obj => {
                let filteredDataset_ = JSON.parse(obj["Risk Factors"])
                if (selectedRiskFactor === 'All') return filteredDataset_
                return filteredDataset_[selectedRiskFactor] === selectedRiskFactorIndex
            })

            if (selectedAssetName !== 'All')
                filteredData = filteredData.filter(obj => obj["Asset Name"] === selectedAssetName)

            setData(filteredData.slice(startIndex, endIndex))
        } catch (error) {
            console.error(error)
        }
    }, [endIndex, filteredDataByYear, selectedAssetName, selectedBusinessCategory, selectedRiskFactor, selectedRiskFactorIndex, startIndex])

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div className="shadow-xl max-w-[800px] rounded-xl">
            <ul>
                <li>
                    <b>Business categories</b>
                    <select className={styles.select} value={selectedBusinessCategory} onChange={event => setSelectedBusinessCategory(event.target.value)}>
                        {businessCategories.map((item: string, index: number) => <option key={index}>{item}</option>)}
                    </select>
                </li>
                <li>
                    <b>Asset names</b>
                    <select className={styles.select} value={selectedAssetName} onChange={event => setSelectedAssetName(event.target.value)}>
                        {assetNames.map((item: string, index: number) => <option key={index}>{item}</option>)}
                    </select>
                </li>
                <li>
                    <b>Risk factors</b>
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
                                    {data.map((item, index: number) => <tr key={index}>
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
                <ul>
                    {Array.from({ length: maxPage }).map((_, index) => (
                        <li key={index}>
                            <button onClick={() => handlePageClick(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

const styles = {
    td: 'text-sm text-gray-900 font-light px-4 py-2 whitespace-nowrap',
    th: 'text-sm whitespace-nowrap font-medium text-gray-900 px-4 py-2 text-left',
    select:'border p-1 px-2 max-w-[120px]'
}

export default DataTable
