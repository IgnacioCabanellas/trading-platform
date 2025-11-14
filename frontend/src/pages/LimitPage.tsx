import { useEffect, useState } from "react";
import Table from "../components/UI/Table.tsx";
import Navbar from "../components/navbar.tsx";
import { limitColumns } from "../components/UI/tableColumns/limitColumns.ts";

export default function LimitPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/limit")
      .then((r) => r.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar/>
      <div>
        <Table columns={limitColumns} data={data} />
      </div>
    </div>
  );
}