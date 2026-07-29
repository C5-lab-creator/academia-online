"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [openAcademia, setOpenAcademia] = useState(false);
  const [openCognitiva, setOpenCognitiva] = useState(false);
  const [openCursos, setOpenCursos] = useState(false);

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
                Formación profesional
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

              <Link
                href="/cursos/acceso25"
                className="block py-2 hover:text-blue-600"
              >
                Pruebas de acceso mayores 25
              </Link>

              <Link
                href="/cursos/selectividad"
                className="block py-2 hover:text-blue-600"
              >
                Selectividad
              </Link>

              <Link
                href="/cursos/temariobachillerato"
                className="block py-2 hover:text-blue-600"
              >
                Bachillerato
              </Link>            

            </div>
          )}
        </div>


        {/* Estimulación Cognitiva y cursos terapéuticos desplegable */}
        <div className="relative">

          <button
            onClick={() => setOpenCognitiva(!openCognitiva)}
            className="hover:text-blue-600"
          >
            Estimulación Cognitiva y cursos terapéuticos ▾
          </button>


          {openCognitiva && (
            <div className="absolute top-8 left-0 bg-white shadow-lg rounded-lg p-3 w-56 z-50">

              <Link
                href="/estimulacioncognitiva"
                className="block py-2 hover:text-blue-600"
              >
                Estimulación cognitiva
              </Link>

              <Link
                href="/cursos/demencias"
                className="block py-2 hover:text-blue-600"
              >
                Adultos y personas mayores
              </Link>

              <Link
                href="/cursos/autismo"
                className="block py-2 hover:text-blue-600"
              >
                NEE y Neurodesarrollo
              </Link>

              <Link
                href="/cursos/escuela-espalda"
                className="block py-2 hover:text-blue-600"
              >
                Bienestar y prevención
              </Link>  
            </div>
          )}

        </div>


      </nav>

    </header>
  );
}