import React from 'react';
import Link from 'next/link';
import { ChevronRight, Wheat, Dog, ShieldCheck } from 'lucide-react';

const Service = () => {
  const serviceCards = [
    {
      title: "Livestock Support",
      desc: "Comprehensive technical guidance for poultry and cattle farm management, focusing on sustainability.",
      icon: <ShieldCheck className="w-6 h-6" />,
      link: "/services/livestock-support"
    },
    {
      title: "Agricultural Consultancy",
      desc: "Expert solutions for crop disease management, soil health, and modern irrigation technologies.",
      icon: <Wheat className="w-6 h-6" />,
      link: "/services/agricultural-consultancy"
    },
    {
      title: "Pet Care Support",
      desc: "Dedicated assistance for pet health, nutritional planning, and behavioral wellness for your companions.",
      icon: <Dog className="w-6 h-6" />,
      link: "/services/pet-care"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          
          <h3 className="text-4xl font-light text-slate-900">Professional <span className="font-semibold">Consultancy Services</span></h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceCards.map((card, index) => (
            <div key={index} className="group border border-slate-100 p-10 rounded-lg hover:bg-slate-50 transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                {card.icon}
              </div>
              <h4 className="text-xl font-semibold text-slate-800 mb-4">{card.title}</h4>
              <p className="text-slate-600 mb-8 leading-relaxed text-sm">{card.desc}</p>
              <Link href={card.link} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
                Explore Details <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;