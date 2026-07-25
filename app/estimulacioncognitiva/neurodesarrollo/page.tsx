import Link from "next/link";
import ContactForm from "./contactForm";
export default function Neurodesarrollo() {
  return (
    <main>
      <h1>📖 TRASTORNOS DEL NEURODESRROLLO</h1>
      <div className="cursos-grid">
       <h2>¿Qué ofrecemos?</h2>
         <p>Apoyo educativo para alumnado con necesidades educativas especiales</p>
         <p>Adaptaciones y apoyos personalizados</p>
         <p>Asesoramiento a padres y familias</p>
        
       <h2>Metodología</h2>
         <p>Valoracion incial</p>
         <p>Intervencion</p>
         <p>Asesoramiento y seguimiento posterior</p>

      <h2>¿En que te ayudamos y como lo hacemos?</h2>
          <p>TEA</p>
          <p>TDAH</p>
          <p>Dificultades en el aprendizaje</p>

          <p>Adaptaciones visuales y sensoriales</p>
          <p>Adataciones y estrategias para el aprendizaje</p>
          <p>Apoyo en la organización y gestión del tiempo</p>
          <p>Apoyo en la planificación y seguimiento de tareas y deberes</p>
          <p>Apoyos visuales y recursos didácticos</p>
          <p>Apoyo en la comprensión de instrucciones y en la comunicación</p>
          <p>Apoyo en la preparación de exámenes y evaluaciones</p>
          <p>Asesoramiento personalizado</p>
  
  <Link href="/reservas">
    <button className="boton-reservar?servicio=neurodesarrollo">
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