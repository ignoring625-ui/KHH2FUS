import { useState, useEffect } from "react";
import { Search, UserCircle } from "lucide-react";
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
    const unsubscribe = listenToCloud((cloudData) => {
      if (cloudData.members) setMembers(cloudData.members);
      if (cloudData.itineraryItems) setItineraryItems(cloudData.itineraryItems);
      if (cloudData.ticketItems) setTicketItems(cloudData.ticketItems);
      if (cloudData.recommendationItems) setRecommendationItems(cloudData.recommendationItems);
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

  const syncAndSetMembers = (d: any) => { setMembers(d); saveToCloud({ members: d }); };
  const syncAndSetItinerary = (d: any) => { setItineraryItems(d); saveToCloud({ itineraryItems: d }); };
  const syncAndSetTickets = (d: any) => { setTicketItems(d); saveToCloud({ ticketItems: d }); };
  const syncAndSetRecommendations = (d: any) => { setRecommendationItems(d); saveToCloud({ recommendationItems: d }); };

  const handleItineraryUpdate = (updatedItem: ItineraryItemData) => syncAndSetItinerary(itineraryItems.map(item => item.id === updatedItem.id ? updatedItem : item));
  const handleItineraryAdd = (newItem: ItineraryItemData) => syncAndSetItinerary([...itineraryItems, newItem]);
  const handleItineraryDelete = (id: string) => syncAndSetItinerary(itineraryItems.filter(item => item.id !== id));
  
  const handleTicketUpdate = (updatedItem: TicketItemData) => syncAndSetTickets(ticketItems.map(item => item.id === updatedItem.id ? updatedItem : item));
  const handleTicketAdd = (newItem: TicketItemData) => syncAndSetTickets([...ticketItems, newItem]);

  const handleRecommendationUpdate = (updatedItem: RecommendationItemData) => syncAndSetRecommendations(recommendationItems.map(item => item.id === updatedItem.id ? updatedItem : item));
  const handleRecommendationAdd = (newItem: RecommendationItemData) => syncAndSetRecommendations([...recommendationItems, newItem]);

  const totalExpenses = itineraryItems.reduce((sum, item) => sum + ((item.cost || 0) * (EXCHANGE_RATES[item.currency || 'TWD'] || 1)), 0);

  const renderContent = () => {
    // 確保所有視圖都被保留
    if (currentView === 'all-itineraries') return <AllItineraries items={itineraryItems} onBack={() => setCurrentView('home')} onUpdate={handleItineraryUpdate} onAdd={handleItineraryAdd} onDelete={handleItineraryDelete} members={members.map(m=>m.name)} />;
    if (currentView === 'expenses') return <ExpenseSplitter items={itineraryItems} onBack={() => setCurrentView('home')} members={members.map(m=>m.name)} onUpdate={handleItineraryUpdate} onAdd={handleItineraryAdd} onDelete={handleItineraryDelete} rates={EXCHANGE_RATES} />;
    if (currentView === 'all-tickets') return <AllTickets items={ticketItems} onBack={() => setCurrentView('home')} onUpdate={handleTicketUpdate} onAdd={handleTicketAdd} members={members} />;
    if (currentView === 'all-recommendations') return <AllRecommendations items={recommendationItems} onBack={() => setCurrentView('home')} onUpdate={handleRecommendationUpdate} onAdd={handleRecommendationAdd} />;

    return (
      <div className="min-h-screen bg-gray-50/50 pb-24 font-sans text-gray-900">
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-40 px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold">KHH2PUS</h1>
          <button onClick={() => setIsProfileOpen(true)} className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center overflow-hidden">
            <UserCircle size={20} />
          </button>
        </header>
        <main className="max-w-md mx-auto py-6 space-y-8">
          <ExchangeRate rates={EXCHANGE_RATES} />
          
          <Itinerary 
            items={getUpcomingItems()} 
            onUpdate={handleItineraryUpdate} 
            onAdd={handleItineraryAdd} 
            onDelete={handleItineraryDelete}
            onViewAll={() => setCurrentView('all-itineraries')} 
            members={members.map(m=>m.name)} 
          />

          <TicketList items={ticketItems} onUpdate={handleTicketUpdate} onAdd={handleTicketAdd} onViewAll={() => setCurrentView('all-tickets')} />
          
          <RecommendationSection title="美食清單" items={recommendationItems.filter(i=>i.category==='food').slice(0,2)} onViewAll={() => setCurrentView('all-recommendations')} />
          <RecommendationSection title="購物清單" items={recommendationItems.filter(i=>i.category==='shopping').slice(0,2)} onViewAll={() => setCurrentView('all-recommendations')} />

          <div onClick={() => setCurrentView('expenses')} className="cursor-pointer">
             <Dashboard totalExpenses={totalExpenses} currency="TWD" />
          </div>
        </main>
      </div>
    );
  };

  return (
    <>
      {renderContent()}
      <ProfileSettings isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} members={members} 
        onUpdateMember={(id, name, avatar) => syncAndSetMembers(members.map(m => m.id === id ? { ...m, name, avatar } : m))}
        onAddMember={(name) => syncAndSetMembers([...members, { id: Math.random().toString(36).substr(2, 9), name }])}
        onRemoveMember={(id) => syncAndSetMembers(members.filter(m => m.id !== id))}
      />
      <BottomNav currentTab={currentView} onTabChange={(tab) => setCurrentView(tab)} />
    </>
  );
}
