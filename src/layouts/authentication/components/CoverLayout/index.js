import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";

// Authentication layout components
import Footer from "layouts/authentication/components/Footer";
import { Box } from "@mui/material";

function CoverLayout({ color, header, title, description, image, top, children, logo, bg }) {
  console.log(logo);

  return (
    <PageLayout background='while'>
      <Grid
        container
        justifyContent="center"
        sx={{
          minHeight: "75vh",
          margin: 0,
        }}
      >
        <Grid item xs={11} sm={8} md={5} xl={3}>
          <SoftBox mt={"2vh"}>
            <SoftBox pt={3} px={3}>
              {!header ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{
                      maxHeight: "20vh",
                    }}
                  />
                </div>
              ) : (
                header
              )}
            </SoftBox>
            <SoftBox p={3}>{children}</SoftBox>
          </SoftBox>
        </Grid>
        <Grid item xs={12} md={5}>
          <SoftBox
            height="100%"
            display={{ xs: "none", md: "block" }}
            position="relative"
            right={{ md: "-12rem", xl: "-10rem" }}
            mr={-16}
            sx={{
              // transform: "skewX(-10deg)",
              overflow: "hidden",
              borderBottomLeftRadius: ({ borders: { borderRadius } }) => borderRadius.lg,
            }}
          >
            <SoftBox
              ml={-8}
              height="100%"
              sx={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                transform: "skewX(deg)",
              }}
            />
          </SoftBox>
        </Grid>
      </Grid>
      <Footer />
    </PageLayout>
  );
}

CoverLayout.propTypes = {
  logo: PropTypes.string.isRequired,
  bg: PropTypes.string.isRequired,
};

// Si logo no es requerido, puedes usar:
CoverLayout.propTypes = {
  logo: PropTypes.string, 
  bg: PropTypes.string.isRequired,
};
// Setting default values for the props of CoverLayout
CoverLayout.defaultProps = {
  header: "",
  title: "",
  description: "",
  color: "info",
  top: 20,
};

// Typechecking props for the CoverLayout
CoverLayout.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  top: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default CoverLayout;
