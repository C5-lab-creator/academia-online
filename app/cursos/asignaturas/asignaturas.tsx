import ContactForm from "./contactForm";
export default function Cursos() {
  return (
    <main style={{ padding: "40px" }}>
      <div className="curso">
       <h1>Aprueba quimica de selectividad en 4 semanas</h1>
      <p> Curso intensivo completo de quimica de selectividad</p>    
        <h2>¿Qué incluye?</h2>
        <ul>
        <li>Curso de 30 horas de todos los temas</li>
        <li>Ejercicios resueltos</li>
        <li>Exámenes de años anteriores</li>
        <li>Tutorías</li>
      </ul>
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
            <section id="contacto" style={{ marginTop: "40px" }}>
                                    <h2>Envíanos un mensaje</h2>
                                       <p>..................Mas info y reservas...................</p> 
                                       <ContactForm />
                                  </section>
    </div>
</main>
);
}