"use client";
import { useState } from "react";
import { loginUser } from "../../../actions/userActions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = await loginUser(username, password);
    if (data.success) {
      toast.success("User logged in successfully");
      setIsLoading(false);
      localStorage.setItem("token", data.token);
      router.push("/");
    } else {
      setIsLoading(false);
      console.log(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          {isLoading ? (
            <button
              type="submit"
              className="bg-blue-400 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-300"
              disabled>
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300">
              Login
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
