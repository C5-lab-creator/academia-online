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
       <h1>Curso de matemáticas</h1>
      <p> Curso completo del contenido de matemáticas 2º bachillerato</p>    
        <h2>¿Qué incluye?</h2>
        <ul>
        <li>Curso de 30 horas. Clases grabadas de cada tema que podrás ver cuando quieras</li>
        <li>Tutorías online: 3 horas. Clases individuales para resolver todas tus dudas</li>
      </ul>
      <button
  onClick={() => comprarCurso("matematicas-bachillerato")}
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
      <h1>Curso de química</h1>
      <p> Curso completo del contenido de química 2º bachillerato</p>
      <h2>¿Qué incluye?</h2>
      <ul>
        <li>Clases grabadas de cada tema que podrás ver cuando quieras </li>
        <li>Tutorías individuales. Clases para resolver todas tus dudas</li>
      </ul>
      <button
  onClick={() => comprarCurso("quimica-bachillerato")}
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