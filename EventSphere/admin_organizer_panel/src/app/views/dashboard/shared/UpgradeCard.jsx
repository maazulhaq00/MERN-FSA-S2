import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

// STYLED COMPONENTS
const CardRoot = styled(Card)(({ theme }) => ({
  marginBottom: "24px",
  padding: "24px !important",
  [theme.breakpoints.down("sm")]: { paddingLeft: "16px !important" }
}));

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  position: "relative",
  padding: "24px !important",
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  [theme.breakpoints.down("sm")]: { padding: "16px !important" }
}));

const Paragraph = styled("p")(({ theme }) => ({
  margin: 0,
  paddingTop: "24px",
  paddingBottom: "24px",
  color: theme.palette.text.secondary
}));

export default function UpgradeCard() {
  return (
    <CardRoot>
      <StyledCard elevation={0}>
        <br></br>


        <NavLink to="/dashboard/profile">
        <Button
          size="large"
          color="primary"
          variant="contained"
          sx={{ textTransform: "uppercase" }}>
          My Profile
        </Button>
        </NavLink>
        <br></br>
        <br></br>
        <br></br>
        

         <NavLink to="/dashboard/logout">
         <Button
          size="large"
          color="primary"
          variant="contained"
          sx={{ textTransform: "uppercase" }}>
          Logout
        </Button>
        </NavLink>
        <br></br>

      </StyledCard>
    </CardRoot>
  );
}
