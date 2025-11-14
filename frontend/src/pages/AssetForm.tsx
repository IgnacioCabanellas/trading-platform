import { useState } from "react";
import Navbar from "../components/navbar.tsx";
import { useNavigate } from "react-router-dom";

export default function AssetForm() {
  const navigate = useNavigate();

  const [symbol, setSymbol] = useState("");
  const [aName, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      symbol,
      name: aName,
      description,
    };

    try {
      const res = await fetch("http://localhost:3000/api/asset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

    const body = await res.text();
    console.log("Status:", res.status);
    console.log("Server response:", body);

      if (!res.ok) {
        throw new Error("Error creating asset");
      }

      navigate("/asset"); // Redirige a la tabla

    } catch (error) {
      console.error(error);
      alert("Error while saving asset");
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-xl font-bold mb-4">New Asset</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="symbol" className="font-semibold">
              Symbol:
            </label>
            <input
              type="text"
              id="symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              placeholder="Example: BTC, ETH..."
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label htmlFor="assetName" className="font-semibold">
              Name of the asset:
            </label>
            <input
              type="text"
              id="assetName"
              value={aName}
              onChange={(e) => setName(e.target.value)}
              placeholder="Bitcoin, Ethereum..."
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label htmlFor="description" className="font-semibold">
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Insert description here..."
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}