"use client";

import ContactForm from "./contactForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Cursos() {

  const comprarCurso = async (
    curso: string,
    modalidad: "estandar" | "premium"
  ) => {

    const respuesta = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        curso,
        modalidad,
      }),
    });

    const data = await respuesta.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert(data.error || "No se pudo iniciar el pago.");
    }
  };


  return (

    <main className="max-w-7xl mx-auto px-6 py-8">


      <h1 className="text-4xl font-bold text-center text-blue-900 mb-4">
        Cursos sobre Demencias
      </h1>


      <p className="text-center text-gray-700 text-lg mb-10">
        Formación online para familiares y profesionales, diseñada para
        comprender la demencia y mejorar el cuidado, autonomía y calidad de
        vida de las personas.
      </p>



      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">



        {/* FAMILIARES DEMENCIA */}


        <div className="curso bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">


          <div className="p-8">


            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              🧠 ¿Cómo puedo ayudar a mi familiar con demencia?
            </h2>


            <p className="text-gray-700 mb-4">
              Curso completo para familias de personas con demencia.
            </p>



            <h3 className="font-bold text-blue-800 mb-2">
              ¿Qué incluye?
            </h3>


            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">

              <li>
                Estrategias de comunicación.
              </li>

              <li>
                Estrategias para el cuidado diario.
              </li>

              <li>
                Estrategias para conservar las capacidades físicas y cognitivas
                de la persona.
              </li>

              <li>
                Apoyo emocional para familias.
              </li>

            </ul>



            <div className="text-gray-700 mb-6">

              <p>✔ Online. Sesiones presenciales incluidas en modalidad premium.</p>

              <p>✔ A tu ritmo</p>

              <p>
                ✔ Acceso durante 12 meses o ilimitado según modalidad.
              </p>

            </div>



            <div className="flex flex-wrap gap-4">


              <a
                href="/familiares-demencia.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
              >
                📄 Ver programa completo y precios
              </a>



              <button
                onClick={() =>
                  comprarCurso(
                    "familias-demencia",
                    "estandar"
                  )
                }
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-semibold transition"
              >
                💳 Comprar curso (Estándar)
              </button>



              <button
                onClick={() =>
                  comprarCurso(
                    "familias-demencia",
                    "premium"
                  )
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
              >
                ⭐ Comprar curso (Premium)
              </button>


            </div>


          </div>


          <div className="h-48 bg-blue-50 flex items-center justify-center text-7xl">
            🧠
          </div>


        </div>
        {/* PROFESIONALES DEMENCIA */}


        <div className="curso bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">


          <div className="p-8">


            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              👩‍⚕️ Manejo y cuidados de personas con demencia
            </h2>


            <p className="text-gray-700 mb-4">
              Curso completo para profesionales que trabajan con personas con
              demencia.
            </p>



            <h3 className="font-bold text-blue-800 mb-2">
              ¿Qué incluye?
            </h3>



            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">

              <li>
                Estrategias de comunicación.
              </li>

              <li>
                Estrategias para el cuidado diario.
              </li>

              <li>
                Escuela de espalda. Estrategias para movilizar adecuadamente a
                la persona.
              </li>

            </ul>



            <div className="text-gray-700 mb-6">

              <p>✔ Online. Sesiones presenciales incluidas en modalidad premium.</p>

              <p>✔ A tu ritmo</p>

              <p>
                ✔ Acceso durante 12 meses o ilimitado según modalidad.
              </p>

            </div>



            <div className="flex flex-wrap gap-4">


              <a
                href="/profesionales-demencia.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
              >
                📄 Ver programa completo y precios
              </a>



              <button
                onClick={() =>
                  comprarCurso(
                    "profesionales-demencia",
                    "estandar"
                  )
                }
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-semibold transition"
              >
                💳 Comprar curso (Estándar)
              </button>



              <button
                onClick={() =>
                  comprarCurso(
                    "profesionales-demencia",
                    "premium"
                  )
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
              >
                ⭐ Comprar curso (Premium)
              </button>


            </div>


          </div>



          <div className="h-48 bg-blue-50 flex items-center justify-center text-7xl">
            👩‍⚕️
          </div>


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