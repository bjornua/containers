import * as Result from "./option";

interface OptionInterface<T> {
  /**
   * `true` if `.value` exists
   * `false` if there is not `.value`
   *
   * This can be used to safely check if there is a value
   * before proceding.
   *
   * ```
// Here we have no `result.value`
if (!result.some) {
  return 'No value'
}
// Now the compiler knows that `result.value` must exist
console.log(result.value)
```
   */
  readonly some: boolean;

  /**
   * Maps an `Option<T>` to `Option<U>` by applying a function to a contained value.
   */
  /**
   * If there is a value, map that value with `f`
   * and return an Option with the new value.
   *
   * @param f A function that takes the value and maps it to a new value
   *
   */
  map<U>(f: (r: T) => U): Option<U>;

  /**
   *
   * @param f
   */
  and<U>(f: (r: T) => Option<U>): Option<U>;
  unwrap(): T;
  unwrapOr(defaultValue: T): T;
}

/**
 * Some value `T`
 */
export class Some<T> implements OptionInterface<T> {
  public readonly some: true = true;

  /**
   * The value `T` contained in this Option
   */
  value: T;
  /**
   * Create a new Option containing `value`
   */
  constructor(value: T) {
    this.value = value;
  }
  map<U>(f: (r: T) => U): Option<U> {
    return new Some(f(this.value));
  }
  and<U>(f: (r: T) => Option<U>): Option<U> {
    return f(this.value);
  }
  unwrap() {
    return this.value;
  }
  unwrapOr(defaultValue: T) {
    return this.value;
  }
}

/**
 * No value
 */
export class None<T> implements OptionInterface<T> {
  public readonly some: false = false;

  constructor() {}
  map<U>(f: (r: T) => U): Option<U> {
    return new None();
  }
  and<U>(f: (r: T) => Option<U>): Option<U> {
    return new None();
  }
  unwrap(): never {
    throw new Error("Tried to unwrap None");
  }
  unwrapOr(defaultValue: T) {
    return defaultValue;
  }
}

/**
 * `Option<T>` represents an optional value.
 * `Option` can either be `Some<T>` and contain a value
 * or the opposite None<T> and not contain a value.
 */
export type Option<T> = Some<T> | None<T>;
