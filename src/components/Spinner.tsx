const Spinner = () => { 
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="relative w-24 h-24">
            {/* Spinner externo */}
            <div className="absolute inset-0 border-8 border-blue-200 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 border-8 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
            
            {/* Spinner medio */}
            <div className="absolute inset-2 border-8 border-purple-200 rounded-full animate-pulse animation-delay-150"></div>
            <div className="absolute inset-2 border-8 border-transparent border-t-purple-600 rounded-full animate-spin animation-delay-300" style={{animationDirection: 'reverse'}}></div>
            
            {/* Spinner interno */}
            <div className="absolute inset-4 border-8 border-pink-200 rounded-full animate-pulse animation-delay-300"></div>
            <div className="absolute inset-4 border-8 border-transparent border-t-pink-600 rounded-full animate-spin animation-delay-150"></div>
            
            {/* Centro */}
            <div className="absolute inset-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
          </div>
          <p className="mt-6 text-lg font-semibold text-gray-700 animate-pulse">
            Cargando datos de criptomonedas...
          </p>
        </div>
      );
}
export default Spinner;