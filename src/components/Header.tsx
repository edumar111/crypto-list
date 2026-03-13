import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white px-6 py-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-blue-400 transition-colors">  
          <span className="text-blue-400" >Crypto</span> App
          </Link>
        </div>
        
        {/* Menu */}
        <nav className="flex gap-6">
          <Link to="/" className="hover:text-blue-400 transition-colors">
            Overview
          </Link>
          <Link to="/watchlist" className="hover:text-blue-400 transition-colors">
            Watchlist
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;