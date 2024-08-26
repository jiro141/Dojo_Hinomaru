import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// @mui material components
import Switch from "@mui/material/Switch";
import { Box } from "@mui/material";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpeg";
import logo from "assets/images/curved-images/logo.png";
import bg from "assets/images/curved-images/vecteezy_wave-style-japanese-pattern-background_6999783.avif";

/// axios
import axios from "axios";

//toast
import toast, { Toaster } from "react-hot-toast";

function SignIn() {
  //estados
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(true);
  const AIRTABLE_API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
  const AIRTABLE_BASE_URL = process.env.REACT_APP_AIRTABLE_BASE_ID;

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = formData;
      const apiKey = AIRTABLE_API_KEY;
      const baseId = AIRTABLE_BASE_URL;
      const tableName = "Practicants";

      const response = await axios.get(`https://api.airtable.com/v0/${baseId}/${tableName}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        params: {
          filterByFormula: `{email} = "${email}"`,
        },
      });

      const records = response.data.records;

      if (records.length > 0) {
        const user = records[0].fields;
        const selectedGrade = user["Selected Grade"];
        const FullName = user["Full Name"];

        // Verificar la contraseña
        if (user.password === password) {
          // Guardar un dato en localStorage
          localStorage.setItem("grade", selectedGrade[0]);
          localStorage.setItem("name", FullName);
          // Redirigir al dashboard
          navigate("/dashboard");
        } else {
          if (user.password != password) {
            toast.error("Contraseña incorrecta.");
          } else {
            toast.error("Usuario no encontrado.");
          }
        }
      } else {
        toast.error("Usuario no encontrado.");
      }
    } catch (error) {
      console.error("Error al acceder a Airtable:", error);
      toast.error("Hubo un problema al iniciar sesión. Inténtalo de nuevo.");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        position: "relative", // Necesario para el overlay
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover", // Hace que la imagen cubra toda la Box
        backgroundPosition: "center", // Centra la imagen
        backgroundRepeat: "no-repeat",
      }}
    >
      <Toaster />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#eaeaeaf3", // Color y opacidad del overlay
          zIndex: 1, // Asegura que esté encima de la imagen de fondo
        }}
      >
        <CoverLayout
          title="Welcome back"
          description="Enter your email and password to sign in"
          image={curved9}
          logo={logo}
        >
          <SoftBox component="form" role="form" onSubmit={handleSignIn}>
            <SoftBox mb={2}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Correo
                </SoftTypography>
              </SoftBox>
              <SoftInput
                name="email"
                type="email"
                placeholder="Ingresa tu correo."
                value={formData.email}
                onChange={handleChange}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Contraseña
                </SoftTypography>
              </SoftBox>
              <SoftInput
                name="password"
                type="password"
                placeholder="Ingresa tu contraseña."
                value={formData.password}
                onChange={handleChange}
                required
              />
            </SoftBox>
            <SoftBox display="flex" alignItems="center">
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;Recuerdame.
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="info" fullWidth onClick={handleSignIn}>
                Ingresar
              </SoftButton>
            </SoftBox>
            {/* <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Don&apos;t have an account?{" "}
                <SoftTypography
                  component={Link}
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </SoftTypography>
              </SoftTypography>
            </SoftBox> */}
          </SoftBox>
        </CoverLayout>
      </Box>
    </Box>
  );
}

export default SignIn;
