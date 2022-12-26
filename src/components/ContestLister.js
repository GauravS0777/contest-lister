import { useEffect, useState } from "react";
import axios from "axios";
import { ContestCard } from "./ContestCard";
import { ContestTable } from "./ContestTable";
import { Container } from "@mui/material";
import ReactLoading from "react-loading";

export const ContestLister = ({ site }) => {
  const [loading, setLoading] = useState(false);
  const [contestsList, setContestsList] = useState([]);

  const fetchContestsList = async () => {
    setLoading(true);
    const res = await axios.get(`https://kontests.net/api/v1/${site}`);
    let data = res.data;
    data = data.map((value) => {
      let d = parseInt(value.duration) / 3600;
      if (d >= 24) {
        d = parseInt(d / 24);
        d = `${d} days`;
      } else {
        if (d % 0.5 !== 0) {
          d = d.toFixed(2);
        }
        d = `${d} hours`;
      }

      let s = value.site;
      if (!value.site) {
        s = site
          .split("_")
          .map((txt) => txt.charAt(0).toUpperCase() + txt.slice(1))
          .join("");
      }

      value = { ...value, duration: d, site: s };
      return value;
    });
    data.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
    setContestsList(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchContestsList();
  }, [site]);

  return (
    <>
      {loading ? (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "200px",
          }}
        >
          <ReactLoading type="spin" color="#000000" height={60} width={60} />
        </Container>
      ) : (
        <>
          <Container
            maxWidth={false}
            sx={{
              marginTop: 5,
              display: { xs: "none", md: "block" },
            }}
          >
            <ContestTable site={site}>{contestsList}</ContestTable>
          </Container>
          <Container
            sx={{ maxWidth: "500px", display: { xs: "block", md: "none" } }}
          >
            {contestsList.map((value, index) => (
              <ContestCard key={index} details={value} />
            ))}
          </Container>
        </>
      )}
    </>
  );
};
