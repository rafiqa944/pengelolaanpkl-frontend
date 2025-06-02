"use client";
import React, { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import PengajuanDetail from "@/components/pengajuanDetail";
import Sidebar from "@/components/sidebar";

interface Pengajuan {
  id: string;
  nama: string;
  nama_perusahaan: string;
  alamat_perusahaan: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  status: string;
  nama_supervisor: string;
  catatan_admin?: string;
}

const Pengajuan: React.FC = () => {
  const [pengajuan, setPengajuan] = useState<Pengajuan[]>([
    {
      id: "1",
      nama: "Budi",
      nama_perusahaan: "PT Maju Jaya",
      alamat_perusahaan: "Jl. Mawar No. 1",
      tanggal_mulai: "2025-06-01",
      tanggal_selesai: "2025-08-01",
      status: "Menunggu Persetujuan",
      nama_supervisor: "Pak Andi",
      catatan_admin: "",
    },
  ]);
  const [selectedPengajuan, setSelectedPengajuan] = useState<Pengajuan | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

  const handleRowClick = (row: any) => {
    const id = row.original.id;
    const selected = pengajuan.find((item) => item.id === id);
    if (selected) {
      setSelectedPengajuan(selected);
      setIsDetailOpen(true);
    }
  };

  const handleStatusUpdate = (id: string, status: string, catatan: string) => {
    const updated = pengajuan.map((item) =>
      item.id === id ? { ...item, status, catatan_admin: catatan } : item
    );
    setPengajuan(updated);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Disetujui":
        return "bg-green-500";
      case "Ditolak":
        return "bg-red-500";
      case "Menunggu Persetujuan":
        return "bg-yellow-500";
      default:
        return "bg-gray-400";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const columns = useMemo(
    () => [
      { accessorKey: "nama", header: "Nama" },
      { accessorKey: "nama_perusahaan", header: "Perusahaan" },
      { accessorKey: "alamat_perusahaan", header: "Alamat" },
      { accessorKey: "tanggal_mulai", header: "Tanggal Mulai" },
      { accessorKey: "tanggal_selesai", header: "Tanggal Selesai" },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }: any) => (
          <span
            className={`text-white px-2 py-1 rounded text-xs ${getStatusBadgeColor(
              cell.getValue()
            )}`}
          >
            {cell.getValue()}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Action",
        Cell: ({ row }: any) => (
          <button
            className="text-white bg-blue-600 hover:bg-blue-700 text-sm px-3 py-1 rounded"
            onClick={() => handleRowClick(row)}
          >
            Edit
          </button>
        ),
      },
    ],
    [pengajuan]
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-64 bg-white shadow-md">
        <Sidebar onLogout={handleLogout} />
      </div>
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4">Manajemen Pengajuan</h1>
        <div>
          <MaterialReactTable columns={columns} data={pengajuan} enableRowSelection={false} />
        </div>
        {/* {selectedPengajuan && (
          <PengajuanDetail
            pengajuan={selectedPengajuan}
            isOpen={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
            onStatusUpdate={handleStatusUpdate}
          />
        )} */}
      </div>
    </div>
  );
};

export default Pengajuan;
