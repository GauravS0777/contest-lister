import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import axios from "axios";

export const SiteSelector = ({ site, setSite }) => {
  const [sitesList, setSitesList] = useState([]);

  const handleChange = (event) => {
    setSite(event.target.value);
  };

  const fetchSitesList = async () => {
    const res = await axios.get("https://kontests.net/api/v1/sites");
    res.data = res.data.filter(
      (value) => value[0] !== "Toph" && value[0] !== "CodeForces::Gym"
    );
    setSitesList(res.data);
  };

  useEffect(() => {
    fetchSitesList();
  }, []);

  return (
    <Box sx={{ minWidth: 120, maxWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Site</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={site}
          label="Site"
          onChange={handleChange}
        >
          {/* <MenuItem value={10}>Ten</MenuItem> */}
          <MenuItem value="all">All</MenuItem>
          {sitesList.map((value, index) => {
            return (
              <MenuItem key={index} value={value[1]}>
                {value[0]}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
