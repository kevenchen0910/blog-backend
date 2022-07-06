export function omit<T = any, K extends string | number | symbol = keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  const res = {} as Omit<T, K>;

  Object.entries(obj).forEach(([key, value]) => {
    if (!keys.includes(key as K)) {
      res[key as Exclude<keyof T, K>] = value;
    }
  });

  return res;
}
