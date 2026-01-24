import React from 'react';
import { MapPin, Target, Mail, ArrowRight } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      
      {/* Hero Section */}
      <section className="relative py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Global Goods, <span className="text-orange-600">Local Access.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            We are bridging the gap between global brands and the Libyan market, 
            starting from the heart of Tripoli.
          </p>
        </div>
      </section>

      {/* Mission & Location Grid */}
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Mission Card */}
          <div className="p-8 border-2 border-orange-100 rounded-3xl bg-white hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-6 text-white">
              <Target size={24} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              Our core purpose is to bring high-quality merchandise to Libya. 
              We believe that every Libyan deserves access to the best products 
              the world has to offer, without the hassle of international shipping 
              barriers or complex logistics.
            </p>
          </div>

          {/* Location Card */}
          <div className="p-8 border-2 border-orange-100 rounded-3xl bg-white hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-6 text-white">
              <MapPin size={24} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Our Location</h2>
            <p className="text-gray-600 leading-relaxed">
              We are proudly operating from the business hub of the capital. 
              Visit us to explore our collection or discuss partnerships.
            </p>
            <p className="mt-4 font-semibold text-gray-900">
              Bin Ashour, Tripoli, Libya
            </p>
          </div>

        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-orange-600 rounded-[2rem] p-10 md:p-16 text-center text-white relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">
              Ready to partner with us?
            </h2>
            <p className="text-orange-100 mb-10 text-lg relative z-10">
              Whether you are a supplier or a customer, we’d love to hear from you.
            </p>
            
            <button className="group relative z-10 inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-colors shadow-lg">
              <Mail size={20} />
              Contact Us
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer simple */}
      <footer className="py-10 text-center text-gray-500 border-t border-gray-100">
        <p>© 2026 YourCompany. Tripoli, Libya.</p>
      </footer>
    </div>
  );
};

export default AboutPage;