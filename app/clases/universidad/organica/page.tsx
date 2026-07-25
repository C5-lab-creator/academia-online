import Link from "next/link"; 
import ContactForm from "./contactForm";
export default function Universidad() {
  return (
    <main>
      <h1>🧪 Quimica organica</h1>
       <div className="cursos-grid">
         <h2>¿Qué ofrecemos?</h2>
           <p>Quimica organica</p>
           <p>Clases particulares de quimica organica I, II y III de diferentes grados universitarios y UNED:</p>
           <p>Grados uiversitarios de quimica, farmacia, biologia, medicina, entre otros</p>


    <h2>Metodología</h2>
      <p>Las clases se centran en la comprensión de la teoría, la resolución de problemas y la preparación de prácticas y exámenes. Se adaptan al ritmo y a los objetivos de cada alumno.</p>
      <h2>Modalidades</h2>
      <ul>
        <li>Clases individuales o grupales</li>
        <li>Online con pizarra digital</li>
        <li>Resolución de ejercicios y boletines</li>
        <li>Preparación de exámenes universitarios</li>
      </ul>
        <Link href="/reservas?servicio=quimicaorganica">
    <button className="boton-reservar">
      Reservar
    </button>
  </Link>
     <section id="contacto" style={{ marginTop: "40px" }}>
                    <h2>Envíanos un mensaje</h2>
                     <p>..................Mas info y reservas...................</p> 
                    <ContactForm />
       </section>
     </div>
    </main>
  );
  }
