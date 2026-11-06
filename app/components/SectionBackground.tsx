"use client";

import { usePathname } from "next/navigation";

/* Rutas de cada área. Edita aquí si añades páginas nuevas. */
const academia = ["/academia", "/clases", "/cursos"];
const terapia = [
  "/terapiaocupacional",
  "/sesiones",
  "/estimulacioncognitiva",
  "/rehabilitacionfisica",
  "/adaptacioneshogar",
  "/cursosterapia",
];

/* Coincidencia por segmento completo: "/cursos" NO captura "/cursosterapia" */
const matches = (pathname: string, base: string) =>
  pathname === base || pathname.startsWith(base + "/");

export default function SectionBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "/";

  let tema = ""; // resto de páginas: sin cambios
  let fondo = "";
  if (academia.some((p) => matches(pathname, p))) {
    tema = "academia";
    fondo = "bg-blue-100";
  } else if (terapia.some((p) => matches(pathname, p))) {
    tema = "terapia";
    fondo = "bg-green-200";
  }

  return (
    <main data-tema={tema || undefined} className={`flex-1 ${fondo}`}>
      {children}
    </main>
  );
}