import Link from "next/link";
import ContactForm from "./contactForm";
export default function AlumnosNEE() {
  return (
    <main>
      <div className="curso">
      <h1>📖 Alumnos con necesidades educativas especiales</h1>
    
       <h2>¿Qué ofrecemos?</h2>
      <p>
        Clases particulares de refuerzo enseñanza para alumnos con necesidades educativas especiales.
      </p>

       <h2>Metodología</h2>
      <p>
        Las clases se centran en la comprensión de la teoría y la resolución de
        problemas. Se adaptan al ritmo y a los objetivos de cada alumno.
      </p>

      <h2>¿En que te ayudamos y como lo hacemos?</h2>
          <p>TEA</p>
          <p>TDAH</p>
          <p>Dificultades en el aprendizaje</p>


          <p>Adataciones y estrategias para el aprendizaje</p>
          <p>Apoyo en la organización y gestión del tiempo</p>
          <p>Apoyo en la planificación y seguimiento de tareas y deberes</p>
          <p>Apoyos visuales y recursos didácticos</p>
          <p>Apoyo en la comprensión de instrucciones y en la comunicación</p>
          <p>Apoyo en la preparación de exámenes y evaluaciones</p>
          <p>Asesoramiento personalizado</p>

        <Link href="/reservas?servicio=nee">
    <button className="boton-reservar">
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
