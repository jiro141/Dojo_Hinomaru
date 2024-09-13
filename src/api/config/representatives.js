import bcrypt from "bcryptjs";
import airtableRequest from "api/api";
export const getRepresentatives = async (id) => {
  try {
    const response = await airtableRequest({ tableName: "Representatives", id: id });
    // console.log(response,'controlador');

    const filteredData = response.fields;
    return filteredData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
