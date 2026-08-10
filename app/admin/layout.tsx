"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [cargando, setCargando] = useState(true);
  const [esAdmin, setEsAdmin] = useState(false);

  useEffect(() => {
    // Permitir acceder al login sin comprobaciones
    if (pathname === "/admin/login") {
      setCargando(false);
      return;
    }

    async function comprobarUsuario() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // No hay sesión -> Login
      if (!session) {
        router.replace("/admin/login");
        return;
      }

      // Comprobar rol
      const { data: perfil } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      // No es administrador -> cerrar sesión y volver al login
      if (!perfil || perfil.role !== "admin") {
        await supabase.auth.signOut();
        router.replace("/admin/login");
        return;
      }

      setEsAdmin(true);
      setCargando(false);
    }

    comprobarUsuario();
  }, [pathname, router]);

  // La página de login no usa el layout del panel
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (cargando) {
    return <p style={{ padding: "2rem" }}>Comprobando acceso...</p>;
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