import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="flex min-h-[65vh] items-center justify-center">
      <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Error 404
        </p>

        <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Bloque no encontrado
        </h2>

        <p className="mt-4 text-gray-600">
          Esta ruta se quedo fuera del bloque. Entro al mempool, pero nunca se
          confirmo.
        </p>

        <p className="mt-2 text-gray-500">
          Vuelve al mercado principal y seguimos minando oportunidades.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-400 hover:text-gray-900"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
};

export default NotFound;