import React, { useState, useEffect, useCallback } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import airtableRequest from "api/api";

function Tables() {
  const [data, setData] = useState([]);
  const { columns, rows } = authorsTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;

  // Función para obtener los datos de la API
  const fetchData = useCallback(async () => {
    try {
      const response = await airtableRequest({ tableName: "Practicants" });
      const filteredData = response.records
        .filter((practicante) => practicante.fields.Active === true)
        .map((practicante) => ({
          id: practicante.id,
          fullName: practicante.fields["Full Name"],
          email: practicante.fields.email,
          profilePicture:
            practicante.fields["Profile Pictures"] && practicante.fields["Profile Pictures"][0]
              ? practicante.fields["Profile Pictures"][0].url
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          // Puedes agregar más campos aquí si lo necesitas
        }));

      setData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
console.log(data,' en table');

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Authors table</SoftTypography>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} data={data} />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
