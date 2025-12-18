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

  const sync = (payload: any) => saveToCloud(payload);

  const handleItineraryUpdate = (item: ItineraryItemData) => {
    const next = itineraryItems.map(i => i.id === item.id ? item : i);
    setItineraryItems(next); sync({ itineraryItems: next });
  };
  const handleItineraryAdd = (item: ItineraryItemData) => {
    const next = [...itineraryItems, item];
    setItineraryItems(next); sync({ itineraryItems: next });
  };
  const handleItineraryDelete = (id: string) => {
    const next = itineraryItems.filter(i => i.id !== id);
    setItineraryItems(next); sync({ itineraryItems: next });
  };

  const renderContent = () => {
    const mNames = members.map(m => m.name);
    if (currentView === 'all-itineraries') return <AllItineraries items={itineraryItems} onBack={() => setCurrentView('home')} onUpdate={handleItineraryUpdate} onAdd={handleItineraryAdd} onDelete={handleItineraryDelete} members={mNames} />;
    if (currentView === 'expenses') return <ExpenseSplitter items={itineraryItems} onBack={() => setCurrentView('home')} members={mNames} onUpdate={handleItineraryUpdate} onAdd={handleItineraryAdd} onDelete={handleItineraryDelete} rates={EXCHANGE_RATES} />;
    if (currentView === 'all-tickets') return <AllTickets items={ticketItems} onBack={() => setCurrentView('home')} onUpdate={(i:any)=>sync({ticketItems: ticketItems.map(t=>t.id===i.id?i:t)})} onAdd={(i:any)=>sync({ticketItems:[...ticketItems,i]})} members={members} />;
    
    return (
      <div className="min-h-screen bg-gray-50 pb-24">
        <header className="p-4 flex justify-between items-center bg-white border-b">
          <h1 className="text-xl font-bold">KHH2PUS</h1>
          <button onClick={() => setIsProfileOpen(true)}><UserCircle size={28} /></button>
        </header>
        <main className="p-4 space-y-6">
          <ExchangeRate rates={EXCHANGE_RATES} />
          <Itinerary items={itineraryItems.slice(0, 3)} onUpdate={handleItineraryUpdate} onAdd={handleItineraryAdd} onDelete={handleItineraryDelete} onViewAll={() => setCurrentView('all-itineraries')} members={mNames} />
          <TicketList items={ticketItems} onUpdate={()=>{}} onAdd={()=>{}} onViewAll={() => setCurrentView('all-tickets')} />
          <Dashboard totalExpenses={itineraryItems.reduce((sum, item) => sum + ((item.cost || 0) * (EXCHANGE_RATES[item.currency || 'TWD'] || 1)), 0)} currency="TWD" />
        </main>
      </div>
    );
  };

  return (
    <>
      {renderContent()}
      <ProfileSettings isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} members={members} 
        onUpdateMember={(id, name) => { const n = members.map(m=>m.id===id?{...m,name}:m); setMembers(n); sync({members:n}); }}
        onAddMember={(name) => { const n = [...members,{id:Math.random().toString(36).substr(2,9),name}]; setMembers(n); sync({members:n}); }}
        onRemoveMember={(id) => { const n = members.filter(m=>m.id!==id); setMembers(n); sync({members:n}); }}
      />
      <BottomNav currentTab={currentView} onTabChange={(tab: any) => setCurrentView(tab)} />
    </>
  );
}
