import { Form, Button } from "react-bootstrap";

export const CreateAdForm = ({ handleSubmit, name, setName, formErrors, price, setPrice, description, setDescription, type, setType, tags, setTags, setPhoto }) => (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
      <Form.Group controlId="formName">
        <Form.Label>Título</Form.Label>
        <Form.Control
          type="text"
          placeholder="Escribe el título"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {formErrors.name && (
          <Form.Text className="text-danger">{formErrors.name}</Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="formPrice">
        <Form.Label>Precio</Form.Label>
        <Form.Control
          type="number"
          placeholder="Escribe el precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {formErrors.price && (
          <Form.Text className="text-danger">{formErrors.price}</Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Escribe la descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {formErrors.description && (
          <Form.Text className="text-danger">
            {formErrors.description}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="formType">
        <Form.Label>Tipo</Form.Label>
        <Form.Control
          as="select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="compra">Compra</option>
          <option value="venta">Venta</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formTags">
        <Form.Label>Etiquetas (separadas por comas)</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ejemplo: etiqueta1, etiqueta2"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        {formErrors.tags && (
          <Form.Text className="text-danger">{formErrors.tags}</Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="formPhoto">
        <Form.Label>Foto</Form.Label>
        <Form.Control
          type="file"
          accept=".jpg, .jpeg, .png, .pdf, .doc, .docx"
          name="photo"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
      </Form.Group>

      <Button variant="dark" type="submit" className="mt-3">
        Crear
      </Button>
    </Form>
  );