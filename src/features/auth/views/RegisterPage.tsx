import { useState, type FormEvent } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { EXCHANGE_NAME } from "../../../shared/constants/config";

export default function RegisterPage() {
  const { user, isLoading, signUp } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoading && user) return <Navigate to="/" replace />;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      await signUp(username, password);
    } catch (err: unknown) {
      setError((err as Error).message ?? "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="text-white text-2xl font-semibold tracking-tight">
            {EXCHANGE_NAME}
          </span>
          <p className="text-zinc-500 text-sm mt-1">Create admin account</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 space-y-4"
        >
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-400" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              minLength={3}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 transition"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-400" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 transition"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-400" htmlFor="confirm-password">
              Confirm password
            </label>
            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-md bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 transition"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-950/40 border border-red-900/50 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-white text-zinc-900 text-sm font-medium py-2 hover:bg-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? "Creating account…" : "Create account"}
          </button>

          <p className="text-center text-xs text-zinc-500">
            Already have an account?{" "}
            <Link to="/login" className="text-zinc-300 hover:text-white transition-colors">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
