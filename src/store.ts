import { create } from "zustand"
import { State, initialData } from "./interfaces"
import { DECADES } from "./constants"

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
