export function mapObjectValues
  <Type, Mapped, Value extends Record<string, Type>>
  (
    obj: Value,
    getValue: <Key extends keyof Value>(val: Value[Key]) => Mapped
  ): Record<keyof Value, Mapped> {
  const mapped = {} as Record<keyof Value, Mapped>;

  for (const key in obj) {
    mapped[key] = getValue(obj[key]);
  }

  return mapped;
}