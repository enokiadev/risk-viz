'use client'

import { LoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api"
import { State } from "../../interfaces"
import getMarkerIcon from "../../utils/getMarkerIcon.util"
import { initialData, useStore } from "@/store"
import { DECADES, DEFAULT_CENTER, MAP_STYLES } from "@/constants"

export default function RiskMap() { 
    const selectedDecade = useStore((state: State) => state.selectedDecade)
    const selectedAsset = useStore((state: State) => state.selectedAsset)
    const filteredDataByYear = useStore((state: State) => state.filteredDataByYear) 
    const setSelectedDecade = useStore((state: State) => state.setSelectedDecade)
    const setSelectedAsset = useStore((state: State) => state.setSelectedAsset)

    return (
        <div>
            <select value={selectedDecade} onChange={(e) => setSelectedDecade(parseInt(e.target.value))}>
                {DECADES.map((decade) => (
                    <option key={decade} value={decade}>
                        {decade}
                    </option>
                ))}
            </select>

            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
                <GoogleMap mapContainerStyle={MAP_STYLES} zoom={2} center={DEFAULT_CENTER} options={{ gestureHandling: "greedy" }}>
                    {filteredDataByYear.map((dataPoint, index) => (
                        <Marker
                            key={index}
                            position={{ lat: parseFloat(dataPoint.Lat), lng: parseFloat(dataPoint.Long) }}
                            icon={{
                                url: getMarkerIcon(dataPoint['Risk Rating']),
                            }}
                            onClick={() => setSelectedAsset(dataPoint)}
                        />
                    ))}
                    {selectedAsset && (
                        <InfoWindow position={{ lat: parseFloat(selectedAsset.Lat), lng: parseFloat(selectedAsset.Long) }} onCloseClick={() => setSelectedAsset(initialData)}>
                            <>
                                <h2>{selectedAsset['Asset Name']}</h2>
                                <p>{selectedAsset['Business Category']}</p>
                            </>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
    )
}