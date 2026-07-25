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
           <section id="contacto" style={{ marginTop: "40px" }}>
                                   <h2>Envíanos un mensaje</h2>
                                      <p>..................Mas info y reservas...................</p> 
                                      <ContactForm />
                                 </section>
    </div>

    </main>
  );
}