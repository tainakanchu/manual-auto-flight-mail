export const valueFromAny = (
  source: unknown,
  property: string
): object | string | null => {
  if (!isObject(source)) {
    return null;
  }

  const value = (source as any)[property];

  if (typeof value === "undefined") {
    return null;
  }

  return value;
};

export const isObject = (source: unknown): source is object => {
  return Object.prototype.toString.call(source) === "[object Object]";
};
