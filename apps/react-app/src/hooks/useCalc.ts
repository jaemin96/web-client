import { useCallback, useMemo, useState } from "react";

type Operator = "+" | "-" | "*" | "/";

type CalcState = {
  display: string;
  operator: Operator | null;
  handleDigit: (digit: string) => void;
  handleDot: () => void;
  handleOperator: (nextOperator: Operator) => void;
  handleEquals: () => void;
  handleClear: () => void;
  handleBackspace: () => void;
};

const MAX_DECIMALS = 12;

function formatNumber(value: number) {
  if (!Number.isFinite(value)) {
    return "Error";
  }
  const rounded = Math.round(value * 10 ** MAX_DECIMALS) / 10 ** MAX_DECIMALS;
  return rounded.toString();
}

function compute(left: number, right: number, operator: Operator) {
  switch (operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      if (right === 0) return Number.NaN;
      return left / right;
    default:
      return right;
  }
}

export default function useCalc(): CalcState {
  const [display, setDisplay] = useState("0");
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = useCallback((digit: string) => {
    setDisplay((current) => {
      if (waitingForOperand) {
        setWaitingForOperand(false);
        return digit;
      }
      if (current === "0") {
        return digit;
      }
      return current + digit;
    });
  }, [waitingForOperand]);

  const inputDot = useCallback(() => {
    setDisplay((current) => {
      if (waitingForOperand) {
        setWaitingForOperand(false);
        return "0.";
      }
      if (current.includes(".")) {
        return current;
      }
      return current + ".";
    });
  }, [waitingForOperand]);

  const clearAll = useCallback(() => {
    setDisplay("0");
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  }, []);

  const backspace = useCallback(() => {
    if (waitingForOperand) {
      return;
    }
    setDisplay((current) => {
      if (current.length === 1) {
        return "0";
      }
      return current.slice(0, -1);
    });
  }, [waitingForOperand]);

  const setOperation = useCallback((nextOperator: Operator) => {
    const inputValue = Number.parseFloat(display);
    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const computed = compute(prevValue, inputValue, operator);
      const formatted = formatNumber(computed);
      setDisplay(formatted);
      if (formatted === "Error") {
        setPrevValue(null);
        setOperator(null);
        setWaitingForOperand(true);
        return;
      }
      setPrevValue(Number.parseFloat(formatted));
    }
    setWaitingForOperand(true);
    setOperator(nextOperator);
  }, [display, operator, prevValue]);

  const equals = useCallback(() => {
    if (!operator || prevValue === null) {
      return;
    }
    const inputValue = Number.parseFloat(display);
    const computed = compute(prevValue, inputValue, operator);
    const formatted = formatNumber(computed);
    setDisplay(formatted);
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  }, [display, operator, prevValue]);

  return useMemo(() => ({
    display,
    operator,
    handleDigit: inputDigit,
    handleDot: inputDot,
    handleOperator: setOperation,
    handleEquals: equals,
    handleClear: clearAll,
    handleBackspace: backspace,
  }), [backspace, clearAll, display, equals, inputDigit, inputDot, operator, setOperation]);
}
