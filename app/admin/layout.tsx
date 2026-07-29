"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [cargando, setCargando] = useState(true);
  const [esAdmin, setEsAdmin] = useState(false);

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

      const admins = [
        "sheylaapariciosuarez@gmail.com",
        "eduardobadi93@gmail.com",
      ];

      if (user?.email && admins.includes(user.email)) {
        setEsAdmin(true);
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
    return (
      <main style={{ padding: "2rem", textAlign: "center" }}>
        <h1>⛔ Acceso denegado</h1>
        <p>No tienes permisos para acceder al panel de administración.</p>
      </main>
    );
  }

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>🎓 Academia</h2>

        <nav>
          <Link href="/admin">Inicio</Link>
          <Link href="/admin/contacto">Contacto</Link>
          <Link href="/admin/blog">Blog</Link>
          <Link href="/admin/cursos">Cursos</Link>
          <Link href="/admin/clases">Clases</Link>
          <Link href="/admin/reservas">Reservas</Link>
          <Link href="/admin/tienda">Tienda</Link>
          <Link href="/admin/videos">Vídeos</Link>
          <Link href="/admin/documentos">Documentos</Link>
   
        </nav>
      </aside>

      <main className="contenido">{children}</main>
    </div>
  );
}