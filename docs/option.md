# `Option<T>`

This container represents an optional value. You can create a `Option<T>` by calling either of the following constructors:

- `Some('Hello world')`
- `None()`

### Methods

- [Option.some](#optionsome)
- [Option.value](#optionvalue)
- [Option.map()](#optionmap)
- [Option.and()](#optionand)
- [Option.unwrap()](#optionunwrap)
- [Option.unwrapOr()](#optionunwrapor)

### Full example

```javascript
import { Option, Some, None } from "containers-ts";

function toNumber(s: string): Option<number> {
  const number = Number(s);
  if (isNaN(number)) {
    return new None();
  }
  return new Some(number);
}

function addToString(s: string, n: number): Option<string> {
  return toNumber("4").map(n => String(n + 1));
}

console.log(addToString("4", 4));
// Outputs: Some("8")

console.log(addToString("Vertical Strategy", 4));
// Outputs: None
```

## Option.map()

Map `Option<T>` into a new `Option<U>`.

- [.map()](#optionmap) is used to continue work on references that may point to a value or not

### Example

```typescript
const helloWorld = new Some("Hello world");

// Converts Some("Hello world") → Some(11)
const helloWorldLength = helloWorld.map(helloStr => helloStr.length);

// Outputs 'Some(11)'
console.log(helloWorldLength);
```

## Option.and()

Combine `Option<T>` with another `Option<U>` to create `Option<U>`.

- [.and()](#optionand) is similar to [.map()](#optionmap)
- [.and()](#optionand) is useful for when you are combining many `Option` types.

### Example

```typescript
const helloWorld = new Some("Hello world");

// Converts Some("Hello world") → Some(11)
const helloWorldLength = helloWorld.and(helloStr => new Some(helloStr.length));

// Outputs 'Some(11)'
console.log(helloWorldLength);
```

## Option.unwrap()

Returns the internal value of `Option<T>`. Throws if there is no value.

In general, because this function may throw, use of [.unwrap()](#optionunwrap) use is discouraged. Instead, prefer to use an if statment and check [.some](#optionsome) and handle the `None` case explicitly.

- [.unwrap()](#optionunwrap) can be used when an `Option` is guaranteed to hold a value.
- [.unwrap()](#optionunwrap) can be used when writing first versions of software and refactored later

### Example:

```typescript
const helloWorld = new Some("Hello world");

// Outputs 'Hello world'
console.log(helloWorld.unwrap());
```

## Option.unwrapOr(default)

Returns the internal value of `Option<T>` if any, otherwise a default value.

### Example

```typescript
const helloWorld = new Some("Hello world");

// Outputs 'Some("Hello world")'
console.log(helloWorld);

// Outputs 'Hello world'
console.log(helloWorld.unwrap());
```
