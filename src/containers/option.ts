import * as Result from "./option";

interface OptionInterface<T> {
  readonly some: boolean;

  map<U>(f: (r: T) => U): Option<U>;
  and<U>(f: (r: T) => Option<U>): Option<U>;
  unwrap(): T;
  unwrapOr(defaultValue: T): T;
}

export class Some<T> implements OptionInterface<T> {
  public readonly some: true = true;

  value: T;
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

export type Option<T> = Some<T> | None<T>;
