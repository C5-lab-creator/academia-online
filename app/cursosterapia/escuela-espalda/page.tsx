"use client";

import ContactForm from "./contactForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Cursos() {

  const comprarCurso = async (
    curso: "escuela de espalda",
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


    const { url, error } = await respuesta.json();


    if (url) {
      window.location.href = url;
    } else {
      alert(error || "No se pudo iniciar el pago.");
    }

  };


  return (

    <main className="max-w-7xl mx-auto px-6 py-8">


      <h1 className="text-4xl font-bold text-center text-blue-900 mb-4">
        Escuela de Espalda
      </h1>

      <p className="text-center text-gray-700 text-lg mb-10">
        Curso completo para aprender a cuidar tu espalda, prevenir el dolor y
        mejorar tu calidad de vida mediante ejercicios, educación postural y
        hábitos saludables.
      </p>



      <div className="curso bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">


        <div className="p-8">


          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            ¿Qué incluye?
          </h2>


          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">

            <li>
              Anatomía básica de la columna vertebral.
            </li>

            <li>
              Ejercicios para fortalecer la espalda y el core.
            </li>

            <li>
              Estiramientos para mejorar la movilidad.
            </li>

            <li>
              Higiene postural en casa y en el trabajo.
            </li>

            <li>
              Cómo prevenir lesiones y recaídas.
            </li>

            <li>
              Consejos para reducir el dolor en el día a día.
            </li>

          </ul>




          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Modalidades
          </h2>


          <div className="text-gray-700 mb-8">

            <p>✔ Online. Sesiones presenciales en modalidad premium.</p>

            <p>✔ A tu ritmo</p>

            <p>
              ✔ Acceso durante 6 meses o ilimitado según la modalidad
            </p>

          </div>




          <div className="flex flex-wrap gap-4">


            <a
              href="/escuela-espalda.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
            >
              📄 Ver programa completo
            </a>



            <button
              onClick={() => comprarCurso("escuela de espalda", "estandar")}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-semibold transition"
            >
              💳 Comprar curso (Estándar)
            </button>



            <button
              onClick={() => comprarCurso("escuela de espalda", "premium")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
            >
              ⭐ Comprar curso (Premium)
            </button>



          </div>


        </div>



        <div className="h-48 bg-blue-50 flex items-center justify-center text-7xl">
          🦴
        </div>



      </div>





      <section className="mt-16">


        <h2 className="text-3xl font-bold text-blue-900 mb-3">
          ¿Necesitas más información?
        </h2>


        <p className="text-gray-700 mb-6">
          ¿Quieres más información sobre el curso o realizar tu reserva?
          Estaremos encantados de ayudarte.
        </p>



        <div className="curso">
          <ContactForm />
        </div>



      </section>



    </main>

  );
}