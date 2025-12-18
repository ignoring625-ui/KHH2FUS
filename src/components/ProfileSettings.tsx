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
        <div className="fixed inset-0 z-[100] flex items-end justify-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="relative w-full max-w-md bg-white rounded-t-[32px] p-6 max-h-[85dvh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">成員管理</h3>
              <button onClick={onClose} className="p-2 bg-gray-100 rounded-full"><X size={20} /></button>
            </div>

            {/* 新增成員：移到最上方 */}
            <div className="flex gap-2 mb-6">
              <input className="flex-1 p-4 bg-gray-50 rounded-2xl outline-none ring-black focus:ring-2" placeholder="輸入成員名稱..." value={newName} onChange={e => setNewName(e.target.value)} />
              <button onClick={() => { if(newName){onAddMember(newName); setNewName("");} }} className="px-6 bg-black text-white rounded-2xl font-bold flex items-center gap-2"><UserPlus size={18}/>添加</button>
            </div>

            <div className="space-y-3">
              {members.map(member => (
                <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold">{member.name[0]}</div>
                    <span className="font-medium">{member.name} {member.isMe && "(我)"}</span>
                  </div>
                  {!member.isMe && (
                    <button onClick={() => onRemoveMember(member.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-full"><Trash2 size={18}/></button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
