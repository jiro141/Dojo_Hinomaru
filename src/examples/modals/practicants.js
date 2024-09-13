import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, Divider, Box, Button } from "@mui/material";
import { getPracticants } from "api/config/practicants";
import SoftAvatar from "components/SoftAvatar";
import SoftBox from "components/SoftBox";
import CheckIcon from "@mui/icons-material/Check";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonIcon from "@mui/icons-material/Person";
import SoftButton from "components/SoftButton";
import EditIcon from "@mui/icons-material/Edit";
import SoftInput from "components/SoftInput";
import CloseIcon from "@mui/icons-material/Close";
import { putPracticants } from "api/config/practicants";
import { getRepresentatives } from "api/config/representatives";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
const DataFields = (selectedId) => {
  const [practicantData, setPracticantData] = useState(null);
  const [representativesData, setRepresentativesData] = useState(null);
  const [activeSection, setActiveSection] = useState("personal");
  const [isEdit, setIsEdit] = useState(false);
  const [editedData, setEditedData] = useState({});
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };
  const gradeColors = [
    "#FFFFFF", // 1
    "#FFFFFF", // 2
    "#FFFFFF", // 3
    "#FFFFFF", // 4
    "#FFFFFF", // 5
    "#FDBA31", // 6
    "#ce4f0e", // 7
    "#336600", // 8
    "#0072c6", // 9
    "#4c0000", // 10
    "#000000", // 11
    "#000000", // 12
    "#000000", // 13
    "#000000", // 14
    "#000000", // 15
    "#000000", // 16
    "#000000", // 17
    "#000000", // 18
    "#000000", // 19
    "#000000", // 20
    "#000000", // 21
  ];
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

  const getTextColor = (backgroundColor) => {
    // Determina si se necesita texto blanco o negro basado en el color de fondo
    const darkColors = ["#000000", "#4c0000", "#336600", "#ce4f0e", "#0072c6", "#FDBA31"];
    return darkColors.includes(backgroundColor) ? "#FFFFFF" : "#000000";
  };
  const dataPracticants = async () => {
    try {
      const response = await getPracticants(selectedId.selectedId);
      setPracticantData(response);
    } catch (error) {
      console.error("Error fetching practicants:", error);
    }
  };
  const Representatives = async () => {
    try {
      const response = await getRepresentatives(practicantData.Representatives[0]);
      setRepresentativesData(response);
    } catch (error) {
      console.error("Error fetching practicants:", error);
    }
  };
  const handleInputChange = (field, value) => {
    // Actualizamos el practicantData con el nuevo valor
    setPracticantData({
      ...practicantData,
      [field]: value,
    });

    // Si el campo ha sido editado, lo agregamos a editedData
    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [field]: value,
    }));
  };
  console.log(editedData, "data editada");

  useEffect(() => {
    dataPracticants();
  }, [selectedId]);
  useEffect(() => {
    Representatives();
  }, [practicantData]);

  // Comprobamos si practicantData está disponible
  if (!practicantData) {
    return <Typography>Cargando datos...</Typography>;
  }

  // Asignamos la imagen de perfil dependiendo de si existe o no
  const profileImg =
    practicantData["Profile Pictures"]?.[0]?.url ||
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  // Verificación de representantes
  const hasRepresentatives = practicantData.Representatives ? (
    <CheckIcon style={{ color: "green" }} />
  ) : (
    "❌"
  );
  const backgroundColor =
    practicantData.Step[0] >= 0 && practicantData.Step[0] < gradeColors.length
      ? gradeColors[practicantData.Step[0]]
      : "#000";
  const textColor = getTextColor(backgroundColor);

  const editPracticant = async (id, editedData) => {
    const practicans = await putPracticants(id, editedData);
    toast.success(`El practicante ${practicans.fields["Full Name"]} fue actualizado con exito!`);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "personal":
        return (
          <>
            {isEdit ? (
              // Mostrar el formulario con los SoftInputs cuando isEdit sea true
              <>
                <form>
                  <Typography variant="body2" color="textSecondary" align="center">
                    <strong>Nombre Completo:</strong>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        gap: "20px",
                      }}
                    >
                      <>
                        {" "}
                        <SoftInput
                          type="text"
                          value={practicantData["First Name"]}
                          onChange={(e) => handleInputChange("First Name", e.target.value)}
                        />
                        <SoftInput
                          type="text"
                          value={practicantData["Middle Name"]}
                          onChange={(e) => handleInputChange("Middle Name", e.target.value)}
                        />
                      </>
                      <>
                        {" "}
                        <SoftInput
                          type="text"
                          value={practicantData["Last Name"]}
                          onChange={(e) => handleInputChange("Last Name", e.target.value)}
                        />
                        <SoftInput
                          type="text"
                          value={practicantData["Last Name (2nd)"]}
                          onChange={(e) => handleInputChange("Last Name (2nd)", e.target.value)}
                        />
                      </>
                    </div>
                  </Typography>
                  <Typography variant="body2" color="textSecondary" align="center" mt={1}>
                    <strong>Cédula:</strong>
                    <SoftInput
                      type="text"
                      value={practicantData.ID}
                      onChange={(e) => handleInputChange("ID", e.target.value)}
                    />
                  </Typography>
                  <Typography variant="body2" color="textSecondary" align="center" mt={1}>
                    <strong>Notas:</strong>
                    <SoftInput
                      type="text"
                      value={practicantData.Notes || ""}
                      onChange={(e) => handleInputChange("Notes", e.target.value)}
                    />
                  </Typography>
                  <Typography variant="body2" color="textSecondary" align="center" mt={1}>
                    <strong>Edad:</strong>
                    <SoftInput
                      type="number"
                      value={practicantData.Age || ""}
                      onChange={(e) => handleInputChange("Age", e.target.value)}
                    />
                  </Typography>
                </form>
              </>
            ) : (
              <>
                <Typography variant="body2" color="textSecondary" align="center">
                  <strong>Nombre Completo:</strong> {practicantData["Full Name"]}
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center" mt={1}>
                  <strong>Cédula:</strong> {practicantData.ID}
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center" mt={1}>
                  <strong>Notas:</strong>{" "}
                  {practicantData.Notes ? practicantData.Notes : "Sin notas"}
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center" mt={1}>
                  <strong>Edad:</strong> {practicantData.Age ? practicantData.Age : ""}
                </Typography>
              </>
            )}
          </>
        );
      case "contact":
        return (
          <>
            {isEdit ? (
              <>
                <form>
                  <Typography variant="body2" color="textSecondary" align="center" mt={1}>
                    <strong>Dirección:</strong>
                    <SoftInput
                      type="text"
                      value={practicantData.Address}
                      onChange={(e) => handleInputChange("Address", e.target.value)}
                    />
                  </Typography>
                  <Typography variant="body2" color="textSecondary" align="center" mt={1}>
                    <strong>Teléfono:</strong>
                    <SoftInput
                      type="text"
                      value={practicantData["Phone Number"] || ""}
                      onChange={(e) => handleInputChange("Phone Number", e.target.value)}
                    />
                  </Typography>
                </form>
              </>
            ) : (
              <>
                <Typography variant="body2" color="textSecondary" align="center">
                  <strong>Dirección:</strong> {practicantData.Address || "Dirección no disponible"}
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center" mt={1}>
                  <strong>Teléfono:</strong> {practicantData["Phone Number"] || "No disponible"}
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center" mt={1}>
                  <strong>Representante:</strong> {hasRepresentatives}
                </Typography>
                {representativesData ? (
                  <>
                    <Divider style={{ margin: "8px 0" }} />
                    <Typography variant="body2" color="textSecondary" align="center">
                      <strong>Nombre Completo:</strong> {representativesData["Full Name"]}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" align="center" mt={1}>
                      <strong>Telefono:</strong>{" "}
                      {representativesData["Phone Number"] || "No disponible"}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" align="center" mt={1}>
                      <strong>Correo:</strong> {representativesData.Email}
                    </Typography>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </>
        );
      case "user":
        return (
          <>
            {isEdit ? (
              <>
                <form>
                  <Typography variant="body2" color="textSecondary" align="center" mt={1}>
                    <strong>Usuario:</strong>
                    <SoftInput
                      type="text"
                      value={practicantData.userName}
                      onChange={(e) => handleInputChange("userName", e.target.value)}
                    />
                  </Typography>
                  <Typography variant="body2" color="textSecondary" align="center" mt={1}>
                    <strong>Contraseña:</strong>
                    <SoftInput
                      type="text"
                      value={practicantData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                    />
                  </Typography>
                </form>
              </>
            ) : (
              <>
                <Typography variant="body2" color="textSecondary" align="center">
                  <strong>Usuario:</strong> {practicantData.userName || "No disponible"}
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center" mt={1}>
                  <strong>Grado:</strong>{" "}
                  <div
                    style={{
                      display: "inline-block",
                      padding: "4px 8px",
                      borderRadius: "8px",
                      backgroundColor: backgroundColor,
                      color: textColor,
                      fontWeight: "bold",
                      fontSize: "12px",
                      textAlign: "center",
                      minWidth: "40px",
                      lineHeight: "16px",
                      border: backgroundColor === "#FFFFFF" ? "0.5px solid #000000" : "none",
                    }}
                  >
                    {practicantData.Step[0] &&
                    practicantData.Step[0] >= 1 &&
                    practicantData.Step[0] <= 21
                      ? gradeNames[practicantData.Step[0] - 1]
                      : "N/A"}
                  </div>
                </Typography>
                <Typography variant="body2" color="textSecondary" align="center" mt={1}>
                  <strong>Plan de Clase:</strong> {practicantData["Plan Class"] || "No asignado"}
                </Typography>
              </>
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card
      style={{
        maxWidth: 800,
        margin: "auto",
        borderRadius: 16,
        padding: "16px",
        position: "relative",
      }}
    >
      <Toaster />
      <SoftBox
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mb={2}
        style={{
          padding: "4px 8px",
          borderRadius: "8px",
          backgroundColor: backgroundColor,
          color: textColor,
          fontWeight: "bold",
          fontSize: "12px",
          textAlign: "center",
          minWidth: "40px",
          lineHeight: "16px",
          border: backgroundColor === "#FFFFFF" ? "0.5px solid #000000" : "none",
        }}
      >
        <SoftAvatar src={profileImg} variant="rounded" size="xl" />
        <Typography variant="h5" mt={2} style={{ color: textColor }}>
          {practicantData["Full Name"]}
        </Typography>
      </SoftBox>

      <Divider style={{ margin: "8px 0" }} />
      <Typography
        variant="body2"
        mt={1}
        style={{ textAlign: "center", color: "gray", fontSize: "20px" }}
      >
        <strong>Datos:</strong>
      </Typography>
      {/* Botones de navegación */}
      <Grid container spacing={2} alignItems="center" justifyContent="center" mb={2}>
        <Grid item xs={4}>
          <SoftButton
            variant={activeSection === "personal" ? "gradient" : "contained"}
            fullWidth
            startIcon={<PersonIcon />}
            onClick={() => setActiveSection("personal")}
            color="info"
          >
            Personales
          </SoftButton>
        </Grid>
        <Grid item xs={4}>
          <SoftButton
            variant={activeSection === "contact" ? "gradient" : "contained"}
            fullWidth
            startIcon={<ContactPhoneIcon />}
            onClick={() => setActiveSection("contact")}
            color="info"
          >
            Contacto
          </SoftButton>
        </Grid>
        <Grid item xs={4}>
          <SoftButton
            variant={activeSection === "user" ? "gradient" : "contained"}
            fullWidth
            startIcon={<AccountBoxIcon />}
            onClick={() => setActiveSection("user")}
            color="info"
          >
            Usuario
          </SoftButton>
        </Grid>
      </Grid>

      <Divider style={{ margin: "16px 0" }} />

      {/* Renderizado dinámico según la sección seleccionada */}
      <Box>{renderSection()}</Box>
      <>
        {isEdit ? (
          <div style={{ display: "flex", justifyContent: "space-around", margin: "10px 0" }}>
            <Button
              style={{ color: "green" }}
              onClick={() => editPracticant(selectedId.selectedId, editedData)}
            >
              Guardar <CheckIcon />
            </Button>
            <Button onClick={handleEdit}>
              Cancelar <CloseIcon />
            </Button>
          </div>
        ) : (
          <>
            <Button onClick={handleEdit}>
              Editar <EditIcon />
            </Button>
          </>
        )}
      </>
    </Card>
  );
};

export default DataFields;
