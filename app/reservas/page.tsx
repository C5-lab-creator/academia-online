"use client";

import { supabase } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function ReservasContenido() {
  const searchParams = useSearchParams();

  const servicio = searchParams.get("servicio") || "";

  const profesionales: Record<string, string> = {
    quimica1: "Eduardo",
    quimica2: "Eduardo",
    matematicas1: "Eduardo",
    matematicas2: "Eduardo",
    fisica1: "Eduardo",
    fisica2: "Eduardo",
    quimicaanalitica: "Eduardo",
    quimicaorganica: "Eduardo",
    quimicainorganica: "Eduardo",
    quimicafisica: "Eduardo",
    primariayeso: "Sheila",
    estimulacioncognitiva: "Sheila",
    nee: "Sheila",
    neurodesarrollo: "Sheila",
  };

  const profesional = profesionales[servicio] || "";
console.log("Servicio:", servicio);
console.log("Profesional:", profesional);
  const [fecha, setFecha] = useState(new Date());
  const [horaSeleccionada, setHoraSeleccionada] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [horasReservadas, setHorasReservadas] = useState<string[]>([]);
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
    const cargarHorasReservadas = async () => {
      const fechaTexto = fecha.toISOString().split("T")[0];

      const { data, error } = await supabase
        .from("reservas")
        .select("hora")
        .eq("fecha", fechaTexto)
        .eq("profesional", profesional);

      if (!error && data) {
        setHorasReservadas(data.map((r: { hora: string }) => r.hora));
      }
    };

    cargarHorasReservadas();
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
  .filter((hora) => !horasReservadas.includes(hora))
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