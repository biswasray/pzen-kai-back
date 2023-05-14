import slugid from "slugid";
export function slug(...names: string[]) {
  const randomText = slugid.nice();
  let i = 3;
  return [...names.map((str) => str.substring(0, i--)), randomText].join("-");
}

export function excludeProp<T extends object, K extends keyof T>(
  obj: T,
  prop: K,
): Omit<T, K> {
  const { [prop]: _, ...result } = obj;
  _;
  return result;
}

export function excludeProps<T extends object, K extends keyof T>(
  obj: T,
  ...props: K[]
): Omit<T, K> {
  if (props.length === 0) return obj;
  const [f, ...rest] = props;
  const data = excludeProp(obj, f);
  return excludeProps(data, ...(rest as Exclude<K, K>[])) as Omit<T, K>;
}
