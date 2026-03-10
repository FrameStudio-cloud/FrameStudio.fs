import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Plus, Edit, Trash2, LogOut, Eye, Save, X } from "lucide-react";
import { supabase } from "../../lib/supabase";
import type { Website } from "./Home";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState<Website | null>(null);
  const [formData, setFormData] = useState<Partial<Website>>({
    title: "",
    category: "",
    description: "",
    fullDescription: "",
    features: [""],
    results: [""],
    price: "",
    thumbnail: "",
    screenshots: [""],
    year: new Date().getFullYear().toString(),
    services: [""],
    builtBy: "FrameStudio",
    clientTestimonial: ""
  });

  useEffect(() => {
    checkAuth();
    loadWebsites();
  }, []);

  const checkAuth = async () => {
    if (!supabase) {
      navigate("/admin");
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin");
    }
  };

  const loadWebsites = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('websites')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;

      if (data) {
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
      }
    } catch (error) {
      console.error('Error loading websites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    navigate("/admin");
  };

  const handleAddNew = () => {
    setEditingWebsite(null);
    setFormData({
      title: "",
      category: "",
      description: "",
      fullDescription: "",
      features: [""],
      results: [""],
      price: "",
      thumbnail: "",
      screenshots: [""],
      year: new Date().getFullYear().toString(),
      services: [""],
      builtBy: "FrameStudio",
      clientTestimonial: ""
    });
    setShowForm(true);
  };

  const handleEdit = (website: Website) => {
    setEditingWebsite(website);
    setFormData({
      title: website.title,
      category: website.category,
      description: website.description,
      fullDescription: website.fullDescription,
      features: website.features,
      results: website.results,
      price: website.price,
      thumbnail: website.thumbnail,
      screenshots: website.screenshots,
      year: website.year,
      services: website.services,
      builtBy: website.builtBy,
      clientTestimonial: website.clientTestimonial
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    if (!supabase) {
      alert("Supabase not configured");
      return;
    }

    try {
      const { error } = await supabase
        .from('websites')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await loadWebsites();
      alert("Project deleted successfully!");
    } catch (error: any) {
      alert("Error deleting project: " + error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!supabase) {
      alert("Supabase not configured. Please set up Supabase first.");
      return;
    }

    const websiteData = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      full_description: formData.fullDescription,
      features: formData.features?.filter(f => f.trim() !== ""),
      results: formData.results?.filter(r => r.trim() !== ""),
      price: formData.price,
      thumbnail: formData.thumbnail,
      screenshots: formData.screenshots?.filter(s => s.trim() !== ""),
      year: formData.year,
      services: formData.services?.filter(s => s.trim() !== ""),
      built_by: formData.builtBy,
      client_testimonial: formData.clientTestimonial,
      published: true,
      sort_order: websites.length
    };

    try {
      if (editingWebsite) {
        // Update existing
        const { error } = await supabase
          .from('websites')
          .update(websiteData)
          .eq('id', editingWebsite.id);

        if (error) throw error;
        alert("Project updated successfully!");
      } else {
        // Insert new
        const { error } = await supabase
          .from('websites')
          .insert([websiteData]);

        if (error) throw error;
        alert("Project added successfully!");
      }

      setShowForm(false);
      await loadWebsites();
    } catch (error: any) {
      alert("Error saving project: " + error.message);
    }
  };

  const updateArrayField = (field: keyof Website, index: number, value: string) => {
    const array = [...(formData[field] as string[] || [])];
    array[index] = value;
    setFormData({ ...formData, [field]: array });
  };

  const addArrayItem = (field: keyof Website) => {
    const array = [...(formData[field] as string[] || []), ""];
    setFormData({ ...formData, [field]: array });
  };

  const removeArrayItem = (field: keyof Website, index: number) => {
    const array = (formData[field] as string[] || []).filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: array });
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!supabase) return;

  const file = e.target.files?.[0];
  if (!file) return;

  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("thumbnails")
    .upload(fileName, file);

  if (error) {
    console.error(error);
    alert("Upload failed");
    return;
  }

  const { data } = supabase.storage
    .from("thumbnails")
    .getPublicUrl(fileName);

  setFormData({
    ...formData,
    thumbnail: data.publicUrl
  });
};

  if (!supabase) {
    return (
      <div className="min-h-screen bg-white p-6 flex items-center justify-center">
        <div className="max-w-2xl border-4 border-red-500 p-8">
          <h1 className="text-3xl font-bold mb-4">⚠️ Supabase Required</h1>
          <p className="mb-4">The admin dashboard requires Supabase to be configured.</p>
          <ol className="list-decimal list-inside space-y-2 mb-6">
            <li>Configure Supabase in <code className="bg-gray-100 px-2 py-1">/src/lib/supabase.ts</code></li>
            <li>Run the SQL schema from <code className="bg-gray-100 px-2 py-1">/README_SUPABASE.md</code></li>
            <li>Create an admin user account in Supabase</li>
          </ol>
          <a href="/" className="border-2 border-black px-6 py-3 inline-block hover:bg-black hover:text-white transition-colors">
            ← Back to Portfolio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <header className="border-b-4 border-black bg-white sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-black" />
              <h1 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                FrameStudio Admin
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="/"
                target="_blank"
                className="flex items-center gap-2 border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
              >
                <Eye size={18} />
                View Site
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold mb-2">Portfolio Projects</h2>
            <p className="text-gray-600">Manage your website showcase</p>
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 font-semibold hover:bg-gray-800 transition-colors"
          >
            <Plus size={20} />
            Add New Project
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="text-xl">Loading projects...</div>
          </div>
        ) : websites.length === 0 ? (
          <div className="border-4 border-black p-12 text-center">
            <h3 className="text-2xl font-bold mb-4">No Projects Yet</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first project</p>
            <button
              onClick={handleAddNew}
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-semibold hover:bg-gray-800 transition-colors"
            >
              <Plus size={20} />
              Add Your First Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {websites.map((website) => (
              <motion.div
                key={website.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-2 border-black overflow-hidden"
              >
                <div className="aspect-video bg-gray-100">
                  <img 
                    src={website.thumbnail} 
                    alt={website.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 border-t-2 border-black">
                  <div className="text-xs uppercase tracking-wider text-gray-600 mb-2">
                    {website.category}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{website.title}</h3>
                  <div className="text-lg font-semibold mb-4">{website.price}</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(website)}
                      className="flex-1 border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(website.id)}
                      className="border-2 border-red-500 text-red-500 px-4 py-2 hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-screen px-4 py-8 flex items-start justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-4xl bg-white border-4 border-black p-8 my-8"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">
                  {editingWebsite ? "Edit Project" : "Add New Project"}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="border-2 border-black p-2 hover:bg-black hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm uppercase tracking-wider font-semibold mb-2">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full border-2 border-black p-3 focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="Analytics Dashboard Pro"
                    />
                  </div>

                  <div>
                    <label className="block text-sm uppercase tracking-wider font-semibold mb-2">
                      Category *
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                      className="w-full border-2 border-black p-3 focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="SaaS Platform"
                    />
                  </div>

                  <div>
                    <label className="block text-sm uppercase tracking-wider font-semibold mb-2">
                      Price *
                    </label>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      className="w-full border-2 border-black p-3 focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="$12,500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm uppercase tracking-wider font-semibold mb-2">
                      Year *
                    </label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      required
                      className="w-full border-2 border-black p-3 focus:outline-none focus:ring-2 focus:ring-black"
                      placeholder="2024"
                    />
                  </div>
                </div>

                {/* Descriptions */}
                <div>
                  <label className="block text-sm uppercase tracking-wider font-semibold mb-2">
                    Short Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={2}
                    className="w-full border-2 border-black p-3 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                    placeholder="A compelling one-liner about the project..."
                  />
                </div>

                <div>
                  <label className="block text-sm uppercase tracking-wider font-semibold mb-2">
                    Full Description *
                  </label>
                  <textarea
                    value={formData.fullDescription}
                    onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                    required
                    rows={4}
                    className="w-full border-2 border-black p-3 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                    placeholder="Detailed description that sells the project..."
                  />
                </div>

                {/* Images */}
                <div>
                  <label className="block text-sm uppercase tracking-wider font-semibold mb-2">
                    Thumbnail URL *
                  </label>
                  <input
                    type="url"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    required
                    className="w-full border-2 border-black p-3 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="https://images.unsplash.com/..."
                  />
                  
                </div>

                {/* Services */}
                <div>
                  <label className="block text-sm uppercase tracking-wider font-semibold mb-2">
                    Services
                  </label>
                  {formData.services?.map((service, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={service}
                        onChange={(e) => updateArrayField('services', index, e.target.value)}
                        className="flex-1 border-2 border-black p-3 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="UI/UX Design"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('services', index)}
                        className="border-2 border-black px-4 hover:bg-black hover:text-white transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('services')}
                    className="border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
                  >
                    + Add Service
                  </button>
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm uppercase tracking-wider font-semibold mb-2">
                    Key Features
                  </label>
                  {formData.features?.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateArrayField('features', index, e.target.value)}
                        className="flex-1 border-2 border-black p-3 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="Real-time data processing..."
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('features', index)}
                        className="border-2 border-black px-4 hover:bg-black hover:text-white transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('features')}
                    className="border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
                  >
                    + Add Feature
                  </button>
                </div>

                {/* Results */}
                <div>
                  <label className="block text-sm uppercase tracking-wider font-semibold mb-2">
                    Proven Results
                  </label>
                  {formData.results?.map((result, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={result}
                        onChange={(e) => updateArrayField('results', index, e.target.value)}
                        className="flex-1 border-2 border-black p-3 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="45% increase in user engagement"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('results', index)}
                        className="border-2 border-black px-4 hover:bg-black hover:text-white transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('results')}
                    className="border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
                  >
                    + Add Result
                  </button>
                </div>

                {/* Screenshots */}
                <div>
                  <label className="block text-sm uppercase tracking-wider font-semibold mb-2">
                    Screenshot URLs
                  </label>
                  {formData.screenshots?.map((screenshot, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="url"
                        value={screenshot}
                        onChange={(e) => updateArrayField('screenshots', index, e.target.value)}
                        className="flex-1 border-2 border-black p-3 focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="https://images.unsplash.com/..."
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('screenshots', index)}
                        className="border-2 border-black px-4 hover:bg-black hover:text-white transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('screenshots')}
                    className="border-2 border-black px-4 py-2 hover:bg-black hover:text-white transition-colors"
                  >
                    + Add Screenshot
                  </button>
                </div>

                {/* Other Fields */}
                <div>
                  <label className="block text-sm uppercase tracking-wider font-semibold mb-2">
                    Built By
                  </label>
                  <input
                    type="text"
                    value={formData.builtBy}
                    onChange={(e) => setFormData({ ...formData, builtBy: e.target.value })}
                    className="w-full border-2 border-black p-3 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="FrameStudio Development Team"
                  />
                </div>

                <div>
                  <label className="block text-sm uppercase tracking-wider font-semibold mb-2">
                    Client Testimonial (Optional)
                  </label>
                  <textarea
                    value={formData.clientTestimonial}
                    onChange={(e) => setFormData({ ...formData, clientTestimonial: e.target.value })}
                    rows={3}
                    className="w-full border-2 border-black p-3 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                    placeholder="This project transformed our business..."
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4 border-t-2 border-black">
                  <button
                    type="submit"
                    className="flex-1 bg-black text-white px-6 py-4 font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Save size={20} />
                    {editingWebsite ? "Update Project" : "Add Project"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="border-2 border-black px-6 py-4 font-semibold hover:bg-black hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
