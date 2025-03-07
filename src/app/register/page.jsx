"use client";
import { useState } from "react";
import { RegisterUser } from "../../../actions/userActions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User, Mail, Lock } from "lucide-react";

function Register() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await RegisterUser(username, email, password);
      if (data.success) {
        toast.success("User registered successfully");
        router.push("/");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error("An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-ternary min-h-screen py-12 flex justify-center px-4">
      <div className="w-full md:w-[80%]">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-accent titlefont">
            Create an Account
          </h1>
          <p className="text-secondary mt-2">Join the LDC Community today</p>
        </div>
        <div className="bg-[#2c1810] mx-auto w-[50%] rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-accent text-sm font-medium">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-accent" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-[#3d2517] border border-[#e6bc84] rounded-xl 
                  text-secondary placeholder-[#f5e6d3]/50 focus:outline-none focus:ring-2 focus:ring-[#e6bc84]"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-accent text-sm font-medium">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-accent" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-[#3d2517] border border-[#e6bc84] rounded-xl 
                  text-secondary placeholder-[#f5e6d3]/50 focus:outline-none focus:ring-2 focus:ring-[#e6bc84]"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-accent text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-accent" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-[#3d2517] border border-[#e6bc84] rounded-xl 
                  text-secondary placeholder-[#f5e6d3]/50 focus:outline-none focus:ring-2 focus:ring-[#e6bc84]"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-xl text-[#2c1810] font-medium
                ${
                  isLoading
                    ? "bg-[#e6bc84]/70 cursor-not-allowed"
                    : "bg-accent hover:bg-[#e6bc84]/90 transform hover:scale-[1.02] transition-all duration-200"
                }`}>
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-secondary/70 text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-accent hover:text-accent/80">
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
