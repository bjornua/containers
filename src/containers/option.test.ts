import * as test from "tape";
import { Option, Some, None } from "./option";

test("Option.some", t => {
  const none: Option<number> = new None();
  const some: Option<number> = new Some(4);

  t.equal(none.some, false, "None.some should equal false");
  t.equal(some.some, true, "Some.some should equal true");
  t.end();
});

function lol(t: Option<number>) {
  console.log(t.some);
}

test("Option.map()", t => {
  const none: Option<number> = new None();
  const some: Option<number> = new Some(4);

  const add4 = (value: number) => value + 4;
  const toString = (value: number) => String(value);

  const noneNewValue = none.map(add4);
  const someNewValue = some.map(add4);

  t.ok(noneNewValue instanceof None, "None.map() should return None");
  t.ok(none instanceof None, "None.map() should not mutate");

  t.ok(someNewValue instanceof Some, "Some.map() should return Some");
  const someNewValueString = some.map(toString);
  t.equal(someNewValue.unwrap(), 8, "Some.map() should apply function");
  t.equal(
    someNewValueString.unwrap(),
    "4",
    "Some.map() should be able to map to a different type"
  );
  t.equal(some.unwrap(), 4, "Some.map() should not mutate");
  t.end();
});

test("Option.unwrap()", t => {
  const none: Option<number> = new None();
  const some: Option<number> = new Some(4);

  t.throws(() => none.unwrap(), "None.unwrap() should throw");
  t.equal(some.unwrap(), 4, "Some(4).unwrap() should equal 4");
  t.end();
});

test("Option.unwrapOr()", t => {
  const none: Option<number> = new None();
  const some: Option<number> = new Some(4);

  t.equal(none.unwrapOr(8), 8, "None.unwrapOr() should return default");
  t.equal(some.unwrapOr(8), 4, "Some(4).unwrapOr() should return value");
  t.end();
});

test("Option.and()", t => {
  const none: Option<number> = new None();
  const some: Option<number> = new Some(4);
  const toString = (n: number): Option<string> => new Some(String(n));
  const returnNone = (n: number): Option<string> => new None();

  t.equal(none.and(toString).some, false, "None.and() should return None");
  t.equal(none.and(returnNone).some, false, "None.and() should return None");
  t.equal(
    some.and(toString).unwrap(),
    "4",
    "Some.and(() => Some) should return new Some()"
  );
  t.equal(some.and(returnNone).some, false, "Some.and(() => None) return None");
  t.end();
});
