
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Empowering Farmers with <br />
          <span className="text-green-400">Modern Solutions</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-200">
          AgroVet provides high-quality seeds, fertilizers, and expert veterinary services to ensure a better harvest for every farmer.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105">
            Shop Products
          </Link>
          <Link href="/services" className="bg-white hover:bg-gray-100 text-green-700 px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105">
            Our Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;