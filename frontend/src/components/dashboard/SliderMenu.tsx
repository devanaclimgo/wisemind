import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  CalendarDays,
  Layers,
  HelpCircle,
  Settings,
  LogOut,
  ChevronLeft,
  Bell,
  User,
  Lock,
  Trash2,
} from "lucide-react";
import { cn } from "../../lib/cn";

interface SliderMenuProps {
  open: boolean;
  onClose: () => void;
}

type MenuView = "main" | "calendar" | "weeks" | "support" | "settings";
{/* TODO: criar páginas que faltam, tanto backend como frontend */}

export default function SliderMenu({ open, onClose }: SliderMenuProps) {
  const [view, setView] = useState<MenuView>("main");
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    setTimeout(() => setView("main"), 300);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
          onClick={handleClose}
        />
      )}

      {/* TODO: refatorar cores e estilo geral do slider para melhor UI/UX */}
      <div
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-80 max-w-[85vw] bg-white border-r border-gray-200 shadow-xl transition-transform duration-300 flex flex-col",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          {view !== "main" ? (
            <button
              onClick={() => setView("main")}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800"
            >
              <ChevronLeft className="h-4 w-4" />
              Voltar
            </button>
          ) : (
            <span className="font-semibold text-gray-800">Menu</span>
          )}

          <button
            onClick={handleClose}
            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {view === "main" && (
            <nav className="space-y-2">
              <button
                onClick={() => setView("calendar")}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100"
              >
                <CalendarDays className="h-4 w-4" />
                Calendario
              </button>

              <button
                onClick={() => setView("weeks")}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100"
              >
                <Layers className="h-4 w-4" />
                Semanas
              </button>

              <button
                onClick={() => setView("support")}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100"
              >
                <HelpCircle className="h-4 w-4" />
                Suporte
              </button>

              <button
                onClick={() => setView("settings")}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100"
              >
                <Settings className="h-4 w-4" />
                Configurações
              </button>
            </nav>
          )}

          {view === "settings" && (
            <div className="space-y-4">
              <div className="rounded-xl border p-4 flex items-center gap-3">
                <Bell className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Notificações</span>
              </div>

              <div className="rounded-xl border p-4 flex items-center gap-3">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Alterar username</span>
              </div>

              <div className="rounded-xl border p-4 flex items-center gap-3">
                <Lock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Alterar senha</span>
              </div>

              <button className="w-full border-2 border-red-300 p-3 rounded-xl text-red-500 hover:bg-red-50 flex items-center justify-center gap-2">
                <Trash2 className="h-4 w-4" />
                Excluir conta
              </button>
            </div>
          )}
        </div>

        {/* Logout */}
        <div className="border-t p-5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gray-100 py-2.5 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </div>
    </>
  );
}