import { useNavigate } from "react-router-dom";

export const useAssetColumns = () => {
  const navigate = useNavigate();
  const deleteAsset = async (id: number) => {
    await fetch(`http://localhost:3000/api/asset/${id}`, { method: "DELETE" });
    window.location.reload();
  };

  return [
    { key: "id", label: "ID", hidden: true },
    { key: "symbol", label: "Symbol" },
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },

    {
      key: "actions",
      label: "Actions",
      cell: (row) => (
        <div className="flex gap-2">

          <button
            className="btn btn-xs btn-success"
            onClick={() => navigate(`/order-form/${row.id}`)}
          >
            New Order
          </button>

          <button
            className="btn btn-xs btn-warning"
            onClick={() => navigate(`/asset-form/${row.id}`)}
          >
            Edit
          </button>

          <button
            className="btn btn-xs btn-error"
            onClick={() => deleteAsset(row.id)}
          >
            Delete
          </button>

        </div>
      ),
    },
  ];
};