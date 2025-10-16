import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [jwt, setJsw] = useState<string | null>(null);
    useEffect(() => {
        const storedJwt = localStorage.getItem("jwt");
        setJsw(storedJwt);
    }, []);
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("jwt");
        navigate("/"); 
    }

    return (
        <div className="flex flex-col p-4">
            <h1 className="pb-10">WELCOME TO THE JUNGLE - Your token will be shown below</h1>
            <p>{jwt}</p>
            <div className="pl-10 pt-10">
                <form onClick={logout}>
                    <button type="submit" className="btn btn-error"> Log Out</button>
                </form>
            </div>
        </div>
    )
}