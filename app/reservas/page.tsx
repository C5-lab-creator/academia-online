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
  "quimica1": "Eduardo",
  "quimica2": "Eduardo",
  "matematicas1": "Eduardo",
  "matematicas2": "Eduardo",
  "fisica1": "Eduardo",
  "fisica2": "Eduardo",
  "quimicaanalitica": "Eduardo",
  "quimicaorganica": "Eduardo",
  "quimicainorganica": "Eduardo",
  "quimicafisica": "Eduardo",
  "primariayeso": "Sheila",
  "estimulacioncognitiva": "Sheila",
  "nee": "Sheila",
  "neurodesarrollo": "Sheila",
};

const profesional = profesionales[servicio] || "";
  const [fecha, setFecha] = useState(new Date());
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

const [horaSeleccionada, setHoraSeleccionada] = useState("");
const [nombre, setNombre] = useState("");
const [email, setEmail] = useState("");
const guardarReserva = async () => {
  if (!horaSeleccionada) {
    alert("Selecciona una hora");
    return;
  }

  const { data, error } = await supabase
    .from("reservas")
    .insert({
      fecha: fecha.toISOString().split("T")[0],
      hora: horaSeleccionada,
      servicio,
      profesional,
      nombre,
      email,
      estado: "Pendiente",
    });

  if (error) {
console.log("ERROR COMPLETO:", JSON.stringify(error, null, 2));
 console.log(error);
alert(JSON.stringify(error, null, 2));
    return;
  }
setHorasReservadas((prev) => [...prev, horaSeleccionada]);
  alert("¡Reserva realizada correctamente!");
  console.log(data);
};
const [horasReservadas, setHorasReservadas] = useState<string[]>([]);
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
return (
  <main>
    <h1>Reserva tu sesión</h1>
<p><strong>Servicio:</strong> {servicio}</p>
<p><strong>Profesional:</strong> {profesional}</p>
    <Calendar
      onChange={(value) => setFecha(value as Date)}
      value={fecha}
    />

    <p>Fecha elegida: {fecha.toLocaleDateString("es-ES")}</p>
<h2>Horas disponibles</h2>

<div>
{horas
  .filter((hora) => !horasReservadas.includes(hora))
  .map((hora) => (
  <button
    key={hora}
    onClick={() => setHoraSeleccionada(hora)}
  >
    {hora}
  </button>
))}
<p>Hora elegida: {horaSeleccionada}</p>

</div>
    <form>
     <input
  type="text"
  placeholder="Nombre"
  value={nombre}
  onChange={(e) => setNombre(e.target.value)}
/>
<input
  type="email"
  placeholder="Correo"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
      <button type="button" onClick={guardarReserva}>
  Confirmar reserva
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