"use client";
import { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Sidebar from "@/components/sidebar";

Chart.register(...registerables);

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [totalPengajuan, setTotalPengajuan] = useState(0);
  const [totalDisetujui, setTotalDisetujui] = useState(0);
  const [totalDitolak, setTotalDitolak] = useState(0);
  const [totalMenunggu, setTotalMenunggu] = useState(0);
  const [totalLaporan, setTotalLaporan] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/dashboard");
        const data = await res.json();

        setTotalPengajuan(data.totalPengajuan);
        setTotalDisetujui(data.totalDisetujui);
        setTotalDitolak(data.totalDitolak);
        setTotalMenunggu(data.totalMenunggu);
        setTotalLaporan(data.totalLaporan);
      } catch (err) {
        console.error("Gagal memuat data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const barData = {
    labels: ["Disetujui", "Menunggu", "Ditolak"],
    datasets: [
      {
        label: "Status Pengajuan",
        data: [totalDisetujui, totalMenunggu, totalDitolak],
        backgroundColor: ["#4caf50", "#ffc107", "#f44336"],
      },
    ],
  };

  const doughnutData = {
    labels: ["Pengajuan", "Laporan"],
    datasets: [
      {
        data: [totalPengajuan, totalLaporan],
        backgroundColor: ["#4BC0C0", "#FF9F40"],
      },
    ],
  };

  return (
    <div className="flex">
      <Sidebar onLogout={handleLogout} />
      <div className="flex-1 p-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded shadow">Total Pengajuan: {totalPengajuan}</div>
              <div className="bg-white p-4 rounded shadow">Total Laporan: {totalLaporan}</div>
              <div className="bg-green-100 p-4 rounded shadow">Disetujui: {totalDisetujui}</div>
              <div className="bg-yellow-100 p-4 rounded shadow">Menunggu: {totalMenunggu}</div>
              <div className="bg-red-100 p-4 rounded shadow">Ditolak: {totalDitolak}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded shadow h-96">
                <h2 className="text-lg font-bold mb-2">Statistik Pengajuan</h2>
                <Bar data={barData} />
              </div>
              <div className="bg-white p-4 rounded shadow h-96">
                <h2 className="text-lg font-bold mb-2">Distribusi Data</h2>
                <Doughnut data={doughnutData} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
