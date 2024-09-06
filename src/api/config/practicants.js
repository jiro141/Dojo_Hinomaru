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
