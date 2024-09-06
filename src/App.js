import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import Accueil from './composants/Accueil';
import Page404 from './composants/Page404';
import Recherche from './composants/Recherche';
import Pays from './composants/Pays';
import RechercheRegion from './composants/RechercheRegion';
import Map from './composants/Map';
import Navbar from './composants/Navbar';
import Layout from './composants/Layout';
import Contact from './composants/Contact'
import { HistoriqueProvider } from './context/HistoriqueContext';
import Historique from './composants/Historique';
import { ThemeProvider } from './context/ThemeContext';
import RechercheLangue from './composants/RechercheLangue';
import { OngletPaysProvider } from './context/OngletPays'

const App = () => {

    return (
    <React.Fragment>
        <BrowserRouter>
            <ThemeProvider>
            <OngletPaysProvider>
            <Navbar/>
            <HistoriqueProvider>
            <Routes>
                <Route path="/" element={<Layout />} exact />
                <Route index element={<Accueil />} />
                <Route path="recherche" element={<Recherche />} />
                <Route path="region" element={<RechercheRegion />} />
                <Route path="pays/:codePays" element={<Pays />} />
                <Route path='langue' element={<RechercheLangue />}></Route>
                <Route path="map" element={<Map />} />
                <Route path="contact" element={<Contact />} />
                <Route path="historique" element={<Historique />}></Route>
                <Route path="*" element={<Page404 />} />
            </Routes>
            </HistoriqueProvider>
            </OngletPaysProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.Fragment>
    );
}

export default App;
