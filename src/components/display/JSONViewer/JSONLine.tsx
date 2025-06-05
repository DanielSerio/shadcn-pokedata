import type { JSONLineProps } from "./props";

export function JSONLine({ line }: JSONLineProps) {
  return <pre>{line}</pre>;
}
