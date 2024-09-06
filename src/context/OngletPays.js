import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const OngletPaysContext = createContext();

export const useOngletPays = () => useContext(OngletPaysContext);

export const OngletPaysProvider = ({ children }) => {
  const [ongletPays, setOngletPays] = useState("none");
  const location = useLocation().pathname

  useEffect(() => {
  !/[/]pays[/].*/.test(location) ? setOngletPays("none") : setOngletPays("block")
  }, [location])

  return (
    <OngletPaysContext.Provider value={{ ongletPays }}>
      {children}
    </OngletPaysContext.Provider>
  );
};
