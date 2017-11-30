import React from 'react';
import { render } from "react-dom";
import { Ajax } from 'pan.js';
import Menu from './menu';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            lng: 0,
            lat: 0,
            ready: false
        };
    }

    componentDidMount() {
        const ajax = new Ajax();

        ajax.getJson('http://unreal.io/api/track').then(
            (value) => {
                const lat = value.payload.data[0].latitude;
                const long = value.payload.data[0].longitude;

                this.setState({
                    lat: lat,
                    lng: long,
                    ready: true
                });

                this.initMap();
            }
        );
    }

    componentWillUnmount() {

    }

    initMap() {
        if (this.state.ready) {
            let map = new google.maps.Map(document.getElementById('map'), {
                zoom: 17,
                center: new google.maps.LatLng(this.state.lat, this.state.lng),
                mapTypeId: 'roadmap',
                disableDefaultUI: false
            });

            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(this.state.lat, this.state.lng),
                map: map,
                title: 'Eagle Eye'
            });

            marker.set

            // Create a <script> tag and set the USGS URL as the source.
            let script = document.createElement('script');
            // This example uses a local copy of the GeoJSON stored at
            // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
            script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    }

    render() {
        const lat = this.state.lat;
        const lng = this.state.lng;
        const loaded = this.state.ready;
        return (
            <div>
                {loaded &&
                    <Menu lat={lat} lng={lng}></Menu>
                }
                <div id="map">
                </div>
            </div>
        )
    }
}

window.eqfeed_callback = function (results) {

}

render(<App />, document.getElementById("root"));