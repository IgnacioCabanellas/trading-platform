import { useEffect, useState } from "react";

export default function Home() {
    const [jwt, setJsw] = useState<string | null>(null);
    useEffect(() => {
        const storedJwt = localStorage.getItem("jwt");
        setJsw(storedJwt);
    }, []);

    return (
        <div>
            <h1>WELCOME TO THE JUNGLE - Your token will be shown below</h1>
            <p>{jwt}</p>
        </div>
    )
}