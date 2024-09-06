import airtableRequest from "api/api";

export const submitForm = async (formData) => {
  const currentDate = new Date().toISOString().split("T")[0];
  console.log(formData, "prueba");

  // Definir el payload que será enviado a Airtable
  const payload = {
    fields: {
      "First Name": formData.firstName,
      Active: true, // Añadido, como en el payload de Postman
      // Elimina el campo "ID" si Airtable no permite su modificación.
      "Plan Class": formData.planClass, // Asegúrate de que el valor es válido
      "Last Name (2nd)": formData.secondLastName,
      "Self Represent": formData.selfRepresent,
      Birthday: formData.birthDate,
      "Start date": currentDate, 
      password: formData.password,
      Exentos: false, // Añadido, como en el payload de Postman
      "Last Name": formData.lastName,
      "Born Address": formData.bornAddress,
      Address: formData.address, // Asegúrate de que el formato de la dirección es correcto
      Estado: "Regular", // Asegúrate de que el valor "Instructor" es válido
      "Phone Number": formData.phoneNumber,
      "Attendance 2": "1", // Si este campo es requerido, añade el valor
      Email: formData.email,
      "Middle Name": formData.middleName,
      userName:formData.userName,
      "Selected Grade": ["recnzGJhKPTVvg79E"],
    },
  };

  try {
    // Llamada a la función airtableRequest para enviar el formulario a Airtable
    const response = await airtableRequest({
      tableName: "Practicants", // Nombre de la tabla en Airtable
      method: "POST", // Método HTTP
      data: payload, // Payload con los datos del formulario
    });

    console.log("Datos enviados correctamente:", response);
  } catch (error) {
    console.error("Error al enviar los datos:", error);
  }
};
