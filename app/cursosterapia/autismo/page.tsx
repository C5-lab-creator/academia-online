"use client";

import ContactForm from "./contactForm";

export default function Cursos() {

  const comprarCurso = async (modalidad: "estandar" | "premium") => {

    const respuesta = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        curso: "familias-autismo",
        modalidad,
      }),
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
        ¿Cómo puedo ayudar a mi hijo con autismo?
      </h1>


      <p className="text-center text-gray-700 text-lg mb-10">
        Curso completo dirigido a familias que desean comprender mejor el
        autismo y aprender estrategias prácticas para favorecer el desarrollo y
        la autonomía de sus hijos.
      </p>



      <div className="curso bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">


        <div className="p-8">


          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            ¿Qué incluye?
          </h2>



          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">


            <li>
              Estrategias de comunicación.
            </li>


            <li>
              Estrategias para las dificultades de alimentación.
            </li>


            <li>
              Estrategias para las dificultades en el aseo.
            </li>


            <li>
              Estrategias para las dificultades en el vestido.
            </li>


            <li>
              Material descargable.
            </li>


            <li>
              Casos prácticos.
            </li>


          </ul>




          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Modalidades
          </h2>



          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-8">


            <li>
              ✔ 100% online.
            </li>


            <li>
              ✔ Aprende a tu ritmo.
            </li>


            <li>
              ✔ Acceso durante 12 meses (Estándar).
            </li>


            <li>
              ✔ Acceso ilimitado y tutorías (Premium).
            </li>


          </ul>




          <div className="flex flex-wrap gap-4">


            <a
              href="/familiares-autismo.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
            >
              📄 Ver programa completo
            </a>




            <button
              onClick={() => comprarCurso("estandar")}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-semibold transition"
            >
              💳 Comprar Estándar
            </button>




            <button
              onClick={() => comprarCurso("premium")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
            >
              ⭐ Comprar Premium
            </button>



          </div>


        </div>




        <div className="h-48 bg-blue-50 flex items-center justify-center text-7xl">
          🧩
        </div>



      </div>




      <section className="mt-16">


        <h2 className="text-3xl font-bold text-blue-900 mb-3">
          ¿Necesitas más información?
        </h2>



        <p className="text-gray-700 mb-6">
          Si tienes cualquier duda sobre el contenido del curso, las modalidades
          o el proceso de compra, envíanos un mensaje y te responderemos lo
          antes posible.
        </p>



        <div className="curso">
          <ContactForm />
        </div>



      </section>



    </main>

  );
}