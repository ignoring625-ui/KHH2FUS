import { Home, Calendar, Ticket, ShoppingBag, Wallet } from "lucide-react";
import { cn } from "./ui/utils";

type TabId = 'home' | 'all-itineraries' | 'all-tickets' | 'all-recommendations' | 'expenses';

interface BottomNavProps {
  currentTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export function BottomNav({ currentTab, onTabChange }: BottomNavProps) {
  const navItems = [
    { id: 'home', Icon: Home, label: "首頁" },
    { id: 'all-itineraries', Icon: Calendar, label: "行程" },
    { id: 'all-tickets', Icon: Ticket, label: "票券" },
    { id: 'all-recommendations', Icon: ShoppingBag, label: "清單" },
    { id: 'expenses', Icon: Wallet, label: "開銷" },
  ] as const;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 pb-8 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const { id, Icon, label } = item;
          const isActive = currentTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors duration-200",
                isActive ? "text-black" : "text-gray-400 hover:text-gray-600"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-xl transition-all",
                isActive ? "bg-black text-white" : "bg-transparent"
              )}>
                <Icon size={20} strokeWidth={2} />
              </div>
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
