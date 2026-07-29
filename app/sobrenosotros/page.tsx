import Image from "next/image";

export default function Home() {
  return (
    <main>
      <h1>NUESTRO EQUIPO. NUESTRA FILOSOFÍA</h1>

      <h2>Aprender, crecer y desarrollar el potencial de cada persona.</h2>

      <p>
        En Mente Abierta creemos que la educación, la ciencia y el desarrollo
        cognitivo son herramientas capaces de transformar vidas. Por ello,
        hemos creado un espacio online donde unimos la excelencia académica,
        la intervención especializada y el acompañamiento personalizado para
        ofrecer una respuesta integral a las necesidades de cada persona.
      </p>

      <p>
        Nuestro proyecto nace de la unión de dos ámbitos complementarios: la
        educación y la terapia ocupacional.
      </p>

      <p>
        Esta combinación nos permite acompañar tanto a estudiantes que desean
        alcanzar sus metas académicas como a niños, adultos y personas mayores
        que buscan potenciar, mantener o recuperar sus capacidades cognitivas.
      </p>

      <p>
        Creemos en una atención cercana, rigurosa y adaptada a cada persona.
        Apostamos por una enseñanza de calidad, programas personalizados y una
        metodología basada en la evidencia científica, donde el aprendizaje y
        el desarrollo personal avanzan de la mano.
      </p>

      <p>
        Cada persona tiene un potencial único. Nuestro compromiso es
        proporcionarle las herramientas, el conocimiento y el acompañamiento
        necesarios para desarrollarlo con confianza, autonomía y éxito.
      </p>

      <div className="cards">
        {/* Tarjeta Sheila */}
        <div className="card">
          <h3>Sheila - Graduada en Terapia Ocupacional. Formación completa de integración sensorial por la Universidad del Sur de California (USC) </h3>

          <Image
            src="/sheila.jpg"
            alt="Sheila"
            width={250}
            height={250}
            style={{
              borderRadius: "12px",
              marginBottom: "20px",
              objectFit: "cover",
            }}
          />

          <p>
            Cuento con 4 años de experiencia en atención temprana, tanto en intervención directa como en el desarrollo de programas personalizados y asesoramiento a familiasEspecializada en infancia y envejecimiento normal y patológico.
            También tengo experiencia en estimulación cognitiva en demencias, trastornos del neurodesarrollo,
            neurorrehabilitación e integración sensorial.
          </p>
      
          <p>
            Desarrollo programas personalizados dirigidos a niños, adultos y
            personas mayores, trabajando la memoria, la atención, las funciones
            ejecutivas, el lenguaje y otras capacidades cognitivas con el
            objetivo de favorecer la autonomía, la participación en la vida
            diaria y la calidad de vida.
          </p>

          <p>
            Además, ofrezco orientación y asesoramiento a familias,
            proporcionando estrategias prácticas para dar continuidad a la
            intervención en el entorno cotidiano.
          </p>
        </div>

        {/* Tarjeta Eduardo */}
        <div className="card">
          <h3>Eduardo - Graduado en Quimica y Master profesorado. Profesor de Química y Ciencias</h3>

          <Image
            src="/eduardo.jpg"
            alt="Eduardo"
            width={250}
            height={250}
            style={{
              borderRadius: "12px",
              marginBottom: "20px",
              objectFit: "cover",
            }}
          />

          <p>
            Cuento con más de 8 años experiencia en la preparación de estudiantes de
            Bachillerato y Universidad en academias presenciales y online, ofreciendo una metodología clara,
            práctica y orientada a obtener los mejores resultados académicos. 
          </p>

          <p>
            Especialista en la preparación de la Prueba de Acceso a la
            Universidad (PAU) y en la enseñanza de Química y otras materias del
            ámbito científico.
          </p>

        
        </div>
      </div>
    </main>
  );
}