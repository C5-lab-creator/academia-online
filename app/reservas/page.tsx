"use client";

import { supabase } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function ReservasContenido() {
  const searchParams = useSearchParams();

const servicioUrl = searchParams.get("servicio") || "";
const [servicio, setServicio] = useState(servicioUrl);

  const profesionales: Record<string, string> = {
    quimica1: "Eduardo",
    quimica2: "Eduardo",
    matematicas1: "Eduardo",
    matematicas2: "Eduardo",
    fisica1: "Eduardo",
    fisica2: "Eduardo",
    quimicaanalitica: "Eduardo",
    quimicageneral: "Eduardo",
    cienciamateriales: "Eduardo",
    bioquimica: "Eduardo",
    uned: "Eduardo",
    pruebasdeacceso: "Eduardo",
    formacionprofesional: "Eduardo",
    quimicaorganica: "Eduardo",
    quimicainorganica: "Eduardo",
    quimicafisica: "Eduardo",
    primariayeso: "Sheila",
    estimulacioncognitiva: "Sheila",
    rehabilitacionfisica: "Sheila",
    escueladeespalda: "Sheila",
    asesoramientofamilias: "Sheila",
    nee: "Sheila",
    neurodesarrollo: "Sheila",
  };

  const profesional = profesionales[servicio] || "";
  const [fecha, setFecha] = useState(new Date());
  const [horaSeleccionada, setHoraSeleccionada] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [horasReservadas, setHorasReservadas] = useState<string[]>([]);
  const [horasDisponibles, setHorasDisponibles] = useState<string[]>([]);
  const [enviando, setEnviando] = useState(false);

  const horas = [
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
  ];

  useEffect(() => {
  const cargarDatos = async () => {
    const fechaTexto = fecha.toISOString().split("T")[0];

    // Reservas existentes
    const { data: reservas } = await supabase
      .from("reservas")
      .select("hora")
      .eq("fecha", fechaTexto)
      .eq("profesional", profesional);

    setHorasReservadas(
      reservas ? reservas.map((r: { hora: string }) => r.hora) : []
    );

    // Disponibilidad configurada por el administrador
const { data: disponibilidad } = await supabase
  .from("disponibilidad")
  .select("hora, disponible")
  .eq("fecha", fechaTexto)
  .eq("profesional", profesional);

console.log("Fecha:", fechaTexto);
console.log("Profesional:", profesional);
console.log("Disponibilidad:", disponibilidad);

if (!disponibilidad || disponibilidad.length === 0) {
  setHorasDisponibles(horas);
} else {
  setHorasDisponibles(
    disponibilidad
      .filter((h: { disponible: boolean }) => h.disponible)
      .map((h: { hora: string }) => h.hora)
  );
}
  };

  cargarDatos();
}, [fecha, profesional]);

  const guardarReserva = async () => {
    if (!nombre || !email || !horaSeleccionada) {
      alert("Completa todos los campos");
      return;
    }

    setEnviando(true);

    const fechaTexto = fecha.toISOString().split("T")[0];

    const { data, error } = await supabase
      .from("reservas")
      .insert({
        fecha: fechaTexto,
        hora: horaSeleccionada,
        servicio,
        profesional,
        nombre,
        email,
        estado: "Pendiente",
      })
      .select();

    if (error) {
      console.log(error);
      alert("Error al guardar la reserva");
      setEnviando(false);
      return;
    }

    // Enviar correos
    try {
      await fetch("/api/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          email,
          servicio,
          profesional,
          fecha: fechaTexto,
          hora: horaSeleccionada,
        }),
      });
    } catch (err) {
      console.error(err);
    }

    setHorasReservadas((prev) => [...prev, horaSeleccionada]);

    setNombre("");
    setEmail("");
    setHoraSeleccionada("");

    alert("¡Reserva realizada correctamente!");

    console.log(data);

    setEnviando(false);
  };

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <h1>Reserva tu sesión</h1>
{!servicio && (
  <>
    <h3>Selecciona el servicio</h3>

    <select
      value={servicio}
      onChange={(e) => setServicio(e.target.value)}
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <option value="">Academia</option>

      <option value="quimica1">Química 1º Bachillerato</option>
      <option value="matematicas1">Matemáticas 1º Bachillerato</option>
      <option value="fisica1">Física 1º Bachillerato</option>
      <option value="quimica2">Química 2º Bachillerato</option>
      <option value="matematicas2">Matemáticas 2º Bachillerato</option>
      <option value="fisica2">Física 2º Bachillerato</option>
      <option value="quimicaanalitica">Química Analítica</option>
      <option value="quimicaorganica">Química Orgánica</option>
      <option value="quimicainorganica">Química Inorgánica</option>
      <option value="quimicafisica">Química Física</option>
      <option value="quimicageneral">Química General</option>
      <option value="cienciamateriales">Ciencia de los Materiales</option>
      <option value="bioquimica">Bioquímica</option>
      <option value="uned">Uned</option>
      <option value="pruebasdeacceso">Pruebas de Acceso mayores 25</option>
      <option value="formacionprofesional">Formación Profesional</option>
      <option value="primariayeso">Primaria y ESO</option>
    </select>

        <h3>Selecciona el servicio</h3>

    <select
      value={servicio}
      onChange={(e) => setServicio(e.target.value)}
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <option value="">Terapia ocupacional</option>

      <option value="primariayeso">Primaria y ESO</option>
      <option value="nee">Alumnos con NEE</option>
      <option value="rehabilitacionfisica">Rehabilitación física</option>
      <option value="escuelaespalda">Escuela de espalda</option>
      <option value="neurodesarrollo">Trastornos del neurodesarrollo</option>
      <option value="asesoramientoafamilias">Asesoramiento a familias</option>
      <option value="estimulacioncognitiva">Deterioro cognitivo y demencias</option>
    </select>
  </>
)}
      <p>
        <strong>Servicio:</strong> {servicio}
      </p>

      <p>
        <strong>Profesional:</strong> {profesional}
      </p>

      <Calendar
        onChange={(value) => setFecha(value as Date)}
        value={fecha}
      />

      <p>
        Fecha elegida: {fecha.toLocaleDateString("es-ES")}
      </p>

      <h2>Horas disponibles</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 20,
        }}
      >
{horas
  .filter(
    (hora) =>
      horasDisponibles.includes(hora) &&
      !horasReservadas.includes(hora)
  )
  .map((hora) => (
    <button
      key={hora}
      type="button"
      onClick={() => setHoraSeleccionada(hora)}
      style={{
        minWidth: "90px",
        padding: "12px",
        margin: "5px",
        borderRadius: "10px",
        border: "2px solid #2563eb",
        backgroundColor:
          horaSeleccionada === hora ? "#2563eb" : "#ffffff",
        color:
          horaSeleccionada === hora ? "#ffffff" : "#2563eb",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "0.2s",
      }}
      onMouseEnter={(e) => {
        if (horaSeleccionada !== hora) {
          e.currentTarget.style.backgroundColor = "#2563eb";
          e.currentTarget.style.color = "#ffffff";
        }
      }}
      onMouseLeave={(e) => {
        if (horaSeleccionada !== hora) {
          e.currentTarget.style.backgroundColor = "#ffffff";
          e.currentTarget.style.color = "#2563eb";
        }
      }}
    >
      {hora}
    </button>
  ))}
      </div>

      <p>
        <strong>Hora elegida:</strong> {horaSeleccionada || "Ninguna"}
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          guardarReserva();
        }}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" disabled={enviando}>
          {enviando ? "Enviando..." : "Confirmar reserva"}
        </button>
      </form>
    </main>
  );
}

export default function Reservas() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <ReservasContenido />
    </Suspense>
  );
}