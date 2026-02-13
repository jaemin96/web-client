import useCalc from "../hooks/useCalc";

const DIGITS = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  ["0"],
];

export default function CalcPage() {
  const {
    display,
    operator,
    handleDigit,
    handleDot,
    handleOperator,
    handleEquals,
    handleClear,
    handleBackspace,
  } = useCalc();

  return (
    <section className="w-full grid place-items-center">
      <div className="w-full max-w-[420px] sm:w-[90vw] p-6 rounded-[28px] bg-gradient-to-br from-[#1c222f] to-[#121826] border border-[#2b3446] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),0_24px_60px_rgba(4,8,16,0.65)]">
        <div className="flex justify-between items-center text-white/70 text-xs uppercase tracking-[0.2rem] mb-[18px]">
          <div className="font-bold">MK-02</div>
          <div>READY</div>
        </div>
        <div
          className="h-[72px] rounded-2xl bg-gradient-to-br from-[#0f1a14] to-[#1b2a23] text-[#d5f6c7] flex items-center justify-between px-[18px] font-mono text-[2rem] tracking-[0.08rem] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
          aria-live="polite"
        >
          <span className="opacity-60 text-xl min-w-4">{operator ?? " "}</span>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">{display}</span>
        </div>
        <div className="mt-5 grid grid-cols-4 gap-3">
          <button
            className="p-[14px] rounded-[14px] border-none bg-[#e7c0c0] text-[#2f2a24] text-xl font-bold shadow-[0_6px_0_#d8a7a7] cursor-pointer transition-all duration-[120ms] active:translate-y-1 active:shadow-[0_2px_0_#d8a7a7]"
            onClick={handleClear}
          >
            C
          </button>
          <button
            className="p-[14px] rounded-[14px] border-none bg-[#e7c0c0] text-[#2f2a24] text-xl font-bold shadow-[0_6px_0_#d8a7a7] cursor-pointer transition-all duration-[120ms] active:translate-y-1 active:shadow-[0_2px_0_#d8a7a7]"
            onClick={handleBackspace}
          >
            DEL
          </button>
          <button
            className="p-[14px] rounded-[14px] border-none bg-[#f0d7b6] text-[#2f2a24] text-xl font-bold shadow-[0_6px_0_#d8d2c7] cursor-pointer transition-all duration-[120ms] active:translate-y-1 active:shadow-[0_2px_0_#d8d2c7]"
            onClick={() => handleOperator("/")}
          >
            ÷
          </button>
          <button
            className="p-[14px] rounded-[14px] border-none bg-[#f0d7b6] text-[#2f2a24] text-xl font-bold shadow-[0_6px_0_#d8d2c7] cursor-pointer transition-all duration-[120ms] active:translate-y-1 active:shadow-[0_2px_0_#d8d2c7]"
            onClick={() => handleOperator("*")}
          >
            ×
          </button>

          {DIGITS.slice(0, 1).flat().map((digit) => (
            <button
              key={digit}
              className="p-[14px] rounded-[14px] border-none bg-[#f5f1ea] text-[#2f2a24] text-xl font-bold shadow-[0_6px_0_#d8d2c7] cursor-pointer transition-all duration-[120ms] active:translate-y-1 active:shadow-[0_2px_0_#d8d2c7]"
              onClick={() => handleDigit(digit)}
            >
              {digit}
            </button>
          ))}
          <button
            className="p-[14px] rounded-[14px] border-none bg-[#f0d7b6] text-[#2f2a24] text-xl font-bold shadow-[0_6px_0_#d8d2c7] cursor-pointer transition-all duration-[120ms] active:translate-y-1 active:shadow-[0_2px_0_#d8d2c7]"
            onClick={() => handleOperator("-")}
          >
            −
          </button>

          {DIGITS.slice(1, 2).flat().map((digit) => (
            <button
              key={digit}
              className="p-[14px] rounded-[14px] border-none bg-[#f5f1ea] text-[#2f2a24] text-xl font-bold shadow-[0_6px_0_#d8d2c7] cursor-pointer transition-all duration-[120ms] active:translate-y-1 active:shadow-[0_2px_0_#d8d2c7]"
              onClick={() => handleDigit(digit)}
            >
              {digit}
            </button>
          ))}
          <button
            className="p-[14px] rounded-[14px] border-none bg-[#f0d7b6] text-[#2f2a24] text-xl font-bold shadow-[0_6px_0_#d8d2c7] cursor-pointer transition-all duration-[120ms] active:translate-y-1 active:shadow-[0_2px_0_#d8d2c7]"
            onClick={() => handleOperator("+")}
          >
            +
          </button>

          {DIGITS.slice(2, 3).flat().map((digit) => (
            <button
              key={digit}
              className="p-[14px] rounded-[14px] border-none bg-[#f5f1ea] text-[#2f2a24] text-xl font-bold shadow-[0_6px_0_#d8d2c7] cursor-pointer transition-all duration-[120ms] active:translate-y-1 active:shadow-[0_2px_0_#d8d2c7]"
              onClick={() => handleDigit(digit)}
            >
              {digit}
            </button>
          ))}
          <button
            className="p-[14px] rounded-[14px] border-none row-span-2 bg-gradient-to-br from-[#ffbf69] to-[#ff7a3d] text-[#2c1404] text-xl font-bold shadow-[0_8px_0_rgba(109,50,16,0.5)] cursor-pointer transition-all duration-[120ms] active:translate-y-1 active:shadow-[0_2px_0_rgba(109,50,16,0.5)]"
            onClick={handleEquals}
          >
            =
          </button>

          <button
            className="p-[14px] rounded-[14px] border-none col-span-2 bg-[#f5f1ea] text-[#2f2a24] text-xl font-bold shadow-[0_6px_0_#d8d2c7] cursor-pointer transition-all duration-[120ms] active:translate-y-1 active:shadow-[0_2px_0_#d8d2c7]"
            onClick={() => handleDigit("0")}
          >
            0
          </button>
          <button
            className="p-[14px] rounded-[14px] border-none bg-[#f5f1ea] text-[#2f2a24] text-xl font-bold shadow-[0_6px_0_#d8d2c7] cursor-pointer transition-all duration-[120ms] active:translate-y-1 active:shadow-[0_2px_0_#d8d2c7]"
            onClick={handleDot}
          >
            .
          </button>
        </div>
      </div>
    </section>
  );
}
