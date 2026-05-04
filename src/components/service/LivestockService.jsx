"use client";
import React, { useState } from 'react';
import { 
  ShieldCheck, CalendarCheck, ClipboardList, X, Camera, 
  Stethoscope, Users, HeartPulse, Microscope, 
  ArrowRight, Activity, Phone, Trash2, Loader2
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast'; 

const LivestockService = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    ownerName: '',
    phone: '',
    species: 'Cattle / Cow',
    age: '',
    breed: '',
    details: ''
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setSelectedImage(null);
    if (!isModalOpen) {
      setFormData({ ownerName: '', phone: '', species: 'Cattle / Cow', age: '', breed: '', details: '' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (x) => setSelectedImage(x.target.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const removeImage = () => setSelectedImage(null);

  // --- SUBMIT LOGIC ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const loadingToast = toast.loading('Sending your request...');

    // species and category  
    // by default category : medical support
    const payload = {
      ...formData,
      category: "Medical Support", 
      image: selectedImage || null // post image
    };

    try {
      const response = await fetch('/api/livestock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Ticket created successfully!', { id: loadingToast });
        toggleModal(); // Close modal on success
      } else {
        toast.error(result.error || 'Submission failed', { id: loadingToast });
      }
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error('Network error! Please check your connection.', { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen text-slate-900">
      <Toaster position="top-center" reverseOrder={false} />
      
      
      
     {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-slate-50">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-600/5 -skew-x-12 translate-x-20 hidden lg:block" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-widest mb-8">
                <Activity size={14} /> Expert Livestock Consultation
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-slate-900">
                Professional Care for Your <span className="text-emerald-700">Valuable Assets.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
                We provide science-backed solutions for farm management, nutrition, and disease control.
              </p>
              <button 
                onClick={toggleModal}
                className="bg-emerald-700 text-white px-10 py-5 rounded-2xl font-bold hover:bg-emerald-800 transition-all shadow-xl shadow-emerald-700/30 flex items-center gap-3 active:scale-95 w-fit"
              >
                <CalendarCheck size={20} /> Open Support Ticket
              </button>
            </div>

            {/* Right Side Image - Specifically Livestock */}
            <div className="order-1 lg:order-2 relative group">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 bg-emerald-700/10 rounded-[3rem] rotate-2 transition-transform group-hover:rotate-0 duration-500" />
              <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl aspect-[4/3]">
                <img 
                  src="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=1000" 
                  alt="Livestock Farm" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>
              
              {/* Floating Stat Card (Optional Visual) */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Verified Care</p>
                    <p className="text-lg font-bold text-slate-900">100% Scientific</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SERVICES GRID (Keeping your design as is) */}
      <section className="py-24 max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Microscope className="w-8 h-8" />, title: "Health Analysis", desc: "In-depth disease diagnostics and customized treatment protocols." },
            { icon: <HeartPulse className="w-8 h-8" />, title: "Nutritional Diet", desc: "Balanced feed formulation based on the specific age and growth stage." },
            { icon: <Users className="w-8 h-8" />, title: "Management Support", desc: "Complete farm automation and structural planning for biosecurity." }
          ].map((service, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:border-emerald-200 transition-all group">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-emerald-700 group-hover:text-white transition-all">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">{service.title}</h3>
              <p className="text-slate-500 leading-relaxed mb-6">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MODAL - TICKET FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 border border-white/20">
            <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 italic flex items-center gap-2">
                   <ClipboardList className="text-emerald-700" /> New Support Ticket
                </h2>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Livestock Division</p>
              </div>
              <button onClick={toggleModal} className="p-3 hover:bg-white rounded-full shadow-sm transition-all">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <form className="px-10 py-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar" onSubmit={handleSubmit}>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase mb-2 block tracking-wider">Owner Name</label>
                  <input 
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    required type="text" placeholder="Full Name" 
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 font-medium transition-all" 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase mb-2 block tracking-wider">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required type="tel" placeholder="017XX XXXXXX" 
                      className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 font-medium transition-all" 
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase mb-2 block tracking-wider">Animal Species</label>
                  <select 
                    name="species"
                    value={formData.species}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 font-medium"
                  >
                    <option>Cattle / Cow</option>
                    <option>Poultry / Chicken</option>
                    <option>Goat / Sheep</option>
                    <option>Others</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase mb-2 block tracking-wider">Age</label>
                    <input 
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      type="text" placeholder="2 (months)" 
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 font-medium" 
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase mb-2 block tracking-wider">Breed</label>
                    <input 
                      name="breed"
                      value={formData.breed}
                      onChange={handleInputChange}
                      type="text" placeholder="Holstein" 
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 font-medium" 
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase mb-2 block tracking-wider">Problem Details</label>
                <textarea 
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  required rows="3" placeholder="Describe symptoms..." 
                  className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none resize-none text-slate-900 font-medium" 
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-600 uppercase block tracking-wider">Visual Evidence (Optional)</label>
                {!selectedImage ? (
                  <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center hover:bg-slate-50 cursor-pointer relative transition-all">
                    <input type="file" accept="image/*" id="file-up" className="hidden" onChange={handleImageChange} />
                    <label htmlFor="file-up" className="cursor-pointer flex flex-col items-center">
                      <Camera className="w-10 h-10 text-slate-300 mb-3" />
                      <p className="text-sm font-bold text-slate-500">Select Image from PC</p>
                    </label>
                  </div>
                ) : (
                  <div className="relative rounded-3xl overflow-hidden border border-slate-200 p-2">
                    <img src={selectedImage} alt="Preview" className="w-full h-48 object-cover rounded-2xl" />
                    <button onClick={removeImage} className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full"><Trash2 size={18} /></button>
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl active:scale-95 text-lg disabled:opacity-70 flex items-center justify-center gap-3"
              >
                {isSubmitting ? <><Loader2 className="animate-spin" /> Submitting...</> : "Submit Consultation Ticket"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LivestockService;