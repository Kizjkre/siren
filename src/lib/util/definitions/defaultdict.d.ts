interface DefaultDict<T> {
  [key: string]: T;
}

type DefaultDictInit = <T>(defaultInit: T) => DefaultDict<T>;
