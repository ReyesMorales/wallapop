import React, { useState } from "react";
import {
  Container,
  Row,
  Col
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import RedirectToHome from "../../RedirectToHome";
import AdvertForm from "./components/AdvertForm";
import ConfirmationModal from "./components/ConfirmationModal";
import AlertMessage from "./components/AlertMessage";
import { useFetchAdvert, useFormHandling, useEditHandling } from "./hooks";

function EditAdvert() {
  const { id } = useParams();

  // Hook para obtener datos del anuncio
  const { adData, setAdData, errorMessage: fetchError } = useFetchAdvert(id);

   // Hook para manejar el formulario
   const {
    data: formData, 
    handleInputChange, 
    formErrors, 
    validateForm
  } = useFormHandling(adData);

   // Hook para manejar la edición del anuncio
   const { 
    successMessage, 
    errorMessage: editError, 
    handleEdit, 
    redirectToHome 
  } = useEditHandling(id, formData);

  const [showModal, setShowModal] = useState(false);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm(formData)) {
      setShowModal(true);
    } 
  };

  const handleConfirm = () => { 
    setShowModal(false);
    handleEdit();
  };

  const handleCancel = () => {
    setShowModal(false);
  };


  return (
    <Layout title="Editar Anuncio">
    <Container className="mb-5">
      <Row className="justify-content-md-center">
        <Col md="6">
        {!redirectToHome ? (
            <>
          <ConfirmationModal 
                  showModal={showModal} 
                  handleConfirm={handleConfirm} 
                  handleCancel={handleCancel}
                />

                <AlertMessage variant="success" message={successMessage} />
                <AlertMessage variant="danger" message={editError || fetchError} />

          <AdvertForm
                  adData={formData}
                  setAdData={setAdData}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  formErrors={formErrors}
                />
          </>
          ) : (
            <RedirectToHome />
          )}
        </Col>
      </Row>
    </Container>
    </Layout>
  );
}

export default EditAdvert;
