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

  // Si no ha iniciado sesión -> Login
  if (!session) {
    router.replace("/admin/login");
    return;
  }

  // Comprobar si es administrador
  const { data: perfil } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .single();

  // Si no es administrador -> Login
  if (!perfil || perfil.role !== "admin") {
    await supabase.auth.signOut();
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
    return <p style={{ padding: "40px" }}>Comprobando acceso...</p>;
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>Panel de administración</h1>

      <p>Bienvenido al panel de la academia.</p>

      <button onClick={cerrarSesion}>
        🚪 Cerrar sesión
      </button>

      <div className="estadisticas">

        <div
          className="tarjeta-admin"
          onClick={() => router.push("/admin/cursos")}
        >
          <h2>📚 Cursos</h2>
          <p>Gestiona los cursos.</p>
        </div>

        <div
          className="tarjeta-admin"
          onClick={() => router.push("/admin/reservas")}
        >
          <h2>📅 Reservas</h2>
          <p>Consulta las solicitudes y gestiona tu disponibilidad.</p>
        </div>

        <div
          className="tarjeta-admin"
          onClick={() => router.push("/admin/configuracion")}
        >
          <h2>⚙️ Configuración</h2>
          <p>Configura la web.</p>
        </div>
      </div>

      <style jsx>{`
        button {
          margin: 25px 0;
          padding: 12px;
          background: #333;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }

        .estadisticas {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .tarjeta-admin {
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 10px;
          background: white;
          cursor: pointer;
          transition: 0.2s;
        }

        .tarjeta-admin:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
        }

        .tarjeta-admin h2 {
          margin-bottom: 10px;
        }

        .tarjeta-admin p {
          color: #666;
        }
      `}</style>
    </main>
  );
}