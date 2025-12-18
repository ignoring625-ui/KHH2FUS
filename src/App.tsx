import { useState, useEffect } from "react";
import { UserCircle } from "lucide-react";
import { BottomNav } from "./components/BottomNav";
import { ExchangeRate } from "./components/ExchangeRate";
import { Itinerary, ItineraryItemData } from "./components/Itinerary";
import { AllItineraries } from "./components/AllItineraries";
import { TicketList, TicketItemData } from "./components/TicketList";
import { AllTickets } from "./components/AllTickets";
import { RecommendationSection } from "./components/RecommendationSection";
import { AllRecommendations, RecommendationItemData } from "./components/AllRecommendations";
import { Dashboard } from "./components/Dashboard";
import { ExpenseSplitter } from "./components/ExpenseSplitter";
import { ProfileSettings, MemberProfile } from "./components/ProfileSettings";
import { listenToCloud, saveToCloud } from "./firebase";

type ViewState = 'home' | 'all-itineraries' | 'expenses' | 'all-tickets' | 'all-recommendations';

const EXCHANGE_RATES: Record<string, number> = {
  TWD: 1, KRW: 0.024, JPY: 0.215, USD: 31.5, EUR: 34.2
};

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [members, setMembers] = useState<MemberProfile[]>([]);
  const [itineraryItems, setItineraryItems] = useState<ItineraryItemData[]>([]);
  const [ticketItems, setTicketItems] = useState<TicketItemData[]>([]);
  const [recommendationItems, setRecommendationItems] = useState<RecommendationItemData[]>([]);

  useEffect(() => {
    const unsubscribe = listenToCloud((data) => {
      if (data.members) setMembers(data.members);
      if (data.itineraryItems) setItineraryItems(data.itineraryItems);
      if (data.ticketItems) setTicketItems(data.ticketItems);
      if (data.recommendationItems) setRecommendationItems(data.recommendationItems);
    });
    return () => unsubscribe();
  }, []);

  const getUpcomingItems = () => {
    if (itineraryItems.length === 0) return [];
    const now = new Date();
    const sorted = [...itineraryItems].sort((a, b) => 
      new Date(`${a.date} ${a.time.split(' - ')[0]}`).getTime() - 
      new Date(`${b.date} ${b.time.split(' - ')[0]}`).getTime()
    );
    const future = sorted.filter(item => new Date(`${item.date} ${item.time.split(' - ')[1] || '23:59'}`) >= now);
    return future.length > 0 ? future.slice(0, 5) : sorted.slice(-5);
  };

  const handleItineraryUpdate = (item: ItineraryItemData) => {
    const next = itineraryItems.map(i => i.id === item.id ? item : i);
    setItineraryItems(next); saveToCloud({ itineraryItems: next });
  };
  const handleItineraryAdd = (item: ItineraryItemData) => {
    const next = [...itineraryItems, item];
    setItineraryItems(next); saveToCloud({ itineraryItems: next });
  };
  const handleItineraryDelete = (id: string) => {
    const next = itineraryItems.filter(i => i.id !== id);
    setItineraryItems(next); saveToCloud({ itineraryItems: next });
  };

  const renderContent = () => {
    const mNames = members.map(m => m.name);
    if (currentView === 'all-itineraries') return <AllItineraries items={itineraryItems} onBack={() => setCurrentView('home')} onUpdate={handleItineraryUpdate} onAdd={handleItineraryAdd} onDelete={handleItineraryDelete} members={mNames} />;
    if (currentView === 'expenses') return <ExpenseSplitter items={itineraryItems} onBack={() => setCurrentView('home')} members={mNames} onUpdate={handleItineraryUpdate} onAdd={handleItineraryAdd} onDelete={handleItineraryDelete} rates={EXCHANGE_RATES} />;
    
    return (
      <div className="min-h-screen bg-gray-50/50 pb-32 overflow-x-hidden">
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b z-20 px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">KHH2PUS</h1>
          <button onClick={() => setIsProfileOpen(true)} className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center"><UserCircle size={20} /></button>
        </header>
        <main className="max-w-md mx-auto py-6 space-y-8 relative z-10">
          <ExchangeRate rates={EXCHANGE_RATES} />
          <Itinerary items={getUpcomingItems()} onUpdate={handleItineraryUpdate} onAdd={handleItineraryAdd} onDelete={handleItineraryDelete} onViewAll={() => setCurrentView('all-itineraries')} members={mNames} />
          <TicketList items={ticketItems} onUpdate={(i)=>saveToCloud({ticketItems: ticketItems.map(t=>t.id===i.id?i:t)})} onAdd={(i)=>saveToCloud({ticketItems:[...ticketItems,i]})} onViewAll={() => setCurrentView('all-tickets')} />
          <div onClick={() => setCurrentView('expenses')} className="px-4 relative z-10">
             <Dashboard totalExpenses={itineraryItems.reduce((sum, item) => sum + ((item.cost || 0) * (EXCHANGE_RATES[item.currency || 'TWD'] || 1)), 0)} currency="TWD" />
          </div>
        </main>
      </div>
    );
  };

  return (
    <div className="relative">
      {renderContent()}
      <ProfileSettings isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} members={members} 
        onUpdateMember={(id, name) => { const n = members.map(m=>m.id===id?{...m,name}:m); setMembers(n); saveToCloud({members:n}); }}
        onAddMember={(name) => { const n = [...members,{id:Math.random().toString(36).substr(2,9),name}]; setMembers(n); saveToCloud({members:n}); }}
        onRemoveMember={(id) => { const n = members.filter(m=>m.id!==id); setMembers(n); saveToCloud({members:n}); }}
      />
      <BottomNav currentTab={currentView} onTabChange={(tab: any) => setCurrentView(tab)} />
    </div>
  );
}
