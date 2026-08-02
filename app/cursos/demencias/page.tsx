import ContactForm from "./contactForm";
export default function Cursos() {
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

  <a

    href="/public/familiares-demencia.pdf"

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

  <a

    href="/public/profesionales-demencia.pdf"

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