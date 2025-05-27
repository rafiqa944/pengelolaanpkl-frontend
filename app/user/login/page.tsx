'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation'
import Image from "next/image";
import Link from "next/link";
import {
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleLogin = async () => {
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Email dan Password harus diisi");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", 
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Login gagal");
      }

      const data = await response.json();
      console.log("Login sukses:", data);

      alert("Login Berhasil");
      router.push('/home');
    } catch (error: any) {
      console.error("Login error:", error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div
      className="relative h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/bg-image.png')" }}
    >
      <div className="absolute left-0 top-0 w-2/5 h-full bg-primary justify-center items-center">
        <div className="flex justify-center items-center mt-16">
          <Image
            src="/assets/SIP-White.png" 
            alt="SIP"
            width={100}
            height={100}
            className="h-16 w-auto"
          />
        </div>

        <div className="absolute left-14 top-1/2 transform -translate-y-1/2 w-5/6 bg-zinc-100 flex flex-col rounded-2xl justify-center px-12 py-10">
          <h1 className="text-2xl font-bold mb-2">Selamat Datang Kembali!</h1>
          <h1 className="text-2xl font-bold mb-6">Silahkan Login</h1>

          <div className="space-y-4">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              error={!!errorMessage}
              helperText={errorMessage}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage("");
              }}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={password}
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={handleShowPassword}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage("");
              }}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
              sx={{
                backgroundColor: "#C40000",
                borderRadius: "15px",
                "&:hover": {
                  backgroundColor: "darkred",
                },
                textTransform: "none",
                color: "white",
              }}
              className="!font-bold !text-lg !shadow-lg"
            >
              Sign In
            </Button>

            <div className="flex items-center justify-center font-semibold text-sm">
              Belum Memiliki Akun? Silahkan
              <Link href="/user/register" className="ml-2 text-primary underline">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
