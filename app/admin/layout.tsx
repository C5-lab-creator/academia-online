"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [cargando, setCargando] = useState(true);
  const [esAdmin, setEsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Si estamos en la página de login, no comprobamos permisos
    if (pathname === "/admin/login") {
      setCargando(false);
      return;
    }

    async function comprobarUsuario() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Si no hay usuario -> ir al login
  if (!user) {
    router.replace("/admin/login");
    return;
  }

  const admins = [
    "sheylaapariciosuarez@gmail.com",
    "eduardobadi93@gmail.com",
  ];

  if (user.email && admins.includes(user.email)) {
    setEsAdmin(true);
  } else {
    // Hay usuario pero no es administrador
    setEsAdmin(false);
  }

  setCargando(false);
}

    comprobarUsuario();
  }, [pathname]);

  // Permitir acceder al login sin restricciones
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (cargando) {
    return <p>Cargando...</p>;
  }

if (!esAdmin) {
  return null;
}

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>🎓 Academia</h2>

        <nav>
          <Link href="/admin">Inicio</Link>
          <Link href="/admin/contacto">Mensajes</Link>
          <Link href="/admin/cursos">Cursos</Link>
          <Link href="/admin/cursos-comprados">Cursos comprados</Link>
          <Link href="/admin/reservas">Reservas</Link>
          <Link href="/admin/documentos">Documentos</Link>
          <Link href="/admin/registro">Registro alumnos</Link>
          <Link href="/admin/alumnos">Alumnos</Link>

   
        </nav>
      </aside>

      <main className="contenido">{children}</main>
    </div>
  );
}