import { Form, Button } from "react-bootstrap";

function AdvertForm({ adData, setAdData, handleInputChange, handleSubmit, formErrors }) {
  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
    <Form.Group controlId="formName">
      <Form.Label>Título</Form.Label>
      <Form.Control
        type="text"
        name="name"
        placeholder="Escribe el título"
        value={adData.name}
        onChange={handleInputChange}
      />
      {formErrors.name && (
        <Form.Text className="text-danger">{formErrors.name}</Form.Text>
      )}
    </Form.Group>

    <Form.Group controlId="formPrice">
      <Form.Label>Price</Form.Label>
      <Form.Control
        type="number"
        name="price"
        placeholder="Escribe el precio"
        value={adData.price}
        onChange={handleInputChange}
      />
      {formErrors.price && (
        <Form.Text className="text-danger">
          {formErrors.price}
        </Form.Text>
      )}
    </Form.Group>

    <Form.Group controlId="formDescription">
      <Form.Label>Descripción</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        name="description"
        placeholder="Escribe la descripción"
        value={adData.description}
        onChange={handleInputChange}
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
        name="type"
        value={adData.type}
        onChange={handleInputChange}
      >
        <option value="compra">Compra</option>
        <option value="venta">Venta</option>
      </Form.Control>
    </Form.Group>

    <Form.Group controlId="formTags">
      <Form.Label>Etiquetas (separadas por comas)</Form.Label>
      <Form.Control
        type="text"
        name="tags"
        placeholder="Ejemplo: etiqueta1, etiqueta2"
        value={adData.tags.join(", ")}
        onChange={(e) =>
          setAdData({ ...adData, tags: e.target.value.split(", ") })
        }
      />
      {formErrors.tags && (
        <Form.Text className="text-danger">{formErrors.tags}</Form.Text>
      )}
    </Form.Group>

    <Button variant="dark" type="submit" style={{ marginTop: "20px" }}>
      Guardar Cambios
    </Button>
  </Form>
  );
}

export default AdvertForm;
