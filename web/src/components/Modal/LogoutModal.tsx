"use client";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { LogOut, X } from "lucide-react";
import { signOut } from "next-auth/react";

export type LogoutModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function LogoutModal({ open, onClose }: LogoutModalProps) {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/40 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-[24px] bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-full max-w-[420px]"
          >
            <div className="px-6 pb-6 pt-8 relative">
              <button
                onClick={onClose}
                className="absolute right-5 top-5 cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} strokeWidth={2} />
              </button>

              <div className="flex items-center justify-center mb-5">
                <div className="bg-[#FFF1F2] p-4 rounded-full flex items-center justify-center">
                  <LogOut className="text-[#E1434A] w-7 h-7 ml-0.5" strokeWidth={2} />
                </div>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-[22px] font-semibold text-[#111827] mb-3 tracking-tight">
                  Logout
                </h3>
                <p className="text-[#6B7280] text-[15px] leading-relaxed px-4">
                  Are you sure you want to logout? You will need to sign in again to access your account.
                </p>
              </div>

              <div className="flex flex-row gap-3">
                <button
                  className="flex-1 py-3 px-4 bg-white border border-[#E5E7EB] hover:bg-slate-50 text-[#374151] font-semibold rounded-[20px] transition-colors flex items-center justify-center"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 py-3 px-4 bg-[#DF494E] hover:bg-[#C83E43] text-white font-semibold rounded-[20px] transition-colors flex items-center justify-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut size={18} strokeWidth={2} className="mr-0.5" />
                  Logout
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
