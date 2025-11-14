import { useEffect, useState } from "react";
import Table from "../components/UI/Table.tsx";
import Navbar from "../components/navbar.tsx";
import { useAssetColumns } from "../components/UI/tableColumns/assetColumns.tsx";
import { useNavigate } from "react-router-dom";

export default function AssetPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const columns = useAssetColumns();

  useEffect(() => {
    fetch("http://localhost:3000/api/asset")
      .then((r) => r.json())
      .then((json) => setData(json));
  }, []);

  const newAsset = () => navigate("/asset-form");

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <div>
        <Table columns={columns} data={data} />
      </div>
      <div className="p-4">
        <button onClick={newAsset} className="btn btn-primary font-bold">+</button>
      </div>
    </div>
  );
}