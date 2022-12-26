import { useState } from "react";
import { SiteSelector } from "./components/SiteSelector";
import { ContestLister } from "./components/ContestLister";

function App() {
  const [site, setSite] = useState("all");

  return (
    <>
      <SiteSelector site={site} setSite={setSite} />
      <ContestLister site={site} />
    </>
  );
}

export default App;
