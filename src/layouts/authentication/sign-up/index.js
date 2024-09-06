import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import {
  Grid,
  Stepper,
  Step,
  StepLabel,
  Button,
  Switch,
  TextField,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images

function SignUp() {
  const [activeStep, setActiveStep] = useState(0);
  const [agreement, setAgreement] = useState(false);

  const steps = ["Datos personales", "Datos de contacto", "Representante", "Cuenta"];

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);
  const handleSetAgreement = () => setAgreement(!agreement);

  const isLastStep = activeStep === steps.length - 1;
  const handleSetAgremment = () => setAgremment(!agreement);
  const [isAutorepresentado, setIsAutorepresentado] = useState(false);
  const [isRepresentante, setIsRepresentante] = useState(false);

  const handleAutorepresentadoChange = (event) => {
    setIsAutorepresentado(event.target.checked);
    setIsRepresentante(false); // Deshabilitar la otra opción
  };

  const handleRepresentanteChange = (event) => {
    setIsRepresentante(event.target.checked);
    setIsAutorepresentado(false); // Deshabilitar la otra opción
  };
  const gradeNames = [
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

  const [selectedGrade, setSelectedGrade] = useState("");

  const handleGradeChange = (event) => {
    setSelectedGrade(event.target.value);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Primer nombre
                  </SoftTypography>
                  <SoftInput placeholder="Primer nombre" />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Segundo nombre
                  </SoftTypography>
                  <SoftInput placeholder="Segundo nombre" />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Primer apellido
                  </SoftTypography>
                  <SoftInput placeholder="Primer apellido" />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Segundo apellido
                  </SoftTypography>
                  <SoftInput placeholder="Segundo apellido" />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Fecha de nacimiento
                  </SoftTypography>
                  <SoftInput type="date" placeholder="Fecha de nacimiento" />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Cedula
                  </SoftTypography>
                  <SoftInput type="number" placeholder="Cedula" />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={12}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Comentario
                  </SoftTypography>
                  <SoftInput
                    type="text"
                    placeholder="Detalles importantes como si padece alguna enfermedad o condicion fisica a tomar en cuenta."
                  />
                </SoftBox>
              </Grid>
            </Grid>
          </>
        );
      case 1:
        return (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Telefono de contacto
                  </SoftTypography>
                  <SoftInput placeholder="Telefono de contacto" />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Correo electronico
                  </SoftTypography>
                  <SoftInput type="email" placeholder="Email" />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Dirección de residencia
                  </SoftTypography>
                  <SoftInput placeholder="Dirrección de residencia" />
                </SoftBox>
              </Grid>
            </Grid>
          </>
        );
      case 2:
        return (
          <>
            {/* Autorepresentado Switch */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <SoftBox mb={2} display="flex" alignItems="center" gap="20px">
                  <SoftTypography
                    variant="subtitle2"
                    fontWeight="medium"
                    sx={{ cursor: "pointer", userSelect: "none" }}
                  >
                    Autorepresentado
                  </SoftTypography>
                  <Switch checked={isAutorepresentado} onChange={handleAutorepresentadoChange} />
                </SoftBox>
              </Grid>

              {/* Representante Switch */}
              <Grid item xs={12} md={6}>
                <SoftBox mb={2} display="flex" alignItems="center" gap="20px">
                  <SoftTypography
                    variant="subtitle2"
                    fontWeight="medium"
                    sx={{ cursor: "pointer", userSelect: "none" }}
                  >
                    Representante registrado
                  </SoftTypography>
                  <Switch checked={isRepresentante} onChange={handleRepresentanteChange} />
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Buscar representante"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      style: {
                        padding: "10px",
                      },
                    }}
                    disabled={!isRepresentante}
                  />
                </SoftBox>
              </Grid>

              {/* Input Fields */}
              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Nombre del representante
                  </SoftTypography>
                  <SoftInput
                    type="text"
                    placeholder="Nombre"
                    disabled={isAutorepresentado || isRepresentante}
                  />
                </SoftBox>
              </Grid>

              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Apellido del representante
                  </SoftTypography>
                  <SoftInput
                    placeholder="Apellido"
                    disabled={isAutorepresentado || isRepresentante}
                  />
                </SoftBox>
              </Grid>

              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Cedula del representante
                  </SoftTypography>
                  <SoftInput
                    placeholder="Cedula del representante"
                    disabled={isAutorepresentado || isRepresentante}
                  />
                </SoftBox>
              </Grid>

              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Fecha de nacimiento del representante
                  </SoftTypography>
                  <SoftInput
                    type="date"
                    placeholder="Fecha de nacimiento"
                    disabled={isAutorepresentado || isRepresentante}
                  />
                </SoftBox>
              </Grid>

              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Telefono de contacto
                  </SoftTypography>
                  <SoftInput
                    placeholder="Telefono de contacto"
                    disabled={isAutorepresentado || isRepresentante}
                  />
                </SoftBox>
              </Grid>

              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Correo electronico
                  </SoftTypography>
                  <SoftInput
                    type="email"
                    placeholder="Email"
                    disabled={isAutorepresentado || isRepresentante}
                  />
                </SoftBox>
              </Grid>

              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Dirrección de residencia
                  </SoftTypography>
                  <SoftInput
                    placeholder="Dirrección de residencia"
                    disabled={isAutorepresentado || isRepresentante}
                  />
                </SoftBox>
              </Grid>
            </Grid>
          </>
        );
      case 3:
        return (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Grado
                  </SoftTypography>
                  <select
                    id="grade-select"
                    value={selectedGrade}
                    onChange={handleGradeChange}
                    style={{
                      width: "100%",
                      padding: "8px",
                      fontSize: "16px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <option value={1}>JūKyū</option>
                    {gradeNames.map((grade, index) => (
                      <option key={index} value={index + 2}>
                        {grade}
                      </option>
                    ))}
                  </select>
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Usuario
                  </SoftTypography>
                  <SoftInput type="text" placeholder="Nombre de usuario" />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Contraseña
                  </SoftTypography>
                  <SoftInput type="password" placeholder="Contraseña" />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <SoftBox my={3} display="flex" alignItems="center" gap='20px'>
                  <SoftTypography
                    variant="button"
                    fontWeight="regular"
                    sx={{ cursor: "pointer", userSelect: "none", ml: 2 }} // Margen izquierdo para separar el texto del switch
                  >
                   Aceptas
                  </SoftTypography>
                  <SoftTypography
                    component="a"
                    href="#"
                    variant="button"
                    fontWeight="bold"
                    textGradient
                  >
                    Los términos y condiciones
                  </SoftTypography>
                  <Switch
                    checked={isAutorepresentado}
                    sx={{ alignSelf: "center" }} // Alineación vertical
                  />
                </SoftBox>
              </Grid>
            </Grid>
          </>
        );
      default:
        return "Paso desconocido";
    }
  };
  return (
    <BasicLayout
      image={
        "https://mljojkruksga.i.optimole.com/co-ZpyQ-1SYp2oqj/dam:1/w:800/h:600/q:auto/id:25f25f14de1b299233b9681d1a59e6b0/directUpload/Dojo-hinomaru4.jpg"
      }
    >
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register with
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={2}>
          <Socials />
        </SoftBox>
        <SoftBox pb={3} px={3}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Contenido del formulario de acuerdo al step */}
          <SoftBox component="form" role="form">
            {renderStepContent(activeStep)}

            <SoftBox mt={4} display="flex" justifyContent="space-between">
              <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
                atras
              </Button>

              <SoftButton
                variant="gradient"
                color="dark"
                onClick={isLastStep ? () => alert("Formulario completado") : handleNext}
              >
                {isLastStep ? "Registrate" : "Siguiente"}
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>

        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Already have an account?&nbsp;
            <SoftTypography
              component={Link}
              to="/authentication/sign-in"
              variant="button"
              color="dark"
              fontWeight="bold"
              textGradient
            >
              Sign in
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
