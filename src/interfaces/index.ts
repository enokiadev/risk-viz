export interface ClimateRiskData {
    'Asset Name': string;
    'Lat': string;
    'Long': string;
    'Business Category': string;
    'Risk Rating': number;
    'Risk Factors': string;
    'Year': number;
}

export interface RiskFactors {
    'Hurricane': number
    'Extreme heat': number
    'Tornado': number
    'Wildfire': number
    'Flooding': number
}

export interface State extends Action {
    selectedDecade: number
    selectedAsset: ClimateRiskData
    filteredDataByYear: ClimateRiskData[]
    climateRiskData: ClimateRiskData[]
    pieChartData: IRiskPieChartData[]
}

export interface CustomLabel {
    cx: number,
    cy: number
    midAngle: number
    innerRadius: number
    outerRadius: number
    percent: number
    index: number
    name: string
}

export interface IRiskPieChart {
    data: IRiskPieChartData[]
}

export interface IRiskPieChartData {
    name: string;
    value: number;
}

export const initialData: ClimateRiskData = {
    'Asset Name': '',
    'Lat': '',
    'Long': '',
    'Business Category': '',
    'Risk Rating': 0,
    'Risk Factors': '',
    'Year': 0,
}

export const initialPieChartData: IRiskPieChartData = {
    name: '',
    value: 0
}

export interface Action {
    setSelectedDecade: (selectedDecade: State['selectedDecade']) => void
    setSelectedAsset: (selectedAsset: State['selectedAsset']) => void
    setFilteredDataByYear: (filteredDataByYear: State['filteredDataByYear']) => void
    setClimateRiskData: (climateRiskData: State['climateRiskData']) => void
    setPieChartData: (climateRiskData: State['pieChartData']) => void
}