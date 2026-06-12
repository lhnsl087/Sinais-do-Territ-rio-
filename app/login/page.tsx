  'use client';

  import { useState } from 'react';
  import { useAuth } from '../../context/AuthContext';
  import { useRouter } from 'next/navigation';

  export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isSigningUp, setIsSigningUp] = useState(false);
  const { signIn, signUp } = useAuth()!;
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      try {
        if (isSigningUp) {
          const { error } = await signUp({ email, password });
          if (error) throw error;
          alert('Cadastro realizado! Verifique seu e-mail.');
          setIsSigningUp(false);
        } else {
          const { error } = await signIn({ email, password });
          if (error) throw error;
          router.push('https://ai.studio/apps/a8264eed-58c4-43e5-970d-30aebff94659');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            {isSigningUp ? 'Criar Conta' : 'Login'}
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium text-gray-700">E-mail</label>
              <input
                type="email"
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Senha</label>
              <input
                type="password"
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              {isSigningUp ? 'Cadastrar' : 'Entrar'}
            </button>
          </form>
          <p className="text-sm text-center text-gray-600">
            {isSigningUp ? 'Já tem uma conta?' : 'Não tem uma conta?'}
            <button
              onClick={() => setIsSigningUp(!isSigningUp)}
              className="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
            >
              {isSigningUp ? 'Faça login' : 'Cadastre-se'}
            </button>
          </p>
        </div>
      </div>
    );
  }