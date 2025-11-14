import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Home() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const getAssets = () => navigate("/asset");
    const newAsset = () => navigate("/asset-form");

    const getLimits = () => navigate("/limit");
    const newLimit = () => navigate("/limit-form");

    const getUser = () => navigate("/user");
    const newUser = () => navigate("/register");

    const getTradingPairs = () => navigate("/trading-pairs");
    const newTradingPair = () => navigate("/trading-pairs-form");

    const getMovements = () => navigate("/movements");
    const newMovement = () => navigate("/movements-form");

    return (
        <div className="flex flex-col p-4">
            <h1 className="p-10 pb-2">
                TRADING-PLATFORM
            </h1>

            <div className="grid grid-cols-3 gap-6 p-10">
                <button onClick={getAssets} className="btn btn-success">GetAssets</button>
                <button onClick={newAsset} className="btn btn-disabled">NewAsset</button>
                <button className="btn btn-primary">Btn 3</button>

                <button onClick={getLimits} className="btn btn-success">GetLimits</button>
                <button onClick={newLimit} className="btn btn-disabled">NewLimit</button>
                <button className="btn btn-primary">Btn 6</button>

                <button onClick={getUser} className="btn btn-success">UserPage</button>
                <button onClick={newUser} className="btn btn-disabled">NewUser</button>
                <button className="btn btn-primary">Btn 9</button>

                <button onClick={getTradingPairs} className="btn btn-success">GetTradingPairs</button>
                <button onClick={newTradingPair} className="btn btn-disabled">NewTradingPair</button>
                <button className="btn btn-primary">Btn 12</button>

                <button onClick={getMovements} className="btn btn-success">GetMovements</button>
                <button onClick={newMovement} className="btn btn-disabled">NewMovement</button>
                <button onClick={logout} className="btn btn-error">Log Out</button>
            </div>
        </div>
    );
}