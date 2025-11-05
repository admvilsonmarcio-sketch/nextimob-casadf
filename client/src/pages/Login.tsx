import { FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { trpc } from '../_core/trpc';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const utils = trpc.useUtils();
  const [error, setError] = useState<string | null>(null);

  const loginLocal = trpc.auth.loginLocal.useMutation({
    onSuccess: async () => {
      await utils.auth.me.invalidate();
      const from = (location.state as { from?: string } | null)?.from ?? '/';
      navigate(from, { replace: true });
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '').trim();
    const password = String(formData.get('password') ?? '');
    setError(null);
    loginLocal.mutate({ email, password });
  };

  const handleGoogleLogin = () => {
    window.location.href = '/api/oauth/google';
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 py-12">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-neutral-800 bg-neutral-900/80 p-10 shadow-xl">
        <header className="space-y-2 text-center">
          <h1 className="text-3xl font-serif text-copper-400">Bem-vindo de volta</h1>
          <p className="text-sm text-neutral-400">
            Acesse sua conta NextImob para gerenciar carteiras exclusivas.
          </p>
        </header>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-neutral-200">
              E-mail corporativo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 text-neutral-100 outline-none transition focus:border-copper-400 focus:ring-2 focus:ring-copper-500/40"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-neutral-200">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 text-neutral-100 outline-none transition focus:border-copper-400 focus:ring-2 focus:ring-copper-500/40"
            />
          </div>

          {error ? (
            <p className="text-sm text-rose-400">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={loginLocal.isPending}
            className="inline-flex w-full items-center justify-center rounded-lg bg-copper-500 px-4 py-3 text-sm font-semibold text-neutral-950 shadow-lg transition hover:bg-copper-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loginLocal.isPending ? 'Entrando…' : 'Entrar com e-mail'}
          </button>
        </form>

        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-neutral-800" />
          <span className="text-xs uppercase tracking-[0.3em] text-neutral-500">ou</span>
          <span className="h-px flex-1 bg-neutral-800" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm font-semibold text-neutral-100 transition hover:border-copper-400 hover:bg-neutral-900"
        >
          <svg
            aria-hidden
            focusable="false"
            role="img"
            viewBox="0 0 24 24"
            className="h-5 w-5"
          >
            <path
              fill="currentColor"
              d="M12.24 10.8v2.88h6.78c-.27 1.74-2.04 5.1-6.78 5.1c-4.08 0-7.41-3.39-7.41-7.56s3.33-7.56 7.41-7.56c2.31 0 3.87.99 4.77 1.86l2.07-2.07C17.7 1.98 15.24.9 12.24.9C5.82.9.63 6.09.63 12.42s5.19 11.52 11.61 11.52c6.69 0 11.1-4.71 11.1-11.34c0-.75-.09-1.32-.21-1.89H12.24Z"
            />
          </svg>
          Entrar com Google
        </button>
      </div>
    </div>
  );
}
