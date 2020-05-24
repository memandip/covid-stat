import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import geojson from './geo.json'
import { countryDetail } from '../../apiUrls'
import Loader from '../../Loader'

export default class Map extends Component {

    state = {
        marker: null,
        map: null,
        iso3: null,
        selectedCountry: null,
        data: null,
        loading: false,
        showModal: false,
        fetchedData: {}
    }

    componentDidMount() {
        let map = L.map('map').setView([39.74739, -105], 3),
            myIcon = L.icon({
                iconUrl: '/map-marker.png',
                iconSize: [38, 38],
                iconAnchor: [22, 42],
                popupAnchor: [0, 0]
            })
        // style = {
        //     stroke: true,
        //     fill: true,
        //     fillOpacity: 1
        // }

        map.panTo(new L.latLng(27.6711212, 85.3446311))
        L.geoJson(geojson, {
            clickable: true,
            onEachFeature: (feature, layer) => {

                layer.on('click', async e => {
                    let { admin, iso_a3 } = layer.feature.properties

                    map.fitBounds(layer.getBounds())

                    if (this.state.selectedCountry !== admin) {
                        this.setState({ selectedCountry: admin })
                        if (this.state.marker) {
                            map.removeLayer(this.state.marker)
                        }
                        let marker = L.marker(e.latlng, { icon: myIcon }).addTo(map)
                        marker.bindTooltip(admin).openTooltip()
                        this.setState({marker})
                    }

                    if (this.state.fetchedData && this.state.fetchedData[iso_a3]) {
                        this.setState({ data: this.state.fetchedData[iso_a3], showModal: true })
                        return
                    }

                    this.setState({ loading: true })
                    let data = await fetch(countryDetail.replace(/COUNTRY/, iso_a3)).then(res => res.json()),
                        { fetchedData } = this.state

                    if(data.error){
                        this.setState({loading: false})
                        alert(`No data available for ${admin}.`)
                        return
                    }    

                    fetchedData[iso_a3] = data

                    this.setState({
                        data,
                        fetchedData,
                        loading: false,
                        showModal: true,
                        iso3: iso_a3
                    })
                })
            }
        })
            // .bindPopup(layer => {
            //     this.setState({ iso3: layer.feature.properties.iso_a3, selectedCountry: layer.feature.properties.admin })
            //     return layer.feature.properties.admin
            // })
            .addTo(map)

        // map.on('click', e => {
        //     if (this.state.marker) {
        //         map.removeLayer(this.state.marker)
        //     }
        //     let marker = L.marker(e.latlng, { icon: myIcon }).addTo(map)
        //     this.setState({ marker })
        // })

        this.setState({ map })

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
        let data = this.state.data || {}
        const { confirmed, recovered, deaths } = data
        return (
            <>
                {this.state.loading && <Loader />}
                <div id="map"></div>
                {this.state.showModal && (
                    <Modal show={this.state.showModal} onHide={_ => this.setState({ showModal: false })}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.state.selectedCountry}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ul className="list-unstyled">
                                <li className="label label-warning">
                                    <strong>Total Confirmed: </strong>&nbsp;
                                    {confirmed.value}
                                </li>
                                <li className="label label-success">
                                    <strong>Total Recovered: </strong>&nbsp;
                                    {recovered.value}
                                </li>
                                <li className="label label-danger">
                                    <strong>Total Deaths: </strong>&nbsp;
                                    {deaths.value}
                                </li>
                            </ul>
                        </Modal.Body>
                    </Modal>
                )}
            </>
        )
    }
}