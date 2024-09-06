import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Container, Input, Label, Card, Image, CardHeader, Pagination } from "semantic-ui-react";

const Recherche = () => {

    const [nom, setNom] = useState("")
    const [pays, setPays] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15
    const totalPages = Math.ceil(pays.length / itemsPerPage);
  
    const currentPays =  pays.length > 0? pays.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ) : undefined

    useEffect( ()=> {
        all()
    }, [])

    const onClick = () => {
        nom !== "" ? 
        fetch(`https://restcountries.com/v3.1/name/${nom}?fields=name,cca3,flags`)
        .then((response) => response.json())
        .then((data) => setPays(data))
        .catch((erreur) => console.log(erreur))
        : all()
        setCurrentPage(1)
    }

    const all = () => {
        fetch(`https://restcountries.com/v3.1/all`)
        .then((response) => response.json())
        .then((data) => setPays(data))
        .catch((erreur) => console.log(erreur))
    }

    const renderPays = () => {
        return currentPays.map((unPays) => {
            return (
                <Card key={unPays.cca3}>
                    <Image src={unPays.flags.png} />
                    <Card.Content>
                        <CardHeader>
                            <Link to={`/pays/${unPays.cca3}`}>{unPays.name.common}</Link>
                        </CardHeader>
                    </Card.Content>
                </Card>
            )
        })
    }

    return (
        <Container>
            <h1>Rechercher</h1>
            <Label pointing="right">Gentilé</Label>
            <Input type="text" value={nom} onChange={(e) => setNom(e.target.value)} onKeyPress={(key) => {if (key.code === 'Enter') {onClick()}}}/>
            <Button onClick={onClick}>Rechercher les pays</Button>
            <h2>Résultats de la recherche</h2>
            {pays.length > 0 ? `Il y a ${pays.length} résultat(s)` : 'Il n\'y a aucun pays'}
            <div>
                { pays.length > 0 ?
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
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", width: "100%"}}>
                {pays.length > 0 ? renderPays() : undefined}
            </div>
        </Container>)


};

export default Recherche;
