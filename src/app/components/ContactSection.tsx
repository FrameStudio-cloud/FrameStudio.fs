import { motion } from "motion/react";
import { Mail, Instagram, Send } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="border-t-4 border-black bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl lg:text-7xl font-bold mb-6 leading-none" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Let's Create<br />Something Amazing
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl">
            Ready to transform your digital presence? Get in touch and let's discuss your project.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-sm uppercase tracking-[0.2em] font-semibold mb-6">Get in Touch</h3>
              
              {/* Email */}
              <a 
                href="mailto:hello@framestudio.com"
                className="group flex items-center gap-4 border-2 border-black p-6 hover:bg-black hover:text-white transition-colors mb-4"
              >
                <Mail size={24} />
                <div>
                  <div className="text-xs uppercase tracking-wider mb-1 opacity-70">Email</div>
                  <div className="text-xl font-semibold">hello@framestudio.com</div>
                </div>
              </a>

              {/* Instagram */}
              <a 
                href="https://instagram.com/framestudio"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 border-2 border-black p-6 hover:bg-black hover:text-white transition-colors"
              >
                <Instagram size={24} />
                <div>
                  <div className="text-xs uppercase tracking-wider mb-1 opacity-70">Instagram</div>
                  <div className="text-xl font-semibold">@framestudio12</div>
                </div>
              </a>
            </div>

            <div className="border-t-2 border-black pt-8">
              <p className="text-sm text-gray-600 mb-4">Business Hours</p>
              <p className="text-lg">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
              <p className="text-sm text-gray-600 mt-2">We typically respond within 24 hours</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm uppercase tracking-[0.2em] font-semibold mb-6">Send a Message</h3>
            
            {/* Note: This form is ready for Supabase integration */}
            <form 
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: Add Supabase form submission here
                alert("Form ready for Supabase integration! Check the code comments.");
              }}
            >
              <div>
                <label htmlFor="name" className="block text-sm mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full border-2 border-black p-4 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full border-2 border-black p-4 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="projectType" className="block text-sm mb-2">Project Type</label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  className="w-full border-2 border-black p-4 focus:outline-none focus:ring-2 focus:ring-black bg-white"
                >
                  <option value="">Select a project type</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="corporate">Corporate Website</option>
                  <option value="saas">SaaS Platform</option>
                  <option value="portfolio">Portfolio</option>
                  <option value="mobile">Mobile App</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm mb-2">Project Details</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full border-2 border-black p-4 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full border-2 border-black px-8 py-4 font-semibold hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2 group"
              >
                Send Message
                <Send size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-xs text-gray-600 mt-4">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/*
 * SUPABASE INTEGRATION GUIDE
 * 
 * To connect this form to Supabase:
 * 
 * 1. Create a Supabase table called 'contact_submissions' with these columns:
 *    - id: uuid (primary key, auto-generated)
 *    - created_at: timestamp (default: now())
 *    - name: text
 *    - email: text
 *    - project_type: text
 *    - message: text
 *    - status: text (default: 'new')
 * 
 * 2. Install Supabase client: npm install @supabase/supabase-js
 * 
 * 3. Create a Supabase client file at /src/lib/supabase.ts:
 *    import { createClient } from '@supabase/supabase-js'
 *    export const supabase = createClient(
 *      'YOUR_SUPABASE_URL',
 *      'YOUR_SUPABASE_ANON_KEY'
 *    )
 * 
 * 4. Update the form submission handler:
 *    import { supabase } from '@/lib/supabase'
 *    
 *    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
 *      e.preventDefault();
 *      const formData = new FormData(e.currentTarget);
 *      
 *      const { data, error } = await supabase
 *        .from('contact_submissions')
 *        .insert([{
 *          name: formData.get('name'),
 *          email: formData.get('email'),
 *          project_type: formData.get('projectType'),
 *          message: formData.get('message')
 *        }]);
 *      
 *      if (error) {
 *        console.error('Error:', error);
 *        alert('Error submitting form. Please try again.');
 *      } else {
 *        alert('Thank you! We'll be in touch soon.');
 *        e.currentTarget.reset();
 *      }
 *    };
 */
