"use client";
import ContactForm from "./contactForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
export default function Cursos() {
const comprarCurso = async (
  curso: string,
  modalidad: "estandar" | "premium"
) => {
  const respuesta = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      curso,
      modalidad,
    }),
  });

  const data = await respuesta.json();

  if (data.url) {
    window.location.href = data.url;
  } else {
    alert(data.error || "No se pudo iniciar el pago.");
  }
};
  return (
    <main style={{ padding: "40px" }}>
     <div className="curso">
      <h1> ¿Cómo puedo ayudar a mi familiar con demencia?</h1>
      <p> Curso completo para familias de personas con demencia </p>
      <h2>¿Qué incluye?</h2>
      <ul>
        <li>Estrategias de comunicación</li>
        <li>Estrategias para el cuidado diario</li>
        <li>Estrategias para conservar las capacidades fisicas y cognitivas de la persona</li>
        <li>Apoyo emocional para familias</li>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>

  <div>

    <p>✔ Online</p>

    <p>✔ A tu ritmo</p>

    <p>✔ Acceso durante 12 meses o ilimitado según la modalidad</p>

  </div>

  <div
  style={{
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  }}
>
<div
  style={{
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  }}
>
  <a
    href="/familiares-demencia.pdf"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      background: "#2563eb",
      color: "white",
      padding: "12px 20px",
      borderRadius: "10px",
      textDecoration: "none",
      fontWeight: "bold",
    }}
  >
    📄 Ver programa completo
  </a>

  <button
    onClick={() => comprarCurso("familias-demencia", "estandar")}
    style={{
      background: "#16a34a",
      color: "white",
      padding: "12px 20px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    💳 Comprar curso (Estándar)
  </button>

  <button
    onClick={() => comprarCurso("familias-demencia", "premium")}
    style={{
      background: "#2563eb",
      color: "white",
      padding: "12px 20px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    ⭐ Comprar curso (Premium)
  </button>
</div>
</div>
</div>
      </ul>
                <section id="contacto" style={{ marginTop: "40px" }}>
                                   <h2>Envíanos un mensaje</h2>
                                      <p>..................Mas info y reservas...................</p> 
                                      <ContactForm />
                                 </section>
    </div>

    <div className="curso">
      <h1> Manejo y cuidados de personas con demencia</h1>
      <p> Curso completo para profesionales que trabajan con personas con demencia </p>
      <h2>¿Qué incluye?</h2>
      <ul>
        <li>Estrategias de comunicación</li>
        <li>Estrategias para el cuidado diario</li>
        <li>Escuela de espalda.Estrategias para movilizar adecuadamente a la persona</li>
      </ul>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>

  <div>

    <p>✔ Online</p>

    <p>✔ A tu ritmo</p>

    <p>✔ Acceso durante 12 meses o ilimitado según la modalidad</p>

  </div>

 <div
  style={{
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  }}
>
 <div
  style={{
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  }}
>
  <a
    href="/profesionales-demencia.pdf"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      background: "#2563eb",
      color: "white",
      padding: "12px 20px",
      borderRadius: "10px",
      textDecoration: "none",
      fontWeight: "bold",
    }}
  >
    📄 Ver programa completo
  </a>

  <button
    onClick={() => comprarCurso("profesionales-demencia", "estandar")}
    style={{
      background: "#16a34a",
      color: "white",
      padding: "12px 20px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    💳 Comprar curso (Estándar)
  </button>

  <button
    onClick={() => comprarCurso("profesionales-demencia", "premium")}
    style={{
      background: "#2563eb",
      color: "white",
      padding: "12px 20px",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    ⭐ Comprar curso (Premium)
  </button>
</div>
</div>

</div>
           <section id="contacto" style={{ marginTop: "40px" }}>
                                   <h2>Envíanos un mensaje</h2>
                                      <p>..................Mas info y reservas...................</p> 
                                      <ContactForm />
                                 </section>
    </div>

    </main>
  );
}