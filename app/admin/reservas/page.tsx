"use client";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Reserva = {
  id: string;
  nombre: string;
  email: string;
  servicio: string;
  profesional: string;
  fecha: string;
  hora: string;
  estado: string;
};

export default function AdminReservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);

  useEffect(() => {
    cargarReservas();
  }, []);
const [fecha, setFecha] = useState(new Date());

const [diasDisponibles, setDiasDisponibles] = useState<string[]>([]);
  async function cargarReservas() {
    const { data, error } = await supabase
      .from("reservas")
      .select("*")
      .order("fecha", { ascending: true })
      .order("hora", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setReservas(data ?? []);
  }

  async function cambiarEstado(id: string, estado: string) {
    const { error } = await supabase
      .from("reservas")
      .update({ estado })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    cargarReservas();
  }

  async function eliminarReserva(id: string) {
    if (!confirm("¿Eliminar esta reserva?")) return;

    const { error } = await supabase
      .from("reservas")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    cargarReservas();
  }
async function guardarDisponibilidad() {
  const fechaTexto = fecha.toISOString().split("T")[0];

  const { error } = await supabase
    .from("disponibilidad")
    .upsert({
      fecha: fechaTexto,
      disponible: true,
    });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Disponibilidad guardada");
}
 return (
  <main style={{ maxWidth: 1300, margin: "40px auto", padding: 20 }}>

    <h2>Gestionar disponibilidad</h2>

    <Calendar
      value={fecha}
      onChange={(value) => setFecha(value as Date)}
    />

    <button
      onClick={() => guardarDisponibilidad()}
      style={{
        marginTop: 20,
        padding: "10px 20px",
        background: "#16a34a",
        color: "white",
        border: "none",
        borderRadius: 8,
      }}
    >
      Guardar disponibilidad
    </button>

    <h1>Reservas recibidas</h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ background: "#f3f3f3" }}>
            <th style={th}>Nombre</th>
            <th style={th}>Email</th>
            <th style={th}>Servicio</th>
            <th style={th}>Profesional</th>
            <th style={th}>Fecha</th>
            <th style={th}>Hora</th>
            <th style={th}>Estado</th>
            <th style={th}>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {reservas.map((r) => (
            <tr key={r.id}>
              <td style={td}>{r.nombre}</td>
              <td style={td}>{r.email}</td>
              <td style={td}>{r.servicio}</td>
              <td style={td}>{r.profesional}</td>
              <td style={td}>{r.fecha}</td>
              <td style={td}>{r.hora}</td>
              <td style={td}>{r.estado}</td>

              <td style={td}>
                <button
                  style={botonVerde}
                  onClick={() => cambiarEstado(r.id, "Confirmada")}
                >
                  Confirmar
                </button>

                <button
                  style={botonNaranja}
                  onClick={() => cambiarEstado(r.id, "Cancelada")}
                >
                  Cancelar
                </button>

                <button
                  style={botonRojo}
                  onClick={() => eliminarReserva(r.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

const th = {
  border: "1px solid #ddd",
  padding: "10px",
};

const td = {
  border: "1px solid #ddd",
  padding: "10px",
};

const botonVerde = {
  background: "#22c55e",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  marginRight: "8px",
};

const botonNaranja = {
  background: "#f59e0b",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  marginRight: "8px",
};

const botonRojo = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};