import Link from "next/link";
import ContactForm from "./contact";
 export default function Bachillerato() {
  return (
    <main>
      <h1>🎓 Fisica</h1>
<div className="cursos-grid">
      <h2>¿Qué ofrecemos?</h2>
       <p>Clases particulares de fisica para alumnos de 2º de bachillerato durante todo el año</p>
       <p>Preparacion de la asignatura para superar la PAU</p>

     <h2>Preparación PAU</h2>
        <p>
          Preparamos los exámenes de acceso a la universidad mediante clases
          personalizadas, resolución de ejercicios y simulacros de examen.
        </p>
    
        <h2>Modalidades</h2>
        <ul>
          <li>Clases individuales</li>
          <li>Grupos reducidos</li>
          <li>Intensivos</li>
        </ul>

        <Link href="/reservas?servicio=fisica2">
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