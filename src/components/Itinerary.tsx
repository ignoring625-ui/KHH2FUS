import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Clock, MapPin, X, Trash2 } from 'lucide-react';

// ... (Interface 定義同上) ...

export const Itinerary: React.FC<ItineraryProps> = ({ items, onUpdate, onAdd, onDelete, onViewAll, members }) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ItineraryItemData | null>(null);
  const [formData, setFormData] = useState<Partial<ItineraryItemData>>({
    date: new Date().toISOString().split('T')[0],
    time: "12:00 - 13:00", title: "", location: "", currency: "KRW"
  });

  return (
    <section className="px-4">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-2xl font-bold">即將到來</h2>
          <p className="text-gray-500 text-sm">最接近現在的行程</p>
        </div>
        <button onClick={onViewAll} className="text-blue-600 text-sm font-medium">全部</button>
      </div>

      {/* 橫向滾動容器 */}
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x hide-scrollbar">
        {items.map((item) => (
          <div key={item.id} 
            onClick={() => { setEditingItem(item); setFormData(item); setIsAddOpen(true); }} 
            className="flex-shrink-0 w-[280px] bg-white p-5 rounded-[24px] shadow-sm border border-gray-100 snap-start active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-2 text-blue-500 text-[10px] font-bold uppercase tracking-wider mb-2">
              <Clock size={12} /> <span>{item.date} • {item.time}</span>
            </div>
            <h4 className="font-bold text-gray-900 text-lg mb-1 truncate">{item.title}</h4>
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <MapPin size={12} /> <span className="truncate">{item.location}</span>
            </div>
          </div>
        ))}
        
        <button onClick={() => { setEditingItem(null); setFormData({date: new Date().toISOString().split('T')[0], time: "12:00 - 13:00", title: "", location: "", currency: "KRW"}); setIsAddOpen(true); }} 
          className="flex-shrink-0 w-[140px] border-2 border-dashed border-gray-200 rounded-[24px] flex flex-col items-center justify-center gap-2 text-gray-400">
          <Plus size={24} /> <span className="text-xs font-bold">新增行程</span>
        </button>
      </div>

      <AnimatePresence>
        {isAddOpen && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAddOpen(false)} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="relative w-full max-w-md bg-white rounded-t-[32px] p-6 max-h-[90dvh] overflow-y-auto shadow-2xl pb-10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">{editingItem ? '編輯行程' : '添加行程'}</h3>
                <button onClick={() => setIsAddOpen(false)} className="p-2 bg-gray-100 rounded-full"><X size={20} /></button>
              </div>
              
              <div className="space-y-5 mb-8">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">行程名稱</label>
                  <input className="w-full p-4 bg-gray-50 rounded-2xl mt-1 outline-none focus:ring-2 ring-black" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">日期</label>
                    <input type="date" className="w-full p-4 bg-gray-50 rounded-2xl mt-1 outline-none" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">時間</label>
                    <input className="w-full p-4 bg-gray-50 rounded-2xl mt-1 outline-none" placeholder="12:00 - 14:00" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">地點</label>
                  <input className="w-full p-4 bg-gray-50 rounded-2xl mt-1 outline-none" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                </div>
              </div>

              <div className="flex gap-3">
                {editingItem && (
                  <button onClick={() => { if(confirm('確定刪除？')){ onDelete?.(editingItem.id); setIsAddOpen(false); } }} 
                    className="flex-1 py-4 bg-red-50 text-red-600 rounded-2xl font-bold flex items-center justify-center gap-2"><Trash2 size={18} /> 刪除</button>
                )}
                <button onClick={() => { if(formData.title) { editingItem ? onUpdate({...editingItem, ...formData} as ItineraryItemData) : onAdd({...formData, id: Math.random().toString(36).substr(2,9)} as ItineraryItemData); setIsAddOpen(false); } }} 
                  className="flex-[2] py-4 bg-black text-white rounded-2xl font-bold shadow-lg shadow-black/20">確認保存</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
