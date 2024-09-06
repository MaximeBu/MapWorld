import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Divider, Grid, GridColumn, Icon, Label, Message, Select, Statistic, StatisticLabel, StatisticValue } from 'semantic-ui-react';
import { useTheme } from '../context/ThemeContext';
import { useHistorique } from '../context/HistoriqueContext';

const  RechercheLangue = () => {
  const [langue, setLangue] = useState("") // Variable qui représente la langue choisit
  const [listePays, setListePays] = useState([{key: "none", value:"", text: "Sélectionner un pays"}]) // Variable qui représente la liste de choix des pays selon la langue choisit
  const [pays, setPays] = useState("") // Variable qui représente le pays choisit
  const [listepaysVoisin, setListePaysVoisin] = useState([{key: "none", value:"", text: "Sélectionner un pays voisin"}]) // Variable qui représente la liste de choix des pays voisins selon le pays choisit
  const [paysVoisin, setPaysVoisin] = useState("") // Variable qui représente le pays voisin choisit
  const [informationsPays, setInformationsPays] = useState([]) // Variable qui représente les informations du pays display
  const { theme } = useTheme()
  const { changeAndFilterHistorique } = useHistorique()

  // Options des langues disponibles au choix
  const optionsLangue = [
    {key: "none", value: "", text: "Sélectionner une langue"},
    {key: "fr", value: "french", text: "Français"},
    {key: "an", value: "english", text: "Anglais"}
  ]

  // Fonction qui crée la liste des options de pays disponibles selon la langue
  useEffect(() => {
    setListePays([{key: "none", value:"", text: "Sélectionner un pays"}]) // Remise à zero de la liste des pays à zero
    setPays("") // Remise à zero du pays
    setPaysVoisin("") // Remise à zero du pays voisin
    setInformationsPays([]) // Remise à zero des informations du pays display
    if (langue !== "") {
      fetch(`https://restcountries.com/v3.1/lang/${langue}`)
      .then((response) => response.json())
      .then((data) =>  data.forEach(element => {
        setListePays((prevlistePays) => [...prevlistePays, {key: element.name.common, value: element.cca3, text: element.name.common}])
      }))
      .catch((erreur) => console.log(erreur))
    }
  }, [langue])

  // Fonction qui crée la liste des options de pays voisins disponibles selon le pays
  useEffect(() => {
    setPaysVoisin("") // Remise à zero du pays voisin
    setInformationsPays([]) // Remise à zero des informations du pays display
    if (pays !== "") {
      setInformationsPays([])
      setListePaysVoisin([{key: "none", value:"", text: "Sélectionner un pays voisin"}])
      fetch(`https://restcountries.com/v3.1/alpha?codes=${pays}`)
      .then((response) => response.json())
      .then((data) =>  data[0].borders ? data[0].borders.forEach(element => {
        fetch(`https://restcountries.com/v3.1/alpha?codes=${element}`)
        .then((response) => response.json())
        .then((data) => setListePaysVoisin((prevlistePaysVoisin) => [...prevlistePaysVoisin, {key: data[0].cca3, value: data[0].cca3, text: data[0].name.common}]))
        .catch((erreur) => console.log(erreur))
      }): setInformationsPays([data[0]]) || changeAndFilterHistorique(data[0])) // Affichage du pays sélectionné s'il n'a pas de voisin
      .catch((erreur) => console.log(erreur))
    }
  }, [pays])

  // Fonction qui recherche les informations à dislay du pays voisin
  useEffect(() => {
    setInformationsPays([]) // Remise à zero des informations du pays display
    if (paysVoisin !== "") {
      fetch(`https://restcountries.com/v3.1/alpha?codes=${paysVoisin}`)
        .then((response) => response.json())
        .then((data) => {setInformationsPays([data[0]]); changeAndFilterHistorique(data[0])})
        .catch((erreur) => console.log(erreur))
    }
  }, [paysVoisin])

  // Affichage des éléments dans la page
  return (
    <div>
      <Grid columns={2} style={{width: "60%", margin: "2% auto"}}>
        <GridColumn>
        <div>
          <Label>Langue: </Label>
          <Select
          style={{width: "100%"}}
          options={optionsLangue}
          value={langue}
          onChange={(e, data) => setLangue(data.value)}
          placeholder='Sélectionner une langue'
          />
        </div>

        {/*Affichage conditionnelle du select Pays*/}
        { langue !== "" ?
        <div style={{marginTop: "10%"}}>
          <Label>Pays: </Label>
          <Select 
          style={{width: "100%"}}
          options={listePays}
          value={pays}
          onChange={(e, data) => setPays(data.value)}
          placeholder='Sélectionner un pays'
        />
        </div> : undefined }

        {/*Affichage conditionnelle du select Pays Voisin*/}
        { pays !== "" && langue !== "" ?
        <div style={{marginTop: "10%"}}>
          <Label>Pays voisin: </Label>
          <Select
          style={{width: "100%"}}
          options={listepaysVoisin}
          value={paysVoisin}
          onChange={(e, data) => setPaysVoisin(data.value)}
          placeholder='Sélectionner un pays voisin'
          />
          {/*Affichage conditionnelle d'un message avertissant qu'il n'y a pas de pays voisin*/}
          <Message warning attached='bottom' hidden={listepaysVoisin.length === 1 ? false : true}>
            <Icon name='warning' />
            Aucun pays voisin
          </Message>
        </div> : undefined }
        { informationsPays[0] ?
            <div style={{width: "100%", margin: "2% 25%"}}>
              <Label color="blue">
                    <NavLink to={'/map'} state={{...[informationsPays[0].latlng[0], informationsPays[0].latlng[1], [informationsPays[0].capitalInfo.latlng[0], informationsPays[0].capitalInfo.latlng[1]]]}}>Afficher sur la map</NavLink>
              </Label>
            </div>
        : undefined
        }
      </GridColumn>

      <GridColumn verticalAlign='middle'>
        {/*Affichage conditionnelle des informations du pays final*/}
        { informationsPays[0] ?
        <div>
          <h1>{informationsPays[0].name.common}</h1>
              <img alt="drapeau" src={informationsPays[0].flags.png} style={{ width: 130, border: "1px solid grey"}} />
              <div>
                <Divider />
                <Statistic size='mini' inverted={theme === "light"? false: true}>
                  <StatisticLabel>Population</StatisticLabel>
                  <StatisticValue>{informationsPays[0].population.toLocaleString("fr-FR")}</StatisticValue>
                </Statistic>

                <Divider />
                <Statistic size='mini' inverted={theme === "light"? false: true}>
                  <StatisticLabel>Superficie</StatisticLabel>
                  <StatisticValue>{informationsPays[0].area.toLocaleString("fr-FR")} m2</StatisticValue>
                </Statistic>

                <Divider />
                <Statistic size='mini' inverted={theme === "light"? false: true}>
                  <StatisticLabel>Latitude</StatisticLabel>
                  <StatisticValue>{informationsPays[0].latlng[0]}</StatisticValue>
                </Statistic>

                <Divider />
                <Statistic size='mini' inverted={theme === "light"? false: true}>
                  <StatisticLabel>Longitude</StatisticLabel>
                  <StatisticValue>{informationsPays[0].latlng[1]}</StatisticValue>
                </Statistic>

                <Divider />
            </div>
        </div> : undefined 
        }
      </GridColumn>
    </Grid>
    </div>
  );
}

export default RechercheLangue;
