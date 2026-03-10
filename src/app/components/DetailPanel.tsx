import { motion, AnimatePresence } from "motion/react";
import { X, ArrowUpRight, CheckCircle2, TrendingUp, Code } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Website {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  features: string[];
  results: string[];
  price: string;
  thumbnail: string;
  screenshots: string[];
  year: string;
  services: string[];
  builtBy: string;
  clientTestimonial?: string;
}

interface DetailPanelProps {
  website: Website | null;
  onClose: () => void;
}

export function DetailPanel({ website, onClose }: DetailPanelProps) {
  return (
    <AnimatePresence>
      {website && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          />
          
          {/* Panel */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 35, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 bg-white border-t-4 border-black z-50 max-h-[90vh] overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto">
              {/* Header Section */}
              <div className="border-b-2 border-black p-8 lg:p-12 sticky top-0 bg-white z-10">
                <div className="flex justify-between items-start gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-[10px] uppercase tracking-[0.2em] font-semibold">
                        {website.category}
                      </div>
                      <div className="w-px h-4 bg-black" />
                      <div className="text-[10px] uppercase tracking-[0.2em] font-semibold">
                        {website.year}
                      </div>
                    </div>
                    <h2 className="text-5xl lg:text-7xl font-bold mb-6 leading-none">{website.title}</h2>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {website.services.map((service, index) => (
                        <div key={index} className="border border-black px-4 py-2 text-sm">
                          {service}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-4">
                    <button
                      onClick={onClose}
                      className="border-2 border-black p-3 hover:bg-black hover:text-white transition-colors"
                    >
                      <X size={24} />
                    </button>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">Project Value</div>
                      <div className="text-3xl font-bold">{website.price}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12">
                {/* Full Description */}
                <div className="max-w-4xl mb-16">
                  <h3 className="text-sm uppercase tracking-[0.2em] font-semibold mb-6">Overview</h3>
                  <p className="text-2xl leading-relaxed mb-8">{website.fullDescription}</p>
                  
                  {website.clientTestimonial && (
                    <div className="border-l-4 border-black pl-6 py-4 bg-gray-50">
                      <p className="text-lg italic text-gray-700">"{website.clientTestimonial}"</p>
                      <p className="text-sm text-gray-600 mt-2">— Client Testimonial</p>
                    </div>
                  )}
                </div>

                {/* Features & Results Grid */}
                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                  {/* Features */}
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <CheckCircle2 size={20} />
                      <h3 className="text-sm uppercase tracking-[0.2em] font-semibold">Key Features</h3>
                    </div>
                    <ul className="space-y-3">
                      {website.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Results */}
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <TrendingUp size={20} />
                      <h3 className="text-sm uppercase tracking-[0.2em] font-semibold">Proven Results</h3>
                    </div>
                    <ul className="space-y-4">
                      {website.results.map((result, index) => (
                        <li key={index} className="border-2 border-black p-4 hover:bg-black hover:text-white transition-colors">
                          <span className="font-semibold">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Screenshots Grid */}
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm uppercase tracking-[0.2em] font-semibold">Project Showcase</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span>{website.screenshots.length} Images</span>
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {website.screenshots.map((screenshot, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-2 border-black overflow-hidden group"
                      >
                        <div className="relative overflow-hidden">
                          <ImageWithFallback
                            src={screenshot}
                            alt={`${website.title} screenshot ${index + 1}`}
                            className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                        </div>
                        <div className="border-t-2 border-black p-4 bg-white">
                          <div className="text-xs uppercase tracking-wider text-gray-600">
                            View {index + 1}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Built By Credit */}
                <div className="mt-16 pt-12 border-t-2 border-black">
                  <div className="flex items-center gap-3 mb-8">
                    <Code size={20} />
                    <h3 className="text-sm uppercase tracking-[0.2em] font-semibold">Development Credit</h3>
                  </div>
                  <div className="bg-black text-white p-6 inline-block">
                    <p className="text-sm mb-1">Crafted by</p>
                    <p className="text-xl font-bold">{website.builtBy}</p>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="mt-16 pt-12 border-t-2 border-black">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">Ready to start your project?</h3>
                      <p className="text-gray-600">Let's build something extraordinary together</p>
                    </div>
                    <a 
                      href="#contact"
                      onClick={onClose}
                      className="border-2 border-black px-8 py-4 font-semibold hover:bg-black hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      Get in Touch
                      <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}