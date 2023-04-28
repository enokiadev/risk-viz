export interface ClimateRiskData {
    'Asset Name': string;
    Lat: string;
    Long: string;
    'Business Category': string;
    'Risk Rating': number;
    'Risk Factors': string;
    Year: number;
}

export interface RiskFactors {
    Hurricane: number
    'Extreme heat': number
    Tornado: number
    Wildfire: number
    Flooding: number
}

export interface DatasetComponent {
    initialData: ClimateRiskData[]
    decade?: number
}

export interface State extends Action  {
    selectedDecade: number
    selectedAsset: ClimateRiskData
    filteredDataByYear: ClimateRiskData[]
}

export type Action = {
    setSelectedDecade: (selectedDecade: State['selectedDecade']) => void
    setSelectedAsset: (selectedAsset: State['selectedAsset']) => void
    setFilteredDataByYear: (selectedAsset: State['filteredDataByYear']) => void
}