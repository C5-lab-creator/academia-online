"use client";

import ContactForm from "./contactForm";

export default function Cursos() {

  const comprarCurso = async (curso: string) => {
    const respuesta = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ curso }),
    });

    const data = await respuesta.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert(data.error);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">

      <h1 className="text-4xl font-bold text-center text-blue-900 mb-4">
        Cursos Intensivos de Selectividad
      </h1>

      <p className="text-center text-gray-700 text-lg mb-10">
        Prepárate para la PAU con cursos completos diseñados para ayudarte a
        aprobar Química y Matemáticas mediante vídeos grabados, resolución de
        ejercicios, exámenes oficiales y tutorías personalizadas.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* QUÍMICA */}

        <div className="curso">

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            ⚗️ Aprueba Química en 4 semanas
          </h2>

          <p className="text-gray-700 mb-4">
            Curso intensivo completo de Química para Selectividad organizado por
            temas y adaptado al modelo oficial de la PAU.
          </p>

          <h3 className="font-bold text-blue-800 mb-2">
            ¿Qué incluye?
          </h3>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>20 horas de clases grabadas (2 horas por tema).</li>
            <li>10 horas de resolución de exámenes oficiales.</li>
            <li>5 horas de tutorías individuales en directo.</li>
            <li>Material descargable.</li>
            <li>Acceso ilimitado al curso.</li>
            <li>Actualizaciones incluidas.</li>
            <li>Ver programa y precios →</li>
          </ul>

          <button
            onClick={() => comprarCurso("quimica-selectividad")}
            className="boton-reservar"
          >
            💳 Comprar curso
          </button>

        </div>

        {/* MATEMÁTICAS */}

        <div className="curso">

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            📐 Aprueba Matemáticas en 4 semanas
          </h2>

          <p className="text-gray-700 mb-4">
            Curso intensivo completo de Matemáticas para Selectividad organizado
            por temas y adaptado al examen oficial de la PAU.
          </p>

          <h3 className="font-bold text-blue-800 mb-2">
            ¿Qué incluye?
          </h3>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>20 horas de clases grabadas (2 horas por tema).</li>
            <li>10 horas de resolución de exámenes oficiales.</li>
            <li>5 horas de tutorías individuales en directo.</li>
            <li>Material descargable.</li>
            <li>Acceso ilimitado al curso.</li>
            <li>Actualizaciones incluidas.</li>
            <li>Ver programa y precios →</li>
          </ul>

          <button
            onClick={() => comprarCurso("matematicas-selectividad")}
            className="boton-reservar"
          >
            💳 Comprar curso
          </button>

        </div>

      </div>

      <section className="mt-16">

        <h2 className="text-3xl font-bold text-blue-900 mb-3">
          ¿Necesitas más información?
        </h2>

        <p className="text-gray-700 mb-6">
          Si tienes cualquier duda sobre el contenido de los cursos, el proceso
          de compra o el acceso al aula virtual, envíanos un mensaje y te
          responderemos lo antes posible.
        </p>

        <div className="curso">
          <ContactForm />
        </div>

      </section>

    </main>
  );
}