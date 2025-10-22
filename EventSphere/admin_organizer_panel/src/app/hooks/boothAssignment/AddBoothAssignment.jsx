import { Stack } from "@mui/material";
import {  styled } from "@mui/material";
import {  SimpleCard } from "app/components";
import AddExpoForm from "../components/AddExpoForm";
import BoothAssignForm from "../components/BoothAssignForm";


// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function AddBoothAssign() {
  return (
    <Container>
     

      <Stack spacing={3}>
        <SimpleCard title="Booth Assign to Exhibitor">
     <BoothAssignForm/>
        </SimpleCard>

       
      </Stack>
    </Container>
  );
}


