import { Button, Container, ButtonGroup, ButtonOr, ListItem, List, Icon, ListHeader, ListContent, ListDescription, Pagination,  } from "semantic-ui-react";
import { useHistorique } from '../context/HistoriqueContext'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const Historique = () => {
    const { historiqueData } = useHistorique()
    const { theme } = useTheme()
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4

    // Pagination
    const totalPages = Math.ceil(historiqueData.length / itemsPerPage);
    const currentHistory =  historiqueData.length > 0? historiqueData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ) : undefined

    // Affichage des éléments de l'historique dans la page
    const renderHistorique = () => {
        return currentHistory.map((unPays) => {
            return (
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop:"3%"}}>
                    <List inverted={theme === "light"? false: true}>
                        <ListItem>
                            <Icon name="marker" />
                            <ListContent>
                                <ListHeader> {unPays.name}</ListHeader>
                                <ListDescription>
                                <ListItem as="ol" value="-" >
                                        {`Capitale: ${unPays.capitale[2]}`}
                                    </ListItem >
                                    <ListItem as="ol" value="-">
                                        {`CCA3: ${unPays.cca3}`}
                                    </ListItem>
                                    <ListItem as="ol" value="-">
                                        {`Latitude: ${unPays.lat}`}
                                    </ListItem>
                                    <ListItem as="ol" value="-">
                                        {`Longitude: ${unPays.lng}`}
                                    </ListItem >
                                </ListDescription>
                            </ListContent>
                        </ListItem>
                    </List>
                    <div>
                        <ButtonGroup>
                            <Button onClick={() => navigate(`/pays/${unPays.cca3}`)}>Pays</Button>
                            <ButtonOr text='ou' />
                            <Button onClick={ () => navigate('/map', {state:{...[unPays.lat, unPays.lng,[unPays.capitale[0], unPays.capitale[1], unPays.capitale[2]]]}})}>Map</Button>
                        </ButtonGroup>
                    </div>
                </div>
                
            )
        })
    }

    return (
        <Container>
            <h1>Historique</h1>
            <div>
            {historiqueData.length > 0 ?
                <Pagination
                boundaryRange={0}
                activePage={currentPage}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={totalPages}
                onPageChange={(event, data) => setCurrentPage(data.activePage)}
            /> : undefined }
            </div>
            <div>
            {historiqueData.length > 0 ?
                renderHistorique()
            : 'Aucun historique'}
            </div>
        </Container>)


};

export default Historique;
