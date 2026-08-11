"use client";

import { supabase } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Suspense, useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";

const Calendar = dynamic(() => import("react-calendar"), {
  ssr: false,
});

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
    escuelaespalda: "Sheila",
    asesoramientoafamilias: "Sheila",
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
        reservas
          ? reservas.map((r: { hora: string }) => r.hora)
          : []
      );

      // Disponibilidad configurada por el administrador
      const { data: disponibilidad } = await supabase
        .from("disponibilidad_horas")
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
            .filter(
              (h: { disponible: boolean }) => h.disponible
            )
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

    setHorasReservadas((prev) => [
      ...prev,
      horaSeleccionada,
    ]);

    setNombre("");
    setEmail("");
    setHoraSeleccionada("");

    alert("¡Reserva realizada correctamente!");

    console.log(data);

    setEnviando(false);
  };

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          background: #f5f7fb;
        }

        .reservas-container {
          max-width: 1000px;
          margin: 40px auto;
          padding: 20px;
        }

        .reservas-card {
          background: #ffffff;
          border-radius: 22px;
          padding: 35px;
          box-shadow: 0 10px 40px rgba(15, 23, 42, 0.08);
          border: 1px solid #e5e7eb;
        }

        .reservas-title {
          margin: 0;
          color: #172033;
          font-size: 38px;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .reservas-subtitle {
          color: #64748b;
          margin-top: 8px;
          margin-bottom: 30px;
          font-size: 16px;
        }

        .section-title {
          color: #172033;
          font-size: 20px;
          font-weight: 800;
          margin: 28px 0 12px;
        }

        .service-select {
          width: 100%;
          box-sizing: border-box;
          padding: 14px 16px;
          border-radius: 11px;
          border: 1px solid #dbe1ea;
          background: #ffffff;
          color: #172033;
          font-size: 15px;
          outline: none;
          cursor: pointer;
          margin-bottom: 10px;
          transition: 0.2s;
        }

        .service-select:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .info-box {
          display: flex;
          gap: 15px;
          margin: 25px 0;
        }

        .info-item {
          flex: 1;
          padding: 17px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
        }

        .info-label {
          display: block;
          font-size: 11px;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
          margin-bottom: 5px;
        }

        .info-value {
          display: block;
          color: #172033;
          font-size: 15px;
          font-weight: 700;
        }

        .calendar-box {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 15px;
          margin-top: 15px;
        }

        .react-calendar {
          width: 100% !important;
          border: none !important;
          font-family: inherit;
        }

        .react-calendar__navigation {
          margin-bottom: 10px;
        }

        .react-calendar__navigation button {
          border-radius: 8px;
          font-weight: 700;
          color: #172033;
        }

        .react-calendar__navigation button:hover {
          background: #eff6ff;
        }

        .react-calendar__month-view__weekdays {
          color: #64748b;
          font-weight: 700;
        }

        .react-calendar__tile {
          border-radius: 9px;
          padding: 13px 6px;
        }

        .react-calendar__tile:hover {
          background: #eff6ff;
        }

        .react-calendar__tile--active {
          background: #2563eb !important;
          color: #ffffff !important;
        }

        .react-calendar__tile--now {
          background: #dbeafe !important;
          color: #2563eb !important;
        }

        .selected-date {
          margin-top: 12px;
          padding: 13px 16px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 10px;
          color: #1d4ed8;
          font-size: 14px;
        }

        .hours-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-top: 15px;
          margin-bottom: 20px;
        }

        .hour-button {
          min-width: 0;
          padding: 14px 10px;
          border-radius: 11px;
          border: 2px solid #2563eb;
          background: #ffffff;
          color: #2563eb;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .hour-button:hover {
          background: #2563eb;
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 7px 18px rgba(37, 99, 235, 0.2);
        }

        .hour-button.selected {
          background: #2563eb;
          color: #ffffff;
          box-shadow: 0 7px 18px rgba(37, 99, 235, 0.2);
        }

        .selected-hour {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #15803d;
          padding: 13px 16px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .booking-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 15px;
        }

        .booking-input {
          width: 100%;
          box-sizing: border-box;
          padding: 14px 16px;
          border-radius: 11px;
          border: 1px solid #dbe1ea;
          background: #ffffff;
          color: #172033;
          font-size: 15px;
          outline: none;
          transition: 0.2s;
        }

        .booking-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .confirm-button {
          width: 100%;
          padding: 15px;
          margin-top: 5px;
          border: none;
          border-radius: 11px;
          background: linear-gradient(
            135deg,
            #2563eb,
            #1d4ed8
          );
          color: #ffffff;
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .confirm-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 22px rgba(37, 99, 235, 0.22);
        }

        .confirm-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        @media (max-width: 700px) {
          .reservas-container {
            margin: 15px auto;
            padding: 12px;
          }

          .reservas-card {
            padding: 20px;
            border-radius: 16px;
          }

          .reservas-title {
            font-size: 29px;
          }

          .reservas-subtitle {
            font-size: 14px;
          }

          .info-box {
            flex-direction: column;
            gap: 10px;
          }

          .hours-container {
            grid-template-columns: repeat(3, 1fr);
            gap: 9px;
          }

          .hour-button {
            padding: 12px 5px;
            font-size: 14px;
          }
        }

        @media (max-width: 430px) {
          .hours-container {
            grid-template-columns: repeat(2, 1fr);
          }

          .reservas-title {
            font-size: 26px;
          }
        }
      `}</style>

      <main className="reservas-container">
        <div className="reservas-card">
          <h1 className="reservas-title">
            Reserva tu sesión
          </h1>

          <p className="reservas-subtitle">
            Selecciona el servicio, la fecha y el horario
            que prefieras.
          </p>

          {!servicio && (
            <>
              <h3 className="section-title">
                Academia
              </h3>

              <select
                className="service-select"
                value={servicio}
                onChange={(e) =>
                  setServicio(e.target.value)
                }
              >
                <option value="">
                  Selecciona una asignatura
                </option>

                <option value="quimica1">
                  Química 1º Bachillerato
                </option>

                <option value="matematicas1">
                  Matemáticas 1º Bachillerato
                </option>

                <option value="fisica1">
                  Física 1º Bachillerato
                </option>

                <option value="quimica2">
                  Química 2º Bachillerato
                </option>

                <option value="matematicas2">
                  Matemáticas 2º Bachillerato
                </option>

                <option value="fisica2">
                  Física 2º Bachillerato
                </option>

                <option value="quimicaanalitica">
                  Química Analítica
                </option>

                <option value="quimicaorganica">
                  Química Orgánica
                </option>

                <option value="quimicainorganica">
                  Química Inorgánica
                </option>

                <option value="quimicafisica">
                  Química Física
                </option>

                <option value="quimicageneral">
                  Química General
                </option>

                <option value="cienciamateriales">
                  Ciencia de los Materiales
                </option>

                <option value="bioquimica">
                  Bioquímica
                </option>

                <option value="uned">
                  UNED
                </option>

                <option value="pruebasdeacceso">
                  Pruebas de Acceso mayores 25
                </option>

                <option value="formacionprofesional">
                  Formación Profesional
                </option>

                <option value="primariayeso">
                  Primaria y ESO
                </option>
              </select>

              <h3 className="section-title">
                Terapia ocupacional
              </h3>

              <select
                className="service-select"
                value={servicio}
                onChange={(e) =>
                  setServicio(e.target.value)
                }
              >
                <option value="">
                  Selecciona un servicio
                </option>

                <option value="primariayeso">
                  Primaria y ESO
                </option>

                <option value="nee">
                  Alumnos con NEE
                </option>

                <option value="rehabilitacionfisica">
                  Rehabilitación física
                </option>

                <option value="escuelaespalda">
                  Escuela de espalda
                </option>

                <option value="neurodesarrollo">
                  Trastornos del neurodesarrollo
                </option>

                <option value="asesoramientoafamilias">
                  Asesoramiento a familias
                </option>

                <option value="estimulacioncognitiva">
                  Deterioro cognitivo y demencias
                </option>
              </select>
            </>
          )}

          {servicio && (
            <div className="info-box">
              <div className="info-item">
                <span className="info-label">
                  Servicio
                </span>

                <span className="info-value">
                  {servicio}
                </span>
              </div>

              <div className="info-item">
                <span className="info-label">
                  Profesional
                </span>

                <span className="info-value">
                  {profesional}
                </span>
              </div>
            </div>
          )}

          <h2 className="section-title">
            Selecciona una fecha
          </h2>

          <div className="calendar-box">
            <Calendar
              locale="es-ES"
              onChange={(value) =>
                setFecha(value as Date)
              }
              value={fecha}
            />
          </div>

          <div className="selected-date">
            <strong>Fecha elegida:</strong>{" "}
            {fecha.toLocaleDateString("es-ES")}
          </div>

          <h2 className="section-title">
            Horas disponibles
          </h2>

          <div className="hours-container">
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
                  className={`hour-button ${
                    horaSeleccionada === hora
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    setHoraSeleccionada(hora)
                  }
                >
                  🕐 {hora}
                </button>
              ))}
          </div>

          <div className="selected-hour">
            <strong>Hora elegida:</strong>{" "}
            {horaSeleccionada || "Ninguna"}
          </div>

          <h2 className="section-title">
            Tus datos
          </h2>

          <form
            className="booking-form"
            onSubmit={(e) => {
              e.preventDefault();
              guardarReserva();
            }}
          >
            <input
              className="booking-input"
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) =>
                setNombre(e.target.value)
              }
              required
            />

            <input
              className="booking-input"
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <button
              className="confirm-button"
              type="submit"
              disabled={enviando}
            >
              {enviando
                ? "Enviando..."
                : "✓ Confirmar reserva"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default function Reservas() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <ReservasContenido />
    </Suspense>
  );
}