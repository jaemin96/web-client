import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="max-w-[480px] p-8 rounded-3xl bg-[#0c101a]/90 text-[#f7f4ee] text-center border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
      <h1 className="text-4xl mb-3">Welcome</h1>
      <p className="text-white/80 mb-6">
        A simple calculator application built with React and Tailwind CSS
      </p>
      <Link
        to="/calculator"
        className="inline-block px-[18px] py-[10px] rounded-xl bg-[#ffbf69] text-[#2b1d10] font-bold no-underline shadow-[0_10px_20px_rgba(255,122,61,0.35)] hover:bg-[#ff7a3d] transition-colors"
      >
        Open Calculator
      </Link>
    </div>
  );
}
