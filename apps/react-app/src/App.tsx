import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CalcPage from "./pages/CalcPage";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0b0f1a] via-[#161b2a] to-[#0a1222]">
      <header className="flex justify-center pt-6 px-4">
        <Link
          to="/"
          className="font-mono tracking-[0.4rem] font-bold text-[#fff4d6] bg-[#1c222f]/80 px-[18px] py-2 rounded-full border border-white/20 shadow-[0_10px_28px_rgba(0,0,0,0.25)] no-underline hover:bg-[#1c222f] transition-colors"
        >
          CALCULATOR
        </Link>
      </header>
      <main className="flex-1 grid place-items-center p-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calculator" element={<CalcPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
