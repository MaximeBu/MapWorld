/* eslint-disable no-unused-expressions */
import React, { useRef, useEffect, useState } from 'react';
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl'
import { Button, Container, Input, Label } from 'semantic-ui-react';
import { useLocation, useNavigate } from 'react-router-dom';

mapboxgl.accessToken = 'pk.eyJ1IjoibWF4aW1lYnUiLCJhIjoiY2x3MG93MmxlMDMzZDJpcXVkbWlienFtZiJ9.VuRBshgcu-UcyapYjSEZcw';


const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const props = useLocation().state
    const [lng, setLng] = useState(props[1]);
    const [lat, setLat] = useState(props[0]);
    const [capital, setCapital] = useState(props[2])
    const [markerCapital, setMarkerCapital] = useState()
    const [markerPays, setMarkerPays] = useState()
    const navigate = useNavigate()
    const [error, setError] = useState('');

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: 3
        })

        // Create a default Marker and add it to the map.
        setMarkerPays(new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(map.current))

        capital[0] !== "" ? setMarkerCapital(new mapboxgl.Marker({ color: 'black', rotation: 45, })
        .setLngLat([capital[1], capital[0]])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<p>Capitale: ${capital[2]}</p>`))
        .addTo(map.current)) : undefined
    })

    // Fonction opérée lorsque les props changent. (Lorsqu'il y a une redirection de la page Pays)
    useEffect(()=>{
      setLat(props[0])
      setLng(props[1])
      setCapital(props[2])
      markerPoint()
    }, [props])

    // Vérification des champs lat et longitude
    useEffect(() => {
        setCapital([]) ||
        ((isNaN(parseFloat(lat)) && lat !== "")  || (isNaN(parseFloat(lng)) && lng !== ""))  ? setError('Les valeurs doivent être numériques'): setError('') ||
        (lat < -90 || lat > 90) || (lng < -180 || lng > 180) ? setError('La latitude doit être entre -90 et 90 et la longitude doit être entre -180 et 180'): setError('')
    }, [lat, lng])

    // Fonction qui change la position du marqueur sur la carte
    const markerPoint = () => {
        if (error === '') {
            map.current.easeTo({center: [lng, lat], zoom: 3, duration: 700});

            if (markerPays){
                markerPays.setLngLat([lng, lat])
            }

            if (markerCapital) {
                capital[0] ? markerCapital.setLngLat([capital[1], capital[0]]) : markerCapital.remove()
            }
        }
    }

    return (
        <Container>
            <div style={{margin: "2%", justifyContent: "space-between", display: "flex"}}>

                <Button secondary onClick={()=> navigate(-1)}>Retour</Button> {/* Bouton qui redirige à la page précédente */}

                <div> {/* Field pour modifier la latitude */}
                    <Label pointing="right">Latitude</Label>
                    <Input placeholder="Latitude" type="text" min={-90.00} max={90.00} value={lat} onChange={(e) => setLat(e.target.value)} onKeyPress={(key) => {key.code === 'Enter'? markerPoint():undefined}} />
                </div>

                <div> {/* Field pour modifier la longitude */}
                    <Label pointing="right">Longitude</Label>
                    <Input placeholder="Longitude" type="text" min={-180.00} max={180.00} value={lng} onChange={(e) => setLng(e.target.value)} onKeyPress={(key) => {key.code === 'Enter'? markerPoint():undefined}} />
                </div> 

                {/* Bouton qui confirme les changements et recentre le marqueur */}
                <Button onClick={markerPoint}>Valider les coordonées/Rencentrer</Button>
                
            </div>

            {/* Affichage du message d'erreur de validation des champs au besoin */}
            {error && <div className="ui negative message">{error}</div>}

            {/* Affichage de la map */}
            <div ref={mapContainer} className="map-container" />
        </Container>
    )
}

export default Map
