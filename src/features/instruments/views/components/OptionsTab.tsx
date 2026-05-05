import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useOptions } from "../../hooks/useOptions";
import type { OptionContract, CreateOptionPayload, UpdateOptionPayload } from "../../types";
import { formatPrice, formatDateTime, shortenId } from "../../utils/format";
import OptionModal from "./OptionModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

type ModalState =
  | { open: false }
  | { open: true; mode: "add" }
  | { open: true; mode: "edit"; option: OptionContract };

export default function OptionsTab() {
  const { options, loading, error, createOption, updateOption, deleteOption } = useOptions();
  const [modal, setModal] = useState<ModalState>({ open: false });
  const [deleteTarget, setDeleteTarget] = useState<OptionContract | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    await deleteOption(deleteTarget.option_id);
    setDeleteLoading(false);
    setDeleteTarget(null);
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-zinc-500">Active option contracts available for trading.</p>
        <button
          onClick={() => setModal({ open: true, mode: "add" })}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-700 transition-colors cursor-pointer"
        >
          <Plus size={14} />
          Add Contract
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-100 bg-zinc-50">
              <Th>ID</Th>
              <Th>Underlying</Th>
              <Th>Type</Th>
              <Th>Strike</Th>
              <Th>Premium</Th>
              <Th>Expiry</Th>
              <Th>Status</Th>
              <th className="px-4 py-3 w-20" />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {loading && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-sm text-zinc-400">
                  Loading…
                </td>
              </tr>
            )}
            {!loading && options.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-sm text-zinc-400">
                  No option contracts defined yet.
                </td>
              </tr>
            )}
            {!loading && options.map((opt) => (
              <tr key={opt.option_id} className="hover:bg-zinc-50 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-zinc-400">{shortenId(opt.option_id)}</td>
                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-0.5 rounded bg-zinc-100 text-xs font-semibold text-zinc-700">
                    {opt.underlying_ticker}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                      opt.option_type === "CALL"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {opt.option_type}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium text-zinc-900">${formatPrice(opt.strike_price)}</td>
                <td className="px-4 py-3 text-zinc-700">${formatPrice(opt.premium)}</td>
                <td className="px-4 py-3 text-zinc-500">{formatDateTime(opt.expiry_time)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      opt.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-zinc-100 text-zinc-500"
                    }`}
                  >
                    {opt.is_active ? "Active" : "Expired"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 justify-end">
                    <button
                      onClick={() => setModal({ open: true, mode: "edit", option: opt })}
                      className="p-1.5 rounded text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(opt)}
                      className="p-1.5 rounded text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal.open && (
        <OptionModal
          mode={modal.mode}
          option={modal.mode === "edit" ? modal.option : undefined}
          onClose={() => setModal({ open: false })}
          onCreate={async (payload: CreateOptionPayload) => {
            const ok = await createOption(payload);
            if (ok) setModal({ open: false });
          }}
          onUpdate={async (optionId: string, payload: UpdateOptionPayload) => {
            const ok = await updateOption(optionId, payload);
            if (ok) setModal({ open: false });
          }}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmModal
          label={`option contract "${shortenId(deleteTarget.option_id)}"`}
          loading={deleteLoading}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wide">
      {children}
    </th>
  );
}
