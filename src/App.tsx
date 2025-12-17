import { useState } from "react";
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

// Import images from original file
import imgImage from "figma:asset/dce651d5182d4c0a4ee7d91b5920a538659cc5a3.png";
import imgImage1 from "figma:asset/6db79c63d51c7155e810df570fafe386eab3fd8f.png";
import imgImage2 from "figma:asset/c6f50a588d1550221e2a03ec0e3015999016b3b0.png";
import imgImage3 from "figma:asset/61a3b3999dbe705614b8b546a7e62efbbaa1356d.png";
import imgImage4 from "figma:asset/0ec96a8b9ac507a716aa6038931cc341f52c853d.png";
import imgImage5 from "figma:asset/f3a84ff60870e6a63c7cb895ad52ce3f81fc60fe.png";
import imgImage6 from "figma:asset/44753ce82d9a47b8c5650e82e54156a884279f7e.png";

type ViewState = 'home' | 'all-itineraries' | 'expenses' | 'all-tickets' | 'all-recommendations';

// Exchange rates relative to TWD (1 unit of currency = X TWD)
const EXCHANGE_RATES: Record<string, number> = {
  TWD: 1,
  KRW: 0.024,
  JPY: 0.215,
  USD: 31.5,
  EUR: 34.2
};

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Initialize Members State
  const [members, setMembers] = useState<MemberProfile[]>([
    { id: "1", name: "我", isMe: true },
    { id: "2", name: "王小明" },
    { id: "3", name: "陳小美" },
    { id: "4", name: "李大華" }
  ]);

  const [itineraryItems, setItineraryItems] = useState<ItineraryItemData[]>([
    {
      id: "1",
      image: imgImage,
      date: "2026-03-06",
      time: "12:05 - 15:00",
      title: "前往機場 & 登機",
      location: "高雄國際機場 (KHH)",
      address: "高雄市小港區中山四路2號",
      notes: "記得攜帶護照，提前2小時抵達機場。航班 CI164。",
      cost: 0,
      currency: "TWD",
      payer: "我",
      splitters: ["我", "王小明", "陳小美", "李大華"],
      isCurrent: false
    },
    {
      id: "2",
      image: imgImage1,
      date: "2026-03-06",
      time: "15:00 - 18:00",
      title: "抵達 & 入境手續",
      location: "仁川國際機場 (ICN)",
      address: "272 Gonghang-ro, Jung-gu, Incheon, South Korea",
      notes: "填寫入境卡，領取行李，租借 Wifi 機。",
      cost: 0,
      currency: "KRW",
      payer: "我",
      splitters: ["我", "王小明", "陳小美", "李大華"],
      isCurrent: true
    },
    {
      id: "3",
      image: imgImage2,
      date: "2026-03-06",
      time: "19:00 - 20:30",
      title: "飯店辦理入住",
      location: "Signiel Seoul Hotel",
      address: "300 Olympic-ro, Songpa-gu, Seoul, South Korea",
      notes: "出示訂房確認信。詢問早餐時間。",
      cost: 450000,
      currency: "KRW",
      payer: "王小明",
      splitters: ["我", "王小明", "陳小美", "李大華"],
      isCurrent: false
    },
    {
      id: "4",
      image: imgImage3,
      date: "2026-03-07",
      time: "09:00 - 11:00",
      title: "早餐 & 咖啡廳",
      location: "Onion Anguk",
      address: "Seoul, Jongno-gu, Gyedong-gil 5",
      notes: "必點麵包，早點去排隊",
      cost: 20000,
      currency: "KRW",
      payer: "陳小美",
      splitters: ["我", "王小明", "陳小美", "李大華"],
      isCurrent: false
    },
    {
      id: "5",
      image: imgImage4,
      date: "2026-03-07",
      time: "11:30 - 13:00",
      title: "景福宮參觀",
      location: "Gyeongbokgung Palace",
      address: "161 Sajik-ro, Jongno-gu, Seoul",
      notes: "穿韓服可以免費入場",
      cost: 3000,
      currency: "KRW",
      payer: "我",
      splitters: ["我"],
      isCurrent: false
    },
    {
      id: "6",
      image: imgImage5,
      date: "2026-03-07",
      time: "18:00 - 20:00",
      title: "明洞逛街",
      location: "Myeongdong",
      address: "Myeongdong-gil, Jung-gu, Seoul",
      notes: "購買美妝與小吃",
      cost: 100000,
      currency: "KRW",
      payer: "李大華",
      splitters: ["李大華", "陳小美"],
      isCurrent: false
    }
  ]);

  const [ticketItems, setTicketItems] = useState<TicketItemData[]>([
    {
      id: "1",
      type: "flight",
      title: "機票 (去程)",
      subtitle: "高雄 - 釜山",
      emoji: "🛫",
      iconBg: "bg-blue-100",
      owner: "王小明",
      date: "03.05 THU",
      time: "17:05",
      endTime: "20:35",
      price: 8500,
      currency: "TWD",
      seat: "51D (Window)",
      bookingRef: "GA6AG6",
      description: "濟州航空 JEJUair 7C6256。包含 15kg 托運行李。",
      departureAirportCode: "KHH",
      arrivalAirportCode: "PUS",
      departureCity: "小港國際機場 | 高雄",
      arrivalCity: "釜山 | 釜山",
      duration: "2h 30m",
      isDirect: true,
      airline: "濟州航空 JEJUair",
      flightNumber: "7C6256",
      aircraft: "波音 737-800",
      baggage: "15kg 免費託運行李",
      ticketClass: "經濟艙"
    },
    {
      id: "2",
      type: "flight",
      title: "機票 (回程)",
      subtitle: "釜山 - 高雄",
      emoji: "🛫",
      iconBg: "bg-blue-100",
      owner: "王小明",
      date: "03.09 MON",
      time: "14:05",
      endTime: "16:05",
      price: 8500,
      currency: "TWD",
      seat: "51D (Window)",
      bookingRef: "GA6AG6",
      description: "濟州航空 JEJUair 7C6255。",
      departureAirportCode: "PUS",
      arrivalAirportCode: "KHH",
      arrivalCity: "小港國際機場 | 高雄",
      departureCity: "釜山 | 釜山",
      duration: "3h",
      isDirect: true,
      airline: "濟州航空 JEJUair",
      flightNumber: "7C6255",
      aircraft: "波音 737-800",
      baggage: "15kg 免費託運行李",
      ticketClass: "經濟艙"
    },
    {
      id: "3",
      type: "flight",
      title: "機票 (去程)",
      subtitle: "高雄 - 釜山",
      emoji: "🛫",
      iconBg: "bg-pink-100",
      owner: "陳小美",
      date: "03.05 THU",
      time: "17:05",
      endTime: "20:35",
      price: 8500,
      currency: "TWD",
      seat: "51D (Window)",
      bookingRef: "GA6AG6",
      description: "濟州航空 JEJUair 7C6256。包含 15kg 托運行李。",
      departureAirportCode: "KHH",
      arrivalAirportCode: "PUS",
      departureCity: "小港國際機場 | 高雄",
      arrivalCity: "釜山 | 釜山",
      duration: "2h 30m",
      isDirect: true,
      airline: "濟州航空 JEJUair",
      flightNumber: "7C6256",
      aircraft: "波音 737-800",
      baggage: "15kg 免費託運行李",
      ticketClass: "經濟艙"
    },
    {
      id: "4",
      type: "flight",
      title: "機票 (回程)",
      subtitle: "釜山 - 高雄",
      emoji: "🛫",
      iconBg: "bg-pink-100",
      owner: "陳小美",
      date: "03.09 MON",
      time: "14:05",
      endTime: "16:05",
      price: 8500,
      currency: "TWD",
      seat: "51D (Window)",
      bookingRef: "GA6AG6",
      description: "濟州航空 JEJUair 7C6255。",
      departureAirportCode: "PUS",
      arrivalAirportCode: "KHH",
      departureCity: "釜山 | 釜山",
      arrivalCity: "小港國際機場 | 高雄",
      duration: "3h",
      isDirect: true,
      airline: "濟州航空 JEJUair",
      flightNumber: "7C6255",
      aircraft: "波音 737-800",
      baggage: "15kg 免費託運行李",
      ticketClass: "經濟艙"
    },
    {
      id: "5",
      type: "train",
      title: "韓國地鐵",
      subtitle: "T-Money 交通卡",
      emoji: "🚅",
      iconBg: "bg-emerald-100",
      owner: "王小明",
      date: "2026/03/06",
      time: "全日",
      price: 2500,
      currency: "KRW",
      description: "預先儲值金額，可用於公車、地鐵及便利商店。"
    },
    {
      id: "6",
      type: "activity",
      title: "參觀博物館",
      subtitle: "國立中央博物館",
      emoji: "🗼",
      iconBg: "bg-purple-100",
      owner: "王小明",
      date: "2026/03/07",
      time: "14:00 - 17:00",
      price: 15000,
      currency: "KRW",
      bookingRef: "MUS-9988",
      description: "包含特展門票與語音導覽租借。請至一樓櫃台換票。"
    }
  ]);

  const [recommendationItems, setRecommendationItems] = useState<RecommendationItemData[]>([
    {
      id: "food-1",
      category: 'food',
      image: imgImage3,
      name: "Goban Sikdang",
      rating: "4.8",
      tags: ["韓式燒烤", "烤肉推薦"],
      description: "釜山海雲台的烤肉推薦🇰🇷必點五花肉超 crispy",
      location: "Busan, South Korea",
      isFavorite: true,
      time: "17:00 - 23:00"
    },
    {
      id: "food-2",
      category: 'food',
      image: imgImage4,
      name: "錦繡河豚湯",
      rating: "4.2",
      tags: ["河豚料理", "地道"],
      description: "一間好地道嘅韓國河豚肉料理，非常鮮美",
      location: "Busan, South Korea",
      isFavorite: false,
      time: "10:00 - 21:00"
    },
    {
      id: "shop-1",
      category: 'shopping',
      image: imgImage5,
      name: "ZERO軟糖",
      rating: "5.0",
      tags: ["零食", "韓國限定"],
      description: "韓國必定要買，低熱量好吃不胖",
      location: "Lotte Mart",
      isFavorite: true
    },
    {
      id: "shop-2",
      category: 'shopping',
      image: imgImage6,
      name: "紅豆鯛魚燒",
      rating: "3.5",
      tags: ["零食", "伴手禮"],
      description: "聽說吃起來普普通通，但造型很可愛",
      location: "Street Food",
      isFavorite: false
    }
  ]);

  const handleUpdateMember = (id: string, newName: string, avatar?: string) => {
    const oldMember = members.find(m => m.id === id);
    const oldName = oldMember?.name;

    // Update Members state
    setMembers(prev => prev.map(m => m.id === id ? { ...m, name: newName, avatar } : m));

    // Propagate name change if name actually changed
    if (oldName && oldName !== newName) {
      // Update Itinerary
      setItineraryItems(prev => prev.map(item => ({
        ...item,
        payer: item.payer === oldName ? newName : item.payer,
        splitters: (item.splitters || []).map(s => s === oldName ? newName : s)
      })));

      // Update Tickets
      setTicketItems(prev => prev.map(item => ({
        ...item,
        owner: item.owner === oldName ? newName : item.owner
      })));
    }
  };

  const handleAddMember = (name: string) => {
    const newMember: MemberProfile = {
      id: Math.random().toString(36).substr(2, 9),
      name: name,
    };
    setMembers(prev => [...prev, newMember]);
  };

  const handleRemoveMember = (id: string) => {
    const memberToRemove = members.find(m => m.id === id);
    if (!memberToRemove) return;

    // Remove from members list
    setMembers(prev => prev.filter(m => m.id !== id));

    // Cleanup Itinerary Items
    // 1. Remove from splitters
    // 2. If payer is removed member, assign to "我" (or first member remaining)
    setItineraryItems(prev => prev.map(item => {
      let newPayer = item.payer;
      if (item.payer === memberToRemove.name) {
        newPayer = "我"; // Default to "Me"
      }
      
      const newSplitters = (item.splitters || []).filter(name => name !== memberToRemove.name);
      
      return {
        ...item,
        payer: newPayer,
        splitters: newSplitters
      };
    }));

    // Cleanup Ticket Items
    // If owner is removed member, assign to "我"
    setTicketItems(prev => prev.map(item => {
      if (item.owner === memberToRemove.name) {
        return { ...item, owner: "我" };
      }
      return item;
    }));
  };

  const handleItineraryUpdate = (updatedItem: ItineraryItemData) => {
    setItineraryItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const handleItineraryAdd = (newItem: ItineraryItemData) => {
    setItineraryItems(prev => [...prev, newItem]);
  };
  
  const handleItineraryDelete = (id: string) => {
    setItineraryItems(prev => prev.filter(item => item.id !== id));
  };

  const handleTicketUpdate = (updatedItem: TicketItemData) => {
    setTicketItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const handleTicketAdd = (newItem: TicketItemData) => {
    setTicketItems(prev => [...prev, newItem]);
  };

  const handleRecommendationUpdate = (updatedItem: RecommendationItemData) => {
    setRecommendationItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const handleRecommendationAdd = (newItem: RecommendationItemData) => {
    setRecommendationItems(prev => [...prev, newItem]);
  };

  // Derived member names list for compatibility
  const memberNames = members.map(m => m.name);

  // Calculate total expenses (Converted to TWD)
  const totalExpenses = itineraryItems.reduce((sum, item) => {
    const cost = item.cost || 0;
    const currency = item.currency || 'TWD';
    const rate = EXCHANGE_RATES[currency] || 1;
    return sum + (cost * rate);
  }, 0);

  // Filter today's items for the home screen
  const todayDate = "2026-03-06";
  const todayItems = itineraryItems.filter(item => item.date === todayDate);

  // Derived lists for home screen
  const foodItems = recommendationItems.filter(item => item.category === 'food').slice(0, 2);
  const shoppingItems = recommendationItems.filter(item => item.category === 'shopping').slice(0, 2);

  const renderContent = () => {
    if (currentView === 'all-itineraries') {
      return (
        <AllItineraries 
          items={itineraryItems} 
          onBack={() => setCurrentView('home')} 
          onUpdate={handleItineraryUpdate}
          onAdd={handleItineraryAdd}
          members={memberNames}
        />
      );
    }

    if (currentView === 'expenses') {
      return (
        <ExpenseSplitter
          items={itineraryItems}
          onBack={() => setCurrentView('home')}
          members={memberNames}
          onUpdate={handleItineraryUpdate}
          onAdd={handleItineraryAdd}
          onDelete={handleItineraryDelete}
          rates={EXCHANGE_RATES}
        />
      )
    }

    if (currentView === 'all-tickets') {
      return (
        <AllTickets 
          items={ticketItems}
          onBack={() => setCurrentView('home')}
          onUpdate={handleTicketUpdate}
          onAdd={handleTicketAdd}
          members={members}
        />
      )
    }

    if (currentView === 'all-recommendations') {
      return (
        <AllRecommendations
          items={recommendationItems}
          onBack={() => setCurrentView('home')}
          onUpdate={handleRecommendationUpdate}
          onAdd={handleRecommendationAdd}
        />
      )
    }

    return (
      <div className="min-h-screen bg-gray-50/50 pb-20 font-sans text-gray-900">
        {/* Header */}
        <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-40 px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">App Name</h1>
          
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search size={20} className="text-gray-600" />
            </button>
            
            <button 
              onClick={() => setIsProfileOpen(true)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
               <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center overflow-hidden border border-gray-200">
                  {members.find(m => m.isMe)?.avatar ? (
                     <img src={members.find(m => m.isMe)?.avatar} alt="Me" className="w-full h-full object-cover" />
                  ) : (
                     <UserCircle size={20} />
                  )}
               </div>
            </button>
          </div>
        </header>

        <main className="max-w-md mx-auto py-6 space-y-8">
          <ExchangeRate rates={EXCHANGE_RATES} />
          
          <Itinerary 
            items={todayItems} 
            onUpdate={handleItineraryUpdate}
            onAdd={handleItineraryAdd}
            onViewAll={() => setCurrentView('all-itineraries')}
            members={memberNames}
          />
          
          <TicketList 
            items={ticketItems} 
            onUpdate={handleTicketUpdate}
            onAdd={handleTicketAdd}
            onViewAll={() => setCurrentView('all-tickets')}
          />
          
          <RecommendationSection 
            title="美食清單" 
            subtitle="想要造訪的餐廳" 
            items={foodItems}
            onViewAll={() => setCurrentView('all-recommendations')}
          />
          
          <RecommendationSection 
            title="購物清單" 
            subtitle="想要購買的伴手禮" 
            items={shoppingItems}
            onViewAll={() => setCurrentView('all-recommendations')}
          />
          
          {/* Wrap Dashboard in a div to capture click for navigation */}
          <div onClick={() => setCurrentView('expenses')} className="cursor-pointer transition-transform active:scale-[0.98]">
             <Dashboard 
               totalExpenses={totalExpenses}
               currency="TWD" 
             />
          </div>
        </main>
      </div>
    );
  };

  return (
    <>
      {renderContent()}
      
      <ProfileSettings 
         isOpen={isProfileOpen} 
         onClose={() => setIsProfileOpen(false)}
         members={members}
         onUpdateMember={handleUpdateMember}
         onAddMember={handleAddMember}
         onRemoveMember={handleRemoveMember}
      />

      <BottomNav 
        currentTab={currentView}
        onTabChange={(tab) => setCurrentView(tab)}
      />
    </>
  );
}
