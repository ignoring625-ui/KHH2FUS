import { useState, useRef } from "react";
import { ArrowLeft, Search, Plus, Utensils, ShoppingCart, Star, MapPin, Clock, Edit, Save, X, MoreHorizontal, Share2, Heart, Upload, Image as ImageIcon } from "lucide-react";
import { cn } from "./ui/utils";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export interface RecommendationItemData {
  id: string;
  category: 'food' | 'shopping';
  image: string;
  name: string;
  rating: string;
  tags: string[];
  description: string;
  location?: string;
  time?: string; // e.g. "12:00 PM - 4:00 PM"
  isFavorite: boolean;
  note?: string;
}

interface AllRecommendationsProps {
  items: RecommendationItemData[];
  onBack: () => void;
  onUpdate: (item: RecommendationItemData) => void;
  onAdd: (item: RecommendationItemData) => void;
}

function StarRating({ value, onChange, readOnly = false }: { value: string | number, onChange?: (val: string) => void, readOnly?: boolean }) {
  const numericValue = parseFloat(String(value));
  
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(star.toString())}
          className={cn(
            "transition-all",
            readOnly ? "cursor-default" : "cursor-pointer hover:scale-110 active:scale-95",
          )}
        >
          <Star 
            size={readOnly ? 16 : 24} 
            className={cn(
              star <= numericValue 
                ? "fill-yellow-400 text-yellow-400" 
                : "fill-gray-100 text-gray-200"
            )} 
          />
        </button>
      ))}
      <span className="text-xs text-gray-500 font-medium ml-2 w-8">
        {numericValue.toFixed(1)}
      </span>
    </div>
  );
}

export function AllRecommendations({ items, onBack, onUpdate, onAdd }: AllRecommendationsProps) {
  const [filter, setFilter] = useState<'all' | 'food' | 'shopping' | 'favorites'>('all');
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState<Partial<RecommendationItemData>>({ category: 'food' });
  const [editingItem, setEditingItem] = useState<RecommendationItemData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'favorites') return item.isFavorite;
    return item.category === filter;
  });

  const handleCreate = () => {
      const item: RecommendationItemData = {
        id: Math.random().toString(36).substr(2, 9),
        category: newItem.category || 'food',
        image: newItem.image || "figma:asset/dce651d5182d4c0a4ee7d91b5920a538659cc5a3.png", // Default placeholder
        name: newItem.name || "新項目",
        rating: newItem.rating || "0.0",
        tags: newItem.tags || [],
        description: newItem.description || "",
        location: newItem.location || "",
        time: newItem.time || "",
        isFavorite: false,
        note: newItem.note || ""
      };
      onAdd(item);
      setIsAdding(false);
      setNewItem({ category: 'food' });
  };

  const handleSaveEdit = () => {
    if (editingItem) {
      onUpdate(editingItem);
      setEditingItem(null);
    }
  };

  const toggleFavorite = (e: React.MouseEvent, item: RecommendationItemData) => {
    e.stopPropagation();
    onUpdate({ ...item, isFavorite: !item.isFavorite });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, setItem: (i: any) => void, currentItem: any) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setItem({ ...currentItem, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Render form for both add and edit
  const renderForm = (item: Partial<RecommendationItemData>, setItem: (i: any) => void) => (
      <div className="space-y-4 p-1">
          {/* Image Upload Area */}
          <div className="space-y-2">
              <Label>封面照片</Label>
              <div 
                className="relative h-48 w-full rounded-2xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-200 group cursor-pointer hover:border-gray-400 transition-colors"
                onClick={() => document.getElementById(`image-upload-${item.id || 'new'}`)?.click()}
              >
                  {item.image ? (
                    <>
                      <img src={item.image} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="text-white flex flex-col items-center gap-2">
                             <Upload size={24} />
                             <span className="text-xs font-medium">更換照片</span>
                          </div>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                        <ImageIcon size={32} />
                        <span className="text-xs">點擊上傳照片</span>
                    </div>
                  )}
                  <input 
                    id={`image-upload-${item.id || 'new'}`}
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleImageUpload(e, setItem, item)}
                  />
              </div>
          </div>

          <div className="space-y-1">
              <Label>類別</Label>
              <div className="flex gap-2">
                  <button 
                    type="button"
                    onClick={() => setItem({...item, category: 'food'})}
                    className={cn(
                        "flex-1 py-2 rounded-lg border text-sm font-medium flex items-center justify-center gap-2 transition-colors",
                        item.category === 'food' ? "bg-orange-50 border-orange-200 text-orange-700" : "bg-white border-gray-200 text-gray-600"
                    )}
                  >
                      <Utensils size={16} /> 美食
                  </button>
                  <button 
                    type="button"
                    onClick={() => setItem({...item, category: 'shopping'})}
                    className={cn(
                        "flex-1 py-2 rounded-lg border text-sm font-medium flex items-center justify-center gap-2 transition-colors",
                        item.category === 'shopping' ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-white border-gray-200 text-gray-600"
                    )}
                  >
                      <ShoppingCart size={16} /> 購物
                  </button>
              </div>
          </div>
          
          <div className="space-y-1">
              <Label>名稱</Label>
              <Input 
                placeholder="餐廳或商店名稱" 
                value={item.name || ""} 
                onChange={e => setItem({...item, name: e.target.value})}
              />
          </div>

          <div className="grid grid-cols-2 gap-3">
             <div className="space-y-1">
                <Label>評分</Label>
                <div className="h-10 flex items-center px-1">
                    <StarRating 
                        value={item.rating || 0} 
                        onChange={(val) => setItem({...item, rating: val})}
                    />
                </div>
             </div>
             <div className="space-y-1">
                <Label>時間</Label>
                <Input 
                  placeholder="e.g. 12:00 - 14:00" 
                  value={item.time || ""} 
                  onChange={e => setItem({...item, time: e.target.value})}
                />
             </div>
          </div>

          <div className="space-y-1">
              <Label>標籤 (逗號分隔)</Label>
              <Input 
                placeholder="例如: 韓式, 烤肉, 必吃" 
                value={item.tags?.join(", ") || ""} 
                onChange={e => setItem({...item, tags: e.target.value.split(/[,，]/).map((t: string) => t.trim()).filter(Boolean)})}
              />
          </div>

          <div className="space-y-1">
              <Label>地點 / 位置</Label>
              <Input 
                placeholder="e.g. Current Trip: Spain" 
                value={item.location || ""} 
                onChange={e => setItem({...item, location: e.target.value})}
              />
          </div>

          <div className="space-y-1">
              <Label>描述</Label>
              <Textarea 
                placeholder="詳細介紹..." 
                value={item.description || ""} 
                onChange={e => setItem({...item, description: e.target.value})}
              />
          </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
       {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-40 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors -ml-2"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">清單</h1>
        </div>
        
        <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
              <Search size={20} />
            </button>
            <Drawer open={isAdding} onOpenChange={setIsAdding}>
              <DrawerTrigger asChild>
                <button className="bg-black text-white p-2 rounded-full shadow-md active:scale-95 transition-transform">
                  <Plus size={20} />
                </button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[95vh]">
                <div className="mx-auto w-full max-w-md p-4 flex flex-col h-[80vh]">
                    <DrawerHeader className="px-0">
                        <DrawerTitle>新增項目</DrawerTitle>
                        <DrawerDescription>新增餐廳或購物景點</DrawerDescription>
                    </DrawerHeader>
                    
                    <div className="flex-1 overflow-y-auto -mx-2 px-2">
                        {renderForm(newItem, setNewItem)}
                    </div>
                    
                    <DrawerFooter className="px-0 pt-4">
                        <Button onClick={handleCreate} className="w-full rounded-xl h-12">建立</Button>
                        <DrawerClose asChild>
                            <Button variant="outline" className="w-full rounded-xl">取消</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-gray-100 p-4">
         <div className="flex justify-between gap-4">
             <button 
                onClick={() => setFilter('food')}
                className={cn(
                    "flex-1 h-20 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all active:scale-95",
                    filter === 'food' ? "bg-orange-50 border-orange-200 text-orange-600" : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"
                )}
             >
                 <Utensils size={24} />
                 <span className="text-xs font-medium text-gray-600">美食</span>
             </button>
             <button 
                onClick={() => setFilter('shopping')}
                className={cn(
                    "flex-1 h-20 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all active:scale-95",
                    filter === 'shopping' ? "bg-blue-50 border-blue-200 text-blue-600" : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"
                )}
             >
                 <ShoppingCart size={24} />
                 <span className="text-xs font-medium text-gray-600">購物</span>
             </button>
             <button 
                onClick={() => setFilter(filter === 'favorites' ? 'all' : 'favorites')}
                className={cn(
                    "flex-1 h-20 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all active:scale-95",
                    filter === 'favorites' ? "bg-yellow-50 border-yellow-200 text-yellow-600" : "bg-white border-gray-100 text-gray-400 hover:border-gray-200"
                )}
             >
                 <Star size={24} className={filter === 'favorites' ? "fill-yellow-600" : ""} />
                 <span className="text-xs font-medium text-gray-600">最愛清單</span>
             </button>
         </div>
      </div>

      {/* List */}
      <div className="p-4 space-y-6 pb-20">
          {filteredItems.map(item => (
            <Drawer key={item.id} onClose={() => setEditingItem(null)}>
              <DrawerTrigger asChild>
                  {/* Card Component matching the design */}
                  <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 cursor-pointer active:scale-[0.99] transition-transform">
                      {/* Header Line */}
                      <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                  {/* Just a placeholder avatar for now */}
                                  <span className="text-xs font-bold">U</span>
                              </div>
                              <div>
                                  <p className="text-sm font-bold text-gray-900">Traveler Name</p>
                                  <p className="text-xs text-gray-400">{item.location || "Trip Planner"}</p>
                              </div>
                          </div>
                          <button 
                            onClick={(e) => toggleFavorite(e, item)}
                            className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
                          >
                             {item.isFavorite ? <Star className="fill-yellow-500 text-yellow-500" size={20} /> : <Star size={20} />}
                          </button>
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                          <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                          
                          {item.time && (
                              <p className="text-xs text-gray-500 font-medium">{item.time}</p>
                          )}

                          <div className="flex flex-wrap gap-2 pt-1">
                              {item.tags.map((tag, i) => (
                                  <span key={i} className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md border border-gray-100">
                                      {tag}
                                  </span>
                              ))}
                              <span className="flex items-center gap-1 text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md">
                                  {item.rating} <Star size={10} className="fill-current" />
                              </span>
                          </div>

                          <p className="text-sm text-gray-600 leading-relaxed py-2 line-clamp-2">
                              {item.description}
                          </p>
                      </div>

                      {/* Image Area */}
                      <div className="mt-3 relative h-48 rounded-2xl overflow-hidden bg-gray-100">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                              {/* Fake Carousel Dots */}
                              <div className="w-4 h-1 bg-white rounded-full opacity-100" />
                              <div className="w-1 h-1 bg-white rounded-full opacity-50" />
                              <div className="w-1 h-1 bg-white rounded-full opacity-50" />
                          </div>
                      </div>
                  </div>
              </DrawerTrigger>

              <DrawerContent className="max-h-[95vh]">
                 <div className="mx-auto w-full max-w-md overflow-hidden flex flex-col h-[85vh]">
                     {editingItem && editingItem.id === item.id ? (
                         // Edit Mode
                         <>
                            <DrawerHeader className="text-left pb-0">
                               <DrawerTitle>編輯項目</DrawerTitle>
                               <DrawerDescription className="sr-only">修改項目詳細資訊</DrawerDescription>
                            </DrawerHeader>
                            <div className="p-4 overflow-y-auto flex-1">
                                {renderForm(editingItem, setEditingItem)}
                            </div>
                            <DrawerFooter className="pt-4">
                               <Button onClick={handleSaveEdit} className="w-full rounded-xl h-12">
                                 <Save size={16} className="mr-2" /> 儲存變更
                               </Button>
                               <Button variant="outline" onClick={() => setEditingItem(null)} className="w-full rounded-xl">取消</Button>
                            </DrawerFooter>
                         </>
                     ) : (
                         // View Mode
                         <>
                            <div className="sr-only">
                               <DrawerTitle>{item.name}</DrawerTitle>
                               <DrawerDescription>詳細資訊與評分</DrawerDescription>
                            </div>
                            <div className="relative h-64 shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                <button 
                                  onClick={() => setEditingItem(item)}
                                  className="absolute top-4 right-4 bg-white/90 backdrop-blur text-black p-2 rounded-full shadow-sm z-10"
                                >
                                    <Edit size={18} />
                                </button>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h2 className="text-2xl font-bold">{item.name}</h2>
                                    <div className="flex items-center gap-2 mt-1 opacity-90">
                                        <MapPin size={14} />
                                        <span className="text-sm">{item.location || "未指定地點"}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 overflow-y-auto flex-1 space-y-6">
                                {/* Quick Stats */}
                                <div className="flex gap-4 border-b border-gray-100 pb-4">
                                    <div className="flex-1 text-center border-r border-gray-100">
                                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">評分</p>
                                        <div className="flex justify-center items-center gap-1">
                                            <StarRating value={item.rating} readOnly />
                                        </div>
                                    </div>
                                    <div className="flex-1 text-center border-r border-gray-100">
                                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">類別</p>
                                        <p className="text-lg font-bold text-gray-900">
                                            {item.category === 'food' ? '美食' : '購物'}
                                        </p>
                                    </div>
                                    <div className="flex-1 text-center">
                                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">時間</p>
                                        <p className="text-sm font-bold text-gray-900 pt-1 truncate">{item.time || "全日"}</p>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <h3 className="font-bold text-gray-900">關於</h3>
                                    <p className="text-gray-600 leading-relaxed text-sm">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Tags */}
                                <div className="space-y-2">
                                    <h3 className="font-bold text-gray-900">標籤</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {item.tags.map((tag, i) => (
                                            <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            <DrawerFooter className="pt-2">
                               <div className="flex gap-3">
                                   <Button 
                                     variant="outline" 
                                     className="flex-1 h-12 rounded-xl"
                                     onClick={(e) => toggleFavorite(e, item)}
                                   >
                                       <Heart className={cn("mr-2", item.isFavorite ? "fill-red-500 text-red-500" : "")} size={18} /> 
                                       {item.isFavorite ? "已收藏" : "收藏"}
                                   </Button>
                                   <Button className="flex-1 h-12 rounded-xl">
                                       <Share2 className="mr-2" size={18} /> 分享
                                   </Button>
                               </div>
                               <DrawerClose asChild>
                                   <Button variant="ghost" className="w-full rounded-xl">關閉</Button>
                               </DrawerClose>
                            </DrawerFooter>
                         </>
                     )}
                 </div>
              </DrawerContent>
            </Drawer>
          ))}

          {filteredItems.length === 0 && (
              <div className="text-center py-20">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                      <Search size={32} />
                  </div>
                  <h3 className="text-gray-900 font-bold mb-1">找不到相關項目</h3>
                  <p className="text-gray-500 text-sm">試試切換其他類別或新增項目</p>
              </div>
          )}
      </div>
    </div>
  );
}
