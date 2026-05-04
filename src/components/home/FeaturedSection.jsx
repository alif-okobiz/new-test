
import { Sprout, ShieldCheck, Truck, Headphones } from 'lucide-react';

const Features = () => {
  const data = [
    { icon: <Sprout size={40} />, title: "100% Organic", desc: "Top quality organic seeds and fertilizers." },
    { icon: <ShieldCheck size={40} />, title: "Expert Support", desc: "Veterinary consultation for your livestock." },
    { icon: <Truck size={40} />, title: "Fast Delivery", desc: "Quick delivery to your doorstep anywhere." },
    { icon: <Headphones size={40} />, title: "24/7 Support", desc: "We are always here to help our farmers." },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {data.map((item, index) => (
          <div key={index} className="text-center p-6 rounded-2xl hover:shadow-xl transition-shadow border border-gray-50">
            <div className="text-green-600 flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;