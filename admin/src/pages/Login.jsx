import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
  const [state, setState] = useState("Admin");
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Demo credential constants
  const demoAdmin = {
    email: "admin@prescripto.com",
    password: "admin123",
  };

  const demoDoctor = {
    email: "demo-doctor@prescripto.com",
    password: "PrescriptoDemo123",
  };

  const currentDemo = state === "Admin" ? demoAdmin : demoDoctor;

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email: email.trim(),
          password: password.trim(),
        });

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success("Admin login successful");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email: email.trim(),
          password: password.trim(),
        });

        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          toast.success("Doctor login successful");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 1-Click instant direct login for fast website viewing
  const handleDirectDemoLogin = async (roleToLogin) => {
    const targetRole = roleToLogin || state;
    setState(targetRole);

    const creds = targetRole === "Admin" ? demoAdmin : demoDoctor;
    setEmail(creds.email);
    setPassword(creds.password);
    setIsLoading(true);

    try {
      if (targetRole === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email: creds.email,
          password: creds.password,
        });

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          toast.success("Logged in as Admin (Demo)");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email: creds.email,
          password: creds.password,
        });

        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          toast.success("Logged in as Doctor (Demo)");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Autofill fields without immediate submit
  const handleAutofill = (targetRole) => {
    const role = targetRole || state;
    setState(role);
    const creds = role === "Admin" ? demoAdmin : demoDoctor;
    setEmail(creds.email);
    setPassword(creds.password);
    toast.info(`Filled ${role} demo credentials`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50/60">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-xl p-6 sm:p-8 text-gray-700">
        {/* Top Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-[#0D9488] text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Management Portal</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Prescripto Login
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Access administrative controls or doctor consultation dashboard
          </p>
        </div>

        {/* Top Options / Segmented Role Switcher */}
        <div className="flex w-full p-1 bg-gray-100 rounded-xl mb-5 text-sm font-semibold">
          <button
            type="button"
            onClick={() => {
              setState("Admin");
              setEmail("");
              setPassword("");
            }}
            className={`flex-1 py-2.5 rounded-lg transition-all ${
              state === "Admin"
                ? "bg-[#0D9488] text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Admin Login
          </button>
          <button
            type="button"
            onClick={() => {
              setState("Doctor");
              setEmail("");
              setPassword("");
            }}
            className={`flex-1 py-2.5 rounded-lg transition-all ${
              state === "Doctor"
                ? "bg-[#0D9488] text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Doctor Login
          </button>
        </div>

        {/* Demo Credentials Box at the Top for Fast Website Viewing */}
        <div className="bg-teal-50/70 border border-teal-200 rounded-xl p-4 mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#0D9488] uppercase tracking-wide flex items-center gap-1.5">
              <span>⚡</span> Demo Credentials ({state})
            </span>
            <button
              type="button"
              onClick={() => handleAutofill(state)}
              className="text-[11px] text-[#0D9488] hover:underline font-semibold"
            >
              Autofill Form
            </button>
          </div>

          <div className="space-y-1 text-xs text-gray-600 bg-white/90 p-2.5 rounded-lg border border-teal-100 font-mono">
            <p className="flex justify-between">
              <span className="text-gray-400 font-sans">Email:</span>
              <span className="font-semibold text-gray-800">{currentDemo.email}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-400 font-sans">Password:</span>
              <span className="font-semibold text-gray-800">{currentDemo.password}</span>
            </p>
          </div>

          {/* 1-Click Direct Login Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleDirectDemoLogin("Admin")}
              className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all text-center ${
                state === "Admin"
                  ? "bg-[#0D9488] text-white border-[#0D9488] hover:bg-[#0f766e] shadow-sm"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
            >
              ⚡ 1-Click Admin
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleDirectDemoLogin("Doctor")}
              className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all text-center ${
                state === "Doctor"
                  ? "bg-[#0D9488] text-white border-[#0D9488] hover:bg-[#0f766e] shadow-sm"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
            >
              ⚡ 1-Click Doctor
            </button>
          </div>
        </div>

        {/* Manual Login Form */}
        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
              {state} Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-[#0D9488] focus:ring-2 focus:ring-teal-100 outline-none text-sm transition-all"
              type="email"
              placeholder={currentDemo.email}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:border-[#0D9488] focus:ring-2 focus:ring-teal-100 outline-none text-sm transition-all"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-[#0D9488] hover:bg-[#0f766e] text-white font-semibold text-sm shadow-md transition-all active:scale-[0.99] disabled:opacity-70"
          >
            {isLoading ? "Signing In..." : `Login as ${state}`}
          </button>
        </form>

        {/* Bottom Switch Note */}
        <div className="mt-5 text-center text-xs text-gray-500">
          Switch portal:{" "}
          <button
            type="button"
            onClick={() => {
              const nextState = state === "Admin" ? "Doctor" : "Admin";
              setState(nextState);
              setEmail("");
              setPassword("");
            }}
            className="text-[#0D9488] font-bold hover:underline"
          >
            Go to {state === "Admin" ? "Doctor Login" : "Admin Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
