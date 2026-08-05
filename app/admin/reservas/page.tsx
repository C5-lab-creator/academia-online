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
  estado_pago: string;
  enlace_meet: string;
};

export default function AdminReservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);

  useEffect(() => {
    cargarReservas();
  }, []);
   const [fecha, setFecha] = useState(new Date());
   const [profesional, setProfesional] = useState("Sheila");
   const [horas, setHoras] = useState([
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
]);
useEffect(() => {
  cargarHoras();
}, [fecha, profesional]);
   const [horasDisponibles, setHorasDisponibles] = useState<string[]>([]);
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
   async function cambiarHora(hora: string) {
     const fechaTexto = fecha.toISOString().split("T")[0];

     const disponible = horasDisponibles.includes(hora);

      const { error } = await supabase
       .from("disponibilidad_horas")
       .upsert({
      fecha: fechaTexto,
      profesional,
      hora,
      disponible: !disponible,
    });

  if (error) {
    alert(error.message);
    return;
  }

  cargarHoras();
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
async function confirmarReserva(id: string) {
  const res = await fetch("/api/admin/confirmar-reserva", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error || "Error al confirmar la reserva");
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
  async function actualizarPago(id: string, estado_pago: string) {
  const { error } = await supabase
    .from("reservas")
    .update({ estado_pago })
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  cargarReservas();
}

async function actualizarMeet(id: string, enlace_meet: string) {
  const { error } = await supabase
    .from("reservas")
    .update({ enlace_meet })
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
async function cargarHoras() {
  const fechaTexto = fecha.toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("disponibilidad_horas")
    .select("*")
    .eq("fecha", fechaTexto)
    .eq("profesional", profesional);

  if (error) {
    console.error(error);
    return;
  }

  if (!data || data.length === 0) {
    setHorasDisponibles(horas);
    return;
  }

  setHorasDisponibles(
    data
      .filter((h) => h.disponible)
      .map((h) => h.hora)
  );
}
 return (
  <main style={{ maxWidth: 1300, margin: "40px auto", padding: 20 }}>

    <h2>Gestionar disponibilidad</h2>

    <h3>Profesional</h3>

    <select
      value={profesional}
      onChange={(e) => setProfesional(e.target.value)}
      style={{
        padding: "10px",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <option value="Sheila">Sheila</option>
      <option value="Eduardo">Eduardo</option>
    </select>

    <Calendar
      value={fecha}
      onChange={(value) => setFecha(value as Date)}
    />

<h3 style={{ marginTop: 30 }}>Horas disponibles</h3>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
    marginTop: "15px",
    marginBottom: "30px",
  }}
>
  {horas.map((hora) => {
    const disponible = horasDisponibles.includes(hora);

    return (
      <button
        key={hora}
        onClick={() => cambiarHora(hora)}
        style={{
          padding: "12px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          background: disponible ? "#22c55e" : "#ef4444",
          color: "white",
        }}
      >
        {hora}
      </button>
    );
  })}
</div>
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
            <th style={th}>Estado de Pago</th>
            <th style={th}>Enlace de Meet</th>
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
  <select
    value={r.estado_pago || "Pendiente"}
    onChange={(e) => actualizarPago(r.id, e.target.value)}
  >
    <option value="Pendiente">Pendiente</option>
    <option value="Pagado">Pagado</option>
  </select>
</td>

<td style={td}>
  <input
    type="text"
    defaultValue={r.enlace_meet || ""}
    placeholder="https://meet.google.com/..."
    style={{
      width: "250px",
      padding: "6px",
    }}
    onBlur={(e) => actualizarMeet(r.id, e.target.value)}
  />
</td>

<td style={td}>
<button
  style={botonVerde}
  onClick={() => {
    alert("Botón pulsado");
    confirmarReserva(r.id);
  }}
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