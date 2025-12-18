import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, Trash2 } from 'lucide-react';

export interface MemberProfile { id: string; name: string; isMe?: boolean; avatar?: string; }
interface ProfileSettingsProps { isOpen: boolean; onClose: () => void; members: MemberProfile[]; onUpdateMember: (id: string, name: string, avatar?: string) => void; onAddMember: (name: string) => void; onRemoveMember: (id: string) => void; }

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({ isOpen, onClose, members, onAddMember, onRemoveMember }) => {
  const [newName, setNewName] = useState("");
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-end justify-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="relative w-full max-w-md bg-white rounded-t-[40px] p-8 max-h-[85dvh] overflow-y-auto pb-12 shadow-2xl">
            <div className="flex justify-between items-center mb-6"><h3 className="text-2xl font-black uppercase tracking-tighter">Members</h3><button onClick={onClose} className="p-2 bg-gray-100 rounded-full"><X size={20} /></button></div>
            <div className="flex gap-2 mb-8">
              <input className="flex-1 p-5 bg-gray-50 rounded-[20px] outline-none ring-black focus:ring-2" placeholder="New Name..." value={newName} onChange={e => setNewName(e.target.value)} />
              <button onClick={() => { if(newName){onAddMember(newName); setNewName("");} }} className="px-6 bg-black text-white rounded-[20px] font-bold flex items-center gap-2"><UserPlus size={18}/>Add</button>
            </div>
            <div className="space-y-3">
              {members.map(m => (
                <div key={m.id} className="flex items-center justify-between p-5 bg-gray-50 rounded-[24px]">
                  <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">{m.name[0]}</div><span className="font-bold">{m.name} {m.isMe && "(Me)"}</span></div>
                  {!m.isMe && <button onClick={() => onRemoveMember(m.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-full"><Trash2 size={18}/></button>}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
