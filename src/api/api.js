import axios from 'axios';

const AIRTABLE_API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
const AIRTABLE_BASE_URL = `https://api.airtable.com/v0/apprj0m8SKi9cUTBC`;

async function airtableRequest({ tableName, method = 'GET', id = '', data = {} }) {
  try {
    // Construir la URL
    const url = `${AIRTABLE_BASE_URL}/${tableName}${id ? `/${id}` : ''}`;

    // Configuración de la solicitud
    const config = {
      method: method,
      url: url,
      headers: {
        Authorization: `Bearer patpzMkYYxfCRpcOX.ea669b7b5f1cd92c402cc32c13902d065a0874e4c20fc7db75ddb325fb7af060`,
        'Content-Type': 'application/json',
      },
      data: method === 'GET' || method === 'DELETE' ? undefined : data, // Solo incluir data en POST/PUT
    };

    // Hacer la solicitud
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('Error realizando la solicitud a Airtable:', error);
    throw error;
  }
}

export default airtableRequest;
