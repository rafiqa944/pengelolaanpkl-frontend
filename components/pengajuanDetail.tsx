
import React, { useState } from "react";

interface Props {
  pengajuan: {
    id: number;
    nama: string;
    nama_perusahaan: string;
    alamat_perusahaan: string;
    tanggal_mulai: string;
    tanggal_selesai: string;
    nama_supervisor: string;
    status: string;
    catatan_admin?: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (id: string, status: string, catatan: string) => void;
}

const PengajuanDetail: React.FC<Props> = ({
  pengajuan,
  isOpen,
  onClose,
  onStatusUpdate,
}) => {
  const [catatan, setCatatan] = useState<string>("");

//   const handleUpdateStatus = async (status: string) => {
//     try {
//       await updatePengajuanStatus(pengajuan.id, status, catatan);
//       onStatusUpdate(pengajuan.id, status, catatan);
//       onClose();
//       setCatatan("");
//     } catch (err) {
//       console.error("Gagal update status:", err);
//     }
//   };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white w-full max-w-xl rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Detail Pengajuan</h2>
        <div className="space-y-2 text-sm">
          <p><strong>Nama:</strong> {pengajuan.nama}</p>
          <p><strong>Perusahaan:</strong> {pengajuan.nama_perusahaan}</p>
          <p><strong>Alamat:</strong> {pengajuan.alamat_perusahaan}</p>
          <p><strong>Supervisor:</strong> {pengajuan.nama_supervisor}</p>
          <p><strong>Tanggal Mulai:</strong> {pengajuan.tanggal_mulai}</p>
          <p><strong>Tanggal Selesai:</strong> {pengajuan.tanggal_selesai}</p>
          <p><strong>Status:</strong> {pengajuan.status}</p>
          {pengajuan.catatan_admin && (
            <p><strong>Catatan Admin:</strong> {pengajuan.catatan_admin}</p>
          )}
        </div>

        <textarea
          placeholder="Catatan admin..."
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
          className="w-full border rounded mt-4 p-2"
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            // onClick={() => handleUpdateStatus("Disetujui")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Setujui
          </button>
          <button
            // onClick={() => handleUpdateStatus("Ditolak")}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Tolak
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default PengajuanDetail;
