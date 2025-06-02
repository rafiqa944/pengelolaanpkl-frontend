'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import {
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const AdminLoginPage = () => {
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
      const response = await fetch("http://localhost:3001/auth/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login gagal");
      }

      alert("Login Admin Berhasil");
      router.push('/admin/dashboard');
    } catch (error: any) {
      console.error("Login error:", error.message);
      setErrorMessage(error.message);
    }
  };

  

 return (
    <div className="min-h-screen w-screen bg-red-700 flex items-center justify-center">
      <div className="w-full max-w-xl bg-zinc-100 rounded-2xl shadow-lg px-10 py-10">
        <div className="flex justify-center mb-6">
          <Image
            src="/assets/SIP-Red.png"
            alt="SIP"
            width={100}
            height={100}
            className="h-16 w-auto"
          />
        </div>

        <h1 className="text-2xl font-bold mb-2 text-center">Selamat Datang Admin!</h1>
        <h1 className="text-2xl font-bold mb-6 text-center">Silahkan Login</h1>

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
              setErrorMessage('');
            }}
          />

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
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
              setErrorMessage('');
            }}
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            sx={{
              backgroundColor: '#C40000',
              borderRadius: '15px',
              '&:hover': {
                backgroundColor: 'darkred',
              },
              textTransform: 'none',
              color: 'white',
            }}
            className="!font-bold !text-lg !shadow-lg"
          >
            Login Admin
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
