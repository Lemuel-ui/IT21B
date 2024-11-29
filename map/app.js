class TemperatureConverter {
    static convert(temperature, unit = 'C') {
        if (unit === 'F') {
            return (temperature * 9 / 5) + 32; 
        }
        return temperature; // Default to Celsius
    }
}

// Class for Marker
class Marker {
    constructor(lat, lng, message, temperature, unit) {
        this.lat = lat;
        this.lng = lng;
        this.message = message;
        this.temperature = temperature;
        this.unit = unit;
    }

    // Create the marker and bind the popup
    addToMap(map) {
        const tempInPreferredUnit = TemperatureConverter.convert(this.temperature, this.unit);
        const popupMessage = `${this.message}<br>Temperature: ${tempInPreferredUnit}°${this.unit}`;
        
        const marker = L.marker([this.lat, this.lng]).addTo(map);
        marker.bindPopup(popupMessage);
    }
}

// Class to Manage a Collection of Markers
class MarkerManager {
    constructor(map) {
        this.map = map;
        this.markers = [];
    }

    // Add a marker to the map and store it in the markers array
    addMarker(lat, lng, message, temperature, unit = 'C') {
        const marker = new Marker(lat, lng, message, temperature, unit);
        marker.addToMap(this.map);
        this.markers.push(marker);
    }

    // Load markers from a JSON source
    loadMarkersFromJson(url, unit = 'C') {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach(markerData => {
                    this.addMarker(
                        markerData.latitude, 
                        markerData.longitude, 
                        markerData.message, 
                        markerData.temperature, 
                        unit
                    );
                });
            })
            .catch(error => console.error('Error loading markers:', error));
    }
}

// Class for the Leaflet Map
class LeafletMap {
    constructor(containerId, center, zoom) {
        this.map = L.map(containerId).setView(center, zoom);
        this.initTileLayer();
        this.markerManager = new MarkerManager(this.map); // Using the MarkerManager to handle markers
    }

    initTileLayer() {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> IT Students'
        }).addTo(this.map);
    }

    // Method to load markers from a JSON file
    loadMarkersFromJson(url, unit = 'C') {
        this.markerManager.loadMarkersFromJson(url, unit);
    }
}

// Usage
const myMap = new LeafletMap('map', [8.2459, 124.9885], 13);
myMap.loadMarkersFromJson('app.json', 'F');  // Load markers with temperature in Fahrenheit