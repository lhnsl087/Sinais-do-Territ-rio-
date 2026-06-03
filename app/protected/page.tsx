'use client';

import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProtectedPage() {
  const { user, signOut } = useAuth()!;
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-900">Página Protegida</h1>
          <p className="mt-2 text-gray-600">
            Se você está vendo isso, você está logado!
          </p>
          {user && (
            <p className="mt-4 text-sm text-gray-500">
              Logado como: {user.email}
            </p>
          )}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 mt-6 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}