import { Star } from "lucide-react";

interface RecommendationItemProps {
  image: string;
  name: string;
  rating: string;
  tags: string[];
  description: string;
}

function RecommendationItem({ image, name, rating, tags, description }: RecommendationItemProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col h-full group">
      <div className="relative h-32 overflow-hidden shrink-0">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="p-3 flex flex-col flex-1 gap-2">
        <h3 className="font-bold text-sm text-gray-900 leading-tight">{name}</h3>
        
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="bg-yellow-50 text-yellow-700 text-[10px] px-1.5 py-0.5 rounded font-medium flex items-center gap-0.5 border border-yellow-100">
            {rating} <Star size={8} className="fill-current" />
          </span>
          {tags.map((tag, i) => (
            <span key={i} className="bg-gray-50 text-gray-600 text-[10px] px-1.5 py-0.5 rounded border border-gray-100">
              {tag}
            </span>
          ))}
        </div>
        
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mt-auto">
          {description}
        </p>
      </div>
    </div>
  );
}

interface RecommendationSectionProps {
  title: string;
  subtitle: string;
  items: RecommendationItemProps[];
  buttonText?: string;
  onViewAll?: () => void;
}

export function RecommendationSection({ title, subtitle, items, buttonText = "查看所有清單", onViewAll }: RecommendationSectionProps) {
  return (
    <div className="space-y-4 px-4">
      <div>
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {items.map((item, index) => (
          <RecommendationItem key={index} {...item} />
        ))}
      </div>

      <button 
        onClick={onViewAll}
        className="w-full bg-white border border-gray-200 text-gray-900 py-3.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
      >
        {buttonText}
      </button>
    </div>
  );
}
