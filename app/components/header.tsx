"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [openAcademia, setOpenAcademia] = useState(false);
  const [openCognitiva, setOpenCognitiva] = useState(false);
  const [openCursos, setOpenCursos] = useState(false);

  return (
<header className="relative w-full bg-gradient-to-r from-blue-50 via-white to-blue-50 border-b shadow-md overflow-visible">

  <Image
    src="/logo.png"
    alt=""
    width={350}
    height={350}
    className="absolute right-10 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none select-none"
  />

  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 px-6 py-6">

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
            Academia · Terapia ocupacional · Bienestar
          </p>
        </div>
      </div>


      {/* Menú */}
      <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[17px] font-medium">

  {/* Inicio */}
  <Link href="/" className="hover:text-blue-600">
    Inicio
  </Link>

  {/* Academia desplegable */}
  <div className="relative">
    <button
      onClick={() => setOpenAcademia(!openAcademia)}
      className="hover:text-blue-600"
    >
      Academia ▾
    </button>

    {openAcademia && (
      <div className="absolute top-8 left-0 bg-white shadow-lg rounded-lg p-3 w-48 z-50">

        <Link href="/clases/bachillerato" className="block py-2 hover:text-blue-600">
          Bachillerato
        </Link>

        <Link href="/clases/pruebasdeacceso" className="block py-2 hover:text-blue-600">
          Pruebas de acceso mayores de 25 años
        </Link>

        <Link href="/clases/universidad" className="block py-2 hover:text-blue-600">
          Universidad
        </Link>

        <Link href="/clases/uned" className="block py-2 hover:text-blue-600">
          UNED
        </Link>

        <Link href="/clases/formacionprofesional" className="block py-2 hover:text-blue-600">
          FP
        </Link>

        <Link href="/clases/primaria-eso" className="block py-2 hover:text-blue-600">
          Primaria y ESO
        </Link>

        <Link href="/clases/alumnos-nee" className="block py-2 hover:text-blue-600">
          Alumnos con NEE
        </Link>

      </div>
    )}
  </div>

  {/* Cursos desplegable */}
  <div className="relative">
    <button
      onClick={() => setOpenCursos(!openCursos)}
      className="hover:text-blue-600"
    >
      Cursos ▾
    </button>

    {openCursos && (
      <div className="absolute top-8 left-0 bg-white shadow-lg rounded-lg p-3 w-48 z-50">

        <Link href="/cursos/acceso25" className="block py-2 hover:text-blue-600">
          Pruebas de acceso mayores 25
        </Link>

        <Link href="/cursos/selectividad" className="block py-2 hover:text-blue-600">
          Selectividad
        </Link>

        <Link href="/cursos/temariobachillerato" className="block py-2 hover:text-blue-600">
          Bachillerato
        </Link>

      </div>
    )}
  </div>

  {/* Estimulación Cognitiva */}
  <div className="relative">
    <button
      onClick={() => setOpenCognitiva(!openCognitiva)}
      className="hover:text-blue-600"
    >
      Estimulación Cognitiva y cursos terapéuticos ▾
    </button>

    {openCognitiva && (
      <div className="absolute top-8 left-0 bg-white shadow-lg rounded-lg p-3 w-56 z-50">

        <Link href="/estimulacioncognitiva" className="block py-2 hover:text-blue-600">
          Sesiones Terapia Ocupacional
        </Link>

        <Link href="/cursos/demencias" className="block py-2 hover:text-blue-600">
          Adultos y personas mayores
        </Link>

        <Link href="/cursos/autismo" className="block py-2 hover:text-blue-600">
          NEE y Neurodesarrollo
        </Link>

        <Link href="/cursos/escuela-espalda" className="block py-2 hover:text-blue-600">
          Bienestar y prevención
        </Link>

      </div>
    )}
  </div>

  {/* Enlaces normales */}
  <Link href="/clases" className="hover:text-blue-600">
    Clases
  </Link>

  <Link href="/reservas" className="hover:text-blue-600">
    Reservas
  </Link>

  <Link href="/aulavirtual" className="hover:text-blue-600">
    Aula virtual
  </Link>

  <Link href="/opiniones" className="hover:text-blue-600">
    Opiniones
  </Link>

  <Link href="/contacto" className="hover:text-blue-600">
    Contacto
  </Link>

  <Link href="/sobrenosotros" className="hover:text-blue-600">
    Sobre nosotros
  </Link>

  <Link href="/login" className="hover:text-blue-600">
    Login
  </Link>

  <Link href="/admin" className="hover:text-blue-600">
    Admin
  </Link>

</nav>
</div>
    </header>
    
  );
}