# `Result<T, E>`

This container represents an optional value. You can create a `Result<T, E>` by calling either of the following constructors:

- `Ok('Hello world')`
- `Err('Failure')`

### Methods and variables

- [Result.ok, Result.result and Result.error](##resultok-resultresult-and-resulterror)
- [Result.map()](#resultmap)
- [Result.unwrap()](#resultunwrap)
- [Result.unwrapOr()](#resultunwrapor)
- [Result.unwrapOr()](#resultunwrapor)

## Result.ok, Result.result and Result.error

`TODO`

## Result.map()

Map `Result<T, E>` into a new `Result<U, E>`.

- `.map()` is used to continue work on results, regardless of if they contain an error or a result.

### Example

```typescript
const helloWorld = new Ok("Hello world");

// Converts Ok("Hello world") → Ok(11)
const helloWorldLength = helloWorld.map(helloStr => helloStr.length);

// Outputs 'Ok(11)'
console.log(helloWorldLength);
```

## Result.unwrap()

Returns the success value `T` of `Result<T, E>`. Throws if result is an error.

In general, because this function may throw, use of [.unwrap()](#resultunwrap) use is discouraged. Instead, prefer to use an if statment and check [.ok](#resultok) and handle the `Err` case explicitly.

- `.unwrap()` can be used when you are sure that `Result` is successful. Use at own risk.
- `.unwrap()` can be used when writing prototypes of software and then refactored later into proper error handling.

### Example

```typescript
const helloWorld = new Ok("Hello world");

// Outputs 'Hello world'
console.log(helloWorld.unwrap());
```

## Result.unwrapOr()

Returns the success value `T` of `Result<T, E>` if any, otherwise a default value.

### Example

```typescript
const helloWorld = new Ok("Hello World");
const error = new Err("Failure");

// Outputs 'Hello World'
console.log(helloWorld.unwrapOr("Hello Vertical"));

// Outputs 'Hello Vertical'
console.log(error.unwrapOr("Hello Vertical"));
```

## Result.asOption()

Discards the error value of `Result<T, E>` and return `Option<T>`.

- `.asOption()` is useful if you don't care about the error value and want to simplify to `Option<T>`

### Example

```typescript
const helloWorld = new Ok("Hello World");
const error = new Err("Failure");

// Outputs 'Some("Hello World")'
console.log(helloWorld.asOption());

// Outputs 'None()'
console.log(error.asOption());
```

## Full example

```javascript
import { Result, Ok, Err } from "containers-ts";

function toNumber(s: string): Result<number, string> {
  const number = Number(s);
  if (isNaN(number)) {
    return new Err("String does not contain a number");
  }
  return new Ok(number);
}

function addToString(s: string, n: number): Result<string, string> {
  return toNumber("4").map(n => String(n + 1));
}

// Outputs: Ok("8")
console.log(addToString("4", 4));

// Outputs: Err("String does not contain a number")
console.log(addToString("Vertical Strategy", 4));
```
