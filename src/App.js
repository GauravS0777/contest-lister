import { useState } from "react";
import { SiteSelector } from "./components/SiteSelector";
import { ContestsTable } from "./components/ContestsTable";

function App() {
  const [site, setSite] = useState("all");

  return (
    <>
      <SiteSelector site={site} setSite={setSite} />
      <ContestsTable site={site} />
    </>
  );
}

export default App;
