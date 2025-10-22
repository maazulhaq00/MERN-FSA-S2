import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

import Group from "@mui/icons-material/Group";
import Event from "@mui/icons-material/Event";
import Store from "@mui/icons-material/Store";
import AccessTime from "@mui/icons-material/AccessTime";
import ArrowRightAlt from "@mui/icons-material/ArrowRightAlt";
import { Small } from "app/components/Typography";

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "24px !important",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: { padding: "16px !important" }
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  "& small": { color: theme.palette.text.secondary },
  "& .icon": { opacity: 0.6, fontSize: "44px", color: theme.palette.primary.main }
}));

const Heading = styled("h6")(({ theme }) => ({
  margin: 0,
  marginTop: "4px",
  fontSize: "14px",
  fontWeight: "500",
  color: theme.palette.primary.main
}));

export default function StatCards() {
  const [stats, setStats] = useState({
    users: 0,
    events: 0,
    booths: 0,
    sessions: 0
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get("http://localhost:1308/dashboard/summary");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch summary:", err);
      }
    };
    fetchSummary();
  }, []);

  const cardList = [
    { name: "Total Users", amount: stats.users, Icon: Group, link: "/dashboard/viewallusers" },
    { name: "Total Events", amount: stats.events, Icon: Event, link: "/dashboard/viewallexpos" },
    { name: "Total Booths", amount: stats.booths, Icon: Store, link: "/dashboard/viewallbooths" },
    { name: "Total Sessions", amount: stats.sessions, Icon: AccessTime, link: "/dashboard/viewallschedule" }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: "24px" }}>
      {cardList.map(({ amount, Icon, name, link }) => (
        <Grid item md={6} xs={12} key={name}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon" />
              <Box ml="12px">
                <Small>{name}</Small>
                <Heading>{amount}</Heading>
              </Box>
            </ContentBox>

            <Tooltip title="View Details" placement="top">
              <Link to={link}>
                <IconButton>
                  <ArrowRightAlt />
                </IconButton>
              </Link>
            </Tooltip>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
}
