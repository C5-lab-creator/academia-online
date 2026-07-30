"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [openAcademia, setOpenAcademia] = useState(false);
  const [openCognitiva, setOpenCognitiva] = useState(false);
  const [openCursos, setOpenCursos] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openAulavirtual, setOpenAulavirtual] = useState(false);
  const [openReservas, setOpenReservas] = useState(false);
  const [openOpiniones, setOpenOpiniones] = useState(false);
  const [openContacto, setOpenContacto] = useState(false);
  const [openSobrenosotros, setOpenSobrenosotros] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-900 to-blue-700 shadow-lg">
      {/* Logo */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-8 py-4">
<Link
  href="/"
  className="flex items-center gap-5 hover:opacity-90 transition"
>
  <Image
    src="/logo.png"
    alt="Mente Abierta"
    width={120}
    height={120}
    className="w-24 h-24 md:w-28 md:h-28 object-contain"
  />

  <div>
    <h1 className="text-3xl font-bold text-white">
      Mente Abierta
    </h1>

    <p className="text-blue-100">
      Academia · Terapia Ocupacional · Bienestar
    </p>
  </div>
</Link>

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
      <nav className="flex flex-wrap items-center justify-end gap-6 text-white font-semibold">


        {/* Academia desplegable */}
        <div className="relative">
          <button
            onClick={() => setOpenAcademia(!openAcademia)}
            className="rounded-lg px-4 py-2 hover:bg-white hover:text-blue-900 transition"
          >
            Academia ▾
          </button>

          {openAcademia && (
            <div className="absolute left-0 top-12 w-64 rounded-xl bg-white shadow-2xl p-4 z-50">


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

            </div>
          )}
        </div>

 {/* Cursos desplegable */}
        <div className="relative">
          <button
            onClick={() => setOpenCursos(!openCursos)}
            className="rounded-lg px-4 py-2 hover:bg-white hover:text-blue-900 transition"
          >
            Cursos ▾
          </button>

          {openCursos && (
            <div className="absolute left-0 top-12 w-64 rounded-xl bg-white shadow-2xl p-4 z-50">

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
            className="rounded-lg px-4 py-2 hover:bg-white hover:text-blue-900 transition"
          >
            Estimulación Cognitiva y cursos terapéuticos ▾
          </button>


          {openCognitiva && (
            <div className="absolute left-0 top-12 w-64 rounded-xl bg-white shadow-2xl p-4 z-50">

              <Link
                href="/estimulacioncognitiva"
                className="block py-2 hover:text-blue-600"
              >
                Sesiones Terapia Ocupacional
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

        {/* Admin */}
        <div className="relative">
          <button
            onClick={() => setOpenAdmin(!openAdmin)}
            className="rounded-lg px-4 py-2 hover:bg-white hover:text-blue-900 transition"
          >
            área Adminsitrador ▾
          </button>
        </div>

        {/* Login */}
        <div className="relative">
          <button
            onClick={() => setOpenLogin(!openLogin)}
            className="rounded-lg px-4 py-2 hover:bg-white hover:text-blue-900 transition"
          >
            Login ▾
          </button>
        </div>

        {/* Aula virtual */}
        <div className="relative">
          <button
            onClick={() => setOpenAulavirtual(!openAulavirtual)}
            className="rounded-lg px-4 py-2 hover:bg-white hover:text-blue-900 transition"
          >
            Aula virtual ▾
          </button>
        </div>

        {/* Reservas */}
        <div className="relative">
          <button
            onClick={() => setOpenReservas(!openReservas)}
            className="rounded-lg px-4 py-2 hover:bg-white hover:text-blue-900 transition"
          >
            Reservas ▾
          </button>
        </div>

        {/* Admin */}
        <div className="relative">
          <button
            onClick={() => setOpenContacto(!openContacto)}
            className="rounded-lg px-4 py-2 hover:bg-white hover:text-blue-900 transition"
          >
            Contacto ▾
          </button>

          {/* Opiniones */}
        <div className="relative">
          <button
            onClick={() => setOpenOpiniones(!openOpiniones)}
            className="rounded-lg px-4 py-2 hover:bg-white hover:text-blue-900 transition"
          >
            Opiniones ▾
          </button>
        </div>

        {/* Sobre nosotros */}
        <div className="relative">
          <button
            onClick={() => setOpenSobrenosotros(!openSobrenosotros)}
            className="rounded-lg px-4 py-2 hover:bg-white hover:text-blue-900 transition"
          >
            Sobre nosotros ▾
          </button>
        </div>
        </div>
      </nav>

    </header>
  );
}