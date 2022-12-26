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
      <Typography align="center">
        {details.start_time.substring(0, 10)}
      </Typography>
      <Typography align="center">{details.duration}</Typography>
    </Container>
  );
};
