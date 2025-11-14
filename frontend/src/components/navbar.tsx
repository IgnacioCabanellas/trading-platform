import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth"; 

export default function Navbar() {
    const { logout } = useAuth();
    return (
    <div className="navbar bg-base-200 shadow-md px-4">
        <div className="flex-1">
        <Link to="/" className="text-xl font-bold">
            Trading Platform
        </Link>
        </div>

        <div className="flex gap-4">
        <Link to="/" className="btn btn-ghost">Home</Link>
        <Link to="/asset" className="btn btn-ghost">Assets</Link>
        <Link to="/user" className="btn btn-ghost">Movements</Link>
        <Link to="/orders" className="btn btn-ghost">MyOrders</Link>
        <button onClick={logout} className="btn btn-error">
            Log Out
        </button>
        </div>
    </div>
    );
}