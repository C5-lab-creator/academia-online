import ContactForm from "./contactForm";
export default function Cursos() {
  return (
    <main style={{ padding: "40px" }}>
    <div className="curso">
      <h1>¿Cómo puedo ayudar a mi hijo con autismo?</h1>
      <p> Curso completo para familiares de niños con autismo </p>
      <h2>¿Qué incluye?</h2>
      <ul>
        <li>Estrategias de comunicacion</li>
        <li>Estrategias para las dificultades de alimentacion</li>
        <li>Estrategias para las dificultades en el aseo</li>
        <li>TEstrategias para las dificultades en el vestido</li>
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
    💳 Comprar curso
  </button>
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