"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LogoTransition from "./LogoTransition";


export default function Header() {
const [openAcademia, setOpenAcademia] = useState(false);
const [openClases, setOpenClases] = useState(false);
const [openCursos, setOpenCursos] = useState(false);
const [openEnsenanza, setOpenEnsenanza] = useState(false);
const [openTerapia, setOpenTerapia] = useState(false);
const [openCognitiva, setOpenCognitiva] = useState(false);
  return (
<header className="relative w-full bg-gradient-to-r from-blue-50 via-white to-blue-50 border-b shadow-md overflow-visible">
  <Image
    src="/logo.png"
    alt=""
    width={400}
    height={400}
    className="absolute right-10 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none select-none"
  />

  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 px-6 py-6">
    {/* Logo */}
<div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
  <LogoTransition />
</div>

{/* Menú */}

        {/* Menú */}
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[17px] font-medium">
          <Link href="/" className="hover:text-blue-600">
            Inicio
          </Link>

{/* Academia */}
<div
  className="relative"
  onMouseEnter={() => setOpenAcademia(true)}
  onMouseLeave={() => {
    setOpenAcademia(false);
    setOpenClases(false);
  }}
>
  <button
    type="button"
    className="hover:text-blue-600"
    aria-expanded={openAcademia}
  >
    Clases particulares ▾
  </button>

  {openAcademia && (
    <div className="absolute left-0 top-full z-50 w-64 pt-1">
      <div className="rounded-lg bg-white p-3 shadow-lg">

        {/* Academia */}
        <Link
          href="/academia"
          className="block py-2 hover:text-blue-600"
        >
          Academia
        </Link>

        {/* Nuestras clases */}
        <div
          className="relative"
          onMouseEnter={() => setOpenClases(true)}
        >
          <div className="flex cursor-pointer justify-between py-2 hover:text-blue-600">
            Nuestras clases <span>➜</span>
          </div>

          {openClases && (
            <div className="absolute left-full top-0 z-50 w-72">
              <div className="rounded-lg bg-white p-3 shadow-lg">

                <Link
                  href="/clases"
                  className="block py-2 hover:text-blue-600"
                >
                  Nuestras clases
                </Link>

                <Link
                  href="/clases/bachillerato"
                  className="block py-2 hover:text-blue-600"
                >
                  Bachillerato
                </Link>

                <Link
                  href="/clases/pruebasdeacceso"
                  className="block py-2 hover:text-blue-600"
                >
                  Pruebas de acceso mayores de 25 años
                </Link>

                <Link
                  href="/clases/universidad"
                  className="block py-2 hover:text-blue-600"
                >
                  Universidad
                </Link>

                <Link
                  href="/clases/uned"
                  className="block py-2 hover:text-blue-600"
                >
                  UNED
                </Link>

                <Link
                  href="/clases/formacionprofesional"
                  className="block py-2 hover:text-blue-600"
                >
                  FP
                </Link>

                <Link
                  href="/clases/primaria-eso"
                  className="block py-2 hover:text-blue-600"
                >
                  Primaria y ESO
                </Link>

                <Link
                  href="/clases/alumnos-nee"
                  className="block py-2 hover:text-blue-600"
                >
                  Alumnos con NEE
                </Link>

                <Link
                  href="/clases/grupos"
                  className="block py-2 hover:text-blue-600"
                >
                  Grupos reducidos
                </Link>

              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )}
</div>

{/* CURSOS */}
<div
  className="relative"
  onMouseEnter={() => setOpenCursos(true)}
  onMouseLeave={() => setOpenCursos(false)}
>
  <button
    type="button"
    className="hover:text-blue-600"
    aria-expanded={openCursos}
  >
    Cursos ▾
  </button>

  {openCursos && (
    <div className="absolute left-0 top-full z-50 w-64 pt-1">
      <div className="rounded-lg bg-white p-3 shadow-lg">

        <Link
          href="/cursos"
          className="block py-2 hover:text-blue-600"
        >
          Clases online sin profesor
        </Link>

        <Link
          href="/cursosterapia"
          className="block py-2 hover:text-blue-600"
        >
          Terapia ocupacional
        </Link>

      </div>
    </div>
  )}
</div>


{/* SESIONES DE TERAPIA OCUPACIONAL */}
<div
  className="relative"
  onMouseEnter={() => setOpenCognitiva(true)}
  onMouseLeave={() => setOpenCognitiva(false)}
>
  <button
    type="button"
    className="hover:text-blue-600"
    aria-expanded={openCognitiva}
  >
    Sesiones Terapia Ocupacional ▾
  </button>

  {openCognitiva && (
    <div className="absolute left-0 top-full z-50 w-80 pt-1">
      <div className="rounded-lg bg-white p-3 shadow-lg">

        <Link
          href="/sesiones"
          className="block py-2 hover:text-blue-600"
        >
          Áreas que abarcamos
        </Link>

        <Link
          href="/estimulacioncognitiva/envejecimiento"
          className="block py-2 hover:text-blue-600"
        >
          Estimulación cognitiva y apoyo para la vida diaria
        </Link>

        <Link
          href="/estimulacioncognitiva/neurodesarrollo"
          className="block py-2 hover:text-blue-600"
        >
          Trastorno del espectro autista
        </Link>

        <Link
          href="/rehabilitacionfisica/rehabilitacion"
          className="block py-2 hover:text-blue-600"
        >
          Rehabilitación física y promoción de la autonomía
        </Link>

        <Link
          href="/rehabilitacionfisica/escuelaespalda"
          className="block py-2 hover:text-blue-600"
        >
          Bienestar y prevención
        </Link>

        <Link
          href="/adaptacioneshogar"
          className="block py-2 hover:text-blue-600"
        >
          Adaptaciones en el Hogar
        </Link>

      </div>
    </div>
  )}
</div>

          {/* Enlaces normales */}
  

          <Link href="/opiniones" className="hover:text-blue-600">
            Opiniones
          </Link>

          <Link href="/contacto" className="hover:text-blue-600">
            Contacto
          </Link>

          <Link href="/sobrenosotros" className="hover:text-blue-600">
            Sobre nosotros
          </Link>

          <Link href="/colaboraciones" className="hover:text-blue-600">
            Colaboraciones
          </Link>

          <Link
  href="/reservas"
  className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-full shadow-lg hover:bg-green-600 hover:scale-105 transition-all duration-300"
>
  📅 <span className="font-semibold">Reservar</span>
</Link>

<Link
  href="/aulavirtual"
  className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300"
>
  🎓 <span className="font-semibold">Aula Virtual</span>
</Link>

          <Link
  href="/admin"
  className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2 rounded-full shadow-lg hover:bg-black hover:scale-105 transition-all duration-300"
>
  ⚙️ <span className="font-semibold">Panel administración</span>
</Link>
        </nav>
      </div> 
    </header>
  );
}