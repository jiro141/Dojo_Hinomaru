import bcrypt from "bcryptjs";
import airtableRequest from "api/api";

export const submitForm = async (formData) => {
  const currentDate = new Date().toISOString().split("T")[0];

  // Generar hash de la contraseña usando bcryptjs
  const salt = bcrypt.genSaltSync(10); // Puedes cambiar el valor de "10" si deseas más rounds
  const hashedPassword = bcrypt.hashSync(formData.password, salt); // Hasheando la contraseña

  // Definir el payload que será enviado a Airtable
  const payload = {
    fields: {
      "First Name": formData.firstName,
      Active: true,
      ID: Number(formData.idNumber),
      "Plan Class": formData.planClass,
      "Last Name (2nd)": formData.secondLastName,
      "Self Represent": formData.selfRepresent,
      Birthday: formData.birthDate,
      "Start date": currentDate,
      password: hashedPassword, // Enviar la contraseña hasheada
      Exentos: false,
      "Last Name": formData.lastName,
      "Born Address": formData.bornAddress,
      Address: formData.address,
      Estado: "Regular",
      "Phone Number": formData.phoneNumber,
      "Attendance 2": "1",
      Email: formData.email,
      "Middle Name": formData.middleName,
      userName: formData.userName,
      "Selected Grade": ["recnzGJhKPTVvg79E"],
    },
  };

  try {
    // Llamada a la función airtableRequest para enviar el formulario a Airtable
    const response = await airtableRequest({
      tableName: "Practicants",
      method: "POST",
      data: payload,
    });
    return response;
  } catch (error) {
    console.error("Error al enviar los datos:", error);
  }
};

//details practicats
export const getPracticants = async (id) => {

  try {
    const response = await airtableRequest({ tableName: "Practicants", id: id });
    const filteredData = response.fields;
    return filteredData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const putPracticants = async (id, fields) => {
  // Verificar si el campo "password" está en los fields
  if (fields.password) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(fields.password, salt);
    
    // Reemplazar el campo password con su valor hasheado
    fields.password = hashedPassword;
  }

  const dataPracticant = {
    fields
  };

  try {
    const response = await airtableRequest({
      tableName: "Practicants",
      method: "PATCH",
      id: id,
      data: dataPracticant,
    });

    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
