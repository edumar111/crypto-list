// export default function App() {
//   return (
//     <div className="App">
//       <h1>Hola Mundo</h1>
//     </div>
//   );
// }

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layaout from "./components/Layout";
import CoinsContainer from "./components/CoinsContainer";
import NotFound from "./components/NotFound";
import WatchlistContainer from "./components/WatchlistContainer";
import CoinContainer from "./components/CoinContainer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";




const App = () => {

  return (
 
      <BrowserRouter>
        <Routes> 
            <Route path="/" element={<Layaout />} >
              <Route index element={<CoinsContainer />} />
              <Route path="watchList" element={<WatchlistContainer />} ></Route>
              <Route path="coin/:id" element={<CoinContainer />} ></Route>
              <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </BrowserRouter>
   
  );
}

export default App;