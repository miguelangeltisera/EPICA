/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, User } from 'firebase/auth';
import epicaLogo from './assets/images/epica_logo_1780504772767.png';

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

  if (user) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">ÉPICA</h1>
          <button onClick={logout} className="px-4 py-2 bg-gray-200 rounded">Cerrar sesión</button>
        </header>
        <div>
          <h2 className="text-xl">Bienvenido, {user.displayName}</h2>
          {/* Main content will go here */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center">
      <img src={epicaLogo} alt="ÉPICA Logo" className="w-64 mb-8" />
      <h1 className="text-5xl font-bold text-gray-900 mb-4">ÉPICA</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Escuela de Producción e Investigación de la Ciencia Audiovisual. 
        Transforma tu aprendizaje con un ecosistema interactivo asistido por IA.
      </p>
      <button 
        onClick={login} 
        className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Iniciar sesión con Google
      </button>
    </div>
  );
}
