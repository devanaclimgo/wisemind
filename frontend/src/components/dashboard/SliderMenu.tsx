import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  X, CalendarDays, Layers, HelpCircle,
  Settings, LogOut, ChevronLeft, LayoutDashboard,
} from "lucide-react";
import { cn } from "../../lib/cn";

interface SliderMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function SliderMenu({ open, onClose }: SliderMenuProps) {
  const [view, setView] = useState<"main" | "in-development">("main");
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    onClose();
    setTimeout(() => setView("main"), 300);
  };

  const handleNavigate = (path: string) => {
    handleClose();
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Calendário", icon: CalendarDays, path: "/calendar" },
    { label: "Semanas", icon: Layers, path: null },
    { label: "Suporte", icon: HelpCircle, path: null },
    { label: "Configurações", icon: Settings, path: null },
  ];

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
          onClick={handleClose}
        />
      )}

      <div
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-80 max-w-[85vw] bg-card border-r border-border shadow-xl transition-transform duration-300 flex flex-col",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          {view !== "main" ? (
            <button
              onClick={() => setView("main")}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Voltar
            </button>
          ) : (
            <span className="font-semibold text-foreground">Menu</span>
          )}

          <button
            onClick={handleClose}
            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {view === "main" && (
            <nav className="space-y-1">
              {navItems.map(({ label, icon: Icon, path }) => {
                const isActive = path && location.pathname === path;
                return (
                  <button
                    key={label}
                    onClick={() =>
                      path ? handleNavigate(path) : setView("in-development")
                    }
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors",
                      isActive
                        ? "bg-ring/10 text-ring font-medium"
                        : "text-foreground hover:bg-muted",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0",
                        isActive ? "text-ring" : "text-muted-foreground",
                      )}
                    />
                    {label}
                    {isActive && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-ring" />
                    )}
                  </button>
                );
              })}
            </nav>
          )}

          {view === "in-development" && (
            <div className="text-center text-muted-foreground mt-10">
              <p className="text-lg">🚧 Em desenvolvimento</p>
              <p className="text-sm mt-2">Em breve por aqui!</p>
            </div>
          )}
        </div>

        {/* Logout */}
        <div className="border-t border-border p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-muted py-2.5 text-sm hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </div>
    </>
  );
}