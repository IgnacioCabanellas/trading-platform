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
            <form onSubmit={handleSubmit}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <h2 className=""> Trading-Platform</h2>
                    <label className="label">Email</label>
                    <input 
                        type="email" 
                        name="email"
                        className="input"
                        value={formData.email}
                        onChange={handleChange} 
                        placeholder="Email" />

                    <label className="label">Password</label>
                    <input 
                        type="password" 
                        className="input" 
                        value={formData.password}
                        onChange={handleChange} 
                        placeholder="Password" 
                    />

                    <button type="submit" className="btn btn-neutral mt-4">Login</button>
                    <div className="text-sm pt-2 text-gray-500">Don’t have an account?{" "}
                        <a href="/register" className="text-indigo-600 hover:underline">
                            Register
                        </a>
                    </div>
                </fieldset>
            </form>
        </div>    
    </div>
    )
}
