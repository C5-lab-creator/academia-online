"use client";

import ContactForm from "./contactForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Cursos() {

  const comprarCurso = async (curso: string) => {
    const respuesta = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        curso,
      }),
    });

    const data = await respuesta.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert(data.error);
    }
  };

  return (
    <main style={{ padding: "40px" }}>
      <div className="curso">
       <h1>Curso de asignaturas troncales</h1>
      <p> Curso completo de las asignaturas troncales para acceso mayores de 25 años.</p>    
        <h2>¿Qué incluye?</h2>
        <ul>
        <li>Clases grabadas de cada tema que podrás ver cuando quieras:</li>
        <li>Curso de 10 horas de lengua</li>
        <li>Curso de 10 horas de inglés</li>
        <li>Curso de 10 horas de comentario de texto</li>
        <li>Resolución de exámenes de años anteriores. 3 horas</li>
      </ul>
      <button
  onClick={() => comprarCurso("mayores25-troncales")}
  style={{
    background: "#16a34a",
    color: "white",
    padding: "12px 20px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "20px",
  }}
>
  💳 Comprar curso
</button>
                  <section id="contacto" style={{ marginTop: "40px" }}>
                                    <h2>Envíanos un mensaje</h2>
                                       <p>..................Mas info y reservas...................</p> 
                                       <ContactForm />
                                  </section>
    </div>

    <div className="curso">
      <h1>Curso de asignaturas específicas</h1>
      <p> Curso completo de las asignaturas específicas para acceso mayores de 25 años.</p>
      <h2>¿Qué incluye?</h2>
      <ul>
        <li>Clases grabadas de cada tema que podrás ver cuando quieras:</li>
        <li>Curso de 10 horas de química</li>
        <li>Curso de 10 horas de matemáticas</li>
        <li>Curso de 10 horas de biología</li>
        <li>Resolución de exámenes de años anteriores. 3 horas</li>
      </ul>
      <button
  onClick={() => comprarCurso("mayores25-especificas")}
  style={{
    background: "#16a34a",
    color: "white",
    padding: "12px 20px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "20px",
  }}
>
  💳 Comprar curso
</button>
                <section id="contacto" style={{ marginTop: "40px" }}>
                                        <h2>Envíanos un mensaje</h2>
                                           <p>..................Mas info y reservas...................</p> 
                                           <ContactForm />
                                      </section>
    </div>
        <div className="curso">
          <h1>Aprobar química en pruebas de acceso mayores de 25 años</h1>
          <p> Curso intensivo completo de quimica de selectividad para pruebas de acceso mayores de 25 años</p>
          <h2>¿Qué incluye?</h2>
          <ul>
            <li>Vídeos explicativos</li>
            <li>Ejercicios resueltos</li>
            <li>Exámenes de años anteriores</li>
            <li>Tutorías</li>
          </ul>
          <button
  onClick={() => comprarCurso("quimica-mayores25")}
  style={{
    background: "#16a34a",
    color: "white",
    padding: "12px 20px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "20px",
  }}
>
  💳 Comprar curso
</button>
                <section id="contacto" style={{ marginTop: "40px" }}>
                                        <h2>Envíanos un mensaje</h2>
                                           <p>..................Mas info y reservas...................</p> 
                                           <ContactForm />
                                      </section>
        </div>
</main>
);
}