import { Container, Typography } from "@mui/material";
import Link from "@mui/material/Link";

export const ContestCard = ({ details }) => {
  return (
    <Container
      sx={{
        padding: "5px",
        margin: "10px 0",
        backgroundColor: "#dff2ff",
      }}
    >
      <Typography align="center">{details.site}</Typography>
      <Link href={details.url} target="_blank">
        <Typography variant="h6" align="center">
          {details.name}
        </Typography>
      </Link>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            marginRight: "10px",
          }}
        >
          {details.start_date}
        </Typography>
        <Typography> {details.start_time}</Typography>
      </div>
      <Typography align="center">{details.duration}</Typography>
    </Container>
  );
};
