import { useState } from "react";

export const useValidation = (name, description, price, tags) => {
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    if (!name) {
      errors.name = "El título es obligatorio";
    }
    if (!description) {
      errors.description = "La descripción es obligatoria";
    }
    if (!price) {
      errors.price = "El precio es obligatorio";
    }
    if (!tags) {
      errors.tags = "Las etiquetas son obligatorias";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return { formErrors, validateForm };
}

