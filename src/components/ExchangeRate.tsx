import { useState, useMemo } from "react";
import { ArrowRightLeft, ChevronDown } from "lucide-react";
import { cn } from "./ui/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface ExchangeRateProps {
  rates?: Record<string, number>;
}

export function ExchangeRate({ rates = { TWD: 1, KRW: 0.024, JPY: 0.215, USD: 31.5, EUR: 34.2 } }: ExchangeRateProps) {
  const [amount, setAmount] = useState("1000");
  const [sourceCurrency, setSourceCurrency] = useState("KRW");
  const [targetCurrency, setTargetCurrency] = useState("TWD");

  const availableCurrencies = Object.keys(rates);

  // Calculate rate between source and target
  // rates are all relative to TWD (1 unit = X TWD)
  // So Source -> TWD is rates[source]
  // Target -> TWD is rates[target]
  // Source -> Target = rates[source] / rates[target]
  const currentRate = useMemo(() => {
    const sourceRate = rates[sourceCurrency] || 1;
    const targetRate = rates[targetCurrency] || 1;
    return sourceRate / targetRate;
  }, [rates, sourceCurrency, targetCurrency]);
  
  const calculateResult = (val: string) => {
    const num = parseFloat(val.replace(/,/g, ''));
    if (isNaN(num)) return "0";
    return (num * currentRate).toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  const handleSwap = () => {
    setSourceCurrency(targetCurrency);
    setTargetCurrency(sourceCurrency);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and decimals
    const val = e.target.value;
    if (/^\d*\.?\d*$/.test(val)) {
      setAmount(val);
    }
  };

  return (
    <div className="px-4">
      <h2 className="text-lg font-bold text-gray-900 mb-3">匯率換算計算機</h2>
      <div className="flex items-center gap-2">
        {/* Source Currency (Input) */}
        <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm relative overflow-hidden group hover:border-gray-300 transition-colors focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-200">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center mb-1">
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <button className="flex items-center gap-1 text-xs font-bold text-gray-600 hover:text-black bg-gray-50 px-2 py-1 rounded-lg transition-colors">
                        {sourceCurrency} <ChevronDown size={12} />
                     </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     {availableCurrencies.map(cur => (
                        <DropdownMenuItem key={cur} onClick={() => setSourceCurrency(cur)}>
                           {cur}
                        </DropdownMenuItem>
                     ))}
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={handleInputChange}
              className="text-2xl font-bold text-gray-900 w-full bg-transparent outline-none placeholder:text-gray-300"
              placeholder="0"
            />
          </div>
        </div>

        {/* Exchange Icon */}
        <button 
          onClick={handleSwap}
          className="shrink-0 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 shadow-sm border border-gray-100 active:scale-95 transition-transform hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
        >
          <ArrowRightLeft size={16} />
        </button>

        {/* Target Currency (Output) */}
        <div className="flex-1 bg-indigo-50 border border-indigo-100 rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center mb-1">
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <button className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-100/50 px-2 py-1 rounded-lg transition-colors">
                        {targetCurrency} <ChevronDown size={12} />
                     </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     {availableCurrencies.map(cur => (
                        <DropdownMenuItem key={cur} onClick={() => setTargetCurrency(cur)}>
                           {cur}
                        </DropdownMenuItem>
                     ))}
                  </DropdownMenuContent>
               </DropdownMenu>
               <span className="text-[10px] text-indigo-400 font-mono">x {currentRate.toFixed(4)}</span>
            </div>
            <div className="text-2xl font-bold text-indigo-900 truncate">
              {calculateResult(amount)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
