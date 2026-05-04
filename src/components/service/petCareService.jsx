"use client";
import React, { useState } from 'react';
import { 
  Heart, CalendarCheck, X, Camera, 
  Scissors, Syringe, Bone, 
  ArrowRight, Sparkles, Phone, Trash2
} from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

const PetCareService = () => {
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
    const toastId = toast.loading('Booking your appointment...');

    const formData = new FormData(e.target);
    const payload = {
      ownerName: formData.get('ownerName'),
      phone: formData.get('phone'),
      petType: formData.get('petType'),
      petBreedAge: formData.get('petBreedAge'),
      visitReason: formData.get('visitReason'),
      symptoms: formData.get('symptoms'),
      image: selectedImage,
    };

    try {
      const res = await fetch('/api/pet-care', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Pet Care Appointment Booked!', { id: toastId });
        toggleModal();
        e.target.reset();
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen text-slate-900">
      <Toaster position="top-center" />
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-600/5 -skew-x-12 translate-x-20 hidden lg:block" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-widest mb-8">
                <Heart size={14} fill="currentColor" /> Premium Companion Care
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-slate-900">
                Happy Pets, <span className="text-indigo-700">Healthy Lives.</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
                From routine wellness exams to professional grooming and behavioral training, we offer specialized care tailored to your furry family members.
              </p>
              <div className="flex flex-wrap gap-5">
                <button 
                  onClick={toggleModal}
                  className="bg-indigo-700 text-white px-10 py-5 rounded-2xl font-bold hover:bg-indigo-800 transition-all shadow-xl shadow-indigo-700/30 flex items-center gap-3 active:scale-95"
                >
                  <CalendarCheck size={20} /> Book Pet Wellness
                </button>
              </div>
            </div>
            <div className="relative">
                <div className="absolute -inset-4 bg-indigo-700/10 rounded-[3rem] -rotate-3" />
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                    <img 
                        src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1000" 
                        alt="Happy Dog" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES GRID */}
      <section className="py-24 max-w-7xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Syringe className="w-8 h-8" />, title: "Vaccination", desc: "Ensure your pet stays protected with our complete immunization and deworming programs." },
            { icon: <Scissors className="w-8 h-8" />, title: "Professional Grooming", desc: "Custom styling, bath, and skin care treatments to keep your pet looking and feeling great." },
            { icon: <Bone className="w-8 h-8" />, title: "Nutritional Guide", desc: "Breed-specific diet plans and weight management programs for optimal health." }
          ].map((service, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:border-indigo-200 transition-all group">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-700 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-indigo-700 group-hover:text-white transition-all">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">{service.title}</h3>
              <p className="text-slate-500 leading-relaxed mb-6">{service.desc}</p>
              
            </div>
          ))}
        </div>
      </section>

      {/* 4. MODAL - PET CARE FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 italic flex items-center gap-2">
                   <Sparkles className="text-indigo-700" /> Care Support Ticket
                </h2>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Companion Care Division</p>
              </div>
              <button onClick={toggleModal} className="p-3 hover:bg-white rounded-full shadow-sm transition-all">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <form className="px-10 py-8 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar" onSubmit={handleSubmit}>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase mb-2 block tracking-wider">Owner Name</label>
                  <input required name="ownerName" type="text" placeholder="Full Name" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 font-medium transition-all" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase mb-2 block tracking-wider">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-5 w-4 h-4 text-slate-400" />
                    <input required name="phone" type="tel" placeholder="01XXX XXXXXX" className="w-full pl-12 pr-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 font-medium transition-all" />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase mb-2 block tracking-wider">Pet Type</label>
                  <select name="petType" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none bg-white text-slate-900 font-medium">
                    <option value="Cat">Cat </option>
                    <option value="Dog">Dog </option>
                    <option value="Bird">Bird </option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 uppercase mb-2 block tracking-wider">Pet's Breed & Age</label>
                  <input name="petBreedAge" type="text" placeholder="e.g. Persian, 2 yrs" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 font-medium" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase mb-2 block tracking-wider">Reason for Visit</label>
                <select name="visitReason" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none appearance-none bg-white text-slate-900 font-medium">
                  <option value="Medical Checkup">Medical Checkup / Illness</option>
                  <option value="Grooming">Full Body Grooming</option>
                  <option value="Vaccination">Vaccination & Deworming</option>
                  <option value="Dietary">Dietary Consultation</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase mb-2 block tracking-wider">Current Symptoms or Special Requests</label>
                <textarea required name="symptoms" rows="3" placeholder="Explain your pet's behavior..." className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none text-slate-900 font-medium" />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-600 uppercase block tracking-wider">Pet Photo (Optional)</label>
                {!selectedImage ? (
                  <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center hover:bg-slate-50 cursor-pointer group transition-all relative">
                    <input type="file" accept="image/*" id="pet-file" className="hidden" onChange={handleImageChange} />
                    <label htmlFor="pet-file" className="cursor-pointer flex flex-col items-center">
                      <Camera className="w-10 h-10 text-slate-300 group-hover:text-indigo-600 transition-colors mb-3" />
                      <p className="text-sm font-bold text-slate-500">Upload Your Pet's Photo</p>
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
                className={`w-full bg-slate-900 text-white py-5 rounded-2xl font-bold transition-all shadow-xl active:scale-95 text-lg ${isSubmitting ? 'opacity-70' : 'hover:bg-indigo-700'}`}
              >
                {isSubmitting ? 'Booking...' : 'Book Care Appointment'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetCareService;