/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { Container, Label, Card, Image, CardHeader, Select } from "semantic-ui-react";

const RechercheRegion = () => {
    const [region, setRegion] = useState("q") // Valeur de la région sélectionné
    const [ordre, setOrdre] = useState("asc") // Valeur du tri sélectionné
    const [pays, setPays] = useState([]) // Liste des pays renvoyé par l'API

    // Fonction qui set les pays à chaque fois que la variable région change
    useEffect( () => {
        region !== "q"?
            onRegionChange() // Affichage des pays selon la région
        :
            fetchAllCountry() // Affichage de tous les pays
    }, [region])

    // Appel des pays correspondant à la région dans l'API
    const onRegionChange = () => {
        fetch(`https://restcountries.com/v3.1/region/${region}?fields=name,cca3,flags`)
        .then((response) => response.json())
        .then((data) => setPays(data))
        .catch((erreur) => console.log(erreur))
    }

    // Appel de tous les pays de l'API
    const fetchAllCountry = () => {
        fetch(`https://restcountries.com/v3.1/all`)
        .then((response) => response.json())
        .then((data) => setPays(data))
        .catch((erreur) => console.log(erreur))
    }

    // Affichage des pays sur la page
    const renderPays = (sortedPays) => {
        return sortedPays.map((unPays) => {
            return (
                <Card key={unPays.cca3}>
                    <Image src={unPays.flags.png} />
                    <Card.Content>
                        <CardHeader>
                            <NavLink to={`/pays/${unPays.cca3}`} state={unPays.cca3}>{unPays.name.common}</NavLink>
                        </CardHeader>
                    </Card.Content>
                </Card>
            )
        })
    }

    // Fonction qui sort() l'affichage des pays en ordre croissant par leur nom
    const sortPaysAsc = () => {
        const paysSort = pays.sort( (pays1, pays2) => {
            if (pays1.name.common < pays2.name.common) {
              return -1;
            } else if (pays1.name.common > pays2.name.common) {
              return 1;
            }
            return 0;
          })
          
        return renderPays(paysSort)
    }

    // Fonction qui sort() l'affichage des pays en ordre décroissant par leur nom
    const sortPaysDsc = () => {
        const paysFilter = pays.sort( (pays1, pays2) => {
            if (pays1.name.common > pays2.name.common) {
              return -1;
            } else if (pays1.name.common < pays2.name.common) {
              return 1;
            }
            return 0;
          })
          
        return renderPays(paysFilter)
    }

    // Choix de tri possibles appliqués sur l'affichage des pays
    const optionsFiltre = [
        {key: "asc", value: "asc", text: "A - Z" },
        {key: "dsc", value: "dsc", text: "Z - A"},
    ]

    // Choix de régions possibles appliqués sur l'affichage des pays
    const optionsRegion = [
        {key: "q", value: "q", text: "Selectionner une région"},
        {key: "eu", value: "Europe", text: "Europe"},
        {key: "as", value: "Asia", text: "Asie"},
        {key: "am", value: "Americas", text: "Amériques"},
        {key: "oc", value: "Oceania", text: "Océanie"},
        {key: "af", value: "Africa", text: "Afrique"}
    ]

    // Retour des éléments à afficher sur la page
    return (
        <Container>
            <h1>Rechercher</h1>
            <Label pointing="right">Région</Label>
            <Select defaultValue="q" options={optionsRegion} onChange={(e, data) => setRegion(data.value)}/>
            <Label pointing="right">Tri</Label>
            <Select defaultValue="asc" options={optionsFiltre} onChange={(e, data) => setOrdre(data.value)} />
            <h2>Résultats de la recherche</h2>
            {pays.length > 0 ? `Il y a ${pays.length} résultat(s)` : undefined}
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", width: "100%"}}>
                {pays.length > 0 && ordre === "asc" ? sortPaysAsc() : sortPaysDsc()}
            </div>
        </Container>)

};

export default RechercheRegion;
