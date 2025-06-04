import { useEffect, useState } from "react";

let timeout: NodeJS.Timeout;

export function useDebounced<T>(value: T, time: number = 500) {
  const [val, setVal] = useState<T>(value);

  useEffect(() => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      setVal(value);
    }, time);
  }, [value]);

  return val;
}
