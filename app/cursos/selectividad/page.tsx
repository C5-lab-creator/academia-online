"use client";

import ContactForm from "./contactForm";

export default function Cursos() {

  const comprarCurso = async (curso: string) => {
    const respuesta = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ curso }),
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
       <h1>Aprueba quimica de selectividad en 4 semanas</h1>
      <p> Curso intensivo completo de quimica de selectividad por temas</p>    
        <h2>¿Qué incluye?</h2>
        <ul>
        <li>20 horas de clases grabadas (2 horas por tema) </li>
        <li>10 horas de resolución de exámenes de años anteriores</li>
        <li>5 horas de tutorías individuales en directo para resolver tus dudas </li>
      </ul>
      <button
  onClick={() => comprarCurso("quimica-selectividad")}
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
      <h1>Aprueba matemáticas de selectividad en 4 semanas</h1>
      <p> Curso intensivo completo de matemáticas de selectividad por temas</p>
      <h2>¿Qué incluye?</h2>
      <ul>
        <li>20 horas de clases grabadas (2 horas por tema)</li>
        <li>10 horas de resolución de exámenes de años anteriores</li>
        <li>5 horas de tutorías individuales en directo para resolver tus dudas</li>
      </ul>
      <button
  onClick={() => comprarCurso("matematicas-selectividad")}
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