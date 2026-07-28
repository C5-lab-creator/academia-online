import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 shadow-md">
      {/* Logo */}
      <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <Image
          src="/logo.png"
          alt="Mente Abierta"
          width={70}
          height={70}
          className="w-16 h-16 md:w-[70px] md:h-[70px]"
        />

        <div>
          <h1 className="text-2xl font-bold">
            Mente Abierta
          </h1>

          <p className="text-gray-600 text-sm md:text-base">
            Academia · Estimulación Cognitiva · Bienestar
          </p>
        </div>
      </div>

      {/* Menú */}
      <nav className="flex flex-wrap justify-center gap-4 md:gap-6 font-medium">
        <Link href="/" className="hover:text-blue-600">
          Inicio
        </Link>

        <Link href="/academia" className="hover:text-blue-600">
          Academia
        </Link>

        <Link
          href="/estimulacioncognitiva"
          className="hover:text-blue-600 text-center"
        >
          Estimulación Cognitiva
        </Link>
      </nav>
    </header>
  );
}