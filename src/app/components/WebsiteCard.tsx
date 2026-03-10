import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

interface WebsiteCardProps {
  title: string;
  category: string;
  thumbnail: string;
  onClick: () => void;
  index: number;
}

export function WebsiteCard({ title, category, thumbnail, onClick, index }: WebsiteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="border-2 border-black overflow-hidden bg-white transition-transform duration-300 hover:-translate-y-2">
        <div className="aspect-[4/3] overflow-hidden relative">
          <ImageWithFallback 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </div>
        <div className="p-6 border-t-2 border-black">
          <div className="flex justify-between items-start mb-3">
            <div className="text-[10px] uppercase tracking-[0.2em] font-semibold">{category}</div>
            <div className="w-2 h-2 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h3 className="text-2xl font-semibold group-hover:translate-x-1 transition-transform duration-300">{title}</h3>
        </div>
      </div>
    </motion.div>
  );
}