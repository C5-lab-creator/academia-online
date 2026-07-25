import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-6 shadow-md">
      {/* logo */}
      <div className="flex items-center gap-4">
        <Image
          src="/logo.png"
          alt="Mente Abierta"
          width={70}
          height={70}
         />

         <div>
             <h1 className="text-2xl font-bold">
             Mente Abierta
             </h1>

               <p className="text-gray-600">
                Academia · Estimulación Cognitiva · Bienestar
               </p>
        </div>
      </div>

      <nav className="flex gap-6">
        <Link href="/">Inicio</Link>
        <Link href="/academia">Academia</Link>
        <Link href="/estimulacioncognitiva">
          Estimulación Cognitiva
        </Link>
      </nav>
    </header>
  );
}