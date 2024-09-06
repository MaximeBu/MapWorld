/* eslint-disable no-unused-expressions */
import React, { createContext, useState, useContext } from 'react';

const HistoriqueContext = createContext();

export const useHistorique = () => useContext(HistoriqueContext);

export const HistoriqueProvider = ({ children }) => {
    const [historiqueData, setHistoriqueData] = useState([]);

    const changeAndFilterHistorique = (pays) => {
      const paysObject = {name: pays.name.common, cca3: pays.cca3, lat: pays.latlng[0], lng: pays.latlng[1], capitale: [pays.capitalInfo.latlng[0], pays.capitalInfo.latlng[1], pays.capital[0]]}
      !historiqueData.some(elem => JSON.stringify(elem) === JSON.stringify(paysObject)) ?
        setHistoriqueData((prevHistoriqueData) => [...prevHistoriqueData, paysObject ])
      : undefined
    };
    
  return (
    <HistoriqueContext.Provider value={{ historiqueData, changeAndFilterHistorique }}>
      {children}
    </HistoriqueContext.Provider>
  );
};
