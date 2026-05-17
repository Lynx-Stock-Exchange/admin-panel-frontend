import { useState } from "react";
import { Copy, Check, X, ShieldOff, Plus, AlertTriangle } from "lucide-react";
import { usePlatforms } from "../hooks/usePlatforms";
import type { CreatedPlatformResult } from "../types";

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors cursor-pointer"
      title="Copy to clipboard"
    >
      {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
    </button>
  );
}

function CredentialsModal({
  result,
  onClose,
}: {
  result: CreatedPlatformResult;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-lg mx-4 bg-zinc-900 rounded-xl border border-zinc-700 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <h2 className="text-white font-semibold">Platform Registered</h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-4 space-y-4">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-950/40 border border-amber-800/50">
            <AlertTriangle size={16} className="text-amber-400 mt-0.5 shrink-0" />
            <p className="text-amber-300 text-sm">
              Save the API secret now — it will never be shown again.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs text-zinc-500 mb-1.5 uppercase tracking-wide font-medium">
                Platform
              </p>
              <p className="text-white text-sm font-medium">{result.platform.name}</p>
            </div>

            <div>
              <p className="text-xs text-zinc-500 mb-1.5 uppercase tracking-wide font-medium">
                API Key
              </p>
              <div className="flex items-center gap-2 bg-zinc-800 rounded-md px-3 py-2">
                <code className="flex-1 text-zinc-200 text-xs font-mono break-all">
                  {result.platform.api_key}
                </code>
                <CopyButton value={result.platform.api_key} />
              </div>
            </div>

            <div>
              <p className="text-xs text-zinc-500 mb-1.5 uppercase tracking-wide font-medium">
                API Secret
              </p>
              <div className="flex items-center gap-2 bg-zinc-800 rounded-md px-3 py-2 border border-amber-800/40">
                <code className="flex-1 text-amber-300 text-xs font-mono break-all">
                  {result.api_secret}
                </code>
                <CopyButton value={result.api_secret} />
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-zinc-800">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-md bg-white text-zinc-900 text-sm font-medium hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            I've saved my credentials
          </button>
        </div>
      </div>
    </div>
  );
}

function RegisterModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: (payload: { name: string; description?: string }) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await onCreated({
        name,
        description: description || undefined,
      });
    } catch {
      setError("Failed to register platform. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md mx-4 bg-zinc-900 rounded-xl border border-zinc-700 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <h2 className="text-white font-semibold">Register Platform</h2>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-xs text-zinc-400 mb-1.5 font-medium uppercase tracking-wide">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. Acme Broker"
              className="w-full px-3 py-2 rounded-md bg-zinc-800 border border-zinc-700 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs text-zinc-400 mb-1.5 font-medium uppercase tracking-wide">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Optional description..."
              className="w-full px-3 py-2 rounded-md bg-zinc-800 border border-zinc-700 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors resize-none"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-md border border-zinc-700 text-zinc-300 text-sm hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !name.trim()}
              className="flex-1 py-2 rounded-md bg-white text-zinc-900 text-sm font-medium hover:bg-zinc-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function PlatformManagement() {
  const { platforms, isLoading, revokingId, createPlatform, revokePlatform } =
    usePlatforms();
  const [showRegister, setShowRegister] = useState(false);
  const [credentials, setCredentials] = useState<CreatedPlatformResult | null>(null);

  async function handleRevoke(platformId: string) {
    if (!confirm("Revoke access for this platform? This cannot be undone.")) return;
    try {
      await revokePlatform(platformId);
    } catch {
      alert("Failed to revoke platform access.");
    }
  }

  async function handleCreated(payload: {
    name: string;
    description?: string;
  }) {
    const result = await createPlatform(payload);
    setShowRegister(false);
    setCredentials(result);
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-zinc-500">Registered broker platforms.</p>
          <button
            onClick={() => setShowRegister(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            <Plus size={15} />
            Register Platform
          </button>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">
                  Name
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">
                  Description
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">
                  API Key
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">
                  Status
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-zinc-400">
                    Loading...
                  </td>
                </tr>
              ) : platforms.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-zinc-400">
                    No platforms registered yet.
                  </td>
                </tr>
              ) : (
                platforms.map((platform) => (
                  <tr
                    key={platform.id}
                    className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-zinc-900">
                      {platform.name}
                    </td>
                    <td className="px-4 py-3 text-zinc-500">
                      {platform.description ?? <span className="text-zinc-300">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <code className="text-xs text-zinc-600 font-mono truncate max-w-[180px]">
                          {platform.api_key}
                        </code>
                        <CopyButton value={platform.api_key} />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          platform.is_active
                            ? "bg-green-50 text-green-700"
                            : "bg-zinc-100 text-zinc-500"
                        }`}
                      >
                        {platform.is_active ? "Active" : "Revoked"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {platform.is_active && (
                        <button
                          onClick={() => handleRevoke(platform.id)}
                          disabled={revokingId === platform.id}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 cursor-pointer ml-auto"
                        >
                          <ShieldOff size={13} />
                          {revokingId === platform.id ? "Revoking..." : "Revoke"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onCreated={handleCreated}
        />
      )}

      {credentials && (
        <CredentialsModal
          result={credentials}
          onClose={() => setCredentials(null)}
        />
      )}
    </>
  );
}
