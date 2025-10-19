import { useState } from "react";

export default function Register () {
    const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // Prevents page reload

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: formData.email, password: formData.password}),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("✅ User created successfully.");
    } else {
      console.error("❌ User creation failed.", data.message);
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
            <div className="bg-green-900 border-black border-2 p-10 pt-6 rounded">
                <form onSubmit={handleSubmit}>
                    <h2 className="font-bold">Register Form</h2>
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
                    <div>
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
                    <div className="pb-2">
                        <label htmlFor="confirmPassword" className="block text-white mb-1">
                                    Password again
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    required
                                />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                    <a href="/" className="btn btn-secondary ml-2">Go back</a>
                </form>
            </div>
        </div>
    </div>
    )
}
