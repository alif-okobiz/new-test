
import { Stethoscope, Sprout, Heart, Package, ShieldCheck, Headphones } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="bg-white">
      {/* 1. Header Section */}
      <div className="bg-emerald-50 py-20 px-4 text-center">
        <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-3">About AgroVet</h2>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
          Your Trusted Partner in <br /> <span className="text-emerald-600">Agriculture & Livestock</span>
        </h1>
        <p className="max-w-3xl mx-auto text-slate-600 text-lg leading-relaxed">
          AgroVet is a comprehensive platform dedicated to empowering farmers and pet owners. 
          We bridge the gap between traditional farming and modern technology by providing 
          expert consultancy and premium quality products.
        </p>
      </div>

      {/* 2. Specialized Services (The 3 Core Pillars) */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-slate-800 tracking-tight">Our Professional Services</h3>
          <div className="h-1.5 w-20 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service 1: Livestock Support */}
          <div className="p-8 border border-slate-100 rounded-3xl hover:border-emerald-500 hover:shadow-2xl transition-all duration-300 group bg-white">
            <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <Stethoscope size={32} />
            </div>
            <h4 className="text-xl font-bold mb-4 text-slate-800">Livestock Support</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Comprehensive veterinary support to ensure the health of your farm animals. 
              From regular checkups to emergency medical advice, we protect your livestock.
            </p>
          </div>

          {/* Service 2: Agricultural Consultancy */}
          <div className="p-8 border border-slate-100 rounded-3xl hover:border-emerald-500 hover:shadow-2xl transition-all duration-300 group bg-white">
            <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <Sprout size={32} />
            </div>
            <h4 className="text-xl font-bold mb-4 text-slate-800">Agri-Consultancy</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Expert advice on crop management, soil health, and pest control. 
              Our specialists help you maximize your harvest through modern farming techniques.
            </p>
          </div>

          {/* Service 3: Pet Care Support */}
          <div className="p-8 border border-slate-100 rounded-3xl hover:border-emerald-500 hover:shadow-2xl transition-all duration-300 group bg-white">
            <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <Heart size={32} />
            </div>
            <h4 className="text-xl font-bold mb-4 text-slate-800">Pet Care Support</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Dedicated healthcare and nutritional guidance for your beloved pets. 
              We ensure your domestic companions live a happy and healthy life.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Shop Integration (The 4 Categories) */}
      <div className=" py-24 text-black">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Explore Our <span className="text-emerald-400">Agro Shop</span></h2>
            <p className="text-slate-400 mb-10 text-lg">
              Get access to premium quality agricultural and veterinary supplies. 
              Everything you need for your farm or pet is just a click away.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { name: 'High-Yield Seeds', icon: '🌱' },
                { name: 'Vet Medicines', icon: '💊' },
                { name: 'Livestock Feed', icon: '🌾' },
                { name: 'Pet Food', icon: '🍖' }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4 bg-slate-800/50 p-5 rounded-2xl border border-slate-700 hover:border-emerald-500 transition-colors cursor-default">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="font-semibold text-slate-200">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative h-[400px] rounded-3xl overflow-hidden border border-slate-800">
              <img 
                src="https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?q=80&w=800" 
                alt="Agro Products" 
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck size={40} className="text-emerald-600" />
            </div>
            <h5 className="text-xl font-bold text-slate-800">Quality Assured</h5>
            <p className="text-slate-500 text-sm">Every product in our shop is lab-tested and verified for the best results.</p>
          </div>
          <div className="space-y-4">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
              <Headphones size={40} className="text-emerald-600" />
            </div>
            <h5 className="text-xl font-bold text-slate-800">24/7 Expert Support</h5>
            <p className="text-slate-500 text-sm">Our team of vets and agriculturalists are always available for consultation.</p>
          </div>
          <div className="space-y-4">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
              <Package size={40} className="text-emerald-600" />
            </div>
            <h5 className="text-xl font-bold text-slate-800">Nationwide Delivery</h5>
            <p className="text-slate-500 text-sm">Fast and secure shipping of seeds, medicines, and feeds to your doorstep.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;