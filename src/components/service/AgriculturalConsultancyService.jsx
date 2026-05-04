"use client";
import React, { useState } from 'react';
import { 
  Sprout, CalendarCheck, X, Camera, 
  Trees, ArrowRight, Leaf, Phone, Trash2, Microscope, Zap
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

const AgriculturalConsultancyService = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setSelectedImage(null);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (x) => setSelectedImage(x.target.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const removeImage = () => setSelectedImage(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading('Sending your request to our experts...');

    // Extract values from form
    const formData = new FormData(e.target);
    const payload = {
      farmerName: formData.get('farmerName'),
      phone: formData.get('phone'),
      cropCategory: formData.get('cropCategory'),
      landArea: formData.get('landArea'),
      problemDescription: formData.get('problemDescription'),
      image: selectedImage, // Base64 string for Cloudinary
    };

    try {
      const res = await fetch('/api/agricultural-consultancy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Consultation Booked Successfully!', { id: toastId });
        toggleModal();
        e.target.reset();
        setSelectedImage(null);
      } else {
        throw new Error(data.error || 'Submission failed');
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans">
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-lime-600/5 -skew-x-12 translate-x-20 hidden lg:block" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-100 text-lime-800 text-xs font-bold uppercase tracking-widest mb-8">
                <Sprout size={14} /> Modern Crop Solutions
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-slate-900">
                Maximize Your Yield with <span className="text-lime-700">Precision Farming.</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
                Get expert advice on soil health, pest management, and sustainable irrigation. We help you grow smarter and harvest more with data-driven agricultural consulting.
              </p>
              <div className="flex flex-wrap gap-5">
                <button 
                  onClick={toggleModal}
                  className="bg-lime-700 text-white px-10 py-5 rounded-2xl font-bold hover:bg-lime-800 transition-all shadow-xl shadow-lime-700/30 flex items-center gap-3 active:scale-95"
                >
                  <CalendarCheck size={20} /> Request Agri-Consult
                </button>
                <div className="flex items-center gap-4 px-6 py-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-sm font-medium text-slate-600 italic">"Empowering 1000+ Acres of Farmland"</p>
                </div>
              </div>
            </div>

            {/* Right Side Image */}
            <div className="order-1 lg:order-2 relative group">
              <div className="absolute -inset-4 bg-lime-700/10 rounded-[3rem] rotate-3 transition-transform group-hover:rotate-0 duration-500" />
              <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1000" 
                  alt="Modern Agriculture Field" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SERVICES GRID */}
      <section className="py-24 max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Microscope />, title: "Soil Analysis", desc: "Complete laboratory testing for pH and nutrients to boost fertility." },
            { icon: <Zap />, title: "Pest & Disease", desc: "Organic and chemical control solutions for crop-destroying pathogens." },
            { icon: <Trees />, title: "Smart Irrigation", desc: "Water management strategies and drip-system planning." }
          ].map((service, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:border-lime-200 transition-all group">
              <div className="w-16 h-16 bg-lime-50 text-lime-700 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-lime-700 group-hover:text-white transition-all">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">{service.title}</h3>
              <p className="text-slate-500 leading-relaxed mb-6">{service.desc}</p>
              
            </div>
          ))}
        </div>
      </section>

      {/* 4. MODAL - AGRI TICKET FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 italic flex items-center gap-2">
                   <Leaf className="text-lime-700" /> Agri-Support Ticket
                </h2>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Crops & Soil Division</p>
              </div>
              <button onClick={toggleModal} className="p-3 hover:bg-white rounded-full shadow-sm transition-all">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <form className="px-10 py-8 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar" onSubmit={handleSubmit}>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase mb-2 block tracking-wider">Farmer Name</label>
                  <input required name="farmerName" type="text" placeholder="Full Name" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-lime-500 outline-none text-slate-900 font-medium transition-all" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase mb-2 block tracking-wider">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-5 w-4 h-4 text-slate-400" />
                    <input required name="phone" type="tel" placeholder="01XXX XXXXXX" className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-lime-500 outline-none text-slate-900 font-medium transition-all" />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase mb-2 block tracking-wider">Crop Category</label>
                  <select name="cropCategory" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-lime-500 outline-none appearance-none bg-white text-slate-900 font-medium">
                    <option>Grain (Paddy/Wheat)</option>
                    <option>Vegetables</option>
                    <option>Fruit Orchard</option>
                    <option>Commercial (Jute/Tobacco)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase mb-2 block tracking-wider">Land Area (Acres)</label>
                  <input name="landArea" type="text" placeholder="e.g. 5.5" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-lime-500 outline-none text-slate-900 font-medium" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase mb-2 block tracking-wider">Describe Problem</label>
                <textarea required name="problemDescription" rows="3" placeholder="Explain symptoms like leaf yellowing or insect attacks..." className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-lime-500 outline-none resize-none text-slate-900 font-medium" />
              </div>

              {/* Image Preview */}
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-600 uppercase block tracking-wider">Crop/Soil Photos</label>
                {!selectedImage ? (
                  <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center hover:bg-slate-50 cursor-pointer group transition-all relative">
                    <input type="file" accept="image/*" id="agri-file" className="hidden" onChange={handleImageChange} />
                    <label htmlFor="agri-file" className="cursor-pointer flex flex-col items-center">
                      <Camera className="w-10 h-10 text-slate-300 group-hover:text-lime-600 transition-colors mb-3" />
                      <p className="text-sm font-bold text-slate-500">Upload Crop/Field Photo</p>
                    </label>
                  </div>
                ) : (
                  <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 p-2">
                    <img src={selectedImage} alt="Preview" className="w-full h-48 object-cover rounded-2xl" />
                    <button type="button" onClick={removeImage} className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-all"><Trash2 size={18} /></button>
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full bg-slate-900 text-white py-5 rounded-2xl font-bold transition-all shadow-xl active:scale-95 text-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-lime-700'}`}
              >
                {isSubmitting ? 'Processing...' : 'Book Expert Consultation'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgriculturalConsultancyService;