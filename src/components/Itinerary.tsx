import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

export interface ItineraryItemData { id: string; date: string; time: string; title: string; location: string; cost?: number; currency?: string; }
interface ItineraryProps { items: ItineraryItemData[]; onUpdate: (item: ItineraryItemData) => void; onAdd: (item: ItineraryItemData) => void; onDelete?: (id: string) => void; onViewAll: () => void; members: string[]; }

export const Itinerary: React.FC<ItineraryProps> = ({ items, onUpdate, onAdd, onDelete, onViewAll }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ItineraryItemData | null>(null);
  const [formData, setFormData] = useState<Partial<ItineraryItemData>>({});

  const openEdit = (item: ItineraryItemData) => {
    setEditingItem(item);
    setFormData(item);
    setIsOpen(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">行程摘要</h2>
        <button onClick={onViewAll} className="text-blue-500 text-sm">全部</button>
      </div>
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} onClick={() => openEdit(item)} className="p-3 border rounded-lg active:bg-gray-50">
            <div className="text-xs text-gray-500">{item.date} {item.time}</div>
            <div className="font-bold">{item.title}</div>
          </div>
        ))}
        <button onClick={() => { setEditingItem(null); setFormData({}); setIsOpen(true); }} className="w-full py-2 border-2 border-dashed rounded-lg text-gray-400 flex items-center justify-center gap-2">
          <Plus size={18} /> 新增行程
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[50] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-xl p-6">
            <div className="flex justify-between mb-4">
              <h3 className="font-bold">{editingItem ? '編輯行程' : '新增行程'}</h3>
              <button onClick={() => setIsOpen(false)}><X /></button>
            </div>
            <div className="space-y-4">
              <input className="w-full border p-2 rounded" placeholder="標題" value={formData.title || ''} onChange={e=>setFormData({...formData, title: e.target.value})} />
              <input type="date" className="w-full border p-2 rounded" value={formData.date || ''} onChange={e=>setFormData({...formData, date: e.target.value})} />
              <input className="w-full border p-2 rounded" placeholder="時間" value={formData.time || ''} onChange={e=>setFormData({...formData, time: e.target.value})} />
              <div className="flex gap-2">
                {editingItem && (
                  <button onClick={() => { if(confirm('刪除？')){ onDelete?.(editingItem.id); setIsOpen(false); } }} className="flex-1 bg-red-50 text-red-600 p-2 rounded flex items-center justify-center gap-1">
                    <Trash2 size={16} /> 刪除
                  </button>
                )}
                <button onClick={() => { 
                  if(editingItem) onUpdate({...editingItem, ...formData} as any);
                  else onAdd({...formData, id: Date.now().toString()} as any);
                  setIsOpen(false);
                }} className="flex-[2] bg-black text-white p-2 rounded">儲存</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
