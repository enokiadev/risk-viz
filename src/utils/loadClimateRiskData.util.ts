import csvToJson from 'csvtojson';
import { ClimateRiskData } from '../interfaces';

export async function loadClimateRiskData(): Promise<ClimateRiskData[]> {
  const response = await fetch('/data/risk_viz_sample_data.csv');
  const csvData = await response.text();
  const jsonData = await csvToJson().fromString(csvData);

  return jsonData;
}
