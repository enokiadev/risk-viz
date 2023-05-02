'use client'

import { LoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api"
import { State, initialData } from "../../interfaces"
import getMarkerIcon from "../../utils/getMarkerIcon.util"
import { useStore } from "@/store"
import { DEFAULT_CENTER, MAP_STYLES } from "@/constants"

export default function RiskMap() {
    const filteredDataByYear = useStore((state: State) => state.filteredDataByYear)
    const setSelectedAsset = useStore((state: State) => state.setSelectedAsset)
    const selectedAsset = useStore((state: State) => state.selectedAsset)

    return (
        <div className="flex flex-[1] h-screen">
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ''}>
                <GoogleMap mapContainerStyle={MAP_STYLES} zoom={2} center={DEFAULT_CENTER} options={{ gestureHandling: "greedy" }}>
                    {filteredDataByYear.map((dataPoint, index) => (
                        <Marker
                            key={index}
                            position={{ lat: parseFloat(dataPoint.Lat), lng: parseFloat(dataPoint.Long) }}
                            icon={{ url: getMarkerIcon(dataPoint['Risk Rating']) }}
                            onClick={() => setSelectedAsset(dataPoint)}
                        />
                    ))}
                    {selectedAsset && <InfoWindow position={{ lat: parseFloat(selectedAsset.Lat), lng: parseFloat(selectedAsset.Long) }} onCloseClick={() => setSelectedAsset(initialData)}>
                        <>
                            <h2>{selectedAsset['Asset Name']}</h2>
                            <p>{selectedAsset['Business Category']}</p>
                        </>
                    </InfoWindow>}
                </GoogleMap>
            </LoadScript>
        </div>
    )
}