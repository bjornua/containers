### `Result<T, E>`

This container represent the result of an operation that can fail. You can create a `Result<T, E>` by calling either of the following constructors:

- `Ok('Hello world')`
- `Err('Error value')`

You can map optional values into new values:

```typescript
import { Option } from "containers";

const helloWorld = new Some("Hello world");
const helloWorldLength = helloWorld.map(helloStr => helloStr.length);

console.log(helloWorldLength); // Will output 'Some()'
```

Checkout the full documentation for [`Option<T>`](docs/option.md) here:
