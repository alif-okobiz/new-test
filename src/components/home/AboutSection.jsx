
import Image from 'next/image';

const HomeAbout = () => {
  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="About AgroVet"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            We are Committed to <br /> Healthy <span className="text-green-600">Farming & Agriculture</span>
          </h2>
          <p className="text-gray-600 leading-relaxed">
            AgroVet has been at the forefront of agricultural innovation. We bridge the gap between traditional farming and modern technology by providing high-quality supplies and expert advice.
          </p>
          <ul className="space-y-3">
            {['Expert Veterinary Care', 'High-Yield Seeds', 'Eco-friendly Fertilizers'].map((point) => (
              <li key={point} className="flex items-center gap-2 font-medium text-gray-700">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span> {point}
              </li>
            ))}
          </ul>
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
            Read Our Story
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;