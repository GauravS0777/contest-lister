import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import axios from "axios";

export const ContestsTable = ({ site }) => {
  const [contestsList, setContestsList] = useState([]);

  const fetchContestsList = async () => {
    console.log(`https://kontests.net/api/v1/${site}`);
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
      value = { ...value, duration: d };
      return value;
    });
    data.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
    setContestsList(data);
  };

  useEffect(() => {
    fetchContestsList();
  }, [site]);

  return (
    <TableContainer component={Paper} sx={{ marginTop: 5 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Site</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
            <TableCell align="right">Start Time</TableCell>
            <TableCell align="right">End Time</TableCell>
            <TableCell align="right">Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contestsList.map((value, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Link href={value.url} target="_blank">
                  {value.name}
                </Link>
              </TableCell>
              <TableCell align="right">
                {value.site !== undefined
                  ? value.site
                  : site
                      .split("_")
                      .map((txt) => txt.charAt(0).toUpperCase() + txt.slice(1))
                      .join("")}
              </TableCell>
              <TableCell align="right">
                {value.start_time.substring(0, 10)}
              </TableCell>
              <TableCell align="right">
                {value.end_time.substring(0, 10)}
              </TableCell>
              <TableCell align="right">
                {value.start_time.substring(11, 16)}
              </TableCell>
              <TableCell align="right">
                {value.end_time.substring(11, 16)}
              </TableCell>
              <TableCell align="right">{value.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
