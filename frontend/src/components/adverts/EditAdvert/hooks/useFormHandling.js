import { useState, useEffect } from "react";

export function useFormHandling(initialData) {
    const [data, setData] = useState(initialData || {});
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
      setData(initialData);
  }, [initialData]);

  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const validateForm = (adData) => {
      const errors = {};
      if (!adData.name) {
        errors.name = "El título es obligatorio";
      }
      if (!adData.price) {
        errors.price = "El precio es obligatorio";
      }
      if (!adData.description) {
        errors.description = "La descripción es obligatoria";
      }
      if (!adData.tags) {
        errors.tags = "Al menos una etiqueta es obligatoria";
      }
  
      setFormErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    return { data, handleInputChange, formErrors, validateForm };
  }
  