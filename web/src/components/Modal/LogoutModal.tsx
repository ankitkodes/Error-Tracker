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
            className="relative transform overflow-hidden rounded-[24px] bg-white dark:bg-[#13121a] border border-black/[0.08] dark:border-white/[0.08] text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 w-full max-w-[420px]"
          >
            <div className="px-6 pb-6 pt-8 relative">
              <button
                onClick={onClose}
                className="absolute right-5 top-5 cursor-pointer text-muted-foreground hover:bg-white/[0.06] rounded-lg p-1 transition-colors"
              >
                <X size={20} strokeWidth={2} />
              </button>

              <div className="flex items-center justify-center mb-5">
                <div className="bg-red-500/10 p-4 rounded-full flex items-center justify-center">
                  <LogOut className="text-red-500 w-7 h-7 ml-0.5" strokeWidth={2} />
                </div>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-[22px] font-semibold text-foreground mb-3 tracking-tight">
                  Logout
                </h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed px-4">
                  Are you sure you want to logout? You will need to sign in again to access your account.
                </p>
              </div>

              <div className="flex flex-row gap-3">
                <button
                  className="flex-1 py-3 px-4 bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] hover:bg-white/[0.08] text-muted-foreground hover:text-foreground font-semibold rounded-[20px] transition-colors flex items-center justify-center cursor-pointer"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-[20px] transition-colors flex items-center justify-center gap-2 cursor-pointer"
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
