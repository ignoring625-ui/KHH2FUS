import { useState, useRef } from "react";
import { ArrowLeft, Camera, Edit2, Check, X, User, Trash2, Plus } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "./ui/utils";

export interface MemberProfile {
  id: string;
  name: string;
  avatar?: string;
  isMe?: boolean;
}

interface ProfileSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  members: MemberProfile[];
  onUpdateMember: (id: string, name: string, avatar?: string) => void;
  onAddMember?: (name: string) => void;
  onRemoveMember?: (id: string) => void;
}

export function ProfileSettings({ isOpen, onClose, members, onUpdateMember, onAddMember, onRemoveMember }: ProfileSettingsProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [newMemberName, setNewMemberName] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = (member: MemberProfile) => {
    setEditingId(member.id);
    setEditName(member.name);
    setIsAdding(false);
  };

  const handleSaveClick = (id: string) => {
    // Save name change
    const member = members.find(m => m.id === id);
    if (member && editName.trim() !== "") {
      onUpdateMember(id, editName, member.avatar);
    }
    setEditingId(null);
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditName("");
  };

  const handleAddClick = () => {
    if (newMemberName.trim() !== "" && onAddMember) {
      onAddMember(newMemberName);
      setNewMemberName("");
      setIsAdding(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>, memberId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const member = members.find(m => m.id === memberId);
        if (member) {
          onUpdateMember(memberId, member.name, reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = (memberId: string) => {
    const input = document.getElementById(`avatar-upload-${memberId}`);
    input?.click();
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[90vh]">
        <div className="mx-auto w-full max-w-md flex flex-col h-[80vh]">
          <DrawerHeader className="text-left">
            <div className="flex justify-between items-center">
               <div>
                  <DrawerTitle>成員檔案</DrawerTitle>
                  <DrawerDescription>管理成員的顯示名稱與頭像</DrawerDescription>
               </div>
               {/* Add Member Button - Only visible when not adding */}
               {!isAdding && onAddMember && (
                  <Button 
                    size="sm" 
                    onClick={() => setIsAdding(true)}
                    className="h-8 rounded-full bg-black text-white px-3 text-xs"
                  >
                    <Plus size={14} className="mr-1" /> 新增成員
                  </Button>
               )}
            </div>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Add Member Form */}
            {isAdding && (
              <div className="flex items-center gap-4 bg-indigo-50 p-4 rounded-2xl border border-indigo-100 animate-in fade-in slide-in-from-top-2">
                 <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-indigo-300 border-2 border-indigo-200 border-dashed">
                    <User size={24} />
                 </div>
                 <div className="flex-1 flex gap-2">
                    <Input
                      placeholder="輸入成員名稱"
                      value={newMemberName}
                      onChange={(e) => setNewMemberName(e.target.value)}
                      className="h-10 bg-white"
                      autoFocus
                    />
                    <Button size="icon" className="h-10 w-10 shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg" onClick={handleAddClick}>
                      <Check size={16} />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-10 w-10 shrink-0 rounded-lg text-gray-500" onClick={() => setIsAdding(false)}>
                      <X size={16} />
                    </Button>
                 </div>
              </div>
            )}

            {members.map((member) => (
              <div key={member.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                {/* Avatar Section */}
                <div className="relative shrink-0">
                  <div 
                    className="w-16 h-16 rounded-full bg-white border-2 border-white shadow-sm overflow-hidden flex items-center justify-center cursor-pointer group"
                    onClick={() => triggerFileUpload(member.id)}
                  >
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                        <User size={24} />
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={20} className="text-white" />
                    </div>
                  </div>
                  <input
                    id={`avatar-upload-${member.id}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleAvatarChange(e, member.id)}
                  />
                </div>

                {/* Info Section */}
                <div className="flex-1 min-w-0">
                  {editingId === member.id ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="h-9"
                        autoFocus
                      />
                      <Button size="icon" className="h-9 w-9 shrink-0 bg-black text-white rounded-lg" onClick={() => handleSaveClick(member.id)}>
                        <Check size={16} />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-9 w-9 shrink-0 rounded-lg" onClick={handleCancelClick}>
                        <X size={16} />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                           <h3 className="font-bold text-gray-900">{member.name}</h3>
                           {member.isMe && <span className="bg-gray-200 text-gray-600 text-[10px] px-1.5 py-0.5 rounded-full font-medium">我</span>}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {member.isMe ? "點擊頭像更換照片" : "成員"}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-black" onClick={() => handleEditClick(member)}>
                            <Edit2 size={16} />
                        </Button>
                        {!member.isMe && onRemoveMember && (
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50" onClick={() => onRemoveMember(member.id)}>
                                <Trash2 size={16} />
                            </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            <div className="bg-blue-50 p-4 rounded-xl text-xs text-blue-700 leading-relaxed flex gap-2">
               <div className="shrink-0 mt-0.5">ℹ️</div>
               <p>修改成員名稱後，所有相關的行程、分帳與票券紀錄也會自動更新。移除成員時請注意相關的分帳資料可能需要手動調整。</p>
            </div>
          </div>

          <DrawerFooter>
            <Button onClick={onClose} className="w-full rounded-xl h-12">完成</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
