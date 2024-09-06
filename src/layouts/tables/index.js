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
import { useAuthorsData } from "./data/authorsTableData";

function Tables() {
  const { columns } = authorsTableData;
  const [rows, setRows] = useState([]); // Estado único para almacenar los datos de los autores
  const gradeNames = [
    "JūKyū", // 1
    "KyuKyū", // 2
    "Hachikyū", // 3
    "Nanakyū", // 4
    "Rokkyū", // 5
    "Gokyū", // 6
    "Yonkyū", // 7
    "Sankyū", // 8
    "Nikyū", // 9
    "Ikkyū", // 10
    "Kari Shodan", // 11
    "Shodan", // 12
    "Nidan", // 13
    "Sandan", // 14
    "Yondan", // 15
    "Godan", // 16
    "Rokudan", // 17
    "Nanadan", // 18
    "Hachidan", // 19
    "Kyudan", // 20
    "Jūdan", // 21
  ];

  // useAuthorsData hook utilizado para cargar los datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await airtableRequest({ tableName: "Practicants" });
        const filteredData = response.records
          .filter((practicante) => practicante.fields.Active === true)
          .map((practicante) => ({
            id: practicante.id,
            image:
              practicante.fields["Profile Pictures"] && practicante.fields["Profile Pictures"][0]
                ? practicante.fields["Profile Pictures"][0].url
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            name: practicante.fields["Full Name"],
            email: practicante.fields.Email,
            step:practicante.fields.Step,
            grade:
              practicante.fields.Step &&
              practicante.fields.Step >= 1 &&
              practicante.fields.Step <= 21
                ? gradeNames[practicante.fields.Step - 1]
                : "N/A",
            plan: practicante.fields.Plan || "N/A",
            condition: practicante.fields.Notes ? "✅" : "",
            Birthday: practicante.fields.Birthday,
          }));
        setRows(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Se ejecuta solo una vez al montar el componente

  const { columns: prCols, rows: prRows } = projectsTableData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Practicantes</SoftTypography>
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
              <Table columns={columns} rows={rows} />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
