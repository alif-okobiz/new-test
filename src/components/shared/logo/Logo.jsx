
import Link from 'next/link';
import { Leaf } from 'lucide-react'; 

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="bg-green-600 p-1.5 rounded-lg group-hover:bg-green-700 transition-colors">
        <Leaf className="text-white w-6 h-6" />
      </div>
      <span className="text-2xl font-bold tracking-tight text-gray-800">
        Agro<span className="text-green-600">Vet</span>
      </span>
    </Link>
  );
};

export default Logo;