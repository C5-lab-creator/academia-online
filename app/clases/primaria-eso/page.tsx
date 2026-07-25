import Link from "next/link";
import ContactForm from "./contactForm";
export default function PrimariaYESO() {
  return (
    <main>
      <h1>📖 Primaria y ESO</h1>
      <div className="curso">
       <h2>¿Qué ofrecemos?</h2>
      <p>
        Clases particulares de refuerzo enseñanza de todas las materias para estudiantes de Primaria y ESO, adaptadas a las necesidades de cada estudiante, con un enfoque práctico y personalizado.
      </p>
      </div>
      
      <div className="curso">
      <h2>Asignaturas</h2>
      <ul>
        <li>Lengua y literatura</li>
        <li>Matemáticas</li>
        <li>Ciencias Naturales - Biología</li>
        <li>Ciencias sociales - Historia y Geografía</li>
        <li>Ingles y francés</li>
      </ul>
      </div>
      
      <div className="curso">
       <h2>Metodología</h2>
      <p>
        Las clases se centran en la comprensión de la teoría, la resolución de
        problemas y la preparación de prácticas y exámenes. Se adaptan al ritmo
        y a los objetivos de cada alumno.
      </p>

      </div>
      
      <div className="curso">
      <h2>Modalidades</h2>
      <ul>
        <li>Clases individuales o grupales</li>
        <li>Online con pizarra digital</li>
        <li>Resolución de ejercicios y boletines</li>
      </ul>
      
          <Link href="/reservas">
    <button className="boton-reservar?servicio=primariayeso">
      Reservar
    </button>
  </Link>
  
      </div>

      
       <section id="contacto" style={{ marginTop: "40px" }}>
                  <h2>Envíanos un mensaje</h2>
                     <p>..................Mas info y reservas...................</p> 
                        <ContactForm />
                </section>
                
    </main>
  );
}
