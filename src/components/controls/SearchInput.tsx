import { forwardRef, type AreaHTMLAttributes, type ForwardedRef } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export interface SearchInputProps
  extends Omit<AreaHTMLAttributes<HTMLInputElement>, "type"> {
  containerClassName?: string;
  placeholder?: string;
  value?: string;
}

function SearchInputComponent(
  { containerClassName, ...props }: SearchInputProps,
  ref?: ForwardedRef<HTMLInputElement>
) {
  const containerClassNames = ["block", containerClassName];

  return (
    <div className={cn(containerClassNames)}>
      <Input type="search" {...props} ref={ref} />
    </div>
  );
}

export const SearchInput = forwardRef(SearchInputComponent);
