import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import geojson from './geo.json'

export default class Map extends Component {

    componentDidMount() {
        let map = L.map('map').setView([39.74739, -105], 4),
            style = {
                stroke: true,
                fill: true,
                fillOpacity: 1
            }

        map.panTo(new L.latLng(27.6711212, 85.3446311))
        L.geoJson(geojson, { clickable: true }).addTo(map)

        // markers = L.markerClusterGroup()

        // markers.addLayer(L.marker(27.6711212, 85.3446311))
        // L.marker([27.6711212, 85.3446311]).addTo(map)
        // map.addLayer(markers)
        // L.marker([27.6711212, 85.3446311], { title: "My marker" }).addTo(map)

        // L.marker([51.5, -0.09]).addTo(map);

        // L.circle([51.508, -0.11], {
        //     color: 'red',
        //     fillColor: '#f03',
        //     fillOpacity: 0.5,
        //     radius: 500
        // }).addTo(map)

        // L.polygon([
        //     [51.509, -0.08],
        //     [51.503, -0.06],
        //     [51.51, -0.047]
        // ]).addTo(map)

        // let tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //     maxZoom: 18,
        //     attribution: '&copy; <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
        // }),
        //     latlng = L.latLng(27.6711212, 85.3446311),
        //     map = L.map('map', { center: latlng, zoom: 2, layers: [tiles] })

        // L.marker([27.6711212, 85.3446311], {title: 'My Marker'}).addTo(map)

        // map.on('click', function(e){
        //     console.log('e', e)
        // })
    }

    render() {
        return (
            <div id="map"></div>
        )
    }
}