"use client";

import Link from "next/link";

const tarjeta: React.CSSProperties = {
  display: "block",
  padding: "25px",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  background: "#ffffff",
  color: "#111827",
  textDecoration: "none",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

export default function ConfiguracionPage() {
  return (
    <main
      style={{
        maxWidth: 1100,
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: 30, marginBottom: 10 }}>
        Configuración
      </h1>

      <p style={{ color: "#6b7280", marginBottom: 30 }}>
        Gestiona las reservas, los alumnos y las opiniones desde aquí.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 20,
        }}
      >
        <Link href="/admin/configuracion/reservas" style={tarjeta}>
          <div style={{ fontSize: 32 }}>📅</div>
          <h2>Configuración de reservas</h2>
          <p>Consulta, filtra y gestiona las reservas.</p>
        </Link>

        <Link href="/admin/configuracion/horarios-fijos" style={tarjeta}>
          <div style={{ fontSize: 32 }}>📅</div>
          <h2>Horarios fijos</h2>
          <p>Gestiona los horarios fijos de tus servicios.</p>
        </Link>

        <Link href="/admin/configuracion/opiniones" style={tarjeta}>
          <div style={{ fontSize: 32 }}>⭐</div>
          <h2>Opiniones</h2>
          <p>Consulta las opiniones de tus alumnos.</p>
        </Link>

        <Link href="/admin/configuracion/alumnos" style={tarjeta}>
          <div style={{ fontSize: 32 }}>👨‍🎓</div>
          <h2>Alumnos</h2>
          <p>
            Accede a las fichas de alumnos, sus datos de contacto,
            reservas e historial.
          </p>
        </Link>
      </div>
    </main>
  );
}