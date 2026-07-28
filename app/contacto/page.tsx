import ContactForm from "./contactForm";
import Image from "next/image";

export default function Contacto() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-8">

      <h1 className="text-4xl font-bold text-center text-blue-900 mb-4">
        Contacto
      </h1>

      <p className="text-center text-gray-700 text-lg mb-10">
        Estaremos encantados de ayudarte. Puedes escribirnos por correo o
        enviarnos un mensaje mediante el formulario.
      </p>

      {/* Información */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

        <div className="curso">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            📧 Correo electrónico
          </h2>

          <p className="text-gray-700 mb-2">
            academia.menteabierta@gmail.com
          </p>

          <p className="text-gray-700">
            info@academia-menteabierta.com
          </p>
        </div>

        <div className="curso">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            📱 Redes sociales
          </h2>

          <p className="text-gray-700">Facebook</p>
          <p className="text-gray-700">Instagram</p>
        </div>

      </div>

      {/* Logo + formulario */}

      <div className="flex flex-col md:flex-row items-center gap-10">

        <div className="flex justify-center md:w-1/2">
          <Image
            src="/logo.png"
            alt="Mente Abierta"
            width={350}
            height={350}
            className="rounded-xl shadow-lg w-64 sm:w-80 md:w-[350px] h-auto"
          />
        </div>

        <section className="md:w-1/2 w-full">

          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center md:text-left">
            Envíanos un mensaje
          </h2>

          <div className="curso">
            <ContactForm />
          </div>

        </section>

      </div>

    </main>
  );
}