// Returns a marker icon URL based on the provided risk rating. The icon's color varies depending on the rating's value
export default function getMarkerIcon(riskRating: number) {
    let markerColor;

    if (Number(riskRating) < 0.25) {
        markerColor = 'green';
    } else if (Number(riskRating) < 0.5 && Number(riskRating) > 0.25) {
        markerColor = 'yellow';
    } else if (Number(riskRating) < 0.75 && Number(riskRating) > 0.5) {
        markerColor = 'orange';
    } else {
        markerColor = 'red';
    }

    return `http://maps.google.com/mapfiles/ms/icons/${markerColor}-dot.png`;
}