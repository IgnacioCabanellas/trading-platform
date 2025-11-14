import { useEffect, useState } from "react";
import GraphTotalAssets from "../components/UI/GraphTotalAssets.tsx";
import Navbar from "../components/navbar.tsx";

export default function UserPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/user")
      .then((r) => r.json())
      .then((json) => setData(json));
  }, []);

  const newOrder = () => null;

  return (
    <div className="min-h-screen bg-base-100">
        <Navbar/>
        <div className="p-10 pb-4">
            <GraphTotalAssets total={123}/>
        </div>
        <div className="p-10 pl-14 pt-2">
            <button onClick={newOrder} className="btn btn-primary ml-2">New Order</button>
        </div>
    </div>
  );
}