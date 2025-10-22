import { Stack } from "@mui/material";
import {  styled } from "@mui/material";
import {  SimpleCard } from "app/components";
import UpdateBoothForm from "../components/UpdateBoothForm";


// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

export default function UpdateBooth() {
  return (
    <Container>
     

      <Stack spacing={3}>
        <SimpleCard title="Update Booth">
     <UpdateBoothForm/>
        </SimpleCard>

       
      </Stack>
    </Container>
  );
}


