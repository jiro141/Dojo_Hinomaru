import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { Box } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import bcrypt from "bcryptjs";

// Imagenes
import curved9 from "assets/images/curved-images/curved-6.jpeg";
import logo from "assets/images/curved-images/logo.png";
import bg from "assets/images/curved-images/vecteezy_wave-style-japanese-pattern-background_6999783.avif";

function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(true);
  const navigate = useNavigate();

  const AIRTABLE_API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
  const AIRTABLE_BASE_URL = process.env.REACT_APP_AIRTABLE_BASE_ID;

  const handleSetRememberMe = useCallback(() => setRememberMe((prev) => !prev), []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await axios.get(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_URL}/Practicants`,
        {
          headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
          params: { filterByFormula: `{Email} = "${email}"` }, // Asegúrate de que el campo 'Email' coincida con el de Airtable
        }
      );

      const records = response.data.records;

      if (records.length > 0) {
        const user = records[0].fields;
        const selectedGrade = user["Selected Grade"];
        const fullName = user["Full Name"];
        const hashedPassword = user.password; // La contraseña almacenada es el hash

        // Usa bcrypt para comparar la contraseña ingresada con el hash almacenado
        const isPasswordValid = bcrypt.compareSync(password, hashedPassword);

        if (isPasswordValid) {
          // Guardar el grado y el nombre en localStorage
          localStorage.setItem("grade", selectedGrade[0]);
          localStorage.setItem("name", fullName);

          // Redirigir al dashboard
          navigate("/dashboard");
        } else {
          toast.error("Contraseña incorrecta.");
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
        position: "relative",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
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
          backgroundColor: "#eaeaeaf3",
          zIndex: 1,
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
              <SoftButton variant="gradient" color="info" fullWidth type="submit">
                Ingresar
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </CoverLayout>
      </Box>
    </Box>
  );
}

export default SignIn;
