/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">ÉPICA</h1>
        {user ? (
          <button onClick={logout} className="px-4 py-2 bg-gray-200 rounded">Cerrar sesión</button>
        ) : (
          <button onClick={login} className="px-4 py-2 bg-blue-600 text-white rounded">Iniciar sesión</button>
        )}
      </header>
      {user ? (
        <div>
          <h2 className="text-xl">Bienvenido, {user.displayName}</h2>
          {/* Main content will go here */}
        </div>
      ) : (
        <p>Inicia sesión para comenzar.</p>
      )}
    </div>
  );
}
