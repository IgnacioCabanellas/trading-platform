import { useEffect, useState } from "react";
import Table from "../components/UI/Table.tsx";
import Navbar from "../components/navbar.tsx";
import { tradingPairColumns } from "../components/UI/tableColumns/tradingPairColumns.ts";

export default function TradingPairPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/trading-pair")
      .then((r) => r.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar/>
      <div>
        <Table columns={tradingPairColumns} data={data} />
      </div>
    </div>
  );
}