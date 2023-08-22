// REF: https://stackoverflow.com/a/44622467
const defaultdict: <T>(defaultInit: T) => DefaultDict<T> = <T>(defaultInit: T): DefaultDict<T> =>
  new Proxy<{}>({}, {
    get: (target: { [key: string]: T }, name: string): T =>
      name in target ?
        target[name] :
        (
          target[name] = typeof defaultInit !== 'function' ?
            defaultInit :
            defaultInit().valueOf()
        )
  });

export default defaultdict;
