
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layaout = () => {
  return (
     <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Lista de Criptomonedas</h1>
        
        <Outlet />
          
        
      </main>
    </div>
  );
};

export default Layaout;