import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevents page reload

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ Login successful:", data);
        // e.g. save JWT token:
        localStorage.setItem("jwt", data.jwt);
        navigate("/");
        // redirect user:
        // window.location.href = "/dashboard";
      } else {
        console.error("❌ Login failed:", data.message);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
  
    return ( 
    <div
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/green-matrix-background-2560x1600-wallpaper.jpg')" }}
    >
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-green-900 border-black border-2 p-10 rounded">
                <h2 className="font-black text-black"> - Wanna Trade??</h2>
                <h2 className="font-black text-black"> - Let's log in, you punk.</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-white mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                            required
                        />
                    </div>
                    <div className="pb-2">
                        <label htmlFor="password" className="block text-white mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Log in</button>
                    <div className="text-sm pt-2 text-gray-500">Don’t have an account?{" "}
                    <a href="/register" className="text-indigo-600 hover:underline">
                        Register
                    </a>
                    </div>
                </form>
            </div>    
        </div>
    </div>
    )
}