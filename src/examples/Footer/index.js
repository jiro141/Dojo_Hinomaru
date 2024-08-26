
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

function Footer({ company, links }) {
  // const { href, name } = company;
  const { size } = typography;


  return (
    <SoftBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="center"
      alignItems="center"
      px={1.5}
    >
      <SoftBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}, Costruido por 
        <Link to={'https://detipcompany.com/'} target="_blank">
          <SoftTypography variant="button" fontWeight="medium">
            &nbsp;Detip Company&nbsp;.
          </SoftTypography>
        </Link>
      </SoftBox>
    </SoftBox>
  );
}


// Typechecking props for the Footer
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
