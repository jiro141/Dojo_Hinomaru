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

import { submitForm } from "api/config/practicants";

function SignUp() {
  const steps = ["Datos personales", "Datos de contacto", "Representante", "Cuenta"];
  const gradeNames = ["Haime", "Bushido", "Kuro Obi"];

  const [activeStep, setActiveStep] = useState(0);
  const [agreement, setAgreement] = useState(false);
  const [isAutorepresentado, setIsAutorepresentado] = useState(false);
  const [isRepresentante, setIsRepresentante] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState("");

  const [formData, setFormData] = useState({
    firstName: "", // "First Name"
    middleName: "", // "Middle Name"
    lastName: "", // "Last Name"
    secondLastName: "", // "Last Name (2nd)"
    idNumber: "", // "ID"
    selfRepresent: false, // "Self Represent"
    birthDate: "", // "Birthday"
    startDate: "", // "Start date"
    password: "", // "password"
    bornAddress: "", // "Born Address"
    address: "", // "Address"
    estado: "", // "Estado"
    phoneNumber: "", // "Phone Number"
    attendance2: "", // "Attendance 2"
    email: "", // "Email"
    userName: "",
    planClass: "",
  });

  const [representanteFormData, setRepresentanteFormData] = useState({
    representanteNombre: "", // "Nombre del representante"
    representanteApellido: "", // "Apellido del representante"
    representanteCedula: "", // "Cedula del representante"
    representanteFechaNacimiento: "", // "Fecha de nacimiento del representante"
    representanteTelefono: "", // "Telefono del representante"
    representanteEmail: "", // "Correo del representante"
    representanteDireccion: "", // "Dirección de residencia del representante"
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRepresentanteChange = (event) => {
    const { type, name, value, checked } = event.target;

    if (type === "checkbox") {
      setIsRepresentante(checked); // Activar o desactivar el switch de representante
      setIsAutorepresentado(false); // Deshabilitar la opción de autorepresentado
    } else {
      setRepresentanteFormData({
        ...representanteFormData,
        [name]: value,
      });
    }
  };

  const handleSetAgreement = () => setAgreement(!agreement);
  const handleSetAgremment = () => setAgremment(!agreement);

  const isLastStep = activeStep === steps.length - 1;

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleAutorepresentadoChange = (event) => {
    setIsAutorepresentado(event.target.checked);
    setIsRepresentante(false); // Deshabilitar la otra opción
  };

  const handleGradeChange = (event) => {
    setSelectedGrade(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Llamar a submitForm y pasar el formData
      await submitForm(formData);
      console.log("Formulario enviado con éxito");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
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
                  <SoftInput
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Primer nombre"
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Segundo nombre
                  </SoftTypography>
                  <SoftInput
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    placeholder="Segundo nombre"
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Primer apellido
                  </SoftTypography>
                  <SoftInput
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Primer apellido"
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Segundo apellido
                  </SoftTypography>
                  <SoftInput
                    name="secondLastName"
                    value={formData.secondLastName}
                    onChange={handleChange}
                    placeholder="Segundo apellido"
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Fecha de nacimiento
                  </SoftTypography>
                  <SoftInput
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    placeholder="Fecha de nacimiento"
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Cedula
                  </SoftTypography>
                  <SoftInput
                    type="number"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleChange}
                    placeholder="Cedula"
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
                  <SoftInput
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Telefono de contacto"
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Dirección de residencia
                  </SoftTypography>
                  <SoftInput
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Dirección de residencia"
                  />
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
              {/* Autorepresentado Switch */}
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

              {/* Campos del representante */}
              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Nombre del representante
                  </SoftTypography>
                  <SoftInput
                    name="representanteNombre"
                    value={representanteFormData.representanteNombre}
                    onChange={handleRepresentanteChange}
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
                    name="representanteApellido"
                    value={representanteFormData.representanteApellido}
                    onChange={handleRepresentanteChange}
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
                    name="representanteCedula"
                    value={representanteFormData.representanteCedula}
                    onChange={handleRepresentanteChange}
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
                    name="representanteFechaNacimiento"
                    value={representanteFormData.representanteFechaNacimiento}
                    onChange={handleRepresentanteChange}
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
                    name="representanteTelefono"
                    value={representanteFormData.representanteTelefono}
                    onChange={handleRepresentanteChange}
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
                    name="representanteEmail"
                    value={representanteFormData.representanteEmail}
                    onChange={handleRepresentanteChange}
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
                    name="representanteDireccion"
                    value={representanteFormData.representanteDireccion}
                    onChange={handleRepresentanteChange}
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
              {/* Usuario */}
              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Plan
                  </SoftTypography>
                  <select
                    id="plan-select"
                    name="planClass" // Asegúrate de que el name sea el mismo que en formData
                    value={formData.planClass} // Valor que viene del estado formData
                    onChange={handleChange} // Llama a handleChange cuando el usuario seleccione algo
                    style={{
                      width: "100%",
                      padding: "8px",
                      fontSize: "16px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <option value="" disabled>
                      Selecciona un plan
                    </option>
                    {gradeNames.map((grade, index) => (
                      <option key={index} value={grade}>
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
                  <SoftInput
                    type="text"
                    name="userName" // nombre del campo en el estado
                    value={formData.userName} // valor tomado del estado formData
                    onChange={handleChange} // actualiza el estado con el nuevo valor
                    placeholder="Nombre de usuario"
                  />
                </SoftBox>
              </Grid>

              {/* Contraseña */}
              <Grid item xs={12} md={6}>
                <SoftBox mb={2}>
                  <SoftTypography variant="subtitle2" fontWeight="medium">
                    Contraseña
                  </SoftTypography>
                  <SoftInput
                    type="password"
                    name="password" // nombre del campo en el estado
                    value={formData.password} // valor tomado del estado formData
                    onChange={handleChange} // actualiza el estado con el nuevo valor
                    placeholder="Contraseña"
                  />
                </SoftBox>
              </Grid>

              {/* Switch de términos y condiciones */}
              {/* <Grid item xs={12} md={6}>
                <SoftBox my={3} display="flex" alignItems="center" gap="20px">
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
                    checked={formData.acceptTerms || false} // ejemplo de switch controlado
                    name="acceptTerms"
                    onChange={handleChange} // para manejar el cambio de estado del switch
                    sx={{ alignSelf: "center" }} // Alineación vertical
                  />
                </SoftBox>
              </Grid> */}
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
                onClick={isLastStep ? handleSubmit : handleNext}
              >
                {isLastStep ? "Regístrate" : "Siguiente"}
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>

        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            ya tienes una cuenta?&nbsp;
            <SoftTypography
              component={Link}
              to="/sign-in"
              variant="button"
              color="dark"
              fontWeight="bold"
              textGradient
            >
              inicia sesion
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
