import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Container, Segment, Label, Button, Statistic, StatisticValue, StatisticLabel, Divider } from "semantic-ui-react";
import { useHistorique } from '../context/HistoriqueContext'
import { useTheme } from "../context/ThemeContext";

const Pays = () => {
    const alphaCode = useParams().codePays // Récupération du paramètre pour l'appel à l'API
    const [pays, setPays] = useState([])
    const navigate = useNavigate()
    const { theme } = useTheme()
    const { changeAndFilterHistorique } = useHistorique()

    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/alpha/${alphaCode}`)
        .then((response) => response.json())
        .then((data) => {setPays(data); changeAndFilterHistorique(data[0]) })
        .catch((error) => console.log(error))
    }, [alphaCode])

    return (
        pays[0] ?
        <Container>
            <h1>{pays[0].name.common}</h1>
            <Segment inverted={theme === "light"? false: true}>{pays[0].region} / {pays[0].subregion}</Segment> {/*Ajout de l'affichage de la région*/}
            <img alt="drapeau" src={pays[0].flags.png} style={{ width: 130, border: "1px solid grey"}} />

            <div>
            <Divider />
            <Statistic size='mini' inverted={theme === "light"? false: true} >
                <StatisticLabel>Population</StatisticLabel>
                <StatisticValue>{pays[0].population.toLocaleString("fr-FR")}</StatisticValue>
            </Statistic>
            <Divider />

            <Statistic size='mini' inverted={theme === "light"? false: true}>
                <StatisticLabel>Superficie</StatisticLabel>
                <StatisticValue>{pays[0].area.toLocaleString("fr-FR")} m2</StatisticValue>
            </Statistic>
            <Divider />

            <Statistic size='mini' inverted={theme === "light"? false: true}>
                <StatisticLabel>Latitude</StatisticLabel>
                <StatisticValue>{pays[0].latlng[0]}</StatisticValue>
            </Statistic>
            <Divider />

            <Statistic size='mini' inverted={theme === "light"? false: true}>
                <StatisticLabel>Longitude</StatisticLabel>
                <StatisticValue>{pays[0].latlng[1]}</StatisticValue>
            </Statistic>
            <Divider />
            </div>

            <div>
                {pays[0].borders ?
                    pays[0].borders.map((frontalier) => <Label basic color="black" key={frontalier}>
                    <NavLink to={`/pays/${frontalier}`}>{frontalier}</NavLink>
                    </Label>) : undefined
                }
            </div>
            <div style={{marginTop: "2%", height: "15%" , width: "20%"}}>
                <Label key={pays[0].name.common} color="blue">
                    <NavLink to={'/map'} state={{...[pays[0].latlng[0], pays[0].latlng[1], [pays[0].capitalInfo.latlng[0], pays[0].capitalInfo.latlng[1], pays[0].capital[0]]]}}>Afficher sur la map</NavLink>
                </Label>
            </div>
            <Button secondary style={{marginTop: "2%"}} onClick={()=> navigate(-1)}>Retour</Button>
        </Container>
        : null)
};

export default Pays;
