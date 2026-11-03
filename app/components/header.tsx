"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LogoTransition from "./LogoTransition";

type SubLink = { href: string; label: string };
type MenuLeaf = { href: string; label: string; children?: undefined };
type MenuParent = { label: string; href?: undefined; children: SubLink[] };
type MenuItem = MenuLeaf | MenuParent;
type MenuGroup = { label: string; width: string; items: MenuItem[] };

/* Estructura del menú: un solo sitio para editar enlaces (escritorio y móvil) */
const menu: MenuGroup[] = [
  {
    label: "Clases particulares",
    width: "w-64",
    items: [
      { href: "/academia", label: "Academia" },
      {
        label: "Nuestras clases",
        children: [
          { href: "/clases", label: "Nuestras clases" },
          { href: "/clases/bachillerato", label: "Bachillerato" },
          { href: "/clases/pruebasdeacceso", label: "Pruebas de acceso mayores de 25 años" },
          { href: "/clases/universidad", label: "Universidad" },
          { href: "/clases/uned", label: "UNED" },
          { href: "/clases/formacionprofesional", label: "FP" },
          { href: "/clases/primaria-eso", label: "Primaria y ESO" },
          { href: "/clases/alumnos-nee", label: "Alumnos con NEE" },
          { href: "/clases/grupos", label: "Grupos reducidos" },
        ],
      },
    ],
  },
  {
    label: "Cursos",
    width: "w-64",
    items: [
      { href: "/cursos", label: "Clases online sin profesor" },
      { href: "/cursosterapia", label: "Terapia ocupacional" },
    ],
  },
  {
    label: "Sesiones Terapia Ocupacional",
    width: "w-80",
    items: [
      { href: "/sesiones", label: "Áreas que abarcamos" },
      { href: "/estimulacioncognitiva/envejecimiento", label: "Estimulación cognitiva y apoyo para la vida diaria" },
      { href: "/estimulacioncognitiva/neurodesarrollo", label: "Trastorno del espectro autista" },
      { href: "/rehabilitacionfisica/rehabilitacion", label: "Rehabilitación física y promoción de la autonomía" },
      { href: "/rehabilitacionfisica/escuelaespalda", label: "Bienestar y prevención" },
      { href: "/adaptacioneshogar", label: "Adaptaciones en el Hogar" },
    ],
  },
];

const links: SubLink[] = [
  { href: "/opiniones", label: "Opiniones" },
  { href: "/contacto", label: "Contacto" },
  { href: "/sobrenosotros", label: "Sobre nosotros" },
  { href: "/colaboraciones", label: "Colaboraciones" },
];

/* ---------- ESCRITORIO ---------- */
function DesktopDropdown({ group }: { group: MenuGroup }) {
  const [open, setOpen] = useState(false);
  const [openChild, setOpenChild] = useState<string | null>(null);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false);
        setOpenChild(null);
      }}
    >
      <button
        type="button"
        className="hover:text-blue-600"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {group.label} ▾
      </button>

      {open && (
        <div className={`absolute left-0 top-full z-50 ${group.width} pt-1`}>
          <div className="rounded-lg bg-white p-3 shadow-lg">
            {group.items.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenChild(item.label)}
                >
                  <div className="flex cursor-pointer justify-between py-2 hover:text-blue-600">
                    {item.label} <span>➜</span>
                  </div>

                  {openChild === item.label && (
                    <div className="absolute left-full top-0 z-50 w-72">
                      <div className="rounded-lg bg-white p-3 shadow-lg">
                        {item.children.map((c) => (
                          <Link key={c.href} href={c.href} className="block py-2 hover:text-blue-600">
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.href} href={item.href} className="block py-2 hover:text-blue-600">
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- MÓVIL ---------- */
function MobileGroup({
  group,
  onNavigate,
}: {
  group: MenuGroup;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button
        type="button"
        className="flex w-full min-h-[48px] items-center justify-between py-3 text-left font-semibold text-blue-900"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{group.label}</span>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <div className="pb-2 pl-3">
          {group.items.map((item) =>
            item.children ? (
              <div key={item.label} className="mt-1">
                <p className="py-2 text-sm font-semibold text-gray-500">{item.label}</p>
                <div className="border-l-2 border-blue-100 pl-3">
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={onNavigate}
                      className="flex min-h-[44px] items-center py-1 text-gray-700 active:text-blue-600"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className="flex min-h-[44px] items-center py-1 text-gray-700 active:text-blue-600"
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="relative w-full bg-gradient-to-r from-blue-50 via-white to-blue-50 border-b shadow-md overflow-visible">
      {/* Logo de fondo difuminado (solo escritorio). El contenedor lo recorta al alto de la cabecera */}
      <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <Image
          src="/logo.png"
          alt=""
          width={400}
          height={400}
          className="absolute right-10 top-1/2 -translate-y-1/2 w-[360px] h-auto opacity-5"
        />
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-2 lg:py-3">
        {/* Logo */}
        <div className="min-w-0 flex-1 lg:flex-none flex items-center gap-4 [&_img]:!h-14 [&_img]:!w-auto [&_img]:!max-w-none sm:[&_img]:!h-16 lg:[&_img]:!h-28 [&_img]:mix-blend-multiply">
          <LogoTransition />
        </div>

        {/* Botón hamburguesa (móvil) */}
        <button
          type="button"
          className="lg:hidden flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-blue-900 shadow-sm"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
          aria-controls="menu-movil"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            {mobileOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>

        {/* Menú escritorio */}
        <nav className="hidden lg:flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-base xl:text-[17px] font-medium">
          <Link href="/" className="hover:text-blue-600">
            Inicio
          </Link>

          {menu.map((group) => (
            <DesktopDropdown key={group.label} group={group} />
          ))}

          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-blue-600">
              {l.label}
            </Link>
          ))}

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

      {/* Menú móvil */}
      {mobileOpen && (
        <nav
          id="menu-movil"
          className="lg:hidden border-t bg-white px-4 pb-6 pt-4 max-h-[calc(100dvh-72px)] overflow-y-auto"
        >
          {/* Acciones principales */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Link
              href="/reservas"
              onClick={closeMobile}
              className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-green-500 px-3 py-3 font-semibold text-white shadow"
            >
              📅 Reservar
            </Link>
            <Link
              href="/aulavirtual"
              onClick={closeMobile}
              className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-3 font-semibold text-white shadow"
            >
              🎓 Aula Virtual
            </Link>
          </div>

          <Link
            href="/"
            onClick={closeMobile}
            className="flex min-h-[48px] items-center border-b border-gray-100 py-3 font-semibold text-blue-900"
          >
            Inicio
          </Link>

          {menu.map((group) => (
            <MobileGroup key={group.label} group={group} onNavigate={closeMobile} />
          ))}

          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={closeMobile}
              className="flex min-h-[48px] items-center border-b border-gray-100 py-3 font-semibold text-blue-900"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}