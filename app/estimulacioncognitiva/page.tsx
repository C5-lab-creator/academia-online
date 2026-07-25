import Link from "next/link";

export default function Estimulacioncognitiva() {
  return (
    <main>
        <h1>Academia MENTE ABIERTA</h1>
           <p>Nuestros programas de estimulación cognitiva están dirigidos a niños con necesidades educativas especiales, adultos y personas mayores que desean potenciar o mantener sus capacidades cognitivas.</p>
           <p> Diseñamos intervenciones individualizadas para trabajar la memoria, la atención, el lenguaje, el razonamiento, las funciones ejecutivas y otras habilidades esenciales para desenvolverse con mayor autonomía en el día a día.</p>
           <p>Las sesiones se realizan de forma online, adaptándose a las necesidades y objetivos de cada persona, tanto en procesos de envejecimiento saludable y deterioro cognitivo como en dificultades de aprendizaje, trastornos del neurodesarrollo y otras situaciones que puedan beneficiarse de una intervención especializada.</p>
           <p>Además de la intervención individual, ofrecemos asesoramiento y acompañamiento a familias, proporcionando orientación, estrategias prácticas y programas personalizados que favorecen la continuidad del trabajo en el entorno familiar, potenciando la autonomía, el aprendizaje y el bienestar de la persona.</p>
           <p>Trabajamos desde un enfoque integral, basado en la evidencia científica y centrado en las capacidades de cada persona, con el objetivo de mejorar su participación en la vida diaria, fomentar su independencia y contribuir a una mejor calidad de vida..</p>

        <div className="cursos">
<Link href ="/estimulacioncognitiva/envejecimiento">
  <h2>INTERVENCION EN ENVEJECIMIENTO NORMAL Y PATOLOGICO </h2>
             <p>Evaluacion</p>
             <p>Intervención</p>
             <p>Asesoramiento y acompañamiento a familias</p>
</Link>
        
<Link href ="/estimulacioncognitiva/neurodesarrollo">
  <h2>INTERVENCION EN TRASTORNOS DEL NEURODESARROLLO</h2>
             <p>Evaluacion</p>
             <p>Intervención</p>
             <p>Asesoramiento y acompañamiento a familias</p>
</Link>
        </div>
    </main>);
}
