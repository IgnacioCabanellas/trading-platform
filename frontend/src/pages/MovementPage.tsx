import { useEffect, useState } from "react";
import Table from "../components/UI/Table.tsx";
import Navbar from "../components/navbar.tsx";
import { movementsColumns } from "../components/UI/tableColumns/movementsColumns.ts";

export default function MovementsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/movements")
      .then((r) => r.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar/>
      <div>
        <Table columns={movementsColumns} data={data} />
      </div>
    </div>
  );
}