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

// 引入 Firebase 工具
import { listenToCloud, saveToCloud } from "./firebase";

type ViewState = 'home' | 'all-itineraries' | 'expenses' | 'all-tickets' | 'all-recommendations';

const EXCHANGE_RATES: Record<string, number> = {
  TWD: 1, KRW: 0.024, JPY: 0.215, USD: 31.5, EUR: 34.2
};

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // 狀態定義
  const [members, setMembers] = useState<MemberProfile[]>([]);
  const [itineraryItems, setItineraryItems] = useState<ItineraryItemData[]>([]);
  const [ticketItems, setTicketItems] = useState<TicketItemData[]>([]);
  const [recommendationItems, setRecommendationItems] = useState<RecommendationItemData[]>([]);

  // ================= 核心同步邏輯 =================
  useEffect(() => {
    // 監聽雲端，只要資料一變，這裡就會觸發
    const unsubscribe = listenToCloud((cloudData) => {
      console.log("收到雲端同步資料:", cloudData);
      if (cloudData.members) setMembers(cloudData.members);
      if (cloudData.itineraryItems) setItineraryItems(cloudData.itineraryItems);
      if (cloudData.ticketItems) setTicketItems(cloudData.ticketItems);
      if (cloudData.recommendationItems) setRecommendationItems(cloudData.recommendationItems);
    });

    return () => unsubscribe();
  }, []);

  // 封裝一個統一的更新函式，同時改本地和雲端
  const syncAndSetMembers = (newMembers: MemberProfile[]) => {
    setMembers(newMembers);
    saveToCloud({ members: newMembers });
  };

  const syncAndSetItinerary = (newItems: ItineraryItemData[]) => {
    setItineraryItems(newItems);
    saveToCloud({ itineraryItems: newItems });
  };

  const syncAndSetTickets = (newItems: TicketItemData[]) => {
    setTicketItems(newItems);
    saveToCloud({ ticketItems: newItems });
  };

  const syncAndSetRecommendations = (newItems: RecommendationItemData[]) => {
    setRecommendationItems(newItems);
    saveToCloud({ recommendationItems: newItems });
  };
  // ===============================================

  const handleUpdateMember = (id: string, newName: string, avatar?: string) => {
    const oldMember = members.find(m => m.id === id);
    const oldName = oldMember?.name;
    const newMembers = members.map(m => m.id === id ? { ...m, name: newName, avatar } : m);
    
    syncAndSetMembers(newMembers);

    if (oldName && oldName !== newName) {
      const newItinerary = itineraryItems.map(item => ({
        ...item,
        payer: item.payer === oldName ? newName : item.payer,
        splitters: (item.splitters || []).map(s => s === oldName ? newName : s)
      }));
      syncAndSetItinerary(newItinerary);

      const newTickets = ticketItems.map(item => ({
        ...item,
        owner: item.owner === oldName ? newName : item.owner
      }));
      syncAndSetTickets(newTickets);
    }
  };

  const handleAddMember = (name: string) => {
    const newMember: MemberProfile = { id: Math.random().toString(36).substr(2, 9), name };
    syncAndSetMembers([...members, newMember]);
  };

  const handleRemoveMember = (id: string) => {
    const memberToRemove = members.find(m => m.id === id);
    if (!memberToRemove) return;

    const newMembers = members.filter(m => m.id !== id);
    syncAndSetMembers(newMembers);

    const newItinerary = itineraryItems.map(item => ({
      ...item,
      payer: item.payer === memberToRemove.name ? "我" : item.payer,
      splitters: (item.splitters || []).filter(name => name !== memberToRemove.name)
    }));
    syncAndSetItinerary(newItinerary);
  };

  const handleItineraryUpdate = (updatedItem: ItineraryItemData) => {
    syncAndSetItinerary(itineraryItems.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const handleItineraryAdd = (newItem: ItineraryItemData) => {
    syncAndSetItinerary([...itineraryItems, newItem]);
  };
  
  const handleItineraryDelete = (id: string) => {
    syncAndSetItinerary(itineraryItems.filter(item => item.id !== id));
  };

  const handleTicketUpdate = (updatedItem: TicketItemData) => {
    syncAndSetTickets(ticketItems.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const handleTicketAdd = (newItem: TicketItemData) => {
    syncAndSetTickets([...ticketItems, newItem]);
  };

  const handleRecommendationUpdate = (updatedItem: RecommendationItemData) => {
    syncAndSetRecommendations(recommendationItems.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const handleRecommendationAdd = (newItem: RecommendationItemData) => {
    syncAndSetRecommendations([...recommendationItems, newItem]);
  };

  const memberNames = members.map(m => m.name);
  const totalExpenses = itineraryItems.reduce((sum, item) => sum + ((item.cost || 0) * (EXCHANGE_RATES[item.currency || 'TWD'] || 1)), 0);
  const todayDate = "2026-03-06";
  const todayItems = itineraryItems.filter(item => item.date === todayDate);
  const foodItems = recommendationItems.filter(item => item.category === 'food').slice(0, 2);
  const shoppingItems = recommendationItems.filter(item => item.category === 'shopping').slice(0, 2);

  const renderContent = () => {
    if (currentView === 'all-itineraries') return <AllItineraries items={itineraryItems} onBack={() => setCurrentView('home')} onUpdate={handleItineraryUpdate} onAdd={handleItineraryAdd} members={memberNames} />;
    if (currentView === 'expenses') return <ExpenseSplitter items={itineraryItems} onBack={() => setCurrentView('home')} members={memberNames} onUpdate={handleItineraryUpdate} onAdd={handleItineraryAdd} onDelete={handleItineraryDelete} rates={EXCHANGE_RATES} />;
    if (currentView === 'all-tickets') return <AllTickets items={ticketItems} onBack={() => setCurrentView('home')} onUpdate={handleTicketUpdate} onAdd={handleTicketAdd} members={members} />;
    if (currentView === 'all-recommendations') return <AllRecommendations items={recommendationItems} onBack={() => setCurrentView('home')} onUpdate={handleRecommendationUpdate} onAdd={handleRecommendationAdd} />;

    return (
      <div className="min-h-screen bg-gray-50/50 pb-20 font-sans text-gray-900">
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-40 px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">KHH2PUS</h1>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Search size={20} className="text-gray-600" /></button>
            <button onClick={() => setIsProfileOpen(true)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
               <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center overflow-hidden border border-gray-200">
                  {members.find(m => m.isMe)?.avatar ? <img src={members.find(m => m.isMe)?.avatar} alt="Me" className="w-full h-full object-cover" /> : <UserCircle size={20} />}
               </div>
            </button>
          </div>
        </header>

        <main className="max-w-md mx-auto py-6 space-y-8">
          <ExchangeRate rates={EXCHANGE_RATES} />
          <Itinerary items={todayItems} onUpdate={handleItineraryUpdate} onAdd={handleItineraryAdd} onViewAll={() => setCurrentView('all-itineraries')} members={memberNames} />
          <TicketList items={ticketItems} onUpdate={handleTicketUpdate} onAdd={handleTicketAdd} onViewAll={() => setCurrentView('all-tickets')} />
          <RecommendationSection title="美食清單" subtitle="想要造訪的餐廳" items={foodItems} onViewAll={() => setCurrentView('all-recommendations')} />
          <RecommendationSection title="購物清單" subtitle="想要購買的伴手禮" items={shoppingItems} onViewAll={() => setCurrentView('all-recommendations')} />
          <div onClick={() => setCurrentView('expenses')} className="cursor-pointer transition-transform active:scale-[0.98]">
             <Dashboard totalExpenses={totalExpenses} currency="TWD" />
          </div>
        </main>
      </div>
    );
  };

  return (
    <>
      {renderContent()}
      <ProfileSettings isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} members={members} onUpdateMember={handleUpdateMember} onAddMember={handleAddMember} onRemoveMember={handleRemoveMember} />
      <BottomNav currentTab={currentView} onTabChange={(tab) => setCurrentView(tab)} />
    </>
  );
}
