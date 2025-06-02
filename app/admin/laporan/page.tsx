'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Box, Typography, Button, Badge, CircularProgress } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
// import { fetchLaporanPKL } from '../api/dataService';
// import LaporanDetail from './LaporanDetail';
import Sidebar from "@/components/sidebar";

interface Laporan {
  id: string;
  nama: string;
  nama_perusahaan: string;
  uploadedAt: string;
  status: string;
  url_laporan: string;
  catatan_admin?: string;
}

const Pelaporan: React.FC = () => {
  const [laporanData, setLaporanData] = useState<Laporan[]>([]);
  const [filteredLaporan, setFilteredLaporan] = useState<Laporan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLaporan, setSelectedLaporan] = useState<Laporan | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const dummyData: Laporan[] = [
        {
          id: '1',
          nama: 'Andi',
          nama_perusahaan: 'PT Maju Jaya',
          uploadedAt: '2024-01-01',
          status: 'Diproses',
          url_laporan: 'https://example.com/laporan1.pdf',
        },
      ];
      setLaporanData(dummyData);
      setFilteredLaporan(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleStatusUpdate = (id: string, status: string, catatan: string) => {
    const updated = laporanData.map((item) =>
      item.id === id ? { ...item, status, catatan_admin: catatan } : item
    );
    setLaporanData(updated);
    setFilteredLaporan(updated);
  };

  const handleRowClick = (row: any) => {
    const selectedId = row.original.id;
    const selected = filteredLaporan.find((item) => item.id === selectedId);
    if (selected) {
      setSelectedLaporan(selected);
      setIsDetailOpen(true);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Diterima':
        return 'success';
      case 'Diproses':
        return 'warning';
      case 'Ditolak':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'nama',
        header: 'Nama Mahasiswa',
      },
      {
        accessorKey: 'nama_perusahaan',
        header: 'Nama Perusahaan',
      },
      {
        accessorKey: 'uploadedAt',
        header: 'Tanggal Unggah',
        Cell: ({ cell }: any) => cell.getValue(),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        Cell: ({ cell }: any) => (
          <Badge color={getStatusColor(cell.getValue()) as any} badgeContent={cell.getValue()} />
        ),
      },
      {
        header: 'Aksi',
        Cell: ({ row }: any) => (
          <Button variant="outlined" size="small" onClick={() => handleRowClick(row)}>
            Lihat Laporan
          </Button>
        ),
      },
    ],
    [filteredLaporan]
  );

return (
  <Box display="flex" height="100vh">
    <Box width="240px" bgcolor="#f5f5f5" boxShadow={2}>
      <Sidebar onLogout={handleLogout} />
    </Box>

    <Box flex={1} p={3} overflow="auto">
      <Typography variant="h5" gutterBottom>
        Manajemen Pelaporan
      </Typography>
      <MaterialReactTable
        columns={columns}
        data={filteredLaporan}
        enableRowSelection={false}
      />

      {/* <LaporanDetail
        laporan={selectedLaporan}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onStatusUpdate={handleStatusUpdate}
      /> */}
    </Box>
  </Box>
);
};

export default Pelaporan;
