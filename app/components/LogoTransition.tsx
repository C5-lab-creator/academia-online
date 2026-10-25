"use client";

import { useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function LogoTransition() {
  const [animando, setAnimando] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navegando = useRef(false);

  function volverAlInicio() {
    if (navegando.current) return;

    // Si ya estamos en inicio, no navegamos.
    if (pathname === "/") return;

    navegando.current = true;
    setAnimando(true);

    temporizador.current = setTimeout(() => {
      router.push("/");
    }, 650);
  }

  // La animación se puede repetir al regresar desde otra página.
  function finalizarAnimacion() {
    setAnimando(false);
    navegando.current = false;

    if (temporizador.current) {
      clearTimeout(temporizador.current);
      temporizador.current = null;
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={volverAlInicio}
        aria-label="Volver a la página de inicio"
        className="flex items-center justify-center hover:opacity-90 transition-opacity"
      >
        <Image
          src="/logo.png"
          alt="Mente Abierta"
          width={400}
          height={400}
          className="w-16 h-16 md:w-[400px] md:h-[400px]"
          priority
        />
      </button>

      {animando && (
        <div
          key={Date.now()}
          className="logo-transition-overlay"
          onAnimationEnd={finalizarAnimacion}
        >
          <div className="logo-transition-circle" />
        </div>
      )}

      <style jsx global>{`
        .logo-transition-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.96);
          animation: logoFade 0.65s ease-in-out forwards;
        }

        .logo-transition-circle {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background-image: url("/logo.png");
          background-size: cover;
          background-position: center;
          animation: logoExpand 0.65s ease-in-out forwards;
        }

        @keyframes logoExpand {
          0% {
            transform: scale(0.15);
            opacity: 0;
          }

          45% {
            transform: scale(1);
            opacity: 1;
          }

          100% {
            transform: scale(20);
            opacity: 0;
          }
        }

        @keyframes logoFade {
          0% {
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          80% {
            opacity: 1;
          }

          100% {
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .logo-transition-overlay,
          .logo-transition-circle {
            animation-duration: 0.01ms;
          }
        }
      `}</style>
    </>
  );
}