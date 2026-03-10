import { useState, useEffect } from "react";
import { WebsiteCard } from "../components/WebsiteCard";
import { DetailPanel } from "../components/DetailPanel";
import { ContactSection } from "../components/ContactSection";
import { motion } from "motion/react";
import { ArrowUpRight, Award } from "lucide-react";
import { supabase } from "../../lib/supabase";

export interface Website {
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

// Fallback data if Supabase is not connected
const fallbackWebsites: Website[] = [
  {
    id: 1,
    title: "Analytics Dashboard Pro",
    category: "SaaS Platform",
    description: "Transform your business data into actionable insights with our award-winning analytics platform.",
    fullDescription: "Analytics Dashboard Pro revolutionizes how modern businesses understand their data. Built from the ground up with enterprise-grade security and scalability, this platform delivers real-time insights that drive decision-making. Our advanced visualization engine processes millions of data points seamlessly, presenting complex information in an intuitive, beautiful interface.",
    features: [
      "Real-time data processing with sub-second latency",
      "AI-powered predictive analytics and forecasting",
      "Custom dashboard builder with 50+ widget types",
      "Multi-source data integration (REST API, GraphQL, Webhooks)",
      "Advanced user permissions and role management",
      "White-label solution with full branding customization",
      "Mobile-responsive design for on-the-go insights",
      "Automated report generation and email scheduling"
    ],
    results: [
      "45% increase in user engagement within first month",
      "Reduced data analysis time from hours to minutes",
      "99.99% uptime guarantee with global CDN",
      "Handles 10M+ daily active users effortlessly"
    ],
    price: "$12,500",
    year: "2024",
    services: ["UI/UX Design", "Development", "API Integration"],
    builtBy: "FrameStudio Development Team",
    clientTestimonial: "This dashboard completely transformed how we make business decisions. The ROI was visible within the first week.",
    thumbnail: "https://images.unsplash.com/photo-1748609278627-4b0e483b9b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc3MjkwOTg2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    screenshots: [
      "https://images.unsplash.com/photo-1748609278627-4b0e483b9b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc3MjkwOTg2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWFzJTIwZGFzaGJvYXJkJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3Mjk1ODU5MHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1560202582-a391c31ec300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kaW5nJTIwcGFnZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzI5NzAwNzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1605108222700-0d605d9ebafe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzcyODczMTU3fDA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    id: 2,
    title: "ShopHub E-commerce",
    category: "E-commerce",
    description: "Launch your online store with a platform designed to convert browsers into loyal customers.",
    fullDescription: "ShopHub is not just another e-commerce platform—it's a complete online retail ecosystem. Every pixel, every interaction, every feature is crafted to maximize conversions and create delightful shopping experiences. From the moment customers land on your store to post-purchase engagement, ShopHub handles it all with elegance and efficiency.",
    features: [
      "Lightning-fast product search with AI recommendations",
      "One-click checkout with saved payment methods",
      "Advanced inventory management across multiple warehouses",
      "Integrated shipping calculator with 20+ carriers",
      "Customer loyalty program and rewards system",
      "Multi-currency support with automatic conversion",
      "Abandoned cart recovery with automated emails",
      "Product review system with photo uploads",
      "Analytics dashboard tracking conversion funnels"
    ],
    results: [
      "Average 38% increase in conversion rates",
      "72% reduction in cart abandonment",
      "Mobile sales increased by 156%",
      "Customer lifetime value up 89%"
    ],
    price: "$18,000",
    year: "2025",
    services: ["E-commerce", "Payment Integration", "Mobile Design"],
    builtBy: "FrameStudio Commerce Division",
    clientTestimonial: "Our sales tripled in the first quarter. ShopHub paid for itself in just 6 weeks.",
    thumbnail: "https://images.unsplash.com/photo-1694599048261-a1de00f0117e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc3Mjk2ODg0M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    screenshots: [
      "https://images.unsplash.com/photo-1694599048261-a1de00f0117e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc3Mjk2ODg0M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1605108222700-0d605d9ebafe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzcyODczMTU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1603201667493-4c2696de0b1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBidXNpbmVzcyUyMHdlYnNpdGV8ZW58MXx8fHwxNzcyOTQxMzMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1748609278627-4b0e483b9b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc3MjkwOTg2N3ww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    id: 3,
    title: "Corporate Solutions Inc",
    category: "Corporate Website",
    description: "Establish authority in your industry with a corporate website that commands respect and drives leads.",
    fullDescription: "Your corporate website is your digital headquarters—the first impression for potential clients, partners, and talent. Corporate Solutions Inc is engineered to position your brand as an industry leader. With sophisticated design, compelling content architecture, and conversion-optimized layouts, this platform turns visitors into qualified leads while showcasing your company's values and expertise.",
    features: [
      "Executive team profiles with dynamic bios",
      "Interactive case study showcase with metrics",
      "Multi-step contact forms with lead scoring",
      "Blog platform with advanced SEO optimization",
      "Client testimonial carousel with video support",
      "Career portal with applicant tracking integration",
      "Resource library with gated content",
      "Live chat integration with CRM sync",
      "Multi-language support for global reach"
    ],
    results: [
      "267% increase in qualified lead generation",
      "First-page Google rankings for 45+ keywords",
      "Average session duration increased by 124%",
      "LinkedIn referral traffic up 340%"
    ],
    price: "$8,500",
    year: "2024",
    services: ["Branding", "Web Design", "SEO"],
    builtBy: "FrameStudio Creative Team",
    clientTestimonial: "This website elevated our brand perception overnight. We're now competing with industry giants.",
    thumbnail: "https://images.unsplash.com/photo-1603201667493-4c2696de0b1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBidXNpbmVzcyUyMHdlYnNpdGV8ZW58MXx8fHwxNzcyOTQxMzMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    screenshots: [
      "https://images.unsplash.com/photo-1603201667493-4c2696de0b1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBidXNpbmVzcyUyMHdlYnNpdGV8ZW58MXx8fHwxNzcyOTQxMzMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1560202582-a391c31ec300?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kaW5nJTIwcGFnZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzI5NzAwNzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1575388902449-6bca946ad549?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWFzJTIwZGFzaGJvYXJkJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3Mjk1ODU5MHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1720293049481-c0299876d90f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHBvcnRmb2xpbyUyMHdlYnNpdGV8ZW58MXx8fHwxNzcyOTc0MTc0fDA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  }
];

export default function Home() {
  const [selectedWebsite, setSelectedWebsite] = useState<Website | null>(null);
  const [websites, setWebsites] = useState<Website[]>(fallbackWebsites);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWebsites();
  }, []);

  const loadWebsites = async () => {
    // If Supabase is not configured, use fallback data
    if (!supabase) {
      setWebsites(fallbackWebsites);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('websites')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        // Transform Supabase data to match our interface
        const transformedData = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          description: item.description,
          fullDescription: item.full_description,
          features: item.features,
          results: item.results,
          price: item.price,
          thumbnail: item.thumbnail,
          screenshots: item.screenshots,
          year: item.year,
          services: item.services,
          builtBy: item.built_by,
          clientTestimonial: item.client_testimonial
        }));
        setWebsites(transformedData);
      } else {
        setWebsites(fallbackWebsites);
      }
    } catch (error) {
      console.error('Error loading websites:', error);
      setWebsites(fallbackWebsites);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Hero Header */}
      <header className="border-b-4 border-black bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
          <div className="flex items-center justify-between mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="w-3 h-3 bg-black" />
              <h1 className="text-3xl lg:text-4xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                FrameStudio
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-6"
            >
              <a href="#contact" className="hidden lg:flex items-center gap-2 text-sm uppercase tracking-wider hover:translate-x-1 transition-transform">
                Contact <ArrowUpRight size={16} />
              </a>
              <div className="border-2 border-black p-2">
                <Award size={20} />
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-5xl lg:text-8xl font-bold mb-6 leading-none" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              Award-Winning<br />Digital Experiences
            </h2>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <p className="text-lg lg:text-xl text-gray-600 max-w-2xl">
                We craft exceptional websites and digital products that push the boundaries of design and technology.
              </p>
              <div className="flex items-center gap-8 text-sm">
                <div>
                  <div className="text-3xl font-bold">{websites.length}+</div>
                  <div className="text-gray-600 uppercase tracking-wider">Projects</div>
                </div>
                <div className="w-px h-12 bg-black" />
                <div>
                  <div className="text-3xl font-bold">12+</div>
                  <div className="text-gray-600 uppercase tracking-wider">Awards</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-sm uppercase tracking-[0.2em] font-semibold mb-2">Featured Work</h3>
          <div className="w-16 h-1 bg-black" />
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <div className="text-xl">Loading projects...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {websites.map((website, index) => (
              <WebsiteCard
                key={website.id}
                title={website.title}
                category={website.category}
                thumbnail={website.thumbnail}
                onClick={() => setSelectedWebsite(website)}
                index={index}
              />
            ))}
          </div>
        )}
      </main>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="border-t-4 border-black py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-black" />
                <div className="text-xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  FrameStudio
                </div>
              </div>
              <p className="text-gray-600">Crafting digital excellence since 2020</p>
            </div>
            <div className="flex gap-8 text-sm uppercase tracking-wider">
              <a href="#" className="hover:translate-x-1 transition-transform">About</a>
              <a href="#" className="hover:translate-x-1 transition-transform">Services</a>
              <a href="#contact" className="hover:translate-x-1 transition-transform">Contact</a>
              <a href="/admin" className="hover:translate-x-1 transition-transform opacity-50 hover:opacity-100">Admin</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Detail Panel */}
      <DetailPanel 
        website={selectedWebsite} 
        onClose={() => setSelectedWebsite(null)} 
      />
    </div>
  );
}