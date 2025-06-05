import { JSONLine } from "./JSONLine";
import type { JSONViewerProps } from "./props";

export function JSONViewer<JSONType extends object>({
  json,
}: JSONViewerProps<JSONType>) {
  const lines = JSON.stringify(json, null, 2).split(/\n/g);

  if (!lines.length) {
    return <>Nothing to see</>;
  }

  return (
    <div className="flex flex-col flex-1 overflow-y-auto max-h-[100svh] w-full border-1">
      {lines.map((line) => (
        <JSONLine key={encodeURIComponent(line)} line={line} />
      ))}
    </div>
  );
}
