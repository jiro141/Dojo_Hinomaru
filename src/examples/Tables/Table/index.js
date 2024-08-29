import { useMemo, useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// uuid is a library for generating unique id
import { v4 as uuidv4 } from "uuid";

// @mui material components
import { Table as MuiTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftAvatar from "components/SoftAvatar";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

function Table({ columns, rows }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleEditClick = (id) => {
    setSelectedId(id);
    console.log("Selected ID:", id);
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
  console.log(gradeColors);

  const getTextColor = (backgroundColor) => {
    // Determina si se necesita texto blanco o negro basado en el color de fondo
    const darkColors = ["#000000", "#4c0000", "#336600", "#ce4f0e", "#0072c6", "#FDBA31"];
    return darkColors.includes(backgroundColor) ? "#FFFFFF" : "#000000";
  };

  const { light } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  const renderColumns = columns.map(({ name, align, width }, key) => {
    let pl;
    let pr;

    if (key === 0) {
      pl = 3;
      pr = 3;
    } else if (key === columns.length - 1) {
      pl = 3;
      pr = 3;
    } else {
      pl = 1;
      pr = 1;
    }

    return (
      <SoftBox
        key={name}
        component="th"
        width={width || "auto"}
        pt={1.5}
        pb={1.25}
        pl={align === "left" ? pl : 3}
        pr={align === "right" ? pr : 3}
        textAlign={align}
        fontSize={size.xxs}
        fontWeight={fontWeightBold}
        color="secondary"
        opacity={0.7}
        borderBottom={`${borderWidth[1]} solid ${light.main}`}
      >
        {name.toUpperCase()}
      </SoftBox>
    );
  });

  const renderRows = rows.map((row, key) => {
    const rowKey = `row-${key}`;
    const tableRow = columns.map(({ name, align, id }, columnIndex) => {
      let template;

      if (id === "grade") {
        const gradeIndex = row.step ? parseInt(row.step) - 1 : -1;
        const backgroundColor =
          gradeIndex >= 0 && gradeIndex < gradeColors.length ? gradeColors[gradeIndex] : "#000";
        const textColor = getTextColor(backgroundColor);

        template = (
          <td
            key={uuidv4()}
            style={{
              padding: "8px",
              textAlign: align,
              borderBottom: row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null,
            }}
          >
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
              {row.grade}
            </div>
          </td>
        );
      } else if (id === "action") {
        template = (
          <td
            key={uuidv4()}
            style={{
              padding: "8px",
              textAlign: align,
              borderBottom: row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null,
            }}
          >
            <button
              style={{
                background: "none",
                border: "none",
                padding: "0",
                margin: "0",
                cursor: "pointer",
              }}
              onClick={() => handleEditClick(row.id)}
            >
              <EditIcon style={{ color: "inherit" }} />
            </button>
          </td>
        );
      } else {
        template = (
          <SoftBox
            key={uuidv4()}
            component="td"
            p={1}
            borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
          >
            <SoftBox display="flex" alignItems="center" py={0.5} px={1}>
              {columnIndex === 0 ? (
                <SoftBox mr={2}>
                  <SoftAvatar src={row.image} name={row[name]} variant="rounded" size="sm" />
                </SoftBox>
              ) : null}
              <SoftTypography variant="button" fontWeight="medium" sx={{ width: "max-content" }}>
                {row[id] ? (row[id].length > 15 ? `${row[id].slice(0, 20)}...` : row[id]) : ""}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        );
      }

      return template;
    });

    return <TableRow key={rowKey}>{tableRow}</TableRow>;
  });

  return useMemo(
    () => (
      <TableContainer>
        <MuiTable>
          <SoftBox component="thead">
            <TableRow>{renderColumns}</TableRow>
          </SoftBox>
          <TableBody>{renderRows}</TableBody>
        </MuiTable>
      </TableContainer>
    ),
    [columns, rows]
  );
}

// Setting default values for the props of Table
Table.defaultProps = {
  columns: [],
  rows: [{}],
};

// Typechecking props for the Table
Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default Table;
