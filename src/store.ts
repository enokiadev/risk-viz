import { create } from "zustand"
import { ClimateRiskData, State } from "./interfaces"
import { DECADES } from "./constants"

export const initialData: ClimateRiskData = {
    'Asset Name': '',
    'Lat': '',
    'Long': '',
    'Business Category': '',
    'Risk Rating': 0,
    'Risk Factors': '',
    'Year': 0,
}

export const useStore = create<State>((set) => ({
    selectedDecade: DECADES[0],
    selectedAsset: initialData,
    filteredDataByYear: [initialData],
    climateRiskData: [initialData],
    setSelectedDecade: (selectedDecade) => set(() => ({ selectedDecade: selectedDecade })),
    setSelectedAsset: (selectedAsset) => set(() => ({ selectedAsset: selectedAsset })),
    setFilteredDataByYear: (filteredDataByYear) => set(() => ({ filteredDataByYear: filteredDataByYear })),
    setClimateRiskData: (climateRiskData) => set(() => ({ climateRiskData: climateRiskData }))
})) 
