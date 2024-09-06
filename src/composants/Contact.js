const { useState } = require("react");
const { Form, Button, Message, TextArea, Label, Input, Segment } = require("semantic-ui-react");

const Contact = () => {
    const [formData, setFormData] = useState({
        prenom: '',
        nom: '',
        email: '',
        commentaire: '',
      }); // Formulaire
    
      const [errors, setErrors] = useState({}); // Variable qui gère les erreurs
    
      // Fonction qui attribut les états lorsque'ils changent
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
      };
    
      // Fonction activé lors de l'envoi du formulaire
      const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = {};
    
        // Vérification du champ prénom
        newErrors.prenom = (!formData.prenom.trim()) ? 'Le champ prénom ne doit pas être vide.' : '';

        // Vérification du champ nom
        newErrors.nom = (!formData.nom.trim()) ? 'Le champ nom ne doit pas être vide.' : '';

        // Vérification du champ email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        newErrors.email = (!emailRegex.test(formData.email)) ? 'Veuillez saisir une adresse email valide.' : '';

        // Vérification du champ commentaire
        newErrors.commentaire = (!formData.commentaire.trim()) ? 'Le champ commentaire ne doit pas être vide.' : '';

        // Vérification des erreurs
        setErrors(newErrors);
        if (Object.values(newErrors).every(value => value === '')) {
          alert('Le formulaire a été soumis avec succès !');
        }

      };
    
      return (
        <div style={{ width: '400px', margin: 'auto', paddingTop: '50px' }}>
        <h1>Contact</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <Segment raised>
                <Label as='a' color='red' ribbon>
                  Prénom
                </Label>
                {/*Input du champ prénom */}
                <Input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  placeholder="Prénom"
                  onChange={handleChange}
                />
                </Segment>
              {errors.prenom && <Message negative>{errors.prenom}</Message>}
            </Form.Field>
            <Form.Field>
              <Segment raised>
                <Label as='a' color='blue' ribbon>
                  Nom
                </Label>
                {/*Input du champ nom */}
                <Input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  placeholder="Nom"
                  onChange={handleChange}
                />
              </Segment>
              {errors.nom && <Message negative>{errors.nom}</Message>}
            </Form.Field>
            <Form.Field>
              <Segment raised>
                <Label as='a' color='orange' ribbon>
                  Email
                </Label>
                {/*Input du champ email */}
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Email ex: test@test.com"
                  onChange={handleChange}
                />
              </Segment>
              {errors.email && <Message negative>{errors.email}</Message>}
            </Form.Field>
            <Form.Field>
              <Segment raised>
                <Label as='a' color='teal' ribbon>
                  Commentaire
                </Label>
                {/*Input du champ commentaire */}
                <TextArea
                  type="text"
                  name="commentaire"
                  value={formData.Commentaire}
                  placeholder="Commentaire"
                  onChange={handleChange}
                />
              </Segment>
              {/*Message d'erreur */}
              {errors.commentaire && <Message negative>{errors.commentaire}</Message>}
            </Form.Field>
            <Button type="submit" color="green">Soumettre</Button>
          </Form>
        </div>
      );
}

export default Contact
