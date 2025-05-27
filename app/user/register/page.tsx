'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation'; 
import Image from "next/image";
import Link from "next/link";
import { Visibility, VisibilityOff} from "@mui/icons-material";
import { IconButton, TextField, Button} from "@mui/material";

export default function Register() {
  const router = useRouter();
  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setData((prev) => ({ ...prev, password: value }));

    if (data.confirmPassword && value !== data.confirmPassword) {
      setConfirmPasswordError("Passwords tidak cocok");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setData((prev) => ({ ...prev, confirmPassword: value }));

    if (value !== data.password) {
      setConfirmPasswordError("Passwords tidak cocok");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleShowPassword = () => setShowPassword((prev) => !prev);
  const handleShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

const handleSignUp = async () => {
  if (data.password !== data.confirmPassword) {
    setConfirmPasswordError("Password tidak cocok");
    return;
  }

  try {
    const response = await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nama_lengkap: data.fullname,
        email: data.email,
        password: data.email + data.password, 
      }),
    });

    if (!response.ok) {
      throw new Error('Gagal register');
    }

    const result = await response.json();
    alert('Register berhasil! ID user: ' + result.id);
    router.push('/user/login');
  } catch (error: any) {
    console.error('Error:', error);
    setErrorMessage('Terjadi kesalahan saat register.');
  }
};


  return (
    <div
      className="relative h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/bg-image.png')" }}
    >
      <div className="absolute left-0 top-0 w-2/5 h-full bg-primary">
        <div className="flex justify-center items-center mt-10">
          <Image
            src="/assets/SIP-White.png"
            alt="SIP"
            width={100}
            height={100}
            className="h-16 w-auto"
          />
        </div>

        <div className="absolute left-14 top-2/4 transform -translate-y-64 w-5/6 bg-zinc-100 flex flex-col rounded-2xl justify-center px-12 py-10">
          <h1 className="text-2xl font-bold mb-2">Selamat Datang !</h1>
          <h1 className="text-2xl font-bold mb-6">Silahkan buat akun anda</h1>

          <div className="space-y-4">
            <TextField
              variant="outlined"
              label="Nama Lengkap"
              fullWidth
              value={data.fullname}
              onChange={(e) => setData({ ...data, fullname: e.target.value })}
            />
            <TextField
              variant="outlined"
              label="Email"
              fullWidth
              value={data.email}
              error={!!errorMessage}
              helperText={errorMessage}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              value={data.password}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
              onChange={handlePasswordChange}
            />
            <TextField
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              value={data.confirmPassword}
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleShowConfirmPassword} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
              onChange={handleConfirmPasswordChange}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleSignUp}
              sx={{
                backgroundColor: "#C40000",
                borderRadius: "15px",
                "&:hover": {
                  backgroundColor: "darkred",
                },
                textTransform: "none",
                color: "white",
              }}
              className="!font-bold !text-lg !shadow-lg !shadow-primary/50"
            >
              Sign Up
            </Button>

            <div className="flex items-center justify-center font-semibold text-sm">
              Sudah Memiliki Akun? Silahkan
              <Link href="/user/login" className="ml-2 text-primary underline">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
