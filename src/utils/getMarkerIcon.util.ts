export default function getMarkerIcon(riskRating: number) {
    let markerColor;

    if (riskRating < 0.25) {
        markerColor = 'green';
    } else if (riskRating < 0.5) {
        markerColor = 'yellow';
    } else if (riskRating < 0.75) {
        markerColor = 'orange';
    } else {
        markerColor = 'red';
    }

    return `http://maps.google.com/mapfiles/ms/icons/${markerColor}-dot.png`;
}