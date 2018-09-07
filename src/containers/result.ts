import * as Option from "./option";

export class Ok<R, E> {
  readonly ok = true;
  readonly result: R;

  constructor(result: R) {
    this.result = result;
  }
  map<T>(f: (r: R) => T): Result<T, E> {
    return new Ok(f(this.result));
  }
  and<T>(f: (r: R) => Result<T, E>): Result<T, E> {
    return f(this.result);
  }
  unwrap(): R {
    return this.result;
  }
  unwrapOr<T>(defaultValue: T): R | T {
    return this.result;
  }
  asOption(): Option.Some<R> {
    return new Option.Some(this.result);
  }
}

export class Err<R, E> {
  readonly ok = false;
  readonly error: E;

  constructor(e: E) {
    this.error = e;
  }
  map<T>(f: (r: R) => T): Result<T, E> {
    return new Err(this.error);
  }
  and<T>(f: (r: R) => Result<T, E>): Result<T, E> {
    return new Err(this.error);
  }
  unwrap(): R {
    throw new Error("Tried to unwrap error result");
  }
  unwrapOr<T>(defaultValue: T): R | T {
    return defaultValue;
  }
  asOption(): Option.None<R> {
    return new Option.None();
  }
}

export type Result<R, E> = Ok<R, E> | Err<R, E>;
