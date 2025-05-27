'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { HiHome, HiDocumentText, HiUsers, HiLogout } from 'react-icons/hi';


interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    setShowConfirm(true);
  };

  const confirmLogout = () => {
    setShowConfirm(false);
    onLogout();
  };

  const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: <HiHome /> },
    { label: 'Pengajuan', href: '/admin/pengajuan', icon: <HiUsers /> },
    { label: 'Pelaporan', href: '/admin/laporan', icon: <HiDocumentText /> },
  ];

  return (
    <>
      <div className="w-64 h-screen bg-primary text-white flex flex-col">
       
        <div className="px-4 py-5 text-xl font-bold border-b border-white">Menu</div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-white hover:text-primary transition ${
                pathname === item.href ? 'bg-white text-primary font-semibold' : ''
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 mt-auto border-t border-white">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-white hover:text-primary transition"
          >
            <HiLogout />
            Logout
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-md text-black max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Konfirmasi Logout</h2>
            <p className="mb-4">Apakah Anda yakin ingin keluar?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded bg-gray-300 text-black"
              >
                Batal
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 rounded bg-primary text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
