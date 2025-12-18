import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Clock, MapPin, X, Trash2 } from 'lucide-react';

export interface ItineraryItemData { id: string; date: string; time: string; title: string; location: string; cost?: number; currency?: string; }
interface ItineraryProps { items: ItineraryItemData[]; onUpdate: (item: ItineraryItemData) => void; onAdd: (item: ItineraryItemData) => void; onDelete?: (id: string) => void; onViewAll: () => void; members: string[]; }

export const Itinerary: React.FC<ItineraryProps> = ({ items, onUpdate, onAdd, onDelete, onViewAll }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ItineraryItemData | null>(null);
  const [formData, setFormData] = useState<Partial<ItineraryItemData>>({});

  const handleSave = () => {
    if(!formData.title) return;
    editingItem ? onUpdate({...editingItem, ...formData} as ItineraryItemData) : onAdd({...formData, id: Math.random().toString(36).substr(2,9)} as ItineraryItemData);
    setIsAddOpen(false);
  };

  return (
    <section className="px-4">
      <div className="flex justify-between items-end mb-4 font-sans">
        <div><h2 className="text-2xl font-bold">即將到來</h2><p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Upcoming</p></div>
        <button onClick={onViewAll} className="text-blue-600 text-sm font-bold bg-blue-50 px-3 py-1 rounded-full">全部</button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x no-scrollbar">
        {items.map((item) => (
          <div key={item.id} onClick={() => { setEditingItem(item); setFormData(item); setIsAddOpen(true); }} className="flex-shrink-0 w-[260px] bg-white p-5 rounded-[28px] shadow-sm border border-gray-100 snap-start active:scale-95 transition-all">
            <div className="flex items-center gap-2 text-blue-500 text-[10px] font-black uppercase mb-3"><Clock size={12} /><span>{item.date} • {item.time}</span></div>
            <h4 className="font-bold text-gray-900 text-lg mb-2 truncate">{item.title}</h4>
            <div className="flex items-center gap-1 text-gray-400 text-xs"><MapPin size={12} /><span className="truncate">{item.location}</span></div>
          </div>
        ))}
        <button onClick={() => { setEditingItem(null); setFormData({date: new Date().toISOString().split('T')[0], time: "12:00 - 13:00"}); setIsAddOpen(true); }} className="flex-shrink-0 w-[120px] border-2 border-dashed border-gray-200 rounded-[28px] flex flex-col items-center justify-center gap-2 text-gray-300"><Plus size={24} /><span className="text-[10px] font-black uppercase">Add</span></button>
      </div>

      <AnimatePresence>
        {isAddOpen && (
          <div className="fixed inset-0 z-[9999] flex items-end justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAddOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="relative w-full max-w-md bg-white rounded-t-[40px] p-8 shadow-2xl overflow-y-auto" style={{ maxHeight: '85dvh', paddingBottom: 'max(2rem, env(safe-area-inset-bottom))' }}>
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black uppercase tracking-tighter">{editingItem ? 'Edit' : 'New Trip'}</h3>
                <button onClick={() => setIsAddOpen(false)} className="p-2 bg-gray-100 rounded-full"><X size={20} /></button>
              </div>
              <div className="space-y-5 mb-10">
                <input className="w-full p-5 bg-gray-50 rounded-[20px] outline-none border-2 border-transparent focus:border-black" value={formData.title || ''} onChange={e=>setFormData({...formData, title: e.target.value})} placeholder="行程名稱" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" className="p-5 bg-gray-50 rounded-[20px] outline-none text-sm" value={formData.date || ''} onChange={e=>setFormData({...formData, date: e.target.value})} />
                  <input className="p-5 bg-gray-50 rounded-[20px] outline-none text-sm" value={formData.time || ''} onChange={e=>setFormData({...formData, time: e.target.value})} placeholder="時間" />
                </div>
                <input className="w-full p-5 bg-gray-50 rounded-[20px] outline-none" value={formData.location || ''} onChange={e=>setFormData({...formData, location: e.target.value})} placeholder="地點" />
              </div>
              <div className="flex gap-3">
                {editingItem && (
                  <button onClick={() => { if(confirm('確定刪除？')){ onDelete?.(editingItem.id); setIsAddOpen(false); } }} className="flex-1 py-5 bg-red-50 text-red-600 rounded-[20px] font-black flex items-center justify-center gap-2 border border-red-100"><Trash2 size={18} /> DELETE</button>
                )}
                <button onClick={handleSave} className="flex-[2] py-5 bg-black text-white rounded-[20px] font-black uppercase">Save</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
