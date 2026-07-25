"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AreaPrivada() {
  const router = useRouter();
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function comprobarSesion() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/admin/login");
        return;
      }

      setCargando(false);
    }

    comprobarSesion();
  }, [router]);

  async function cerrarSesion() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    router.replace("/admin/login");
  }

  if (cargando) {
    return <p>Comprobando acceso...</p>;
  }

  return (
    <>
      <h1>Panel de administración</h1>

      <p>Bienvenido al panel de la academia.</p>

      <button
        onClick={cerrarSesion}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          cursor: "pointer",
          borderRadius: "8px",
        }}
      >
        🚪 Cerrar sesión
      </button>

      <div className="estadisticas">
        <div className="tarjeta-admin">
          <h2>📝 Blog</h2>
          <p>Gestiona los artículos.</p>
        </div>

        <div className="tarjeta-admin">
          <h2>📚 Cursos</h2>
          <p>Edita la información de los cursos.</p>
        </div>

        <div className="tarjeta-admin">
          <h2>📅 Reservas</h2>
          <p>Consulta las solicitudes de alumnos.</p>
        </div>

        <div className="tarjeta-admin">
          <h2>⚙️ Configuración</h2>
          <p>Configura la web.</p>
        </div>
      </div>
    </>
  );
}