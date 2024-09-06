import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, ButtonContent, Icon, Menu, MenuItem, Segment, Sidebar } from 'semantic-ui-react';
import { useTheme } from '../context/ThemeContext';
import { useOngletPays } from '../context/OngletPays'

const  Navbar = () => {

    const [lat, setLat] = useState('')
    const [lng, setLng] = useState('')
    const [visible, setVisible] = useState(false)
    const { ongletPays } = useOngletPays()
    const { theme, toggleTheme } = useTheme();

    useMemo(() => {
        const success = (position) => {
            setLat(position.coords.latitude)
            setLng(position.coords.longitude)
        }
    
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success);
        }
    }, [])


  return (
    <nav>
        <Segment inverted style={{width: "100%", borderBottom: "solid", display: "flex"}}>
            <Button animated='vertical' size='huge' circular style={{margin: "1%"}} onClick={() => setVisible(true)}>
                <ButtonContent hidden>Menu</ButtonContent>
                <ButtonContent visible>
                <Icon name='sidebar' />
                </ButtonContent>
            </Button>
            <Link to={"/"} style={{margin: "auto", marginRight: "45%", color: "white"}}><h1>RestCountries</h1></Link>
        </Segment>

        <Sidebar
            as={Menu}
            animation='scale down'
            icon='labeled'
            inverted
            vertical
            stackable
            visible = {visible}
            width='thin'
        >

            <MenuItem>
                <Button inverted animated onClick={() => setVisible(false)} size='big'>
                    <ButtonContent visible>Fermer</ButtonContent>
                    <ButtonContent hidden>
                        <Icon name='arrow left' />
                    </ButtonContent>
                </Button>  
            </MenuItem>

            <MenuItem as={NavLink} to='/' activeclassname="lien-actif" end="true" >
                <Icon name='home' />
                    Accueil
            </MenuItem>

            <MenuItem as={NavLink} to='/recherche' activeclassname="lien-actif" >
                <Icon name='search' />
                Recherche
            </MenuItem>

            <MenuItem as={NavLink} to='/region' activeclassname="lien-actif" >
                <Icon name='search' />
                Rechercher par région
            </MenuItem>

            <MenuItem as={NavLink} to='/langue' activeclassname="lien-actif" >
                <Icon name='search' />
                Rechercher par la Langue
            </MenuItem>

            <MenuItem as={NavLink} to='/map' state={{...[lat, lng, [""]]}} activeclassname="lien-actif" >
                <Icon name='map' />
                Map
            </MenuItem>

            <MenuItem as={NavLink} to='/pays' activeclassname="lien-actif" style={{display: `${ongletPays}`}} >
                <Icon name='info circle' />
                Pays
            </MenuItem>

            <MenuItem as={NavLink} to='/historique' activeclassname="lien-actif">
                <Icon name='history' />
                Historique 
            </MenuItem>

            <MenuItem as={NavLink} to='/contact' activeclassname="lien-actif" >
                <Icon name='mail' />
                Contact
            </MenuItem>

            <MenuItem>
                <Button inverted onClick={toggleTheme}>
                    Switch to {theme === 'light' ? 'dark' : 'light'} theme
                </Button>
            </MenuItem>

        </Sidebar>

    </nav>

  );
}

export default Navbar;
