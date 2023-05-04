import csvToJson from 'csvtojson';
import { ClimateRiskData } from '../interfaces';

// Imports CSV-to-JSON package, defines ClimateRiskData interface, and exports function to fetch CSV data, convert it to JSON, and return the data as a Promise
export async function loadClimateRiskData(): Promise<ClimateRiskData[]> {
  const response = await fetch('/data/risk_viz_sample_data.csv');
  const csvData = await response.text();
  const jsonData = await csvToJson().fromString(csvData);

  return jsonData;
}
