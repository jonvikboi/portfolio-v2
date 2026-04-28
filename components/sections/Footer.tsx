"use client";

import { Mail, Send, Link as LinkIcon, User } from "lucide-react";
import { GlassDock } from "@/components/ui/glass-dock";

export default function Footer() {
  return (
    <footer className="bg-black/80 border-t border-crimson/30 pt-16 pb-8 relative z-10 mt-20 backdrop-blur-xl shadow-2xl">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-3xl font-bold font-unique mb-4 text-white">Let's Connect</h2>
            <p className="text-gray-400 mb-8 max-w-md">
              Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
            </p>
            <div className="flex gap-4 pt-6">
              <GlassDock 
                items={[
                  { title: 'Github', icon: LinkIcon, href: '#' },
                  { title: 'LinkedIn', icon: User, href: '#' },
                  { title: 'Email', icon: Mail, href: 'mailto:hello@example.com' },
                ]} 
              />
            </div>
          </div>
          
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Name" 
                className="w-full bg-burgundy/30 border border-crimson/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors backdrop-blur-md shadow-inner"
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full bg-burgundy/30 border border-crimson/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors backdrop-blur-md shadow-inner"
              />
            </div>
            <textarea 
              placeholder="Message" 
              rows={4}
              className="w-full bg-burgundy/30 border border-crimson/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none backdrop-blur-md shadow-inner"
            ></textarea>
            <button className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-secondary text-white font-bold py-3 rounded-lg transition-colors group">
              Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>
        
        <div className="text-center text-sm text-gray-500 pt-8 border-t border-crimson/20">
          <p>© {new Date().getFullYear()} Joshua Zachary Jose. Built with Next.js & Three.js.</p>
        </div>
      </div>
    </footer>
  );
}
