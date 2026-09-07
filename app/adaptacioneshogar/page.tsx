import Link from "next/link";
import Image from "next/image";
import ContactForm from "./contactForm";
export const metadata = {
  title: "Adaptaciones en el Hogar | Mente Abierta",
  description:
    "Adaptaciones en el hogar para personas mayores y con diversidad funcional, promoviendo la autonomía, seguridad y bienestar en el entorno doméstico.",
};
export default function Envejecimiento() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 py-12 px-6">

      <div className="max-w-7xl mx-auto">

        {/* CABECERA */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">

          <div className="flex flex-col md:flex-row items-center gap-10">

            <div className="flex-1">

              <h1 className="text-4xl font-bold text-blue-900 mb-6">
                Adaptaciones en el Hogar 
              </h1>

              <p className="text-gray-700 text-lg leading-8 mb-6">
               Adaptaciones en el hogar, promoviendo la autonomía, seguridad y bienestar en el entorno doméstico.
              </p>

              <Link href="/reservas?servicio=adaptacioneshogar">
                <button className="bg-blue-900 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition">
                  Solicitar una valoración
                </button>
              </Link>

            </div>

          </div>

        </div>

        {/* SERVICIOS */}

        <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">
          ¿Qué ofrecemos?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-14">

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="text-5xl mb-4"></div>

            <h3 className="text-xl font-bold text-blue-900 mb-4">
                Valoracion del entorno y asesoramiento familiar
            </h3>

            <p className="text-gray-700 leading-7">
              Adaptaciones en el hogar, productos de apoyo, organizacion de rutinas, estrategias para cuidadores, adaptacion de actividades, recomendaciones para favoecer la independencia.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="text-5xl mb-4">👨‍👩‍👧</div>

            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Asesoramiento Familiar
            </h3>

            <p className="text-gray-700 leading-7">
              Orientación y apoyo a familiares y cuidadores para afrontar el día
              a día con mayor seguridad y confianza.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <div className="text-5xl mb-4">👨‍👩‍👧</div>

            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Elaboración de un plan de acción personalizado
            </h3>

            <p className="text-gray-700 leading-7">
                Desarrollo de un plan de acción adaptado a las necesidades y objetivos de cada persona, con recomendaciones específicas para mejorar la autonomía y seguridad en el hogar.
            </p>

          </div>

        </div>

        {/* METODOLOGÍA */}

        <div className="bg-white rounded-3xl shadow-xl p-10 mb-12">

          <h2 className="text-3xl font-bold text-blue-900 mb-8">
            ¿Cómo trabajamos?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-gray-700">

            <ul className="space-y-4">
              <li>✅ Valoración inicial individual.</li>
              <li>✅ Objetivos personalizados.</li>
              <li>✅ Asesoramiento personalizado para el hogar.</li>
              <li>✅ Seguimiento continuo.</li>
            </ul>

          </div>

        </div>

        {/* BOTÓN */}

        <div className="text-center mb-14">

          <Link href="/reservas?servicio=adaptacioneshogar">

            <button className="bg-green-600 hover:bg-green-700 text-white text-xl font-bold px-10 py-5 rounded-2xl transition">
              Solicitar una valoración
            </button>

          </Link>

        </div>

        {/* CONTACTO */}

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            ¿Necesitas más información?
          </h2>

          <p className="text-gray-700 text-lg mb-8">
            Si deseas conocer cómo podemos ayudarte o necesitas orientación
            sobre cómo adaptar tu hogar para mejorar la autonomía y seguridad, no dudes en ponerte en contacto con nosotros. Nuestro equipo estará encantado de atenderte y ofrecerte la mejor solución para tus necesidades.
          </p>

          <ContactForm />

        </div>

      </div>

    </main>
  );
}