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
           <section id="contacto" style={{ marginTop: "40px" }}>
                                   <h2>Envíanos un mensaje</h2>
                                      <p>..................Mas info y reservas...................</p> 
                                      <ContactForm />
                                 </section>
    </div>

    </main>
  );
}