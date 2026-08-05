"use client";

import ContactForm from "./contactForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Cursos() {

  const comprarCurso = async (modalidad: "estandar" | "premium") => {
    const respuesta = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        curso: "familias-autismo",
        modalidad,
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
        <h1>¿Cómo puedo ayudar a mi hijo con autismo?</h1>

        <p>Curso completo para familiares de niños con autismo</p>

        <h2>¿Qué incluye?</h2>

        <ul>
          <li>Estrategias de comunicación</li>
          <li>Estrategias para las dificultades de alimentación</li>
          <li>Estrategias para las dificultades en el aseo</li>
          <li>Estrategias para las dificultades en el vestido</li>
        </ul>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px",
            marginBottom: "30px",
          }}
        >
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
            <a
              href="/familiares-autismo.pdf"
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
              onClick={() => comprarCurso("estandar")}
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
              onClick={() => comprarCurso("premium")}
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

        <section id="contacto" style={{ marginTop: "40px" }}>
          <h2>Envíanos un mensaje</h2>

          <p>..................Más info y reservas...................</p>

          <ContactForm />
        </section>
      </div>
    </main>
  );
}