import Link from "next/link";

export default function Home() {
  return (
    <main>
        <h1>Academia MENTE ABIERTA</h1>

        <h1>Nuestros servicios</h1>

        <div className="card">
          <Link href="/clases">
            <h3>ACADEMIA Y CLASES PARTICULARES</h3>
            <p>
            Especialistas en Selectividad (PAU), Química y Matematicas.
            </p>
            <p>
            En nuestra academia acompañamos a cada estudiante para que alcance su máximo potencial mediante una enseñanza cercana, práctica y personalizada.
            </p>
            <p>
            Somos especialistas en la preparación de la Prueba de Acceso a la Universidad (PAU), ofreciendo clases particulares, programas intensivos y una planificación estratégica para afrontar los exámenes con seguridad y confianza.
            </p>    
            <p>Contamos con profesorado especializado, destacando la preparación de Química y otras asignaturas del ámbito científico, tanto para Bachillerato y Selectividad como para estudios universitarios relacionados con las ciencias, proporcionando un apoyo sólido y adaptado a las exigencias de cada titulación.</p>
          </Link>
        
               <h1>Además, ofrecemos:</h1>
                   <ul>
                     <li>Refuerzo escolar desde Primaria hasta Bachillerato.</li>
                     <li>Preparación intensiva para Selectividad y pruebas de acceso a la universidad para mayores de 25.</li>
                     <li>Apoyo universitario en estudios relacionados con Química y Ciencias.</li>
                     <li>Atención al alumnado con necesidades educativas especiales.</li>
                     <li>Clases particulares individuales y en grupos reducidos.</li>
                     <li>Cursos grabados.</li>
                     <li>Técnicas de estudio y planificación del aprendizaje.</li>
                     <li>Nuestro objetivo es que cada alumno no solo obtenga mejores resultados académicos, sino que adquiera la confianza, la organización y las herramientas necesarias para seguir aprendiendo con éxito.</li>
                 </ul>          
            </div> 

        <div className="card">
            <Link href="/cursos">
            <h3>CURSOS</h3>
            <p>Tenemos cursos grabados para poder aprender a tu ritmo y según tu disponibilidad.</p>
            <p>¿Quieres acceder a contenidos educativos en cualquier momento y desde cualquier lugar?</p>
            <p>En nuestra plataforma de cursos grabados, ofrecemos una amplia variedad de contenidos educativos diseñados para adaptarse a tu ritmo de aprendizaje y a tu disponibilidad.</p>
            <p>Desde cursos de refuerzo escolar hasta programas especializados en selectividad y ciencias, nuestros cursos grabados te permiten aprender a tu propio ritmo, revisando los materiales tantas veces como necesites.</p>
            <p>Accede a lecciones detalladas, ejercicios prácticos y recursos complementarios que te ayudarán a consolidar tus conocimientos y mejorar tus habilidades académicas.</p>
            <p>Con nuestra plataforma de cursos grabados, tienes la flexibilidad de aprender cuando quieras y donde quieras, sin comprometer la calidad de tu educación.</p>
            </Link>
        </div>    
   </main>);
}
