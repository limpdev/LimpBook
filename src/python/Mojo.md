# Mojo language basics

This page provides an overview of the Mojo language.

If you know Python, then a lot of Mojo code will look familiar. However, Mojo incorporates features like static type checking, memory safety, next-generation compiler technologies, and more. As such, Mojo also has a lot in common with languages like C++ and Rust.

If you prefer to learn by doing, follow the [Get started with Mojo](get-started.html) tutorial. You'll install the [Magic](https://docs.modular.com/magic) CLI, create a Mojo project and write your first Mojo program.

On this page, we'll introduce the essential Mojo syntax, so you can start coding quickly and understand other Mojo code you encounter. Subsequent sections in the Mojo Manual dive deeper into these topics, and links are provided below as appropriate.

Let's get started! 🔥

Mojo is a young language and there are many [features still missing](https://docs.modular.com/mojo/roadmap). As such, Mojo is currently **not** meant for beginners. Even this basics section assumes some programming experience. However, throughout the Mojo Manual, we try not to assume experience with any particular language.

## Hello world[​](basics.html#hello-world "Direct link to Hello world")

Here's the traditional "Hello world" program in Mojo:

```mojo
def main():
    print("Hello, world!")
```

```mojo
def main():
    print("Hello, world!")
```

Every Mojo program must include a function named `main()` as the entry point. We'll talk more about functions soon, but for now it's enough to know that you can write `def main():` followed by an indented function body.

The `print()` statement does what you'd expect, printing its arguments to the standard output.

## Variables[​](basics.html#variables "Direct link to Variables")

In Mojo, you can declare a variable by simply assigning a value to a new named variable:

```mojo
def main():
    x = 10
    y = x * x
    print(y)
```

```mojo
def main():
    x = 10
    y = x * x
    print(y)
```

You can also *explicitly* declare variables with the `var` keyword:

```mojo
var x = 10
```

```mojo
var x = 10
```

When declaring a variable with `var`, you can also declare a variable type, with or without an assignment:

```mojo
def main():
    var x: Int = 10
    var sum: Int
    sum = x + x
```

```mojo
def main():
    var x: Int = 10
    var sum: Int
    sum = x + x
```

Both implicitly declared and explicitly declared variables are statically typed: that is, the type is set at compile time, and doesn't change at runtime. If you don't specify a type, Mojo uses the type of the first value assigned to the variable.

```mojo
x = 10
x = "Foo" # Error: Cannot convert "StringLiteral" value to "Int"
```

```mojo
x = 10
x = "Foo" # Error: Cannot convert "StringLiteral" value to "Int"
```

For more details, see the page about [variables](variables.html).

## Blocks and statements[​](basics.html#blocks-and-statements "Direct link to Blocks and statements")

Code blocks such as functions, conditions, and loops are defined with a colon followed by indented lines. For example:

```mojo
def loop():
    for x in range(5):
        if x % 2 == 0:
            print(x)
```

```mojo
def loop():
    for x in range(5):
        if x % 2 == 0:
            print(x)
```

You can use any number of spaces or tabs for your indentation (we prefer 4 spaces).

All code statements in Mojo end with a newline. However, statements can span multiple lines if you indent the following lines. For example, this long string spans two lines:

```mojo
def print_line():
    long_text = "This is a long line of text that is a lot easier to read if"
                " it is broken up across two lines instead of one long line."
    print(long_text)
```

```mojo
def print_line():
    long_text = "This is a long line of text that is a lot easier to read if"
                " it is broken up across two lines instead of one long line."
    print(long_text)
```

And you can chain function calls across lines:

```mojo
def print_hello():
    text = String(",")
          .join("Hello", " world!")
    print(text)
```

```mojo
def print_hello():
    text = String(",")
          .join("Hello", " world!")
    print(text)
```

For more information on loops and conditional statements, see [Control flow](control-flow.html).

## Functions[​](basics.html#functions "Direct link to Functions")

Mojo functions can be declared with either the `def` or `fn` keyword.

There are only a few differences between the two styles. For example, the following function works with either `def` or `fn`:

```mojo
def greet(name: String) -> String:
    return "Hello, " + name + "!"
```

```mojo
def greet(name: String) -> String:
    return "Hello, " + name + "!"
```

The `fn` declaration has a few restrictions that a `def` declaration doesn't:

- The argument type and return types are *optional* in a `def` function but required in a `fn` function. So the previous function could also be written as:

  ```mojo
  def greet(name):
      return "Hello, " + name + "!"
  ```

  ```mojo
  def greet(name):
      return "Hello, " + name + "!"
  ```

  Generally, specifying types is good practice, so most examples in this manual include types, regardless of whether they're declared with `def` or `fn`.
- If an `fn` function can raise an error, it needs to be declared with the `raises` keyword:

  ```mojo
  fn greet(name: String) raises:
      if (name == ""):
          raise Error("Name is empty")
      return "Hello, " + name + "!"
  ```

  ```mojo
  fn greet(name: String) raises:
      if (name == ""):
          raise Error("Name is empty")
      return "Hello, " + name + "!"
  ```

  Any `def` function can raise an error.

If you don't specify a type for an argument or return value, it's assigned the `object` type, a special type that can represent different types of values. This allows for some runtime dynamism, but also means that the function might fail at runtime if it receives the wrong type.

For more details, see the page about [functions](functions.html).

### Value ownership and argument mutability[​](basics.html#value-ownership-and-argument-mutability "Direct link to Value ownership and argument mutability")

If you're wondering whether function arguments are passed by value or passed by reference, the short answer is: by default, arguments are passed by immutable reference.

The longer short answer is that Mojo allows you to specify for each argument whether it should be passed by value (as `owned`), or whether it should be passed by reference (as `read` for an immutable reference, or as `mut` for a mutable reference).

This feature is entwined with Mojo's value ownership model, which protects you from memory errors by ensuring that only one variable "owns" a value at any given time (but allowing other variables to receive a reference to it). Ownership then ensures that the value is destroyed when the lifetime of the owner ends (and there are no outstanding references).

For a more complete answer, see the section on [value ownership](values/index.html).

## Code comments[​](basics.html#code-comments "Direct link to Code comments")

You can create a one-line comment using the hash `#` symbol:

```mojo
# This is a comment. The Mojo compiler ignores this line.
```

```mojo
# This is a comment. The Mojo compiler ignores this line.
```

Comments may also follow some code:

```mojo
var message = "Hello, World!" # This is also a valid comment
```

```mojo
var message = "Hello, World!" # This is also a valid comment
```

API documentation comments are enclosed in triple quotes. For example:

```mojo
fn print(x: String):
    """Prints a string.

    Args:
        x: The string to print.
    """
    ...
```

```mojo
fn print(x: String):
    """Prints a string.

    Args:
        x: The string to print.
    """
    ...
```

Documenting your code with these kinds of comments (known as "docstrings") is a topic we've yet to fully specify, but you can generate an API reference from docstrings using the [`mojo doc` command](https://docs.modular.com/mojo/cli/doc).

Technically, docstrings aren't *comments*, they're a special use of Mojo's syntax for multi-line string literals. For details, see [String literals](types.html#string-literals) in the page on [Types](types.html).

## Structs[​](basics.html#structs "Direct link to Structs")

You can build high-level abstractions for types (or "objects") as a `struct`.

A `struct` in Mojo is similar to a `class` in Python: they both support methods, fields, operator overloading, decorators for metaprogramming, and so on. However, Mojo structs are completely static—they are bound at compile-time, so they do not allow dynamic dispatch or any runtime changes to the structure. (Mojo will also support Python-style classes in the future.)

For example, here's a basic struct:

```mojo
struct MyPair:
    var first: Int
    var second: Int

    fn __init__(out self, first: Int, second: Int):
        self.first = first
        self.second = second

    fn __copyinit__(out self, existing: Self):
        self.first = existing.first
        self.second = existing.second

    def dump(self):
        print(self.first, self.second)
```

```mojo
struct MyPair:
    var first: Int
    var second: Int

    fn __init__(out self, first: Int, second: Int):
        self.first = first
        self.second = second

    fn __copyinit__(out self, existing: Self):
        self.first = existing.first
        self.second = existing.second

    def dump(self):
        print(self.first, self.second)
```

And here's how you can use it:

```mojo
def use_mypair():
    var mine = MyPair(2, 4)
    mine.dump()
```

```mojo
def use_mypair():
    var mine = MyPair(2, 4)
    mine.dump()
```

Note that some functions are declared with `fn` function, while the `dump()` function is declared with `def`. In general, you can use either form in a struct.

The `MyPair` struct contains two special methods, `__init__()`, the constructor, and `__copyinit__()`, the copy constructor. *Lifecycle methods* like this control how a struct is created, copied, moved, and destroyed.

For most simple types, you don't need to write the lifecycle methods. You can use the `@value` decorator to generate the boilerplate code for you. So the `MyPair` struct can be simplified to this:

```mojo
@value
struct MyPair:
    var first: Int
    var second: Int

    def dump(self):
        print(self.first, self.second)
```

```mojo
@value
struct MyPair:
    var first: Int
    var second: Int

    def dump(self):
        print(self.first, self.second)
```

For more details, see the page about [structs](structs.html).

### Traits[​](basics.html#traits "Direct link to Traits")

A trait is like a template of characteristics for a struct. If you want to create a struct with the characteristics defined in a trait, you must implement each characteristic (such as each method). Each characteristic in a trait is a "requirement" for the struct, and when your struct implements all of the requirements, it's said to "conform" to the trait.

Using traits allows you to write generic functions that can accept any type that conforms to a trait, rather than accept only specific types.

For example, here's how you can create a trait:

```mojo
trait SomeTrait:
    fn required_method(self, x: Int): ...
```

```mojo
trait SomeTrait:
    fn required_method(self, x: Int): ...
```

The three dots following the method signature are Mojo syntax indicating that the method is not implemented.

Here's a struct that conforms to `SomeTrait`:

```mojo
@value
struct SomeStruct(SomeTrait):
    fn required_method(self, x: Int):
        print("hello traits", x)
```

```mojo
@value
struct SomeStruct(SomeTrait):
    fn required_method(self, x: Int):
        print("hello traits", x)
```

Then, here's a function that uses the trait as an argument type (instead of the struct type):

```mojo
fn fun_with_traits[T: SomeTrait](x: T):
    x.required_method(42)

fn use_trait_function():
    var thing = SomeStruct()
    fun_with_traits(thing)
```

```mojo
fn fun_with_traits[T: SomeTrait](x: T):
    x.required_method(42)

fn use_trait_function():
    var thing = SomeStruct()
    fun_with_traits(thing)
```

You'll see traits used in a lot of APIs provided by Mojo's standard library. For example, Mojo's collection types like `List` and `Dict` can store any type that conforms to the `CollectionElement` trait. You can specify the type when you create a collection:

```mojo
my_list = List[Float64]()
```

```mojo
my_list = List[Float64]()
```

You're probably wondering about the square brackets on `fun_with_traits()`. These aren't function *arguments* (which go in parentheses); these are function *parameters*, which we'll explain next.

Without traits, the `x` argument in `fun_with_traits()` would have to declare a specific type that implements `required_method()`, such as `SomeStruct` (but then the function would accept only that type). With traits, the function can accept any type for `x` as long as it conforms to (it "implements") `SomeTrait`. Thus, `fun_with_traits()` is known as a "generic function" because it accepts a *generalized* type instead of a specific type.

For more details, see the page about [traits](traits.html).

## Parameterization[​](basics.html#parameterization "Direct link to Parameterization")

In Mojo, a parameter is a compile-time variable that becomes a runtime constant, and it's declared in square brackets on a function or struct. Parameters allow for compile-time metaprogramming, which means you can generate or modify code at compile time.

Many other languages use "parameter" and "argument" interchangeably, so be aware that when we say things like "parameter" and "parametric function," we're talking about these compile-time parameters. Whereas, a function "argument" is a runtime value that's declared in parentheses.

Parameterization is a complex topic that's covered in much more detail in the [Metaprogramming](parameters.1.html) section, but we want to break the ice just a little bit here. To get you started, let's look at a parametric function:

```mojo
def repeat[count: Int](msg: String):
    @parameter # evaluate the following for loop at compile time
    for i in range(count):
        print(msg)
```

```mojo
def repeat[count: Int](msg: String):
    @parameter # evaluate the following for loop at compile time
    for i in range(count):
        print(msg)
```

This function has one parameter of type `Int` and one argument of type `String`. To call the function, you need to specify both the parameter and the argument:

```mojo
def call_repeat():
    repeat[3]("Hello")
    # Prints "Hello" 3 times
```

```mojo
def call_repeat():
    repeat[3]("Hello")
    # Prints "Hello" 3 times
```

By specifying `count` as a parameter, the Mojo compiler is able to optimize the function because this value is guaranteed to not change at runtime. And the `@parameter` decorator in the code tells the compiler to evaluate the `for` loop at compile time, not runtime.

The compiler effectively generates a unique version of the `repeat()` function that repeats the message only 3 times. This makes the code more performant because there's less to compute at runtime.

Similarly, you can define a struct with parameters, which effectively allows you to define variants of that type at compile-time, depending on the parameter values.

For more detail on parameters, see the section on [Metaprogramming](parameters.1.html).

## Python integration[​](basics.html#python-integration "Direct link to Python integration")

Mojo supports the ability to import Python modules as-is, so you can leverage existing Python code right away.

For example, here's how you can import and use NumPy:

```mojo
from python import Python

def main():
    var np = Python.import_module("numpy")
    var ar = np.arange(15).reshape(3, 5)
    print(ar)
    print(ar.shape)
```

```mojo
from python import Python

def main():
    var np = Python.import_module("numpy")
    var ar = np.arange(15).reshape(3, 5)
    print(ar)
    print(ar.shape)
```

You must have the Python module (such as `numpy`) installed in the environment where you're using Mojo. You can install Python packages into your virtual environment using [Magic](https://docs.modular.com/magic/) or [Conda](https://docs.modular.com/magic/conda).

For more details, see the page on [Python integration](python/index.html).

## Next steps[​](basics.html#next-steps "Direct link to Next steps")

Hopefully this page has given you enough information to start experimenting with Mojo, but this is only touching the surface of what's available in Mojo.

If you're in the mood to read more, continue through each page of this Mojo Manual—the next page from here is [Functions](functions.html).

Otherwise, here are some other resources to check out:

- See [Get started with Mojo](get-started.html) for a hands-on tutorial that will get you up and running with Mojo.
- If you want to experiment with some code, clone [our GitHub repo](https://github.com/modular/max/) to try our code examples:

  ```sh
  git clone https://github.com/modular/max.git
  ```

  ```sh
  git clone https://github.com/modular/max.git
  ```

  ```sh
  cd max/examples/mojo
  ```

  ```sh
  cd max/examples/mojo
  ```
- To see all the available Mojo APIs, check out the [Mojo standard library reference](https://docs.modular.com/mojo/lib).



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fbasics)

- [Hello world](basics.html#hello-world)
- [Variables](basics.html#variables)
- [Blocks and statements](basics.html#blocks-and-statements)
- [Functions](basics.html#functions)

  - [Value ownership and argument mutability](basics.html#value-ownership-and-argument-mutability)
- [Code comments](basics.html#code-comments)
- [Structs](basics.html#structs)

  - [Traits](basics.html#traits)
- [Parameterization](basics.html#parameterization)
- [Python integration](basics.html#python-integration)
- [Next steps](basics.html#next-steps)











Control flow | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



# Control flow

Mojo includes several traditional control flow structures for conditional and repeated execution of code blocks.

## The `if` statement[​](control-flow.html#the-if-statement "Direct link to the-if-statement")

Mojo supports the `if` statement for conditional code execution. With it you can conditionally execute an indented code block if a given [boolean](types.html#booleans) expression evaluates to `True`.

```mojo
temp_celsius = 25
if temp_celsius > 20:
    print("It is warm.")
    print("The temperature is", temp_celsius * 9 / 5 + 32, "Fahrenheit." )
```

```mojo
temp_celsius = 25
if temp_celsius > 20:
    print("It is warm.")
    print("The temperature is", temp_celsius * 9 / 5 + 32, "Fahrenheit." )
```

```output
It is warm.
The temperature is 77.0 Fahrenheit.
```

```output
It is warm.
The temperature is 77.0 Fahrenheit.
```

You can write the entire `if` statement as a single line if all you need to execute conditionally is a single, short statement.

```mojo
temp_celsius = 22
if temp_celsius < 15: print("It is cool.") # Skipped because condition is False
if temp_celsius > 20: print("It is warm.")
```

```mojo
temp_celsius = 22
if temp_celsius < 15: print("It is cool.") # Skipped because condition is False
if temp_celsius > 20: print("It is warm.")
```

```output
It is warm.
```

```output
It is warm.
```

Optionally, an `if` statement can include any number of additional `elif` clauses, each specifying a boolean condition and associated code block to execute if `True`. The conditions are tested in the order given. When a condition evaluates to `True`, the associated code block is executed and no further conditions are tested.

Additionally, an `if` statement can include an optional `else` clause providing a code block to execute if all conditions evaluate to `False`.

```mojo
temp_celsius = 25
if temp_celsius <= 0:
    print("It is freezing.")
elif temp_celsius < 20:
    print("It is cool.")
elif temp_celsius < 30:
    print("It is warm.")
else:
    print("It is hot.")
```

```mojo
temp_celsius = 25
if temp_celsius <= 0:
    print("It is freezing.")
elif temp_celsius < 20:
    print("It is cool.")
elif temp_celsius < 30:
    print("It is warm.")
else:
    print("It is hot.")
```

```output
It is warm.
```

```output
It is warm.
```

TODO

Mojo currently does not support the equivalent of a Python `match` or C `switch` statement for pattern matching and conditional execution.

### Short-circuit evaluation[​](control-flow.html#short-circuit-evaluation "Direct link to Short-circuit evaluation")

Mojo follows [short-circuit evaluation](https://en.wikipedia.org/wiki/Short-circuit_evaluation) semantics for boolean operators. If the first argument to an `or` operator evaluates to `True`, the second argument is not evaluated.

```mojo
def true_func() -> Bool:
    print("Executing true_func")
    return True

def false_func() -> Bool:
    print("Executing false_func")
    return False

print('Short-circuit "or" evaluation')
if true_func() or false_func():
    print("True result")
```

```mojo
def true_func() -> Bool:
    print("Executing true_func")
    return True

def false_func() -> Bool:
    print("Executing false_func")
    return False

print('Short-circuit "or" evaluation')
if true_func() or false_func():
    print("True result")
```

```output
Short-circuit "or" evaluation
Executing true_func
True result
```

```output
Short-circuit "or" evaluation
Executing true_func
True result
```

If the first argument to an `and` operator evaluates to `False`, the second argument is not evaluated.

```mojo
print('Short-circuit "and" evaluation')
if false_func() and true_func():
    print("True result")
```

```mojo
print('Short-circuit "and" evaluation')
if false_func() and true_func():
    print("True result")
```

```output
Short-circuit "and" evaluation
Executing false_func
```

```output
Short-circuit "and" evaluation
Executing false_func
```

### Conditional expressions[​](control-flow.html#conditional-expressions "Direct link to Conditional expressions")

Mojo also supports conditional expressions (or what is sometimes called a [*ternary conditional operator*](https://en.wikipedia.org/wiki/Ternary_conditional_operator)) using the syntax`true_result if boolean_expression else false_result`, just as in Python. This is most often used as a concise way to assign one of two different values to a variable, based on a boolean condition.

```mojo
temp_celsius = 15
forecast = "warm" if temp_celsius > 20 else "cool"
print("The forecast for today is", forecast)
```

```mojo
temp_celsius = 15
forecast = "warm" if temp_celsius > 20 else "cool"
print("The forecast for today is", forecast)
```

```output
The forecast for today is cool
```

```output
The forecast for today is cool
```

The alternative, written as a multi-line `if` statement, is more verbose.

```mojo
if temp_celsius > 20:
    forecast = "warm"
else:
    forecast = "cool"
print("The forecast for today is", forecast)
```

```mojo
if temp_celsius > 20:
    forecast = "warm"
else:
    forecast = "cool"
print("The forecast for today is", forecast)
```

```output
The forecast for today is cool
```

```output
The forecast for today is cool
```

## The `while` statement[​](control-flow.html#the-while-statement "Direct link to the-while-statement")

The `while` loop repeatedly executes a code block while a given boolean expression evaluates to `True`. For example, the following loop prints values from the Fibonacci series that are less than 50.

```mojo
fib_prev = 0
fib_curr = 1

print(fib_prev, end="")
while fib_curr < 50:
    print(",", fib_curr, end="")
    fib_prev, fib_curr = fib_curr, fib_prev + fib_curr
```

```mojo
fib_prev = 0
fib_curr = 1

print(fib_prev, end="")
while fib_curr < 50:
    print(",", fib_curr, end="")
    fib_prev, fib_curr = fib_curr, fib_prev + fib_curr
```

```output
0, 1, 1, 2, 3, 5, 8, 13, 21, 34
```

```output
0, 1, 1, 2, 3, 5, 8, 13, 21, 34
```

A `continue` statement skips execution of the rest of the code block and resumes with the loop test expression.

```mojo
n = 0
while n < 5:
    n += 1
    if n == 3:
        continue
    print(n, end=", ")
```

```mojo
n = 0
while n < 5:
    n += 1
    if n == 3:
        continue
    print(n, end=", ")
```

```output
1, 2, 4, 5,
```

```output
1, 2, 4, 5,
```

A `break` statement terminates execution of the loop.

```mojo
n = 0
while n < 5:
    n += 1
    if n == 3:
        break
    print(n, end=", ")
```

```mojo
n = 0
while n < 5:
    n += 1
    if n == 3:
        break
    print(n, end=", ")
```

```output
1, 2,
```

```output
1, 2,
```

Optionally, a `while` loop can include an `else` clause. The body of the `else` clause executes when the loop's boolean condition evaluates to `False`, even if it occurs the first time tested.

```mojo
n = 5

while n < 4:
    print(n)
    n += 1
else:
    print("Loop completed")

```

```mojo
n = 5

while n < 4:
    print(n)
    n += 1
else:
    print("Loop completed")

```

```output
Loop completed
```

```output
Loop completed
```

The `else` clause does *not* execute if a `break` or `return` statement exits the `while` loop.

```mojo
n = 0
while n < 5:
    n += 1
    if n == 3:
        break
    print(n)
else:
    print("Executing else clause")
```

```mojo
n = 0
while n < 5:
    n += 1
    if n == 3:
        break
    print(n)
else:
    print("Executing else clause")
```

```output
1
2
```

```output
1
2
```

## The `for` statement[​](control-flow.html#the-for-statement "Direct link to the-for-statement")

The `for` loop iterates over a sequence, executing a code block for each element in the sequence. The Mojo `for` loop can iterate over any type that implements an `__iter__()` method that returns a type that defines `__next__()` and `__len__()` methods.

### Iterating over Mojo collections[​](control-flow.html#iterating-over-mojo-collections "Direct link to Iterating over Mojo collections")

All of the collection types in the [`collections`](https://docs.modular.com/mojo/stdlib/collections) module support `for` loop iteration. See the [Collection types](types.html#collection-types) documentation for more information on Mojo collection types.

TODO

Iterating over Mojo native collections currently assigns the loop index variable a [`Pointer`](https://docs.modular.com/mojo/stdlib/memory/pointer/Pointer) to each item, not the item itself. You can access the item using the dereference operator, `[]`, as shown in the examples below. This may change in a future version of Mojo.

The following shows an example of iterating over a Mojo [`List`](https://docs.modular.com/mojo/stdlib/collections/list/List).

```mojo
from collections import List

states = List[String]("California", "Hawaii", "Oregon")
for state in states:
    print(state[])
```

```mojo
from collections import List

states = List[String]("California", "Hawaii", "Oregon")
for state in states:
    print(state[])
```

```output
California
Hawaii
Oregon
```

```output
California
Hawaii
Oregon
```

The same technique works for iterating over a Mojo [`Set`](https://docs.modular.com/mojo/stdlib/collections/set/Set).

```mojo
from collections import Set

values = Set[Int](42, 0)
for item in values:
    print(item[])
```

```mojo
from collections import Set

values = Set[Int](42, 0)
for item in values:
    print(item[])
```

```output
42
0
```

```output
42
0
```

There are two techniques for iterating over a Mojo [`Dict`](https://docs.modular.com/mojo/stdlib/collections/dict/Dict). The first is to iterate directly using the `Dict`, which produces a sequence of the dictionary's keys.

```mojo
from collections import Dict

capitals = Dict[String, String]()
capitals["California"] = "Sacramento"
capitals["Hawaii"] = "Honolulu"
capitals["Oregon"] = "Salem"

for state in capitals:
    print(capitals[state[]] + ", " + state[])
```

```mojo
from collections import Dict

capitals = Dict[String, String]()
capitals["California"] = "Sacramento"
capitals["Hawaii"] = "Honolulu"
capitals["Oregon"] = "Salem"

for state in capitals:
    print(capitals[state[]] + ", " + state[])
```

```output
Sacramento, California
Honolulu, Hawaii
Salem, Oregon
```

```output
Sacramento, California
Honolulu, Hawaii
Salem, Oregon
```

The second approach to iterating over a Mojo `Dict` is to invoke its [`items()`](https://docs.modular.com/mojo/stdlib/collections/dict/Dict#items) method, which produces a sequence of [`DictEntry`](https://docs.modular.com/mojo/stdlib/collections/dict/DictEntry) objects. Within the loop body, you can then access the `key` and `value` fields of the entry.

```mojo
for item in capitals.items():
    print(item[].value + ", " + item[].key)
```

```mojo
for item in capitals.items():
    print(item[].value + ", " + item[].key)
```

```output
Sacramento, California
Honolulu, Hawaii
Salem, Oregon
```

```output
Sacramento, California
Honolulu, Hawaii
Salem, Oregon
```

Another type of iterable provided by the Mojo standard library is a *range*, which is a sequence of integers generated by the [`range()`](https://docs.modular.com/mojo/stdlib/builtin/range/range) function. It differs from the collection types shown above in that it's implemented as a [generator](https://en.wikipedia.org/wiki/Generator_%28computer_programming%29), producing each value as needed rather than materializing the entire sequence in memory. Additionally, each value assigned to the loop index variable is simply the `Int` value rather than a `Pointer` to the value, so you should not use the dereference operator on it within the loop. For example:

```mojo
for i in range(5):
    print(i, end=", ")
```

```mojo
for i in range(5):
    print(i, end=", ")
```

```output
0, 1, 2, 3, 4,
```

```output
0, 1, 2, 3, 4,
```

### `for` loop control statements[​](control-flow.html#for-loop-control-statements "Direct link to for-loop-control-statements")

A `continue` statement skips execution of the rest of the code block and resumes the loop with the next element of the collection.

```mojo
for i in range(5):
    if i == 3:
        continue
    print(i, end=", ")
```

```mojo
for i in range(5):
    if i == 3:
        continue
    print(i, end=", ")
```

```output
0, 1, 2, 4,
```

```output
0, 1, 2, 4,
```

A `break` statement terminates execution of the loop.

```mojo
for i in range(5):
    if i == 3:
        break
    print(i, end=", ")
```

```mojo
for i in range(5):
    if i == 3:
        break
    print(i, end=", ")
```

```output
0, 1, 2,
```

```output
0, 1, 2,
```

Optionally, a `for` loop can include an `else` clause. The body of the `else` clause executes after iterating over all of the elements in a collection.

```mojo
for i in range(5):
    print(i, end=", ")
else:
    print("\nFinished executing 'for' loop")
```

```mojo
for i in range(5):
    print(i, end=", ")
else:
    print("\nFinished executing 'for' loop")
```

```output
0, 1, 2, 3, 4,
Finished executing 'for' loop
```

```output
0, 1, 2, 3, 4,
Finished executing 'for' loop
```

The `else` clause executes even if the collection is empty.

```mojo
from collections import List

empty = List[Int]()
for i in empty:
    print(i[])
else:
    print("Finished executing 'for' loop")
```

```mojo
from collections import List

empty = List[Int]()
for i in empty:
    print(i[])
else:
    print("Finished executing 'for' loop")
```

```output
Finished executing 'for' loop
```

```output
Finished executing 'for' loop
```

The `else` clause does *not* execute if a `break` or `return` statement terminates the `for` loop.

```mojo
from collections import List

animals = List[String]("cat", "aardvark", "hippopotamus", "dog")
for animal in animals:
    if animal[] == "dog":
        print("Found a dog")
        break
else:
    print("No dog found")
```

```mojo
from collections import List

animals = List[String]("cat", "aardvark", "hippopotamus", "dog")
for animal in animals:
    if animal[] == "dog":
        print("Found a dog")
        break
else:
    print("No dog found")
```

```output
Found a dog
```

```output
Found a dog
```

### Iterating over Python collections[​](control-flow.html#iterating-over-python-collections "Direct link to Iterating over Python collections")

The Mojo `for` loop supports iterating over Python collection types. Each item retrieved by the loop is a [`PythonObject`](https://docs.modular.com/mojo/stdlib/python/object/PythonObject) wrapper around the Python object. Refer to the [Python types](python/types.html) documentation for more information on manipulating Python objects from Mojo.

The following is a simple example of iterating over a mixed-type Python list.

```mojo
from python import Python

# Create a mixed-type Python list
py_list = Python.evaluate("[42, 'cat', 3.14159]")
for py_obj in py_list:  # Each element is of type "PythonObject"
    print(py_obj)
```

```mojo
from python import Python

# Create a mixed-type Python list
py_list = Python.evaluate("[42, 'cat', 3.14159]")
for py_obj in py_list:  # Each element is of type "PythonObject"
    print(py_obj)
```

```output
42
cat
3.14159
```

```output
42
cat
3.14159
```

TODO

Iterating over a Mojo collection currently assigns the loop index variable a `Pointer` to each element, which then requires you to use the dereference operator within the loop body. In contrast, iterating over a Python collection assigns a `PythonObject` wrapper for the element, which does *not* require you to use the dereference operator.

There are two techniques for iterating over a Python dictionary. The first is to iterate directly using the dictionary, which produces a sequence of its keys.

```mojo
from python import Python

# Create a mixed-type Python dictionary
py_dict = Python.evaluate("{'a': 1, 'b': 2.71828, 'c': 'sushi'}")
for py_key in py_dict:  # Each element is of type "PythonObject"
    print(py_key, py_dict[py_key])
```

```mojo
from python import Python

# Create a mixed-type Python dictionary
py_dict = Python.evaluate("{'a': 1, 'b': 2.71828, 'c': 'sushi'}")
for py_key in py_dict:  # Each element is of type "PythonObject"
    print(py_key, py_dict[py_key])
```

```output
a 1
b 2.71828
c sushi
```

```output
a 1
b 2.71828
c sushi
```

The second approach to iterating over a Python dictionary is to invoke its `items()` method, which produces a sequence of 2-tuple objects. Within the loop body, you can then access the key and value by index.

```mojo
for py_tuple in py_dict.items():  # Each element is of type "PythonObject"
    print(py_tuple[0], py_tuple[1])
```

```mojo
for py_tuple in py_dict.items():  # Each element is of type "PythonObject"
    print(py_tuple[0], py_tuple[1])
```

```output
a 1
b 2.71828
c sushi
```

```output
a 1
b 2.71828
c sushi
```



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fcontrol-flow)

- [The `if` statement](control-flow.html#the-if-statement)

  - [Short-circuit evaluation](control-flow.html#short-circuit-evaluation)
  - [Conditional expressions](control-flow.html#conditional-expressions)
- [The `while` statement](control-flow.html#the-while-statement)
- [The `for` statement](control-flow.html#the-for-statement)

  - [Iterating over Mojo collections](control-flow.html#iterating-over-mojo-collections)
  - [`for` loop control statements](control-flow.html#for-loop-control-statements)
  - [Iterating over Python collections](control-flow.html#iterating-over-python-collections)











Errors, error handling, and context managers | Modular ![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



# Errors, error handling, and context managers

This page discusses how to raise errors in Mojo programs and how to detect and handle error conditions. It also discusses how you can use context managers to allocate and release resources such as files correctly, even when error conditions occur. Finally, it shows you how to implement context managers for your own custom resources.

## Raise an error[​](errors.html#raise-an-error "Direct link to Raise an error")

The `raise` statement raises an error condition in your program. You provide the `raise` statement with an [`Error`](https://docs.modular.com/mojo/stdlib/builtin/error/Error) instance to indicate the type of error that occurred. For example:

```mojo
raise Error("integer overflow")
```

```mojo
raise Error("integer overflow")
```

As a convenience, you can instead provide an error message in the form of a [`String`](https://docs.modular.com/mojo/stdlib/collections/string/string/String) or [`StringLiteral`](https://docs.modular.com/mojo/stdlib/builtin/string_literal/StringLiteral) value, and `raise` automatically uses that to create an `Error` instance. So you can raise the same error condition as shown above by executing:

```mojo
raise "integer overflow"
```

```mojo
raise "integer overflow"
```

Currently, Mojo does not support typed error conditions. All errors are instances of `Error`, and the only thing that distinguishes different error conditions is the error message that you provide.

An error interrupts the current execution flow of your program. If you provide an error handler (as described in [Handle an error](errors.html#handle-an-error)) in the current function, execution resumes with that handler. If the error isn't handled in the current function, it propagates to the calling function and so on. If an error isn't caught by any error handler, your program terminates with a non-zero exit code and prints the error message. For example:

```output
Unhandled exception caught during execution: integer overflow
```

```output
Unhandled exception caught during execution: integer overflow
```

If a function you define using the `fn` keyword can raise an error, you must include the `raises` keyword in the function definition. For example:

```mojo
fn incr(n: Int) raises -> Int:
    if n == Int.MAX:
        raise "inc: integer overflow"
    else:
        return n + 1
```

```mojo
fn incr(n: Int) raises -> Int:
    if n == Int.MAX:
        raise "inc: integer overflow"
    else:
        return n + 1
```

If you don't include the `raises` keyword when defining a function with `fn`, then the function must explicitly handle any errors that might occur in code that it executes. For example:

```mojo
# This function doesn't compile because of the unhandled error
fn unhandled_error(n: Int):
    print(n, "+ 1 =", incr(n))

# This function compiles because it handles the possible error
fn handled_error(n: Int):
    try:
        print(n, "+ 1 =", incr(n))
    except e:
        print("Handled an error:", e)
```

```mojo
# This function doesn't compile because of the unhandled error
fn unhandled_error(n: Int):
    print(n, "+ 1 =", incr(n))

# This function compiles because it handles the possible error
fn handled_error(n: Int):
    try:
        print(n, "+ 1 =", incr(n))
    except e:
        print("Handled an error:", e)
```

In contrast, you **cannot** use the `raises` keyword when defining a function using the `def` keyword, because `def` always implies that the function might raise an error. So the following is equivalent to the `incr` function defined above with `fn`:

```mojo
def incr(n: Int) -> Int:
    if n == Int.MAX:
        raise "inc: integer overflow"
    else:
        return n + 1
```

```mojo
def incr(n: Int) -> Int:
    if n == Int.MAX:
        raise "inc: integer overflow"
    else:
        return n + 1
```

## Handle an error[​](errors.html#handle-an-error "Direct link to Handle an error")

Mojo allows you to detect and handle error conditions using the `try-except` control flow structure, whose full syntax is:

```mojo
try:
    # Code block to execute that might raise an error
except <optional_variable_name>:
    # Code block to execute if an error occurs
else:
    # Code block to execute if no error occurs
finally:
    # Final code block to execute in all circumstances
```

```mojo
try:
    # Code block to execute that might raise an error
except <optional_variable_name>:
    # Code block to execute if an error occurs
else:
    # Code block to execute if no error occurs
finally:
    # Final code block to execute in all circumstances
```

You must include one or both of the `except` and `finally` clauses. The `else` clause is optional.

The `try` clause contains a code block to execute that might raise an error. If no error occurs, the entire code block executes. If an error occurs, execution of the code block stops at the point that the error is raised. Your program then continues with the execution of the `except` clause, if provided, or the `finally` clause.

If the `except` clause is present, its code block executes only if an error occurred in the `try` clause. The `except` clause "consumes" the error that occurred in the `try` clause. You can then implement any error handling or recovery that's appropriate for your application.

If you provide the name of a variable after the `except` keyword, then the `Error` instance is bound to the variable if an error occurs. The `Error` type implements the [`Writable`](https://docs.modular.com/mojo/stdlib/utils/write/Writable) trait, so you can pass it as an argument to the [`print()`](https://docs.modular.com/mojo/stdlib/builtin/io/print) function if you'd like to print its error message to the console. It also implements the [`Stringable`](https://docs.modular.com/mojo/stdlib/builtin/str/Stringable) trait, so you can construct a `String` with `String(error)` if you want to extract the error message as a `String` for further processing.

If desired, you can re-raise an error condition from your `except` clause simply by executing a `raise` statement from within its code block. This can be either a new `Error` instance or, if you provided a variable name to capture the `Error` that occurred originally, you can re-raise that error.

Because Mojo does not currently support typed errors, a `try-except` control structure can include at most one `except` clause, which catches any `Error` raised.

If the `else` clause is present, its code block executes only if an error does not occur in the `try` clause. Note that the `else` clause is *skipped* if the `try` clause executes a `continue`, `break`, or `return` that exits from the `try` block.

If the `finally` clause is present, its code block executes after the `try` clause and the `except` or `else` clause, if applicable. The `finally` clause executes even if one of the other code blocks exit by executing a `continue`, `break`, or `return` statement or by raising an error. The `finally` clause is often used to release resources used by the `try` clause (such as a file handle) regardless of whether or not an error occurred.

As an example, consider the following program:

```mojo
def incr(n: Int) -> Int:
    if n == Int.MAX:
        raise "inc: integer overflow"
    else:
        return n + 1

def main():
    values = List(0, 1, Int.MAX)
    for value in values:
        try:
            print()
            print("try     =>", value[])
            if value[] == 1:
                continue
            result = "{} incremented is {}".format(value[], incr(value[]))
        except e:
            print("except  =>", e)
        else:
            print("else    =>", result)
        finally:
            print("finally => ====================")

```

```mojo
def incr(n: Int) -> Int:
    if n == Int.MAX:
        raise "inc: integer overflow"
    else:
        return n + 1

def main():
    values = List(0, 1, Int.MAX)
    for value in values:
        try:
            print()
            print("try     =>", value[])
            if value[] == 1:
                continue
            result = "{} incremented is {}".format(value[], incr(value[]))
        except e:
            print("except  =>", e)
        else:
            print("else    =>", result)
        finally:
            print("finally => ====================")

```

Running this program generates the following output:

```output
try     => 0
else    => 0 incremented is 1
finally => ====================

try     => 1
finally => ====================

try     => 9223372036854775807
except  => inc: integer overflow
finally => ====================
```

```output
try     => 0
else    => 0 incremented is 1
finally => ====================

try     => 1
finally => ====================

try     => 9223372036854775807
except  => inc: integer overflow
finally => ====================
```

## Use a context manager[​](errors.html#use-a-context-manager "Direct link to Use a context manager")

A *context manager* is an object that manages resources such as files, network connections, and database connections. It provides a way to allocate resources and release them automatically when they are no longer needed, ensuring proper cleanup and preventing resource leaks even in the case of error conditions.

As an example, consider reading data from a file. A naive approach might look like this:

```mojo
# Obtain a file handle to read from storage
f = open(input_file, "r")
content = f.read()
# Process the content as needed
# Close the file handle
f.close()
```

```mojo
# Obtain a file handle to read from storage
f = open(input_file, "r")
content = f.read()
# Process the content as needed
# Close the file handle
f.close()
```

Calling [`close()`](https://docs.modular.com/mojo/stdlib/builtin/file/FileHandle#close) releases the memory and other operating system resources associated with the opened file. If your program were to open many files without closing them, you could exhaust the resources available to your program and cause errors. The problem is even worse if you were writing to a file instead of reading from it, because the operating system might buffer the output in memory until the file is closed. If your program were to crash instead of exiting normally, that buffered data could be lost instead of being written to storage.

The example above actually includes the call to `close()`, but it ignores the possibility that [`read()`](https://docs.modular.com/mojo/stdlib/builtin/file/FileHandle#read) could raise an error, which would result in the program not executing the `close()`. To handle this scenario you could rewrite the code to use `try` like this:

```mojo
# Obtain a file handle to read from storage
f = open(input_file, "r")

try:
    content = f.read()
    # Process the content as needed
finally:
    # Ensure that the file handle is closed even if read() raises an error
    f.close()
```

```mojo
# Obtain a file handle to read from storage
f = open(input_file, "r")

try:
    content = f.read()
    # Process the content as needed
finally:
    # Ensure that the file handle is closed even if read() raises an error
    f.close()
```

However, the [`FileHandle`](https://docs.modular.com/mojo/stdlib/builtin/file/FileHandle) struct returned by [`open()`](https://docs.modular.com/mojo/stdlib/builtin/file/open) is a context manager. When used in conjunction with Mojo's `with` statement, a context manager ensures that the resources it manages are properly released at the end of the block, even if an error occurs. In the case of a `FileHandle`, that means that the call to `close()` takes place automatically. So you could rewrite the example above to take advantage of the context manager—and omit the explicit call to `close()`—like this:

```mojo
with open(input_file, "r") as f:
    content = f.read()
    # Process the content as needed
```

```mojo
with open(input_file, "r") as f:
    content = f.read()
    # Process the content as needed
```

The `with` statement also allows you to use multiple context managers within the same code block. As an example, the following code opens one text file, reads its entire content, converts it to upper case, and then writes the result to a different file:

```mojo
    with open(input_file, "r") as f_in, open(output_file, "w") as f_out:
        input_text = f_in.read()
        output_text = input_text.upper()
        f_out.write(output_text)
```

```mojo
    with open(input_file, "r") as f_in, open(output_file, "w") as f_out:
        input_text = f_in.read()
        output_text = input_text.upper()
        f_out.write(output_text)
```

`FileHandle` is perhaps the most commonly used context manager. Other examples of context managers in the Mojo standard library are [`NamedTemporaryFile`](https://docs.modular.com/mojo/stdlib/tempfile/tempfile/NamedTemporaryFile), [`TemporaryDirectory`](https://docs.modular.com/mojo/stdlib/tempfile/tempfile/TemporaryDirectory), [`BlockingScopedLock`](https://docs.modular.com/mojo/stdlib/utils/lock/BlockingScopedLock), and [`assert_raises`](https://docs.modular.com/mojo/stdlib/testing/testing/assert_raises). You can also create your own custom context managers, as described in [Write a custom context manager](errors.html#write-a-custom-context-manager) below.

## Write a custom context manager[​](errors.html#write-a-custom-context-manager "Direct link to Write a custom context manager")

Writing a custom context manager is a matter of defining a [struct](structs.html) that implements two special *dunder* methods ("double underscore" methods): `__enter__()` and `__exit__()`:

- `__enter__()` is called by the `with` statement to enter the runtime context. The `__enter__()` method should initialize any state necessary for the context and return the context manager.
- `__exit__()` is called when the `with` code block completes execution, even if the `with` code block terminates with a call to `continue`, `break`, or `return`. The `__exit__()` method should release any resources associated with the context. After the `__exit__()` method returns, the context manager is destroyed.

  If the `with` code block raises an error, then the `__exit__()` method runs before any error processing occurs (that is, before it is caught by a `try-except` structure or your program terminates). If you'd like to define conditional processing for error conditions in a `with` code block, you can implement an overloaded version of `__exit__()` that takes an `Error` argument. For more information, see [Define a conditional `__exit__()` method](errors.html#define-a-conditional-__exit__-method) below.

  For context managers that don't need to release resources or perform other actions on termination, you are not required to implement an `__exit__()` method. In that case the context manager is destroyed automatically after the `with` code block completes execution.

Here is an example of implementing a `Timer` context manager, which prints the amount of time spent executing the `with` code block:

context\_mgr.mojo

```mojo
import sys
import time

@value
struct Timer:
    var start_time: Int

    fn __init__(out self):
        self.start_time = 0

    fn __enter__(mut self) -> Self:
        self.start_time = time.perf_counter_ns()
        return self

    fn __exit__(mut self):
        end_time = time.perf_counter_ns()
        elapsed_time_ms = round(((end_time - self.start_time) / 1e6), 3)
        print("Elapsed time:", elapsed_time_ms, "milliseconds")

def main():
    with Timer():
        print("Beginning execution")
        time.sleep(1)
        if len(sys.argv()) > 1:
            raise "simulated error"
        time.sleep(1)
        print("Ending execution")
```

```mojo
import sys
import time

@value
struct Timer:
    var start_time: Int

    fn __init__(out self):
        self.start_time = 0

    fn __enter__(mut self) -> Self:
        self.start_time = time.perf_counter_ns()
        return self

    fn __exit__(mut self):
        end_time = time.perf_counter_ns()
        elapsed_time_ms = round(((end_time - self.start_time) / 1e6), 3)
        print("Elapsed time:", elapsed_time_ms, "milliseconds")

def main():
    with Timer():
        print("Beginning execution")
        time.sleep(1)
        if len(sys.argv()) > 1:
            raise "simulated error"
        time.sleep(1)
        print("Ending execution")
```

Running this example produces output like this:

```sh
mojo context_mgr.mojo
```

```sh
mojo context_mgr.mojo
```

```output
Beginning execution
Ending execution
Elapsed time: 2010.0 milliseconds
```

```output
Beginning execution
Ending execution
Elapsed time: 2010.0 milliseconds
```

```sh
mojo context_mgr.mojo fail
```

```sh
mojo context_mgr.mojo fail
```

```output
Beginning execution
Elapsed time: 1002.0 milliseconds
Unhandled exception caught during execution: simulated error
```

```output
Beginning execution
Elapsed time: 1002.0 milliseconds
Unhandled exception caught during execution: simulated error
```

### Define a conditional `__exit__()` method[​](errors.html#define-a-conditional-__exit__-method "Direct link to define-a-conditional-__exit__-method")

When creating a context manager, you can implement the `__exit__(self)` form of the `__exit__()` method to handle completion of the `with` statement under all circumstances including errors. However, you have the option of additionally implementing an overloaded version that is invoked instead when an error occurs in the `with` code block:

```mojo
fn __exit__(self, error: Error) raises -> Bool
```

```mojo
fn __exit__(self, error: Error) raises -> Bool
```

Given the `Error` that occurred as an argument, the method can:

- Return `True` to suppress the error
- Return `False` to re-raise the error
- Raise a new error

The following is an example of a context manager that suppresses only a certain type of error condition and propagates all others:

conditional\_context\_mgr.mojo

```mojo
import sys
import time

@value
struct ConditionalTimer:
    var start_time: Int

    fn __init__(out self):
        self.start_time = 0

    fn __enter__(mut self) -> Self:
        self.start_time = time.perf_counter_ns()
        return self

    fn __exit__(mut self):
        end_time = time.perf_counter_ns()
        elapsed_time_ms = round(((end_time - self.start_time) / 1e6), 3)
        print("Elapsed time:", elapsed_time_ms, "milliseconds")

    fn __exit__(mut self, e: Error) raises -> Bool:
        if String(e) == "just a warning":
            print("Suppressing error:", e)
            self.__exit__()
            return True
        else:
            print("Propagating error")
            self.__exit__()
            return False

def flaky_identity(n: Int) -> Int:
    if (n % 4) == 0:
        raise "really bad"
    elif (n % 2) == 0:
        raise "just a warning"
    else:
        return n

def main():
    for i in range(1, 9):
        with ConditionalTimer():
            print("\nBeginning execution")

            print("i =", i)
            time.sleep(0.1)

            if i == 3:
                print("continue executed")
                continue

            j = flaky_identity(i)
            print("j =", j)

            print("Ending execution")
```

```mojo
import sys
import time

@value
struct ConditionalTimer:
    var start_time: Int

    fn __init__(out self):
        self.start_time = 0

    fn __enter__(mut self) -> Self:
        self.start_time = time.perf_counter_ns()
        return self

    fn __exit__(mut self):
        end_time = time.perf_counter_ns()
        elapsed_time_ms = round(((end_time - self.start_time) / 1e6), 3)
        print("Elapsed time:", elapsed_time_ms, "milliseconds")

    fn __exit__(mut self, e: Error) raises -> Bool:
        if String(e) == "just a warning":
            print("Suppressing error:", e)
            self.__exit__()
            return True
        else:
            print("Propagating error")
            self.__exit__()
            return False

def flaky_identity(n: Int) -> Int:
    if (n % 4) == 0:
        raise "really bad"
    elif (n % 2) == 0:
        raise "just a warning"
    else:
        return n

def main():
    for i in range(1, 9):
        with ConditionalTimer():
            print("\nBeginning execution")

            print("i =", i)
            time.sleep(0.1)

            if i == 3:
                print("continue executed")
                continue

            j = flaky_identity(i)
            print("j =", j)

            print("Ending execution")
```

Running this example produces this output:

```output
Beginning execution
i = 1
j = 1
Ending execution
Elapsed time: 105.0 milliseconds

Beginning execution
i = 2
Suppressing error: just a warning
Elapsed time: 106.0 milliseconds

Beginning execution
i = 3
continue executed
Elapsed time: 106.0 milliseconds

Beginning execution
i = 4
Propagating error
Elapsed time: 106.0 milliseconds
Unhandled exception caught during execution: really bad
```

```output
Beginning execution
i = 1
j = 1
Ending execution
Elapsed time: 105.0 milliseconds

Beginning execution
i = 2
Suppressing error: just a warning
Elapsed time: 106.0 milliseconds

Beginning execution
i = 3
continue executed
Elapsed time: 106.0 milliseconds

Beginning execution
i = 4
Propagating error
Elapsed time: 106.0 milliseconds
Unhandled exception caught during execution: really bad
```



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Ferrors)

- [Raise an error](errors.html#raise-an-error)
- [Handle an error](errors.html#handle-an-error)
- [Use a context manager](errors.html#use-a-context-manager)
- [Write a custom context manager](errors.html#write-a-custom-context-manager)

  - [Define a conditional `__exit__()` method](errors.html#define-a-conditional-__exit__-method)











Functions | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



# Functions

As mentioned in the [syntax overview](basics.html), Mojo supports two types of functions: `def` and `fn` functions. You can use either declaration with any function, including the `main()` function, but they have different default behaviors, as described on this page.

We believe both `def` and `fn` have good use cases and don't consider either to be better than the other. Deciding which to use is a matter of personal taste as to which style best fits a given task.

We believe Mojo's flexibility in this regard is a superpower that allows you to write code in the manner that's best for your project.

Functions declared inside a [`struct`](structs.html) are called "methods," but they have all the same qualities as "functions" described here.

## Anatomy of a function[​](functions.html#anatomy-of-a-function "Direct link to Anatomy of a function")

Both `def` and `fn` function declarations have the same basic components (here demonstrated with a `def` function):

```
def function_name[
​    parameters ...
](
​    arguments ...
) -> return_value_type:
​    function_body
```

Functions can have:

- Parameters: A function can optionally take one or more compile-time *parameter* values used for metaprogramming.
- Arguments: A function can also optionally take one or more runtime *arguments*.
- Return value: A function can optionally return a value.
- Function body: Statements that are executed when you call the function. Function definitions must include a body.

All of the optional parts of the function can be omitted, so the minimal function is something like this:

```mojo
def do_nothing():
    pass
```

```mojo
def do_nothing():
    pass
```

If a function takes no parameters, you can omit the square brackets, but the parenthesis are always required.

While you can't leave out the function body, you can use the `pass` statement to define a function that does nothing.

### Arguments and parameters[​](functions.html#arguments-and-parameters "Direct link to Arguments and parameters")

Functions take two kinds of inputs: *arguments* and *parameters*. Arguments are familiar from many other languages: they are runtime values passed into the function.

```mojo
def add(a: Int, b: Int) -> Int:
    return a+b
```

```mojo
def add(a: Int, b: Int) -> Int:
    return a+b
```

On the other hand, you can think of a parameter as a compile-time variable that becomes a runtime constant. For example, consider the following function with a parameter:

```mojo
def add_tensors[rank: Int](a: MyTensor[rank], b: MyTensor[rank]) -> MyTensor[rank]:
    # ...
```

```mojo
def add_tensors[rank: Int](a: MyTensor[rank], b: MyTensor[rank]) -> MyTensor[rank]:
    # ...
```

In this case, the `rank` value needs to be specified in a way that can be determined at compilation time, such as a literal or expression.

When you compile a program that uses this code, the compiler produces a unique version of the function for each unique `rank` value used in the program, each with a constant `rank`.

This usage of "parameter" is probably different from what you're used to from other languages, where "parameter" and "argument" are often used interchangeably. In Mojo, "parameter" and "parameter expression" refer to compile-time values, and "argument" and "expression" refer to runtime values.

By default, both arguments and parameters can be specified either by position or by keyword, as shown below:

```mojo
# positional
x = add(5, 7)
# keyword
y = add(a=9, b=3)
```

```mojo
# positional
x = add(5, 7)
# keyword
y = add(a=9, b=3)
```

These forms can also be mixed in the same function call.

For more information on arguments, see [Function arguments](functions.html#function-arguments) on this page. For more information on parameters, see [Parameterization: compile-time metaprogramming](parameters.1.html).

## `def` functions[​](functions.html#def-functions "Direct link to def-functions")

Compared to an `fn` function, a `def` function has fewer restrictions. The `def` function works more like a Python `def` function. For example, this function works the same in Python and Mojo:

```mojo
def greet(name):
    greeting = "Hello, " + name + "!"
    return greeting
```

```mojo
def greet(name):
    greeting = "Hello, " + name + "!"
    return greeting
```

In a Mojo `def` function, you have the option to specify the argument type and the return type. You can also declare variables with `var`, with or without explicit typing. So you can write a `def` function that looks almost exactly like an `fn` function:

```mojo
def greet(name: String) -> String:
    var greeting = "Hello, " + name + "!"
    return greeting
```

```mojo
def greet(name: String) -> String:
    var greeting = "Hello, " + name + "!"
    return greeting
```

This way, the compiler ensures that `name` is a string, and the return type is a string.

Here's everything to know about `def`:

- Arguments don't require a declared type.

  Undeclared arguments are actually passed as an [`object`](https://docs.modular.com/mojo/stdlib/builtin/object/object), which allows the function to receive any type (Mojo infers the type at runtime).
- Return types don't need to be declared, and also default to `object`. (If a `def` function doesn't declare a return type of `None`, it's considered to return an `object` by default.)
- Arguments are mutable. Arguments default to using the `read` [argument convention](values/ownership.html#argument-conventions) like an `fn` function, with a special addition: if the function mutates the argument, it makes a mutable copy.

  If an argument is an `object` type, it's received as a reference, following [object reference semantics](values/value-semantics.html#python-style-reference-semantics).

  If an argument is any other declared type, it's received as a value.

### The `object` type[​](functions.html#the-object-type "Direct link to the-object-type")

If you don't declare the type for an argument or return value in a `def`, it becomes an [`object`](https://docs.modular.com/mojo/stdlib/builtin/object/object), which is unlike any other type in the standard library.

The `object` type allows for dynamic typing because it can actually represent any type in the Mojo standard library, and the actual type is inferred at runtime. (Actually, there's still more to do before it can represent all Mojo types.) This is great for compatibility with Python and all of the flexibility that it provides with dynamic types. However, this lack of type enforcement can lead to runtime errors when a function receives or returns an unexpected type.

For compatibility with Python, `object` values are passed using [object reference semantics](values/value-semantics.html#python-style-reference-semantics). As such, the `object` type is not compatible with the [argument conventions](values/ownership.html#argument-conventions) that enforce value semantics. So, be careful if using `object` values alongside other strongly-typed values—their behavior might be inconsistent because `object` is the only type in the standard library that does not conform to [full value semantics](values/value-semantics.html#intro-to-value-semantics).

TODO

The `object` type is still a work in progress. It doesn't support all of the possible underlying types, for example.

## `fn` functions[​](functions.html#fn-functions "Direct link to fn-functions")

The `fn` function has somewhat stricter rules than the `def` function.

Here's an example of an `fn` function:

```mojo
fn greet(name: String) -> String:
    var greeting = "Hello, " + name + "!"
    return greeting
```

```mojo
fn greet(name: String) -> String:
    var greeting = "Hello, " + name + "!"
    return greeting
```

As far as a function caller is concerned, `def` and `fn` functions are interchangeable. That is, there's nothing a `def` can do that an `fn` can't (and vice versa). The difference is that, compared to a `def` function, an `fn` function is more strict on the inside.

Here's everything to know about `fn`:

- Arguments must specify a type (except for the `self` argument in [struct methods](structs.html#methods)).
- Return values must specify a type, unless the function doesn't return a value.

  If you don't specify a return type, it defaults to `None` (meaning no return value).
- By default, arguments are received as an immutable reference (values are read-only, using the `read` [argument convention](values/ownership.html#argument-conventions)).

  This prevents accidental mutations, and permits the use of non-copyable types as arguments.

  If you want a local copy, you can simply assign the value to a local variable. Or, you can get a mutable reference to the value by declaring the `mut` [argument convention](values/ownership.html#argument-conventions)).
- If the function can raise an error, it must be explicitly declared with the `raises` keyword. A `def` function does not need to add the `raises` keyword. For information, see [Raising and non-raising functions](functions.html#raising-and-non-raising-functions).

By enforcing these type checks, using the `fn` function helps avoid a variety of runtime errors.

## Function arguments[​](functions.html#function-arguments "Direct link to Function arguments")

As noted in the previous sections, there are a few differences between how `def` and `fn` functions treat arguments. But most of the time they are the same.

As noted, there are some differences in *argument conventions*. Argument conventions are discussed in much more detail in the page on [Ownership](values/ownership.html#argument-conventions).

The other difference is that `def` functions don't need to specify an argument's type. If no type is specified, the argument is passed as an [`object`](https://docs.modular.com/mojo/stdlib/builtin/object/object).

The remaining rules for arguments described in this section apply to both `def` and `fn` functions.

Functions with \`/\` and \`\*\` in the argument list

You might see the following characters in place of arguments: slash (`/`) and/or star (`*`). For example:

```mojo
def myfunc(pos_only, /, pos_or_keyword, *, keyword_only):
```

```mojo
def myfunc(pos_only, /, pos_or_keyword, *, keyword_only):
```

Arguments **before** the `/` can only be passed by position. Arguments **after** the `*` can only be passed by keyword. For details, see [Positional-only and keyword-only arguments](functions.html#positional-only-and-keyword-only-arguments)

You may also see argument names prefixed with one or two stars (`*`):

```mojo
def myfunc2(*names, **attributes):
```

```mojo
def myfunc2(*names, **attributes):
```

An argument name prefixed by a single star character, like `*names` identifies a [variadic argument](functions.html#variadic-arguments), while an argument name prefixed with a double star, like `**attributes` identifies a [variadic keyword-only argument](functions.html#variadic-keyword-arguments).

### Optional arguments[​](functions.html#optional-arguments "Direct link to Optional arguments")

An optional argument is one that includes a default value, such as the `exp` argument here:

```mojo
fn my_pow(base: Int, exp: Int = 2) -> Int:
    return base ** exp

fn use_defaults():
    # Uses the default value for `exp`
    var z = my_pow(3)
    print(z)
```

```mojo
fn my_pow(base: Int, exp: Int = 2) -> Int:
    return base ** exp

fn use_defaults():
    # Uses the default value for `exp`
    var z = my_pow(3)
    print(z)
```

However, you cannot define a default value for an argument that's declared as [`mut`](values/ownership.html#mutable-arguments-mut).

Any optional arguments must appear after any required arguments. [Keyword-only arguments](functions.html#positional-only-and-keyword-only-arguments), discussed later, can also be either required or optional.

### Keyword arguments[​](functions.html#keyword-arguments "Direct link to Keyword arguments")

You can also use keyword arguments when calling a function. Keyword arguments are specified using the format `argument_name = argument_value`. You can pass keyword arguments in any order:

```mojo
fn my_pow(base: Int, exp: Int = 2) -> Int:
    return base ** exp

fn use_keywords():
    # Uses keyword argument names (with order reversed)
    var z = my_pow(exp=3, base=2)
    print(z)
```

```mojo
fn my_pow(base: Int, exp: Int = 2) -> Int:
    return base ** exp

fn use_keywords():
    # Uses keyword argument names (with order reversed)
    var z = my_pow(exp=3, base=2)
    print(z)
```

### Variadic arguments[​](functions.html#variadic-arguments "Direct link to Variadic arguments")

Variadic arguments let a function accept a variable number of arguments. To define a function that takes a variadic argument, use the variadic argument syntax `*argument_name`:

```mojo
fn sum(*values: Int) -> Int:
  var sum: Int = 0
  for value in values:
    sum = sum + value
  return sum
```

```mojo
fn sum(*values: Int) -> Int:
  var sum: Int = 0
  for value in values:
    sum = sum + value
  return sum
```

The variadic argument `values` here is a placeholder that accepts any number of passed positional arguments.

You can define zero or more arguments before the variadic argument. When calling the function, any remaining positional arguments are assigned to the variadic argument, so any arguments declared **after** the variadic argument can only be specified by keyword (see [Positional-only and keyword-only arguments](functions.html#positional-only-and-keyword-only-arguments)).

Variadic arguments can be divided into two categories:

- Homogeneous variadic arguments, where all of the passed arguments are the same type—all `Int`, or all `String`, for example.
- Heterogeneous variadic arguments, which can accept a set of different argument types.

The following sections describe how to work with homogeneous and heterogeneous variadic arguments.

Variadic parameters

Mojo also supports variadic *parameters*, but with some limitations—for details see [variadic parameters](parameters.1.html#variadic-parameters).

#### Homogeneous variadic arguments[​](functions.html#homogeneous-variadic-arguments "Direct link to Homogeneous variadic arguments")

When defining a homogeneous variadic argument, use `*argument_name: argument_type`:

```mojo
def greet(*names: String):
    ...
```

```mojo
def greet(*names: String):
    ...
```

Inside the function body, the variadic argument is available as an iterable list for ease of use. Currently there are some differences in handling the list depending on whether the arguments are register-passable types (such as `Int`) or memory-only types (such as `String`).

TODO

We hope to remove these differences in the future.

Register-passable types, such as `Int`, are available as a [`VariadicList`](https://docs.modular.com/mojo/stdlib/builtin/list_literal/VariadicList) type. As shown in the previous example, you can iterate over the values using a `for..in` loop.

```mojo
fn sum(*values: Int) -> Int:
  var sum: Int = 0
  for value in values:
    sum = sum+value
  return sum
```

```mojo
fn sum(*values: Int) -> Int:
  var sum: Int = 0
  for value in values:
    sum = sum+value
  return sum
```

Memory-only types, such as `String`, are available as a [`VariadicListMem`](https://docs.modular.com/mojo/stdlib/builtin/list_literal/VariadicListMem). Iterating over this list directly with a `for..in` loop currently produces a [`Pointer`](https://docs.modular.com/mojo/stdlib/memory/pointer/Pointer) to each value instead of the value itself. You must add an empty subscript operator `[]` to dereference the pointer and retrieve the value:

```mojo
def make_worldly(mut *strs: String):
    # Requires extra [] to dereference the pointer for now.
    for i in strs:
        i[] += " world"

```

```mojo
def make_worldly(mut *strs: String):
    # Requires extra [] to dereference the pointer for now.
    for i in strs:
        i[] += " world"

```

Alternately, subscripting into a `VariadicListMem` returns the argument value, and doesn't require any dereferencing:

```mojo
fn make_worldly(mut *strs: String):
    # This "just works" as you'd expect!
    for i in range(len(strs)):
        strs[i] += " world"
```

```mojo
fn make_worldly(mut *strs: String):
    # This "just works" as you'd expect!
    for i in range(len(strs)):
        strs[i] += " world"
```

#### Heterogeneous variadic arguments[​](functions.html#heterogeneous-variadic-arguments "Direct link to Heterogeneous variadic arguments")

Implementing heterogeneous variadic arguments is somewhat more complicated than homogeneous variadic arguments. Writing generic code to handle multiple argument types requires [traits](traits.html) and [parameters](parameters.1.html). So the syntax may look a little unfamiliar if you haven't worked with those features. The signature for a function with a heterogeneous variadic argument looks like this:

```mojo
def count_many_things[*ArgTypes: Intable](*args: *ArgTypes):
    ...
```

```mojo
def count_many_things[*ArgTypes: Intable](*args: *ArgTypes):
    ...
```

The parameter list, `[*ArgTypes: Intable]` specifies that the function takes an `ArgTypes` parameter, which is a list of types, all of which conform to the [`Intable`](https://docs.modular.com/mojo/stdlib/builtin/int/Intable) trait. The argument list, `(*args: *ArgTypes)` has the familiar `*args` for the variadic argument, but instead of a single type, its type is defined as *list* of types, `*ArgTypes`.

This means that each argument in `args` has a corresponding type in `ArgTypes`, so `args[n]` is of type `ArgTypes[n]`.

Inside the function, `args` is available as a [`VariadicPack`](https://docs.modular.com/mojo/stdlib/builtin/list_literal/VariadicPack). The easiest way to work with the arguments is to use the `each()` method to iterate through the `VariadicPack`:

```mojo
fn count_many_things[*ArgTypes: Intable](*args: *ArgTypes) -> Int:
    var total = 0

    @parameter
    fn add[Type: Intable](value: Type):
        total += Int(value)

    args.each[add]()
    return total

print(count_many_things(5, 11.7, 12))
```

```mojo
fn count_many_things[*ArgTypes: Intable](*args: *ArgTypes) -> Int:
    var total = 0

    @parameter
    fn add[Type: Intable](value: Type):
        total += Int(value)

    args.each[add]()
    return total

print(count_many_things(5, 11.7, 12))
```

```output
28
```

```output
28
```

In the example above, the `add()` function is called for each argument in turn, with the appropriate `value` and `Type` values. For instance, `add()` is first called with `value=5` and `Type=Int`, then with `value=11.7` and `Type=Float64`.

Also, note that when calling `count_many_things()`, you don't actually pass in a list of argument types. You only need to pass in the arguments, and Mojo generates the `ArgTypes` list itself.

As a small optimization, if your function is likely to be called with a single argument frequently, you can define your function with a single argument followed by a variadic argument. This lets the simple case bypass populating and iterating through the `VariadicPack`.

For example, given a `print_string()` function that prints a single string, you could re-implement the variadic `print()` function with code like this:

```mojo
fn print_string(s: String):
    print(s, end="")

fn print_many[T: Stringable, *Ts: Stringable](first: T, *rest: *Ts):
    print_string(String(first))

    @parameter
    fn print_elt[T: Stringable](a: T):
        print_string(" ")
        print_string(String(a))
    rest.each[print_elt]()
print_many("Bob")
```

```mojo
fn print_string(s: String):
    print(s, end="")

fn print_many[T: Stringable, *Ts: Stringable](first: T, *rest: *Ts):
    print_string(String(first))

    @parameter
    fn print_elt[T: Stringable](a: T):
        print_string(" ")
        print_string(String(a))
    rest.each[print_elt]()
print_many("Bob")
```

```output
Bob
```

```output
Bob
```

If you call `print_many()` with a single argument, it calls `print_string()` directly. The `VariadicPack` is empty, so `each()` returns immediately without calling the `print_elt()` function.

#### Variadic keyword arguments[​](functions.html#variadic-keyword-arguments "Direct link to Variadic keyword arguments")

Mojo functions also support variadic keyword arguments (`**kwargs`). Variadic keyword arguments allow the user to pass an arbitrary number of keyword arguments. To define a function that takes a variadic keyword argument, use the variadic keyword argument syntax `**kw_argument_name`:

```mojo
fn print_nicely(**kwargs: Int) raises:
  for key in kwargs.keys():
      print(key[], "=", kwargs[key[]])

 # prints:
 # `a = 7`
 # `y = 8`
print_nicely(a=7, y=8)
```

```mojo
fn print_nicely(**kwargs: Int) raises:
  for key in kwargs.keys():
      print(key[], "=", kwargs[key[]])

 # prints:
 # `a = 7`
 # `y = 8`
print_nicely(a=7, y=8)
```

In this example, the argument name `kwargs` is a placeholder that accepts any number of keyword arguments. Inside the body of the function, you can access the arguments as a dictionary of keywords and argument values (specifically, an instance of [`OwnedKwargsDict`](https://docs.modular.com/mojo/stdlib/collections/dict/OwnedKwargsDict)).

There are currently a few limitations:

- Variadic keyword arguments are always implicitly treated as if they were declared with the `owned` [argument convention](values/ownership.html#argument-conventions), and can't be declared otherwise:

  ```mojo
  # Not supported yet.
  fn read_var_kwargs(read **kwargs: Int): ...
  ```

  ```mojo
  # Not supported yet.
  fn read_var_kwargs(read **kwargs: Int): ...
  ```
- All the variadic keyword arguments must have the same type, and this determines the type of the argument dictionary. For example, if the argument is `**kwargs: Float64` then the argument dictionary will be a `OwnedKwargsDict[Float64]`.
- The argument type must conform to the [`CollectionElement`](https://docs.modular.com/mojo/stdlib/builtin/value/CollectionElement) trait. That is, the type must be both [`Movable`](https://docs.modular.com/mojo/stdlib/builtin/value/Movable) and [`Copyable`](https://docs.modular.com/mojo/stdlib/builtin/value/Copyable).
- Dictionary unpacking is not supported yet:

  ```mojo
  fn takes_dict(d: Dict[String, Int]):
    print_nicely(**d)  # Not supported yet.
  ```

  ```mojo
  fn takes_dict(d: Dict[String, Int]):
    print_nicely(**d)  # Not supported yet.
  ```
- Variadic keyword *parameters* are not supported yet:

  ```mojo
  # Not supported yet.
  fn var_kwparams[**kwparams: Int](): ...
  ```

  ```mojo
  # Not supported yet.
  fn var_kwparams[**kwparams: Int](): ...
  ```

### Positional-only and keyword-only arguments[​](functions.html#positional-only-and-keyword-only-arguments "Direct link to Positional-only and keyword-only arguments")

When defining a function, you can restrict some arguments so that they can only be passed as positional arguments, or they can only be passed as keyword arguments.

To define positional-only arguments, add a slash character (`/`) to the argument list. Any arguments before the `/` are positional-only: they can't be passed as keyword arguments. For example:

```mojo
fn min(a: Int, b: Int, /) -> Int:
    return a if a < b else b
```

```mojo
fn min(a: Int, b: Int, /) -> Int:
    return a if a < b else b
```

This `min()` function can be called with `min(1, 2)` but can't be called using keywords, like `min(a=1, b=2)`.

There are several reasons you might want to write a function with positional-only arguments:

- The argument names aren't meaningful for the the caller.
- You want the freedom to change the argument names later on without breaking backward compatibility.

For example, in the `min()` function, the argument names don't add any real information, and there's no reason to specify arguments by keyword.

For more information on positional-only arguments, see [PEP 570 – Python Positional-Only Parameters](https://peps.python.org/pep-0570/).

Keyword-only arguments are the inverse of positional-only arguments: they can only be specified by keyword. If a function accepts variadic arguments, any arguments defined *after* the variadic arguments are treated as keyword-only. For example:

```mojo
fn sort(*values: Float64, ascending: Bool = True): ...
```

```mojo
fn sort(*values: Float64, ascending: Bool = True): ...
```

In this example, the user can pass any number of `Float64` values, optionally followed by the keyword `ascending` argument:

```mojo
var a = sort(1.1, 6.5, 4.3, ascending=False)
```

```mojo
var a = sort(1.1, 6.5, 4.3, ascending=False)
```

If the function doesn't accept variadic arguments, you can add a single star (`*`) to the argument list to separate the keyword-only arguments:

```mojo
fn kw_only_args(a1: Int, a2: Int, *, double: Bool) -> Int:
    var product = a1 * a2
    if double:
        return product * 2
    else:
        return product
```

```mojo
fn kw_only_args(a1: Int, a2: Int, *, double: Bool) -> Int:
    var product = a1 * a2
    if double:
        return product * 2
    else:
        return product
```

Keyword-only arguments often have default values, but this is not required. If a keyword-only argument doesn't have a default value, it is a *required keyword-only argument*. It must be specified, and it must be specified by keyword.

Any required keyword-only arguments must appear in the signature before any optional keyword-only arguments. That is, arguments appear in the following sequence a function signature:

- Required positional arguments.
- Optional positional arguments.
- Variadic arguments.
- Required keyword-only arguments.
- Optional keyword-only arguments.
- Variadic keyword arguments.

For more information on keyword-only arguments, see [PEP 3102 – Keyword-Only Arguments](https://peps.python.org/pep-3102/).

## Overloaded functions[​](functions.html#overloaded-functions "Direct link to Overloaded functions")

If a `def` function does not specify argument types, then it can accept any data type and decide how to handle each type internally. This is nice when you want expressive APIs that just work by accepting arbitrary inputs, so there's usually no need to write function overloads for a `def` function.

On the other hand, all `fn` functions must specify argument types, so if you want a function to work with different data types, you need to implement separate versions of the function that each specify different argument types. This is called "overloading" a function.

For example, here's an overloaded `add()` function that can accept either `Int` or `String` types:

```mojo
fn add(x: Int, y: Int) -> Int:
    return x + y

fn add(x: String, y: String) -> String:
    return x + y
```

```mojo
fn add(x: Int, y: Int) -> Int:
    return x + y

fn add(x: String, y: String) -> String:
    return x + y
```

If you pass anything other than `Int` or `String` to the `add()` function, you'll get a compiler error. That is, unless `Int` or `String` can implicitly cast the type into their own type. For example, `String` includes an overloaded version of its constructor (`__init__()`) that supports [implicit conversion](lifecycle/life.html#constructors-and-implicit-conversion) from a `StringLiteral` value. Thus, you can also pass a `StringLiteral` to a function that expects a `String`.

When resolving an overloaded function call, the Mojo compiler tries each candidate function and uses the one that works (if only one version works), or it picks the closest match (if it can determine a close match), or it reports that the call is ambiguous (if it can't figure out which one to pick). For details on how Mojo picks the best candidate, see [Overload resolution](functions.html#overload-resolution).

If the compiler can't figure out which function to use, you can resolve the ambiguity by explicitly casting your value to a supported argument type. For example, the following code calls the overloaded `foo()` function, but both implementations accept an argument that supports [implicit conversion](lifecycle/life.html#constructors-and-implicit-conversion) from `StringLiteral`. So, the call to `foo(string)` is ambiguous and creates a compiler error. You can fix this by casting the value to the type you really want:

```mojo
@value
struct MyString:
    @implicit
    fn __init__(out self, string: StringLiteral):
        pass

fn foo(name: String):
    print("String")

fn foo(name: MyString):
    print("MyString")

fn call_foo():
    alias string: StringLiteral = "Hello"
    # foo(string) # error: ambiguous call to 'foo' ... This call is ambiguous because two `foo` functions match it
    foo(MyString(string))
```

```mojo
@value
struct MyString:
    @implicit
    fn __init__(out self, string: StringLiteral):
        pass

fn foo(name: String):
    print("String")

fn foo(name: MyString):
    print("MyString")

fn call_foo():
    alias string: StringLiteral = "Hello"
    # foo(string) # error: ambiguous call to 'foo' ... This call is ambiguous because two `foo` functions match it
    foo(MyString(string))
```

Overloading also works with combinations of both `fn` and `def` functions. For example, you could define multiple `fn` function overloads and then one or more `def` versions that don't specify all argument types, as a fallback.

### Overload resolution[​](functions.html#overload-resolution "Direct link to Overload resolution")

When resolving an overloaded function, Mojo does not consider the return type or other contextual information at the call site—it considers only parameter and argument types and whether the functions are instance methods or static methods.

The overload resolution logic filters for candidates according to the following rules, in order of precedence:

1. Candidates requiring the smallest number of implicit conversions (in both arguments and parameters).
2. Candidates without variadic arguments.
3. Candidates without variadic parameters.
4. Candidates with the shortest parameter signature.
5. Non-`@staticmethod` candidates (over `@staticmethod` ones, if available).

If there is more than one candidate after applying these rules, the overload resolution fails. For example:

```mojo
@register_passable("trivial")
struct MyInt:
    """A type that is implicitly convertible to `Int`."""
    var value: Int

    @implicit
    fn __init__(out self, _a: Int):
        self.value = _a

fn foo[x: MyInt, a: Int]():
    print("foo[x: MyInt, a: Int]()")

fn foo[x: MyInt, y: MyInt]():
    print("foo[x: MyInt, y: MyInt]()")

fn bar[a: Int](b: Int):
    print("bar[a: Int](b: Int)")

fn bar[a: Int](*b: Int):
    print("bar[a: Int](*b: Int)")

fn bar[*a: Int](b: Int):
    print("bar[*a: Int](b: Int)")

fn parameter_overloads[a: Int, b: Int, x: MyInt]():
    # `foo[x: MyInt, a: Int]()` is called because it requires no implicit
    # conversions, whereas `foo[x: MyInt, y: MyInt]()` requires one.
    foo[x, a]()

    # `bar[a: Int](b: Int)` is called because it does not have variadic
    # arguments or parameters.
    bar[a](b)

    # `bar[*a: Int](b: Int)` is called because it has variadic parameters.
    bar[a, a, a](b)

parameter_overloads[1, 2, MyInt(3)]()

struct MyStruct:
    fn __init__(out self):
        pass

    fn foo(mut self):
        print("calling instance method")

    @staticmethod
    fn foo():
        print("calling static method")

fn test_static_overload():
    var a = MyStruct()
    # `foo(mut self)` takes precedence over a static method.
    a.foo()
```

```mojo
@register_passable("trivial")
struct MyInt:
    """A type that is implicitly convertible to `Int`."""
    var value: Int

    @implicit
    fn __init__(out self, _a: Int):
        self.value = _a

fn foo[x: MyInt, a: Int]():
    print("foo[x: MyInt, a: Int]()")

fn foo[x: MyInt, y: MyInt]():
    print("foo[x: MyInt, y: MyInt]()")

fn bar[a: Int](b: Int):
    print("bar[a: Int](b: Int)")

fn bar[a: Int](*b: Int):
    print("bar[a: Int](*b: Int)")

fn bar[*a: Int](b: Int):
    print("bar[*a: Int](b: Int)")

fn parameter_overloads[a: Int, b: Int, x: MyInt]():
    # `foo[x: MyInt, a: Int]()` is called because it requires no implicit
    # conversions, whereas `foo[x: MyInt, y: MyInt]()` requires one.
    foo[x, a]()

    # `bar[a: Int](b: Int)` is called because it does not have variadic
    # arguments or parameters.
    bar[a](b)

    # `bar[*a: Int](b: Int)` is called because it has variadic parameters.
    bar[a, a, a](b)

parameter_overloads[1, 2, MyInt(3)]()

struct MyStruct:
    fn __init__(out self):
        pass

    fn foo(mut self):
        print("calling instance method")

    @staticmethod
    fn foo():
        print("calling static method")

fn test_static_overload():
    var a = MyStruct()
    # `foo(mut self)` takes precedence over a static method.
    a.foo()
```

```output
foo[x: MyInt, a: Int]()
bar[a: Int](b: Int)
bar[*a: Int](b: Int)
```

```output
foo[x: MyInt, a: Int]()
bar[a: Int](b: Int)
bar[*a: Int](b: Int)
```

## Return values[​](functions.html#return-values "Direct link to Return values")

Return value types are declared in the signature using the `-> type` syntax. Values are passed using the `return` keyword, which ends the function and returns the identified value (if any) to the caller.

```mojo
def get_greeting() -> String:
    return "Hello"
```

```mojo
def get_greeting() -> String:
    return "Hello"
```

By default, the value is returned to the caller as an owned value. As with arguments, a return value may be [implicitly converted](lifecycle/life.html#constructors-and-implicit-conversion) to the named return type. For example, the previous example calls `return` with a string literal, `"Hello"`, which is implicitly converted to a `String`.

Returning a reference

A function can also return a mutable or immutable reference using a `ref` return value. For details, see [Lifetimes, origins, and references](values/lifetimes.html).

### Named results[​](functions.html#named-results "Direct link to Named results")

Named function results allow a function to return a value that can't be moved or copied. Named result syntax lets you specify a named, uninitialized variable to return to the caller using the `out` argument convention:

```mojo
def get_name_tag(owned name: String, out name_tag: NameTag):
    name_tag = NameTag(name^)
```

```mojo
def get_name_tag(owned name: String, out name_tag: NameTag):
    name_tag = NameTag(name^)
```

The `out` argument convention identifies an uninitialized variable that the function must initialize. (This is the same as the `out` convention used in [struct constructors](lifecycle/life.html#constructor).) The `out` argument for a named result can appear anywhere in the argument list, but by convention, it should be the last argument in the list.

A function can declare only one return value, whether it's declared using an `out` argument or using the standard `-> type` syntax.

A function with a named result argument doesn't need to include an explicit `return` statement, as shown above. If the function terminates without a `return`, or at a `return` statement with no value, the value of the `out` argument is returned to the caller. If it includes a `return` statement with a value, that value is returned to the caller, as usual.

The fact that a function uses a named result is transparent to the caller. That is, these two signatures are interchangeable to the caller:

```mojo
def get_name_tag(owned name: String) -> NameTag:
    ...
def get_name_tag(owned name: String, out name_tag: NameTag):
    ...
```

```mojo
def get_name_tag(owned name: String) -> NameTag:
    ...
def get_name_tag(owned name: String, out name_tag: NameTag):
    ...
```

In both cases, the call looks like this:

```mojo
tag = get_name_tag("Judith")
```

```mojo
tag = get_name_tag("Judith")
```

Because the return value is assigned to this special `out` variable, it doesn't need to be moved or copied when it's returned to the caller. This means that you can create a function that returns a type that can't be moved or copied, and which takes several steps to initialize:

```mojo
struct ImmovableObject:
    var name: String

    fn __init__(out self, owned name: String):
        self.name = name^

def create_immovable_object(owned name: String, out obj: ImmovableObject):
    obj = ImmovableObject(name^)
    obj.name += "!"
    # obj is implicitly returned

def main():
    my_obj = create_immutable_object("Blob")
```

```mojo
struct ImmovableObject:
    var name: String

    fn __init__(out self, owned name: String):
        self.name = name^

def create_immovable_object(owned name: String, out obj: ImmovableObject):
    obj = ImmovableObject(name^)
    obj.name += "!"
    # obj is implicitly returned

def main():
    my_obj = create_immutable_object("Blob")
```

By contrast, the following function with a standard return value doesn't work:

```mojo
def create_immovable_object2(owned name: String) -> ImmovableObject:
    obj = ImmovableObject(name^)
    obj.name += "!"
    return obj^ # Error: ImmovableObject is not copyable or movable
```

```mojo
def create_immovable_object2(owned name: String) -> ImmovableObject:
    obj = ImmovableObject(name^)
    obj.name += "!"
    return obj^ # Error: ImmovableObject is not copyable or movable
```

Because `create_immovable_object2` uses a local variable to store the object while it's under construction, the return call requires it to be either moved or copied to the callee. This isn't an issue if the newly-created value is returned immediately:

```mojo
def create_immovable_object3(owned name: String) -> ImmovableObject:
    return ImmovableObject(name^) # OK
```

```mojo
def create_immovable_object3(owned name: String) -> ImmovableObject:
    return ImmovableObject(name^) # OK
```

## Raising and non-raising functions[​](functions.html#raising-and-non-raising-functions "Direct link to Raising and non-raising functions")

By default, when a function raises an error, the function terminates immediately and the error propagates to the calling function. If the calling function doesn't handle the error, it continues to propagate up the call stack.

```mojo
def raises_error():
    raise Error("There was an error.")
```

```mojo
def raises_error():
    raise Error("There was an error.")
```

Functions declared with `fn` without the `raises` keyword are *non-raising functions*—that is, they are not allowed to propagate an error to the calling function. If a non-raising function calls a raising function, it **must handle any possible errors.**

```mojo
# This function will not compile
fn unhandled_error():
    raises_error()   # Error: can't call raising function in a non-raising context

fn handle_error():
    try:
        raises_error()
    except e:
        print("Handled an error," e)
```

```mojo
# This function will not compile
fn unhandled_error():
    raises_error()   # Error: can't call raising function in a non-raising context

fn handle_error():
    try:
        raises_error()
    except e:
        print("Handled an error," e)
```

If you're writing code that you expect to use widely or distribute as a package, you may want to use `fn` functions for APIs that don't raise errors to limit the number of places users need to add unnecessary error handling code. For some extremely performance-sensitive code, it may be preferable to avoid runtime error-handling.

For more information, see [Errors, error handling, and context managers](errors.html).



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Ffunctions)

- [Anatomy of a function](functions.html#anatomy-of-a-function)

  - [Arguments and parameters](functions.html#arguments-and-parameters)
- [`def` functions](functions.html#def-functions)

  - [The `object` type](functions.html#the-object-type)
- [`fn` functions](functions.html#fn-functions)
- [Function arguments](functions.html#function-arguments)

  - [Optional arguments](functions.html#optional-arguments)
  - [Keyword arguments](functions.html#keyword-arguments)
  - [Variadic arguments](functions.html#variadic-arguments)
  - [Positional-only and keyword-only arguments](functions.html#positional-only-and-keyword-only-arguments)
- [Overloaded functions](functions.html#overloaded-functions)

  - [Overload resolution](functions.html#overload-resolution)
- [Return values](functions.html#return-values)

  - [Named results](functions.html#named-results)
- [Raising and non-raising functions](functions.html#raising-and-non-raising-functions)











Get started with Mojo | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



# Get started with Mojo

Want to write a GPU function with Mojo? See how to [get started with GPU programming with Mojo](gpu/intro-tutorial.html).

Get ready to learn Mojo! This tutorial is designed to give you a tour of several features of Mojo by building a complete program that does much more than simply printing "Hello, world!"

In fact, we'll build a version of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life), which is a simple simulation to explore self-replicating systems. If you haven't heard of it before, don't worry, it will make sense when you see it in action. Let's just get started so you can learn Mojo programming basics, including the following:

- Using basic built-in types like `Int` and `String`
- Using a `List` to manage a sequence of values
- Creating custom types in the form of structs (data structures)
- Creating and importing Mojo modules
- Importing and using Python libraries

This tutorial might be a little long because there's a lot to learn, but we tried to keep the explanations simple, and we included links along the way for you to go learn more about each topic. If you just want to see the finished code, you can [get it on GitHub](https://github.com/modular/max/tree/main/examples/mojo/life).

System requirements:

Mac

Linux

WSL

## 1. Create a Mojo project with `magic`[​](get-started.html#1-create-a-mojo-project-with-magic "Direct link to 1-create-a-mojo-project-with-magic")

We'll start by using the `magic` CLI to create a virtual environment and generate our initial project directory.

1. If you don't have the [`magic`](https://docs.modular.com/magic/) CLI yet, you can install it on macOS and Ubuntu Linux with this command:

   ```sh
   curl -ssL https://magic.modular.com/ | bash
   ```

   ```sh
   curl -ssL https://magic.modular.com/ | bash
   ```

   Then run the `source` command that's printed in your terminal.
2. Navigate to the directory in which you want to create the project and execute:

   ```bash
   magic init life --format mojoproject
   ```

   ```bash
   magic init life --format mojoproject
   ```

   This creates a project directory named `life`.
3. Let's go into the directory and list its contents:

   ```bash
   cd life
   ```

   ```bash
   cd life
   ```

   ```bash
   ls -A
   ```

   ```bash
   ls -A
   ```

   ```output
   .gitattributes
   .gitignore
   .magic
   magic.lock
   mojoproject.toml
   ```

   ```output
   .gitattributes
   .gitignore
   .magic
   magic.lock
   mojoproject.toml
   ```

You should see that the project directory contains:

- An initial `mojoproject.toml` manifest file, which defines the project dependencies and other features
- A [lock file](https://docs.modular.com/magic#the-magiclock-file) named `magic.lock`, which specifies the transitive dependencies and actual package versions installed in the project's virtual environment

  Never edit the lock file directly. The `magic` command automatically updates the lock file if you edit the manifest file.
- A `.magic` subdirectory containing the conda virtual environment for the project
- Initial `.gitignore` and `.gitattributes` files that you can optionally use if you plan to use `git` version control with the project

Because we used the `--format mojoproject` option when creating the project, `magic` automatically added the `max` package as a dependency, which includes Mojo. Let's verify that our project is configured correctly by checking the version of Mojo that's installed within our project's virtual environment. `magic run` executes a command in the project's virtual environment, so let's use it to execute `mojo --version`:

```bash
magic run mojo --version
```

```bash
magic run mojo --version
```

You should see a version string indicating the version of Mojo installed, which by default should be the latest released version.

Great! Now let's write our first Mojo program.

## 2. Create a "Hello, world" program[​](get-started.html#2-create-a-hello-world-program 'Direct link to 2. Create a "Hello, world" program')

You can use any editor or IDE that you like. If you're using [Visual Studio Code](https://code.visualstudio.com/) you can take advantage of the [Mojo for Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=modular-mojotools.vscode-mojo), which provides features like syntax highlighting, code completion, and debugging support.

In the project directory, create a file named `life.mojo` containing the following lines of code:

life.mojo

```mojo
# My first Mojo program!
def main():
    print("Hello, World!")
```

```mojo
# My first Mojo program!
def main():
    print("Hello, World!")
```

If you've programmed before in Python, this should look familiar.

- We're using the `def` keyword to define a function named `main`.
- You can use any number of spaces or tabs for indentation as long as you use the same indentation for the entire code block. We'll follow the [Python style guide](https://peps.python.org/pep-0008/) and use 4 spaces.
- This [`print()`](https://docs.modular.com/mojo/stdlib/builtin/io/print) function a Mojo built-in so it doesn't require an import.

An executable Mojo program *requires* you to define a no-argument `main()` as its entry point. Running the program automatically invokes the `main()` function, and your program exits when the `main()` function returns.

To run the program, we first need to start a shell session in our project's virtual environment:

```bash
magic shell
```

```bash
magic shell
```

Later on, when you want to exit the virtual environment, just type `exit`.

Now we can use the `mojo` command to run our program.

```bash
mojo life.mojo
```

```bash
mojo life.mojo
```

```output
Hello, World!
```

```output
Hello, World!
```

Mojo is a compiled language, not an interpreted one like Python. So when we run our program like this, `mojo` performs [just-in-time compilation](https://en.wikipedia.org/wiki/Just-in-time_compilation) (JIT) and then runs the result.

We can also compile our program into an executable file using [`mojo build`](https://docs.modular.com/mojo/cli/build) like this:

```bash
mojo build life.mojo
```

```bash
mojo build life.mojo
```

By default, this saves an executable file to the current directory named `life`.

```bash
./life
```

```bash
./life
```

```output
Hello, World!
```

```output
Hello, World!
```

## 3. Create and use variables[​](get-started.html#3-create-and-use-variables "Direct link to 3. Create and use variables")

Let's extend this basic program by prompting the user for their name and including that in the greeting printed. The built-in [`input()`](https://docs.modular.com/mojo/stdlib/builtin/io/input) function accepts an optional [`String`](https://docs.modular.com/mojo/stdlib/collections/string/string/String) argument to use as a prompt, and returns a `String` consisting of the characters the user entered (with the newline character at the end stripped off).

So let's declare a variable, assign the return value from `input()` to it, and build a customized greeting.

life.mojo

```mojo
def main():
    var name: String = input("Who are you? ")
    var greeting: String = "Hi, " + name + "!"
    print(greeting)
```

```mojo
def main():
    var name: String = input("Who are you? ")
    var greeting: String = "Hi, " + name + "!"
    print(greeting)
```

Go ahead and run it:

```bash
mojo life.mojo
```

```bash
mojo life.mojo
```

```output
Who are you? Edna
Hi, Edna!
```

```output
Who are you? Edna
Hi, Edna!
```

Notice that this code uses a `String` type annotation indicating the type of value that the variable can contain. The Mojo compiler performs [static type checking](https://en.wikipedia.org/wiki/Type_system#Static_type_checking), which means that you'll encounter a compile-time error if your code tries to assign a value of one type to a variable of a different type.

Mojo also supports implicitly declared variables, where you simply assign a value to a new variable without using the `var` keyword or indicating its type. So we can replace the code we just entered with the following, and it works exactly the same.

life.mojo

```mojo
def main():
    name = input("Who are you? ")
    greeting = "Hi, " + name + "!"
    print(greeting)
```

```mojo
def main():
    name = input("Who are you? ")
    greeting = "Hi, " + name + "!"
    print(greeting)
```

However, implicitly declared variables still have a fixed type, which Mojo automatically infers from the initial value assignment. So in this example both `name` and `greeting` are inferred as `String` type variables. If you then try to assign an integer value like 42 to the `name` variable, you'll get a compile-time error because of the type mismatch. You can learn more about Mojo variables in the [Variables](variables.html) section of the Mojo manual.

## 4. Use Mojo `Int` and `List` types to represent the game state[​](get-started.html#4-use-mojo-int-and-list-types-to-represent-the-game-state "Direct link to 4-use-mojo-int-and-list-types-to-represent-the-game-state")

As originally envisioned by John Conway, the game's "world" is an infinite, two-dimensional grid of square cells, but for our implementation we'll constrain the grid to a finite size. A drawback to making the edges of the grid a hard boundary is that there are fewer neighboring cells around the edges compared to the interior, which tends to cause die offs. Therefore, we'll model the world as a toroid (a donut shape), where the top row is considered adjacent to the bottom row, and the left column is considered adjacent to the right column. This will come into play later when we implement the algorithm for calculating each subsequent generation.

To keep track of the height and width of our grid we'll use [`Int`](https://docs.modular.com/mojo/stdlib/builtin/int/Int), which represents a signed integer of the [word size](https://en.wikipedia.org/wiki/Word_%28computer_architecture%29) of the CPU, typically 32 or 64 bits.

To represent the state of an individual cell, we'll represent the cell state with an `Int` value of 1 (populated) or 0 (unpopulated). Later, when we need to determine the number of populated neighbors surrounding a cell, we can simply add the values of the neighboring cells.

To represent the state of the entire grid, we need a [collection type](types.html#collection-types). The most appropriate for this use case is [`List`](https://docs.modular.com/mojo/stdlib/collections/list/List), which is a dynamically-sized sequence of values.

All of the values in a Mojo `List` must be the same type so that the Mojo compiler can ensure type safety. (For example, when we retrieve a value from a `List[Int]`, the compiler knows that the value is an `Int` and can verify that we then use it correctly). Mojo collections are implemented as [generic types](https://en.wikipedia.org/wiki/Generic_programming), so that we can indicate the type of values the specific collection will hold by specifying a [type parameter](parameters.1.html#parameterized-structs) in square brackets like this:

```mojo
# The List in row can contain only Int values
row = List[Int]()

# The List in names can contain only String values
names = List[String]()
```

```mojo
# The List in row can contain only Int values
row = List[Int]()

# The List in names can contain only String values
names = List[String]()
```

We can also create a `List` with an initial set of values and let the compiler infer the type.

```mojo
nums = List(12, -7, 64)  # A List[Int] containing 3 Int values
```

```mojo
nums = List(12, -7, 64)  # A List[Int] containing 3 Int values
```

The Mojo `List` type includes the ability to append to the list, pop values out of the list, and access list items using subscript notation. Here's a taste of those operations:

```mojo
nums = List(12, -7, 64)
nums.append(-937)
print("Number of elements in the list:", len(nums))
print("Popping last element off the list:", nums.pop())
print("First element of the list:", nums[0])
print("Second element of the list:", nums[1])
print("Last element of the list:", nums[-1])
```

```mojo
nums = List(12, -7, 64)
nums.append(-937)
print("Number of elements in the list:", len(nums))
print("Popping last element off the list:", nums.pop())
print("First element of the list:", nums[0])
print("Second element of the list:", nums[1])
print("Last element of the list:", nums[-1])
```

```output
Number of elements in the list: 4
Popping last element off the list: -937
First element of the list: 12
Second element of the list: -7
Last element of the list: 64
```

```output
Number of elements in the list: 4
Popping last element off the list: -937
First element of the list: 12
Second element of the list: -7
Last element of the list: 64
```

We can also nest `List`s:

```mojo
grid = List(
    List(11, 22),
    List(33, 44)
)
print("Row 0, Column 0:", grid[0][0])
print("Row 0, Column 1:", grid[0][1])
print("Row 1, Column 0:", grid[1][0])
print("Row 1, Column 1:", grid[1][1])
```

```mojo
grid = List(
    List(11, 22),
    List(33, 44)
)
print("Row 0, Column 0:", grid[0][0])
print("Row 0, Column 1:", grid[0][1])
print("Row 1, Column 0:", grid[1][0])
print("Row 1, Column 1:", grid[1][1])
```

```output
Row 0, Column 0: 11
Row 0, Column 1: 22
Row 1, Column 0: 33
Row 1, Column 1: 44
```

```output
Row 0, Column 0: 11
Row 0, Column 1: 22
Row 1, Column 0: 33
Row 1, Column 1: 44
```

This looks like a good way to represent the state of the grid for our program. So let's update the `main()` function with the following code that defines an 8x8 grid containing the initial state of a "[glider](https://en.wikipedia.org/wiki/Glider_%28Conway%27s_Game_of_Life%29)" pattern.

life.mojo

```mojo
def main():
    num_rows = 8
    num_cols = 8
    glider = List(
        List(0, 1, 0, 0, 0, 0, 0, 0),
        List(0, 0, 1, 0, 0, 0, 0, 0),
        List(1, 1, 1, 0, 0, 0, 0, 0),
        List(0, 0, 0, 0, 0, 0, 0, 0),
        List(0, 0, 0, 0, 0, 0, 0, 0),
        List(0, 0, 0, 0, 0, 0, 0, 0),
        List(0, 0, 0, 0, 0, 0, 0, 0),
        List(0, 0, 0, 0, 0, 0, 0, 0),
    )
```

```mojo
def main():
    num_rows = 8
    num_cols = 8
    glider = List(
        List(0, 1, 0, 0, 0, 0, 0, 0),
        List(0, 0, 1, 0, 0, 0, 0, 0),
        List(1, 1, 1, 0, 0, 0, 0, 0),
        List(0, 0, 0, 0, 0, 0, 0, 0),
        List(0, 0, 0, 0, 0, 0, 0, 0),
        List(0, 0, 0, 0, 0, 0, 0, 0),
        List(0, 0, 0, 0, 0, 0, 0, 0),
        List(0, 0, 0, 0, 0, 0, 0, 0),
    )
```

## 5. Create and use a function to print the grid[​](get-started.html#5-create-and-use-a-function-to-print-the-grid "Direct link to 5. Create and use a function to print the grid")

Now let's create a function to generate a string representation of the game grid that we can print to the terminal.

There are actually two different keywords that we can use to define functions in Mojo: `def` and `fn`. Using `fn` gives us finer level control over the function definition, whereas `def` provides a good set of default behaviors for most use cases.

Let's add the following definition of a function named `grid_str()` to our program. The Mojo compiler doesn't care whether we add our function before or after `main()`, but the convention is to put `main()` at the end.

life.mojo

```mojo
def grid_str(rows: Int, cols: Int, grid: List[List[Int]]) -> String:
    # Create an empty String
    str = String()

    # Iterate through rows 0 through rows-1
    for row in range(rows):
        # Iterate through columns 0 through cols-1
        for col in range(cols):
            if grid[row][col] == 1:
                str += "*"  # If cell is populated, append an asterisk
            else:
                str += " "  # If cell is not populated, append a space
        if row != rows-1:
            str += "\n"     # Add a newline between rows, but not at the end
    return str
```

```mojo
def grid_str(rows: Int, cols: Int, grid: List[List[Int]]) -> String:
    # Create an empty String
    str = String()

    # Iterate through rows 0 through rows-1
    for row in range(rows):
        # Iterate through columns 0 through cols-1
        for col in range(cols):
            if grid[row][col] == 1:
                str += "*"  # If cell is populated, append an asterisk
            else:
                str += " "  # If cell is not populated, append a space
        if row != rows-1:
            str += "\n"     # Add a newline between rows, but not at the end
    return str
```

When we pass a value to a Mojo function, the default behavior for `def` is that an argument is treated as a read-only reference to the value. However, if the Mojo compiler determines that there is code in the function that can change the value, then the argument gets a copy of the original value assigned to it. As we'll see later, we can specify a different behavior by including an explicit [argument convention](values/ownership.html#argument-conventions). In contrast, when you define a function with `fn` Mojo simply treats each argument as a read-only reference by default unless you provide an explicit argument convention.

Each argument name is followed by a type annotation indicating the type of value you can pass to the argument. Just like when you're assigning a value to a variable, you'll encounter a compile-time error if your code tries to pass a value of one type to an argument of a different type. Finally, the `-> String` following the argument list indicates that this function has a `String` type return value.

In the body of the function, we generate a `String` by appending an asterisk for each populated cell and a space for each unpopulated cell, separating each row of the grid with a newline character. We use nested `for` loops to iterate through each row and column of the grid, using [`range()`](https://docs.modular.com/mojo/stdlib/builtin/range/range) to generate a sequence of integers from 0 up to but not including the given end value. Then we append the correct characters to the `String` representation. See [Control flow](control-flow.html) for more information on `if`, `for`, and other control flow structures in Mojo.

As described in [The `for` statement](control-flow.html#the-for-statement) section of the Mojo manual, it's possible to iterate over the elements of a `List` directly instead of iterating over the values of a `range()` and then accessing the `List` elements by their numeric index. However, iterating over a `List` directly currently returns a *reference* to the element, which then requires using the dereference operator, `[]`, to access the actual element value. The code looks like this:

```mojo
nums = List(12, -7, 64)
for value in nums:
    print("Value:", value[])
```

```mojo
nums = List(12, -7, 64)
for value in nums:
    print("Value:", value[])
```

This behavior is likely to change in the future, at which point iterating over a `List` won't require using the dereference operator. But for this tutorial, we'll stick with iterating over a `range()` and accessing the `List` elements by their numeric index.

Now that we've defined our `grid_str()` function, let's invoke it from `main()`.

life.mojo

```mojo
def main():
    ...
    result = grid_str(num_rows, num_cols, glider)
    print(result)
```

```mojo
def main():
    ...
    result = grid_str(num_rows, num_cols, glider)
    print(result)
```

Then run the program to see the result:

```bash
mojo life.mojo
```

```bash
mojo life.mojo
```

```output
 *
  *
***

```

```output
 *
  *
***

```

We can see that the position of the asterisks matches the location of the 1s in the `glider` grid.

## 6. Create a module and define a custom type[​](get-started.html#6-create-a-module-and-define-a-custom-type "Direct link to 6. Create a module and define a custom type")

We're currently passing three arguments to `grid_str()` to describe the size and state of the grid to print. A better approach would be to define our own custom type that encapsulates all information about the grid. Then any function that needs to manipulate a grid can accept just a single argument. We can do this by defining a Mojo *struct*, which is a custom data structure.

A [Mojo struct](structs.html) is a custom type consisting of:

- Fields, which are variables containing the data associated with the structure
- Methods, which are functions that we can optionally define to manipulate instances of the struct that we create

Mojo structs are similar to classes. However, Mojo structs do *not* support inheritance. Mojo doesn't support classes at this time.

We could define the struct in our existing `life.mojo` source file, but let's create a separate *module* for the struct. A module is simply a Mojo source file containing struct and function definitions that can be imported into other Mojo source files. To learn more about creating and importing modules, see the [Modules and packages](packages.html) section of the Mojo manual .

So create a new source file named `gridv1.mojo` in the project directory containing the following definition of a struct named `Grid` consisting of three fields:

gridv1.mojo

```mojo
@value
struct Grid():
    var rows: Int
    var cols: Int
    var data: List[List[Int]]
```

```mojo
@value
struct Grid():
    var rows: Int
    var cols: Int
    var data: List[List[Int]]
```

Mojo requires you to declare all of the fields in the struct definition. You can't add fields dynamically at run-time. You must declare the type for each field, but you cannot assign a value as part of the field declaration. Instead, the [constructor](lifecycle/life.html#constructor) is responsible for initializing the value of all fields.

Mojo structs support several different [lifecycle methods](lifecycle/index.html) defining the behavior when an instance of the struct is created, moved, copied, and destroyed. For structs that are basic aggregations of other types and don't require custom resource management or lifecycle behaviors, you can simply add the [`@value`](structs.html#value-decorator) decorator to your struct definition to have the Mojo compiler automatically generate lifecycle methods for you.

Because we used the `@value` decorator, `Grid` includes a "member-wise" [constructor](lifecycle/life.html#constructor) . The constructor's arguments are the same names and types as the struct's fields and appear in the same order. So this means that we can create an instance of `Grid` like this:

```mojo
my_grid = Grid(2, 2, List(List(0, 1), List(1, 1)))
```

```mojo
my_grid = Grid(2, 2, List(List(0, 1), List(1, 1)))
```

We can then access the field values with "dot" syntax like this:

```mojo
print("Rows:", my_grid.rows)
```

```mojo
print("Rows:", my_grid.rows)
```

```output
Rows: 2
```

```output
Rows: 2
```

## 7. Import a module and use our custom `Grid` type[​](get-started.html#7-import-a-module-and-use-our-custom-grid-type "Direct link to 7-import-a-module-and-use-our-custom-grid-type")

Now let's edit `life.mojo` to import `Grid` from our new module and update our code to use it.

life.mojo

```mojo
from gridv1 import Grid

def grid_str(grid: Grid) -> String:
    # Create an empty String
    str = String()

    # Iterate through rows 0 through rows-1
    for row in range(grid.rows):
        # Iterate through columns 0 through cols-1
        for col in range(grid.cols):
            if grid.data[row][col] == 1:
                str += "*"  # If cell is populated, append an asterisk
            else:
                str += " "  # If cell is not populated, append a space
        if row != grid.rows - 1:
            str += "\n"     # Add a newline between rows, but not at the end
    return str

def main():
    glider = List(
        List(0, 1, 0, 0, 0, 0, 0, 0),
        List(0, 0, 1, 0, 0, 0, 0, 0),
        List(1, 1, 1, 0, 0, 0, 0, 0),
        List(0, 0, 0, 0, 0, 0, 0, 0),
        List(0, 0, 0, 0, 0, 0, 0, 0),
        List(0, 0, 0, 0, 0, 0, 0, 0),
        List(0, 0, 0, 0, 0, 0, 0, 0),
        List(0, 0, 0, 0, 0, 0, 0, 0),
    )
    start = Grid(8, 8, glider)
    result = grid_str(start)
    print(result)
```

```mojo
from gridv1 import Grid

def grid_str(grid: Grid) -> String:
    # Create an empty String
    str = String()

    # Iterate through rows 0 through rows-1
    for row in range(grid.rows):
        # Iterate through columns 0 through cols-1
        for col in range(grid.cols):
            if grid.data[row][col] == 1:
                str += "*"  # If cell is populated, append an asterisk
            else:
                str += " "  # If cell is not populated, append a space
        if row != grid.rows - 1:
            str += "\n"     # Add a newline between rows, but not at the end
    return str

def main():
    glider = List(
        List(0, 1, 0, 0, 0, 0, 0, 0),
        List(0, 0, 1, 0, 0, 0, 0, 0),
        List(1, 1, 1, 0, 0, 0, 0, 0),
        List(0, 0, 0, 0, 0, 0, 0, 0),
        List(0, 0, 0, 0, 0, 0, 0, 0),
        List(0, 0, 0, 0, 0, 0, 0, 0),
        List(0, 0, 0, 0, 0, 0, 0, 0),
        List(0, 0, 0, 0, 0, 0, 0, 0),
    )
    start = Grid(8, 8, glider)
    result = grid_str(start)
    print(result)
```

At this point we've made several changes to improve the structure of our program, but the output should remain the same.

```bash
mojo life.mojo
```

```bash
mojo life.mojo
```

```output
 *
  *
***

```

```output
 *
  *
***

```

## 8. Implement `grid_str()` as a method[​](get-started.html#8-implement-grid_str-as-a-method "Direct link to 8-implement-grid_str-as-a-method")

Our `grid_str()` function is really a utility function unique to the `Grid` type. So rather than defining it as a standalone function, it makes more sense to define it as part of the `Grid` type as a method.

To do so, move the function into `gridv1.mojo` and edit it to look like this (or simply copy the code below into `gridv1.mojo`):

gridv1.mojo

```mojo
@value
struct Grid():
    var rows: Int
    var cols: Int
    var data: List[List[Int]]

    def grid_str(self) -> String:
        # Create an empty String
        str = String()

        # Iterate through rows 0 through rows-1
        for row in range(self.rows):
            # Iterate through columns 0 through cols-1
            for col in range(self.cols):
                if self.data[row][col] == 1:
                    str += "*"  # If cell is populated, append an asterisk
                else:
                    str += " "  # If cell is not populated, append a space
            if row != self.rows - 1:
                str += "\n"     # Add a newline between rows, but not at the end
        return str
```

```mojo
@value
struct Grid():
    var rows: Int
    var cols: Int
    var data: List[List[Int]]

    def grid_str(self) -> String:
        # Create an empty String
        str = String()

        # Iterate through rows 0 through rows-1
        for row in range(self.rows):
            # Iterate through columns 0 through cols-1
            for col in range(self.cols):
                if self.data[row][col] == 1:
                    str += "*"  # If cell is populated, append an asterisk
                else:
                    str += " "  # If cell is not populated, append a space
            if row != self.rows - 1:
                str += "\n"     # Add a newline between rows, but not at the end
        return str
```

So aside from moving the code from one source file to another, there are a few other changes that we made.

- The function definition is indented to indicate that it's a method defined by the `Grid` struct. This also changes the way that we invoke the function. Instead of `grid_str(my_grid)` we now write `my_grid.grid_str()`.
- We've changed the argument name to `self`. When you invoke an instance method, Mojo automatically passes the instance as the first argument, followed by any explicit arguments that you provide. Although we could use any name we like for this argument, the convention is to call it `self`.
- We've deleted the argument's type annotation. The compiler knows that the first argument of the method is an instance of the struct, so it doesn't require an explicit type annotation.

Now that we've refactored the function into an instance method, we also need to update the code in `life.mojo` where we invoke it from `main()`:

life.mojo

```mojo
def main():
    ...
    start = Grid(8, 8, glider)
    print(start.grid_str())
```

```mojo
def main():
    ...
    start = Grid(8, 8, glider)
    print(start.grid_str())
```

Once again, our refactoring has improved the structure of our code, but it still produces the same output. You can verify that by running the program again.

## 9. Implement support for the `StringableRaising` trait[​](get-started.html#9-implement-support-for-the-stringableraising-trait "Direct link to 9-implement-support-for-the-stringableraising-trait")

You can convert most Mojo types to `String` using `String(my_val)` to produce a `String` representation of that instance. But you'll get an error if you try to do that with our current implementation of `Grid`. So let's fix that.

Because the Mojo compiler performs static type checking, a `String` constructor can accept a value only if its type implements some required behavior—in this case, it only accepts types that can generate a `String` representation.

To enable that, Mojo supports [*traits*](traits.html). A trait is a set of requirements in the form of one or more method signatures. A type can *conform* to that trait by implementing all of the method signatures declared in the trait. Then we can have a function that indicates that it accepts values of any type that conform to a specified trait. (This type of function is sometimes referred to as a [*generic* function](parameters.1.html#parameters-and-generics).)

In the case of `String()`, it requires a type to conform to either the `Stringable` or `StringableRaising` trait. Each trait requires a conforming type to implement a `__str__()` method that returns a `String` representation. The only difference between the two traits is that `Stringable` requires that the method *cannot* raise an error, whereas `StringableRaising` indicates that the method *might* raise an error. (To learn more, read [The `Stringable`, `Representable`, and `Writable` traits](traits.html#the-stringable-representable-and-writable-traits).)

Our `grid_str()` method already returns a `String` representation, so it looks like we just have to rename it to `__str__()`. But we also need to indicate which trait `Grid` conforms to. In our case, it's `StringableRaising` because we used `def` to define the method. If you define a function or method with `def`, the compiler *always* assumes that the function *can* raise an error. In contrast, if you define a function or method with `fn` you must explicitly indicate with a `raises` keyword if it can raise an error.

So in `gridv1.mojo` we need to update the `Grid` declaration to indicate that the type conforms to `StringableRaising` and rename the `grid_str()` method to `__str__()`:

gridv1.mojo

```mojo
@value
struct Grid(StringableRaising):
    ...
    def __str__(self) -> String:
        ...
```

```mojo
@value
struct Grid(StringableRaising):
    ...
    def __str__(self) -> String:
        ...
```

Now let's verify that `String()` works with an instance of `Grid`.

life.mojo

```mojo
def main():
    ...
    start = Grid(8, 8, glider)
    print(String(start))
```

```mojo
def main():
    ...
    start = Grid(8, 8, glider)
    print(String(start))
```

If you run the program again, you should still see the same glider pattern as before.

```bash
mojo life.mojo
```

```bash
mojo life.mojo
```

```output
 *
  *
***

```

```output
 *
  *
***

```

## 10. Implement methods to support indexing[​](get-started.html#10-implement-methods-to-support-indexing "Direct link to 10. Implement methods to support indexing")

Looking at the implementation of `__str__()` you'll notice that we use `self.data[row][col]` to retrieve the value of a cell in the grid. And if `my_grid` is an instance of `Grid`, we would use `my_grid.data[row][col]` to refer to a cell in the grid. This breaks a fundamental principle of encapsulation in that we need to know that `Grid` stores the game state in a field called `data`, and that field is a `List[List[Int]]`. If we later decide to change the internal implementation of `Grid`, then there could be a lot of code that would need to be changed.

A cleaner approach is to provide "getter" and "setter" methods to access cell values. We could simply define methods like `get_cell()` and `set_cell()`, but this is a good opportunity to show how we can define the behavior of built-in operators for custom Mojo types. Specifically, we'll implement support for indexing, so that we can refer to a cell with syntax like `my_grid[row, col]`. This will be useful when we implement support for evolving the state of the grid.

As described in [Operators, expressions, and dunder methods](operators.html), Mojo allows us to define the behavior of many of the built-in operators for a custom type by implementing special *dunder* (double underscore) methods. In the case of indexing, the two methods are `__getitem__()` and `__setitem__()`. So let's add the following methods to the `Grid` struct in `gridv1.mojo`:

gridv1.mojo

```mojo
@value
struct Grid(StringableRaising):
    ...
    def __getitem__(self, row: Int, col: Int) -> Int:
        return self.data[row][col]

    def __setitem__(mut self, row: Int, col: Int, value: Int) -> None:
        self.data[row][col] = value
```

```mojo
@value
struct Grid(StringableRaising):
    ...
    def __getitem__(self, row: Int, col: Int) -> Int:
        return self.data[row][col]

    def __setitem__(mut self, row: Int, col: Int, value: Int) -> None:
        self.data[row][col] = value
```

The implementation of `__getitem__()` is easy. For the given values of `row` and `col` we just need to retrieve and return the corresponding value from the nested `List[List[Int]]` stored in the `data` field of the instance.

The body of `__setitem__()` is similarly straightforward. We just take the given `value` and store it in the corresponding `row` and `col` in `data`. One thing new in the declaration is that we set the return type to `None` to indicate that the method doesn't have a return value. But more notable is that we've added the `mut` [argument convention](values/ownership.html#argument-conventions) to the `self` argument to explicitly tell the Mojo compiler that we want to mutate the state of the current instance. If we were to omit `mut`, we would get an error because the compiler would default to read-only access for the argument.

Now that we've implemented these methods, we can update `__str__()` to use indexing syntax to access the cell value.

gridv1.mojo

```mojo
@value
struct Grid(StringableRaising):
    ...
    def __str__(self) -> String:
        ...
            # Iterate through columns 0 through cols-1
            for col in range(self.cols):
                if self[row, col] == 1:
                    ...
```

```mojo
@value
struct Grid(StringableRaising):
    ...
    def __str__(self) -> String:
        ...
            # Iterate through columns 0 through cols-1
            for col in range(self.cols):
                if self[row, col] == 1:
                    ...
```

Click here to see the complete `gridv1.mojo` so far:

gridv1.mojo

```mojo
@value
struct Grid(StringableRaising):
    var rows: Int
    var cols: Int
    var data: List[List[Int]]

    def __str__(self) -> String:
        # Create an empty String
        str = String()

        # Iterate through rows 0 through rows-1
        for row in range(self.rows):
            # Iterate through columns 0 through cols-1
            for col in range(self.cols):
                if self[row, col] == 1:
                    str += "*"  # If cell is populated, append an asterisk
                else:
                    str += " "  # If cell is not populated, append a space
            if row != self.rows - 1:
                str += "\n"     # Add a newline between rows, but not at the end
        return str

    def __getitem__(self, row: Int, col: Int) -> Int:
        return self.data[row][col]

    def __setitem__(mut self, row: Int, col: Int, value: Int) -> None:
        self.data[row][col] = value
```

```mojo
@value
struct Grid(StringableRaising):
    var rows: Int
    var cols: Int
    var data: List[List[Int]]

    def __str__(self) -> String:
        # Create an empty String
        str = String()

        # Iterate through rows 0 through rows-1
        for row in range(self.rows):
            # Iterate through columns 0 through cols-1
            for col in range(self.cols):
                if self[row, col] == 1:
                    str += "*"  # If cell is populated, append an asterisk
                else:
                    str += " "  # If cell is not populated, append a space
            if row != self.rows - 1:
                str += "\n"     # Add a newline between rows, but not at the end
        return str

    def __getitem__(self, row: Int, col: Int) -> Int:
        return self.data[row][col]

    def __setitem__(mut self, row: Int, col: Int, value: Int) -> None:
        self.data[row][col] = value
```

Our refactoring hasn't changed our program's behavior, but it's still a good idea to run it to be sure that we don't have any errors in our code.

## 11. Define a static method to generate random grids[​](get-started.html#11-define-a-static-method-to-generate-random-grids "Direct link to 11. Define a static method to generate random grids")

So far, we've used the glider to build the basic functionality of our `Grid` type. But what's much more interesting is to start with a grid in a random state and see how it evolves over time.

Let's add a *static method* named `random()` to the `Grid` struct to generate and return an instance of `Grid` with a random state. A static method doesn't operate on specific instances of the type, so it can be invoked as a utility function. We indicate that a method is a static method by using the `@staticmethod` decorator.

gridv1.mojo

```mojo
import random

@value
struct Grid(StringableRaising):
    ...
    @staticmethod
    def random(rows: Int, cols: Int) -> Self:
        # Seed the random number generator using the current time.
        random.seed()

        data = List[List[Int]]()

        for row in range(rows):
            row_data = List[Int]()
            for col in range(cols):
                # Generate a random 0 or 1 and append it to the row.
                row_data.append(Int(random.random_si64(0, 1)))
            data.append(row_data)

        return Self(rows, cols, data)
```

```mojo
import random

@value
struct Grid(StringableRaising):
    ...
    @staticmethod
    def random(rows: Int, cols: Int) -> Self:
        # Seed the random number generator using the current time.
        random.seed()

        data = List[List[Int]]()

        for row in range(rows):
            row_data = List[Int]()
            for col in range(cols):
                # Generate a random 0 or 1 and append it to the row.
                row_data.append(Int(random.random_si64(0, 1)))
            data.append(row_data)

        return Self(rows, cols, data)
```

At the top of the file we're importing the `random` package from the Mojo standard library. It includes several functions related to random number generation.

By default, the [pseudorandom number generator](https://en.wikipedia.org/wiki/Pseudorandom_number_generator) used by the Mojo standard library currently uses a fixed seed. This means that it generates the same sequence of numbers unless you provide a different seed, which is useful for testing purposes. But for this application we want to call `random.seed()` to set a seed value based on the current time, which gives us a unique value every time.

Then we create an empty `List[List[Int]]` that we populate with a random initial state. For each cell, we call [`random.random_si64()`](https://docs.modular.com/mojo/stdlib/random/random/random_si64), which returns a random integer value from the provided minimum and maximum values of 0 and 1, respectively. This function actually returns a value of type `Int64`, which is a signed 64-bit integer value. As described in [Numeric types](types.html#numeric-types), this is *not* the same as the `Int` type whose precision is dependent on the native word size of the system. Therefore we're passing this value to the [`Int()`](https://docs.modular.com/mojo/stdlib/builtin/int/Int/#__init__) constructor, which explicitly converts a numeric value to an `Int`.

The return type of the method is `Self`, which is an alias for the type of the struct. This is a convenient shortcut if the actual name of the struct is long or includes parameters.

The last line uses `Self()` to invoke the struct's constructor and return a newly created instance with random data.

Now we can update the `main()` function in `life.mojo` to create a random `Grid` and print it.

life.mojo

```mojo
...

def main():
    start = Grid.random(8, 16)
    print(String(start))
```

```mojo
...

def main():
    start = Grid.random(8, 16)
    print(String(start))
```

Run the program a few times to verify that it generates a different grid each time.

```bash
mojo life.mojo
```

```bash
mojo life.mojo
```

```output
*** *      ****
*  ****   ******
* * *****
*  * ** **
 *    * ** ****
* **  * * * ***
 * * **  **  **
  * ***** **
```

```output
*** *      ****
*  ****   ******
* * *****
*  * ** **
 *    * ** ****
* **  * * * ***
 * * **  **  **
  * ***** **
```

## 12. Implement a method to evolve the grid[​](get-started.html#12-implement-a-method-to-evolve-the-grid "Direct link to 12. Implement a method to evolve the grid")

It's finally time to let our world evolve. We'll implement an `evolve()` method to calculate the state of the grid for the next generation. One option would be to do an in-place modification of the existing `Grid` instance. But instead we'll have `evolve()` return a new instance of `Grid` for the next generation.

gridv1.mojo

```mojo
...
struct Grid(StringableRaising):
    ...
    def evolve(self) -> Self:
        next_generation = List[List[Int]]()

        for row in range(self.rows):
            row_data = List[Int]()

            # Calculate neighboring row indices, handling "wrap-around"
            row_above = (row - 1) % self.rows
            row_below = (row + 1) % self.rows

            for col in range(self.cols):
                # Calculate neighboring column indices, handling "wrap-around"
                col_left = (col - 1) % self.cols
                col_right = (col + 1) % self.cols

                # Determine number of populated cells around the current cell
                num_neighbors = (
                    self[row_above, col_left]
                    + self[row_above, col]
                    + self[row_above, col_right]
                    + self[row, col_left]
                    + self[row, col_right]
                    + self[row_below, col_left]
                    + self[row_below, col]
                    + self[row_below, col_right]
                )

                # Determine the state of the current cell for the next generation
                new_state = 0
                if self[row, col] == 1 and (num_neighbors == 2 or num_neighbors == 3):
                    new_state = 1
                elif self[row, col] == 0 and num_neighbors == 3:
                    new_state = 1
                row_data.append(new_state)

            next_generation.append(row_data)

        return Self(self.rows, self.cols, next_generation)
```

```mojo
...
struct Grid(StringableRaising):
    ...
    def evolve(self) -> Self:
        next_generation = List[List[Int]]()

        for row in range(self.rows):
            row_data = List[Int]()

            # Calculate neighboring row indices, handling "wrap-around"
            row_above = (row - 1) % self.rows
            row_below = (row + 1) % self.rows

            for col in range(self.cols):
                # Calculate neighboring column indices, handling "wrap-around"
                col_left = (col - 1) % self.cols
                col_right = (col + 1) % self.cols

                # Determine number of populated cells around the current cell
                num_neighbors = (
                    self[row_above, col_left]
                    + self[row_above, col]
                    + self[row_above, col_right]
                    + self[row, col_left]
                    + self[row, col_right]
                    + self[row_below, col_left]
                    + self[row_below, col]
                    + self[row_below, col_right]
                )

                # Determine the state of the current cell for the next generation
                new_state = 0
                if self[row, col] == 1 and (num_neighbors == 2 or num_neighbors == 3):
                    new_state = 1
                elif self[row, col] == 0 and num_neighbors == 3:
                    new_state = 1
                row_data.append(new_state)

            next_generation.append(row_data)

        return Self(self.rows, self.cols, next_generation)
```

We start out with an empty `List[List[Int]]` to represent the state of the next generation. Then we use nested `for` loops to iterate over each row and each column of the existing `Grid` to determine the state of each cell in the next generation.

For each cell in the grid we need to count the number of populated neighboring cells. Because we're modeling the world as a toroid, we need to consider the top and bottom rows as adjacent and the left-most and right-most columns as adjacent. So as we iterate through each row and column, we're using the modulo operator, `%`, to handle "wrap-around" when we calculate the indices of the rows above and below and the columns to the left and right of the current cell. (For example, if there are 8 rows, then `-1 % 8` is 7.)

Then we apply the Game of Life rules that determines if the current cell is populated (1) or unpopulated (0) for the next generation:

- A populated cell with either 2 or 3 populated neighbors remains populated in the next generation
- An unpopulated cell with exactly 3 populated neighbors becomes populated in the next generation
- All other cells become unpopulated in the next generation

After calculating the state of the next generation, we use `Self()` to create an new instance of `Grid`, and return the newly created instance.

Now that we can evolve the grid, let's use it in `life.mojo`. We'll add a `run_display()` function to control the game's main loop:

- Display the current `Grid`
- Prompt the user to continue or quit
- Break out of the loop if the user enters `q`
- Otherwise, calculate the next generation and loop again

Then we'll update `main()` to create a random initial `Grid` and pass it to `run_display()`. Here is the updated version of `life.mojo`:

life.mojo

```mojo
from gridv1 import Grid

def run_display(owned grid: Grid) -> None:
    while True:
        print(String(grid))
        print()
        if input("Enter 'q' to quit or press <Enter> to continue: ") == "q":
            break
        grid = grid.evolve()

def main():
    start = Grid.random(16, 16)
    run_display(start)
```

```mojo
from gridv1 import Grid

def run_display(owned grid: Grid) -> None:
    while True:
        print(String(grid))
        print()
        if input("Enter 'q' to quit or press <Enter> to continue: ") == "q":
            break
        grid = grid.evolve()

def main():
    start = Grid.random(16, 16)
    run_display(start)
```

Run the program and verify that each call to `evolve()` successfully produces a new generation.

So now we have a working version of the Game of Life, but the terminal interface is not very pretty. Let's spice things up with a nicer graphical user interface, using a Python library.

## 13. Import and use a Python package[​](get-started.html#13-import-and-use-a-python-package "Direct link to 13. Import and use a Python package")

Mojo lets you import Python modules, call Python functions, and interact with Python objects from Mojo code. To demonstrate this capability, we're going to use a Python package called [pygame](https://www.pygame.org) to create and manage a graphical user interface for our Game of Life program.

First, we need to update our `mojoproject.toml` file to add a dependency on Python and the `pygame` package. So in the project directory, execute the following command from the terminal:

```bash
magic add "python>=3.11,<3.13" "pygame>=2.6.1,<3"
```

```bash
magic add "python>=3.11,<3.13" "pygame>=2.6.1,<3"
```

When you use Python code and packages as part of your Mojo program, you create a run-time dependency on a compatible Python runtime and packages. Building an executable version of your program with `mojo build` does *not* incorporate a Python runtime or Python packages into the resulting executable file. These run-time Python dependencies must be provided by the environment where you run the executable. The easiest way to ensure this requirement is to deploy and run your Mojo executable in a virtual environment, such as one managed by [Magic](https://docs.modular.com/magic/) or [conda](https://docs.conda.io/).

You can import a Python module in Mojo using [`Python.import_module()`](https://docs.modular.com/mojo/stdlib/python/python/Python#import_module). This returns a reference to the module in the form of a `PythonObject` wrapper. You must store the reference in a variable so that you can then access the functions and objects in the module. For example:

```mojo
from python import Python

def run_display():
    # This is roughly equivalent to Python's `import pygame`
    pygame = Python.import_module("pygame")
    pygame.init()
```

```mojo
from python import Python

def run_display():
    # This is roughly equivalent to Python's `import pygame`
    pygame = Python.import_module("pygame")
    pygame.init()
```

Because Mojo doesn't support globally scoped variables, you must either import a Python module into each Mojo function that needs to use it or else pass the `PythonObject` wrapped module as an argument between functions.

You can learn more about importing and using Python modules in Mojo by reading [Python integration](python/index.html).

Once we import `pygame`, we can call its APIs as if we were writing Python code. For this project, we'll use `pygame` to create a new window and draw the whole game UI. This requires a complete rewrite of the `run_display()` function. Take a look at the updated code for `life.mojo` and we'll explain more of it below:

life.mojo

```mojo
from gridv1 import Grid
from python import Python
import time

def run_display(
    owned grid: Grid,
    window_height: Int = 600,
    window_width: Int = 600,
    background_color: String = "black",
    cell_color: String = "green",
    pause: Float64 = 0.1,
) -> None:
    # Import the pygame Python package
    pygame = Python.import_module("pygame")

    # Initialize pygame modules
    pygame.init()

    # Create a window and set its title
    window = pygame.display.set_mode((window_height, window_width))
    pygame.display.set_caption("Conway's Game of Life")

    cell_height = window_height / grid.rows
    cell_width = window_width / grid.cols
    border_size = 1
    cell_fill_color = pygame.Color(cell_color)
    background_fill_color = pygame.Color(background_color)

    running = True
    while running:
        # Poll for events
        event = pygame.event.poll()
        if event.type == pygame.QUIT:
            # Quit if the window is closed
            running = False
        elif event.type == pygame.KEYDOWN:
            # Also quit if the user presses <Escape> or 'q'
            if event.key == pygame.K_ESCAPE or event.key == pygame.K_q:
                running = False

        # Clear the window by painting with the background color
        window.fill(background_fill_color)

        # Draw each live cell in the grid
        for row in range(grid.rows):
            for col in range(grid.cols):
                if grid[row, col]:
                    x = col * cell_width + border_size
                    y = row * cell_height + border_size
                    width = cell_width - border_size
                    height = cell_height - border_size
                    pygame.draw.rect(
                        window, cell_fill_color, (x, y, width, height)
                    )

        # Update the display
        pygame.display.flip()

        # Pause to let the user appreciate the scene
        time.sleep(pause)

        # Next generation
        grid = grid.evolve()

    # Shut down pygame cleanly
    pygame.quit()

def main():
    start = Grid.random(128, 128)
    run_display(start)
```

```mojo
from gridv1 import Grid
from python import Python
import time

def run_display(
    owned grid: Grid,
    window_height: Int = 600,
    window_width: Int = 600,
    background_color: String = "black",
    cell_color: String = "green",
    pause: Float64 = 0.1,
) -> None:
    # Import the pygame Python package
    pygame = Python.import_module("pygame")

    # Initialize pygame modules
    pygame.init()

    # Create a window and set its title
    window = pygame.display.set_mode((window_height, window_width))
    pygame.display.set_caption("Conway's Game of Life")

    cell_height = window_height / grid.rows
    cell_width = window_width / grid.cols
    border_size = 1
    cell_fill_color = pygame.Color(cell_color)
    background_fill_color = pygame.Color(background_color)

    running = True
    while running:
        # Poll for events
        event = pygame.event.poll()
        if event.type == pygame.QUIT:
            # Quit if the window is closed
            running = False
        elif event.type == pygame.KEYDOWN:
            # Also quit if the user presses <Escape> or 'q'
            if event.key == pygame.K_ESCAPE or event.key == pygame.K_q:
                running = False

        # Clear the window by painting with the background color
        window.fill(background_fill_color)

        # Draw each live cell in the grid
        for row in range(grid.rows):
            for col in range(grid.cols):
                if grid[row, col]:
                    x = col * cell_width + border_size
                    y = row * cell_height + border_size
                    width = cell_width - border_size
                    height = cell_height - border_size
                    pygame.draw.rect(
                        window, cell_fill_color, (x, y, width, height)
                    )

        # Update the display
        pygame.display.flip()

        # Pause to let the user appreciate the scene
        time.sleep(pause)

        # Next generation
        grid = grid.evolve()

    # Shut down pygame cleanly
    pygame.quit()

def main():
    start = Grid.random(128, 128)
    run_display(start)
```

Each argument for `run_display()` other than `grid` has a default value associated with it (for example, the default `window_height` is 600 pixels). If you don't explicitly pass a value for an argument when you invoke `run_display()`, Mojo uses the default value specified in the function definition.

After importing the `pygame` module, we call `pygame.init()` to initialize all the pygame subsystems.

The `set_mode()` function creates and initializes a window, with the height and width passed as a Mojo tuple of two values. This returns a [`PythonObject`](https://docs.modular.com/mojo/stdlib/python/python_object/PythonObject) wrapper for the window, which we can then use to call functions and set attributes to manipulate the window. (For more information about interacting with Python objects from Mojo, see [Python types](python/types.html).)

The bulk of the `run_display()` function is a loop that uses `pygame` to poll for events like key presses and mouse clicks. If it detects that the user presses `q` or the `<Escape>` key or closes the display window, it ends the program with `pygame.quit()`. Otherwise, it clears the window and then iterates through all cells in the grid to display the populated cells. After sleeping for `pause` seconds, it evolves the grid to the next generation and loops again.

So it's finally time to try it out.

```bash
mojo life.mojo
```

```bash
mojo life.mojo
```

Now when you run the program you should see a new window appear on screen displaying your evolving grid. We now have a fully functional implementation of the Game of Life with a nice interface. We've come quite a way from just displaying a few asterisks on the terminal!

![game_of_life_screen.png](../../assets/images/game-of-life-screen-81619e4fafbe8a01781da892c9348d74.png)

To quit the program press the `q` or `<Escape>` key, or close the window.

And now that we're done with the tutorial, exit our project's virtual environment:

```bash
exit
```

```bash
exit
```

## Summary[​](get-started.html#summary "Direct link to Summary")

Congratulations on writing a complete Mojo application from scratch! Along the way, you got a taste of:

- Using Magic to create, build, and run a Mojo program
- Using Mojo built-in types like `Int`, `String`, and `List`
- Creating and using variables and functions
- Using control structures like `if`, `while`, and `for`
- Defining and using a custom Mojo struct
- Creating and importing a Mojo module
- Using modules from the Mojo standard library
- Importing and using a Python module

## Next steps[​](get-started.html#next-steps "Direct link to Next steps")

Now that you've seen a bit of what Mojo can do, here are some suggested next steps:

- Read through the [Mojo manual](index.html) for more detail about all of Mojo's features.
- Check out [Get started with GPU programming with Mojo and the MAX Driver](gpu/intro-tutorial.html) for an example of how to write GPU functions with Mojo.
- Explore more Mojo [examples](https://github.com/modular/max/tree/main/examples/mojo) in the public [MAX GitHub repository](https://github.com/modular/max).



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fget-started)

- [1. Create a Mojo project with `magic`](get-started.html#1-create-a-mojo-project-with-magic)
- [2. Create a "Hello, world" program](get-started.html#2-create-a-hello-world-program)
- [3. Create and use variables](get-started.html#3-create-and-use-variables)
- [4. Use Mojo `Int` and `List` types to represent the game state](get-started.html#4-use-mojo-int-and-list-types-to-represent-the-game-state)
- [5. Create and use a function to print the grid](get-started.html#5-create-and-use-a-function-to-print-the-grid)
- [6. Create a module and define a custom type](get-started.html#6-create-a-module-and-define-a-custom-type)
- [7. Import a module and use our custom `Grid` type](get-started.html#7-import-a-module-and-use-our-custom-grid-type)
- [8. Implement `grid_str()` as a method](get-started.html#8-implement-grid_str-as-a-method)
- [9. Implement support for the `StringableRaising` trait](get-started.html#9-implement-support-for-the-stringableraising-trait)
- [10. Implement methods to support indexing](get-started.html#10-implement-methods-to-support-indexing)
- [11. Define a static method to generate random grids](get-started.html#11-define-a-static-method-to-generate-random-grids)
- [12. Implement a method to evolve the grid](get-started.html#12-implement-a-method-to-evolve-the-grid)
- [13. Import and use a Python package](get-started.html#13-import-and-use-a-python-package)
- [Summary](get-started.html#summary)
- [Next steps](get-started.html#next-steps)





[Get the code](https://github.com/modular/max/tree/main/examples/mojo/life)





[Get the code](https://github.com/modular/max/tree/main/examples/mojo/life)



Mojo Manual | Modular ![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e) pre



# Mojo Manual

Welcome to the Mojo Manual, a complete guide to the Mojo🔥 programming language!

Mojo is designed to solve a variety of AI development challenges that no other language can, because Mojo is the first programming language built from the ground-up with [MLIR](https://mlir.llvm.org/) (a compiler infrastructure that's ideal for heterogeneous hardware, from CPUs and GPUs, to various AI ASICs). We also designed Mojo as the best way to extend Python because we love Python and its community, but we couldn't realistically enhance Python to do all the things we wanted. For a longer discussion on this topic, read [Why Mojo](https://docs.modular.com/mojo/why-mojo).

Beware that Mojo is still a very young language, so there's a lot that hasn't been built yet. Likewise, there's a lot of documentation that hasn't been written yet. But we're excited to share Mojo with you and [get your feedback](https://www.modular.com/community).

## Contents[​](index.html#contents "Direct link to Contents")

- **Get started**

  - [Why Mojo](https://docs.modular.com/mojo/why-mojo)
  - [Get started with Mojo](get-started.html)
- **Language basics**

  - [Overview](basics.html)
  - [Functions](functions.html)
  - [Variables](variables.html)
  - [Types](types.html)
  - [Operators and expressions](operators.html)
  - [Control flow](control-flow.html)
  - [Errors and context managers](errors.html)
  - [Structs](structs.html)
  - [Modules and packages](packages.html)
- **Value ownership**

  - [Intro to value ownership](values/index.html)
  - [Value semantics](values/value-semantics.html)
  - [Ownership](values/ownership.html)
  - [Lifetimes, origins, and references](values/lifetimes.html)
- **Value lifecycle**

  - [Intro to value lifecycle](lifecycle/index.html)
  - [Life of a value](lifecycle/life.html)
  - [Death of a value](lifecycle/death.html)
- **Traits and parameters**

  - [Traits](traits.html)
  - [Parameterization: compile-time metaprogramming](parameters.1.html)
- **Pointers**

  - [Intro to pointers](pointers/index.html)
  - [Unsafe pointers](pointers/unsafe-pointers.html)
- **GPU programming**

  - [Get started with GPU programming with Mojo and the MAX Driver](gpu/intro-tutorial.html)
  - [GPU basics](gpu/basics.html)
- **Layouts and LayoutTensor**

  - [Introduction to Layouts](layout/layouts.html)
- **Python**

  - [Python integration](python/index.html)
  - [Python types](python/types.html)
- **Tools**

  - [Debugging](https://docs.modular.com/mojo/tools/debugging)
  - [GPU debugging](https://docs.modular.com/mojo/tools/debugging)
  - [Testing](https://docs.modular.com/mojo/tools/testing)
- **Project information**

  - [Roadmap and sharp edges](https://docs.modular.com/mojo/roadmap)
  - [Changelog](https://docs.modular.com/mojo/changelog)
  - [FAQ](https://docs.modular.com/mojo/faq)



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2F)

- [Contents](index.html#contents)











Operators, expressions, and dunder methods | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



# Operators, expressions, and dunder methods

Mojo includes a variety of operators for manipulating values of different types. Generally, the operators are equivalent to those found in Python, though many operators also work with additional Mojo types such as `SIMD` vectors. Additionally, Mojo allows you to define the behavior of most of these operators for your own custom types by implementing special *dunder* (double underscore) methods.

This document contains the following three sections:

- [Operators and expressions](operators.html#operators-and-expressions) discusses Mojo's built-in operators and how they work with commonly used Mojo types.
- [Implement operators for custom types](operators.html#implement-operators-for-custom-types) describes the dunder methods that you can implement to support using operators with custom structs that you create.
- [An example of implementing operators for a custom type](operators.html#an-example-of-implementing-operators-for-a-custom-type) shows a progressive example of writing a custom struct with support for several operators.

## Operators and expressions[​](operators.html#operators-and-expressions "Direct link to Operators and expressions")

This section lists the operators that Mojo supports, their order or precedence and associativity, and describes how these operators behave with several commonly used built-in types.

### Operator precedence and associativity[​](operators.html#operator-precedence-and-associativity "Direct link to Operator precedence and associativity")

The table below lists the various Mojo operators, along with their order of precedence and associativity (also referred to as grouping). This table lists operators from the highest precedence to the lowest precedence.

| **Operators**                                                    | **Description**                                             | **Associativity (Grouping)** |
|------------------------------------------------------------------|-------------------------------------------------------------|------------------------------|
| `()`                                                             | Parenthesized expression                                    | Left to right                |
| `x[index]`, `x[index:index]`                                     | Subscripting, slicing                                       | Left to right                |
| `**`                                                             | Exponentiation                                              | Right to left                |
| `+x`, `-x`, `~x`                                                 | Positive, negative, bitwise NOT                             | Right to left                |
| `*`, `@`, `/`, `//`, `%`                                         | Multiplication, matrix, division, floor division, remainder | Left to right                |
| `+`, `–`                                                         | Addition and subtraction                                    | Left to right                |
| `<<`, `>>`                                                       | Shifts                                                      | Left to right                |
| `&`                                                              | Bitwise AND                                                 | Left to right                |
| `^`                                                              | Bitwise XOR                                                 | Left to right                |
| `|`                                                              | Bitwise OR                                                  | Left to right                |
| `in`, `not in`, `is`, `is not`, `<`, `<=`, `>`, `>=`, `!=`, `==` | Comparisons, membership tests, identity tests               | Left to Right                |
| `not x`                                                          | Boolean NOT                                                 | Right to left                |
| `x and y`                                                        | Boolean AND                                                 | Left to right                |
| `x or y`                                                         | Boolean OR                                                  | Left to right                |
| `if-else`                                                        | Conditional expression                                      | Right to left                |
| `:=`                                                             | Assignment expression (walrus operator)                     | Right to left                |

Mojo supports the same operators as Python (plus a few extensions), and they have the same precedence levels. For example, the following arithmetic expression evaluates to 40:

```mojo
5 + 4 * 3 ** 2 - 1
```

```mojo
5 + 4 * 3 ** 2 - 1
```

It is equivalent to the following parenthesized expression to explicitly control the order of evaluation:

```mojo
(5 + (4 * (3 ** 2))) - 1
```

```mojo
(5 + (4 * (3 ** 2))) - 1
```

Associativity defines how operators of the same precedence level are grouped into expressions. The table indicates whether operators of a given level are left- or right-associative. For example, multiplication and division are left associative, so the following expression results in a value of 3:

```mojo
3 * 4 / 2 / 2
```

```mojo
3 * 4 / 2 / 2
```

It is equivalent to the following parenthesized expression to explicitly control the order of evaluation:

```mojo
((3 * 4) / 2) / 2
```

```mojo
((3 * 4) / 2) / 2
```

Whereas in the following, exponentiation operators are right associative resulting in a value of 264,144:

```mojo
4 ** 3 ** 2
```

```mojo
4 ** 3 ** 2
```

It is equivalent to the following parenthesized expression to explicitly control the order of evaluation:

```mojo
4 ** (3 ** 2)
```

```mojo
4 ** (3 ** 2)
```

Mojo also uses the caret (`^`) as the [*transfer sigil*](values/ownership.html#transfer-arguments-owned-and-). In expressions where its use might be ambiguous, Mojo treats the character as the bitwise XOR operator. For example, `x^+1` is treated as `(x)^(+1)`.

### Arithmetic and bitwise operators[​](operators.html#arithmetic-and-bitwise-operators "Direct link to Arithmetic and bitwise operators")

[Numeric types](types.html#numeric-types) describes the different numeric types provided by the Mojo standard library. The arithmetic and bitwise operators have slightly different behavior depending on the types of values provided.

#### `Int` and `UInt` values[​](operators.html#int-and-uint-values "Direct link to int-and-uint-values")

The [`Int`](https://docs.modular.com/mojo/stdlib/builtin/int/Int) and [`UInt`](https://docs.modular.com/mojo/stdlib/builtin/uint/UInt) types represent signed and unsigned integers of the [word size](https://en.wikipedia.org/wiki/Word_%28computer_architecture%29) of the CPU, typically 64 bits or 32 bits.

The `Int` and `UInt` types support all arithmetic operators except matrix multiplication (`@`), as well as all bitwise and shift operators. If both operands to a binary operator are `Int` values the result is an `Int`, if both operands are `UInt` values the result is a `UInt`, and if one operand is `Int` and the other `UInt` the result is an `Int`. The one exception for these types is true division, `/`, which always returns a `Float64` type value.

```mojo
var a_int: Int = -7
var b_int: Int = 4
sum_int = a_int + b_int  # Result is type Int
print("Int sum:", sum_int)

var i_uint: UInt = 9
var j_uint: UInt = 8
sum_uint = i_uint + j_uint  # Result is type UInt
print("UInt sum:", sum_uint)

sum_mixed = a_int + i_uint  # Result is type Int
print("Mixed sum:", sum_mixed)

quotient_int = a_int / b_int  # Result is type Float64
print("Int quotient:", quotient_int)
quotient_uint = i_uint / j_uint  # Result is type Float64
print("UInt quotient:", quotient_uint)
```

```mojo
var a_int: Int = -7
var b_int: Int = 4
sum_int = a_int + b_int  # Result is type Int
print("Int sum:", sum_int)

var i_uint: UInt = 9
var j_uint: UInt = 8
sum_uint = i_uint + j_uint  # Result is type UInt
print("UInt sum:", sum_uint)

sum_mixed = a_int + i_uint  # Result is type Int
print("Mixed sum:", sum_mixed)

quotient_int = a_int / b_int  # Result is type Float64
print("Int quotient:", quotient_int)
quotient_uint = i_uint / j_uint  # Result is type Float64
print("UInt quotient:", quotient_uint)
```

```output
Int sum: -3
UInt sum: 17
Mixed sum: 2
Int quotient: -1.75
UInt quotient: 1.125
```

```output
Int sum: -3
UInt sum: 17
Mixed sum: 2
Int quotient: -1.75
UInt quotient: 1.125
```

#### `SIMD` values[​](operators.html#simd-values "Direct link to simd-values")

The Mojo standard library defines the [`SIMD`](https://docs.modular.com/mojo/stdlib/builtin/simd/SIMD) type to represent a fixed-size array of values that can fit into a processor's register. This allows you to take advantage of [single instruction, multiple data](https://en.wikipedia.org/wiki/Single_instruction,_multiple_data) operations in hardware to efficiently process multiple values in parallel. `SIMD` values of a numeric [`DType`](https://docs.modular.com/mojo/stdlib/builtin/dtype/DType) support all arithmetic operators except for matrix multiplication (`@`), though the left shift (`<<`) and right shift (`>>`) operators support only integral types. Additionally, `SIMD` values of an integral or boolean type support all bitwise operators. `SIMD` values apply the operators in an *elementwise* fashion, as shown in the following example:

```mojo
simd1 = SIMD[DType.int32, 4](2, 3, 4, 5)
simd2 = SIMD[DType.int32, 4](-1, 2, -3, 4)
simd3 = simd1 * simd2
print(simd3)
```

```mojo
simd1 = SIMD[DType.int32, 4](2, 3, 4, 5)
simd2 = SIMD[DType.int32, 4](-1, 2, -3, 4)
simd3 = simd1 * simd2
print(simd3)
```

```output
[-2, 6, -12, 20]
```

```output
[-2, 6, -12, 20]
```

[`Scalar`](https://docs.modular.com/mojo/stdlib/builtin/simd/) values are simply aliases for single-element `SIMD` vectors, so `Float16` is just an alias for `SIMD[DType.float16, 1]`. Therefore `Scalar` values support the same set of arithmetic and bitwise operators.

```mojo
var f1: Float16 = 2.5
var f2: Float16 = -4.0
var f3 = f1 * f2  # Implicitly of type Float16
print(f3)
```

```mojo
var f1: Float16 = 2.5
var f2: Float16 = -4.0
var f3 = f1 * f2  # Implicitly of type Float16
print(f3)
```

```output
-10.0
```

```output
-10.0
```

When using these operators on `SIMD` values, Mojo requires both to have the same size and `DType`, and the result is a `SIMD` of the same size and `DType`. The operators do *not* automatically widen lower precision `SIMD` values to higher precision. This means that the `DType` of each value must be the same or else the result is a compilation error.

```mojo
var i8: Int8 = 8
var f64: Float64 = 64.0
result = i8 * f64
```

```mojo
var i8: Int8 = 8
var f64: Float64 = 64.0
result = i8 * f64
```

```output
error: invalid call to '__mul__': could not deduce parameter 'type' of parent struct 'SIMD'
    result = i8 * f64
             ~~~^~~~~
```

```output
error: invalid call to '__mul__': could not deduce parameter 'type' of parent struct 'SIMD'
    result = i8 * f64
             ~~~^~~~~
```

If you need to perform an arithmetic or bitwise operator on two `SIMD` values of different types, you can explicitly convert a value to the desired type either by invoking its [`cast()`](https://docs.modular.com/mojo/stdlib/builtin/simd/SIMD#cast) method or by passing it as an argument to the constructor of the target type.

```mojo
simd1 = SIMD[DType.float32, 4](2.2, 3.3, 4.4, 5.5)
simd2 = SIMD[DType.int16, 4](-1, 2, -3, 4)
simd3 = simd1 * simd2.cast[DType.float32]()  # Convert with cast() method
print("simd3:", simd3)
simd4 = simd2 + SIMD[DType.int16, 4](simd1)  # Convert with SIMD constructor
print("simd4:", simd4)
```

```mojo
simd1 = SIMD[DType.float32, 4](2.2, 3.3, 4.4, 5.5)
simd2 = SIMD[DType.int16, 4](-1, 2, -3, 4)
simd3 = simd1 * simd2.cast[DType.float32]()  # Convert with cast() method
print("simd3:", simd3)
simd4 = simd2 + SIMD[DType.int16, 4](simd1)  # Convert with SIMD constructor
print("simd4:", simd4)
```

```output
simd3: [-2.2, 6.6, -13.200001, 22.0]
simd4: [1, 5, 1, 9]
```

```output
simd3: [-2.2, 6.6, -13.200001, 22.0]
simd4: [1, 5, 1, 9]
```

One exception is that the exponentiation operator, `**`, is overloaded so that you can specify an `Int` type exponent. All values in the `SIMD` are exponentiated to the same power.

```mojo
base_simd = SIMD[DType.float64, 4](1.1, 2.2, 3.3, 4.4)
var power: Int = 2
pow_simd = base_simd ** power  # Result is SIMD[DType.float64, 4]
print(pow_simd)
```

```mojo
base_simd = SIMD[DType.float64, 4](1.1, 2.2, 3.3, 4.4)
var power: Int = 2
pow_simd = base_simd ** power  # Result is SIMD[DType.float64, 4]
print(pow_simd)
```

```output
[1.2100000000000002, 4.8400000000000007, 10.889999999999999, 19.360000000000003]
```

```output
[1.2100000000000002, 4.8400000000000007, 10.889999999999999, 19.360000000000003]
```

There are three operators related to division:

- `/`, the "true division" operator, performs floating point division for `SIMD` values with a floating point `DType`. For `SIMD` values with an integral `DType`, true division *truncates* the quotient to an integral result.

  ```mojo
  num_float16 = SIMD[DType.float16, 4](3.5, -3.5, 3.5, -3.5)
  denom_float16 = SIMD[DType.float16, 4](2.5, 2.5, -2.5, -2.5)

  num_int32 = SIMD[DType.int32, 4](5, -6, 7, -8)
  denom_int32 = SIMD[DType.int32, 4](2, 3, -4, -5)

  # Result is SIMD[DType.float16, 4]
  true_quotient_float16 = num_float16 / denom_float16
  print("True float16 division:", true_quotient_float16)

  # Result is SIMD[DType.int32, 4]
  true_quotient_int32 = num_int32 / denom_int32
  print("True int32 division:", true_quotient_int32)
  ```

  ```mojo
  num_float16 = SIMD[DType.float16, 4](3.5, -3.5, 3.5, -3.5)
  denom_float16 = SIMD[DType.float16, 4](2.5, 2.5, -2.5, -2.5)

  num_int32 = SIMD[DType.int32, 4](5, -6, 7, -8)
  denom_int32 = SIMD[DType.int32, 4](2, 3, -4, -5)

  # Result is SIMD[DType.float16, 4]
  true_quotient_float16 = num_float16 / denom_float16
  print("True float16 division:", true_quotient_float16)

  # Result is SIMD[DType.int32, 4]
  true_quotient_int32 = num_int32 / denom_int32
  print("True int32 division:", true_quotient_int32)
  ```

  ```output
  True float16 division: [1.4003906, -1.4003906, -1.4003906, 1.4003906]
  True int32 division: [2, -2, -1, 1]
  ```

  ```output
  True float16 division: [1.4003906, -1.4003906, -1.4003906, 1.4003906]
  True int32 division: [2, -2, -1, 1]
  ```
- `//`, the "floor division" operator, performs division and *rounds down* the result to the nearest integer. The resulting `SIMD` is still the same type as the original operands. For example:

  ```mojo
  # Result is SIMD[DType.float16, 4]
  var floor_quotient_float16 = num_float16 // denom_float16
  print("Floor float16 division:", floor_quotient_float16)

  # Result is SIMD[DType.int32, 4]
  var floor_quotient_int32 = num_int32 // denom_int32
  print("Floor int32 division:", floor_quotient_int32)
  ```

  ```mojo
  # Result is SIMD[DType.float16, 4]
  var floor_quotient_float16 = num_float16 // denom_float16
  print("Floor float16 division:", floor_quotient_float16)

  # Result is SIMD[DType.int32, 4]
  var floor_quotient_int32 = num_int32 // denom_int32
  print("Floor int32 division:", floor_quotient_int32)
  ```

  ```output
  Floor float16 division: [1.0, -2.0, -2.0, 1.0]
  Floor int32 division: [2, -2, -2, 1]
  ```

  ```output
  Floor float16 division: [1.0, -2.0, -2.0, 1.0]
  Floor int32 division: [2, -2, -2, 1]
  ```
- `%`, the modulo operator, returns the remainder after dividing the numerator by the denominator an integral number of times. The relationship between the `//` and `%` operators can be defined as `num == denom * (num // denom) + (num % denom)`. For example:

  ```mojo
  # Result is SIMD[DType.float16, 4]
  var remainder_float16 = num_float16 % denom_float16
  print("Modulo float16:", remainder_float16)

  # Result is SIMD[DType.int32, 4]
  var remainder_int32 = num_int32 % denom_int32
  print("Modulo int32:", remainder_int32)

  print()

  # Result is SIMD[DType.float16, 4]
  var result_float16 = denom_float16 * floor_quotient_float16 + remainder_float16
  print("Result float16:", result_float16)

  # Result is SIMD[DType.int32, 4]
  var result_int32 = denom_int32 * floor_quotient_int32 + remainder_int32
  print("Result int32:", result_int32)
  ```

  ```mojo
  # Result is SIMD[DType.float16, 4]
  var remainder_float16 = num_float16 % denom_float16
  print("Modulo float16:", remainder_float16)

  # Result is SIMD[DType.int32, 4]
  var remainder_int32 = num_int32 % denom_int32
  print("Modulo int32:", remainder_int32)

  print()

  # Result is SIMD[DType.float16, 4]
  var result_float16 = denom_float16 * floor_quotient_float16 + remainder_float16
  print("Result float16:", result_float16)

  # Result is SIMD[DType.int32, 4]
  var result_int32 = denom_int32 * floor_quotient_int32 + remainder_int32
  print("Result int32:", result_int32)
  ```

  ```output
  Modulo float16: [1.0, 1.5, -1.5, -1.0]
  Modulo int32: [1, 0, -1, -3]

  Result float16: [3.5, -3.5, 3.5, -3.5]
  Result int32: [5, -6, 7, -8]
  ```

  ```output
  Modulo float16: [1.0, 1.5, -1.5, -1.0]
  Modulo int32: [1, 0, -1, -3]

  Result float16: [3.5, -3.5, 3.5, -3.5]
  Result int32: [5, -6, 7, -8]
  ```

#### `IntLiteral` and `FloatLiteral` values[​](operators.html#intliteral-and-floatliteral-values "Direct link to intliteral-and-floatliteral-values")

[`IntLiteral`](https://docs.modular.com/mojo/stdlib/builtin/int_literal/IntLiteral) and [`FloatLiteral`](https://docs.modular.com/mojo/stdlib/builtin/float_literal/FloatLiteral) are compile-time, numeric values. When they are used in a compile-time context, they are arbitrary-precision values. When they are used in a run-time context, they are materialized as `Int` and `Float64` type values, respectively.

As an example, the following code causes a compile-time error because the calculated `IntLiteral` value is too large to store in an `Int` variable:

```mojo
alias big_int = (1 << 65) + 123456789  # IntLiteral
var too_big_int: Int = big_int
print("Result:", too_big_int)
```

```mojo
alias big_int = (1 << 65) + 123456789  # IntLiteral
var too_big_int: Int = big_int
print("Result:", too_big_int)
```

```output
note: integer value 36893488147542560021 requires 67 bits to store, but the destination bit width is only 64 bits wide
```

```output
note: integer value 36893488147542560021 requires 67 bits to store, but the destination bit width is only 64 bits wide
```

However in the following example, taking that same `IntLiteral` value, dividing by the `IntLiteral` 10 and then assigning the result to an `Int` variable compiles and runs successfully, because the final `IntLiteral` quotient can fit in a 64-bit `Int`.

```mojo
alias big_int = (1 << 65) + 123456789  # IntLiteral
var not_too_big_int: Int = big_int // 10
print("Result:", not_too_big_int)
```

```mojo
alias big_int = (1 << 65) + 123456789  # IntLiteral
var not_too_big_int: Int = big_int // 10
print("Result:", not_too_big_int)
```

```output
Result: 3689348814754256002
```

```output
Result: 3689348814754256002
```

In a compile-time context, `IntLiteral` and `FloatLiteral` values support all arithmetic operators *except* exponentiation (`**`), and `IntLiteral` values support all bitwise and shift operators. In a run-time context, materialized `IntLiteral` values are `Int` values and therefore support the same operators as `Int`, and materialized `FloatLiteral` values are `Float64` values and therefore support the same operators as `Float64`.

### Comparison operators[​](operators.html#comparison-operators "Direct link to Comparison operators")

Mojo supports a standard set of comparison operators: `==`, `!=`, `<`, `<=`, `>`, and `>=`. However their behavior depends on the type of values being compared.

- `Int`, `UInt`, `IntLiteral`, and any type that can be implicitly converted to `Int` or `UInt` do standard numerical comparison with a `Bool` result.
- Two `SIMD` values can be compared only if they are the same `DType` and size. (If you need to compare two `SIMD` values of different types, you can explicitly convert a value so that they have the same type either by invoking its [`cast()`](https://docs.modular.com/mojo/stdlib/builtin/simd/SIMD#cast) method or by passing it as an argument to the constructor of the target type.) Mojo performs elementwise comparison with a `SIMD[DType.bool]` result. For example:

  ```mojo
  simd1 = SIMD[DType.int16, 4](-1, 2, -3, 4)
  simd2 = SIMD[DType.int16, 4](0, 1, 2, 3)
  simd3 = simd1 > simd2  # SIMD[DType.bool, 4]
  print(simd3)
  ```

  ```mojo
  simd1 = SIMD[DType.int16, 4](-1, 2, -3, 4)
  simd2 = SIMD[DType.int16, 4](0, 1, 2, 3)
  simd3 = simd1 > simd2  # SIMD[DType.bool, 4]
  print(simd3)
  ```

  ```output
  [False, True, False, True]
  ```

  ```output
  [False, True, False, True]
  ```
- An integral type `SIMD` can be compared to an `IntLiteral`, `Int`, `UInt`, or any type that can be implicitly converted to `Int` or `UInt`. Mojo performs elementwise comparison against the value provided and produces a `SIMD[DType.bool]` result. For example:

  ```mojo
  simd1 = SIMD[DType.int16, 4](-1, 2, -3, 4)
  simd2 = simd1 > 2  # SIMD[DType.bool, 4]
  print(simd2)
  ```

  ```mojo
  simd1 = SIMD[DType.int16, 4](-1, 2, -3, 4)
  simd2 = simd1 > 2  # SIMD[DType.bool, 4]
  print(simd2)
  ```

  ```output
  [False, False, False, True]
  ```

  ```output
  [False, False, False, True]
  ```
- A floating point type `SIMD` can be compared to a `FloatLiteral`, `IntLiteral`, `Int`, `UInt`, or any type that can be implicitly converted to `Int` or `UInt`. Mojo performs elementwise comparison against the value provided and produces a `SIMD[DType.bool]` result. For example:

  ```mojo
  simd1 = SIMD[DType.float32, 4](1.1, -2.2, 3.3, -4.4)
  simd2 = simd1 > 0.5  # SIMD[DType.bool, 4]
  print(simd2)
  ```

  ```mojo
  simd1 = SIMD[DType.float32, 4](1.1, -2.2, 3.3, -4.4)
  simd2 = simd1 > 0.5  # SIMD[DType.bool, 4]
  print(simd2)
  ```

  ```output
  [True, False, True, False]
  ```

  ```output
  [True, False, True, False]
  ```
- `Scalar` values are simply aliases for single-element `SIMD` vectors. Therefore, the same restrictions apply against comparing different types. In other words, you can't compare a `Float16` value to a `Float32` value unless you convert the values to the same type. You can convert a `Scalar` value by passing it as an argument to the constructor of the target type:

  ```mojo
  var float1: Float16 = 12.345         # SIMD[DType.float16, 1]
  var float2: Float32 = 0.5            # SIMD[DType.float32, 1]
  result = Float32(float1) > float2    # Result is SIMD[DType.bool, 1]
  print(result)
  ```

  ```mojo
  var float1: Float16 = 12.345         # SIMD[DType.float16, 1]
  var float2: Float32 = 0.5            # SIMD[DType.float32, 1]
  result = Float32(float1) > float2    # Result is SIMD[DType.bool, 1]
  print(result)
  ```

  ```output
  True
  ```

  ```output
  True
  ```

  Note that the result of comparing a `Scalar` value is a `SIMD[DType.bool, 1]`, which is not the same as a `Bool` value. However, `SIMD` values of size 1 implement the `Boolable` trait, which provides for implicit conversion to a `Bool` value when used in a boolean expression.
- `String` and `StringLiteral` values can be compared using standard lexicographical ordering, producing a `Bool`. (For example, "Zebra" is treated as less than "ant" because upper case letters occur before lower case letters in the character encoding.) String comparisons are discussed further in the [String operators](operators.html#string-operators) section below.

Several other types in the Mojo standard library support various comparison operators, in particular the equality and inequality comparisons. Consult the [API documentation](https://docs.modular.com/mojo/lib) for a type to determine whether any comparison operators are supported.

### String operators[​](operators.html#string-operators "Direct link to String operators")

As discussed in [Strings](types.html#strings), the [`String`](https://docs.modular.com/mojo/stdlib/collections/string/string/String) type represents a mutable string value. In contrast, the [`StringLiteral`](https://docs.modular.com/mojo/stdlib/builtin/string_literal/StringLiteral) type represents a literal string that is embedded into your compiled program. At run-time a `StringLiteral` is loaded into memory as a constant that persists for the duration of your program's execution.

The `String` type has a constructor that accepts a `StringLiteral` value, which means that a `StringLiteral` can be implicitly converted to a `String` at run-time if you pass it as an argument to a function or assign it to a `String` type variable. You also can use the [`String` constructor](https://docs.modular.com/mojo/stdlib/collections/string/string/String#__init__) to explicitly convert the `StringLiteral` to a `String` value at run-time.

#### String concatenation[​](operators.html#string-concatenation "Direct link to String concatenation")

The `+` operator performs string concatenation. The `StringLiteral` type supports compile-time string concatenation.

```mojo
alias last_name = "Curie"

# Compile-time StringLiteral alias
alias marie = "Marie " + last_name
print(marie)

# Compile-time concatenation assigned to a run-time StringLiteral type variable
pierre = "Pierre " + last_name
print(pierre)
```

```mojo
alias last_name = "Curie"

# Compile-time StringLiteral alias
alias marie = "Marie " + last_name
print(marie)

# Compile-time concatenation assigned to a run-time StringLiteral type variable
pierre = "Pierre " + last_name
print(pierre)
```

```output
Marie Curie
Pierre Curie
```

```output
Marie Curie
Pierre Curie
```

With the `String` type the `+` operator performs run-time string concatenation to produce a new `String` value. You can also concatenate a `String` and a `StringLiteral` to produce a new `String` result.

```mojo
var first_name: String = "Grace"
var last_name: String = " Hopper"

# String type result
programmer = first_name + last_name
print(programmer)

# String type result
singer = first_name + " Slick"
print(singer)
```

```mojo
var first_name: String = "Grace"
var last_name: String = " Hopper"

# String type result
programmer = first_name + last_name
print(programmer)

# String type result
singer = first_name + " Slick"
print(singer)
```

```output
Grace Hopper
Grace Slick
```

```output
Grace Hopper
Grace Slick
```

When concatenating multiple values together to form a `String`, using the multi-argument `String()` constructor is more performant than using multiple `+` concatenation operators and can improve code readability. For example, instead of writing this:

```mojo
result = "The point at (" + String(x) + ", " + String(y) + ")"
```

```mojo
result = "The point at (" + String(x) + ", " + String(y) + ")"
```

you can write:

```mojo
result = String("The point at (", x, ", ", y, ")")
```

```mojo
result = String("The point at (", x, ", ", y, ")")
```

#### String replication[​](operators.html#string-replication "Direct link to String replication")

The `*` operator replicates a `String` a specified number of times. For example:

```mojo
var str1: String = "la"
str2 = str1 * 5
print(str2)
```

```mojo
var str1: String = "la"
str2 = str1 * 5
print(str2)
```

```output
lalalalala
```

```output
lalalalala
```

`StringLiteral` supports the `*` operator for both compile-time and run-time string replication. The following examples perform compile-time string replication resulting in `StringLiteral` values:

```mojo
alias divider1 = "=" * 40
alias symbol = "#"
alias divider2 = symbol * 40

# You must define the following function using `fn` because an alias
# initializer cannot call a function that can potentially raise an error.
fn generate_divider(char: StringLiteral, repeat: IntLiteral) -> StringLiteral:
    return char * repeat

alias divider3 = generate_divider("~", 40)  # Evaluated at compile-time

print(divider1)
print(divider2)
print(divider3)
```

```mojo
alias divider1 = "=" * 40
alias symbol = "#"
alias divider2 = symbol * 40

# You must define the following function using `fn` because an alias
# initializer cannot call a function that can potentially raise an error.
fn generate_divider(char: StringLiteral, repeat: IntLiteral) -> StringLiteral:
    return char * repeat

alias divider3 = generate_divider("~", 40)  # Evaluated at compile-time

print(divider1)
print(divider2)
print(divider3)
```

```output
========================================
########################################
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

```output
========================================
########################################
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

In contrast, the following examples perform run-time string replication resulting in `String` values:

```mojo
repeat = 40
div1 = "^" * repeat
print(div1)
print("_" * repeat)
```

```mojo
repeat = 40
div1 = "^" * repeat
print(div1)
print("_" * repeat)
```

```output
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
________________________________________
```

```output
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
________________________________________
```

#### String comparison[​](operators.html#string-comparison "Direct link to String comparison")

`String` and `StringLiteral` values can be compared using standard lexicographical ordering, producing a `Bool`. For example, "Zebra" is treated as less than "ant" because upper case letters occur before lower case letters in the character encoding.

```mojo
var animal: String = "bird"

is_cat_eq = "cat" == animal
print('Is "cat" equal to "{}"?'.format(animal), is_cat_eq)

is_cat_ne = "cat" != animal
print('Is "cat" not equal to "{}"?'.format(animal), is_cat_ne)

is_bird_eq = "bird" == animal
print('Is "bird" equal to "{}"?'.format(animal), is_bird_eq)

is_cat_gt = "CAT" > animal
print('Is "CAT" greater than "{}"?'.format(animal), is_cat_gt)

is_ge_cat = animal >= "CAT"
print('Is "{}" greater than or equal to "CAT"?'.format(animal), is_ge_cat)
```

```mojo
var animal: String = "bird"

is_cat_eq = "cat" == animal
print('Is "cat" equal to "{}"?'.format(animal), is_cat_eq)

is_cat_ne = "cat" != animal
print('Is "cat" not equal to "{}"?'.format(animal), is_cat_ne)

is_bird_eq = "bird" == animal
print('Is "bird" equal to "{}"?'.format(animal), is_bird_eq)

is_cat_gt = "CAT" > animal
print('Is "CAT" greater than "{}"?'.format(animal), is_cat_gt)

is_ge_cat = animal >= "CAT"
print('Is "{}" greater than or equal to "CAT"?'.format(animal), is_ge_cat)
```

```output
Is "cat" equal to "bird"? False
Is "cat" not equal to "bird"? True
Is "bird" equal to "bird"? True
Is "CAT" greater than "bird"? False
Is "bird" greater than or equal to "CAT"? True
```

```output
Is "cat" equal to "bird"? False
Is "cat" not equal to "bird"? True
Is "bird" equal to "bird"? True
Is "CAT" greater than "bird"? False
Is "bird" greater than or equal to "CAT"? True
```

#### Substring testing[​](operators.html#substring-testing "Direct link to Substring testing")

Both `String` and `StringLiteral` support using the `in` operator to produce a `Bool` result indicating whether a given substring appears within another string. The operator is overloaded so that you can use any combination of `String` and `StringLiteral` for both the substring and the string to test.

```mojo
var food: String = "peanut butter"

if "nut" in food:
    print("It contains a nut")
else:
    print("It doesn't contain a nut")
```

```mojo
var food: String = "peanut butter"

if "nut" in food:
    print("It contains a nut")
else:
    print("It doesn't contain a nut")
```

```output
It contains a nut
```

```output
It contains a nut
```

#### String indexing and slicing[​](operators.html#string-indexing-and-slicing "Direct link to String indexing and slicing")

Both the `String` and `StringLiteral` types allow you to use indexing to return a single character. Character positions are identified with a zero-based index starting from the first character. You can also specify a negative index to count backwards from the end of the string, with the last character identified by index -1. Specifying an index beyond the bounds of the string results in a run-time error.

```mojo
alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"  # StringLiteral type value
print(alphabet[0], alphabet[-1])

# The following would produce a run-time error
# print(alphabet[45])
```

```mojo
alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"  # StringLiteral type value
print(alphabet[0], alphabet[-1])

# The following would produce a run-time error
# print(alphabet[45])
```

```output
A Z
```

```output
A Z
```

The `String` type—but *not* the `StringLiteral` type—also supports slices to return a substring from the original `String`. Providing a slice in the form `[start:end]` returns a substring starting with the character index specified by `start` and continuing up to but not including the character at index `end`. You can use positive or negative indexing for both the start and end values. Omitting `start` is the same as specifying `0`, and omitting `end` is the same as specifying 1 plus the length of the string.

```mojo
var alphabet: String = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
print(alphabet[1:4])  # The 2nd through 4th characters
print(alphabet[:6])   # The first 6 characters
print(alphabet[-6:])  # The last 6 characters
```

```mojo
var alphabet: String = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
print(alphabet[1:4])  # The 2nd through 4th characters
print(alphabet[:6])   # The first 6 characters
print(alphabet[-6:])  # The last 6 characters
```

```output
BCD
ABCDEF
UVWXYZ
```

```output
BCD
ABCDEF
UVWXYZ
```

You can also specify a slice with a `step` value, as in `[start:end:step]` indicating the increment between subsequent indices of the slide. (This is also sometimes referred to as a "stride.") If you provide a negative value for `step`, characters are selected in reverse order starting with `start` but then with *decreasing* index values up to but not including `end`.

```mojo
print(alphabet[1:6:2])     # The 2nd, 4th, and 6th characters
print(alphabet[-1:-4:-1])  # The last 3 characters in reverse order
print(alphabet[::-1])      # The entire string reversed
```

```mojo
print(alphabet[1:6:2])     # The 2nd, 4th, and 6th characters
print(alphabet[-1:-4:-1])  # The last 3 characters in reverse order
print(alphabet[::-1])      # The entire string reversed
```

```output
BDF
ZYX
ZYXWVUTSRQPONMLKJIHGFEDCBA
```

```output
BDF
ZYX
ZYXWVUTSRQPONMLKJIHGFEDCBA
```

### In-place assignment operators[​](operators.html#in-place-assignment-operators "Direct link to In-place assignment operators")

Mutable types that support binary arithmetic, bitwise, and shift operators typically support equivalent in-place assignment operators. That means that for a type that supports the `+` operator, the following two statements are essentially equivalent:

```mojo
a = a + b
a += b
```

```mojo
a = a + b
a += b
```

However there is a subtle difference between the two. In the first example, the expression `a + b` produces a new value, which is then assigned to `a`. In contrast, the second example does an in-place modification of the value currently assigned to `a`. For register-passable types, the compiled results might be equivalent at run-time. But for a memory-only type, the first example allocates storage for the result of `a + b` and then assigns the value to the variable, whereas the second example can do an in-place modification of the existing value.

A type must explicitly implement in-place assignment methods, so you might encounter some types where in-place equivalents are not supported.

### Assignment expressions[​](operators.html#assignment-expressions "Direct link to Assignment expressions")

The "walrus" operator, `:=`, allows you to assign a value to a variable within an expression. The value provided is both assigned to the variable and becomes the result of the expression. This often can simplify conditional or looping logic. For example, consider the following prompting loop:

```mojo
while True:
    name = input("Enter a name or 'quit' to exit: ")
    if name == "quit":
        break
    print("Hello,", name)
```

```mojo
while True:
    name = input("Enter a name or 'quit' to exit: ")
    if name == "quit":
        break
    print("Hello,", name)
```

```output
Enter a name or 'quit' to exit: Coco
Hello, Coco
Enter a name or 'quit' to exit: Vivienne
Hello, Vivienne
Enter a name or 'quit' to exit: quit
```

```output
Enter a name or 'quit' to exit: Coco
Hello, Coco
Enter a name or 'quit' to exit: Vivienne
Hello, Vivienne
Enter a name or 'quit' to exit: quit
```

Using the walrus operator, you can implement the same behavior like this:

```mojo
while (name := input("Enter a name or 'quit' to exit: ")) != "quit":
    print("Hello,", name)
```

```mojo
while (name := input("Enter a name or 'quit' to exit: ")) != "quit":
    print("Hello,", name)
```

```output
Enter a name or 'quit' to exit: Donna
Hello, Donna
Enter a name or 'quit' to exit: Vera
Hello, Vera
Enter a name or 'quit' to exit: quit
```

```output
Enter a name or 'quit' to exit: Donna
Hello, Donna
Enter a name or 'quit' to exit: Vera
Hello, Vera
Enter a name or 'quit' to exit: quit
```

## Implement operators for custom types[​](operators.html#implement-operators-for-custom-types "Direct link to Implement operators for custom types")

When you create a custom struct, Mojo allows you to define the behavior of many of the built-in operators for that type by implementing special *dunder* (double underscore) methods. This section lists the dunder methods associated with the operators and briefly describes the requirements for implementing them.

Currently, Mojo doesn't support defining arbitrary custom operators (for example, `-^-`). You can define behaviors for only the operators listed in the following subsections.

### Unary operator dunder methods[​](operators.html#unary-operator-dunder-methods "Direct link to Unary operator dunder methods")

A unary operator invokes an associated dunder method on the value to which it applies. The supported unary operators and their corresponding methods are shown in the table below.

| **Operator**    | **Dunder method** |
|-----------------|-------------------|
| `+` positive    | `__pos__()`       |
| `-` negative    | `__neg__()`       |
| `~` bitwise NOT | `__invert__()`    |

For each of these methods that you decide to implement, you should return either the original value if unchanged, or a new value representing the result of the operator. For example, you could implement the `-` negative operator for a `MyInt` struct like this:

```mojo
@value
struct MyInt:
    var value: Int

    def __neg__(self) -> Self:
        return Self(-self.value)
```

```mojo
@value
struct MyInt:
    var value: Int

    def __neg__(self) -> Self:
        return Self(-self.value)
```

### Binary arithmetic, shift, and bitwise operator dunder methods[​](operators.html#binary-arithmetic-shift-and-bitwise-operator-dunder-methods "Direct link to Binary arithmetic, shift, and bitwise operator dunder methods")

When you have a binary expression like `a + b`, there are two possible dunder methods that could be invoked.

Mojo first determines whether the left-hand side value (`a` in this example) has a "normal" version of the `+` operator's dunder method defined that accepts a value of the right-hand side's type. If so, it then invokes that method on the left-hand side value and passes the right-hand side value as an argument.

If Mojo doesn't find a matching "normal" dunder method on the left-hand side value, it then checks whether the right-hand side value has a "reflected" (sometimes referred to as "reversed") version of the `+` operator's dunder method defined that accepts a value of the left-hand side's type. If so, it then invokes that method on the right-hand side value and passes the left-hand side value as an argument.

For both the normal and the reflected versions, the dunder method should return a new value representing the result of the operator.

Additionally, there are dunder methods corresponding to the in-place assignment versions of the operators. These methods receive the right-hand side value as an argument and the methods should modify the existing left-hand side value to reflect the result of the operator.

The table below lists the various binary arithmetic, shift, and bitwise operators and their corresponding normal, reflected, and in-place dunder methods.

| **Operator**              | **Normal**       | **Reflected**     | **In-place**      |
|---------------------------|------------------|-------------------|-------------------|
| `+` addition              | `__add__()`      | `__radd__()`      | `__iadd__()`      |
| `-` subtraction           | `__sub__()`      | `__rsub__()`      | `__isub__()`      |
| `*` multiplication        | `__mul__()`      | `__rmul__()`      | `__imul__()`      |
| `/` division              | `__truediv__()`  | `__rtruediv__()`  | `__itruediv__()`  |
| `//` floor division       | `__floordiv__()` | `__rfloordiv__()` | `__ifloordiv__()` |
| `%` modulus/remainder     | `__mod__()`      | `__rmod__()`      | `__imod__()`      |
| `**` exponentiation       | `__pow__()`      | `__rpow__()`      | `__ipow__()`      |
| `@` matrix multiplication | `__matmul__()`   | `__rmatmul__()`   | `__imatmul__()`   |
| `<<` left shift           | `__lshift__()`   | `__rlshift__()`   | `__ilshift__()`   |
| `>>` right shift          | `__rshift__()`   | `__rrshift__()`   | `__irshift__()`   |
| `&` bitwise AND           | `__and__()`      | `__rand__()`      | `__iand__()`      |
| `|` bitwise OR            | `__or__()`       | `__ror__()`       | `__ior__()`       |
| `^` bitwise XOR           | `__xor__()`      | `__rxor__()`      | `__ixor__()`      |

As an example, consider implementing support for all of the `+` operator dunder methods for a custom `MyInt` struct. This shows supporting adding two `MyInt` instances as well as adding a `MyInt` and an `Int`. We can support the case of having the `Int` as the right-hand side argument by overloaded the definition of `__add__()`. But to support the case of having the `Int` as the left-hand side argument, we need to implement an `__radd__()` method, because the built-in `Int` type doesn't have an `__add__()` method that supports our custom `MyInt` type.

```mojo
@value
struct MyInt:
    var value: Int

    def __add__(self, rhs: MyInt) -> Self:
        return MyInt(self.value + rhs.value)

    def __add__(self, rhs: Int) -> Self:
        return MyInt(self.value + rhs)

    def __radd__(self, lhs: Int) -> Self:
        return MyInt(self.value + lhs)

    def __iadd__(mut self, rhs: MyInt) -> None:
        self.value += rhs.value

    def __iadd__(mut self, rhs: Int) -> None:
        self.value += rhs
```

```mojo
@value
struct MyInt:
    var value: Int

    def __add__(self, rhs: MyInt) -> Self:
        return MyInt(self.value + rhs.value)

    def __add__(self, rhs: Int) -> Self:
        return MyInt(self.value + rhs)

    def __radd__(self, lhs: Int) -> Self:
        return MyInt(self.value + lhs)

    def __iadd__(mut self, rhs: MyInt) -> None:
        self.value += rhs.value

    def __iadd__(mut self, rhs: Int) -> None:
        self.value += rhs
```

### Comparison operator dunder methods[​](operators.html#comparison-operator-dunder-methods "Direct link to Comparison operator dunder methods")

When you have a comparison expression like `a < b`, Mojo invokes as associated dunder method on the left-hand side value and passes the right-hand side value as an argument. Mojo doesn't support "reflected" versions of these dunder methods because you should only compare values of the same type. The comparison dunder methods must return a `Bool` result representing the result of the comparison.

There are two traits associated with the comparison dunder methods. A type that implements the [`Comparable`](https://docs.modular.com/mojo/stdlib/builtin/comparable/Comparable) trait must define all of the comparison methods. However, some types don't have a natural ordering (for example, complex numbers). For those types you can decide to implement the [`EqualityComparable`](https://docs.modular.com/mojo/stdlib/builtin/equality_comparable/EqualityComparable) trait, which requires defining only the equality and inequality comparison methods.

The supported comparison operators and their corresponding methods are shown in the table below.

| **Operator**               | **Dunder method** |
|----------------------------|-------------------|
| `==` equality              | `__eq__()`        |
| `!=` inequality            | `__ne__()`        |
| `<` less than              | `__lt__()`        |
| `<=` less than or equal    | `__le__()`        |
| `>` greater than           | `__gt__()`        |
| `>=` greater than or equal | `__ge__()`        |

The `Comparable` and `EqualityComparable` traits don't allow the comparison dunder methods to raise errors. Because using `def` to define a method implies that it can raise an error, you must use `fn` to implement the comparison methods declared by these traits. See [Functions](functions.html) for more information on the differences between defining functions with `def` and `fn`.

As an example, consider implementing support for all of the comparison operator dunder methods for a custom `MyInt` struct.

```mojo
@value
struct MyInt(
    Comparable
):
    var value: Int

    fn __eq__(self, rhs: MyInt) -> Bool:
        return self.value == rhs.value

    fn __ne__(self, rhs: MyInt) -> Bool:
        return self.value != rhs.value

    fn __lt__(self, rhs: MyInt) -> Bool:
        return self.value < rhs.value

    fn __le__(self, rhs: MyInt) -> Bool:
        return self.value <= rhs.value

    fn __gt__(self, rhs: MyInt) -> Bool:
        return self.value > rhs.value

    fn __ge__(self, rhs: MyInt) -> Bool:
        return self.value >= rhs.value
```

```mojo
@value
struct MyInt(
    Comparable
):
    var value: Int

    fn __eq__(self, rhs: MyInt) -> Bool:
        return self.value == rhs.value

    fn __ne__(self, rhs: MyInt) -> Bool:
        return self.value != rhs.value

    fn __lt__(self, rhs: MyInt) -> Bool:
        return self.value < rhs.value

    fn __le__(self, rhs: MyInt) -> Bool:
        return self.value <= rhs.value

    fn __gt__(self, rhs: MyInt) -> Bool:
        return self.value > rhs.value

    fn __ge__(self, rhs: MyInt) -> Bool:
        return self.value >= rhs.value
```

### Membership operator dunder methods[​](operators.html#membership-operator-dunder-methods "Direct link to Membership operator dunder methods")

The `in` and `not in` operators depend on a type implementing the `__contains__()` dunder method. Typically only collection types (such as `List`, `Dict`, and `Set`) implement this method. It should accept the right-hand side value as an argument and return a `Bool` indicating whether the value is present in the collection or not.

### Subscript and slicing dunder methods[​](operators.html#subscript-and-slicing-dunder-methods "Direct link to Subscript and slicing dunder methods")

Subscripting and slicing typically apply only to sequential collection types, like `List` and `String`. Subscripting references a single element of a collection or a dimension of a multi-dimensional container, whereas slicing refers to a range of values. A type supports both subscripting and slicing by implementing the `__getitem__()` method for retrieving values and the `__setitem__()` method for setting values.

#### Subscripting[​](operators.html#subscripting "Direct link to Subscripting")

In the simple case of a one-dimensional sequence, the `__getitem__()` and `__setitem__()` methods should have signatures similar to this:

```mojo
struct MySeq[type: CollectionElement]:
    fn __getitem__(self, idx: Int) -> type:
        # Return element at the given index
        ...
    fn __setitem__(mut self, idx: Int, value: type):
        # Assign the element at the given index the provided value
```

```mojo
struct MySeq[type: CollectionElement]:
    fn __getitem__(self, idx: Int) -> type:
        # Return element at the given index
        ...
    fn __setitem__(mut self, idx: Int, value: type):
        # Assign the element at the given index the provided value
```

It's also possible to support multi-dimensional collections, in which case you can implement both `__getitem__()` and `__setitem__()` methods to accept multiple index arguments—or even variadic index arguments for arbitrary—dimension collections.

```mojo
struct MySeq[type: CollectionElement]:
    # 2-dimension support
    fn __getitem__(self, x_idx: Int, y_idx: Int) -> type:
        ...
    # Arbitrary-dimension support
    fn __getitem__(self, *indices: Int) -> type:
        ...
```

```mojo
struct MySeq[type: CollectionElement]:
    # 2-dimension support
    fn __getitem__(self, x_idx: Int, y_idx: Int) -> type:
        ...
    # Arbitrary-dimension support
    fn __getitem__(self, *indices: Int) -> type:
        ...
```

#### Slicing[​](operators.html#slicing "Direct link to Slicing")

You provide slicing support for a collection type also by implementing `__getitem__()` and `__setitem__()` methods. But for slicing, instead of accepting an `Int` index (or indices, in the case of a multi-dimensional collection) you implement to methods to accept a [`Slice`](https://docs.modular.com/mojo/stdlib/builtin/builtin_slice/Slice) (or multiple `Slice`s in the case of a multi-dimensional collection).

```mojo
struct MySeq[type: CollectionElement]:
    # Return a new MySeq with a subset of elements
    fn __getitem__(self, span: Slice) -> Self:
        ...

```

```mojo
struct MySeq[type: CollectionElement]:
    # Return a new MySeq with a subset of elements
    fn __getitem__(self, span: Slice) -> Self:
        ...

```

A `Slice` contains three fields:

- `start` (`Optional[Int]`): The starting index of the slice
- `end` (`Optional[Int]`): The ending index of the slice
- `step` (`Optional[Int]`): The step increment value of the slice.

Because the start, end, and step values are all optional when using slice syntax, they are represented as `Optional[Int]` values in the `Slice`. And if present, the index values might be negative representing a relative position from the end of the sequence. As a convenience, `Slice` provides an `indices()` method that accepts a `length` value and returns a 3-tuple of "normalized" start, end, and step values for the given length, all represented as non-negative values. You can then use these normalized values to determine the corresponding elements of your collection being referenced.

```mojo
struct MySeq[type: CollectionElement]:
    var size: Int

    # Return a new MySeq with a subset of elements
    fn __getitem__(self, span: Slice) -> Self:
        var start: Int
        var end: Int
        var step: Int
        start, end, step = span.indices(self.size)
        ...

```

```mojo
struct MySeq[type: CollectionElement]:
    var size: Int

    # Return a new MySeq with a subset of elements
    fn __getitem__(self, span: Slice) -> Self:
        var start: Int
        var end: Int
        var step: Int
        start, end, step = span.indices(self.size)
        ...

```

## An example of implementing operators for a custom type[​](operators.html#an-example-of-implementing-operators-for-a-custom-type "Direct link to An example of implementing operators for a custom type")

As an example of implementing operators for a custom Mojo type, let's create a `Complex` struct to represent a single complex number, with both the real and imaginary components stored as `Float64` values. We'll implement most of the arithmetic operators, the associated in-place assignment operators, the equality comparison operators, and a few additional convenience methods to support operations like printing complex values. We'll also allow mixing `Complex` and `Float64` values in arithmetic expressions to produce a `Complex` result.

This example builds our `Complex` struct incrementally. You can also find the [complete example in the public GitHub repo](https://github.com/modular/max/tree/main/examples/mojo/operators).

Note that the Mojo standard library implements a parameterized [`ComplexSIMD`](https://docs.modular.com/mojo/stdlib/complex/complex/ComplexSIMD) struct that provides support for a basic set of arithmetic operators. However, our `Complex` type will not be based on the `ComplexSIMD` struct or be compatible with it.

### Implement lifecycle methods[​](operators.html#implement-lifecycle-methods "Direct link to Implement lifecycle methods")

Our `Complex` struct is an example of a simple value type consisting of trivial numeric fields and requiring no special constructor or destructor behaviors. This means that we can take advantage of Mojo's [`@value`](decorators/value.html) decorator, which is described in [Simple value types](lifecycle/life.html#value-decorator), to automatically implement a member-wise initializer (a constructor with arguments for each field), a copy constructor, a move constructor, and a destructor.

```mojo
@value
struct Complex():
    var re: Float64
    var im: Float64
```

```mojo
@value
struct Complex():
    var re: Float64
    var im: Float64
```

This definition is enough for us to create `Complex` instances and access their real and imaginary fields.

```mojo
c1 = Complex(-1.2, 6.5)
print("c1: Real: {}; Imaginary: {}".format(c1.re, c1.im))
```

```mojo
c1 = Complex(-1.2, 6.5)
print("c1: Real: {}; Imaginary: {}".format(c1.re, c1.im))
```

```output
c1: Real: -1.2; Imaginary: 6.5
```

```output
c1: Real: -1.2; Imaginary: 6.5
```

As a convenience, let's add an explicit constructor to handle the case of creating a `Complex` instance with an imaginary component of 0.

```mojo
@value
struct Complex():
    var re: Float64
    var im: Float64

    fn __init__(out self, re: Float64, im: Float64 = 0.0):
        self.re = re
        self.im = im
```

```mojo
@value
struct Complex():
    var re: Float64
    var im: Float64

    fn __init__(out self, re: Float64, im: Float64 = 0.0):
        self.re = re
        self.im = im
```

Now we can create a `Complex` instance and provide just a real component.

```mojo
c2 = Complex(3.14159)
print("c2: Real: {}; Imaginary: {}".format(c2.re, c2.im))
```

```mojo
c2 = Complex(3.14159)
print("c2: Real: {}; Imaginary: {}".format(c2.re, c2.im))
```

```output
c2: Real: 3.1415899999999999; Imaginary: 0.0
```

```output
c2: Real: 3.1415899999999999; Imaginary: 0.0
```

### Implement the `Writable` and `Stringable` traits[​](operators.html#implement-the-writable-and-stringable-traits "Direct link to implement-the-writable-and-stringable-traits")

To make it simpler to print `Complex` values, let's implement the [Writable](https://docs.modular.com/mojo/stdlib/utils/write/Writable) trait. While we're at it, let's also implement the [`Stringable`](https://docs.modular.com/mojo/stdlib/builtin/str/Stringable) trait so that we can use the `String()` constructor to generate a `String` representation of a `Complex` value. You can find out more about these traits and their associated methods in [The `Stringable`, `Representable`, and `Writable` traits](traits.html#the-stringable-representable-and-writable-traits).

```mojo
@value
struct Complex(
    Writable,
    Stringable,
):
    # ...

    fn __str__(self) -> String:
        return String.write(self)

    fn write_to[W: Writer](self, mut writer: W):
        writer.write("(", self.re)
        if self.im < 0:
            writer.write(" - ", -self.im)
        else:
            writer.write(" + ", self.im)
        writer.write("i)")
```

```mojo
@value
struct Complex(
    Writable,
    Stringable,
):
    # ...

    fn __str__(self) -> String:
        return String.write(self)

    fn write_to[W: Writer](self, mut writer: W):
        writer.write("(", self.re)
        if self.im < 0:
            writer.write(" - ", -self.im)
        else:
            writer.write(" + ", self.im)
        writer.write("i)")
```

The `Writable` trait doesn't allow the `write_to()` method to raise an error and the `Stringable` trait doesn't allow the `__str__()` method to raise an error. Because defining a method with `def` implies that it can raise an error, we instead have to define these methods with `fn`. See [Functions](functions.html) for more information on the differences between defining functions with `def` and `fn`.

Now we can print a `Complex` value directly, and we can explicitly generate a `String` representation by passing a `Complex` value to `String()` which constructs a new `String` from all the arguments passed to it.

```mojo
c3 = Complex(3.14159, -2.71828)
print("c3 =", c3)

var msg = String("The value is: ", c3)
print(msg)
```

```mojo
c3 = Complex(3.14159, -2.71828)
print("c3 =", c3)

var msg = String("The value is: ", c3)
print(msg)
```

```output
c3 = (3.1415899999999999 - 2.71828i)
The value is: (3.1415899999999999 - 2.71828i)
```

```output
c3 = (3.1415899999999999 - 2.71828i)
The value is: (3.1415899999999999 - 2.71828i)
```

### Implement basic indexing[​](operators.html#implement-basic-indexing "Direct link to Implement basic indexing")

Indexing usually is supported only by collection types. But as an example, let's implement support for accessing the real component as index 0 and the imaginary component as index 1. We'll not implement slicing or variadic assignment for this example.

```mojo
    # ...
    def __getitem__(self, idx: Int) -> Float64:
        if idx == 0:
            return self.re
        elif idx == 1:
            return self.im
        else:
            raise "index out of bounds"

    def __setitem__(mut self, idx: Int, value: Float64) -> None:
        if idx == 0:
            self.re = value
        elif idx == 1:
            self.im = value
        else:
            raise "index out of bounds"
```

```mojo
    # ...
    def __getitem__(self, idx: Int) -> Float64:
        if idx == 0:
            return self.re
        elif idx == 1:
            return self.im
        else:
            raise "index out of bounds"

    def __setitem__(mut self, idx: Int, value: Float64) -> None:
        if idx == 0:
            self.re = value
        elif idx == 1:
            self.im = value
        else:
            raise "index out of bounds"
```

Now let's try getting and setting the real and imaginary components of a `Complex` value using indexing.

```mojo
c2 = Complex(3.14159)
print("c2[0]: {}; c2[1]: {}".format(c2[0], c2[1]))
c2[0] = 2.71828
c2[1] = 42
print("c2[0] = 2.71828; c2[1] = 42; c2:", c2)
```

```mojo
c2 = Complex(3.14159)
print("c2[0]: {}; c2[1]: {}".format(c2[0], c2[1]))
c2[0] = 2.71828
c2[1] = 42
print("c2[0] = 2.71828; c2[1] = 42; c2:", c2)
```

```output
c2[0]: 3.1415899999999999; c2[1]: 0.0
c2[0] = 2.71828; c2[1] = 42; c2: (2.71828 + 42.0i)
```

```output
c2[0]: 3.1415899999999999; c2[1]: 0.0
c2[0] = 2.71828; c2[1] = 42; c2: (2.71828 + 42.0i)
```

### Implement arithmetic operators[​](operators.html#implement-arithmetic-operators "Direct link to Implement arithmetic operators")

Now let's implement the dunder methods that allow us to perform arithmetic operations on `Complex` values. (Refer to the [Wikipedia page](https://en.wikipedia.org/wiki/Complex_number) on complex numbers for a more in-depth explanation of the formulas for these operators.)

#### Implement basic operators for `Complex` values[​](operators.html#implement-basic-operators-for-complex-values "Direct link to implement-basic-operators-for-complex-values")

The unary `+` operator simply returns the original value, whereas the unary `-` operator returns a new `Complex` value with the real and imaginary components negated.

```mojo
    # ...
    def __pos__(self) -> Self:
        return self

    def __neg__(self) -> Self:
        return Self(-self.re, -self.im)
```

```mojo
    # ...
    def __pos__(self) -> Self:
        return self

    def __neg__(self) -> Self:
        return Self(-self.re, -self.im)
```

Let's test these out by printing the result of applying each operator.

```mojo
c1 = Complex(-1.2, 6.5)
print("+c1:", +c1)
print("-c1:", -c1)
```

```mojo
c1 = Complex(-1.2, 6.5)
print("+c1:", +c1)
print("-c1:", -c1)
```

```output
+c1: (-1.2 + 6.5i)
-c1: (1.2 - 6.5i)
```

```output
+c1: (-1.2 + 6.5i)
-c1: (1.2 - 6.5i)
```

Next we'll implement the basic binary operators: `+`, `-`, `*`, and `/`. Dividing complex numbers is a bit tricky, so we'll also define a helper method called `norm()` to calculate the [Euclidean norm](https://en.wikipedia.org/wiki/Norm_%28mathematics%29#Euclidean_norm_of_complex_numbers) of a `Complex` instance, which can also be useful for other types of analysis with complex numbers.

For all of these dunder methods, the left-hand side operand is `self` and the right-hand side operand is passed as an argument. We return a new `Complex` value representing the result.

```mojo
from math import sqrt

# ...

    def __add__(self, rhs: Self) -> Self:
        return Self(self.re + rhs.re, self.im + rhs.im)

    def __sub__(self, rhs: Self) -> Self:
        return Self(self.re - rhs.re, self.im - rhs.im)

    def __mul__(self, rhs: Self) -> Self:
        return Self(
            self.re * rhs.re - self.im * rhs.im,
            self.re * rhs.im + self.im * rhs.re
        )

    def __truediv__(self, rhs: Self) -> Self:
        denom = rhs.squared_norm()
        return Self(
            (self.re * rhs.re + self.im * rhs.im) / denom,
            (self.im * rhs.re - self.re * rhs.im) / denom
        )

    def squared_norm(self) -> Float64:
        return self.re * self.re + self.im * self.im

    def norm(self) -> Float64:
        return sqrt(self.squared_norm())
```

```mojo
from math import sqrt

# ...

    def __add__(self, rhs: Self) -> Self:
        return Self(self.re + rhs.re, self.im + rhs.im)

    def __sub__(self, rhs: Self) -> Self:
        return Self(self.re - rhs.re, self.im - rhs.im)

    def __mul__(self, rhs: Self) -> Self:
        return Self(
            self.re * rhs.re - self.im * rhs.im,
            self.re * rhs.im + self.im * rhs.re
        )

    def __truediv__(self, rhs: Self) -> Self:
        denom = rhs.squared_norm()
        return Self(
            (self.re * rhs.re + self.im * rhs.im) / denom,
            (self.im * rhs.re - self.re * rhs.im) / denom
        )

    def squared_norm(self) -> Float64:
        return self.re * self.re + self.im * self.im

    def norm(self) -> Float64:
        return sqrt(self.squared_norm())
```

Now we can try them out.

```mojo
c1 = Complex(-1.2, 6.5)
c3 = Complex(3.14159, -2.71828)
print("c1 + c3 =", c1 + c3)
print("c1 - c3 =", c1 - c3)
print("c1 * c3 =", c1 * c3)
print("c1 / c3 =", c1 / c3)
```

```mojo
c1 = Complex(-1.2, 6.5)
c3 = Complex(3.14159, -2.71828)
print("c1 + c3 =", c1 + c3)
print("c1 - c3 =", c1 - c3)
print("c1 * c3 =", c1 * c3)
print("c1 / c3 =", c1 / c3)
```

```output
c1 + c3 = (1.9415899999999999 + 3.78172i)
c1 - c3 = (-4.3415900000000001 + 9.21828i)
c1 * c3 = (13.898912000000001 + 23.682270999999997i)
c1 / c3 = (-1.2422030701265261 + 0.99419218883955773i)
```

```output
c1 + c3 = (1.9415899999999999 + 3.78172i)
c1 - c3 = (-4.3415900000000001 + 9.21828i)
c1 * c3 = (13.898912000000001 + 23.682270999999997i)
c1 / c3 = (-1.2422030701265261 + 0.99419218883955773i)
```

#### Implement overloaded arithmetic operators for `Float64` values[​](operators.html#implement-overloaded-arithmetic-operators-for-float64-values "Direct link to implement-overloaded-arithmetic-operators-for-float64-values")

Our initial set of binary arithmetic operators work fine if both operands are `Complex` instances. But if we have a `Float64` value representing just a real value, we'd first need to use it to create a `Complex` value before we could add, subtract, multiply, or divide it with another `Complex` value. If we think that this will be a common use case, it makes sense to overload our arithmetic methods to accept a `Float64` as the second operand.

For the case where we have `complex1 + float1`, we can just create an overloaded definition of `__add__()`. But what about the case of `float1 + complex1`? By default, when Mojo encounters a `+` operator it tries to invoke the `__add__()` method of the left-hand operand, but the built-in `Float64` type doesn't implement support for addition with a `Complex` value. This is an example where we need to implement the `__radd__()` method on the `Complex` type. When Mojo can't find an `__add__(self, rhs: Complex) -> Complex` method defined on `Float64`, it uses the `__radd__(self, lhs: Float64) -> Complex` method defined on `Complex`.

So we can support arithmetic operations on `Complex` and `Float64` values by implementing the following eight methods.

```mojo
    # ...
    def __add__(self, rhs: Float64) -> Self:
        return Self(self.re + rhs, self.im)

    def __radd__(self, lhs: Float64) -> Self:
        return Self(self.re + lhs, self.im)

    def __sub__(self, rhs: Float64) -> Self:
        return Self(self.re - rhs, self.im)

    def __rsub__(self, lhs: Float64) -> Self:
        return Self(lhs - self.re, -self.im)

    def __mul__(self, rhs: Float64) -> Self:
        return Self(self.re * rhs, self.im * rhs)

    def __rmul__(self, lhs: Float64) -> Self:
        return Self(lhs * self.re, lhs * self.im)

    def __truediv__(self, rhs: Float64) -> Self:
        return Self(self.re / rhs, self.im / rhs)

    def __rtruediv__(self, lhs: Float64) -> Self:
        denom = self.squared_norm()
        return Self(
            (lhs * self.re) / denom,
            (-lhs * self.im) / denom
        )
```

```mojo
    # ...
    def __add__(self, rhs: Float64) -> Self:
        return Self(self.re + rhs, self.im)

    def __radd__(self, lhs: Float64) -> Self:
        return Self(self.re + lhs, self.im)

    def __sub__(self, rhs: Float64) -> Self:
        return Self(self.re - rhs, self.im)

    def __rsub__(self, lhs: Float64) -> Self:
        return Self(lhs - self.re, -self.im)

    def __mul__(self, rhs: Float64) -> Self:
        return Self(self.re * rhs, self.im * rhs)

    def __rmul__(self, lhs: Float64) -> Self:
        return Self(lhs * self.re, lhs * self.im)

    def __truediv__(self, rhs: Float64) -> Self:
        return Self(self.re / rhs, self.im / rhs)

    def __rtruediv__(self, lhs: Float64) -> Self:
        denom = self.squared_norm()
        return Self(
            (lhs * self.re) / denom,
            (-lhs * self.im) / denom
        )
```

Let's see them in action.

```mojo
c1 = Complex(-1.2, 6.5)
f1 = 2.5
print("c1 + f1 =", c1 + f1)
print("f1 + c1 =", f1 + c1)
print("c1 - f1 =", c1 - f1)
print("f1 - c1 =", f1 - c1)
print("c1 * f1 =", c1 * f1)
print("f1 * c1 =", f1 * c1)
print("c1 / f1 =", c1 / f1)
print("f1 / c1 =", f1 / c1)
```

```mojo
c1 = Complex(-1.2, 6.5)
f1 = 2.5
print("c1 + f1 =", c1 + f1)
print("f1 + c1 =", f1 + c1)
print("c1 - f1 =", c1 - f1)
print("f1 - c1 =", f1 - c1)
print("c1 * f1 =", c1 * f1)
print("f1 * c1 =", f1 * c1)
print("c1 / f1 =", c1 / f1)
print("f1 / c1 =", f1 / c1)
```

```output
c1 + f1 = (1.3 + 6.5i)
f1 + c1 = (1.3 + 6.5i)
c1 - f1 = (-3.7000000000000002 + 6.5i)
f1 - c1 = (3.7000000000000002 - 6.5i)
c1 * f1 = (-3.0 + 16.25i)
f1 * c1 = (-3.0 + 16.25i)
c1 / f1 = (-0.47999999999999998 + 2.6000000000000001i)
f1 / c1 = (-0.068665598535133904 - 0.37193865873197529i)
```

```output
c1 + f1 = (1.3 + 6.5i)
f1 + c1 = (1.3 + 6.5i)
c1 - f1 = (-3.7000000000000002 + 6.5i)
f1 - c1 = (3.7000000000000002 - 6.5i)
c1 * f1 = (-3.0 + 16.25i)
f1 * c1 = (-3.0 + 16.25i)
c1 / f1 = (-0.47999999999999998 + 2.6000000000000001i)
f1 / c1 = (-0.068665598535133904 - 0.37193865873197529i)
```

#### Implement in-place assignment operators[​](operators.html#implement-in-place-assignment-operators "Direct link to Implement in-place assignment operators")

Now let's implement support for the in-place assignment operators: `+=`, `-=`, `*=`, and `/=`. These modify the original value, so we need to mark `self` as being an `mut` argument and update the `re` and `im` fields instead of returning a new `Complex` instance. And once again, we'll overload the definitions to support both a `Complex` and a `Float64` operand.

```mojo
    # ...
    def __iadd__(mut self, rhs: Self) -> None:
        self.re += rhs.re
        self.im += rhs.im

    def __iadd__(mut self, rhs: Float64) -> None:
        self.re += rhs

    def __isub__(mut self, rhs: Self) -> None:
        self.re -= rhs.re
        self.im -= rhs.im

    def __isub__(mut self, rhs: Float64) -> None:
        self.re -= rhs

    def __imul__(mut self, rhs: Self) -> None:
        new_re = self.re * rhs.re - self.im * rhs.im
        new_im = self.re * rhs.im + self.im * rhs.re
        self.re = new_re
        self.im = new_im

    def __imul__(mut self, rhs: Float64) -> None:
        self.re *= rhs
        self.im *= rhs

    def __itruediv__(mut self, rhs: Self) -> None:
        denom = rhs.squared_norm()
        new_re = (self.re * rhs.re + self.im * rhs.im) / denom
        new_im = (self.im * rhs.re - self.re * rhs.im) / denom
        self.re = new_re
        self.im = new_im

    def __itruediv__(mut self, rhs: Float64) -> None:
        self.re /= rhs
        self.im /= rhs
```

```mojo
    # ...
    def __iadd__(mut self, rhs: Self) -> None:
        self.re += rhs.re
        self.im += rhs.im

    def __iadd__(mut self, rhs: Float64) -> None:
        self.re += rhs

    def __isub__(mut self, rhs: Self) -> None:
        self.re -= rhs.re
        self.im -= rhs.im

    def __isub__(mut self, rhs: Float64) -> None:
        self.re -= rhs

    def __imul__(mut self, rhs: Self) -> None:
        new_re = self.re * rhs.re - self.im * rhs.im
        new_im = self.re * rhs.im + self.im * rhs.re
        self.re = new_re
        self.im = new_im

    def __imul__(mut self, rhs: Float64) -> None:
        self.re *= rhs
        self.im *= rhs

    def __itruediv__(mut self, rhs: Self) -> None:
        denom = rhs.squared_norm()
        new_re = (self.re * rhs.re + self.im * rhs.im) / denom
        new_im = (self.im * rhs.re - self.re * rhs.im) / denom
        self.re = new_re
        self.im = new_im

    def __itruediv__(mut self, rhs: Float64) -> None:
        self.re /= rhs
        self.im /= rhs
```

And now to try them out.

```mojo
c4 = Complex(-1, -1)
print("c4 =", c4)
c4 += Complex(0.5, -0.5)
print("c4 += Complex(0.5, -0.5) =>", c4)
c4 += 2.75
print("c4 += 2.75 =>", c4)
c4 -= Complex(0.25, 1.5)
print("c4 -= Complex(0.25, 1.5) =>", c4)
c4 -= 3
print("c4 -= 3 =>", c4)
c4 *= Complex(-3.0, 2.0)
print("c4 *= Complex(-3.0, 2.0) =>", c4)
c4 *= 0.75
print("c4 *= 0.75 =>", c4)
c4 /= Complex(1.25, 2.0)
print("c4 /= Complex(1.25, 2.0) =>", c4)
c4 /= 2.0
print("c4 /= 2.0 =>", c4)
```

```mojo
c4 = Complex(-1, -1)
print("c4 =", c4)
c4 += Complex(0.5, -0.5)
print("c4 += Complex(0.5, -0.5) =>", c4)
c4 += 2.75
print("c4 += 2.75 =>", c4)
c4 -= Complex(0.25, 1.5)
print("c4 -= Complex(0.25, 1.5) =>", c4)
c4 -= 3
print("c4 -= 3 =>", c4)
c4 *= Complex(-3.0, 2.0)
print("c4 *= Complex(-3.0, 2.0) =>", c4)
c4 *= 0.75
print("c4 *= 0.75 =>", c4)
c4 /= Complex(1.25, 2.0)
print("c4 /= Complex(1.25, 2.0) =>", c4)
c4 /= 2.0
print("c4 /= 2.0 =>", c4)
```

```output
c4 = (-1.0 - 1.0i)
c4 += Complex(0.5, -0.5) => (-0.5 - 1.5i)
c4 += 2.75 => (2.25 - 1.5i)
c4 -= Complex(0.25, 1.5) => (2.0 - 3.0i)
c4 -= 3 => (-1.0 - 3.0i)
c4 *= Complex(-3.0, 2.0) => (9.0 + 7.0i)
c4 *= 0.75 => (6.75 + 5.25i)
c4 /= Complex(1.25, 2.0) => (3.404494382022472 - 1.247191011235955i)
c4 /= 2.0 => (1.702247191011236 - 0.6235955056179775i)
```

```output
c4 = (-1.0 - 1.0i)
c4 += Complex(0.5, -0.5) => (-0.5 - 1.5i)
c4 += 2.75 => (2.25 - 1.5i)
c4 -= Complex(0.25, 1.5) => (2.0 - 3.0i)
c4 -= 3 => (-1.0 - 3.0i)
c4 *= Complex(-3.0, 2.0) => (9.0 + 7.0i)
c4 *= 0.75 => (6.75 + 5.25i)
c4 /= Complex(1.25, 2.0) => (3.404494382022472 - 1.247191011235955i)
c4 /= 2.0 => (1.702247191011236 - 0.6235955056179775i)
```

### Implement equality operators[​](operators.html#implement-equality-operators "Direct link to Implement equality operators")

The field of complex numbers is not an ordered field, so it doesn't make sense for us to implement the `Comparable` trait and the `>`, `>=`, `<`, and `<=` operators. However, we can implement the `EqualityComparable` trait and the `==` and `!=` operators. (Of course, this suffers the same limitation of comparing floating point numbers for equality because of the limited precision of representing floating point numbers when performing arithmetic operations. But we'll go ahead and implement the operators for completeness.)

```mojo
@value
struct Complex(
    EqualityComparable,
    Formattable,
    Stringable,
):
    # ...
    fn __eq__(self, other: Self) -> Bool:
        return self.re == other.re and self.im == other.im

    fn __ne__(self, other: Self) -> Bool:
        return self.re != other.re and self.im != other.im
```

```mojo
@value
struct Complex(
    EqualityComparable,
    Formattable,
    Stringable,
):
    # ...
    fn __eq__(self, other: Self) -> Bool:
        return self.re == other.re and self.im == other.im

    fn __ne__(self, other: Self) -> Bool:
        return self.re != other.re and self.im != other.im
```

The `EqualityComparable` trait doesn't allow the `__eq__()` and `__ne__()` methods to raise errors. Because defining a method with `def` implies that it can raise an error, we instead have to define these methods with `fn`. See [Functions](functions.html) for more information on the differences between defining functions with `def` and `fn`.

And now to try them out.

```mojo
c1 = Complex(-1.2, 6.5)
c3 = Complex(3.14159, -2.71828)
c5 = Complex(-1.2, 6.5)

if c1 == c5:
    print("c1 is equal to c5")
else:
    print("c1 is not equal to c5")

if c1 != c3:
    print("c1 is not equal to c3")
else:
    print("c1 is equal to c3")
```

```mojo
c1 = Complex(-1.2, 6.5)
c3 = Complex(3.14159, -2.71828)
c5 = Complex(-1.2, 6.5)

if c1 == c5:
    print("c1 is equal to c5")
else:
    print("c1 is not equal to c5")

if c1 != c3:
    print("c1 is not equal to c3")
else:
    print("c1 is equal to c3")
```

```output
c1 is equal to c5
c1 is not equal to c3
```

```output
c1 is equal to c5
c1 is not equal to c3
```



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Foperators)

- [Operators and expressions](operators.html#operators-and-expressions)

  - [Operator precedence and associativity](operators.html#operator-precedence-and-associativity)
  - [Arithmetic and bitwise operators](operators.html#arithmetic-and-bitwise-operators)
  - [Comparison operators](operators.html#comparison-operators)
  - [String operators](operators.html#string-operators)
  - [In-place assignment operators](operators.html#in-place-assignment-operators)
  - [Assignment expressions](operators.html#assignment-expressions)
- [Implement operators for custom types](operators.html#implement-operators-for-custom-types)

  - [Unary operator dunder methods](operators.html#unary-operator-dunder-methods)
  - [Binary arithmetic, shift, and bitwise operator dunder methods](operators.html#binary-arithmetic-shift-and-bitwise-operator-dunder-methods)
  - [Comparison operator dunder methods](operators.html#comparison-operator-dunder-methods)
  - [Membership operator dunder methods](operators.html#membership-operator-dunder-methods)
  - [Subscript and slicing dunder methods](operators.html#subscript-and-slicing-dunder-methods)
- [An example of implementing operators for a custom type](operators.html#an-example-of-implementing-operators-for-a-custom-type)

  - [Implement lifecycle methods](operators.html#implement-lifecycle-methods)
  - [Implement the `Writable` and `Stringable` traits](operators.html#implement-the-writable-and-stringable-traits)
  - [Implement basic indexing](operators.html#implement-basic-indexing)
  - [Implement arithmetic operators](operators.html#implement-arithmetic-operators)
  - [Implement equality operators](operators.html#implement-equality-operators)





[Get the code](https://github.com/modular/max/tree/main/examples/mojo/operators)





[Get the code](https://github.com/modular/max/tree/main/examples/mojo/operators)



Modules and packages | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



# Modules and packages

Mojo provides a packaging system that allows you to organize and compile code libraries into importable files. This page introduces the necessary concepts about how to organize your code into modules and packages (which is a lot like Python), and shows you how to create a packaged binary with the [`mojo package`](https://docs.modular.com/mojo/cli/package) command.

## Mojo modules[​](packages.html#mojo-modules "Direct link to Mojo modules")

To understand Mojo packages, you first need to understand Mojo modules. A Mojo module is a single Mojo source file that includes code suitable for use by other files that import it. For example, you can create a module to define a struct such as this one:

mymodule.mojo

```mojo
struct MyPair:
    var first: Int
    var second: Int

    fn __init__(out self, first: Int, second: Int):
        self.first = first
        self.second = second

    fn dump(self):
        print(self.first, self.second)
```

```mojo
struct MyPair:
    var first: Int
    var second: Int

    fn __init__(out self, first: Int, second: Int):
        self.first = first
        self.second = second

    fn dump(self):
        print(self.first, self.second)
```

Notice that this code has no `main()` function, so you can't execute `mymodule.mojo`. However, you can import this into another file with a `main()` function and use it there.

For example, here's how you can import `MyPair` into a file named `main.mojo` that's in the same directory as `mymodule.mojo`:

main.mojo

```mojo
from mymodule import MyPair

fn main():
    var mine = MyPair(2, 4)
    mine.dump()
```

```mojo
from mymodule import MyPair

fn main():
    var mine = MyPair(2, 4)
    mine.dump()
```

Alternatively, you can import the whole module and then access its members through the module name. For example:

main.mojo

```mojo
import mymodule

fn main():
    var mine = mymodule.MyPair(2, 4)
    mine.dump()
```

```mojo
import mymodule

fn main():
    var mine = mymodule.MyPair(2, 4)
    mine.dump()
```

You can also create an alias for an imported member with `as`, like this:

main.mojo

```mojo
import mymodule as my

fn main():
    var mine = my.MyPair(2, 4)
    mine.dump()
```

```mojo
import mymodule as my

fn main():
    var mine = my.MyPair(2, 4)
    mine.dump()
```

In this example, it only works when `mymodule.mojo` is in the same directory as `main.mojo`. Currently, you can't import `.mojo` files as modules if they reside in other directories. That is, unless you treat the directory as a Mojo package, as described in the next section.

A Mojo module may include a `main()` function and may also be executable, but that's generally not the practice and modules typically include APIs to be imported and used in other Mojo programs.

## Mojo packages[​](packages.html#mojo-packages "Direct link to Mojo packages")

A Mojo package is just a collection of Mojo modules in a directory that includes an `__init__.mojo` file. By organizing modules together in a directory, you can then import all the modules together or individually. Optionally, you can also compile the package into a `.mojopkg` or `.📦` file that's easier to share and still compatible with other system architectures.

You can import a package and its modules either directly from source files or from a compiled `.mojopkg`/`.📦` file. It makes no real difference to Mojo which way you import a package. When importing from source files, the directory name works as the package name, whereas when importing from a compiled package, the filename is the package name (which you specify with the [`mojo package`](https://docs.modular.com/mojo/cli/package) command—it can differ from the directory name).

For example, consider a project with these files:

```ini
main.mojo
mypackage/
    __init__.mojo
    mymodule.mojo
```

```ini
main.mojo
mypackage/
    __init__.mojo
    mymodule.mojo
```

`mymodule.mojo` is the same code from examples above (with the `MyPair` struct) and `__init__.mojo` is empty.

In this case, the `main.mojo` file can now import `MyPair` through the package name like this:

main.mojo

```mojo
from mypackage.mymodule import MyPair

fn main():
    var mine = MyPair(2, 4)
    mine.dump()
```

```mojo
from mypackage.mymodule import MyPair

fn main():
    var mine = MyPair(2, 4)
    mine.dump()
```

Notice that the `__init__.mojo` is crucial here. If you delete it, then Mojo doesn't recognize the directory as a package and it cannot import `mymodule`.

Then, let's say you don't want the `mypackage` source code in the same location as `main.mojo`. So, you can compile it into a package file like this:

```sh
mojo package mypackage -o mypack.mojopkg
```

```sh
mojo package mypackage -o mypack.mojopkg
```

A `.mojopkg` file contains non-elaborated code, so you can share it across systems. The code becomes an architecture-specific executable only after it's imported into a Mojo program that's then compiled with `mojo build`.

Now, you can move the `mypackage` source somewhere else, and the project files now look like this:

```ini
main.mojo
mypack.mojopkg
```

```ini
main.mojo
mypack.mojopkg
```

Because we named the package file different from the directory, we need to fix the import statement and it all works the same:

main.mojo

```mojo
from mypack.mymodule import MyPair
```

```mojo
from mypack.mymodule import MyPair
```

If you want to rename your package, you cannot simply edit the `.mojopkg` or `.📦` filename, because the package name is encoded in the file. You must instead run `mojo package` again to specify a new name.

### The `__init__` file[​](packages.html#the-__init__-file "Direct link to the-__init__-file")

As mentioned above, the `__init__.mojo` file is required to indicate that a directory should be treated as a Mojo package, and it can be empty.

Currently, top-level code is not supported in `.mojo` files, so unlike Python, you can't write code in `__init__.mojo` that executes upon import. You can, however, add structs and functions, which you can then import from the package name.

However, instead of adding APIs in the `__init__.mojo` file, you can import module members, which has the same effect by making your APIs accessible from the package name, instead of requiring the `<package_name>.<module_name>` notation.

For example, again let's say you have these files:

```ini
main.mojo
mypackage/
    __init__.mojo
    mymodule.mojo
```

```ini
main.mojo
mypackage/
    __init__.mojo
    mymodule.mojo
```

Let's now add the following line in `__init__.mojo`:

\_\_init\_\_.mojo

```mojo
from .mymodule import MyPair
```

```mojo
from .mymodule import MyPair
```

That's all that's in there. Now, we can simplify the import statement in `main.mojo` like this:

main.mojo

```mojo
from mypackage import MyPair
```

```mojo
from mypackage import MyPair
```

This feature explains why some members in the Mojo standard library can be imported from their package name, while others required the `<package_name>.<module_name>` notation. For example, the [`functional`](https://docs.modular.com/mojo/stdlib/algorithm/functional/) module resides in the `algorithm` package, so you can import members of that module (such as the `map()` function) like this:

```mojo
from algorithm.functional import map
```

```mojo
from algorithm.functional import map
```

However, the `algorithm/__init__.mojo` file also includes these lines:

algorithm/\_\_init\_\_.mojo

```mojo
from .functional import *
from .reduction import *
```

```mojo
from .functional import *
from .reduction import *
```

So you can actually import anything from `functional` or `reduction` simply by naming the package. That is, you can drop the `functional` name from the import statement, and it also works:

```mojo
from algorithm import map
```

```mojo
from algorithm import map
```

Which modules in the standard library are imported to the package scope varies, and is subject to change. Refer to the [documentation for each module](https://docs.modular.com/mojo/lib) to see how you can import its members.



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fpackages)

- [Mojo modules](packages.html#mojo-modules)
- [Mojo packages](packages.html#mojo-packages)

  - [The `__init__` file](packages.html#the-__init__-file)











Parameterization: compile-time metaprogramming | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



# Parameterization: compile-time metaprogramming

Many languages have facilities for *metaprogramming*: that is, for writing code that generates or modifies code. Python has facilities for dynamic metaprogramming: features like decorators, metaclasses, and many more. These features make Python very flexible and productive, but since they're dynamic, they come with runtime overhead. Other languages have static or compile-time metaprogramming features, like C preprocessor macros and C++ templates. These can be limiting and hard to use.

To support Modular's work in AI, Mojo aims to provide powerful, easy-to-use metaprogramming with zero runtime cost. This compile-time metaprogramming uses the same language as runtime programs, so you don't have to learn a new language—just a few new features.

The main new feature is *parameters*. You can think of a parameter as a compile-time variable that becomes a runtime constant. This usage of "parameter" is probably different from what you're used to from other languages, where "parameter" and "argument" are often used interchangeably. In Mojo, "parameter" and "parameter expression" refer to compile-time values, and "argument" and "expression" refer to runtime values.

In Mojo, you can add parameters to a struct or function. You can also define named parameter expressions—aliases—that you can use as runtime constants.

## Parameterized functions[​](parameters.1.html#parameterized-functions "Direct link to Parameterized functions")

To define a *parameterized function*, add parameters in square brackets ahead of the argument list. Each parameter is formatted just like an argument: a parameter name, followed by a colon and a type (which is required). In the following example, the function has a single parameter, `count` of type `Int`.

```mojo
fn repeat[count: Int](msg: String):
    @parameter
    for i in range(count):
        print(msg)
```

```mojo
fn repeat[count: Int](msg: String):
    @parameter
    for i in range(count):
        print(msg)
```

The [`@parameter`](decorators/parameter.html) decorator shown here causes the `for` loop to be evaluated at compile time. The decorator only works if the loop limits are compile-time constants. Since `count` is a parameter, `range(count)` can be calculated at compile time.

Calling a parameterized function, you provide values for the parameters, just like function arguments:

```mojo
repeat[3]("Hello")
```

```mojo
repeat[3]("Hello")
```

```output
Hello
Hello
Hello
```

```output
Hello
Hello
Hello
```

The compiler resolves the parameter values during compilation, and creates a concrete version of the `repeat[]()` function for each unique parameter value. After resolving the parameter values and unrolling the loop, the `repeat[3]()` function would be roughly equivalent to this:

```mojo
fn repeat_3(msg: String):
    print(msg)
    print(msg)
    print(msg)
```

```mojo
fn repeat_3(msg: String):
    print(msg)
    print(msg)
    print(msg)
```

This doesn't represent actual code generated by the compiler. By the time parameters are resolved, Mojo code has already been transformed to an intermediate representation in [MLIR](https://mlir.llvm.org/).

If the compiler can't resolve all parameter values to constant values, compilation fails.

## Anatomy of a parameter list[​](parameters.1.html#anatomy-of-a-parameter-list "Direct link to Anatomy of a parameter list")

Parameters to a function or struct appear in square brackets after a function or struct name. Parameters always require type annotations.

When you're looking at a function or struct definition, you may see some special characters such as `/` and `*` in the parameter list. Here's an example:

```mojo
def my_sort[
    # infer-only parameters
    Type: DType,
    width: Int,
    //,
    # positional-only parameter
    values: SIMD[Type, width],
    /,
    # positional-or-keyword parameter
    compare: fn (Scalar[Type], Scalar[Type]) -> Int,
    *,
    # keyword-only parameter
    reverse: Bool = False,
]() -> SIMD[Type, width]:
```

```mojo
def my_sort[
    # infer-only parameters
    Type: DType,
    width: Int,
    //,
    # positional-only parameter
    values: SIMD[Type, width],
    /,
    # positional-or-keyword parameter
    compare: fn (Scalar[Type], Scalar[Type]) -> Int,
    *,
    # keyword-only parameter
    reverse: Bool = False,
]() -> SIMD[Type, width]:
```

Here's a quick overview of the special characters in the parameter list:

- Double slash (`//`): parameters declared before the double slash are [infer-only parameters](parameters.1.html#infer-only-parameters).
- Slash (`/`): parameters declared before a slash are positional-only parameters. Positional-only and keyword-only parameters follow the same rules as [positional-only and keyword-only arguments](functions.html#positional-only-and-keyword-only-arguments).
- A parameter name prefixed with a star, like `*Types` identifies a [variadic parameter](parameters.1.html#variadic-parameters) (not shown in the example above). Any parameters following the variadic parameter are keyword-only.
- Star (`*`): in a parameter list with no variadic parameter, a star by itself indicates that the following parameters are keyword-only parameters.
- An equals sign (`=`) introduces a default value for an [optional parameter](parameters.1.html#optional-parameters-and-keyword-parameters).

## Parameters and generics[​](parameters.1.html#parameters-and-generics "Direct link to Parameters and generics")

"Generics" refers to functions that can act on multiple types of values, or containers that can hold multiple types of values. For example, [`List`](https://docs.modular.com/mojo/stdlib/collections/list/List), can hold different types of values, so you can have a list of `Int` values, or a list of `String` values).

In Mojo, generics use parameters to specify types. For example, `List` takes a type parameter, so a vector of integers is written `List[Int]`. So all generics use parameters, but **not** everything that uses parameters is a generic.

For example, the `repeat[]()` function in the previous section includes parameter of type `Int`, and an argument of type `String`. It's parameterized, but not generic. A generic function or struct is parameterized on *type*. For example, we could rewrite `repeat[]()` to take any type of argument that conforms to the [`Stringable`](https://docs.modular.com/mojo/stdlib/builtin/str/Stringable) trait:

```mojo
fn repeat[MsgType: Stringable, count: Int](msg: MsgType):
    @parameter
    for i in range(count):
        print(String(msg))

# Must use keyword parameter for `count`
repeat[count=2](42)
```

```mojo
fn repeat[MsgType: Stringable, count: Int](msg: MsgType):
    @parameter
    for i in range(count):
        print(String(msg))

# Must use keyword parameter for `count`
repeat[count=2](42)
```

```output
42
42
```

```output
42
42
```

This updated function takes any `Stringable` type, so you can pass it an `Int`, `String`, or `Bool` value.

You can't pass the `count` as a positional keyword without also specifying `MsgType`. You can put `//` after `MsgType` to specify that it's always inferred by the argument. Now you can pass the following parameter `count` positionally:

```mojo
fn repeat[MsgType: Stringable, //, count: Int](msg: MsgType):
    @parameter
    for i in range(count):
        print(String(msg))

# MsgType is always inferred, so first positional keyword `2` is passed to `count`
repeat[2](42)
```

```mojo
fn repeat[MsgType: Stringable, //, count: Int](msg: MsgType):
    @parameter
    for i in range(count):
        print(String(msg))

# MsgType is always inferred, so first positional keyword `2` is passed to `count`
repeat[2](42)
```

```output
42
42
```

```output
42
42
```

Mojo's support for generics is still early. You can write generic functions like this using traits and parameters. You can also write generic collections like `List` and `Dict`. If you're interested in learning how these types work, you can find the source code for the standard library collection types [on GitHub](https://github.com/modular/max/blob/main/mojo/stdlib/src/collections/).

## Parameterized structs[​](parameters.1.html#parameterized-structs "Direct link to Parameterized structs")

You can also add parameters to structs. You can use parameterized structs to build generic collections. For example, a generic array type might include code like this:

```mojo
from memory import UnsafePointer

struct GenericArray[ElementType: CollectionElement]:
    var data: UnsafePointer[ElementType]
    var size: Int

    fn __init__(out self, *elements: ElementType):
        self.size = len(elements)
        self.data = UnsafePointer[ElementType].alloc(self.size)
        for i in range(self.size):
            (self.data + i).init_pointee_move(elements[i])

    fn __del__(owned self):
        for i in range(self.size):
            (self.data + i).destroy_pointee()
        self.data.free()

    fn __getitem__(self, i: Int) raises -> ref [self] ElementType:
        if (i < self.size):
            return self.data[i]
        else:
            raise Error("Out of bounds")
```

```mojo
from memory import UnsafePointer

struct GenericArray[ElementType: CollectionElement]:
    var data: UnsafePointer[ElementType]
    var size: Int

    fn __init__(out self, *elements: ElementType):
        self.size = len(elements)
        self.data = UnsafePointer[ElementType].alloc(self.size)
        for i in range(self.size):
            (self.data + i).init_pointee_move(elements[i])

    fn __del__(owned self):
        for i in range(self.size):
            (self.data + i).destroy_pointee()
        self.data.free()

    fn __getitem__(self, i: Int) raises -> ref [self] ElementType:
        if (i < self.size):
            return self.data[i]
        else:
            raise Error("Out of bounds")
```

This struct has a single parameter, `ElementType`, which is a placeholder for the data type you want to store in the array, sometimes called a *type parameter*. `ElementType` is typed as [`CollectionElement`](https://docs.modular.com/mojo/stdlib/builtin/value/CollectionElement), which is a [trait](traits.html) representing any type that can be copied and moved.

As with parameterized functions, you need to pass in parameter values when you use a parameterized struct. In this case, when you create an instance of `GenericArray`, you need to specify the type you want to store, like `Int`, or `Float64`. (This is a little confusing, because the *parameter value* you're passing in this case is a *type*. That's OK: a Mojo type is a valid compile-time value.)

You'll see that `ElementType` is used throughout the struct where you'd usually see a type name. For example, as the formal type for the `elements` in the constructor, and the return type of the `__getitem__()` method.

Here's an example of using `GenericArray`:

```mojo
var array = GenericArray[Int](1, 2, 3, 4)
for i in range(array.size):
    print(array[i], end=" ")
```

```mojo
var array = GenericArray[Int](1, 2, 3, 4)
for i in range(array.size):
    print(array[i], end=" ")
```

```output
1 2 3 4
```

```output
1 2 3 4
```

A parameterized struct can use the `Self` type to represent a concrete instance of the struct (that is, with all its parameters specified). For example, you could add a static factory method to `GenericArray` with the following signature:

```mojo
struct GenericArray[ElementType: CollectionElement]:
    ...

    @staticmethod
    fn splat(count: Int, value: ElementType) -> Self:
        # Create a new array with count instances of the given value
```

```mojo
struct GenericArray[ElementType: CollectionElement]:
    ...

    @staticmethod
    fn splat(count: Int, value: ElementType) -> Self:
        # Create a new array with count instances of the given value
```

Here, `Self` is equivalent to writing `GenericArray[ElementType]`. That is, you can call the `splat()` method like this:

```mojo
GenericArray[Float64].splat(8, 0)
```

```mojo
GenericArray[Float64].splat(8, 0)
```

The method returns an instance of `GenericArray[Float64]`.

### Conditional conformance[​](parameters.1.html#conditional-conformance "Direct link to Conditional conformance")

When creating a generic struct, you might want to define some methods that require extra features. For example, consider a collection like `GenericArray` that holds instances of `CollectionElement`. The `CollectionElement` trait only requires that the stored data type be copyable and movable. This imposes a lot of limitations: you can't implement a `sort()` method because you can't guarantee that the stored type supports the comparison operators; you can't write a useful `__str__()` or `__repr__()` dunder method because you can't guarantee that the stored type supports conversion to a string.

The answer to these issues is *conditional conformance*, which lets you define a method that requires additional features. You do this by defining the `self` value that has a more specific bound on one or more of its parameters.

For example, the following code defines a `Container` type that holds an instance of `CollectionElement`. It also defines a `__str__()` method that can only be called if the stored `ElementType` conforms to `WritableCollectionElement`:

```mojo
@value
struct Container[ElementType: CollectionElement]:
    var element: ElementType

    def __str__[StrElementType: WritableCollectionElement, //](
            self: Container[StrElementType]) -> String:
        return String(self.element)

def use_container():
    float_container = Container(5)
    string_container = Container("Hello")
    print(float_container.__str__())
    print(string_container.__str__())

use_container()
```

```mojo
@value
struct Container[ElementType: CollectionElement]:
    var element: ElementType

    def __str__[StrElementType: WritableCollectionElement, //](
            self: Container[StrElementType]) -> String:
        return String(self.element)

def use_container():
    float_container = Container(5)
    string_container = Container("Hello")
    print(float_container.__str__())
    print(string_container.__str__())

use_container()
```

```output
5
Hello
```

```output
5
Hello
```

Note the signature of the `__str__()` method, which declares the `self` argument with a more specific type. Specifically, it declares that it takes a `Container` with an `ElementType` that conforms to the `WritableCollectionElement` trait.

```mojo
def __str__[StrElementType: WritableCollectionElement, //](
        self: Container[StrElementType]) -> String:
```

```mojo
def __str__[StrElementType: WritableCollectionElement, //](
        self: Container[StrElementType]) -> String:
```

This trait must be a superset of `ElementType`'s original trait: for example, `WritableCollectionElement` inherits from `CollectionElement`, so it includes all of requirements of the original trait.

Note that the `use_container()` function calls the `__str__()` method directly, rather than calling `String(float_container)`. One current limitation of conditional conformance is that Mojo can't recognize the struct `Container[Int]` as conforming to `Stringable`, even though the `__str__()` method is implemented for any `ElementType` that's also `Stringable`.

### Case study: the SIMD type[​](parameters.1.html#case-study-the-simd-type "Direct link to Case study: the SIMD type")

For a real-world example of a parameterized type, let's look at the [`SIMD`](https://docs.modular.com/mojo/stdlib/builtin/simd/SIMD) type from Mojo's standard library.

[Single instruction, multiple data (SIMD)](https://en.wikipedia.org/wiki/Single_instruction,_multiple_data) is a parallel processing technology built into many modern CPUs, GPUs, and custom accelerators. SIMD allows you to perform a single operation on multiple pieces of data at once. For example, if you want to take the square root of each element in an array, you can use SIMD to parallelize the work.

Processors implement SIMD using low-level vector registers in hardware that hold multiple instances of a scalar data type. In order to use the SIMD instructions on these processors, the data must be shaped into the proper SIMD width (data type) and length (vector size). Processors may support 512-bit or longer SIMD vectors, and support many data types from 8-bit integers to 64-bit floating point numbers, so it's not practical to define all of the possible SIMD variations.

Mojo's [`SIMD`](https://docs.modular.com/mojo/stdlib/builtin/simd/SIMD) type (defined as a struct) exposes the common SIMD operations through its methods, and makes the SIMD data type and size values parametric. This allows you to directly map your data to the SIMD vectors on any hardware.

Here's a cut-down (non-functional) version of Mojo's `SIMD` type definition:

```mojo
struct SIMD[type: DType, size: Int]:
    var value: … # Some low-level MLIR stuff here

    # Create a new SIMD from a number of scalars
    fn __init__(out self, *elems: SIMD[type, 1]):  ...

    # Fill a SIMD with a duplicated scalar value.
    @staticmethod
    fn splat(x: SIMD[type, 1]) -> SIMD[type, size]: ...

    # Cast the elements of the SIMD to a different elt type.
    fn cast[target: DType](self) -> SIMD[target, size]: ...

    # Many standard operators are supported.
    fn __add__(self, rhs: Self) -> Self: ...
```

```mojo
struct SIMD[type: DType, size: Int]:
    var value: … # Some low-level MLIR stuff here

    # Create a new SIMD from a number of scalars
    fn __init__(out self, *elems: SIMD[type, 1]):  ...

    # Fill a SIMD with a duplicated scalar value.
    @staticmethod
    fn splat(x: SIMD[type, 1]) -> SIMD[type, size]: ...

    # Cast the elements of the SIMD to a different elt type.
    fn cast[target: DType](self) -> SIMD[target, size]: ...

    # Many standard operators are supported.
    fn __add__(self, rhs: Self) -> Self: ...
```

So you can create and use a SIMD vector like this:

```mojo
var vector = SIMD[DType.int16, 4](1, 2, 3, 4)
vector = vector * vector
for i in range(4):
    print(vector[i], end=" ")
```

```mojo
var vector = SIMD[DType.int16, 4](1, 2, 3, 4)
vector = vector * vector
for i in range(4):
    print(vector[i], end=" ")
```

```output
1 4 9 16
```

```output
1 4 9 16
```

As you can see, a simple arithmetic operator like `*` applied to a pair of `SIMD` vector operates on the corresponding elements in each vector.

Defining each SIMD variant with parameters is great for code reuse because the `SIMD` type can express all the different vector variants statically, instead of requiring the language to pre-define every variant.

Because `SIMD` is a parameterized type, the `self` argument in its functions carries those parameters—the full type name is `SIMD[type, size]`. Although it's valid to write this out (as shown in the return type of `splat()`), this can be verbose, so we recommend using the `Self` type (from [PEP673](https://peps.python.org/pep-0673/)) like the `__add__` example does.

## Overloading on parameters[​](parameters.1.html#overloading-on-parameters "Direct link to Overloading on parameters")

Functions and methods can be overloaded on their parameter signatures. For information on overload resolution, see [Overloaded functions](functions.html#overloaded-functions).

## Using parameterized types and functions[​](parameters.1.html#using-parameterized-types-and-functions "Direct link to Using parameterized types and functions")

You can use parametric types and functions by passing values to the parameters in square brackets. For example, for the `SIMD` type above, `type` specifies the data type and `size` specifies the length of the SIMD vector (it must be a power of 2):

```mojo
# Make a vector of 4 floats.
var small_vec = SIMD[DType.float32, 4](1.0, 2.0, 3.0, 4.0)

# Make a big vector containing 1.0 in float16 format.
var big_vec = SIMD[DType.float16, 32](1.0)

# Do some math and convert the elements to float32.
var bigger_vec = (big_vec+big_vec).cast[DType.float32]()

# You can write types out explicitly if you want of course.
var bigger_vec2 : SIMD[DType.float32, 32] = bigger_vec

print('small_vec type:', small_vec.element_type, 'length:', len(small_vec))
print('bigger_vec2 type:', bigger_vec2.element_type, 'length:', len(bigger_vec2))
```

```mojo
# Make a vector of 4 floats.
var small_vec = SIMD[DType.float32, 4](1.0, 2.0, 3.0, 4.0)

# Make a big vector containing 1.0 in float16 format.
var big_vec = SIMD[DType.float16, 32](1.0)

# Do some math and convert the elements to float32.
var bigger_vec = (big_vec+big_vec).cast[DType.float32]()

# You can write types out explicitly if you want of course.
var bigger_vec2 : SIMD[DType.float32, 32] = bigger_vec

print('small_vec type:', small_vec.element_type, 'length:', len(small_vec))
print('bigger_vec2 type:', bigger_vec2.element_type, 'length:', len(bigger_vec2))
```

```output
small_vec type: float32 length: 4
bigger_vec2 type: float32 length: 32
```

```output
small_vec type: float32 length: 4
bigger_vec2 type: float32 length: 32
```

Note that the `cast()` method also needs a parameter to specify the type you want from the cast (the method definition above expects a `target` parametric value). Thus, just as the `SIMD` struct is a generic type definition, the `cast()` method is a generic method definition. At compile time, the compiler creates a concrete version of the `cast()` method with the target parameter bound to `DType.float32`.

The code above shows the use of concrete types (that is, the parameters are all bound to known values). But the major power of parameters comes from the ability to define parametric algorithms and types (code that uses the parameter values). For example, here's how to define a parametric algorithm with `SIMD` that is type- and width-agnostic:

```mojo
from math import sqrt

fn rsqrt[dt: DType, width: Int](x: SIMD[dt, width]) -> SIMD[dt, width]:
    return 1 / sqrt(x)

var v = SIMD[DType.float16, 4](42)
print(rsqrt(v))
```

```mojo
from math import sqrt

fn rsqrt[dt: DType, width: Int](x: SIMD[dt, width]) -> SIMD[dt, width]:
    return 1 / sqrt(x)

var v = SIMD[DType.float16, 4](42)
print(rsqrt(v))
```

```output
[0.154296875, 0.154296875, 0.154296875, 0.154296875]
```

```output
[0.154296875, 0.154296875, 0.154296875, 0.154296875]
```

Notice that the `x` argument is actually a `SIMD` type based on the function parameters. The runtime program can use the value of the parameters, because the parameters are resolved at compile-time before they are needed by the runtime program (but compile-time parameter expressions cannot use runtime values).

### Parameter inference[​](parameters.1.html#parameter-inference "Direct link to Parameter inference")

The Mojo compiler can often *infer* parameter values, so you don't always have to specify them. For example, you can call the `rsqrt()` function defined above without any parameters:

```mojo
var v = SIMD[DType.float16, 4](33)
print(rsqrt(v))
```

```mojo
var v = SIMD[DType.float16, 4](33)
print(rsqrt(v))
```

```output
[0.174072265625, 0.174072265625, 0.174072265625, 0.174072265625]
```

```output
[0.174072265625, 0.174072265625, 0.174072265625, 0.174072265625]
```

The compiler infers its parameters based on the parametric `v` value passed into it, as if you wrote `rsqrt[DType.float16, 4](v)` explicitly.

Mojo can also infer the values of struct parameters from the arguments passed to a constructor or static method.

For example, consider the following struct:

```mojo
@value
struct One[Type: WritableCollectionElement]:
    var value: Type

    fn __init__(out self, value: Type):
        self.value = value

def use_one():
    s1 = One(123)
    s2 = One("Hello")
```

```mojo
@value
struct One[Type: WritableCollectionElement]:
    var value: Type

    fn __init__(out self, value: Type):
        self.value = value

def use_one():
    s1 = One(123)
    s2 = One("Hello")
```

Note that you can create an instance of `One` without specifying the `Type` parameter—Mojo can infer it from the `value` argument.

You can also infer parameters from a parameterized type passed to a constructor or static method:

```mojo
struct Two[Type: WritableCollectionElement]:
    var val1: Type
    var val2: Type

    fn __init__(out self, one: One[Type], another: One[Type]):
        self.val1 = one.value
        self.val2 = another.value
        print(String(self.val1), String(self.val2))

    @staticmethod
    fn fire(thing1: One[Type], thing2: One[Type]):
        print("🔥", String(thing1.value), String(thing2.value))

def use_two():
    s3 = Two(One("infer"), One("me"))
    Two.fire(One(1), One(2))

use_two()
```

```mojo
struct Two[Type: WritableCollectionElement]:
    var val1: Type
    var val2: Type

    fn __init__(out self, one: One[Type], another: One[Type]):
        self.val1 = one.value
        self.val2 = another.value
        print(String(self.val1), String(self.val2))

    @staticmethod
    fn fire(thing1: One[Type], thing2: One[Type]):
        print("🔥", String(thing1.value), String(thing2.value))

def use_two():
    s3 = Two(One("infer"), One("me"))
    Two.fire(One(1), One(2))

use_two()
```

```output
infer me
🔥 1 2
```

```output
infer me
🔥 1 2
```

`Two` takes a `Type` parameter, and its constructor takes values of type `One[Type]`. When constructing an instance of `Two`, you don't need to specify the `Type` parameter, since it can be inferred from the arguments.

Similarly, the static `fire()` method takes values of type `One[Type]`, so Mojo can infer the `Type` value at compile time.

If you're familiar with C++, you may recognize this as similar to Class Template Argument Deduction (CTAD).

## Optional parameters and keyword parameters[​](parameters.1.html#optional-parameters-and-keyword-parameters "Direct link to Optional parameters and keyword parameters")

Just as you can specify [optional arguments](functions.html#optional-arguments) in function signatures, you can also define an optional *parameter* by giving it a default value.

You can also pass parameters by keyword, just like you can use [keyword arguments](functions.html#keyword-arguments). For a function or struct with multiple optional parameters, using keywords allows you to pass only the parameters you want to specify, regardless of their position in the function signature.

For example, here's a function with two parameters, each with a default value:

```mojo
fn speak[a: Int = 3, msg: StringLiteral = "woof"]():
    print(msg, a)

fn use_defaults() raises:
    speak()             # prints 'woof 3'
    speak[5]()          # prints 'woof 5'
    speak[7, "meow"]()  # prints 'meow 7'
    speak[msg="baaa"]() # prints 'baaa 3'
```

```mojo
fn speak[a: Int = 3, msg: StringLiteral = "woof"]():
    print(msg, a)

fn use_defaults() raises:
    speak()             # prints 'woof 3'
    speak[5]()          # prints 'woof 5'
    speak[7, "meow"]()  # prints 'meow 7'
    speak[msg="baaa"]() # prints 'baaa 3'
```

Recall that when a parametric function is called, Mojo can infer the parameter values. That is, it can use the parameter values attached to an argument value (see the `sqrt[]()` example above). If the parametric function also has a default value defined, then the inferred parameter type takes precedence.

For example, in the following code, we update the parametric `speak[]()` function to take an argument with a parametric type. Although the function has a default parameter value for `a`, Mojo instead uses the inferred `a` parameter value from the `bar` argument (as written, the default `a` value can never be used, but this is just for demonstration purposes):

```mojo
@value
struct Bar[v: Int]:
    pass

fn speak[a: Int = 3, msg: StringLiteral = "woof"](bar: Bar[a]):
    print(msg, a)

fn use_inferred():
    speak(Bar[9]())  # prints 'woof 9'
```

```mojo
@value
struct Bar[v: Int]:
    pass

fn speak[a: Int = 3, msg: StringLiteral = "woof"](bar: Bar[a]):
    print(msg, a)

fn use_inferred():
    speak(Bar[9]())  # prints 'woof 9'
```

As mentioned above, you can also use optional parameters and keyword parameters in a struct:

```mojo
struct KwParamStruct[greeting: String = "Hello", name: String = "🔥mojo🔥"]:
    fn __init__(out self):
        print(greeting, name)

fn use_kw_params():
    var a = KwParamStruct[]()                 # prints 'Hello 🔥mojo🔥'
    var b = KwParamStruct[name="World"]()     # prints 'Hello World'
    var c = KwParamStruct[greeting="Hola"]()  # prints 'Hola 🔥mojo🔥'
```

```mojo
struct KwParamStruct[greeting: String = "Hello", name: String = "🔥mojo🔥"]:
    fn __init__(out self):
        print(greeting, name)

fn use_kw_params():
    var a = KwParamStruct[]()                 # prints 'Hello 🔥mojo🔥'
    var b = KwParamStruct[name="World"]()     # prints 'Hello World'
    var c = KwParamStruct[greeting="Hola"]()  # prints 'Hola 🔥mojo🔥'
```

Mojo supports positional-only and keyword-only parameters, following the same rules as [positional-only and keyword-only arguments](functions.html#positional-only-and-keyword-only-arguments).

## Infer-only parameters[​](parameters.1.html#infer-only-parameters "Direct link to Infer-only parameters")

Sometimes you need to declare functions where parameters depend on other parameters. Because the signature is processed left to right, a parameter can only *depend* on a parameter earlier in the parameter list. For example:

```mojo
fn dependent_type[dtype: DType, value: Scalar[dtype]]():
    print("Value: ", value)
    print("Value is floating-point: ", dtype.is_floating_point())

dependent_type[DType.float64, Float64(2.2)]()
```

```mojo
fn dependent_type[dtype: DType, value: Scalar[dtype]]():
    print("Value: ", value)
    print("Value is floating-point: ", dtype.is_floating_point())

dependent_type[DType.float64, Float64(2.2)]()
```

```output
Value:  2.2000000000000002
Value is floating-point:  True
```

```output
Value:  2.2000000000000002
Value is floating-point:  True
```

You can't reverse the position of the `dtype` and `value` parameters, because `value` depends on `dtype`. However, because `dtype` is a required parameter, you can't leave it out of the parameter list and let Mojo infer it from `value`:

```mojo
dependent_type[Float64(2.2)]() # Error!
```

```mojo
dependent_type[Float64(2.2)]() # Error!
```

Infer-only parameters are a special class of parameters that are **always** either inferred from context or specified by keyword. Infer-only parameters are placed at the **beginning** of the parameter list, set off from other parameters by the `//` sigil:

```mojo
fn example[type: CollectionElement, //, list: List[type]]()
```

```mojo
fn example[type: CollectionElement, //, list: List[type]]()
```

Transforming `dtype` into an infer-only parameter solves this problem:

```mojo
fn dependent_type[dtype: DType, //, value: Scalar[dtype]]():
    print("Value: ", value)
    print("Value is floating-point: ", dtype.is_floating_point())

dependent_type[Float64(2.2)]()
```

```mojo
fn dependent_type[dtype: DType, //, value: Scalar[dtype]]():
    print("Value: ", value)
    print("Value is floating-point: ", dtype.is_floating_point())

dependent_type[Float64(2.2)]()
```

```output
Value:  2.2000000000000002
Value is floating-point:  True
```

```output
Value:  2.2000000000000002
Value is floating-point:  True
```

Because infer-only parameters are declared at the beginning of the parameter list, other parameters can depend on them, and the compiler will always attempt to infer the infer-only values from bound parameters or arguments.

There are sometimes cases where it's useful to specify an infer-only parameter by keyword. For example, the [`StringSlice`](https://docs.modular.com/mojo/stdlib/collections/string/string_slice/StringSlice) type is parametric on [origin](values/lifetimes.html):

```mojo
struct StringSlice[mut: Bool, //, origin: Origin[mut]]: ...
```

```mojo
struct StringSlice[mut: Bool, //, origin: Origin[mut]]: ...
```

Here, the `StringSlice` `mut` parameter is infer-only. The value is usually inferred when you create an instance of `StringSlice`. Binding the `mut` parameter by keyword lets you define a new type that's constrained to an immutable origin:

```mojo
alias ImmutableStringSlice = StringSlice[mut=False]
```

```mojo
alias ImmutableStringSlice = StringSlice[mut=False]
```

If the compiler can't infer the value of an infer-only parameter, and it's not specified by keyword, compilation fails.

## Variadic parameters[​](parameters.1.html#variadic-parameters "Direct link to Variadic parameters")

Mojo also supports variadic parameters, similar to [Variadic arguments](functions.html#variadic-arguments):

```mojo
struct MyTensor[*dimensions: Int]:
    pass
```

```mojo
struct MyTensor[*dimensions: Int]:
    pass
```

Variadic parameters currently have some limitations that variadic arguments don't have:

- Variadic parameters must be homogeneous—that is, all the values must be the same type.
- The parameter type must be register-passable.
- The parameter values aren't automatically projected into a `VariadicList`, so you need to construct the list explicitly:

```mojo
fn sum_params[*values: Int]() -> Int:
    alias list = VariadicList(values)
    var sum = 0
    for v in list:
        sum += v
    return sum
```

```mojo
fn sum_params[*values: Int]() -> Int:
    alias list = VariadicList(values)
    var sum = 0
    for v in list:
        sum += v
    return sum
```

Variadic keyword parameters (for example, `**kwparams`) are not supported yet.

## Parameter expressions are just Mojo code[​](parameters.1.html#parameter-expressions-are-just-mojo-code "Direct link to Parameter expressions are just Mojo code")

A parameter expression is any code expression (such as `a+b`) that occurs where a parameter is expected. Parameter expressions support operators and function calls, just like runtime code, and all parameter types use the same type system as the runtime program (such as `Int` and `DType`).

Because parameter expressions use the same grammar and types as runtime Mojo code, you can use many ["dependent type"](https://en.wikipedia.org/wiki/Dependent_type) features. For example, you might want to define a helper function to concatenate two SIMD vectors:

```mojo
fn concat[ty: DType, len1: Int, len2: Int](
        lhs: SIMD[ty, len1], rhs: SIMD[ty, len2]) -> SIMD[ty, len1+len2]:

    var result = SIMD[ty, len1 + len2]()
    for i in range(len1):
        result[i] = SIMD[ty, 1](lhs[i])
    for j in range(len2):
        result[len1 + j] = SIMD[ty, 1](rhs[j])
    return result

var a = SIMD[DType.float32, 2](1, 2)
var x = concat(a, a)

print('result type:', x.element_type, 'length:', len(x))
```

```mojo
fn concat[ty: DType, len1: Int, len2: Int](
        lhs: SIMD[ty, len1], rhs: SIMD[ty, len2]) -> SIMD[ty, len1+len2]:

    var result = SIMD[ty, len1 + len2]()
    for i in range(len1):
        result[i] = SIMD[ty, 1](lhs[i])
    for j in range(len2):
        result[len1 + j] = SIMD[ty, 1](rhs[j])
    return result

var a = SIMD[DType.float32, 2](1, 2)
var x = concat(a, a)

print('result type:', x.element_type, 'length:', len(x))
```

```output
result type: float32 length: 4
```

```output
result type: float32 length: 4
```

Note that the resulting length is the sum of the input vector lengths, and this is expressed with a simple `+` operation.

### Powerful compile-time programming[​](parameters.1.html#powerful-compile-time-programming "Direct link to Powerful compile-time programming")

While simple expressions are useful, sometimes you want to write imperative compile-time logic with control flow. You can even do compile-time recursion. For instance, here is an example "tree reduction" algorithm that sums all elements of a vector recursively into a scalar:

```mojo
fn slice[ty: DType, new_size: Int, size: Int](
        x: SIMD[ty, size], offset: Int) -> SIMD[ty, new_size]:
    var result = SIMD[ty, new_size]()
    for i in range(new_size):
        result[i] = SIMD[ty, 1](x[i + offset])
    return result

fn reduce_add[ty: DType, size: Int](x: SIMD[ty, size]) -> Int:
    @parameter
    if size == 1:
        return Int(x[0])
    elif size == 2:
        return Int(x[0]) + Int(x[1])

    # Extract the top/bottom halves, add them, sum the elements.
    alias half_size = size // 2
    var lhs = slice[ty, half_size, size](x, 0)
    var rhs = slice[ty, half_size, size](x, half_size)
    return reduce_add[ty, half_size](lhs + rhs)

var x = SIMD[DType.index, 4](1, 2, 3, 4)
print(x)
print("Elements sum:", reduce_add(x))
```

```mojo
fn slice[ty: DType, new_size: Int, size: Int](
        x: SIMD[ty, size], offset: Int) -> SIMD[ty, new_size]:
    var result = SIMD[ty, new_size]()
    for i in range(new_size):
        result[i] = SIMD[ty, 1](x[i + offset])
    return result

fn reduce_add[ty: DType, size: Int](x: SIMD[ty, size]) -> Int:
    @parameter
    if size == 1:
        return Int(x[0])
    elif size == 2:
        return Int(x[0]) + Int(x[1])

    # Extract the top/bottom halves, add them, sum the elements.
    alias half_size = size // 2
    var lhs = slice[ty, half_size, size](x, 0)
    var rhs = slice[ty, half_size, size](x, half_size)
    return reduce_add[ty, half_size](lhs + rhs)

var x = SIMD[DType.index, 4](1, 2, 3, 4)
print(x)
print("Elements sum:", reduce_add(x))
```

```output
[1, 2, 3, 4]
Elements sum: 10
```

```output
[1, 2, 3, 4]
Elements sum: 10
```

This makes use of the [`@parameter`](decorators/parameter.html) decorator to create a parametric if condition, which is an `if` statement that runs at compile-time. It requires that its condition be a valid parameter expression, and ensures that only the live branch of the `if` statement is compiled into the program. (This is similar to use of the `@parameter` decorator with a `for` loop shown earlier.)

## Mojo types are just parameter expressions[​](parameters.1.html#mojo-types-are-just-parameter-expressions "Direct link to Mojo types are just parameter expressions")

While we've shown how you can use parameter expressions within types, type annotations can themselves be arbitrary expressions (just like in Python). Types in Mojo have a special metatype type, allowing type-parametric algorithms and functions to be defined.

For example, we can create a simplified `Array` that supports arbitrary types of elements (via the `AnyTrivialRegType` parameter):

```mojo
from memory import UnsafePointer

struct Array[T: AnyTrivialRegType]:
    var data: UnsafePointer[T]
    var size: Int

    fn __init__(out self, size: Int, value: T):
        self.size = size
        self.data = UnsafePointer[T].alloc(self.size)
        for i in range(self.size):
            (self.data + i).init_pointee_copy(value)

    fn __getitem__(self, i: Int) -> T:
        return self.data[i]

    fn __del__(owned self):
        for i in range(self.size):
            (self.data + i).destroy_pointee()
        self.data.free()

var v = Array[Float32](4, 3.14)
print(v[0], v[1], v[2], v[3])
```

```mojo
from memory import UnsafePointer

struct Array[T: AnyTrivialRegType]:
    var data: UnsafePointer[T]
    var size: Int

    fn __init__(out self, size: Int, value: T):
        self.size = size
        self.data = UnsafePointer[T].alloc(self.size)
        for i in range(self.size):
            (self.data + i).init_pointee_copy(value)

    fn __getitem__(self, i: Int) -> T:
        return self.data[i]

    fn __del__(owned self):
        for i in range(self.size):
            (self.data + i).destroy_pointee()
        self.data.free()

var v = Array[Float32](4, 3.14)
print(v[0], v[1], v[2], v[3])
```

Notice that the `T` parameter is being used as the formal type for the `value` arguments and the return type of the `__getitem__()` function. Parameters allow the `Array` type to provide different APIs based on the different use-cases.

There are many other cases that benefit from more advanced use of parameters. For example, you can execute a closure N times in parallel, feeding in a value from the context, like this:

```mojo
fn parallelize[func: fn (Int) -> None](num_work_items: Int):
    # Not actually parallel: see the 'algorithm' module for real implementation.
    for i in range(num_work_items):
        func(i)
```

```mojo
fn parallelize[func: fn (Int) -> None](num_work_items: Int):
    # Not actually parallel: see the 'algorithm' module for real implementation.
    for i in range(num_work_items):
        func(i)
```

Another example where this is important is with variadic generics, where an algorithm or data structure may need to be defined over a list of heterogeneous types such as for a tuple. Right now, this is not fully supported in Mojo and requires writing some MLIR by hand. In the future, this will be possible in pure Mojo.

## `alias`: named parameter expressions[​](parameters.1.html#alias-named-parameter-expressions "Direct link to alias-named-parameter-expressions")

It is very common to want to *name* compile-time values. Whereas `var` defines a runtime value, we need a way to define a compile-time temporary value. For this, Mojo uses an `alias` declaration.

For example, the [`DType`](https://docs.modular.com/mojo/stdlib/builtin/dtype/DType) struct implements a simple enum using aliases for the enumerators like this (the actual `DType` implementation details vary a bit):

```mojo
struct DType:
    var value : UI8
    alias invalid = DType(0)
    alias bool = DType(1)
    alias int8 = DType(2)
    alias uint8 = DType(3)
    alias int16 = DType(4)
    alias int16 = DType(5)
    ...
    alias float32 = DType(15)
```

```mojo
struct DType:
    var value : UI8
    alias invalid = DType(0)
    alias bool = DType(1)
    alias int8 = DType(2)
    alias uint8 = DType(3)
    alias int16 = DType(4)
    alias int16 = DType(5)
    ...
    alias float32 = DType(15)
```

This allows clients to use `DType.float32` as a parameter expression (which also works as a runtime value) naturally. Note that this is invoking the runtime constructor for `DType` at compile-time.

Types are another common use for aliases. Because types are compile-time expressions, it is handy to be able to do things like this:

```mojo
alias Float16 = SIMD[DType.float16, 1]
alias UInt8 = SIMD[DType.uint8, 1]

var x: Float16 = 0  # Float16 works like a "typedef"
```

```mojo
alias Float16 = SIMD[DType.float16, 1]
alias UInt8 = SIMD[DType.uint8, 1]

var x: Float16 = 0  # Float16 works like a "typedef"
```

Like `var` variables, aliases obey scope, and you can use local aliases within functions as you'd expect.

## Fully-bound, partially-bound, and unbound types[​](parameters.1.html#fully-bound-partially-bound-and-unbound-types "Direct link to Fully-bound, partially-bound, and unbound types")

A parametric type with its parameters specified is said to be *fully-bound*. That is, all of its parameters are bound to values. As mentioned before, you can only instantiate a fully-bound type (sometimes called a *concrete type*).

However, parametric types can be *unbound* or *partially bound* in some contexts. For example, you can alias a partially-bound type to create a new type that requires fewer parameters:

```mojo
from collections import Dict

alias StringKeyDict = Dict[String, _]
var b = StringKeyDict[UInt8]()
b["answer"] = 42
```

```mojo
from collections import Dict

alias StringKeyDict = Dict[String, _]
var b = StringKeyDict[UInt8]()
b["answer"] = 42
```

Here, `StringKeyDict` is a type alias for a `Dict` that takes `String` keys. The underscore `_` in the parameter list indicates that the second parameter, `V` (the value type), is unbound. You specify the `V` parameter later, when you use `StringKeyDict`.

For example, given the following type:

```mojo
struct MyType[s: String, i: Int, i2: Int, b: Bool = True]:
    pass
```

```mojo
struct MyType[s: String, i: Int, i2: Int, b: Bool = True]:
    pass
```

It can appear in code in the following forms:

- *Fully bound*, with all of its parameters specified:

  ```mojo
  MyType["Hello", 3, 4, True]
  ```

  ```mojo
  MyType["Hello", 3, 4, True]
  ```
- *Partially bound*, with *some but not all* of its parameters specified:

  ```mojo
  MyType["Hola", _, _, True]
  ```

  ```mojo
  MyType["Hola", _, _, True]
  ```
- *Unbound*, with no parameters specified:

  ```mojo
  MyType[_, _, _, _]
  ```

  ```mojo
  MyType[_, _, _, _]
  ```

You can also use the star-underscore expression `*_` to unbind an arbitrary number of positional parameters at the end of a parameter list.

```mojo
# These two types are equivalent
MyType["Hello", *_]
MyType["Hello", _, _, _]
```

```mojo
# These two types are equivalent
MyType["Hello", *_]
MyType["Hello", _, _, _]
```

The `*_` expression specifically matches any parameters that can be specified by position (positional-only or positional-or-keyword). To unbind keyword-only parameters, use the double-star-underscore expression, `**_`, which matches any parameters that can be specified by keyword (positional-or-keyword or keyword-only).

```mojo
@value
struct KeyWordStruct[pos_or_kw: Int, *, kw_only: Int = 10]:
    pass

# Unbind both pos_or_kw and kw_only parameters
fn use_kw_struct(k: KeyWordStruct[**_]):
    pass

def main():
    use_kw_struct(KeyWordStruct[10, kw_only=11]())
```

```mojo
@value
struct KeyWordStruct[pos_or_kw: Int, *, kw_only: Int = 10]:
    pass

# Unbind both pos_or_kw and kw_only parameters
fn use_kw_struct(k: KeyWordStruct[**_]):
    pass

def main():
    use_kw_struct(KeyWordStruct[10, kw_only=11]())
```

When a parameter is explicitly unbound with the `_`, `*_`, or `**_` expressions, you **must** specify a value for that parameter to use the type. Any default value from the original type declaration is ignored.

Partially-bound and unbound parametric types can be used in some contexts where the missing (unbound) parameters will be supplied later—such as in [aliases](parameters.1.html#alias-named-parameter-expressions) and [automatically parameterized functions](parameters.1.html#automatic-parameterization-of-functions).

### Omitted parameters[​](parameters.1.html#omitted-parameters "Direct link to Omitted parameters")

Mojo also supports an alternate format for unbound parameter where the parameter is simply omitted from the expression:

```mojo
# Partially bound
MyType["Hi there"]
# Unbound
MyType
```

```mojo
# Partially bound
MyType["Hi there"]
# Unbound
MyType
```

This format differs from the explicit unbinding syntax described above in that the default values for omitted parameters are bound immediately. For example, the following expressions are equivalent:

```mojo
MyType["Hi there"]
# equivalent to
MyType["Hi there", _, _, True] # Uses the default value for `b`
```

```mojo
MyType["Hi there"]
# equivalent to
MyType["Hi there", _, _, True] # Uses the default value for `b`
```

This format is currently supported for backwards compatibility. We intend to deprecate this format in the future in favor of the explicit unbinding syntax.

## Automatic parameterization of functions[​](parameters.1.html#automatic-parameterization-of-functions "Direct link to Automatic parameterization of functions")

Mojo supports "automatic" parameterization of functions. If a function argument type is a [partially-bound or unbound type](parameters.1.html#fully-bound-partially-bound-and-unbound-types), the unbound parameters are automatically added as input parameters on the function. This is easier to understand with an example:

```mojo
fn print_params(vec: SIMD[*_]):
    print(vec.type)
    print(vec.size)

var v = SIMD[DType.float64, 4](1.0, 2.0, 3.0, 4.0)
print_params(v)
```

```mojo
fn print_params(vec: SIMD[*_]):
    print(vec.type)
    print(vec.size)

var v = SIMD[DType.float64, 4](1.0, 2.0, 3.0, 4.0)
print_params(v)
```

```output
float64
4
```

```output
float64
4
```

In the above example, the `print_params` function is automatically parameterized. The `vec` argument takes an argument of type `SIMD[*_]`. This is an [unbound parameterized type](parameters.1.html#fully-bound-partially-bound-and-unbound-types)—that is, it doesn't specify any parameter values for the type. Mojo treats the unbound parameters on `vec` as infer-only parameters on the function. This is roughly equivalent to the following codes:

```mojo
fn print_params[t: DType, s: Int, //](vec: SIMD[t, s]):
    print(vec.type)
    print(vec.size)
```

```mojo
fn print_params[t: DType, s: Int, //](vec: SIMD[t, s]):
    print(vec.type)
    print(vec.size)
```

When you call `print_params()` you must pass it a concrete instance of the `SIMD` type—that is, one with all of its parameters specified, like `SIMD[DType.float64, 4]`. The Mojo compiler *infers* the parameter values from the input argument.

With a manually parameterized function, you can access the input parameters by name (for example, `t` and `s` in the previous example). For an automatically parameterized function, you can access the parameters as attributes on the argument (for example, `vec.type`).

This ability to access a type's input parameters is not specific to automatically parameterized functions, you can use it anywhere. You can access the input parameters of a parameterized type as attributes on the type itself:

```mojo
fn on_type():
    print(SIMD[DType.float32, 2].size) # prints 2
```

```mojo
fn on_type():
    print(SIMD[DType.float32, 2].size) # prints 2
```

Or as attributes on an *instance* of the type:

```mojo
fn on_instance():
    var x = SIMD[DType.int32, 2](4, 8)
    print(x.type) # prints int32
```

```mojo
fn on_instance():
    var x = SIMD[DType.int32, 2](4, 8)
    print(x.type) # prints int32
```

You can even use this syntax in the function's signature to define a function's arguments and return type based on an argument's parameters. For example, if you want your function to take two SIMD vectors with the same type and size, you can write code like this:

```mojo
fn interleave(v1: SIMD, v2: __type_of(v1)) -> SIMD[v1.type, v1.size*2]:
    var result = SIMD[v1.type, v1.size*2]()
    for i in range(v1.size):
        result[i*2] = SIMD[v1.type, 1](v1[i])
        result[i*2+1] = SIMD[v1.type, 1](v2[i])
    return result

var a = SIMD[DType.int16, 4](1, 2, 3, 4)
var b = SIMD[DType.int16, 4](0, 0, 0, 0)
var c = interleave(a, b)
print(c)
```

```mojo
fn interleave(v1: SIMD, v2: __type_of(v1)) -> SIMD[v1.type, v1.size*2]:
    var result = SIMD[v1.type, v1.size*2]()
    for i in range(v1.size):
        result[i*2] = SIMD[v1.type, 1](v1[i])
        result[i*2+1] = SIMD[v1.type, 1](v2[i])
    return result

var a = SIMD[DType.int16, 4](1, 2, 3, 4)
var b = SIMD[DType.int16, 4](0, 0, 0, 0)
var c = interleave(a, b)
print(c)
```

```output
[1, 0, 2, 0, 3, 0, 4, 0]
```

```output
[1, 0, 2, 0, 3, 0, 4, 0]
```

As shown in the example, you can use the magic `__type_of(x)` call if you just want to match the type of an argument. In this case, it's more convenient and compact that writing the equivalent `SIMD[v1.type, v1.size]`.

### Automatic parameterization of parameters[​](parameters.1.html#automatic-parameterization-of-parameters "Direct link to Automatic parameterization of parameters")

You can also take advantage of automatic parameterization in a function's parameter list. For example:

```mojo
fn foo[value: SIMD]():
    pass

# Equivalent to:
fn foo[type: DType, size: Int, //, value: SIMD[type, size]]():
    pass
```

```mojo
fn foo[value: SIMD]():
    pass

# Equivalent to:
fn foo[type: DType, size: Int, //, value: SIMD[type, size]]():
    pass
```

### Automatic parameterization with partially-bound types[​](parameters.1.html#automatic-parameterization-with-partially-bound-types "Direct link to Automatic parameterization with partially-bound types")

Mojo also supports automatic parameterization: with [partially-bound parameterized types](parameters.1.html#fully-bound-partially-bound-and-unbound-types) (that is, types with some but not all of the parameters specified).

For example, suppose we have a `Fudge` struct with three parameters:

```mojo
@value
struct Fudge[sugar: Int, cream: Int, chocolate: Int = 7](Stringable):
    fn __str__(self) -> String:
        return String.write("Fudge (", sugar, ",", cream, ",", chocolate, ")")
```

```mojo
@value
struct Fudge[sugar: Int, cream: Int, chocolate: Int = 7](Stringable):
    fn __str__(self) -> String:
        return String.write("Fudge (", sugar, ",", cream, ",", chocolate, ")")
```

We can write a function that takes a `Fudge` argument with just one bound parameter (it's *partially bound*):

```mojo
fn eat(f: Fudge[5, *_]):
    print("Ate " + String(f))
```

```mojo
fn eat(f: Fudge[5, *_]):
    print("Ate " + String(f))
```

The `eat()` function takes a `Fudge` struct with the first parameter (`sugar`) bound to the value 5. The second and third parameters, `cream` and `chocolate` are unbound.

The unbound `cream` and `chocolate` parameters become implicit input parameters on the `eat` function. In practice, this is roughly equivalent to writing:

```mojo
fn eat[cr: Int, ch: Int](f: Fudge[5, cr, ch]):
    print("Ate", String(f))
```

```mojo
fn eat[cr: Int, ch: Int](f: Fudge[5, cr, ch]):
    print("Ate", String(f))
```

In both cases, we can call the function by passing in an instance with the `cream` and `chocolate` parameters bound:

```mojo
eat(Fudge[5, 5, 7]())
eat(Fudge[5, 8, 9]())
```

```mojo
eat(Fudge[5, 5, 7]())
eat(Fudge[5, 8, 9]())
```

```output
Ate Fudge (5,5,7)
Ate Fudge (5,8,9)
```

```output
Ate Fudge (5,5,7)
Ate Fudge (5,8,9)
```

If you try to pass in an argument with a `sugar` value other than 5, compilation fails, because it doesn't match the argument type:

```mojo
eat(Fudge[12, 5, 7]())
# ERROR: invalid call to 'eat': argument #0 cannot be converted from 'Fudge[12, 5, 7]' to 'Fudge[5, 5, 7]'
```

```mojo
eat(Fudge[12, 5, 7]())
# ERROR: invalid call to 'eat': argument #0 cannot be converted from 'Fudge[12, 5, 7]' to 'Fudge[5, 5, 7]'
```

You can also explicitly unbind individual parameters. This gives you more freedom in specifying unbound parameters.

For example, you might want to let the user specify values for `sugar` and `chocolate`, and leave `cream` constant. To do this, replace each unbound parameter value with a single underscore (`_`):

```mojo
fn devour(f: Fudge[_, 6, _]):
    print("Devoured",  String(f))
```

```mojo
fn devour(f: Fudge[_, 6, _]):
    print("Devoured",  String(f))
```

Again, the unbound parameters (`sugar` and `chocolate`) are added as implicit input parameters on the function. This version is roughly equivalent to the following code, where these two values are explicitly bound to the input parameters, `su` and `ch`:

```mojo
fn devour[su: Int, ch: Int](f: Fudge[su, 6, ch]):
    print("Devoured", String(f))
```

```mojo
fn devour[su: Int, ch: Int](f: Fudge[su, 6, ch]):
    print("Devoured", String(f))
```

You can also specify parameters by keyword, or mix positional and keyword parameters, so the following function is roughly equivalent to the previous one: the first parameter, `sugar` is explicitly unbound with the underscore character. The `chocolate` parameter is unbound using the keyword syntax, `chocolate=_`. And `cream` is explicitly bound to the value 6:

```mojo
fn devour(f: Fudge[_, chocolate=_, cream=6]):
    print("Devoured", String(f))
```

```mojo
fn devour(f: Fudge[_, chocolate=_, cream=6]):
    print("Devoured", String(f))
```

All three versions of the `devour()` function work with the following calls:

```mojo
devour(Fudge[3, 6, 9]())
devour(Fudge[4, 6, 8]())
```

```mojo
devour(Fudge[3, 6, 9]())
devour(Fudge[4, 6, 8]())
```

```output
Devoured Fudge (3,6,9)
Devoured Fudge (4,6,8)
```

```output
Devoured Fudge (3,6,9)
Devoured Fudge (4,6,8)
```

### Legacy syntax (omitted parameters)[​](parameters.1.html#legacy-syntax-omitted-parameters "Direct link to Legacy syntax (omitted parameters)")

You can also specify an unbound or partially-bound type by omitting parameters: for example:

```mojo
fn nibble(f: Fudge[5]):
    print("Ate", String(f))

nibble(Fudge[5, 4, 7]())

```

```mojo
fn nibble(f: Fudge[5]):
    print("Ate", String(f))

nibble(Fudge[5, 4, 7]())

```

```output
Ate Fudge (5,4,7)
```

```output
Ate Fudge (5,4,7)
```

Here, `Fudge[5]` works like `Fudge[5, *_]` **except** in the handling of parameters with default values. Instead of discarding the default value of `chocolate`, `Fudge[5]` binds the default value immediately, making it equivalent to: `Fudge[5, _, 7]`.

This means that the following code won't compile with the previous definition for the `nibble()` function, since it doesn't use the default value for `chocolate`:

```mojo
nibble(Fudge[5, 5, 9]())
# ERROR: invalid call to 'nibble': argument #0 cannot be converted from 'Fudge[5, 5, 9]' to 'Fudge[5, 5, 7]'
```

```mojo
nibble(Fudge[5, 5, 9]())
# ERROR: invalid call to 'nibble': argument #0 cannot be converted from 'Fudge[5, 5, 9]' to 'Fudge[5, 5, 7]'
```

TODO

Support for omitting unbound parameters will eventually be deprecated in favor of explicitly unbound parameters using `_` and `*_`.

## The `rebind()` builtin[​](parameters.1.html#the-rebind-builtin "Direct link to the-rebind-builtin")

One of the consequences of Mojo not performing function instantiation in the parser like C++ is that Mojo cannot always figure out whether some parametric types are equal and complain about an invalid conversion. This typically occurs in static dispatch patterns. For example, the following code won't compile:

```mojo
fn take_simd8(x: SIMD[DType.float32, 8]):
    pass

fn generic_simd[nelts: Int](x: SIMD[DType.float32, nelts]):
    @parameter
    if nelts == 8:
        take_simd8(x)
```

```mojo
fn take_simd8(x: SIMD[DType.float32, 8]):
    pass

fn generic_simd[nelts: Int](x: SIMD[DType.float32, nelts]):
    @parameter
    if nelts == 8:
        take_simd8(x)
```

The parser will complain:

```plaintext
error: invalid call to 'take_simd8': argument #0 cannot be converted from
'SIMD[f32, nelts]' to 'SIMD[f32, 8]'
        take_simd8(x)
        ~~~~~~~~~~^~~
```

```plaintext
error: invalid call to 'take_simd8': argument #0 cannot be converted from
'SIMD[f32, nelts]' to 'SIMD[f32, 8]'
        take_simd8(x)
        ~~~~~~~~~~^~~
```

This is because the parser fully type-checks the function without instantiation, and the type of `x` is still `SIMD[f32, nelts]`, and not `SIMD[f32, 8]`, despite the static conditional. The remedy is to manually "rebind" the type of `x`, using the `rebind` builtin, which inserts a compile-time assert that the input and result types resolve to the same type after function instantiation:

```mojo
fn take_simd8(x: SIMD[DType.float32, 8]):
    pass

fn generic_simd[nelts: Int](x: SIMD[DType.float32, nelts]):
    @parameter
    if nelts == 8:
        take_simd8(rebind[SIMD[DType.float32, 8]](x))
```

```mojo
fn take_simd8(x: SIMD[DType.float32, 8]):
    pass

fn generic_simd[nelts: Int](x: SIMD[DType.float32, nelts]):
    @parameter
    if nelts == 8:
        take_simd8(rebind[SIMD[DType.float32, 8]](x))
```



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fparameters%2F)

- [Parameterized functions](parameters.1.html#parameterized-functions)
- [Anatomy of a parameter list](parameters.1.html#anatomy-of-a-parameter-list)
- [Parameters and generics](parameters.1.html#parameters-and-generics)
- [Parameterized structs](parameters.1.html#parameterized-structs)

  - [Conditional conformance](parameters.1.html#conditional-conformance)
  - [Case study: the SIMD type](parameters.1.html#case-study-the-simd-type)
- [Overloading on parameters](parameters.1.html#overloading-on-parameters)
- [Using parameterized types and functions](parameters.1.html#using-parameterized-types-and-functions)

  - [Parameter inference](parameters.1.html#parameter-inference)
- [Optional parameters and keyword parameters](parameters.1.html#optional-parameters-and-keyword-parameters)
- [Infer-only parameters](parameters.1.html#infer-only-parameters)
- [Variadic parameters](parameters.1.html#variadic-parameters)
- [Parameter expressions are just Mojo code](parameters.1.html#parameter-expressions-are-just-mojo-code)

  - [Powerful compile-time programming](parameters.1.html#powerful-compile-time-programming)
- [Mojo types are just parameter expressions](parameters.1.html#mojo-types-are-just-parameter-expressions)
- [`alias`: named parameter expressions](parameters.1.html#alias-named-parameter-expressions)
- [Fully-bound, partially-bound, and unbound types](parameters.1.html#fully-bound-partially-bound-and-unbound-types)

  - [Omitted parameters](parameters.1.html#omitted-parameters)
- [Automatic parameterization of functions](parameters.1.html#automatic-parameterization-of-functions)

  - [Automatic parameterization of parameters](parameters.1.html#automatic-parameterization-of-parameters)
  - [Automatic parameterization with partially-bound types](parameters.1.html#automatic-parameterization-with-partially-bound-types)
  - [Legacy syntax (omitted parameters)](parameters.1.html#legacy-syntax-omitted-parameters)
- [The `rebind()` builtin](parameters.1.html#the-rebind-builtin)











Structs | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



# Structs

A Mojo struct is a data structure that allows you to encapsulate fields and methods that operate on an abstraction, such as a data type or an object. **Fields** are variables that hold data relevant to the struct, and **methods** are functions inside a struct that generally act upon the field data.

For example, if you're building a graphics program, you can use a struct to define an `Image` that has fields to store information about each image (such as the pixels) and methods that perform actions on it (such as rotate it).

For the most part, Mojo's struct format is designed to provide a static, memory-safe data structure for high-level data types used in programs. For example, all the data types in Mojo's standard library (such as `Int`, `Bool`, `String`, and `Tuple`) are defined as structs.

If you understand how [functions](functions.html) and [variables](variables.html) work in Mojo, you probably noticed that Mojo is designed to provide dynamic programming features in a `def` function while enforcing stronger code safety in `fn` functions. When it comes to structs, Mojo leans toward the safe side: You can still choose whether to use either `def` or `fn` declarations for methods, but all fields must be declared with `var`.

## Struct definition[​](structs.html#struct-definition "Direct link to Struct definition")

You can define a simple struct called `MyPair` with two fields like this:

```mojo
struct MyPair:
    var first: Int
    var second: Int
```

```mojo
struct MyPair:
    var first: Int
    var second: Int
```

However, you can't instantiate this struct because it has no constructor method. So here it is with a constructor to initialize the two fields:

```mojo
struct MyPair:
    var first: Int
    var second: Int

    fn __init__(out self, first: Int, second: Int):
        self.first = first
        self.second = second
```

```mojo
struct MyPair:
    var first: Int
    var second: Int

    fn __init__(out self, first: Int, second: Int):
        self.first = first
        self.second = second
```

Notice that the first argument in the `__init__()` method is `out self`. You'll have a `self` argument as the first argument on all struct methods. It references the current struct instance (it allows code in the method to refer to "itself"). *When you call the constructor, you never pass a value for `self`—Mojo passes it in automatically.*

The `out` portion of `out self` is an [argument convention](values/ownership.html#argument-conventions) that declares `self` as a mutable reference that starts out as uninitialized and must be initialized before the function returns.

The `__init__()` method is one of many [special methods](structs.html#special-methods) (also known as "dunder methods" because they have *d*ouble *under*scores) with pre-determined names.

You can't assign values when you declare fields. You must initialize all of the struct's fields in the constructor. (If you try to leave a field uninitialized, the code won't compile.)

Once you have a constructor, you can create an instance of `MyPair` and set the fields:

```mojo
var mine = MyPair(2,4)
print(mine.first)
```

```mojo
var mine = MyPair(2,4)
print(mine.first)
```

```output
2
```

```output
2
```

## Methods[​](structs.html#methods "Direct link to Methods")

In addition to special methods like `__init__()`, you can add any other method you want to your struct. For example:

```mojo
struct MyPair:
    var first: Int
    var second: Int

    fn __init__(out self, first: Int, second: Int):
        self.first = first
        self.second = second

    fn get_sum(self) -> Int:
        return self.first + self.second
```

```mojo
struct MyPair:
    var first: Int
    var second: Int

    fn __init__(out self, first: Int, second: Int):
        self.first = first
        self.second = second

    fn get_sum(self) -> Int:
        return self.first + self.second
```

```mojo
var mine = MyPair(6, 8)
print(mine.get_sum())
```

```mojo
var mine = MyPair(6, 8)
print(mine.get_sum())
```

```output
14
```

```output
14
```

Notice that `get_sum()` also uses the `self` argument, because this is the only way you can access the struct's fields in a method. The name `self` is just a convention, and you can use any name you want to refer to the struct instance that is always passed as the first argument.

Methods that take the implicit `self` argument are called *instance methods* because they act on an instance of the struct.

The `self` argument in a struct method is the only argument in an `fn` function that does not require a type. You can include it if you want, but you can elide it because Mojo already knows its type (`MyPair` in this case).

### `fn` versus `def` in struct methods[​](structs.html#fn-versus-def-in-struct-methods "Direct link to fn-versus-def-in-struct-methods")

Struct methods can be declared with either the `def` or `fn` keywords. One important difference is that an `fn` function without the `raises` keyword can't raise an error. When you call a function that *can* raise an error from inside a method that *can't* raise an error, Mojo requires you to handle any errors, as described in [Errors, error handling, and context managers](errors.html).

If you're writing code that you expect to use widely or distribute as a package, you may want to use `fn` functions for APIs that can't raise an error to limit the number of places users need to add error handling code.

A struct's `__del__()` method, or destructor, **must** be a non-raising method, so it's always declared with `fn` (and without the `raises` keyword).

### Static methods[​](structs.html#static-methods "Direct link to Static methods")

A struct can also have *static methods*. A static method can be called without creating an instance of the struct. Unlike instance methods, a static method doesn't receive the implicit `self` argument, so it can't access any fields on the struct.

To declare a static method, use the `@staticmethod` decorator and don't include a `self` argument:

```mojo
struct Logger:

    fn __init__(out self):
        pass

    @staticmethod
    fn log_info(message: String):
        print("Info: ", message)
```

```mojo
struct Logger:

    fn __init__(out self):
        pass

    @staticmethod
    fn log_info(message: String):
        print("Info: ", message)
```

You can invoke a static method by calling it on the type (in this case, `Logger`). You can also call it on an instance of the type. Both forms are shown below:

```mojo
Logger.log_info("Static method called.")
var l = Logger()
l.log_info("Static method called from instance.")
```

```mojo
Logger.log_info("Static method called.")
var l = Logger()
l.log_info("Static method called from instance.")
```

```output
Info:  Static method called.
Info:  Static method called from instance.
```

```output
Info:  Static method called.
Info:  Static method called from instance.
```

## Structs compared to classes[​](structs.html#structs-compared-to-classes "Direct link to Structs compared to classes")

If you're familiar with other object-oriented languages, then structs might sound a lot like classes, and there are some similarities, but also some important differences. Eventually, Mojo will also support classes to match the behavior of Python classes.

So, let's compare Mojo structs to Python classes. They both support methods, fields, operator overloading, decorators for metaprogramming, and more, but their key differences are as follows:

- Python classes are dynamic: they allow for dynamic dispatch, monkey-patching (or “swizzling”), and dynamically binding instance fields at runtime.
- Mojo structs are static: they are bound at compile-time (you cannot add methods at runtime). Structs allow you to trade flexibility for performance while being safe and easy to use.
- Mojo structs do not support inheritance ("sub-classing"), but a struct can implement [traits](traits.html).
- Python classes support class attributes—values that are shared by all instances of the class, equivalent to class variables or static data members in other languages.
- Mojo structs don't support static data members.

Syntactically, the biggest difference compared to a Python class is that all fields in a struct must be explicitly declared with `var`.

In Mojo, the structure and contents of a struct are set at compile time and can't be changed while the program is running. Unlike in Python, where you can add, remove, or change attributes of an object on the fly, Mojo doesn't allow that for structs.

However, the static nature of structs helps Mojo run your code faster. The program knows exactly where to find the struct's information and how to use it without any extra steps or delays at runtime.

Mojo's structs also work really well with features you might already know from Python, like operator overloading (which lets you change how math symbols like `+` and `-` work with your own data, using [special methods](structs.html#special-methods)).

As mentioned above, all Mojo's standard types (`Int`, `String`, etc.) are made using structs, rather than being hardwired into the language itself. This gives you more flexibility and control when writing your code, and it means you can define your own types with all the same capabilities (there's no special treatment for the standard library types).

## Special methods[​](structs.html#special-methods "Direct link to Special methods")

Special methods (or "dunder methods") such as `__init__()` are pre-determined method names that you can define in a struct to perform a special task.

Although it's possible to call special methods with their method names, the point is that you never should, because Mojo automatically invokes them in circumstances where they're needed (which is why they're also called "magic methods"). For example, Mojo calls the `__init__()` method when you create an instance of the struct; and when Mojo destroys the instance, it calls the `__del__()` method (if it exists).

Even operator behaviors that appear built-in (`+`, `<`, `==`, `|`, and so on) are implemented as special methods that Mojo implicitly calls upon to perform operations or comparisons on the type that the operator is applied to.

Mojo supports a long list of special methods; far too many to discuss here, but they generally match all of [Python's special methods](https://docs.python.org/3/reference/datamodel#special-method-names) and they usually accomplish one of two types of tasks:

- Operator overloading: A lot of special methods are designed to overload operators such as `<` (less-than), `+` (add), and `|` (or) so they work appropriately with each type. For example, look at the methods listed for Mojo's [`Int` type](https://docs.modular.com/mojo/stdlib/builtin/int/Int). One such method is `__lt__()`, which Mojo calls to perform a less-than comparison between two integers (for example, `num1 < num2`).
- Lifecycle event handling: These special methods deal with the lifecycle and value ownership of an instance. For example, `__init__()` and `__del__()` demarcate the beginning and end of an instance lifetime, and other special methods define the behavior for other lifecycle events such as how to copy or move a value.

You can learn all about the lifecycle special methods in the [Value lifecycle](lifecycle/index.html) section. However, most structs are simple aggregations of other types, so unless your type requires custom behaviors when an instance is created, copied, moved, or destroyed, you can synthesize the essential lifecycle methods you need (and save yourself some time) by adding the `@value` decorator.

### `@value` decorator[​](structs.html#value-decorator "Direct link to value-decorator")

When you add the [`@value` decorator](decorators/value.html) to a struct, Mojo will synthesize the essential lifecycle methods so your object provides full value semantics. Specifically, it generates the `__init__()`, `__copyinit__()`, and `__moveinit__()` methods, which allow you to construct, copy, and move your struct type in a manner that's value semantic and compatible with Mojo's ownership model.

For example:

```mojo
@value
struct MyPet:
    var name: String
    var age: Int
```

```mojo
@value
struct MyPet:
    var name: String
    var age: Int
```

Mojo will notice that you don't have a member-wise initializer, a move constructor, or a copy constructor, and it will synthesize these for you as if you had written:

```mojo
struct MyPet:
    var name: String
    var age: Int

    fn __init__(out self, owned name: String, age: Int):
        self.name = name^
        self.age = age

    fn __copyinit__(out self, existing: Self):
        self.name = existing.name
        self.age = existing.age

    fn __moveinit__(out self, owned existing: Self):
        self.name = existing.name^
        self.age = existing.age
```

```mojo
struct MyPet:
    var name: String
    var age: Int

    fn __init__(out self, owned name: String, age: Int):
        self.name = name^
        self.age = age

    fn __copyinit__(out self, existing: Self):
        self.name = existing.name
        self.age = existing.age

    fn __moveinit__(out self, owned existing: Self):
        self.name = existing.name^
        self.age = existing.age
```

Without the copy and move constructors, the following code would not work because Mojo would not know how to copy an instance of `MyPet`:

```mojo
var dog = MyPet("Charlie", 5)
var poodle = dog
print(poodle.name)
```

```mojo
var dog = MyPet("Charlie", 5)
var poodle = dog
print(poodle.name)
```

```output
Charlie
```

```output
Charlie
```

When you add the `@value` decorator, Mojo synthesizes each special method above only if it doesn't exist already. That is, you can still implement a custom version of each method.

In addition to the `out` argument convention you already saw with `__init__()`, this code also introduces `owned`, which is another argument convention that ensures the argument has unique ownership of the value. For more detail, see the section about [value ownership](values/ownership.html).



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fstructs)

- [Struct definition](structs.html#struct-definition)
- [Methods](structs.html#methods)

  - [`fn` versus `def` in struct methods](structs.html#fn-versus-def-in-struct-methods)
  - [Static methods](structs.html#static-methods)
- [Structs compared to classes](structs.html#structs-compared-to-classes)
- [Special methods](structs.html#special-methods)

  - [`@value` decorator](structs.html#value-decorator)











Traits | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



# Traits

A *trait* is a set of requirements that a type must implement. You can think of it as a contract: a type that *conforms* to a trait guarantees that it implements all of the features of the trait.

Traits are similar to Java *interfaces*, C++ *concepts*, Swift *protocols*, and Rust *traits*. If you're familiar with any of those features, Mojo traits solve the same basic problem.

## Background[​](traits.html#background "Direct link to Background")

In dynamically-typed languages like Python, you don't need to explicitly declare that two classes are similar. This is easiest to show by example:

```mojo
%%python
class Duck:
    def quack(self):
        print("Quack.")

class StealthCow:
    def quack(self):
        print("Moo!")

def make_it_quack_python(maybe_a_duck):
    try:
        maybe_a_duck.quack()
    except:
        print("Not a duck.")

make_it_quack_python(Duck())
make_it_quack_python(StealthCow())
```

```mojo
%%python
class Duck:
    def quack(self):
        print("Quack.")

class StealthCow:
    def quack(self):
        print("Moo!")

def make_it_quack_python(maybe_a_duck):
    try:
        maybe_a_duck.quack()
    except:
        print("Not a duck.")

make_it_quack_python(Duck())
make_it_quack_python(StealthCow())
```

The `Duck` and `StealthCow` classes aren't related in any way, but they both define a `quack()` method, so they work the same in the `make_it_quack()` function. This works because Python uses dynamic dispatch—it identifies the methods to call at runtime. So `make_it_quack_python()` doesn't care what types you're passing it, only the fact that they implement the `quack()` method.

In a statically-typed environment, this approach doesn't work: [`fn` functions](functions.html#fn-functions) require you to specify the type of each argument. If you wanted to write this example in Mojo *without* traits, you'd need to write a function overload for each input type. All of the examples from here on are in Mojo, so we'll just call the function `make_it_quack()` going forward.

```mojo
@value
struct Duck:
    fn quack(self):
        print("Quack")

@value
struct StealthCow:
    fn quack(self):
        print("Moo!")

fn make_it_quack(definitely_a_duck: Duck):
    definitely_a_duck.quack()

fn make_it_quack(not_a_duck: StealthCow):
    not_a_duck.quack()

make_it_quack(Duck())
make_it_quack(StealthCow())
```

```mojo
@value
struct Duck:
    fn quack(self):
        print("Quack")

@value
struct StealthCow:
    fn quack(self):
        print("Moo!")

fn make_it_quack(definitely_a_duck: Duck):
    definitely_a_duck.quack()

fn make_it_quack(not_a_duck: StealthCow):
    not_a_duck.quack()

make_it_quack(Duck())
make_it_quack(StealthCow())
```

```output
Quack
Moo!
```

```output
Quack
Moo!
```

This isn't too bad with only two types. But the more types you want to support, the less practical this approach is.

You might notice that the Mojo versions of `make_it_quack()` don't include the `try/except` statement. We don't need it because Mojo's static type checking ensures that you can only pass instances of `Duck` or `StealthCow` into the `make_it_quack()`function.

## Using traits[​](traits.html#using-traits "Direct link to Using traits")

Traits solve this problem by letting you define a shared set of *behaviors* that types can implement. Then you can write a function that depends on the trait, rather than individual types. As an example, let's update the `make_it_quack()` example using traits. The first step is defining a trait:

```mojo
trait Quackable:
    fn quack(self):
        ...
```

```mojo
trait Quackable:
    fn quack(self):
        ...
```

A trait looks a lot like a struct, except it's introduced by the `trait` keyword. A trait can contain method signatures, but it can't implement those methods. Each method signature must be followed by three dots (`...`) to indicate that the method is unimplemented.

A trait can also include associated aliases—compile-time constant values that must be defined by conforming structs. Associated aliases are useful for writing traits that describe generic types. For more information, see [Associated aliases for generics](traits.html#associated-aliases-for-generics).

TODO

In the future, we plan to support defining fields and default method implementations inside a trait.

Next we create some structs that conform to the `Quackable` trait. To indicate that a struct conforms to a trait, include the trait name in parenthesis after the struct name. You can also include multiple traits, separated by commas. (If you're familiar with Python, this looks just like Python's inheritance syntax.)

```mojo
@value
struct Duck(Quackable):
    fn quack(self):
        print("Quack")

@value
struct StealthCow(Quackable):
    fn quack(self):
        print("Moo!")
```

```mojo
@value
struct Duck(Quackable):
    fn quack(self):
        print("Quack")

@value
struct StealthCow(Quackable):
    fn quack(self):
        print("Moo!")
```

The struct needs to implement any methods that are declared in the trait. The compiler enforces conformance: if a struct says it conforms to a trait, it must implement everything required by the trait or the code won't compile.

Finally, you can define a function that takes a `Quackable` like this:

```mojo
fn make_it_quack[T: Quackable](maybe_a_duck: T):
    maybe_a_duck.quack()
```

```mojo
fn make_it_quack[T: Quackable](maybe_a_duck: T):
    maybe_a_duck.quack()
```

This syntax may look a little unfamiliar if you haven't dealt with Mojo [parameters](parameters.1.html) before. What this signature means is that `maybe_a_duck` is an argument of type `T`, where `T` is a type that must conform to the `Quackable` trait. TODO: This syntax is a little verbose, and we hope to make it more ergonomic in a future release.

Using the method is simple enough:

```mojo
make_it_quack(Duck())
make_it_quack(StealthCow())
```

```mojo
make_it_quack(Duck())
make_it_quack(StealthCow())
```

```output
Quack
Moo!
```

```output
Quack
Moo!
```

Note that you don't need the square brackets when you call `make_it_quack()`: the compiler infers the type of the argument, and ensures the type has the required trait.

One limitation of traits is that you can't add traits to existing types. For example, if you define a new `Numeric` trait, you can't add it to the standard library `Float64` and `Int` types. However, the standard library already includes a few traits, and we'll be adding more over time.

### Traits can require static methods[​](traits.html#traits-can-require-static-methods "Direct link to Traits can require static methods")

In addition to regular instance methods, traits can specify required static methods.

```mojo
trait HasStaticMethod:
    @staticmethod
    fn do_stuff(): ...

fn fun_with_traits[T: HasStaticMethod]():
    T.do_stuff()
```

```mojo
trait HasStaticMethod:
    @staticmethod
    fn do_stuff(): ...

fn fun_with_traits[T: HasStaticMethod]():
    T.do_stuff()
```

## Implicit trait conformance[​](traits.html#implicit-trait-conformance "Direct link to Implicit trait conformance")

Mojo also supports *implicit* trait conformance. That is, if a type implements all of the methods required for a trait, it's treated as conforming to the trait, even if it doesn't explicitly include the trait in its declaration:

```mojo
struct RubberDucky:
    fn quack(self):
        print("Squeak!")

make_it_quack(RubberDucky())
```

```mojo
struct RubberDucky:
    fn quack(self):
        print("Squeak!")

make_it_quack(RubberDucky())
```

Implicit conformance can be handy if you're defining a trait and you want it to work with types that you don't control—such as types from the standard library, or a third-party library.

However, we still strongly recommend explicit trait conformance wherever possible. This has two advantages:

- Documentation. It makes it clear that the type conforms to the trait, without having to scan all of its methods.
- Future feature support. When default method implementations are added to traits, they'll only work for types that explicitly conform to traits.

## Trait inheritance[​](traits.html#trait-inheritance "Direct link to Trait inheritance")

Traits can inherit from other traits. A trait that inherits from another trait includes all of the requirements declared by the parent trait. For example:

```mojo
trait Animal:
    fn make_sound(self):
        ...

# Bird inherits from Animal
trait Bird(Animal):
    fn fly(self):
        ...
```

```mojo
trait Animal:
    fn make_sound(self):
        ...

# Bird inherits from Animal
trait Bird(Animal):
    fn fly(self):
        ...
```

Since `Bird` inherits from `Animal`, a struct that conforms to the `Bird` trait needs to implement **both** `make_sound()` and `fly()`. And since every `Bird` conforms to `Animal`, a struct that conforms to `Bird` can be passed to any function that requires an `Animal`.

To inherit from multiple traits, add a comma-separated list of traits inside the parenthesis. For example, you could define a `NamedAnimal` trait that combines the requirements of the `Animal` trait and a new `Named` trait:

```mojo
trait Named:
    fn get_name(self) -> String:
        ...

trait NamedAnimal(Animal, Named):
    pass
```

```mojo
trait Named:
    fn get_name(self) -> String:
        ...

trait NamedAnimal(Animal, Named):
    pass
```

## Traits and lifecycle methods[​](traits.html#traits-and-lifecycle-methods "Direct link to Traits and lifecycle methods")

Traits can specify required [lifecycle methods](lifecycle/index.html#lifecycles-and-lifetimes), including constructors, copy constructors and move constructors.

For example, the following code creates a `MassProducible` trait. A `MassProducible` type has a default (no-argument) constructor and can be moved. It uses the built-in [`Movable`](https://docs.modular.com/mojo/stdlib/builtin/value/Movable) trait, which requires the type to have a [move constructor](lifecycle/life.html#move-constructor).

The `factory[]()` function returns a newly-constructed instance of a `MassProducible` type.

```mojo
trait DefaultConstructible:
    fn __init__(out self): ...

trait MassProducible(DefaultConstructible, Movable):
    pass

fn factory[T: MassProducible]() -> T:
    return T()

struct Thing(MassProducible):
    var id: Int

    fn __init__(out self):
        self.id = 0

    fn __moveinit__(out self, owned existing: Self):
        self.id = existing.id

var thing = factory[Thing]()
```

```mojo
trait DefaultConstructible:
    fn __init__(out self): ...

trait MassProducible(DefaultConstructible, Movable):
    pass

fn factory[T: MassProducible]() -> T:
    return T()

struct Thing(MassProducible):
    var id: Int

    fn __init__(out self):
        self.id = 0

    fn __moveinit__(out self, owned existing: Self):
        self.id = existing.id

var thing = factory[Thing]()
```

Note that [`@register_passable("trivial")`](decorators/register-passable.html#register_passabletrivial) types have restrictions on their lifecycle methods: they can't define copy or move constructors, because they don't require any custom logic.

For the purpose of trait conformance, the compiler treats trivial types as copyable and movable.

## Built-in traits[​](traits.html#built-in-traits "Direct link to Built-in traits")

The Mojo standard library includes many traits. They're implemented by a number of standard library types, and you can also implement these on your own types. These standard library traits include:

- [`Absable`](https://docs.modular.com/mojo/stdlib/builtin/math/Absable)
- [`AnyType`](https://docs.modular.com/mojo/stdlib/builtin/anytype/AnyType)
- [`Boolable`](https://docs.modular.com/mojo/stdlib/builtin/bool/Boolable)
- [`BoolableCollectionElement`](https://docs.modular.com/mojo/stdlib/builtin/value/BoolableCollectionElement)
- [`BoolableKeyElement`](https://docs.modular.com/mojo/stdlib/builtin/value/BoolableKeyElement)
- [`CollectionElement`](https://docs.modular.com/mojo/stdlib/builtin/value/CollectionElement)
- [`Comparable`](https://docs.modular.com/mojo/stdlib/builtin/comparable/Comparable)
- [`ComparableCollectionElement`](https://docs.modular.com/mojo/stdlib/builtin/value/ComparableCollectionElement)
- [`Copyable`](https://docs.modular.com/mojo/stdlib/builtin/value/Copyable)
- [`Defaultable`](https://docs.modular.com/mojo/stdlib/builtin/value/Defaultable)
- [`Hashable`](https://docs.modular.com/mojo/stdlib/builtin/hash/Hashable)
- [`Indexer`](https://docs.modular.com/mojo/stdlib/builtin/int/Indexer)
- [`Intable`](https://docs.modular.com/mojo/stdlib/builtin/int/Intable)
- [`IntableRaising`](https://docs.modular.com/mojo/stdlib/builtin/int/IntableRaising)
- [`KeyElement`](https://docs.modular.com/mojo/stdlib/collections/dict/KeyElement)
- [`Movable`](https://docs.modular.com/mojo/stdlib/builtin/value/Movable)
- [`PathLike`](https://docs.modular.com/mojo/stdlib/os/pathlike/PathLike)
- [`Powable`](https://docs.modular.com/mojo/stdlib/builtin/math/Powable)
- [`Representable`](https://docs.modular.com/mojo/stdlib/builtin/repr/Representable)
- [`RepresentableCollectionElement`](https://docs.modular.com/mojo/stdlib/builtin/value/RepresentableCollectionElement)
- [`RepresentableKeyElement`](https://docs.modular.com/mojo/stdlib/collections/dict/RepresentableKeyElement)
- [`Sized`](https://docs.modular.com/mojo/stdlib/builtin/len/Sized)
- [`Stringable`](https://docs.modular.com/mojo/stdlib/builtin/str/Stringable)
- [`StringableRaising`](https://docs.modular.com/mojo/stdlib/builtin/str/StringableRaising)
- [`Roundable`](https://docs.modular.com/mojo/stdlib/builtin/math/Roundable)
- [`Writable`](https://docs.modular.com/mojo/stdlib/utils/write/Writable)
- [`WritableCollectionElement`](https://docs.modular.com/mojo/stdlib/builtin/value/WritableCollectionElement)
- [`Writer`](https://docs.modular.com/mojo/stdlib/utils/write/Writer)

The API reference docs linked above include usage examples for each trait. The following sections discuss a few of these traits.

### The `Sized` trait[​](traits.html#the-sized-trait "Direct link to the-sized-trait")

The [`Sized`](https://docs.modular.com/mojo/stdlib/builtin/len/Sized) trait identifies types that have a measurable length, like strings and arrays.

Specifically, `Sized` requires a type to implement the `__len__()` method. This trait is used by the built-in [`len()`](https://docs.modular.com/mojo/stdlib/builtin/len/len) function. For example, if you're writing a custom list type, you could implement this trait so your type works with `len()`:

```mojo
struct MyList(Sized):
    var size: Int
    # ...

    fn __init__(out self):
        self.size = 0

    fn __len__(self) -> Int:
        return self.size

print(len(MyList()))
```

```mojo
struct MyList(Sized):
    var size: Int
    # ...

    fn __init__(out self):
        self.size = 0

    fn __len__(self) -> Int:
        return self.size

print(len(MyList()))
```

```output
0
```

```output
0
```

### The `Intable` and `IntableRaising` traits[​](traits.html#the-intable-and-intableraising-traits "Direct link to the-intable-and-intableraising-traits")

The [`Intable`](https://docs.modular.com/mojo/stdlib/builtin/int/Intable) trait identifies a type that can be implicitly converted to `Int`. The [`IntableRaising`](https://docs.modular.com/mojo/stdlib/builtin/int/IntableRaising) trait describes a type can be converted to an `Int`, but the conversion might raise an error.

Both of these traits require the type to implement the `__int__()` method. For example:

```mojo
@value
struct Foo(Intable):
    var i: Int

    fn __int__(self) -> Int:
        return self.i

var foo = Foo(42)
print(Int(foo) == 42)
```

```mojo
@value
struct Foo(Intable):
    var i: Int

    fn __int__(self) -> Int:
        return self.i

var foo = Foo(42)
print(Int(foo) == 42)
```

```output
True
```

```output
True
```

### The `Stringable`, `Representable`, and `Writable` traits[​](traits.html#the-stringable-representable-and-writable-traits "Direct link to the-stringable-representable-and-writable-traits")

The [`Stringable`](https://docs.modular.com/mojo/stdlib/builtin/str/Stringable) trait identifies a type that can be explicitly converted to [`String`](https://docs.modular.com/mojo/stdlib/collections/string/string/String). The [`StringableRaising`](https://docs.modular.com/mojo/stdlib/builtin/str/StringableRaising) trait describes a type that can be converted to a `String`, but the conversion might raise an error. These traits also mean that the type can support both the `{!s}` and `{}` format specifiers of the `String` class's [`format()`](https://docs.modular.com/mojo/stdlib/collections/string/string/String#format) method. These traits require the type to define the [`__str__()`](https://docs.modular.com/mojo/stdlib/builtin/str/Stringable#__str__) method.

In contrast, the [`Representable`](https://docs.modular.com/mojo/stdlib/builtin/repr/Representable) trait defines a type that can be used with the built-in [`repr()`](https://docs.modular.com/mojo/stdlib/builtin/repr/repr) function, as well as the `{!r}` format specifier of the `format()` method. This trait requires the type to define the [`__repr__()`](https://docs.modular.com/mojo/stdlib/builtin/repr/Representable#__repr__) method, which should compute the "official" string representation of a type. If at all possible, this should look like a valid Mojo expression that could be used to recreate a struct instance with the same value.

The [`Writable`](https://docs.modular.com/mojo/stdlib/utils/write/Writable) trait describes a type that can be converted to a stream of UTF-8 encoded data by writing to a `Writer` object. The [`print()`](https://docs.modular.com/mojo/stdlib/builtin/io/print) function requires that its arguments conform to the `Writable` trait. This enables efficient stream-based writing by default, avoiding unnecessary intermediate String heap allocations.

The `Writable` trait requires a type to implement a [`write_to()`](https://docs.modular.com/mojo/stdlib/utils/write/Writable#write_to) method, which is provided with an object that conforms to the [`Writer`](https://docs.modular.com/mojo/stdlib/utils/write/Writer) as an argument. You then invoke the `Writer` instance's [`write()`](https://docs.modular.com/mojo/stdlib/utils/write/Writer#write) method to write a sequence of `Writable` arguments constituting the `String` representation of your type.

While this might sound complex at first, in practice you can minimize boilerplate and duplicated code by using the [`String.write()`](https://docs.modular.com/mojo/stdlib/collections/string/string/String#write) static function to implement the type's `Stringable` implementation in terms of its `Writable` implementation. Here is a simple example of a type that implements all of the `Stringable`, `Representable`, and `Writable` traits:

```mojo
@value
struct Dog(Stringable, Representable, Writable):
    var name: String
    var age: Int

    # Allows the type to be written into any `Writer`
    fn write_to[W: Writer](self, mut writer: W) -> None:
        writer.write("Dog(", self.name, ", ", self.age, ")")

    # Construct and return a `String` using the previous method
    fn __str__(self) -> String:
        return String.write(self)

    # Alternative full representation when calling `repr`
    fn __repr__(self) -> String:
        return String("Dog(name=", repr(self.name), ", age=", repr(self.age), ")")

var dog = Dog("Rex", 5)
print(repr(dog))
print(dog)

var dog_info = "String: {!s}\nRepresentation: {!r}".format(dog, dog)
print(dog_info)
```

```mojo
@value
struct Dog(Stringable, Representable, Writable):
    var name: String
    var age: Int

    # Allows the type to be written into any `Writer`
    fn write_to[W: Writer](self, mut writer: W) -> None:
        writer.write("Dog(", self.name, ", ", self.age, ")")

    # Construct and return a `String` using the previous method
    fn __str__(self) -> String:
        return String.write(self)

    # Alternative full representation when calling `repr`
    fn __repr__(self) -> String:
        return String("Dog(name=", repr(self.name), ", age=", repr(self.age), ")")

var dog = Dog("Rex", 5)
print(repr(dog))
print(dog)

var dog_info = "String: {!s}\nRepresentation: {!r}".format(dog, dog)
print(dog_info)
```

```output
Dog(name='Rex', age=5)
Dog(Rex, 5)
String: Dog(Rex, 5)
Representation: Dog(name='Rex', age=5)
```

```output
Dog(name='Rex', age=5)
Dog(Rex, 5)
String: Dog(Rex, 5)
Representation: Dog(name='Rex', age=5)
```

### The `AnyType` trait[​](traits.html#the-anytype-trait "Direct link to the-anytype-trait")

When building a generic container type, one challenge is knowing how to dispose of the contained items when the container is destroyed. Any type that dynamically allocates memory needs to supply a [destructor](lifecycle/death.html#destructor) (`__del__()` method) that must be called to free the allocated memory. But not all types have a destructor, and your Mojo code has no way to determine which is which.

The [`AnyType`](https://docs.modular.com/mojo/stdlib/builtin/anytype/AnyType) trait solves this issue: every trait implicitly inherits from `AnyType`, and all structs conform to `AnyType`, which guarantees that the type has a destructor. For types that don't have one, Mojo adds a no-op destructor. This means you can call the destructor on any type.

This makes it possible to build generic collections without leaking memory. When the collection's destructor is called, it can safely call the destructors on every item it contains.

## Generic structs with traits[​](traits.html#generic-structs-with-traits "Direct link to Generic structs with traits")

You can also use traits when defining a generic container. A generic container is a container (for example, an array or hashmap) that can hold different data types. In a dynamic language like Python it's easy to add different types of items to a container. But in a statically-typed environment the compiler needs to be able to identify the types at compile time. For example, if the container needs to copy a value, the compiler needs to verify that the type can be copied.

The [`List`](https://docs.modular.com/mojo/stdlib/collections/list) type is an example of a generic container. A single `List` can only hold a single type of data. For example, you can create a list of integer values like this:

```mojo
from collections import List

var list = List[Int](1, 2, 3)
for i in range(len(list)):
    print(list[i], sep=" ", end="")
```

```mojo
from collections import List

var list = List[Int](1, 2, 3)
for i in range(len(list)):
    print(list[i], sep=" ", end="")
```

```output
1  2  3
```

```output
1  2  3
```

You can use traits to define requirements for elements that are stored in a container. For example, `List` requires elements that can be moved and copied. To store a struct in a `List`, the struct needs to conform to the `CollectionElement` trait, which requires a [copy constructor](lifecycle/life.html#copy-constructor) and a [move constructor](lifecycle/life.html#move-constructor).

Building generic containers is an advanced topic. For an introduction, see the section on [parameterized structs](parameters.1.html#parameterized-structs).

### Associated aliases for generics[​](traits.html#associated-aliases-for-generics "Direct link to Associated aliases for generics")

In addition to methods, a trait can include *associated aliases*, which must be defined by any conforming struct. For example:

```mojo
trait Repeater:
    alias count: Int
```

```mojo
trait Repeater:
    alias count: Int
```

An implementing struct must define a concrete constant value for the alias, using any compile-time parameter value. For example, it can use a literal constant or a compile-time expression, including one that uses the struct's parameters.

```mojo
struct Doublespeak(Repeater):
    alias count: Int = 2

struct Multispeak[verbosity: Int](Repeater):
    alias count: Int = verbosity*2+1
```

```mojo
struct Doublespeak(Repeater):
    alias count: Int = 2

struct Multispeak[verbosity: Int](Repeater):
    alias count: Int = verbosity*2+1
```

The `Doublespeak` struct has a constant value for the alias, but the `Multispeak` struct lets the user set the value using a parameter:

```mojo
repeater = Multispeak[12]()
```

```mojo
repeater = Multispeak[12]()
```

Note that the alias is named `count`, and the `Multispeak` parameter is named `verbosity`. Parameters and aliases are in the same namespace, so the parameter can't have the same name as the associated alias.

Associated aliases are most useful for writing traits for generic types. For example, imagine that you want to write a trait that describes a generic stack data structure that stores elements that conform to the `CollectionElement` trait.

By adding the element type as an associated alias to the trait, you can specify generic methods on the trait:

```mojo
trait Stacklike:
    alias EltType: CollectionElement

    def push(mut self, owned item: Self.EltType):
        pass

    def pop(mut self) -> Self.EltType:
        pass
```

```mojo
trait Stacklike:
    alias EltType: CollectionElement

    def push(mut self, owned item: Self.EltType):
        pass

    def pop(mut self) -> Self.EltType:
        pass
```

The following struct implements the `Stacklike` trait using a `List` as the underlying storage:

```mojo
struct MyStack[T: CollectionElement](Stacklike):
    """A simple Stack built using a List."""
    alias EltType = T
    alias list_type = List[Self.EltType]

    var list: Self.list_type

    fn __init__(out self):
        self.list = Self.list_type()

    def push(mut self, owned item: Self.EltType):
        self.list.append(item)

    def pop(mut self) -> Self.EltType:
        return self.list.pop()

    def dump[U: RepresentableCollectionElement](self: MyStack[U]):
        print(self.list.__repr__())
```

```mojo
struct MyStack[T: CollectionElement](Stacklike):
    """A simple Stack built using a List."""
    alias EltType = T
    alias list_type = List[Self.EltType]

    var list: Self.list_type

    fn __init__(out self):
        self.list = Self.list_type()

    def push(mut self, owned item: Self.EltType):
        self.list.append(item)

    def pop(mut self) -> Self.EltType:
        return self.list.pop()

    def dump[U: RepresentableCollectionElement](self: MyStack[U]):
        print(self.list.__repr__())
```

The `MyStack` type adds a `dump()` method that prints the contents of the stack. Because a struct that conforms to `CollectionElement` is not necessarily printable, `MyStack` uses [conditional conformance](parameters.1.html#conditional-conformance) to define a `dump()` method that works as long as the element type is *representable*.

The following code exercises this new trait by defining a generic method, `add_to_stack()` that adds an item to any `Stacklike` type.

```mojo
def add_to_stack[S: Stacklike](mut stack: S, item: S.EltType):
    stack.push(item)

def main():
    s = MyStack[Int]()
    add_to_stack(s, 12)
    add_to_stack(s, 33)
    s.dump()             # [12, 33]
    print(s.pop())       # 33
```

```mojo
def add_to_stack[S: Stacklike](mut stack: S, item: S.EltType):
    stack.push(item)

def main():
    s = MyStack[Int]()
    add_to_stack(s, 12)
    add_to_stack(s, 33)
    s.dump()             # [12, 33]
    print(s.pop())       # 33
```



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Ftraits)

- [Background](traits.html#background)
- [Using traits](traits.html#using-traits)

  - [Traits can require static methods](traits.html#traits-can-require-static-methods)
- [Implicit trait conformance](traits.html#implicit-trait-conformance)
- [Trait inheritance](traits.html#trait-inheritance)
- [Traits and lifecycle methods](traits.html#traits-and-lifecycle-methods)
- [Built-in traits](traits.html#built-in-traits)

  - [The `Sized` trait](traits.html#the-sized-trait)
  - [The `Intable` and `IntableRaising` traits](traits.html#the-intable-and-intableraising-traits)
  - [The `Stringable`, `Representable`, and `Writable` traits](traits.html#the-stringable-representable-and-writable-traits)
  - [The `AnyType` trait](traits.html#the-anytype-trait)
- [Generic structs with traits](traits.html#generic-structs-with-traits)

  - [Associated aliases for generics](traits.html#associated-aliases-for-generics)











Types | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



# Types

All values in Mojo have an associated data type. Most of the types are *nominal* types, defined by a [`struct`](structs.html). These types are nominal (or "named") because type equality is determined by the type's *name*, not its *structure*.

There are a some types that aren't defined as structs:

- Functions are typed based on their signatures.
- `NoneType` is a type with one instance, the `None` object, which is used to signal "no value."

Mojo comes with a standard library that provides a number of useful types and utility functions. These standard types aren't privileged. Each of the standard library types is defined just like user-defined types—even basic types like [`Int`](https://docs.modular.com/mojo/stdlib/builtin/int/Int) and [`String`](https://docs.modular.com/mojo/stdlib/collections/string/string/String). But these standard library types are the building blocks you'll use for most Mojo programs.

The most common types are *built-in types*, which are always available and don't need to be imported. These include types for numeric values, strings, boolean values, and others.

The standard library also includes many more types that you can import as needed, including collection types, utilities for interacting with the filesystem and getting system information, and so on.

## Numeric types[​](types.html#numeric-types "Direct link to Numeric types")

Mojo's most basic numeric type is `Int`, which represents a signed integer of the largest size supported by the system—typically 64 bits or 32 bits.

Mojo also has built-in types for integer, unsigned integer, and floating-point values of various precisions:

| Type name | Description                                           |
|-----------|-------------------------------------------------------|
| `Int8`    | 8-bit signed integer                                  |
| `UInt8`   | 8-bit unsigned integer                                |
| `Int16`   | 16-bit signed integer                                 |
| `UInt16`  | 16-bit unsigned integer                               |
| `Int32`   | 32-bit signed integer                                 |
| `UInt32`  | 32-bit unsigned integer                               |
| `Int64`   | 64-bit signed integer                                 |
| `UInt64`  | 64-bit unsigned integer                               |
| `Int128`  | 128-bit signed integer                                |
| `UInt128` | 128-bit unsigned integer                              |
| `Int256`  | 256-bit signed integer                                |
| `UInt256` | 256-bit unsigned integer                              |
| `Float16` | 16-bit floating point number (IEEE 754-2008 binary16) |
| `Float32` | 32-bit floating point number (IEEE 754-2008 binary32) |
| `Float64` | 64-bit floating point number (IEEE 754-2008 binary64) |

**Table 1.** Numeric types with specific precision

The types in Table 1 are actually all aliases to a single type, [`SIMD`](https://docs.modular.com/mojo/stdlib/builtin/simd/SIMD), which is discussed later.

All of the numeric types support the usual numeric and bitwise operators. The [`math`](https://docs.modular.com/mojo/stdlib/math/) module provides a number of additional math functions.

You may wonder when to use `Int` and when to use the other integer types. In general, `Int` is a good safe default when you need an integer type and you don't require a specific bit width. Using `Int` as the default integer type for APIs makes APIs more consistent and predictable.

### Signed and unsigned integers[​](types.html#signed-and-unsigned-integers "Direct link to Signed and unsigned integers")

Mojo supports both signed (`Int`) and unsigned (`UInt`) integers. You can use the general `Int` or `UInt` types when you do not require a specific bit width. Note that any alias to a fixed-precision type will be of type [`SIMD`](https://docs.modular.com/mojo/stdlib/builtin/simd/SIMD).

You might prefer to use unsigned integers over signed integers in conditions where you don't need negative numbers, are not writing for a public API, or need additional range.

Mojo's `UInt` type represents an unsigned integer of the [word size](https://en.wikipedia.org/wiki/Word_%28computer_architecture%29) of the CPU, which is 64 bits on 64-bit CPUs and 32 bits on 32-bit CPUs. If you wish to use a fixed size unsigned integer, you can use `UInt8`, `UInt16`, `UInt32`, or `UInt64`, which are aliases to the [`SIMD`](https://docs.modular.com/mojo/stdlib/builtin/simd/SIMD) type.

Signed and unsigned integers of the same bit width can represent the same number of values, but have different ranges. For example, an `Int8` can represent 256 values ranging from -128 to 127. A `UInt8` can also represent 256 values, but represents a range of 0 to 255.

Signed and unsigned integers also have different overflow behavior. When a signed integer overflows outside the range of values that its type can represent, the value overflows to negative numbers. For example, adding `1` to `var si: Int8 = 127` results in `-128`.

When an unsigned integer overflows outside the range of values that its type can represent, the value overflows to zero. So, adding `1` to `var ui: UInt8 = 255` is equal to `0`.

### Floating-point numbers[​](types.html#floating-point-numbers "Direct link to Floating-point numbers")

Floating-point types represent real numbers. Because not all real numbers can be expressed in a finite number of bits, floating-point numbers can't represent every value exactly.

The floating-point types listed in Table 1—`Float64`, `Float32`, and `Float16`—follow the IEEE 754-2008 standard for representing floating-point values. Each type includes a sign bit, one set of bits representing an exponent, and another set representing the fraction or mantissa. Table 2 shows how each of these types are represented in memory.

| Type name | Sign  | Exponent | Mantissa |
|-----------|-------|----------|----------|
| `Float64` | 1 bit | 11 bits  | 52 bits  |
| `Float32` | 1 bit | 8 bits   | 23 bits  |
| `Float16` | 1 bit | 5 bits   | 10 bits  |

**Table 2.** Details of floating-point types

Numbers with exponent values of all ones or all zeros represent special values, allowing floating-point numbers to represent infinity, negative infinity, signed zeros, and not-a-number (NaN). For more details on how numbers are represented, see [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754) on Wikipedia.

A few things to note with floating-point values:

- Rounding errors. Rounding may produce unexpected results. For example, 1/3 can't be represented exactly in these floating-point formats. The more operations you perform with floating-point numbers, the more the rounding errors accumulate.
- Space between consecutive numbers. The space between consecutive numbers is variable across the range of a floating-point number format. For numbers close to zero, the distance between consecutive numbers is very small. For large positive and negative numbers, the space between consecutive numbers is greater than 1, so it may not be possible to represent consecutive integers.

Because the values are approximate, it is rarely useful to compare them with the equality operator (`==`). Consider the following example:

```mojo
var big_num = 1.0e16
var bigger_num = big_num+1.0
print(big_num == bigger_num)
```

```mojo
var big_num = 1.0e16
var bigger_num = big_num+1.0
print(big_num == bigger_num)
```

```output
True
```

```output
True
```

Comparison operators (`<` `>=` and so on) work with floating point numbers. You can also use the [`math.isclose()`](https://docs.modular.com/mojo/stdlib/math/math/isclose) function to compare whether two floating-point numbers are equal within a specified tolerance.

### Numeric literals[​](types.html#numeric-literals "Direct link to Numeric literals")

In addition to these numeric types, the standard libraries provides integer and floating-point literal types, [`IntLiteral`](https://docs.modular.com/mojo/stdlib/builtin/int_literal/IntLiteral) and [`FloatLiteral`](https://docs.modular.com/mojo/stdlib/builtin/float_literal/FloatLiteral).

These literal types are used at compile time to represent literal numbers that appear in the code. In general, you should never instantiate these types yourself.

Table 3 summarizes the literal formats you can use to represent numbers.

FormatExamplesNotes

Integer literal`1760`Integer literal, in decimal format.

Hexadecimal literal`0xaa`, `0xFF`Integer literal, in hexadecimal format.
Hex digits are case-insensitive.

Octal literal`0o77`Integer literal, in octal format.

Binary literal`0b0111`Integer literal, in binary format.

Floating-point literal`3.14`, `1.2e9`Floating-point literal.
Must include the decimal point to be interpreted as floating-point.

**Table 3.** Numeric literal formats

At compile time, the literal types are arbitrary-precision (also called infinite-precision) values, so the compiler can perform compile-time calculations without overflow or rounding errors.

At runtime the values are converted to finite-precision types—`Int` for integer values, and `Float64` for floating-point values. (This process of converting a value that can only exist at compile time into a runtime value is called *materialization*.)

The following code sample shows the difference between an arbitrary-precision calculation and the same calculation done using `Float64` values at runtime, which suffers from rounding errors.

```mojo
var arbitrary_precision = 3.0 * (4.0 / 3.0 - 1.0)
# use a variable to force the following calculation to occur at runtime
var three = 3.0
var finite_precision = three * (4.0 / three - 1.0)
print(arbitrary_precision, finite_precision)
```

```mojo
var arbitrary_precision = 3.0 * (4.0 / 3.0 - 1.0)
# use a variable to force the following calculation to occur at runtime
var three = 3.0
var finite_precision = three * (4.0 / three - 1.0)
print(arbitrary_precision, finite_precision)
```

```output
1.0 0.99999999999999978
```

```output
1.0 0.99999999999999978
```

### `SIMD` and `DType`[​](types.html#simd-and-dtype "Direct link to simd-and-dtype")

To support high-performance numeric processing, Mojo uses the [`SIMD`](https://docs.modular.com/mojo/stdlib/builtin/simd/SIMD) type as the basis for its numeric types. SIMD (single instruction, multiple data) is a processor technology that allows you to perform an operation on an entire set of operands at once. Mojo's `SIMD` type abstracts SIMD operations. A `SIMD` value represents a SIMD *vector*—that is, a fixed-size array of values that can fit into a processor's register. SIMD vectors are defined by two [*parameters*](parameters.1.html):

- A `DType` value, defining the data type in the vector (for example, 32-bit floating-point numbers).
- The number of elements in the vector, which must be a power of two.

For example, you can define a vector of four `Float32` values like this:

```mojo
var vec = SIMD[DType.float32, 4](3.0, 2.0, 2.0, 1.0)
```

```mojo
var vec = SIMD[DType.float32, 4](3.0, 2.0, 2.0, 1.0)
```

Math operations on SIMD values are applied *elementwise*, on each individual element in the vector. For example:

```mojo
var vec1 = SIMD[DType.int8, 4](2, 3, 5, 7)
var vec2 = SIMD[DType.int8, 4](1, 2, 3, 4)
var product = vec1 * vec2
print(product)
```

```mojo
var vec1 = SIMD[DType.int8, 4](2, 3, 5, 7)
var vec2 = SIMD[DType.int8, 4](1, 2, 3, 4)
var product = vec1 * vec2
print(product)
```

```output
[2, 6, 15, 28]
```

```output
[2, 6, 15, 28]
```

### Scalar values[​](types.html#scalar-values "Direct link to Scalar values")

The `SIMD` module defines several *type aliases* that are shorthand for different types of `SIMD` vectors. In particular, the `Scalar` type is just a `SIMD` vector with a single element. The numeric types listed in [Table 1](types.html#table-1), like `Int8` and `Float32` are actually type aliases for different types of scalar values:

```mojo
alias Scalar = SIMD[size=1]
alias Int8 = Scalar[DType.int8]
alias Float32 = Scalar[DType.float32]
```

```mojo
alias Scalar = SIMD[size=1]
alias Int8 = Scalar[DType.int8]
alias Float32 = Scalar[DType.float32]
```

This may seem a little confusing at first, but it means that whether you're working with a single `Float32` value or a vector of float32 values, the math operations go through exactly the same code path.

#### The `DType` type[​](types.html#the-dtype-type "Direct link to the-dtype-type")

The `DType` struct describes the different data types that a `SIMD` vector can hold, and defines a number of utility functions for operating on those data types. The `DType` struct defines a set of aliases that act as identifiers for the different data types, like `DType.int8` and `DType.float32`. You use these aliases when declaring a `SIMD` vector:

```mojo
var v: SIMD[DType.float64, 16]
```

```mojo
var v: SIMD[DType.float64, 16]
```

Note that `DType.float64` isn't a *type*, it's a value that describes a data type. You can't create a variable with the type `DType.float64`. You can create a variable with the type `SIMD[DType.float64, 1]` (or `Float64`, which is the same thing).

```mojo
from utils.numerics import max_finite, min_finite

def describeDType[dtype: DType]():
    print(dtype, "is floating point:", dtype.is_floating_point())
    print(dtype, "is integral:", dtype.is_integral())
    print("Min/max finite values for", dtype)
    print(min_finite[dtype](), max_finite[dtype]())

describeDType[DType.float32]()
```

```mojo
from utils.numerics import max_finite, min_finite

def describeDType[dtype: DType]():
    print(dtype, "is floating point:", dtype.is_floating_point())
    print(dtype, "is integral:", dtype.is_integral())
    print("Min/max finite values for", dtype)
    print(min_finite[dtype](), max_finite[dtype]())

describeDType[DType.float32]()
```

```output
float32 is floating point: True
float32 is integral: False
Min/max finite values for float32
-3.4028234663852886e+38 3.4028234663852886e+38
```

```output
float32 is floating point: True
float32 is integral: False
Min/max finite values for float32
-3.4028234663852886e+38 3.4028234663852886e+38
```

There are several other data types in the standard library that also use the `DType` abstraction.

### Numeric type conversion[​](types.html#numeric-type-conversion "Direct link to Numeric type conversion")

[Constructors and implicit conversion](lifecycle/life.html#constructors-and-implicit-conversion) documents the circumstances in which Mojo automatically converts a value from one type to another. Importantly, numeric [operators](operators.html) **don't** automatically narrow or widen operands to a common type.

You can explicitly convert a `SIMD` value to a different `SIMD` type either by invoking its [`cast()`](https://docs.modular.com/mojo/stdlib/builtin/simd/SIMD#cast) method or by passing it as an argument to the constructor of the target type. For example:

```mojo
simd1 = SIMD[DType.float32, 4](2.2, 3.3, 4.4, 5.5)
simd2 = SIMD[DType.int16, 4](-1, 2, -3, 4)
simd3 = simd1 * simd2.cast[DType.float32]()  # Convert with cast() method
print("simd3:", simd3)
simd4 = simd2 + SIMD[DType.int16, 4](simd1)  # Convert with SIMD constructor
print("simd4:", simd4)
```

```mojo
simd1 = SIMD[DType.float32, 4](2.2, 3.3, 4.4, 5.5)
simd2 = SIMD[DType.int16, 4](-1, 2, -3, 4)
simd3 = simd1 * simd2.cast[DType.float32]()  # Convert with cast() method
print("simd3:", simd3)
simd4 = simd2 + SIMD[DType.int16, 4](simd1)  # Convert with SIMD constructor
print("simd4:", simd4)
```

```output
simd3: [-2.2, 6.6, -13.200001, 22.0]
simd4: [1, 5, 1, 9]
```

```output
simd3: [-2.2, 6.6, -13.200001, 22.0]
simd4: [1, 5, 1, 9]
```

You can convert a `Scalar` value by passing it as an argument to the constructor of the target type. For example:

```mojo
var my_int: Int16 = 12                 # SIMD[DType.int16, 1]
var my_float: Float32 = 0.75           # SIMD[DType.float32, 1]
result = Float32(my_int) * my_float    # Result is SIMD[DType.float32, 1]
print("Result:", result)
```

```mojo
var my_int: Int16 = 12                 # SIMD[DType.int16, 1]
var my_float: Float32 = 0.75           # SIMD[DType.float32, 1]
result = Float32(my_int) * my_float    # Result is SIMD[DType.float32, 1]
print("Result:", result)
```

```output
Result: 9.0
```

```output
Result: 9.0
```

You can convert a scalar value of any numeric type to `Int` by passing the value to the [`Int()`](https://docs.modular.com/mojo/stdlib/builtin/int/Int#__init__) constructor method. Additionally, you can pass an instance of any struct that implements the [`Intable`](https://docs.modular.com/mojo/stdlib/builtin/int/Intable) trait or [`IntableRaising`](https://docs.modular.com/mojo/stdlib/builtin/int/IntableRaising) trait to the `Int()` constructor to convert that instance to an `Int`.

You can convert an `Int` or `IntLiteral` value to the `UInt` type by passing the value to the [`UInt()`](https://docs.modular.com/mojo/stdlib/builtin/uint/UInt#__init__) constructor. You can't convert other numeric types to `UInt` directly, though you can first convert them to `Int` and then to `UInt`.

## Strings[​](types.html#strings "Direct link to Strings")

Mojo's `String` type represents a mutable string. (For Python programmers, note that this is different from Python's standard string, which is immutable.) Strings support a variety of operators and common methods.

```mojo
var s: String = "Testing"
s += " Mojo strings"
print(s)
```

```mojo
var s: String = "Testing"
s += " Mojo strings"
print(s)
```

```output
Testing Mojo strings
```

```output
Testing Mojo strings
```

Most standard library types conform to the [`Stringable`](https://docs.modular.com/mojo/stdlib/builtin/str/Stringable) trait, which represents a type that can be converted to a string. Use `String(value)` to explicitly convert a value to a string:

```mojo
var s = String("Items in list: ") + String(5)
print(s)
```

```mojo
var s = String("Items in list: ") + String(5)
print(s)
```

```output
Items in list: 5
```

```output
Items in list: 5
```

Or use `String.write` to take variadic `Stringable` types, so you don't have to call `String()` on each value:

```mojo
var s = String("Items in list: ", 5)
print(s)
```

```mojo
var s = String("Items in list: ", 5)
print(s)
```

```output
Items in list: 5
```

```output
Items in list: 5
```

### String literals[​](types.html#string-literals "Direct link to String literals")

As with numeric types, the standard library includes a string literal type used to represent literal strings in the program source. String literals are enclosed in either single or double quotes.

Adjacent literals are concatenated together, so you can define a long string using a series of literals broken up over several lines:

```text
var s = "A very long string which is "
        "broken into two literals for legibility."
```

```text
var s = "A very long string which is "
        "broken into two literals for legibility."
```

To define a multi-line string, enclose the literal in three single or double quotes:

```text
var s = """
Multi-line string literals let you
enter long blocks of text, including
newlines."""
```

```text
var s = """
Multi-line string literals let you
enter long blocks of text, including
newlines."""
```

Note that the triple double quote form is also used for API documentation strings.

Unlike `IntLiteral` and `FloatLiteral`, `StringLiteral` doesn't automatically materialize to a runtime type. In some cases, you may need to explicitly convert `StringLiteral` values to `String`.

```mojo
# Variable is type `StringLiteral`
var s1 = "Example"

# Variable is type `String`
var s2: String = "Example"

# Variable is type `String`
var s3 = String("Example")
```

```mojo
# Variable is type `StringLiteral`
var s1 = "Example"

# Variable is type `String`
var s2: String = "Example"

# Variable is type `String`
var s3 = String("Example")
```

## Booleans[​](types.html#booleans "Direct link to Booleans")

Mojo's `Bool` type represents a boolean value. It can take one of two values, `True` or `False`. You can negate a boolean value using the `not` operator.

```mojo
var conditionA = False
var conditionB: Bool
conditionB = not conditionA
print(conditionA, conditionB)
```

```mojo
var conditionA = False
var conditionB: Bool
conditionB = not conditionA
print(conditionA, conditionB)
```

```output
False True
```

```output
False True
```

Many types have a boolean representation. Any type that implements the [`Boolable`](https://docs.modular.com/mojo/stdlib/builtin/bool/Boolable) trait has a boolean representation. As a general principle, collections evaluate as True if they contain any elements, False if they are empty; strings evaluate as True if they have a non-zero length.

## Tuples[​](types.html#tuples "Direct link to Tuples")

Mojo's `Tuple` type represents an immutable tuple consisting of zero or more values, separated by commas. Tuples can consist of multiple types and you can index into tuples in multiple ways.

```mojo
# Tuples are immutable and can hold multiple types
example_tuple = Tuple[Int, String](1, "Example")

# Assign multiple variables at once
x, y = example_tuple
print(x, y)

# Get individual values with an index
s = example_tuple[1]
print(s)
```

```mojo
# Tuples are immutable and can hold multiple types
example_tuple = Tuple[Int, String](1, "Example")

# Assign multiple variables at once
x, y = example_tuple
print(x, y)

# Get individual values with an index
s = example_tuple[1]
print(s)
```

```output
1 Example
Example
```

```output
1 Example
Example
```

You can also create a tuple without explicit typing. Note that if we declare the same tuple from the previous example with implicit typing instead of explicit, we must also convert `"Example"` from type `StringLiteral` to type `String`.

```mojo
example_tuple = (1, String("Example"))
s = example_tuple[1]
print(s)
```

```mojo
example_tuple = (1, String("Example"))
s = example_tuple[1]
print(s)
```

```output
Example
```

```output
Example
```

When defining a function, you can explicitly declare the type of tuple elements in one of two ways:

```mojo
def return_tuple_1() -> Tuple[Int, Int]:
    return Tuple[Int, Int](1, 1)

def return_tuple_2() -> (Int, Int):
    return (2, 2)
```

```mojo
def return_tuple_1() -> Tuple[Int, Int]:
    return Tuple[Int, Int](1, 1)

def return_tuple_2() -> (Int, Int):
    return (2, 2)
```

## Collection types[​](types.html#collection-types "Direct link to Collection types")

The Mojo standard library also includes a set of basic collection types that can be used to build more complex data structures:

- [`List`](https://docs.modular.com/mojo/stdlib/collections/list/List), a dynamically-sized array of items.
- [`Dict`](https://docs.modular.com/mojo/stdlib/collections/dict/Dict), an associative array of key-value pairs.
- [`Set`](https://docs.modular.com/mojo/stdlib/collections/set/Set), an unordered collection of unique items.
- [`Optional`](https://docs.modular.com/mojo/stdlib/collections/optional/Optional) represents a value that may or may not be present.

The collection types are *generic types*: while a given collection can only hold a specific type of value (such as `Int` or `Float64`), you specify the type at compile time using a [parameter](parameters.1.html). For example, you can create a `List` of `Int` values like this:

```mojo
var l = List[Int](1, 2, 3, 4)
# l.append(3.14) # error: FloatLiteral cannot be converted to Int
```

```mojo
var l = List[Int](1, 2, 3, 4)
# l.append(3.14) # error: FloatLiteral cannot be converted to Int
```

You don't always need to specify the type explicitly. If Mojo can *infer* the type, you can omit it. For example, when you construct a list from a set of integer literals, Mojo creates a `List[Int]`.

```mojo
# Inferred type == Int
var l1 = List(1, 2, 3, 4)
```

```mojo
# Inferred type == Int
var l1 = List(1, 2, 3, 4)
```

Where you need a more flexible collection, the [`Variant`](https://docs.modular.com/mojo/stdlib/utils/variant/Variant) type can hold different types of values. For example, a `Variant[Int32, Float64]` can hold either an `Int32` *or* a `Float64` value at any given time. (Using `Variant` is not covered in this section, see the [API docs](https://docs.modular.com/mojo/stdlib/utils/variant/Variant) for more information.)

The following sections give brief introduction to the main collection types.

### List[​](types.html#list "Direct link to List")

[`List`](https://docs.modular.com/mojo/stdlib/collections/list/List) is a dynamically-sized array of elements. List elements need to conform to the [`CollectionElement`](https://docs.modular.com/mojo/stdlib/builtin/value/CollectionElement) trait, which just means that the items must be copyable and movable. Most of the common standard library primitives, like `Int`, `String`, and `SIMD` conform to this trait. You can create a `List` by passing the element type as a parameter, like this:

```mojo
var l = List[String]()
```

```mojo
var l = List[String]()
```

The `List` type supports a subset of the Python `list` API, including the ability to append to the list, pop items out of the list, and access list items using subscript notation.

```mojo
from collections import List

var list = List(2, 3, 5)
list.append(7)
list.append(11)
print("Popping last item from list: ", list.pop())
for idx in range(len(list)):
      print(list[idx], end=", ")

```

```mojo
from collections import List

var list = List(2, 3, 5)
list.append(7)
list.append(11)
print("Popping last item from list: ", list.pop())
for idx in range(len(list)):
      print(list[idx], end=", ")

```

```output
Popping last item from list:  11
2, 3, 5, 7,
```

```output
Popping last item from list:  11
2, 3, 5, 7,
```

Note that the previous code sample leaves out the type parameter when creating the list. Because the list is being created with a set of `Int` values, Mojo can *infer* the type from the arguments.

There are some notable limitations when using `List`:

- You can't currently initialize a list from a list literal, like this:

  ```mojo
  # Doesn't work!
  var list: List[Int] = [2, 3, 5]
  ```

  ```mojo
  # Doesn't work!
  var list: List[Int] = [2, 3, 5]
  ```

  But you can use variadic arguments to achieve the same thing:

  ```mojo
  var list = List(2, 3, 5)
  ```

  ```mojo
  var list = List(2, 3, 5)
  ```
- You can't `print()` a list, or convert it directly into a string.

  ```mojo
  # Does not work
  print(list)
  ```

  ```mojo
  # Does not work
  print(list)
  ```

  As shown above, you can print the individual elements in a list as long as they're a [`Stringable`](https://docs.modular.com/mojo/stdlib/builtin/str/Stringable) type.
- Iterating a `List` currently returns a [`Pointer`](https://docs.modular.com/mojo/stdlib/memory/pointer/Pointer) to each item, not the item itself. You can access the item using the dereference operator, `[]`:

```mojo
#: from collections import List
var list = List(2, 3, 4)
for item in list:
      print(item[], end=", ")
```

```mojo
#: from collections import List
var list = List(2, 3, 4)
for item in list:
      print(item[], end=", ")
```

```output
2, 3, 4,
```

```output
2, 3, 4,
```

Subscripting in to a list, however, returns the item directly—no need to dereference:

```mojo
#: from collections import List
#: var list = List[Int](2, 3, 4)
for i in range(len(list)):
    print(list[i], end=", ")
```

```mojo
#: from collections import List
#: var list = List[Int](2, 3, 4)
for i in range(len(list)):
    print(list[i], end=", ")
```

```output
2, 3, 4,
```

```output
2, 3, 4,
```

### Dict[​](types.html#dict "Direct link to Dict")

The [`Dict`](https://docs.modular.com/mojo/stdlib/collections/dict/Dict) type is an associative array that holds key-value pairs. You can create a `Dict` by specifying the key type and value type as parameters, like this:

```mojo
var values = Dict[String, Float64]()
```

```mojo
var values = Dict[String, Float64]()
```

The dictionary's key type must conform to the [`KeyElement`](https://docs.modular.com/mojo/stdlib/collections/dict/KeyElement) trait, and value elements must conform to the [`CollectionElement`](https://docs.modular.com/mojo/stdlib/builtin/value/CollectionElement) trait.

You can insert and remove key-value pairs, update the value assigned to a key, and iterate through keys, values, or items in the dictionary.

The `Dict` iterators all yield references, so you need to use the dereference operator `[]` as shown in the following example:

```mojo
from collections import Dict

var d = Dict[String, Float64]()
d["plasticity"] = 3.1
d["elasticity"] = 1.3
d["electricity"] = 9.7
for item in d.items():
    print(item[].key, item[].value)
```

```mojo
from collections import Dict

var d = Dict[String, Float64]()
d["plasticity"] = 3.1
d["elasticity"] = 1.3
d["electricity"] = 9.7
for item in d.items():
    print(item[].key, item[].value)
```

```output
plasticity 3.1000000000000001
elasticity 1.3
electricity 9.6999999999999993
```

```output
plasticity 3.1000000000000001
elasticity 1.3
electricity 9.6999999999999993
```

### Set[​](types.html#set "Direct link to Set")

The [`Set`](https://docs.modular.com/mojo/stdlib/collections/set/Set) type represents a set of unique values. You can add and remove elements from the set, test whether a value exists in the set, and perform set algebra operations, like unions and intersections between two sets.

Sets are generic and the element type must conform to the [`KeyElement`](https://docs.modular.com/mojo/stdlib/collections/dict/KeyElement) trait.

```mojo
from collections import Set

i_like = Set("sushi", "ice cream", "tacos", "pho")
you_like = Set("burgers", "tacos", "salad", "ice cream")
we_like = i_like.intersection(you_like)

print("We both like:")
for item in we_like:
    print("-", item[])
```

```mojo
from collections import Set

i_like = Set("sushi", "ice cream", "tacos", "pho")
you_like = Set("burgers", "tacos", "salad", "ice cream")
we_like = i_like.intersection(you_like)

print("We both like:")
for item in we_like:
    print("-", item[])
```

```output
We both like:
- ice cream
- tacos
```

```output
We both like:
- ice cream
- tacos
```

### Optional[​](types.html#optional "Direct link to Optional")

An [`Optional`](https://docs.modular.com/mojo/stdlib/collections/optional/Optional) represents a value that may or may not be present. Like the other collection types, it is generic, and can hold any type that conforms to the [`CollectionElement`](https://docs.modular.com/mojo/stdlib/builtin/value/CollectionElement) trait.

```mojo
# Two ways to initialize an Optional with a value
var opt1 = Optional(5)
var opt2: Optional[Int] = 5
# Two ways to initialize an Optional with no value
var opt3 = Optional[Int]()
var opt4: Optional[Int] = None
```

```mojo
# Two ways to initialize an Optional with a value
var opt1 = Optional(5)
var opt2: Optional[Int] = 5
# Two ways to initialize an Optional with no value
var opt3 = Optional[Int]()
var opt4: Optional[Int] = None
```

An `Optional` evaluates as `True` when it holds a value, `False` otherwise. If the `Optional` holds a value, you can retrieve a reference to the value using the `value()` method. But calling `value()` on an `Optional` with no value results in undefined behavior, so you should always guard a call to `value()` inside a conditional that checks whether a value exists.

```mojo
var opt: Optional[String] = String("Testing")
if opt:
    var value_ref = opt.value()
    print(value_ref)
```

```mojo
var opt: Optional[String] = String("Testing")
if opt:
    var value_ref = opt.value()
    print(value_ref)
```

```output
Testing
```

```output
Testing
```

Alternately, you can use the `or_else()` method, which returns the stored value if there is one, or a user-specified default value otherwise:

```mojo
var custom_greeting: Optional[String] = None
print(custom_greeting.or_else("Hello"))

custom_greeting = String("Hi")
print(custom_greeting.or_else("Hello"))

```

```mojo
var custom_greeting: Optional[String] = None
print(custom_greeting.or_else("Hello"))

custom_greeting = String("Hi")
print(custom_greeting.or_else("Hello"))

```

```output
Hello
Hi
```

```output
Hello
Hi
```

## Register-passable, memory-only, and trivial types[​](types.html#register-passable-memory-only-and-trivial-types "Direct link to Register-passable, memory-only, and trivial types")

In various places in the documentation you'll see references to register-passable, memory-only, and trivial types. Register-passable and memory-only types are distinguished based on how they hold data:

- Register-passable types are composed exclusively of fixed-size data types, which can (theoretically) be stored in a machine register. A register-passable type can include other types, as long as they are also register-passable. `Int`, `Bool`, and `SIMD`, for example, are all register-passable types. So a register-passable `struct` could include `Int` and `Bool` fields, but not a `String` field. Register-passable types are declared with the [`@register_passable`](decorators/register-passable.html) decorator.

  Register-passable types are always passed by value (that is, the values are copied).
- Memory-only types consist of any types that *don't* fit the description of register-passable types. In particular, these types usually have pointers or references to dynamically-allocated memory. `String`, `List`, and `Dict` are all examples of memory-only types.

Our long-term goal is to make this distinction transparent to the user, and ensure all APIs work with both register-passable and memory-only types. But right now you will see some standard library types that only work with register-passable types or only work with memory-only types.

In addition to these two categories, Mojo also has "trivial" types. Conceptually a trivial type is simply a type that doesn't require any custom logic in its lifecycle methods. The bits that make up an instance of a trivial type can be copied or moved without any knowledge of what they do. Currently, trivial types are declared using the [`@register_passable(trivial)`](decorators/register-passable.html#register_passabletrivial) decorator. Trivial types shouldn't be limited to only register-passable types, so in the future we intend to separate trivial types from the `@register_passable` decorator.

## `AnyType` and `AnyTrivialRegType`[​](types.html#anytype-and-anytrivialregtype "Direct link to anytype-and-anytrivialregtype")

Two other things you'll see in Mojo APIs are references to `AnyType` and `AnyTrivialRegType`. These are effectively *metatypes*, that is, types of types.

- `AnyType` represents any Mojo type. Mojo treats `AnyType` as a special kind of trait, and you'll find more discussion of it on the [Traits page](traits.html#the-anytype-trait).
- `AnyTrivialRegType` is a metatype representing any Mojo type that's marked register passable.

You'll see them in signatures like this:

```mojo
fn any_type_function[ValueType: AnyTrivialRegType](value: ValueType):
    ...
```

```mojo
fn any_type_function[ValueType: AnyTrivialRegType](value: ValueType):
    ...
```

You can read this as `any_type_function` has an argument, `value` of type `ValueType`, where `ValueType` is a register-passable type, determined at compile time.

There is still some code like this in the standard library, but it's gradually being migrated to more generic code that doesn't distinguish between register-passable and memory-only types.



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Ftypes)

- [Numeric types](types.html#numeric-types)

  - [Signed and unsigned integers](types.html#signed-and-unsigned-integers)
  - [Floating-point numbers](types.html#floating-point-numbers)
  - [Numeric literals](types.html#numeric-literals)
  - [`SIMD` and `DType`](types.html#simd-and-dtype)
  - [Scalar values](types.html#scalar-values)
  - [Numeric type conversion](types.html#numeric-type-conversion)
- [Strings](types.html#strings)

  - [String literals](types.html#string-literals)
- [Booleans](types.html#booleans)
- [Tuples](types.html#tuples)
- [Collection types](types.html#collection-types)

  - [List](types.html#list)
  - [Dict](types.html#dict)
  - [Set](types.html#set)
  - [Optional](types.html#optional)
- [Register-passable, memory-only, and trivial types](types.html#register-passable-memory-only-and-trivial-types)
- [`AnyType` and `AnyTrivialRegType`](types.html#anytype-and-anytrivialregtype)











Variables | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



# Variables

A variable is a name that holds a value or object. All variables in Mojo are mutable—their value can be changed. (If you want to define a constant value that can't change at runtime, see the [`alias` keyword](parameters.1.html#alias-named-parameter-expressions).)

Mojo has two kinds of variables:

- Explicitly-declared variables are created with the `var` keyword, and may include [type annotations](variables.html#type-annotations).

  ```mojo
  var a = 5
  var b: Float64 = 3.14
  ```

  ```mojo
  var a = 5
  var b: Float64 = 3.14
  ```
- Implicitly-declared variables are created with an assignment statement:

  ```mojo
  a = 5
  b = 3.14
  ```

  ```mojo
  a = 5
  b = 3.14
  ```

Both types of variables are strongly-typed: the variable receives a type when it's created, and the type never changes. You can't assign a variable a value of a different type:

```mojo
count = 8 # count is type Int
count = "Nine?" # Error: can't implicitly convert 'StringLiteral' to 'Int'
```

```mojo
count = 8 # count is type Int
count = "Nine?" # Error: can't implicitly convert 'StringLiteral' to 'Int'
```

Some types support [*implicit conversions*](variables.html#implicit-type-conversion) from other types. For example, an integer value can implicitly convert to a floating-point value:

```mojo
var temperature: Float64 = 99
print(temperature)
```

```mojo
var temperature: Float64 = 99
print(temperature)
```

```output
99.0
```

```output
99.0
```

In this example, the `temperature` variable is explicitly typed as `Float64`, but assigned an integer value, so the value is implicitly converted to a `Float64`.

## Implicitly-declared variables[​](variables.html#implicitly-declared-variables "Direct link to Implicitly-declared variables")

You can create a variable with just a name and a value. For example:

```mojo
name = String("Sam")
user_id = 0
```

```mojo
name = String("Sam")
user_id = 0
```

Implicitly-declared variables are strongly typed: they take the type from the first value assigned to them. For example, the `user_id` variable above is type `Int`, while the `name` variable is type `String`. You can't assign a string to `user_id` or an integer to `name`.

Implicitly-declared variables are scoped at the function level. You create an implicitly-declared variable the first time you assign a value to a given name inside a function. Any subsequent references to that name inside the function refer to the same variable. For more information, see [Variable scopes](variables.html#variable-scopes), which describes how variable scoping differs between explicitly- and implicitly-declared variables.

## Explicitly-declared variables[​](variables.html#explicitly-declared-variables "Direct link to Explicitly-declared variables")

You can declare a variable with the `var` keyword. For example:

```mojo
var name = String("Sam")
var user_id: Int
```

```mojo
var name = String("Sam")
var user_id: Int
```

The `name` variable is initialized to the string "Sam". The `user_id` variable is uninitialized, but it has a declared type, `Int` for an integer value. All explicitly-declared variables are typed—either explicitly with a [type annotation](variables.html#type-annotations) or implicitly when they're initialized with a value.

Since variables are strongly typed, you can't assign a variable a value of a different type, unless those types can be [implicitly converted](variables.html#implicit-type-conversion). For example, this code will not compile:

```mojo
var user_id: Int = "Sam"
```

```mojo
var user_id: Int = "Sam"
```

There are several main differences between explicitly-declared variables and implicitly-declared variables:

- An explicitly-declared variable can be declared without initializing it:

  ```mojo
  var value: Float64
  ```

  ```mojo
  var value: Float64
  ```
- Explicitly-declared variables follow [lexical scoping](variables.html#variable-scopes), unlike implicitly-declared variables.

## Type annotations[​](variables.html#type-annotations "Direct link to Type annotations")

Although Mojo can infer a variable type from the first value assigned to a variable, it also supports static type annotations on variables. Type annotations provide a more explicit way of specifying the variable's type.

To specify the type for a variable, add a colon followed by the type name:

```mojo
var name: String = get_name()
```

```mojo
var name: String = get_name()
```

This makes it clear that `name` is type `String`, without knowing what the `get_name()` function returns. The `get_name()` function may return a `String`, or a value that's implicitly convertible to a `String`.

You must declare a variable with `var` to use type annotations.

If a type has a constructor with just one argument, you can initialize it in two ways:

```mojo
var name1: String = "Sam"
var name2 = String("Sam")
```

```mojo
var name1: String = "Sam"
var name2 = String("Sam")
```

Both of these lines invoke the same constructor to create a `String` from a `StringLiteral`.

### Late initialization[​](variables.html#late-initialization "Direct link to Late initialization")

Using type annotations allows for late initialization. For example, notice here that the `z` variable is first declared with just a type, and the value is assigned later:

```mojo
fn my_function(x: Int):
    var z: Float32
    if x != 0:
        z = 1.0
    else:
        z = foo()
    print(z)

fn foo() -> Float32:
    return 3.14
```

```mojo
fn my_function(x: Int):
    var z: Float32
    if x != 0:
        z = 1.0
    else:
        z = foo()
    print(z)

fn foo() -> Float32:
    return 3.14
```

If you try to pass an uninitialized variable to a function or use it on the right-hand side of an assignment statement, compilation fails.

```mojo
var z: Float32
var y = z # Error: use of uninitialized value 'z'
```

```mojo
var z: Float32
var y = z # Error: use of uninitialized value 'z'
```

Late initialization works only if the variable is declared with a type.

### Implicit type conversion[​](variables.html#implicit-type-conversion "Direct link to Implicit type conversion")

Some types include built-in type conversion (type casting) from one type into its own type. For example, if you assign an integer to a variable that has a floating-point type, it converts the value instead of giving a compiler error:

```mojo
var number: Float64 = Int(1)
print(number)
```

```mojo
var number: Float64 = Int(1)
print(number)
```

```output
1.0
```

```output
1.0
```

As shown above, value assignment can be converted into a constructor call if the target type has a constructor that meets the following criteria:

- It's decorated with the `@implicit` decorator.
- It takes a single required argument that matches the value being assigned.

So, this code uses the `Float64` constructor that takes an integer: `__init__(out self, value: Int)`.

In general, implicit conversions should only be supported where the conversion is lossless.

Implicit conversion follows the logic of [overloaded functions](functions.html#overloaded-functions). If the destination type has a viable implicit conversion constructor for the source type, it can be invoked for implicit conversion.

So assigning an integer to a `Float64` variable is exactly the same as this:

```mojo
var number = Float64(1)
```

```mojo
var number = Float64(1)
```

Similarly, if you call a function that requires an argument of a certain type (such as `Float64`), you can pass in any value as long as that value type can implicitly convert to the required type (using one of the type's overloaded constructors).

For example, you can pass an `Int` to a function that expects a `Float64`, because `Float64` includes an implicit conversion constructor that takes an `Int`:

```mojo
fn take_float(value: Float64):
    print(value)

fn pass_integer():
    var value: Int = 1
    take_float(value)
```

```mojo
fn take_float(value: Float64):
    print(value)

fn pass_integer():
    var value: Int = 1
    take_float(value)
```

For more details on implicit conversion, see [Constructors and implicit conversion](lifecycle/life.html#constructors-and-implicit-conversion).

## Variable scopes[​](variables.html#variable-scopes "Direct link to Variable scopes")

Variables declared with `var` are bound by *lexical scoping*. This means that nested code blocks can read and modify variables defined in an outer scope. But an outer scope **cannot** read variables defined in an inner scope at all.

For example, the `if` code block shown here creates an inner scope where outer variables are accessible to read/write, but any new variables do not live beyond the scope of the `if` block:

```mojo
def lexical_scopes():
    var num = 1
    var dig = 1
    if num == 1:
        print("num:", num)  # Reads the outer-scope "num"
        var num = 2         # Creates new inner-scope "num"
        print("num:", num)  # Reads the inner-scope "num"
        dig = 2             # Updates the outer-scope "dig"
    print("num:", num)      # Reads the outer-scope "num"
    print("dig:", dig)      # Reads the outer-scope "dig"

lexical_scopes()
```

```mojo
def lexical_scopes():
    var num = 1
    var dig = 1
    if num == 1:
        print("num:", num)  # Reads the outer-scope "num"
        var num = 2         # Creates new inner-scope "num"
        print("num:", num)  # Reads the inner-scope "num"
        dig = 2             # Updates the outer-scope "dig"
    print("num:", num)      # Reads the outer-scope "num"
    print("dig:", dig)      # Reads the outer-scope "dig"

lexical_scopes()
```

```output
num: 1
num: 2
num: 1
dig: 2
```

```output
num: 1
num: 2
num: 1
dig: 2
```

Note that the `var` statement inside the `if` creates a **new** variable with the same name as the outer variable. This prevents the inner loop from accessing the outer `num` variable. (This is called "variable shadowing," where the inner scope variable hides or "shadows" a variable from an outer scope.)

The lifetime of the inner `num` ends exactly where the `if` code block ends, because that's the scope in which the variable was defined.

This is in contrast to implicitly-declared variables (those without the `var` keyword), which use **function-level scoping** (consistent with Python variable behavior). That means, when you change the value of an implicitly-declared variable inside the `if` block, it actually changes the value for the entire function.

For example, here's the same code but *without* the `var` declarations:

```mojo
def function_scopes():
    num = 1
    if num == 1:
        print(num)   # Reads the function-scope "num"
        num = 2      # Updates the function-scope variable
        print(num)   # Reads the function-scope "num"
    print(num)       # Reads the function-scope "num"

function_scopes()
```

```mojo
def function_scopes():
    num = 1
    if num == 1:
        print(num)   # Reads the function-scope "num"
        num = 2      # Updates the function-scope variable
        print(num)   # Reads the function-scope "num"
    print(num)       # Reads the function-scope "num"

function_scopes()
```

```output
1
2
2
```

```output
1
2
2
```

Now, the last `print()` function sees the updated `num` value from the inner scope, because implicitly-declared variables (Python-style variables) use function-level scope (instead of lexical scope).



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fvariables)

- [Implicitly-declared variables](variables.html#implicitly-declared-variables)
- [Explicitly-declared variables](variables.html#explicitly-declared-variables)
- [Type annotations](variables.html#type-annotations)

  - [Late initialization](variables.html#late-initialization)
  - [Implicit type conversion](variables.html#implicit-type-conversion)
- [Variable scopes](variables.html#variable-scopes)









![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



- [Mojo](https://docs.modular.com/mojo)
- /[Manual](../index.html)
- /Python
- /Python integration

<!--THE END-->

- [Mojo](https://docs.modular.com/mojo)
- /[Manual](../index.html)
- /Python
- /Python integration

# Python integration

Mojo is still in early development and many Python features are not yet implemented. You can't currently write everything in Mojo that you can write in Python. And Mojo doesn't have its own ecosystem of packages yet.

To help bridge this gap, Mojo lets you import Python modules, call Python functions, and interact with Python objects from Mojo code. The Python code runs in a standard Python interpreter (CPython), so your existing Python code doesn't need to change.

## Create a Python environment[​](index.html#create-a-python-environment "Direct link to Create a Python environment")

To successfully integrate Python code with your Mojo project, your environment must have a compatible Python runtime installed along with any additional Python packages that you want to use. Currently, you can create a compatible environment in a couple of ways:

- We recommend that you use [Magic](https://docs.modular.com/magic), our package manager and virtual environment manager for MAX and Mojo projects. To use Magic to create and manage the virtual environment for your Mojo/Python project, first follow the instructions in [Install Magic](https://docs.modular.com/magic/#install-magic). Then you can create a new Mojo project like this:

  ```sh
  magic init my-mojo-project --format mojoproject
  ```

  ```sh
  magic init my-mojo-project --format mojoproject
  ```

  After creating the project, you can enter the project and install any dependencies, for example [NumPy](https://numpy.org/):

  ```sh
  cd my-mojo-project
  ```

  ```sh
  cd my-mojo-project
  ```

  ```sh
  magic add "numpy>=2.0"
  ```

  ```sh
  magic add "numpy>=2.0"
  ```
- Alternatively, you can also add MAX and Mojo to a [conda](https://docs.conda.io/projects/conda/en/latest/index.html) project. To do so, follow the steps in [Add MAX/Mojo to a conda project](https://docs.modular.com/magic/conda).
- It's also possible to convert an existing conda project to Magic as documented in [Migrate a conda project to Magic](https://docs.modular.com/magic/#migrate-a-conda-project-to-magic).

## Import a Python module[​](index.html#import-a-python-module "Direct link to Import a Python module")

To import a Python module in Mojo, just call [`Python.import_module()`](https://docs.modular.com/mojo/stdlib/python/python/Python#import_module) with the module name. The following shows an example of importing the standard Python [NumPy](https://numpy.org/) package:

```mojo
from python import Python

def main():
    # This is equivalent to Python's `import numpy as np`
    np = Python.import_module("numpy")

    # Now use numpy as if writing in Python
    array = np.array([1, 2, 3])
    print(array)
```

```mojo
from python import Python

def main():
    # This is equivalent to Python's `import numpy as np`
    np = Python.import_module("numpy")

    # Now use numpy as if writing in Python
    array = np.array([1, 2, 3])
    print(array)
```

Running this program produces the following output:

```text
[1 2 3]
```

```text
[1 2 3]
```

Assuming that you have the NumPy package installed in your [environment](index.html#create-a-python-environment), this imports NumPy and you can use any of its features.

A few things to note:

- The `import_module()` method returns a reference to the module in the form of a [`PythonObject`](https://docs.modular.com/mojo/stdlib/python/python_object/PythonObject) wrapper. You must store the reference in a variable and then use it as shown in the example above to access functions, classes, and other objects defined by the module. See [Mojo wrapper objects](types.html#mojo-wrapper-objects) for more information about the `PythonObject` type.
- Currently, you cannot import individual members (such as a single Python class or function). You must import the whole Python module and then access members through the module name.
- Mojo doesn't yet support top-level code, so the `import_module()` call must be inside another method. This means you may need to import a module multiple times or pass around a reference to the module. This works the same way as Python: importing the module multiple times won't run the initialization logic more than once, so you don't pay any performance penalty.
- `import_module()` may raise an exception (for example, if the module isn't installed). If you're using it inside an `fn` function, you need to either handle errors (using a `try/except` clause), or add the `raises` keyword to the function signature. You'll also see this when calling Python functions that may raise exceptions. (Raising exceptions is much more common in Python code than in the Mojo standard library, which [limits their use for performance reasons](https://docs.modular.com/mojo/roadmap#the-standard-library-has-limited-exceptions-use).)

caution

[`mojo build`](https://docs.modular.com/mojo/cli/build) doesn't include the Python packages used by your Mojo project. Instead, Mojo loads the Python interpreter and Python packages at runtime, so they must be provided in the environment where you run the Mojo program (such as inside the Magic environment where you built the executable). For more information, see the section above to [create a Python environment](index.html#create-a-python-environment).

### Import a local Python module[​](index.html#import-a-local-python-module "Direct link to Import a local Python module")

If you have some local Python code you want to use in Mojo, just add the directory to the Python path and then import the module.

For example, suppose you have a Python file named `mypython.py`:

mypython.py

```python
import numpy as np

def gen_random_values(size, base):
    # generate a size x size array of random numbers between base and base+1
    random_array = np.random.rand(size, size)
    return random_array + base
```

```python
import numpy as np

def gen_random_values(size, base):
    # generate a size x size array of random numbers between base and base+1
    random_array = np.random.rand(size, size)
    return random_array + base
```

Here's how you can import it and use it in a Mojo file:

main.mojo

```mojo
from python import Python

def main():
    Python.add_to_path("path/to/module")
    mypython = Python.import_module("mypython")

    values = mypython.gen_random_values(2, 3)
    print(values)
```

```mojo
from python import Python

def main():
    Python.add_to_path("path/to/module")
    mypython = Python.import_module("mypython")

    values = mypython.gen_random_values(2, 3)
    print(values)
```

Both absolute and relative paths work with [`add_to_path()`](https://docs.modular.com/mojo/stdlib/python/python/Python#add_to_path). For example, you can import from the local directory like this:

```mojo
Python.add_to_path(".")
```

```mojo
Python.add_to_path(".")
```

## Call Mojo from Python[​](index.html#call-mojo-from-python "Direct link to Call Mojo from Python")

As shown above, you can call out to Python modules from Mojo. However, there's currently no way to do the reverse—import Mojo modules from Python or call Mojo functions from Python.

This may present a challenge for using certain modules. For example, many UI frameworks have a main event loop that makes callbacks to user-defined code in response to UI events. This is sometimes called an "inversion of control" pattern. Instead of your application code calling *in* to a library, the framework code calls *out* to your application code.

This pattern doesn't work because you can't pass Mojo callbacks to a Python module.

For example, consider the popular [Tkinter package](https://docs.python.org/3/library/tkinter.html). The typical usage for Tkinter is something like this:

- You create a main, or "root" window for the application.
- You add one or more UI widgets to the window. The widgets can have associated callback functions (for example, when a button is pushed).
- You call the root window's `mainloop()` method, which listens for events, updates the UI, and invokes callback functions. The main loop keeps running until the application exits.

Since Python can't call back into Mojo, one alternative is to have the Mojo application drive the event loop and poll for updates. The following example uses Tkinter, but the basic approach can be applied to other packages.

First you create a Python module that defines a Tkinter interface, with a window and single button:

myapp.py

```python
import tkinter as tk

class App:
    def __init__(self):
        self._root = tk.Tk()
        self.clicked = False

    def click(self):
        self.clicked = True

    def create_button(self, button_text: str):
        button = tk.Button(
            master=self._root,
            text=button_text,
            command=self.click
        )
        button.place(relx=0.5, rely=0.5, anchor=tk.CENTER)

    def create(self, res: str):
        self._root.geometry(res)
        self.create_button("Hello Mojo!")

    def update(self):
        self._root.update()
```

```python
import tkinter as tk

class App:
    def __init__(self):
        self._root = tk.Tk()
        self.clicked = False

    def click(self):
        self.clicked = True

    def create_button(self, button_text: str):
        button = tk.Button(
            master=self._root,
            text=button_text,
            command=self.click
        )
        button.place(relx=0.5, rely=0.5, anchor=tk.CENTER)

    def create(self, res: str):
        self._root.geometry(res)
        self.create_button("Hello Mojo!")

    def update(self):
        self._root.update()
```

You can call this module from Mojo like this:

main.mojo

```mojo
from python import Python

def button_clicked():
    print("Hi from a Mojo🔥 fn!")

def main():
    Python.add_to_path(".")
    app = Python.import_module("myapp").App()
    app.create("800x600")

    while True:
        app.update()
        if app.clicked:
            button_clicked()
            app.clicked = False
```

```mojo
from python import Python

def button_clicked():
    print("Hi from a Mojo🔥 fn!")

def main():
    Python.add_to_path(".")
    app = Python.import_module("myapp").App()
    app.create("800x600")

    while True:
        app.update()
        if app.clicked:
            button_clicked()
            app.clicked = False
```

Instead of the Python module calling the Tkinter `mainloop()` method, the Mojo code calls the `update()` method in a loop and checks the `clicked` attribute after each update.



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fpython%2F)

- [Create a Python environment](index.html#create-a-python-environment)
- [Import a Python module](index.html#import-a-python-module)

  - [Import a local Python module](index.html#import-a-local-python-module)
- [Call Mojo from Python](index.html#call-mojo-from-python)











Python types | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



- [Mojo](https://docs.modular.com/mojo)
- /[Manual](../index.html)
- /Python
- /Python types

<!--THE END-->

- [Mojo](https://docs.modular.com/mojo)
- /[Manual](../index.html)
- /Python
- /Python types

# Python types

When calling Python methods, Mojo needs to convert back and forth between native Python objects and native Mojo objects. Most of these conversions happen automatically, but there are a number of cases that Mojo doesn't handle yet. In these cases you may need to do an explicit conversion, or call an extra method.

## Mojo types in Python[​](types.html#mojo-types-in-python "Direct link to Mojo types in Python")

Mojo primitive types implicitly convert into Python objects. Today we support integers, floats, booleans, strings, tuples, and `ListLiteral` instances (described below in [Mojo wrapper objects](types.html#mojo-wrapper-objects)).

To demonstrate, the following example dynamically creates an in-memory Python module named `py_utils` containing a `type_printer()` function, which simply prints the type of a given value. Then you can see how different Mojo values convert into corresponding Python types.

```mojo
from python import Python

def main():
    py_module = """
def type_printer(value):
    print(type(value))
"""
    py_utils = Python.evaluate(py_module, file=True, name="py_utils")

    py_utils.type_printer(4)
    py_utils.type_printer(3.14)
    py_utils.type_printer(("Mojo", True))
```

```mojo
from python import Python

def main():
    py_module = """
def type_printer(value):
    print(type(value))
"""
    py_utils = Python.evaluate(py_module, file=True, name="py_utils")

    py_utils.type_printer(4)
    py_utils.type_printer(3.14)
    py_utils.type_printer(("Mojo", True))
```

```output
<class 'int'>
<class 'float'>
<class 'tuple'>
```

```output
<class 'int'>
<class 'float'>
<class 'tuple'>
```

## Python types in Mojo[​](types.html#python-types-in-mojo "Direct link to Python types in Mojo")

You can also use Python objects from Mojo. For example, Mojo's [`Dict`](https://docs.modular.com/mojo/stdlib/collections/dict/Dict) and [`List`](https://docs.modular.com/mojo/stdlib/collections/list/List) types don't natively support heterogeneous collections. One alternative is to use a Python dictionary or list.

For example, to create a Python dictionary, use the [`Python.dict()`](https://docs.modular.com/mojo/stdlib/python/python/Python#dict) method:

```mojo
from python import Python

def main():
    py_dict = Python.dict()
    py_dict["item_name"] = "whizbang"
    py_dict["price"] = 11.75
    py_dict["inventory"] = 100
    print(py_dict)
```

```mojo
from python import Python

def main():
    py_dict = Python.dict()
    py_dict["item_name"] = "whizbang"
    py_dict["price"] = 11.75
    py_dict["inventory"] = 100
    print(py_dict)
```

```output
{'item_name': 'whizbang', 'price': 11.75, 'inventory': 100}
```

```output
{'item_name': 'whizbang', 'price': 11.75, 'inventory': 100}
```

### Mojo wrapper objects[​](types.html#mojo-wrapper-objects "Direct link to Mojo wrapper objects")

When you use Python objects in your Mojo code, Mojo adds the [`PythonObject`](https://docs.modular.com/mojo/stdlib/python/python_object/PythonObject) wrapper around the Python object. This object exposes a number of common double underscore methods (dunder methods) like `__getitem__()` and `__getattr__()`, passing them through to the underlying Python object.

You can explicitly create a wrapped Python object by initializing a `PythonObject` with a Mojo literal. Most of the time, you can treat the wrapped object just like you'd treat it in Python. You can use dot-notation to access attributes and call methods, and use the `[]` operator to access an item in a sequence. For example:

```mojo
from python import PythonObject

def main():
    var py_list: PythonObject = ["cat", 2, 3.14159, 4]  # A ListLiteral
    n = py_list[2]
    print("n =", n)
    py_list.append(5)
    py_list[0] = "aardvark"
    print(py_list)
```

```mojo
from python import PythonObject

def main():
    var py_list: PythonObject = ["cat", 2, 3.14159, 4]  # A ListLiteral
    n = py_list[2]
    print("n =", n)
    py_list.append(5)
    py_list[0] = "aardvark"
    print(py_list)
```

```output
n = 3.14159
['aardvark', 2, 3.14159, 4, 5]
```

```output
n = 3.14159
['aardvark', 2, 3.14159, 4, 5]
```

In the example above, `["cat", 2, 3.14159, 4]` is an instance of [`ListLiteral`](https://docs.modular.com/mojo/stdlib/builtin/list_literal/ListLiteral/), which supports lists of heterogeneous values. The `ListLiteral` type is intended only for Python interoperability, and it is not compatible with the native Mojo [`List`](https://docs.modular.com/mojo/stdlib/collections/list/List) type. For example, the following line results in a compilation error:

```text
var mojo_list: List[Int] = [1, 2, 3, 4]
```

```text
var mojo_list: List[Int] = [1, 2, 3, 4]
```

```output
error: cannot implicitly convert 'ListLiteral[Int, Int, Int, Int]' value to 'List[Int]'
var mojo_list: List[Int] = [1, 2, 3, 4]
                           ^~~~~~~~~~~~
```

```output
error: cannot implicitly convert 'ListLiteral[Int, Int, Int, Int]' value to 'List[Int]'
var mojo_list: List[Int] = [1, 2, 3, 4]
                           ^~~~~~~~~~~~
```

If you want to construct a Python type that doesn't have a literal Mojo equivalent, you can also use the [`Python.evaluate()`](https://docs.modular.com/mojo/stdlib/python/python/Python#evaluate) method. For example, to create a Python `set`:

```mojo
from python import Python

def main():
    var py_set = Python.evaluate('{2, 3, 2, 7, 11, 3}')
    num_items = len(py_set)
    print(num_items, "items in the set.")
    contained = 7 in py_set
    print("Is 7 in the set:", contained)
```

```mojo
from python import Python

def main():
    var py_set = Python.evaluate('{2, 3, 2, 7, 11, 3}')
    num_items = len(py_set)
    print(num_items, "items in the set.")
    contained = 7 in py_set
    print("Is 7 in the set:", contained)
```

```output
4 items in the set.
Is 7 in the set: True
```

```output
4 items in the set.
Is 7 in the set: True
```

Some Mojo APIs handle `PythonObject` just fine, but sometimes you'll need to explicitly convert a Python value into a native Mojo value.

Currently `PythonObject` conforms to the [`Stringable`](https://docs.modular.com/mojo/stdlib/builtin/str/Stringable), [`Boolable`](https://docs.modular.com/mojo/stdlib/builtin/bool/Boolable), [`Intable`](https://docs.modular.com/mojo/stdlib/builtin/int/Intable), and [`Floatable`](https://docs.modular.com/mojo/stdlib/builtin/floatable/Floatable/) traits. This allows you to convert a `PythonObject` to the corresponding Mojo types.

```mojo
var s = String(py_string)
var b = Bool(py_bool)
var i = Int(py_int)
var f = Float64(py_float)
```

```mojo
var s = String(py_string)
var b = Bool(py_bool)
var i = Int(py_int)
var f = Float64(py_float)
```

PythonObject also implements the [`Writable`](https://docs.modular.com/mojo/stdlib/utils/write/Writable) trait, so that you can print Python values using the built-in [`print()`](https://docs.modular.com/mojo/stdlib/builtin/io/print) function.

```mojo
print(python_object)
```

```mojo
print(python_object)
```

### Comparing Python types in Mojo[​](types.html#comparing-python-types-in-mojo "Direct link to Comparing Python types in Mojo")

You can use Python objects in Mojo comparison expressions, and the Mojo `is` operator also works to compare the identity of two Python objects. Python values like `False` and `None` evaluate as false in Mojo boolean expressions as well.

If you need to know the type of the underlying Python object, you can use the [`Python.type()`](https://docs.modular.com/mojo/stdlib/python/python/Python#type) method, which is equivalent to the Python `type()` builtin. You can test if a Python object is of a particular type by performing an identity comparison against the type as shown below:

```mojo
from python import Python
from python import PythonObject

def main():
    var value1: PythonObject = 3.7
    value2 = Python.evaluate("10/3")

    # Compare values
    print("Is value1 greater than 3:", value1 > 3)
    print("Is value1 greater than value2:", value1 > value2)

    # Compare identities
    value3 = value2
    print("value1 is value2:", value1 is value2)
    print("value2 is value3:", value2 is value3)

    # Compare types
    py_float_type = Python.evaluate("float")
    print("Python float type:", py_float_type)
    print("value1 type:", Python.type(value1))
    print("Is value1 a Python float:", Python.type(value1) is py_float_type)
```

```mojo
from python import Python
from python import PythonObject

def main():
    var value1: PythonObject = 3.7
    value2 = Python.evaluate("10/3")

    # Compare values
    print("Is value1 greater than 3:", value1 > 3)
    print("Is value1 greater than value2:", value1 > value2)

    # Compare identities
    value3 = value2
    print("value1 is value2:", value1 is value2)
    print("value2 is value3:", value2 is value3)

    # Compare types
    py_float_type = Python.evaluate("float")
    print("Python float type:", py_float_type)
    print("value1 type:", Python.type(value1))
    print("Is value1 a Python float:", Python.type(value1) is py_float_type)
```

```output
Is value1 greater than 3: True
Is value1 greater than value2: True
value1 is value2: False
value2 is value3: True
Python float type: <class 'float'>
value1 type: <class 'float'>
Is value1 a Python float: True
```

```output
Is value1 greater than 3: True
Is value1 greater than value2: True
value1 is value2: False
value2 is value3: True
Python float type: <class 'float'>
value1 type: <class 'float'>
Is value1 a Python float: True
```



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fpython%2Ftypes)

- [Mojo types in Python](types.html#mojo-types-in-python)
- [Python types in Mojo](types.html#python-types-in-mojo)

  - [Mojo wrapper objects](types.html#mojo-wrapper-objects)
  - [Comparing Python types in Mojo](types.html#comparing-python-types-in-mojo)










![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



- [Mojo](https://docs.modular.com/mojo)
- /[Manual](../index.html)
- /Value ownership
- /Intro to value ownership

<!--THE END-->

- [Mojo](https://docs.modular.com/mojo)
- /[Manual](../index.html)
- /Value ownership
- /Intro to value ownership

# Intro to value ownership

A program is nothing without data, and all modern programming languages store data in one of two places: the call stack and the heap (also sometimes in CPU registers, but we won't get into that here). However, each language reads and writes data a bit differently—sometimes very differently. So in the following sections, we'll explain how Mojo manages memory in your programs and how this affects the way you write Mojo code.

For an alternate introduction to ownership in Mojo, check out our two-part blog post: [What ownership is really about: a mental model approach](https://www.modular.com/blog/what-ownership-is-really-about-a-mental-model-approach), and [Deep dive into ownership in Mojo](https://www.modular.com/blog/deep-dive-into-ownership-in-mojo).

## Stack and heap overview[​](index.html#stack-and-heap-overview "Direct link to Stack and heap overview")

In general, all modern programming languages divide a running program's memory into four segments:

- Text. The compiled program.
- Data. Global data, either initialized or uninitialized.
- Stack. Local data, automatically managed during the program's runtime.
- Heap. Dynamically-allocated data, managed by the programmer.

The text and data segments are statically sized, but the stack and heap change size as the program runs.

The *stack* stores data local to the current function. When a function is called, the program allocates a block of memory—a *stack frame*—that is exactly the size required to store the function's data, including any *fixed-size* local variables. When another function is called, a new stack frame is pushed onto the top of the stack. When a function is done, its stack frame is popped off the stack.

Notice that we said only "*fixed-size* local values" are stored in the stack. Dynamically-sized values that can change in size at runtime are instead stored in the heap, which is a much larger region of memory that allows for dynamic memory allocation. Technically, a local variable for such a value is still stored in the call stack, but its value is a fixed-size pointer to the real value on the heap. Consider a Mojo string: it can be any length, and its length can change at runtime. So the Mojo `String` struct includes some statically-sized fields, plus a pointer to a dynamically-allocated buffer holding the actual string data.

Another important difference between the heap and the stack is that the stack is managed automatically—the code to push and pop stack frames is added by the compiler. Heap memory, on the other hand, is managed by the programmer explicitly allocating and deallocating memory. You may do this indirectly—by using standard library types like `List` and `String`—or directly, using the [`UnsafePointer`](https://docs.modular.com/mojo/stdlib/memory/unsafe_pointer/UnsafePointer) API.

Values that need to outlive the lifetime of a function (such as an array that's passed between functions and should not be copied) are stored in the heap, because heap memory is accessible from anywhere in the call stack, even after the function that created it is removed from the stack. This sort of situation—in which a heap-allocated value is used by multiple functions—is where most memory errors occur, and it's where memory management strategies vary the most between programming languages.

## Memory management strategies[​](index.html#memory-management-strategies "Direct link to Memory management strategies")

Because memory is limited, it's important that programs remove unused data from the heap ("free" the memory) as quickly as possible. Figuring out when to free that memory is pretty complicated.

Some programming languages try to hide the complexities of memory management from you by utilizing a "garbage collector" process that tracks all memory usage and deallocates unused heap memory periodically (also known as automatic memory management). A significant benefit of this method is that it relieves developers from the burden of manual memory management, generally avoiding more errors and making developers more productive. However, it incurs a performance cost because the garbage collector interrupts the program's execution, and it might not reclaim memory very quickly.

Other languages require that you manually free data that's allocated on the heap. When done properly, this makes programs execute quickly, because there's no processing time consumed by a garbage collector. However, the challenge with this approach is that programmers make mistakes, especially when multiple parts of the program need access to the same memory—it becomes difficult to know which part of the program "owns" the data and must deallocate it. Programmers might accidentally deallocate data before the program is done with it (causing "use-after-free" errors), or they might deallocate it twice ("double free" errors), or they might never deallocate it ("leaked memory" errors). Mistakes like these and others can have catastrophic results for the program, and these bugs are often hard to track down, making it especially important that they don't occur in the first place.

Mojo uses a third approach called "ownership" that relies on a collection of rules that programmers must follow when passing values. The rules ensure there is only one "owner" for a given value at a time. When a value's lifetime ends, Mojo calls its destructor, which is responsible for deallocating any heap memory that needs to be deallocated.

In this way, Mojo helps ensure memory is freed, but it does so in a way that's deterministic and safe from errors such as use-after-free, double-free and memory leaks. Plus, it does so with a very low performance overhead.

Mojo's value ownership model provides an excellent balance of programming productivity and strong memory safety. It only requires that you learn some new syntax and a few rules about how to share access to memory within your program.

But before we explain the rules and syntax for Mojo's value ownership model, you first need to understand [value semantics](value-semantics.html).



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fvalues%2F)

- [Stack and heap overview](index.html#stack-and-heap-overview)
- [Memory management strategies](index.html#memory-management-strategies)











Lifetimes, origins, and references | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



- [Mojo](https://docs.modular.com/mojo)
- /[Manual](../index.html)
- /Value ownership
- /Lifetimes, origins, and references

<!--THE END-->

- [Mojo](https://docs.modular.com/mojo)
- /[Manual](../index.html)
- /Value ownership
- /Lifetimes, origins, and references

# Lifetimes, origins, and references

The Mojo compiler includes a lifetime checker, a compiler pass that analyzes dataflow through your program. It identifies when variables are valid and inserts destructor calls when a variable's lifetime ends.

The Mojo compiler uses a special value called an *origin* to track the lifetime of variables and the validity of references.

Specifically, an origin answers two questions:

- What variable "owns" this value?
- Can the value be mutated using this reference?

For example, consider the following code:

```mojo
fn print_str(s: String):
    print(s)

name = String("Joan")
print_str(name)
```

```mojo
fn print_str(s: String):
    print(s)

name = String("Joan")
print_str(name)
```

```output
Joan
```

```output
Joan
```

The line `name = String("Joan")` declares a variable with an identifier (`name`) and logical storage space for a `String` value. When you pass `name` into the `print_str()` function, the function gets an immutable reference to the value. So both `name` and `s` refer to the same logical storage space, and have associated origin values that lets the Mojo compiler reason about them.

Most of the time, origins are handled automatically by the compiler. However, in some cases you'll need to interact with origins directly:

- When working with references—specifically `ref` arguments and `ref` return values.
- When working with types like [`Pointer`](https://docs.modular.com/mojo/stdlib/memory/pointer/Pointer) or [`Span`](https://docs.modular.com/mojo/stdlib/memory/span/Span) which are parameterized on the origin of the data they refer to.

This section also covers [`ref` arguments](lifetimes.html#ref-arguments) and [`ref` return values](lifetimes.html#ref-return-values), which let functions take arguments and provide return values as references with parametric origins.

## Working with origins[​](lifetimes.html#working-with-origins "Direct link to Working with origins")

Mojo's origin values are unlike most other values in the language, because they're primitive values, not Mojo structs.

Likewise, because these values are mostly created by the compiler, you can't just create your own origin value—you usually need to derive an origin from an existing value.

### Origin types[​](lifetimes.html#origin-types "Direct link to Origin types")

Mojo supplies a struct and a set of aliases that you can use to specify origin types. As the names suggest, the `ImmutableOrigin` and `MutableOrigin` aliases represent immutable and mutable origins, respectively:

```mojo
struct ImmutableRef[origin: ImmutableOrigin]:
    pass
```

```mojo
struct ImmutableRef[origin: ImmutableOrigin]:
    pass
```

Or you can use the [`Origin`](https://docs.modular.com/mojo/stdlib/builtin/type_aliases/Origin) struct to specify an origin with parametric mutability:

```mojo
struct ParametricRef[
    is_mutable: Bool,
    //,
    origin: Origin[is_mutable]
]:
    pass
```

```mojo
struct ParametricRef[
    is_mutable: Bool,
    //,
    origin: Origin[is_mutable]
]:
    pass
```

Origin types carry the mutability of a reference as a boolean parameter value, indicating whether the origin is mutable, immutable, or even with mutability depending on a parameter specified by the enclosing API.

The `is_mutable` parameter here is an [infer-only parameter](../parameters.1.html#infer-only-parameters). The `origin` value is often inferred, as well. For example, the following code creates a [`Pointer`](https://docs.modular.com/mojo/stdlib/memory/pointer/Pointer) to an existing value, but doesn't need to specify an origin—the `origin` is inferred from the variable passed in to the `address_of()` method.

```mojo
from memory import Pointer

def use_pointer():
    a = 10
    ptr = Pointer(to=a)
```

```mojo
from memory import Pointer

def use_pointer():
    a = 10
    ptr = Pointer(to=a)
```

A final type of origin value is an `OriginSet`. As the name suggests, an `OriginSet` represents a group of origins.

### Origin values[​](lifetimes.html#origin-values "Direct link to Origin values")

Most origin values are created by the compiler. As a developer, there are a few ways to specify origin values:

- Static origin. The `StaticConstantOrigin` alias is an origin value representing immutable values that last for the duration of the program. String literal values have a `StaticConstantOrigin`.
- Derived origin. The `__origin_of()` magic function returns the origin associated with the value (or values) passed in.
- Inferred origin. You can use inferred parameters to capture the origin of a value passed in to a function.
- Wildcard origins. The `ImmutableAnyOrigin` and `MutableAnyOrigin` aliases are special cases indicating a reference that might access any live value.

#### Static origins[​](lifetimes.html#static-origins "Direct link to Static origins")

You can use the static origin `StaticConstantOrigin` when you have a value that exists for the entire duration of the program.

For example, the `StringLiteral` method [`as_string_slice()`](https://docs.modular.com/mojo/stdlib/builtin/string_literal/StringLiteral#as_string_slice) returns a [`StringSlice`](https://docs.modular.com/mojo/stdlib/collections/string/string_slice/StringSlice) pointing to the original string literal. String literals are static—they're allocated at compile time and never destroyed—so the slice is created with an immutable, static origin.

#### Derived origins[​](lifetimes.html#derived-origins "Direct link to Derived origins")

Use the `__origin_of(value)` operator to obtain a value's origin. An argument to `__origin_of()` can take an arbitrary expression that yields one of the following:

- An origin value.
- A value with a memory location.

For example:

```mojo
__origin_of(self)
__origin_of(x.y)
__origin_of(foo())
```

```mojo
__origin_of(self)
__origin_of(x.y)
__origin_of(foo())
```

The `__origin_of()` operator is analyzed statically at compile time; The expressions passed to `__origin_of()` are never evaluated. (For example, when the compiler analyzes `__origin_of(foo())`, it doesn't run the `foo()` function.)

The following struct stores a string value using a [`OwnedPointer`](https://docs.modular.com/mojo/stdlib/memory/owned_pointer/OwnedPointer): a smart pointer that holds an owned value. The `as_ptr()` method returns a `Pointer` to the stored string, using the same origin as the original `OwnedPointer`.

```mojo
from memory import OwnedPointer, Pointer

struct BoxedString:
    var o_ptr: OwnedPointer[String]

    fn __init__(out self, value: String):
        self.o_ptr = OwnedPointer(value)

    fn as_ptr(mut self) -> Pointer[String, __origin_of(self.o_ptr)]:
        return Pointer(to=self.o_ptr[])
```

```mojo
from memory import OwnedPointer, Pointer

struct BoxedString:
    var o_ptr: OwnedPointer[String]

    fn __init__(out self, value: String):
        self.o_ptr = OwnedPointer(value)

    fn as_ptr(mut self) -> Pointer[String, __origin_of(self.o_ptr)]:
        return Pointer(to=self.o_ptr[])
```

Note that the `as_ptr()` method takes its `self` argument as `mut self`. If it used the default `read` argument convention, it would be immutable, and the derived origin (`__origin_of(self.o_ptr)`) would also be immutable.

You can also pass multiple expressions to `__origin_of()` to express the union of two or more origins:

`__origin_of(a, b)`

#### Inferred origins[​](lifetimes.html#inferred-origins "Direct link to Inferred origins")

The other common way to access an origin value is to *infer* it from the the arguments passed to a function or method. For example, the `Span` type has an associated `origin`:

```mojo
struct Span[
    is_mutable: Bool, //,
    T: CollectionElement,
    origin: Origin[is_mutable],
](CollectionElementNew):
    """A non owning view of contiguous data.
```

```mojo
struct Span[
    is_mutable: Bool, //,
    T: CollectionElement,
    origin: Origin[is_mutable],
](CollectionElementNew):
    """A non owning view of contiguous data.
```

One of its constructors creates a `Span` from an existing `List`, and infers its `origin` value from the list:

```mojo
    fn __init__(out self, ref [origin]list: List[T, *_]):
        """Construct a Span from a List.

        Args:
            list: The list to which the span refers.
        """
        self._data = list.data
        self._len = len(list)
```

```mojo
    fn __init__(out self, ref [origin]list: List[T, *_]):
        """Construct a Span from a List.

        Args:
            list: The list to which the span refers.
        """
        self._data = list.data
        self._len = len(list)
```

## Working with references[​](lifetimes.html#working-with-references "Direct link to Working with references")

You can use the `ref` keyword with arguments and return values to specify a reference with parametric mutability. That is, they can be either mutable or immutable.

From inside the called function, a `ref` argument looks like a `read` or `mut` argument.

A `ref` return value looks like any other return value to the calling function, but it is a *reference* to an existing value, not a copy.

### `ref` arguments[​](lifetimes.html#ref-arguments "Direct link to ref-arguments")

The `ref` argument convention lets you specify an argument of parametric mutability: that is, you don't need to know in advance whether the passed argument will be mutable or immutable. There are several reasons you might want to use a `ref` argument:

- You want to accept an argument with parametric mutability.
- You want to tie the lifetime of one argument to the lifetime of another argument.
- When you want an argument that is guaranteed to be passed in memory: this can be important and useful for generic arguments that need an identity, irrespective of whether the concrete type is register passable.

The syntax for a `ref` argument is:

`ref arg_name: arg_type`

Or:

`ref [origin_specifier(s)] arg_name: arg_type`

In the first form, the origin and mutability of the `ref` argument is inferred from the value passed in. The second form includes an origin clause, consisting of one or more origin specifiers inside square brackets. An origin specifier can be either:

- An origin value.
- An arbitrary expression, which is treated as shorthand for `__origin_of(expression)`. In other words, the following declarations are equivalent:

  ```mojo
  ref [__origin_of(self)]
  ref [self]
  ```

  ```mojo
  ref [__origin_of(self)]
  ref [self]
  ```
- An [`AddressSpace`](https://docs.modular.com/nightly/mojo/stdlib/memory/pointer/AddressSpace) value.
- An underscore character (`_`) to indicate that the origin is *unbound*. This is equivalent to omitting the origin specifier.

  ```mojo
  def add_ref(ref a: Int, b: Int) -> Int:
    return a+b
  ```

  ```mojo
  def add_ref(ref a: Int, b: Int) -> Int:
    return a+b
  ```

You can also name the origin explicitly. This is useful if you want to specify an `ImmutableOrigin` or `MutableOrigin`, or if you want to bind to the `is_mutable` parameter.

```mojo
def take_str_ref[
      is_mutable: Bool, //,
      origin: Origin[is_mutable]
    ](ref [origin] s: String):
    @parameter
    if is_mutable:
        print("Mutable: " + s)
    else:
        print("Immutable: " + s)

def pass_refs(s1: String, owned s2: String):
    take_str_ref(s1)
    take_str_ref(s2)

pass_refs("Hello", "Goodbye")
```

```mojo
def take_str_ref[
      is_mutable: Bool, //,
      origin: Origin[is_mutable]
    ](ref [origin] s: String):
    @parameter
    if is_mutable:
        print("Mutable: " + s)
    else:
        print("Immutable: " + s)

def pass_refs(s1: String, owned s2: String):
    take_str_ref(s1)
    take_str_ref(s2)

pass_refs("Hello", "Goodbye")
```

```output
Immutable: Hello
Mutable: Goodbye
```

```output
Immutable: Hello
Mutable: Goodbye
```

### `ref` return values[​](lifetimes.html#ref-return-values "Direct link to ref-return-values")

Like `ref` arguments, `ref` return values allow a function to return a mutable or immutable reference to a value. The syntax for a `ref` return value is:

`-> ref [origin_specifier(s)] arg_type`

Note that you **must** specify an origin specifier for a `ref` return value. The values allowed for origin specifiers are the same as the ones listed for [`ref` arguments](lifetimes.html#ref-arguments).

`ref` return values can be an efficient way to handle updating items in a collection. The standard way to do this is by implementing the `__getitem__()` and `__setitem__()` dunder methods. These are invoked to read from and write to a subscripted item in a collection:

```mojo
value = list[a]
list[b] += 10
```

```mojo
value = list[a]
list[b] += 10
```

With a `ref` argument, `__getitem__()` can return a mutable reference that can be modified directly. This has pros and cons compared to using a `__setitem__()` method:

- The mutable reference is more efficient—a single update isn't broken up across two methods. However, the referenced value must be in memory.
- A `__getitem__()`/`__setitem__()` pair allows for arbitrary code to be run when values are retrieved and set. For example, `__setitem__()` can validate or constrain input values.

For example, in the following example, `NameList` has a `__getitem__()` method that returns a reference:

```mojo
struct NameList:
    var names: List[String]

    def __init__(out self, *names: String):
        self.names = List[String]()
        for name in names:
            self.names.append(name[])

    def __getitem__(ref self, index: Int) ->
        ref [self.names] String:
        if (index >=0 and index < len(self.names)):
            return self.names[index]
        else:
            raise Error("index out of bounds")

def use_name_list():
    list = NameList("Thor", "Athena", "Dana", "Vrinda")
    print(list[2])
    list[2] += "?"
    print(list[2])

use_name_list()

```

```mojo
struct NameList:
    var names: List[String]

    def __init__(out self, *names: String):
        self.names = List[String]()
        for name in names:
            self.names.append(name[])

    def __getitem__(ref self, index: Int) ->
        ref [self.names] String:
        if (index >=0 and index < len(self.names)):
            return self.names[index]
        else:
            raise Error("index out of bounds")

def use_name_list():
    list = NameList("Thor", "Athena", "Dana", "Vrinda")
    print(list[2])
    list[2] += "?"
    print(list[2])

use_name_list()

```

```output
Dana
Dana?
```

```output
Dana
Dana?
```

Note that this update succeeds, even though `NameList` doesn't define a `__setitem__()` method:

```mojo
list[2] += "?"
```

```mojo
list[2] += "?"
```

Also note that the code uses the return value directly each time, rather than assigning the return value to a variable, like this:

```mojo
name = list[2]
name += "?"
```

```mojo
name = list[2]
name += "?"
```

Since a variable needs to own its value, `name` would end up with an owned *copy* of the referenced value. Mojo doesn't currently have syntax to express that you want to keep the original reference in `name`. This will be added in a future release.

If you're working with an API that returns a reference, and you want to avoid copying the referenced value, you can use a [`Pointer`](https://docs.modular.com/mojo/stdlib/memory/pointer/Pointer) to hold an indirect reference. You can assign a `Pointer` to a variable, but you need to use the dereference operator (`[]`) to access the underlying value.

```mojo
name_ptr = Pointer(to=list[2])
name_ptr[] += "?"
```

```mojo
name_ptr = Pointer(to=list[2])
name_ptr[] += "?"
```

Similarly, when designing an API you might want to return a `Pointer` instead of a `ref` to allow users to assign the return value to a variable. For example, iterators for the standard library collections return pointers, so they can be used in `for..in` loops:

```mojo
nums = List(1, 2, 3)
for item in nums: # List iterator returns a Pointer, which must be dereferenced
    print(item[])
for i in range(len(nums)):
    print(nums[i]) # List __getitem__() returns a ref
```

```mojo
nums = List(1, 2, 3)
for item in nums: # List iterator returns a Pointer, which must be dereferenced
    print(item[])
for i in range(len(nums)):
    print(nums[i]) # List __getitem__() returns a ref
```

```output
1
2
3
1
2
3
```

```output
1
2
3
1
2
3
```

(You can find the code for the `List` iterator in the [public repo](https://github.com/modular/max/blob/main/mojo/stdlib/src/collections/list.mojo#L63).)

#### Parametric mutability of return values[​](lifetimes.html#parametric-mutability-of-return-values "Direct link to Parametric mutability of return values")

Another advantage of `ref` return arguments is the ability to support parametric mutability. For example, recall the signature of the `__getitem__()` method above:

```mojo
def __getitem__(ref self, index: Int) ->
    ref [self] String:
```

```mojo
def __getitem__(ref self, index: Int) ->
    ref [self] String:
```

Since the `origin` of the return value is tied to the origin of `self`, the returned reference will be mutable if the method was called using a mutable reference. The method still works if you have an immutable reference to the `NameList`, but it returns an immutable reference:

```mojo
fn pass_immutable_list(list: NameList) raises:
    print(list[2])
    # list[2] += "?" # Error, this list is immutable

def use_name_list_again():
    list = NameList("Sophie", "Jack", "Diana")
    pass_immutable_list(list)

use_name_list_again()
```

```mojo
fn pass_immutable_list(list: NameList) raises:
    print(list[2])
    # list[2] += "?" # Error, this list is immutable

def use_name_list_again():
    list = NameList("Sophie", "Jack", "Diana")
    pass_immutable_list(list)

use_name_list_again()
```

```output
Diana
```

```output
Diana
```

Without parametric mutability, you'd need to write two versions of `__getitem__()`, one that accepts an immutable `self` and another that accepts a mutable `self`.

#### Return values with union origins[​](lifetimes.html#return-values-with-union-origins "Direct link to Return values with union origins")

A `ref` return value can include multiple values in its origin specifier, which yields the union of the origins. For example, the following `pick_one()` function returns a reference to one of the two input strings, with an origin that's a union of both origins.

```mojo
def pick_one(cond: Bool, ref a: String, ref b: String) -> ref [a, b] String:
    return a if cond else b
```

```mojo
def pick_one(cond: Bool, ref a: String, ref b: String) -> ref [a, b] String:
    return a if cond else b
```



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fvalues%2Flifetimes)

- [Working with origins](lifetimes.html#working-with-origins)

  - [Origin types](lifetimes.html#origin-types)
  - [Origin values](lifetimes.html#origin-values)
- [Working with references](lifetimes.html#working-with-references)

  - [`ref` arguments](lifetimes.html#ref-arguments)
  - [`ref` return values](lifetimes.html#ref-return-values)











Ownership | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



- [Mojo](https://docs.modular.com/mojo)
- /[Manual](../index.html)
- /Value ownership
- /Ownership

<!--THE END-->

- [Mojo](https://docs.modular.com/mojo)
- /[Manual](../index.html)
- /Value ownership
- /Ownership

# Ownership

A challenge you might face when using some programming languages is that you must manually allocate and deallocate memory. When multiple parts of the program need access to the same memory, it becomes difficult to keep track of who "owns" a value and determine when is the right time to deallocate it. If you make a mistake, it can result in a "use-after-free" error, a "double free" error, or a "leaked memory" error, any one of which can be catastrophic.

Mojo helps avoid these errors by ensuring there is only one variable that owns each value at a time, while still allowing you to share references with other functions. When the life span of the owner ends, Mojo [destroys the value](../lifecycle/death.html). Programmers are still responsible for making sure any type that allocates resources (including memory) also deallocates those resources in its destructor. Mojo's ownership system ensures that destructors are called promptly.

On this page, we'll explain the rules that govern this ownership model, and how to specify different argument conventions that define how values are passed into functions.

## Ownership summary[​](ownership.html#ownership-summary "Direct link to Ownership summary")

The fundamental rules that make Mojo's ownership model work are the following:

- Every value has only one owner at a time.
- When the lifetime of the owner ends, Mojo destroys the value.
- If there are existing references to a value, Mojo extends the lifetime of the owner.

### Variables and references[​](ownership.html#variables-and-references "Direct link to Variables and references")

A variable *owns* its value. A struct owns its fields.

A *reference* allows you to access a value owned by another variable. A reference can have either mutable access or immutable access to that value.

Mojo references are created when you call a function: function arguments can be passed as mutable or immutable references. A function can also return a reference instead of returning a value.

## Argument conventions[​](ownership.html#argument-conventions "Direct link to Argument conventions")

In all programming languages, code quality and performance is heavily dependent upon how functions treat argument values. That is, whether a value received by a function is a unique value or a reference, and whether it's mutable or immutable, has a series of consequences that define the readability, performance, and safety of the language.

In Mojo, we want to provide full [value semantics](value-semantics.html) by default, which provides consistent and predictable behavior. But as a systems programming language, we also need to offer full control over memory optimizations, which generally requires reference semantics. The trick is to introduce reference semantics in a way that ensures all code is memory safe by tracking the lifetime of every value and destroying each one at the right time (and only once). All of this is made possible in Mojo through the use of argument conventions that ensure every value has only one owner at a time.

An argument convention specifies whether an argument is mutable or immutable, and whether the function owns the value. Each convention is defined by a keyword at the beginning of an argument declaration:

- `read`: The function receives an **immutable reference**. This means the function can read the original value (it is *not* a copy), but it cannot mutate (modify) it. `def` functions treat this differently, as described below.
- `mut`: The function receives a **mutable reference**. This means the function can read and mutate the original value (it is *not* a copy).
- `owned`: The function takes **ownership** of a value. This means the function has exclusive ownership of the argument. The caller might choose to transfer ownership of an existing value to this function, but that's not always what happens. The callee might receive a newly-created value, or a copy of an existing value.
- `ref`: The function gets a reference with an parametric mutability: that is, the reference can be either mutable or immutable. You can think of `ref` arguments as a generalization of the `read` and `mut` conventions. `ref` arguments are an advanced topic, and they're described in more detail in [Lifetimes and references](lifetimes.html).
- `out`: A special convention used for the `self` argument in [constructors](../lifecycle/life.html#constructor) and for [named results](../functions.html#named-function-results). An `out` argument is uninitialized at the beginning of the function, and must be initialized before the function returns. Although `out` arguments show up in the argument list, they're never passed in by the caller.

For example, this function has one argument that's a mutable reference and one that's immutable:

```mojo
fn add(mut x: Int, read y: Int):
    x += y

fn main():
    var a = 1
    var b = 2
    add(a, b)
    print(a)  # Prints 3
```

```mojo
fn add(mut x: Int, read y: Int):
    x += y

fn main():
    var a = 1
    var b = 2
    add(a, b)
    print(a)  # Prints 3
```

You've probably already seen some function arguments that don't declare a convention. by default, all arguments are `read`. In the following sections, we'll explain each of these argument conventions in more detail.

## Borrowed arguments (`read`)[​](ownership.html#borrowed-arguments-read "Direct link to borrowed-arguments-read")

The `read` convention is the default for all arguments. But `def` and `fn` functions treat `read` arguments somewhat differently:

- In a [`def` function](../functions.html#def-functions), if you mutate the value in the body of the function, the function receives a mutable copy of the argument. Otherwise, it receives an immutable reference. This allows you to treat arguments as mutable, but avoid the overhead of making extra copies when they're not needed.
- In an [`fn` function](../functions.html#fn-functions), the function always receives an immutable reference. If you want a mutable copy, you can assign it to a local variable:

  ```mojo
  var my_copy = read_arg
  ```

  ```mojo
  var my_copy = read_arg
  ```

In both cases, the original value on the caller side can't be changed by the callee.

For example:

```mojo
from collections import List

def print_list(list: List[Int]):
    print(list.__str__())

var list = List(1, 2, 3, 4)
print_list(list)

```

```mojo
from collections import List

def print_list(list: List[Int]):
    print(list.__str__())

var list = List(1, 2, 3, 4)
print_list(list)

```

```output
[1, 2, 3, 4]
```

```output
[1, 2, 3, 4]
```

Here the `list` argument to `print_list()` is read and not mutated, so the `print_list()` function gets an immutable reference to the original `List`, and doesn't do any copying.

In general, passing an immutable reference is much more efficient when handling large or expensive-to-copy values, because the copy constructor and destructor are not invoked for a `read` argument.

### Compared to C++ and Rust[​](ownership.html#compared-to-c-and-rust "Direct link to Compared to C++ and Rust")

Mojo's read argument convention is similar in some ways to passing an argument by `const&` in C++, which also avoids a copy of the value and disables mutability in the callee. However, the read convention differs from `const&` in C++ in two important ways:

- The Mojo compiler implements a lifetime checker that ensures that values are not destroyed when there are outstanding references to those values.
- Small values like `Int`, `Float`, and `SIMD` are passed directly in machine registers instead of through an extra indirection (this is because they are declared with the `@register_passable` decorator). This is a [significant performance enhancement](https://www.forrestthewoods.com/blog/should-small-rust-structs-be-passed-by-copy-or-by-borrow/) when compared to languages like C++ and Rust, and moves this optimization from every call site to a declaration on the type definition.

The major difference between Rust and Mojo is that Mojo does not require a sigil on the caller side to pass by immutable reference. Also, Mojo is more efficient when passing small values, and Rust defaults to moving values instead of passing them around by borrow. These policy and syntax decisions allow Mojo to provide an easier-to-use programming model.

## Mutable arguments (`mut`)[​](ownership.html#mutable-arguments-mut "Direct link to mutable-arguments-mut")

If you'd like your function to receive a **mutable reference**, add the `mut` keyword in front of the argument name. You can think of `mut` like this: it means any changes to the value *in*side the function are visible *out*side the function.

For example, this `mutate()` function updates the original `list` value:

```mojo
from collections import List

def mutate(mut l: List[Int]):
    l.append(5)

var list = List(1, 2, 3, 4)

mutate(list)
print_list(list)
```

```mojo
from collections import List

def mutate(mut l: List[Int]):
    l.append(5)

var list = List(1, 2, 3, 4)

mutate(list)
print_list(list)
```

```output
[1, 2, 3, 4, 5]
```

```output
[1, 2, 3, 4, 5]
```

That behaves like an optimized replacement for this:

```mojo
from collections import List

def mutate_copy(l: List[Int]) -> List[Int]:
    l.append(5)
    return l

var list = List(1, 2, 3, 4)
list = mutate_copy(list)
print_list(list)
```

```mojo
from collections import List

def mutate_copy(l: List[Int]) -> List[Int]:
    l.append(5)
    return l

var list = List(1, 2, 3, 4)
list = mutate_copy(list)
print_list(list)
```

```output
[1, 2, 3, 4, 5]
```

```output
[1, 2, 3, 4, 5]
```

Although the code using `mut` isn't that much shorter, it's more memory efficient because it does not make a copy of the value.

However, remember that the values passed as `mut` must already be mutable. For example, if you try to take a `read` value and pass it to another function as `mut`, you'll get a compiler error because Mojo can't form a mutable reference from an immutable reference.

You cannot define [default values](../functions.html#optional-arguments) for `mut` arguments.

### Argument exclusivity[​](ownership.html#argument-exclusivity "Direct link to Argument exclusivity")

Mojo enforces *argument exclusivity* for mutable references. This means that if a function receives a mutable reference to a value (such as an `mut` argument), it can't receive any other references to the same value—mutable or immutable. That is, a mutable reference can't have any other references that *alias* it.

For example, consider the following code example:

```mojo
fn append_twice(mut s: String, other: String):
   # Mojo knows 's' and 'other' cannot be the same string.
   s += other
   s += other

fn invalid_access():
  var my_string = String("o")

  # error: passing `my_string` mut is invalid since it is also passed
  # read.
  append_twice(my_string, my_string)
  print(my_string)
```

```mojo
fn append_twice(mut s: String, other: String):
   # Mojo knows 's' and 'other' cannot be the same string.
   s += other
   s += other

fn invalid_access():
  var my_string = String("o")

  # error: passing `my_string` mut is invalid since it is also passed
  # read.
  append_twice(my_string, my_string)
  print(my_string)
```

This code is confusing because the user might expect the output to be `ooo`, but since the first addition mutates both `s` and `other`, the actual output would be `oooo`. Enforcing exclusivity of mutable references not only prevents coding errors, it also allows the Mojo compiler to optimize code in some cases.

One way to avoid this issue when you do need both a mutable and an immutable reference (or need to pass the same value to two arguments) is to make a copy:

```mojo
fn valid_access():
  var my_string = String("o")
  var other_string = String(my_string)
  append_twice(my_string, other_string)
  print(my_string)
```

```mojo
fn valid_access():
  var my_string = String("o")
  var other_string = String(my_string)
  append_twice(my_string, other_string)
  print(my_string)
```

Note that argument exclusivity isn't enforced for register-passable trivial types (like `Int` and `Bool`), because they are always passed by copy. When passing the same value into two `Int` arguments, the callee will receive two copies of the value.

## Transfer arguments (`owned` and `^`)[​](ownership.html#transfer-arguments-owned-and- "Direct link to transfer-arguments-owned-and-")

And finally, if you'd like your function to receive value **ownership**, add the `owned` keyword in front of the argument name.

This convention is often combined with use of the postfixed `^` "transfer" sigil on the variable that is passed into the function, which ends the lifetime of that variable.

Technically, the `owned` keyword does not guarantee that the received value is *the original value*—it guarantees only that the function gets unique ownership of a value. This happens in one of three ways:

- The caller passes the argument with the `^` transfer sigil, which ends the lifetime of that variable (the variable becomes uninitialized) and ownership is transferred into the function.
- The caller **does not** use the `^` transfer sigil, in which case, Mojo copies the value. If the type isn't copyable, this is a compile-time error.
- The caller passes in a newly-created "owned" value, such as a value returned from a function. In this case, no variable owns the value and it can be transferred directly to the callee. For example:

  ```mojo
  def take(owned s: String):
      pass

  take(String("A brand-new String!"))
  ```

  ```mojo
  def take(owned s: String):
      pass

  take(String("A brand-new String!"))
  ```

The following code works by making a copy of the string, because `take_text()` uses the `owned` convention, and the caller does not include the transfer sigil:

```mojo
fn take_text(owned text: String):
    text += "!"
    print(text)

fn my_function():
    var message: String = "Hello"
    take_text(message)
    print(message)

my_function()
```

```mojo
fn take_text(owned text: String):
    text += "!"
    print(text)

fn my_function():
    var message: String = "Hello"
    take_text(message)
    print(message)

my_function()
```

```output
Hello!
Hello
```

```output
Hello!
Hello
```

However, if you add the `^` transfer sigil when calling `take_text()`, the compiler complains about `print(message)`, because at that point, the `message` variable is no longer initialized. That is, this version does not compile:

```mojo
fn my_function():
    var message: String = "Hello"
    take_text(message^)
    print(message)  # ERROR: The `message` variable is uninitialized
```

```mojo
fn my_function():
    var message: String = "Hello"
    take_text(message^)
    print(message)  # ERROR: The `message` variable is uninitialized
```

This is a critical feature of Mojo's lifetime checker, because it ensures that no two variables can have ownership of the same value. To fix the error, you must not use the `message` variable after you end its lifetime with the `^` transfer operator. So here is the corrected code:

```mojo

fn my_function():
    var message: String = "Hello"
    take_text(message^)

my_function()
```

```mojo

fn my_function():
    var message: String = "Hello"
    take_text(message^)

my_function()
```

```output
Hello!
```

```output
Hello!
```

Regardless of how it receives the value, when the function declares an argument as `owned`, it can be certain that it has unique mutable access to that value. Because the value is owned, the value is destroyed when the function exits—unless the function transfers the value elsewhere.

For example, in the following example, `add_to_list()` takes a string and appends it to the list. Ownership of the string is transferred to the list, so it's not destroyed when the function exits. On the other hand, `consume_string()` doesn't transfer its `owned` value out, so the value is destroyed at the end of the function.

```mojo
from collections import List

def add_to_list(owned name: String, mut list: List[String]):
    list.append(name^)
    # name is uninitialized, nothing to destroy

def consume_string(owned s: String):
    print(s)
    # s is destroyed here
```

```mojo
from collections import List

def add_to_list(owned name: String, mut list: List[String]):
    list.append(name^)
    # name is uninitialized, nothing to destroy

def consume_string(owned s: String):
    print(s)
    # s is destroyed here
```

### Transfer implementation details[​](ownership.html#transfer-implementation-details "Direct link to Transfer implementation details")

In Mojo, you shouldn't conflate "ownership transfer" with a "move operation"—these are not strictly the same thing.

There are multiple ways that Mojo can transfer ownership of a value:

- If a type implements the [move constructor](../lifecycle/life.html#move-constructor), `__moveinit__()`, Mojo may invoke this method *if* a value of that type is transferred into a function as an `owned` argument, *and* the original variable's lifetime ends at the same point (with or without use of the `^` transfer sigil).
- If a type implements the [copy constructor](../lifecycle/life.html#move-constructor), `__copyinit__()` and not `__moveinit__()`, Mojo may copy the value and destroy the old value.
- In some cases, Mojo can optimize away the move operation entirely, leaving the value in the same memory location but updating its ownership. In these cases, a value can be transferred without invoking either the `__copyinit__()` or `__moveinit__()` constructors.

In order for the `owned` convention to work *without* the transfer sigil, the value type must be copyable (via `__copyinit__()`).

## Comparing `def` and `fn` argument conventions[​](ownership.html#comparing-def-and-fn-argument-conventions "Direct link to comparing-def-and-fn-argument-conventions")

As mentioned in the section about [functions](../functions.html), `def` and `fn` functions are interchangeable, as far as a caller is concerned, and they can both accomplish the same things. It's only the inside that differs, and Mojo's `def` function is essentially just sugaring for the `fn` function:

- A `def` argument without a type annotation defaults to [`object`](https://docs.modular.com/mojo/stdlib/builtin/object/object) type (whereas as `fn` requires all types be explicitly declared).
- A `def` function can treat a `read` argument as mutable (in which case it receives a mutable copy). An `fn` function must make this copy explicitly.

For example, these two functions have the exact same behavior.

```mojo
def def_example(a: Int, mut b: Int, owned c):
    pass

fn fn_example(a_in: Int, mut b: Int, owned c: object):
    var a = a_in
    pass
```

```mojo
def def_example(a: Int, mut b: Int, owned c):
    pass

fn fn_example(a_in: Int, mut b: Int, owned c: object):
    var a = a_in
    pass
```

This shadow copy typically adds no overhead, because small types like `object` are cheap to copy. However, copying large types that allocate heap storage can be expensive. (For example, copying `List` or `Dict` types, or copying large numbers of strings.)

### `read` versus `owned` in `def` functions[​](ownership.html#read-versus-owned-in-def-functions "Direct link to read-versus-owned-in-def-functions")

The difference between `read` and `owned` in a `def` function may be a little subtle. In both cases, you can end up with a uniquely-owned value that's a copy of the original value.

- The `read` argument always gets an immutable reference or a local copy. You can't transfer a value into a `read` argument.
- The `owned` argument always gets a uniquely owned value, which may have been copied or transferred from the callee. Using `owned` arguments without the transfer sigil (`^`) usually results in values being copied.



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fvalues%2Fownership)

- [Ownership summary](ownership.html#ownership-summary)

  - [Variables and references](ownership.html#variables-and-references)
- [Argument conventions](ownership.html#argument-conventions)
- [Borrowed arguments (`read`)](ownership.html#borrowed-arguments-read)

  - [Compared to C++ and Rust](ownership.html#compared-to-c-and-rust)
- [Mutable arguments (`mut`)](ownership.html#mutable-arguments-mut)

  - [Argument exclusivity](ownership.html#argument-exclusivity)
- [Transfer arguments (`owned` and `^`)](ownership.html#transfer-arguments-owned-and-)

  - [Transfer implementation details](ownership.html#transfer-implementation-details)
- [Comparing `def` and `fn` argument conventions](ownership.html#comparing-def-and-fn-argument-conventions)

  - [`read` versus `owned` in `def` functions](ownership.html#read-versus-owned-in-def-functions)











Value semantics | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



- [Mojo](https://docs.modular.com/mojo)
- /[Manual](../index.html)
- /Value ownership
- /Value semantics

<!--THE END-->

- [Mojo](https://docs.modular.com/mojo)
- /[Manual](../index.html)
- /Value ownership
- /Value semantics

# Value semantics

Mojo doesn't enforce value semantics or reference semantics. It supports them both and allows each type to define how it is created, copied, and moved (if at all). So, if you're building your own type, you can implement it to support value semantics, reference semantics, or a bit of both. That said, Mojo is designed with argument behaviors that default to value semantics, and it provides tight controls for reference semantics that avoid memory errors.

The controls over reference semantics are provided by the [value ownership model](ownership.html), but before we get into the syntax and rules for that, it's important that you understand the principles of value semantics. Generally, it means that each variable has unique access to a value, and any code outside the scope of that variable cannot modify its value.

## Intro to value semantics[​](value-semantics.html#intro-to-value-semantics "Direct link to Intro to value semantics")

In the most basic situation, sharing a value-semantic type means that you create a copy of the value. This is also known as "pass by value." For example, consider this code:

```mojo
x = 1
y = x
y += 1

print(x)
print(y)
```

```mojo
x = 1
y = x
y += 1

print(x)
print(y)
```

```output
1
2
```

```output
1
2
```

We assigned the value of `x` to `y`, which creates the value for `y` by making a copy of `x`. When we increment `y`, the value of `x` doesn't change. Each variable has exclusive ownership of a value.

Whereas, if a type instead uses reference semantics, then `y` would point to the same value as `x`, and incrementing either one would affect the value for both. Neither `x` nor `y` would "own" the value, and any variable would be allowed to reference it and mutate it.

Numeric values in Mojo are value semantic because they're trivial types, which are cheap to copy.

Here's another example with a function:

```mojo
def add_one(y: Int):
    y += 1
    print(y)

x = 1
add_one(x)
print(x)
```

```mojo
def add_one(y: Int):
    y += 1
    print(y)

x = 1
add_one(x)
print(x)
```

```output
2
1
```

```output
2
1
```

Again, the `y` value is a copy and the function cannot modify the original `x` value.

If you're familiar with Python, this is probably familiar so far, because the code above behaves the same in Python. However, Python is not value semantic.

It gets complicated, but let's consider a situation in which you call a Python function and pass an object with a pointer to a heap-allocated value. Python actually gives that function a reference to your object, which allows the function to mutate the heap-allocated value. This can cause nasty bugs if you're not careful, because the function might incorrectly assume it has unique ownership of that object.

In Mojo, the default behavior for all function arguments is to use value semantics. If the function wants to modify the value of an incoming argument, then it must explicitly declare so, which avoids accidental mutations of the original value.

All Mojo types passed to a `def` function can be treated as mutable, which maintains the expected mutability behavior from Python. But by default, it is mutating a uniquely-owned value, not the original value.

For example, when you pass an instance of a `SIMD` vector to a `def` function it creates a unique copy of all values. Thus, if we modify the argument in the function, the original value is unchanged:

```mojo
def update_simd(t: SIMD[DType.int32, 4]):
    t[0] = 9
    print(t)

v = SIMD[DType.int32, 4](1, 2, 3, 4)
update_simd(v)
print(v)
```

```mojo
def update_simd(t: SIMD[DType.int32, 4]):
    t[0] = 9
    print(t)

v = SIMD[DType.int32, 4](1, 2, 3, 4)
update_simd(v)
print(v)
```

```output
[9, 2, 3, 4]
[1, 2, 3, 4]
```

```output
[9, 2, 3, 4]
[1, 2, 3, 4]
```

If this were Python code, the function would modify the original object, because Python shares a reference to the original object.

However, not all types are inexpensive to copy. Copying a `String` or `List` requires allocating heap memory, so we want to avoid copying one by accident. When designing a type like this, ideally you want to prevent *implicit* copies, and only make a copy when it's explicitly requested.

### Value semantics in `def` vs `fn`[​](value-semantics.html#value-semantics-in-def-vs-fn "Direct link to value-semantics-in-def-vs-fn")

The arguments above are mutable because a [`def` function](../functions.html#def-functions) has special treatment for the default [`read` argument convention](ownership.html#argument-conventions).

Whereas, `fn` functions always receive `read` arguments as immutable references. This is a memory optimization to avoid making unnecessary copies.

For example, let's create another function with the `fn` declaration. In this case, the `y` argument is immutable by default, so if the function wants to modify the value in the local scope, it needs to make a local copy:

```mojo
fn add_two(y: Int):
    # y += 2 # This will cause a compiler error because `y` is immutable
    # We can instead make an explicit copy:
    var z = y
    z += 2
    print(z)

x = 1
add_two(x)
print(x)
```

```mojo
fn add_two(y: Int):
    # y += 2 # This will cause a compiler error because `y` is immutable
    # We can instead make an explicit copy:
    var z = y
    z += 2
    print(z)

x = 1
add_two(x)
print(x)
```

```output
3
1
```

```output
3
1
```

This is all consistent with value semantics because each variable maintains unique ownership of its value.

The way the `fn` function receives the `y` value is a "look but don't touch" approach to value semantics. This is also a more memory-efficient approach when dealing with memory-intensive arguments, because Mojo doesn't make any copies unless we explicitly make the copies ourselves.

Thus, the default behavior for `def` and `fn` arguments is fully value semantic: arguments are either copies or immutable references, and any living variable from the callee is not affected by the function.

But we must also allow reference semantics (mutable references) because it's how we build performant and memory-efficient programs (making copies of everything gets really expensive). The challenge is to introduce reference semantics in a way that does not disturb the predictability and safety of value semantics.

The way we do that in Mojo is, instead of enforcing that every variable have "exclusive access" to a value, we ensure that every value has an "exclusive owner," and destroy each value when the lifetime of its owner ends.

On the next page about [value ownership](ownership.html), you'll learn how to modify the default argument conventions, and safely use reference semantics so every value has only one owner at a time.

## Python-style reference semantics[​](value-semantics.html#python-style-reference-semantics "Direct link to Python-style reference semantics")

If you will always use strict type declarations, you can skip this section because it only applies to Mojo code using `def` functions without type declarations (or values declared as [`object`](https://docs.modular.com/mojo/stdlib/builtin/object/object)).

As we said at the top of this page, Mojo doesn't enforce value semantics or reference semantics. It's up to each type author to decide how an instance of their type should be created, copied, and moved (see [Value lifecycle](../lifecycle/index.html)). Thus, in order to provide compatibility with Python, Mojo's `object` type is designed to support Python's style of argument passing for functions, which is different from the other types in Mojo.

Python's argument-passing convention is called "pass by object reference." This means when you pass a variable to a Python function, you actually pass a reference to the object, as a value (so it's not strictly reference semantics).

Passing the object reference "as a value" means that the argument name is just a container that acts like an alias to the original object. If you reassign the argument inside the function, it does not affect the caller's original value. However, if you modify the object itself (such as call `append()` on a list), the change is visible to the original object outside the function.

For example, here's a Python function that receives a list and modifies it:

```mojo
%%python
def modify_list(l):
    l.append(3)
    print("func:", l)

ar = [1, 2]
modify_list(ar)
print("orig:", ar)
```

```mojo
%%python
def modify_list(l):
    l.append(3)
    print("func:", l)

ar = [1, 2]
modify_list(ar)
print("orig:", ar)
```

```output
func: [1, 2, 3]
orig: [1, 2, 3]
```

```output
func: [1, 2, 3]
orig: [1, 2, 3]
```

In this example, it looks like the list is "passed by reference" because `l` modifies the original value.

However, if the Python function instead *assigns* a value to `l`, it does not affect the original value:

```mojo
%%python
def change_list(l):
    l = [3, 4]
    print("func:", l)

ar = [1, 2]
change_list(ar)
print("orig:", ar)
```

```mojo
%%python
def change_list(l):
    l = [3, 4]
    print("func:", l)

ar = [1, 2]
change_list(ar)
print("orig:", ar)
```

```output
func: [3, 4]
orig: [1, 2]
```

```output
func: [3, 4]
orig: [1, 2]
```

This demonstrates how a Python argument holds the object reference *as a value*: the function can mutate the original value, but it can also assign a new object to the argument name.

### Pass by object reference in Mojo[​](value-semantics.html#pass-by-object-reference-in-mojo "Direct link to Pass by object reference in Mojo")

Although we haven't finished implementing the [`object`](https://docs.modular.com/mojo/stdlib/builtin/object/object) type to represent any Mojo type, our intention is to do so, and enable "pass by object reference" as described above for all dynamic types in a `def` function.

That means you can have dynamic typing and "pass by object reference" behavior by simply writing your Mojo code like Python:

1. Use `def` function declarations.
2. Don't declare argument types.

TODO

Mojo does not adopt the full syntax of Python yet, and there is a lot to do in this department before Mojo supports all of Python's types and behaviors. As such, this is a topic that also still needs a lot of documentation.



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fvalues%2Fvalue-semantics)

- [Intro to value semantics](value-semantics.html#intro-to-value-semantics)

  - [Value semantics in `def` vs `fn`](value-semantics.html#value-semantics-in-def-vs-fn)
- [Python-style reference semantics](value-semantics.html#python-style-reference-semantics)

  - [Pass by object reference in Mojo](value-semantics.html#pass-by-object-reference-in-mojo)










Processing 9 HTML files from directory C:\\Users\\drewg\\Downloads\\docs.modular.com\\mojo\\manual\\decorators... --- Processing file: C:\\Users\\drewg\\Downloads\\docs.modular.com\\mojo\\manual\\decorators\\decorators\_always-inline.html ---

- [Mojo](https://docs.modular.com/mojo)
- /[APIs](https://docs.modular.com/mojo/lib)
- /Decorators
- /@always\_inline

<!--THE END-->

- [Mojo](https://docs.modular.com/mojo)
- /[APIs](https://docs.modular.com/mojo/lib)
- /Decorators
- /@always\_inline

# @always\_inline

You can add the `@always_inline` decorator on any function to make the Mojo compiler "inline" the body of the function (copy it) directly into the body of the calling function.

This eliminates potential performance costs associated with function calls jumping to a new point in code. Normally, the compiler will do this automatically where it can improve performance, but this decorator forces it to do so. The downside is that it can increase the binary size by duplicating the function at every call site.

For example:

```mojo
@always_inline
fn add(a: Int, b: Int) -> Int:
    return a + b

print(add(1, 2))
```

```mojo
@always_inline
fn add(a: Int, b: Int) -> Int:
    return a + b

print(add(1, 2))
```

Because `add()` is decorated with `@always_inline`, Mojo compiles this program without adding the `add()` function to the call stack, and it instead performs the addition directly at the `print()` call site, as if it were written like this:

```mojo
print(1 + 2)
```

```mojo
print(1 + 2)
```

## `@always_inline("nodebug")`[​](always-inline.html#always_inlinenodebug "Direct link to always_inlinenodebug")

You can also use the decorator with the `"nodebug"` argument, which has the same effect to inline the function, but without debug information. This means that you can't step into the function when debugging.

This decorator is intended to be used on the lowest-level functions in a library, which may wrap primitive functions, MLIR operations, or inline assembly. Marking these functions as "nodebug" prevents users from accidentally stepping into low-level non-Mojo code when debugging.



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fdecorators%2Falways-inline)

Found 1 nodes matching selector 'article' --- End of file --- --- Processing file: C:\\Users\\drewg\\Downloads\\docs.modular.com\\mojo\\manual\\decorators\\decorators\_copy-capture.html ---

- [Mojo](https://docs.modular.com/mojo)
- /[APIs](https://docs.modular.com/mojo/lib)
- /Decorators
- /@\_\_copy\_capture

# @\_\_copy\_capture

You can add the `__copy_capture` decorator on a parametric closure to capture register-passable values by copy. This decorator causes a nested function to copy the value of the indicated variable into the closure object at the point of formation instead of capturing that variable by reference. This allows the closure to be passed as an escaping function, without lifetime concerns.

```mojo
  fn foo(x: Int):
      var z = x

      @__copy_capture(z)
      @parameter
      fn formatter() -> Int:
          return z
      z = 2
      print(formatter())

  fn main():
      foo(5)
```

```mojo
  fn foo(x: Int):
      var z = x

      @__copy_capture(z)
      @parameter
      fn formatter() -> Int:
          return z
      z = 2
      print(formatter())

  fn main():
      foo(5)
```



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fdecorators%2Fcopy-capture)

Found 1 nodes matching selector 'article' --- End of file --- --- Processing file: C:\\Users\\drewg\\Downloads\\docs.modular.com\\mojo\\manual\\decorators\\decorators\_implicit.html ---

- [Mojo](https://docs.modular.com/mojo)
- /[APIs](https://docs.modular.com/mojo/lib)
- /Decorators
- /@implicit

# @implicit

You can add the `@implicit` decorator on any single-argument constructor to identify it as eligible for implicit conversion.

For example:

```mojo
struct MyInt:
    var value: Int

    @implicit
    fn __init__(out self, value: Int):
        self.value = value

    fn __init__(out self, value: Float64):
        self.value = Int(value)

```

```mojo
struct MyInt:
    var value: Int

    @implicit
    fn __init__(out self, value: Int):
        self.value = value

    fn __init__(out self, value: Float64):
        self.value = Int(value)

```

This implicit conversion constructor allows you to pass an `Int` to a function that takes a `MyInt` argument, or assign an `Int` to a variable of type `MyInt`. However, the constructor that takes a `Float64` value is **not** an implicit conversion constructor, so it must be invoked explicitly:

```mojo
fn func(n: MyInt):
    print("MyInt value: ", n.value)

fn main():
    func(Int(42))             # Implicit conversion from Int: OK
    func(MyInt(Float64(4.2))) # Explicit conversion from Float64: OK
    func(Float64(4.2))        # Error: can't convert Float64 to MyInt
```

```mojo
fn func(n: MyInt):
    print("MyInt value: ", n.value)

fn main():
    func(Int(42))             # Implicit conversion from Int: OK
    func(MyInt(Float64(4.2))) # Explicit conversion from Float64: OK
    func(Float64(4.2))        # Error: can't convert Float64 to MyInt
```



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fdecorators%2Fimplicit)

Found 1 nodes matching selector 'article' --- End of file --- --- Processing file: C:\\Users\\drewg\\Downloads\\docs.modular.com\\mojo\\manual\\decorators\\decorators\_index.html ---

- [Mojo](https://docs.modular.com/mojo)
- /[APIs](https://docs.modular.com/mojo/lib)
- /Decorators
- /Decorators

# Mojo decorators

A Mojo decorator is a [higher-order function](https://en.wikipedia.org/wiki/Higher-order_function) that modifies or extends the behavior of a struct, a function, or some other code. Instead of actually calling the higher-order function, you simply add the decorator (such as the `@value` decorator) above your code (such as a struct). The Mojo compiler then uses the decorator function to modify your code at compile time.

No custom decorators

The creation of custom decorators is not yet supported. The available ones are built directly into the compiler.

The following pages describe each built-in decorator with examples.

[`@always_inline`
\
Copies the body of a function directly into the body of the calling function.](always-inline.html)

[`@__copy_capture`
\
Captures register-passable typed values by copy.](copy-capture.html)

[`@implicit`
\
Marks a constructor as eligible for implicit conversion.](implicit.html)

[`@nonmaterializable`
\
Declares that a type should exist only in the parameter domain.](nonmaterializable.html)

[`@parameter`
\
Executes a function or if statement at compile time.](parameter.html)

[`@register_passable`
\
Declares that a type should be passed in machine registers.](register-passable.html)

[`@staticmethod`
\
Declares a struct method as static.](staticmethod.html)

[`@value`
\
Generates boilerplate lifecycle methods for a struct.](value.html)



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fdecorators%2F)

Found 1 nodes matching selector 'article' --- End of file --- --- Processing file: C:\\Users\\drewg\\Downloads\\docs.modular.com\\mojo\\manual\\decorators\\decorators\_nonmaterializable.html ---

- [Mojo](https://docs.modular.com/mojo)
- /[APIs](https://docs.modular.com/mojo/lib)
- /Decorators
- /@nonmaterializable

# @nonmaterializable

You can add the `@nonmaterializable` decorator on a struct to declare that the type can exist only in the parameter domain (it can be used for metaprogramming only, and not as a runtime type). And, if an instance of this type does transition into the runtime domain, this decorator declares what type it becomes there.

To use it, declare your type with `@nonmaterializable(TargetType)`, where `TargetType` is the type that the object should convert to if it becomes a runtime value (you must declare the `TargetType`). For example, if a struct is marked as `@nonmaterializable(Foo)`, then anywhere that it goes from a parameter value to a runtime value, it automatically converts into the `Foo` type.

For example, the following `NmStruct` type can be used in the parameter domain, but the `converted_to_has_bool` instance of it is converted to `HasBool` when it's materialized as a runtime value:

```mojo
@value
@register_passable("trivial")
struct HasBool:
    var x: Bool

    fn __init__(out self, x: Bool):
        self.x = x

    @always_inline("nodebug")
    fn __init__(out self, nms: NmStruct):
        self.x = True if (nms.x == 77) else False

@value
@nonmaterializable(HasBool)
@register_passable("trivial")
struct NmStruct:
    var x: Int

    @always_inline("nodebug")
    fn __add__(self, rhs: Self) -> Self:
        return NmStruct(self.x + rhs.x)

alias still_nm_struct = NmStruct(1) + NmStruct(2)
# When materializing to a run-time variable, it is automatically converted,
# even without a type annotation.
var converted_to_has_bool = still_nm_struct
```

```mojo
@value
@register_passable("trivial")
struct HasBool:
    var x: Bool

    fn __init__(out self, x: Bool):
        self.x = x

    @always_inline("nodebug")
    fn __init__(out self, nms: NmStruct):
        self.x = True if (nms.x == 77) else False

@value
@nonmaterializable(HasBool)
@register_passable("trivial")
struct NmStruct:
    var x: Int

    @always_inline("nodebug")
    fn __add__(self, rhs: Self) -> Self:
        return NmStruct(self.x + rhs.x)

alias still_nm_struct = NmStruct(1) + NmStruct(2)
# When materializing to a run-time variable, it is automatically converted,
# even without a type annotation.
var converted_to_has_bool = still_nm_struct
```

A non-materializable struct must have all of its methods annotated as `@always_inline`, and it must be computable in the parameter domain.



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fdecorators%2Fnonmaterializable)

Found 1 nodes matching selector 'article' --- End of file --- --- Processing file: C:\\Users\\drewg\\Downloads\\docs.modular.com\\mojo\\manual\\decorators\\decorators\_parameter.html ---

- [Mojo](https://docs.modular.com/mojo)
- /[APIs](https://docs.modular.com/mojo/lib)
- /Decorators
- /@parameter

<!--THE END-->

- [Mojo](https://docs.modular.com/mojo)
- /[APIs](https://docs.modular.com/mojo/lib)
- /Decorators
- /@parameter

# @parameter

You can add the `@parameter` decorator on an `if` or `for` statement to run that code at compile time, or on a nested function to create a [parametric closure](parameter.html#parametric-closure).

## Parametric `if` statement[​](parameter.html#parametric-if-statement "Direct link to parametric-if-statement")

You can add `@parameter` to any `if` condition that's based on a valid parameter expression (it's an expression that evaluates at compile time). This ensures that only the live branch of the `if` statement is compiled into the program, which can reduce your final binary size. For example:

```mojo
@parameter
if True:
    print("this will be included in the binary")
else:
    print("this will be eliminated at compile time")
```

```mojo
@parameter
if True:
    print("this will be included in the binary")
else:
    print("this will be eliminated at compile time")
```

```output
this will be included in the binary
```

```output
this will be included in the binary
```

## Parametric `for` statement[​](parameter.html#parametric-for-statement "Direct link to parametric-for-statement")

You can add the `@parameter` decorator to a `for` loop to create a loop that's "unrolled" at compile time.

The loop sequence and induction values must be valid parameter expressions (that is, expressions that evaluate at compile time). For example, if you use `for i in range(LIMIT)`, the expression `range(LIMIT)` defines the loop sequence. This is a valid parameter expression if `LIMIT` is a parameter, alias, or integer literal.

The compiler "unrolls" the loop by replacing the `for` loop with `LIMIT` copies of the loop body with different constant `i` values.

You can use run-time expressions in the body of the loop (for example, in the following example, the `list`, `threshold`, and `count` variables are all run-time values).

```mojo
from collections import List
from random import rand

def main():
    alias LIST_SIZE = 128

    var list = List[Float64](length=LIST_SIZE, fill=0)
    rand(list.unsafe_ptr(), LIST_SIZE)

    var threshold = 0.6
    var count = 0

    @parameter
    for i in range(LIST_SIZE):
        if (list[i] > threshold):
            count += 1

    print(String("{} items over 0.6").format(count))
```

```mojo
from collections import List
from random import rand

def main():
    alias LIST_SIZE = 128

    var list = List[Float64](length=LIST_SIZE, fill=0)
    rand(list.unsafe_ptr(), LIST_SIZE)

    var threshold = 0.6
    var count = 0

    @parameter
    for i in range(LIST_SIZE):
        if (list[i] > threshold):
            count += 1

    print(String("{} items over 0.6").format(count))
```

The `@parameter for` construct unrolls at the beginning of compilation, which might explode the size of the program that still needs to be compiled, depending on the amount of code that's unrolled.

Currently, `@parameter for` requires the sequence's `__iter__` method to return a `_StridedRangeIterator`, meaning the induction variables must be `Int`. The intention is to lift this restriction in the future.

## Parametric closure[​](parameter.html#parametric-closure "Direct link to Parametric closure")

You can add `@parameter` on a nested function to create a “parametric” capturing closure. This means you can create a closure function that captures values from the outer scope (regardless of whether they are variables or parameters), and then use that closure as a parameter. For example:

```mojo
fn use_closure[func: fn(Int) capturing [_] -> Int](num: Int) -> Int:
    return func(num)

fn create_closure():
    var x = 1

    @parameter
    fn add(i: Int) -> Int:
        return x + i

    var y = use_closure[add](2)
    print(y)

create_closure()
```

```mojo
fn use_closure[func: fn(Int) capturing [_] -> Int](num: Int) -> Int:
    return func(num)

fn create_closure():
    var x = 1

    @parameter
    fn add(i: Int) -> Int:
        return x + i

    var y = use_closure[add](2)
    print(y)

create_closure()
```

```output
3
```

```output
3
```

Without the `@parameter` decorator, you'll get a compiler error that says you "cannot use a dynamic value in call parameter"—referring to the `use_closure[add](2)` call—because the `add()` closure would still be dynamic.

Note the `[_]` in the function type:

```mojo
fn use_closure[func: fn(Int) capturing [_] -> Int](num: Int) -> Int:
```

```mojo
fn use_closure[func: fn(Int) capturing [_] -> Int](num: Int) -> Int:
```

This origin specifier represents the set of origins for the values captured by the parametric closure. This allows the compiler to correctly extend the lifetimes of those values. For more information on lifetimes and origins, see [Lifetimes, origins and references](../values/lifetimes.html).



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fdecorators%2Fparameter)

Found 1 nodes matching selector 'article' --- End of file --- --- Processing file: C:\\Users\\drewg\\Downloads\\docs.modular.com\\mojo\\manual\\decorators\\decorators\_register-passable.html ---

- [Mojo](https://docs.modular.com/mojo)
- /[APIs](https://docs.modular.com/mojo/lib)
- /Decorators
- /@register\_passable

<!--THE END-->

- [Mojo](https://docs.modular.com/mojo)
- /[APIs](https://docs.modular.com/mojo/lib)
- /Decorators
- /@register\_passable

# @register\_passable

You can add the `@register_passable` decorator on a struct to tell Mojo that the type should be passed in machine registers (such as a CPU register; subject to the details of the underlying architecture). For tiny data types like an integer or floating-point number, this is much more efficient than storing values in stack memory. This means the type is always passed by value and cannot be passed by reference.

The basic `@register_passable` decorator does not change the fundamental behavior of a type: it still needs an `__init__()` and `__copyinit__()` method to be copyable (and it may have a `__del__()` method, if necessary). For example:

```mojo
@register_passable
struct Pair:
    var a: Int
    var b: Int

    fn __init__(out self, one: Int, two: Int):
        self.a = one
        self.b = two

    fn __copyinit__(out self, existing: Self):
        self.a = existing.a
        self.b = existing.b

fn test_pair():
    var x = Pair(5, 10)
    var y = x

    print(y.a, y.b)
    y.a = 10
    y.b = 20
    print(y.a, y.b)
```

```mojo
@register_passable
struct Pair:
    var a: Int
    var b: Int

    fn __init__(out self, one: Int, two: Int):
        self.a = one
        self.b = two

    fn __copyinit__(out self, existing: Self):
        self.a = existing.a
        self.b = existing.b

fn test_pair():
    var x = Pair(5, 10)
    var y = x

    print(y.a, y.b)
    y.a = 10
    y.b = 20
    print(y.a, y.b)
```

```mojo
test_pair()
```

```mojo
test_pair()
```

```output
5 10
10 20
```

```output
5 10
10 20
```

This behavior is what we expect from `Pair`, with or without the decorator.

You should be aware of a few other observable effects:

1. `@register_passable` types cannot hold instances of types that are not also `@register_passable`.
2. `@register_passable` types do not have a predictable identity, and so the `self` pointer is not stable/predictable (e.g. in hash tables).
3. `@register_passable` arguments and result are exposed to C and C++ directly, instead of being passed by-pointer.
4. `@register_passable` types cannot have a [`__moveinit__()` constructor](../lifecycle/life.html#move-constructor), because values passed in a register cannot be passed by reference.

## `@register_passable("trivial")`[​](register-passable.html#register_passabletrivial "Direct link to register_passabletrivial")

Most types that use `@register_passable` are just "bags of bits," which we call "trivial" types. These trivial types are simple and should be copied, moved, and destroyed without any custom constructors or a destructor. For these types, you can add the `"trivial"` argument, and Mojo synthesizes all the lifecycle methods as appropriate for a trivial register-passable type:

```mojo
@register_passable("trivial")
struct Pair:
    var a: Int
    var b: Int
```

```mojo
@register_passable("trivial")
struct Pair:
    var a: Int
    var b: Int
```

This is similar to the [`@value`](value.html) decorator, except when using `@register_passable("trivial")` the only lifecycle method you're allowed to define is the `__init__()` constructor (but you don't have to)—you *cannot* define any copy or move constructors or a destructor.

Examples of trivial types include:

- Arithmetic types such as `Int`, `Bool`, `Float64` etc.
- Pointers (the address value is trivial, not the data being pointed to).
- Arrays of other trivial types, including SIMD.

For more information about lifecycle methods (constructors and destructors) see the section about [Value lifecycle](../lifecycle/index.html).

TODO

This decorator is due for reconsideration. Lack of custom copy/move/destroy logic and "passability in a register" are orthogonal concerns and should be split. This former logic should be subsumed into a more general decorator, which is orthogonal to `@register_passable`.



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fdecorators%2Fregister-passable)

Found 1 nodes matching selector 'article' --- End of file --- --- Processing file: C:\\Users\\drewg\\Downloads\\docs.modular.com\\mojo\\manual\\decorators\\decorators\_staticmethod.html ---

- [Mojo](https://docs.modular.com/mojo)
- /[APIs](https://docs.modular.com/mojo/lib)
- /Decorators
- /@staticmethod

# @staticmethod

You can add the `@staticmethod` decorator on a struct method to declare a static method.

For example:

```mojo
from collections import List
from pathlib import Path

struct MyStruct:
    var data: List[UInt8]

    fn __init__(out self):
        self.data = List[UInt8]()

    fn __moveinit__(out self, owned existing: Self):
        self.data = existing.data ^

    @staticmethod
    fn load_from_file(file_path: Path) raises -> Self:
        var new_struct = MyStruct()
        new_struct.data = file_path.read_bytes()
        return new_struct ^
```

```mojo
from collections import List
from pathlib import Path

struct MyStruct:
    var data: List[UInt8]

    fn __init__(out self):
        self.data = List[UInt8]()

    fn __moveinit__(out self, owned existing: Self):
        self.data = existing.data ^

    @staticmethod
    fn load_from_file(file_path: Path) raises -> Self:
        var new_struct = MyStruct()
        new_struct.data = file_path.read_bytes()
        return new_struct ^
```

Unlike an instance method, a static method doesn't take an implicit `self` argument. It's not attached to a specific instance of a struct, so it can't access instance data.

For more information see the documentation on [static methods](../structs.html#static-methods).



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fdecorators%2Fstaticmethod)

Found 1 nodes matching selector 'article' --- End of file --- --- Processing file: C:\\Users\\drewg\\Downloads\\docs.modular.com\\mojo\\manual\\decorators\\decorators\_value.html ---

- [Mojo](https://docs.modular.com/mojo)
- /[APIs](https://docs.modular.com/mojo/lib)
- /Decorators
- /@value

# @value

You can add the `@value` decorator on a struct to generate boilerplate lifecycle methods, including the member-wise `__init__()` constructor, `__copyinit__()` copy constructor, and `__moveinit__()` move constructor.

For example, consider a simple struct like this:

```mojo
@value
struct MyPet:
    var name: String
    var age: Int
```

```mojo
@value
struct MyPet:
    var name: String
    var age: Int
```

Mojo sees the `@value` decorator and notices that you don't have any constructors and it synthesizes them for you, the result being as if you had actually written this:

```mojo
struct MyPet:
    var name: String
    var age: Int

    fn __init__(out self, owned name: String, age: Int):
        self.name = name^
        self.age = age

    fn __copyinit__(out self, existing: Self):
        self.name = existing.name
        self.age = existing.age

    fn __moveinit__(out self, owned existing: Self):
        self.name = existing.name^
        self.age = existing.age
```

```mojo
struct MyPet:
    var name: String
    var age: Int

    fn __init__(out self, owned name: String, age: Int):
        self.name = name^
        self.age = age

    fn __copyinit__(out self, existing: Self):
        self.name = existing.name
        self.age = existing.age

    fn __moveinit__(out self, owned existing: Self):
        self.name = existing.name^
        self.age = existing.age
```

Mojo synthesizes each lifecycle method only when it doesn't exist, so you can use `@value` and still define your own versions to override the default behavior. For example, it is fairly common to use the default member-wise and move constructor, but create a custom copy constructor.

For more information about these lifecycle methods, read [Life of a value](../lifecycle/life.html).



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fdecorators%2Fvalue)

Found 1 nodes matching selector 'article' --- End of file --- @always\_inline | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



- [Mojo](https://docs.modular.com/mojo)
- /[APIs](https://docs.modular.com/mojo/lib)
- /Decorators
- /@always\_inline

<!--THE END-->

- [Mojo](https://docs.modular.com/mojo)
- /[APIs](https://docs.modular.com/mojo/lib)
- /Decorators
- /@always\_inline

# @always\_inline

You can add the `@always_inline` decorator on any function to make the Mojo compiler "inline" the body of the function (copy it) directly into the body of the calling function.

This eliminates potential performance costs associated with function calls jumping to a new point in code. Normally, the compiler will do this automatically where it can improve performance, but this decorator forces it to do so. The downside is that it can increase the binary size by duplicating the function at every call site.

For example:

```mojo
@always_inline
fn add(a: Int, b: Int) -> Int:
    return a + b

print(add(1, 2))
```

```mojo
@always_inline
fn add(a: Int, b: Int) -> Int:
    return a + b

print(add(1, 2))
```

Because `add()` is decorated with `@always_inline`, Mojo compiles this program without adding the `add()` function to the call stack, and it instead performs the addition directly at the `print()` call site, as if it were written like this:

```mojo
print(1 + 2)
```

```mojo
print(1 + 2)
```

## `@always_inline("nodebug")`[​](always-inline.html#always_inlinenodebug "Direct link to always_inlinenodebug")

You can also use the decorator with the `"nodebug"` argument, which has the same effect to inline the function, but without debug information. This means that you can't step into the function when debugging.

This decorator is intended to be used on the lowest-level functions in a library, which may wrap primitive functions, MLIR operations, or inline assembly. Marking these functions as "nodebug" prevents users from accidentally stepping into low-level non-Mojo code when debugging.



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fdecorators%2Falways-inline)

- [`@always_inline("nodebug")`](always-inline.html#always_inlinenodebug)











@\_\_copy\_capture | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



- [Mojo](https://docs.modular.com/mojo)
- /[APIs](https://docs.modular.com/mojo/lib)
- /Decorators
- /@\_\_copy\_capture

# @\_\_copy\_capture

You can add the `__copy_capture` decorator on a parametric closure to capture register-passable values by copy. This decorator causes a nested function to copy the value of the indicated variable into the closure object at the point of formation instead of capturing that variable by reference. This allows the closure to be passed as an escaping function, without lifetime concerns.

```mojo
  fn foo(x: Int):
      var z = x

      @__copy_capture(z)
      @parameter
      fn formatter() -> Int:
          return z
      z = 2
      print(formatter())

  fn main():
      foo(5)
```

```mojo
  fn foo(x: Int):
      var z = x

      @__copy_capture(z)
      @parameter
      fn formatter() -> Int:
          return z
      z = 2
      print(formatter())

  fn main():
      foo(5)
```



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fdecorators%2Fcopy-capture)







@implicit | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



- [Mojo](https://docs.modular.com/mojo)
- /[APIs](https://docs.modular.com/mojo/lib)
- /Decorators
- /@implicit

# @implicit

You can add the `@implicit` decorator on any single-argument constructor to identify it as eligible for implicit conversion.

For example:

```mojo
struct MyInt:
    var value: Int

    @implicit
    fn __init__(out self, value: Int):
        self.value = value

    fn __init__(out self, value: Float64):
        self.value = Int(value)

```

```mojo
struct MyInt:
    var value: Int

    @implicit
    fn __init__(out self, value: Int):
        self.value = value

    fn __init__(out self, value: Float64):
        self.value = Int(value)

```

This implicit conversion constructor allows you to pass an `Int` to a function that takes a `MyInt` argument, or assign an `Int` to a variable of type `MyInt`. However, the constructor that takes a `Float64` value is **not** an implicit conversion constructor, so it must be invoked explicitly:

```mojo
fn func(n: MyInt):
    print("MyInt value: ", n.value)

fn main():
    func(Int(42))             # Implicit conversion from Int: OK
    func(MyInt(Float64(4.2))) # Explicit conversion from Float64: OK
    func(Float64(4.2))        # Error: can't convert Float64 to MyInt
```

```mojo
fn func(n: MyInt):
    print("MyInt value: ", n.value)

fn main():
    func(Int(42))             # Implicit conversion from Int: OK
    func(MyInt(Float64(4.2))) # Explicit conversion from Float64: OK
    func(Float64(4.2))        # Error: can't convert Float64 to MyInt
```



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fdecorators%2Fimplicit)







Mojo decorators | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



- [Mojo](https://docs.modular.com/mojo)
- /[APIs](https://docs.modular.com/mojo/lib)
- /Decorators
- /Decorators

# Mojo decorators

A Mojo decorator is a [higher-order function](https://en.wikipedia.org/wiki/Higher-order_function) that modifies or extends the behavior of a struct, a function, or some other code. Instead of actually calling the higher-order function, you simply add the decorator (such as the `@value` decorator) above your code (such as a struct). The Mojo compiler then uses the decorator function to modify your code at compile time.

No custom decorators

The creation of custom decorators is not yet supported. The available ones are built directly into the compiler.

The following pages describe each built-in decorator with examples.

[`@always_inline`
\
Copies the body of a function directly into the body of the calling function.](always-inline.html)

[`@__copy_capture`
\
Captures register-passable typed values by copy.](copy-capture.html)

[`@implicit`
\
Marks a constructor as eligible for implicit conversion.](implicit.html)

[`@nonmaterializable`
\
Declares that a type should exist only in the parameter domain.](nonmaterializable.html)

[`@parameter`
\
Executes a function or if statement at compile time.](parameter.html)

[`@register_passable`
\
Declares that a type should be passed in machine registers.](register-passable.html)

[`@staticmethod`
\
Declares a struct method as static.](staticmethod.html)

[`@value`
\
Generates boilerplate lifecycle methods for a struct.](value.html)



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fdecorators%2F)







@nonmaterializable | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



- [Mojo](https://docs.modular.com/mojo)
- /[APIs](https://docs.modular.com/mojo/lib)
- /Decorators
- /@nonmaterializable

# @nonmaterializable

You can add the `@nonmaterializable` decorator on a struct to declare that the type can exist only in the parameter domain (it can be used for metaprogramming only, and not as a runtime type). And, if an instance of this type does transition into the runtime domain, this decorator declares what type it becomes there.

To use it, declare your type with `@nonmaterializable(TargetType)`, where `TargetType` is the type that the object should convert to if it becomes a runtime value (you must declare the `TargetType`). For example, if a struct is marked as `@nonmaterializable(Foo)`, then anywhere that it goes from a parameter value to a runtime value, it automatically converts into the `Foo` type.

For example, the following `NmStruct` type can be used in the parameter domain, but the `converted_to_has_bool` instance of it is converted to `HasBool` when it's materialized as a runtime value:

```mojo
@value
@register_passable("trivial")
struct HasBool:
    var x: Bool

    fn __init__(out self, x: Bool):
        self.x = x

    @always_inline("nodebug")
    fn __init__(out self, nms: NmStruct):
        self.x = True if (nms.x == 77) else False

@value
@nonmaterializable(HasBool)
@register_passable("trivial")
struct NmStruct:
    var x: Int

    @always_inline("nodebug")
    fn __add__(self, rhs: Self) -> Self:
        return NmStruct(self.x + rhs.x)

alias still_nm_struct = NmStruct(1) + NmStruct(2)
# When materializing to a run-time variable, it is automatically converted,
# even without a type annotation.
var converted_to_has_bool = still_nm_struct
```

```mojo
@value
@register_passable("trivial")
struct HasBool:
    var x: Bool

    fn __init__(out self, x: Bool):
        self.x = x

    @always_inline("nodebug")
    fn __init__(out self, nms: NmStruct):
        self.x = True if (nms.x == 77) else False

@value
@nonmaterializable(HasBool)
@register_passable("trivial")
struct NmStruct:
    var x: Int

    @always_inline("nodebug")
    fn __add__(self, rhs: Self) -> Self:
        return NmStruct(self.x + rhs.x)

alias still_nm_struct = NmStruct(1) + NmStruct(2)
# When materializing to a run-time variable, it is automatically converted,
# even without a type annotation.
var converted_to_has_bool = still_nm_struct
```

A non-materializable struct must have all of its methods annotated as `@always_inline`, and it must be computable in the parameter domain.



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fdecorators%2Fnonmaterializable)







@parameter | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



- [Mojo](https://docs.modular.com/mojo)
- /[APIs](https://docs.modular.com/mojo/lib)
- /Decorators
- /@parameter

<!--THE END-->

- [Mojo](https://docs.modular.com/mojo)
- /[APIs](https://docs.modular.com/mojo/lib)
- /Decorators
- /@parameter

# @parameter

You can add the `@parameter` decorator on an `if` or `for` statement to run that code at compile time, or on a nested function to create a [parametric closure](parameter.html#parametric-closure).

## Parametric `if` statement[​](parameter.html#parametric-if-statement "Direct link to parametric-if-statement")

You can add `@parameter` to any `if` condition that's based on a valid parameter expression (it's an expression that evaluates at compile time). This ensures that only the live branch of the `if` statement is compiled into the program, which can reduce your final binary size. For example:

```mojo
@parameter
if True:
    print("this will be included in the binary")
else:
    print("this will be eliminated at compile time")
```

```mojo
@parameter
if True:
    print("this will be included in the binary")
else:
    print("this will be eliminated at compile time")
```

```output
this will be included in the binary
```

```output
this will be included in the binary
```

## Parametric `for` statement[​](parameter.html#parametric-for-statement "Direct link to parametric-for-statement")

You can add the `@parameter` decorator to a `for` loop to create a loop that's "unrolled" at compile time.

The loop sequence and induction values must be valid parameter expressions (that is, expressions that evaluate at compile time). For example, if you use `for i in range(LIMIT)`, the expression `range(LIMIT)` defines the loop sequence. This is a valid parameter expression if `LIMIT` is a parameter, alias, or integer literal.

The compiler "unrolls" the loop by replacing the `for` loop with `LIMIT` copies of the loop body with different constant `i` values.

You can use run-time expressions in the body of the loop (for example, in the following example, the `list`, `threshold`, and `count` variables are all run-time values).

```mojo
from collections import List
from random import rand

def main():
    alias LIST_SIZE = 128

    var list = List[Float64](length=LIST_SIZE, fill=0)
    rand(list.unsafe_ptr(), LIST_SIZE)

    var threshold = 0.6
    var count = 0

    @parameter
    for i in range(LIST_SIZE):
        if (list[i] > threshold):
            count += 1

    print(String("{} items over 0.6").format(count))
```

```mojo
from collections import List
from random import rand

def main():
    alias LIST_SIZE = 128

    var list = List[Float64](length=LIST_SIZE, fill=0)
    rand(list.unsafe_ptr(), LIST_SIZE)

    var threshold = 0.6
    var count = 0

    @parameter
    for i in range(LIST_SIZE):
        if (list[i] > threshold):
            count += 1

    print(String("{} items over 0.6").format(count))
```

The `@parameter for` construct unrolls at the beginning of compilation, which might explode the size of the program that still needs to be compiled, depending on the amount of code that's unrolled.

Currently, `@parameter for` requires the sequence's `__iter__` method to return a `_StridedRangeIterator`, meaning the induction variables must be `Int`. The intention is to lift this restriction in the future.

## Parametric closure[​](parameter.html#parametric-closure "Direct link to Parametric closure")

You can add `@parameter` on a nested function to create a “parametric” capturing closure. This means you can create a closure function that captures values from the outer scope (regardless of whether they are variables or parameters), and then use that closure as a parameter. For example:

```mojo
fn use_closure[func: fn(Int) capturing [_] -> Int](num: Int) -> Int:
    return func(num)

fn create_closure():
    var x = 1

    @parameter
    fn add(i: Int) -> Int:
        return x + i

    var y = use_closure[add](2)
    print(y)

create_closure()
```

```mojo
fn use_closure[func: fn(Int) capturing [_] -> Int](num: Int) -> Int:
    return func(num)

fn create_closure():
    var x = 1

    @parameter
    fn add(i: Int) -> Int:
        return x + i

    var y = use_closure[add](2)
    print(y)

create_closure()
```

```output
3
```

```output
3
```

Without the `@parameter` decorator, you'll get a compiler error that says you "cannot use a dynamic value in call parameter"—referring to the `use_closure[add](2)` call—because the `add()` closure would still be dynamic.

Note the `[_]` in the function type:

```mojo
fn use_closure[func: fn(Int) capturing [_] -> Int](num: Int) -> Int:
```

```mojo
fn use_closure[func: fn(Int) capturing [_] -> Int](num: Int) -> Int:
```

This origin specifier represents the set of origins for the values captured by the parametric closure. This allows the compiler to correctly extend the lifetimes of those values. For more information on lifetimes and origins, see [Lifetimes, origins and references](../values/lifetimes.html).



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fdecorators%2Fparameter)

- [Parametric `if` statement](parameter.html#parametric-if-statement)
- [Parametric `for` statement](parameter.html#parametric-for-statement)
- [Parametric closure](parameter.html#parametric-closure)











@register\_passable | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



- [Mojo](https://docs.modular.com/mojo)
- /[APIs](https://docs.modular.com/mojo/lib)
- /Decorators
- /@register\_passable

<!--THE END-->

- [Mojo](https://docs.modular.com/mojo)
- /[APIs](https://docs.modular.com/mojo/lib)
- /Decorators
- /@register\_passable

# @register\_passable

You can add the `@register_passable` decorator on a struct to tell Mojo that the type should be passed in machine registers (such as a CPU register; subject to the details of the underlying architecture). For tiny data types like an integer or floating-point number, this is much more efficient than storing values in stack memory. This means the type is always passed by value and cannot be passed by reference.

The basic `@register_passable` decorator does not change the fundamental behavior of a type: it still needs an `__init__()` and `__copyinit__()` method to be copyable (and it may have a `__del__()` method, if necessary). For example:

```mojo
@register_passable
struct Pair:
    var a: Int
    var b: Int

    fn __init__(out self, one: Int, two: Int):
        self.a = one
        self.b = two

    fn __copyinit__(out self, existing: Self):
        self.a = existing.a
        self.b = existing.b

fn test_pair():
    var x = Pair(5, 10)
    var y = x

    print(y.a, y.b)
    y.a = 10
    y.b = 20
    print(y.a, y.b)
```

```mojo
@register_passable
struct Pair:
    var a: Int
    var b: Int

    fn __init__(out self, one: Int, two: Int):
        self.a = one
        self.b = two

    fn __copyinit__(out self, existing: Self):
        self.a = existing.a
        self.b = existing.b

fn test_pair():
    var x = Pair(5, 10)
    var y = x

    print(y.a, y.b)
    y.a = 10
    y.b = 20
    print(y.a, y.b)
```

```mojo
test_pair()
```

```mojo
test_pair()
```

```output
5 10
10 20
```

```output
5 10
10 20
```

This behavior is what we expect from `Pair`, with or without the decorator.

You should be aware of a few other observable effects:

1. `@register_passable` types cannot hold instances of types that are not also `@register_passable`.
2. `@register_passable` types do not have a predictable identity, and so the `self` pointer is not stable/predictable (e.g. in hash tables).
3. `@register_passable` arguments and result are exposed to C and C++ directly, instead of being passed by-pointer.
4. `@register_passable` types cannot have a [`__moveinit__()` constructor](../lifecycle/life.html#move-constructor), because values passed in a register cannot be passed by reference.

## `@register_passable("trivial")`[​](register-passable.html#register_passabletrivial "Direct link to register_passabletrivial")

Most types that use `@register_passable` are just "bags of bits," which we call "trivial" types. These trivial types are simple and should be copied, moved, and destroyed without any custom constructors or a destructor. For these types, you can add the `"trivial"` argument, and Mojo synthesizes all the lifecycle methods as appropriate for a trivial register-passable type:

```mojo
@register_passable("trivial")
struct Pair:
    var a: Int
    var b: Int
```

```mojo
@register_passable("trivial")
struct Pair:
    var a: Int
    var b: Int
```

This is similar to the [`@value`](value.html) decorator, except when using `@register_passable("trivial")` the only lifecycle method you're allowed to define is the `__init__()` constructor (but you don't have to)—you *cannot* define any copy or move constructors or a destructor.

Examples of trivial types include:

- Arithmetic types such as `Int`, `Bool`, `Float64` etc.
- Pointers (the address value is trivial, not the data being pointed to).
- Arrays of other trivial types, including SIMD.

For more information about lifecycle methods (constructors and destructors) see the section about [Value lifecycle](../lifecycle/index.html).

TODO

This decorator is due for reconsideration. Lack of custom copy/move/destroy logic and "passability in a register" are orthogonal concerns and should be split. This former logic should be subsumed into a more general decorator, which is orthogonal to `@register_passable`.



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fdecorators%2Fregister-passable)

- [`@register_passable("trivial")`](register-passable.html#register_passabletrivial)











@staticmethod | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



- [Mojo](https://docs.modular.com/mojo)
- /[APIs](https://docs.modular.com/mojo/lib)
- /Decorators
- /@staticmethod

# @staticmethod

You can add the `@staticmethod` decorator on a struct method to declare a static method.

For example:

```mojo
from collections import List
from pathlib import Path

struct MyStruct:
    var data: List[UInt8]

    fn __init__(out self):
        self.data = List[UInt8]()

    fn __moveinit__(out self, owned existing: Self):
        self.data = existing.data ^

    @staticmethod
    fn load_from_file(file_path: Path) raises -> Self:
        var new_struct = MyStruct()
        new_struct.data = file_path.read_bytes()
        return new_struct ^
```

```mojo
from collections import List
from pathlib import Path

struct MyStruct:
    var data: List[UInt8]

    fn __init__(out self):
        self.data = List[UInt8]()

    fn __moveinit__(out self, owned existing: Self):
        self.data = existing.data ^

    @staticmethod
    fn load_from_file(file_path: Path) raises -> Self:
        var new_struct = MyStruct()
        new_struct.data = file_path.read_bytes()
        return new_struct ^
```

Unlike an instance method, a static method doesn't take an implicit `self` argument. It's not attached to a specific instance of a struct, so it can't access instance data.

For more information see the documentation on [static methods](../structs.html#static-methods).



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fdecorators%2Fstaticmethod)







@value | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



- [Mojo](https://docs.modular.com/mojo)
- /[APIs](https://docs.modular.com/mojo/lib)
- /Decorators
- /@value

# @value

You can add the `@value` decorator on a struct to generate boilerplate lifecycle methods, including the member-wise `__init__()` constructor, `__copyinit__()` copy constructor, and `__moveinit__()` move constructor.

For example, consider a simple struct like this:

```mojo
@value
struct MyPet:
    var name: String
    var age: Int
```

```mojo
@value
struct MyPet:
    var name: String
    var age: Int
```

Mojo sees the `@value` decorator and notices that you don't have any constructors and it synthesizes them for you, the result being as if you had actually written this:

```mojo
struct MyPet:
    var name: String
    var age: Int

    fn __init__(out self, owned name: String, age: Int):
        self.name = name^
        self.age = age

    fn __copyinit__(out self, existing: Self):
        self.name = existing.name
        self.age = existing.age

    fn __moveinit__(out self, owned existing: Self):
        self.name = existing.name^
        self.age = existing.age
```

```mojo
struct MyPet:
    var name: String
    var age: Int

    fn __init__(out self, owned name: String, age: Int):
        self.name = name^
        self.age = age

    fn __copyinit__(out self, existing: Self):
        self.name = existing.name
        self.age = existing.age

    fn __moveinit__(out self, owned existing: Self):
        self.name = existing.name^
        self.age = existing.age
```

Mojo synthesizes each lifecycle method only when it doesn't exist, so you can use `@value` and still define your own versions to override the default behavior. For example, it is fairly common to use the default member-wise and move constructor, but create a custom copy constructor.

For more information about these lifecycle methods, read [Life of a value](../lifecycle/life.html).



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fdecorators%2Fvalue)






![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



- [Mojo](https://docs.modular.com/mojo)
- /[Manual](../index.html)
- /GPU programming
- /GPU basics

<!--THE END-->

- [Mojo](https://docs.modular.com/mojo)
- /[Manual](../index.html)
- /GPU programming
- /GPU basics

# GPU basics

If you have any questions or feedback for this content, please post it in the [Modular forum thread here](https://forum.modular.com/t/gpu-programming-manual/755).

This documentation aims to build your GPU programming knowledge from the ground up, starting with the lowest levels of the stack before progressing to higher-level functionality. It’s designed for a diverse audience, from experienced GPU developers to programmers new to GPU coding. Mojo allows you to program NVIDIA GPUs, with direct access to low-level GPU primitives, while sharing types and functions that can also run on CPUs where applicable. If you're experienced with [NVIDIA Compute Unified Device Architecture](https://developer.nvidia.com/cuda-toolkit) (CUDA), what you'll learn here will enable you to expand your reach as we release support for more hardware.

## Introduction to massively parallel programming[​](basics.html#introduction-to-massively-parallel-programming "Direct link to Introduction to massively parallel programming")

We can no longer rely on new generations of CPUs to increase application performance through improved clock speeds. Power demands and heat dissipation limits have stalled that trend, pushing the hardware industry toward increasing the number of physical cores. Modern consumer CPUs now boast 16 cores or more, capable of running in parallel, which forces programmers to rethink how they maximize performance. This shift is especially evident in AI applications, where performance scales remarkably well with additional cores.

NVIDIA’s breakthrough came with CUDA, a general programming model that allows developers to target both server and consumer GPUs for any application domain. This vision sparked an AI revolution when Alex Krizhevsky, Ilya Sutskever, and Geoffrey Hinton trained AlexNet on consumer GPUs, significantly outperforming traditional computer vision methods. GPUs pack thousands of cores, the NVIDIA H100 can run 16,896 threads in parallel in a single clock cycle, with over 270,000 threads queued and ready to go. They're also engineered in a way where the cost of scheduling threads is much lower compared to a traditional CPU.

Harnessing this hardware requires a new programming mindset. Mojo represents a chance to rethink GPU programming and make it more approachable. C/C++ is at the core of GPU programming, but we’ve seen leaps in ergonomics and memory safety from systems programming languages in recent years. Mojo expands on Python’s familiar syntax, adds direct access to low-level CPU and GPU intrinsics for systems programming, and introduces ergonomic and safety improvements from modern languages. This course aims to empower programmers with minimal specialized knowledge to build high-performance, GPU-enabled applications. By lowering the barrier to entry, we aim to fuel more breakthroughs and accelerate innovation.

## Setup[​](basics.html#setup "Direct link to Setup")

All of these notebook cells are runnable through a VS Code extension. You can install [Markdown Lab](https://marketplace.visualstudio.com/items?itemName=jackos.mdlab), then clone the repo that contains the markdown that generated this website:

```sh
git clone git@github.com:modular/max
cd max/mojo/docs/manual/gpu
```

```sh
git clone git@github.com:modular/max
cd max/mojo/docs/manual/gpu
```

And open `basics.md` to run the code cells interactively.

If you prefer the traditional approach, create a file such as `main.mojo` and put everything except the imports into a `def main`:

```mojo
from gpu import thread_idx
from gpu.host import DeviceContext

def main():
    fn printing_kernel():
        print("GPU thread: [", thread_idx.x, thread_idx.y, thread_idx.z, "]")

    var ctx = DeviceContext()

    ctx.enqueue_function[printing_kernel](grid_dim=1, block_dim=4)
    ctx.synchronize()
```

```mojo
from gpu import thread_idx
from gpu.host import DeviceContext

def main():
    fn printing_kernel():
        print("GPU thread: [", thread_idx.x, thread_idx.y, thread_idx.z, "]")

    var ctx = DeviceContext()

    ctx.enqueue_function[printing_kernel](grid_dim=1, block_dim=4)
    ctx.synchronize()
```

```text
GPU thread: [ 0 0 0 ]
GPU thread: [ 1 0 0 ]
GPU thread: [ 2 0 0 ]
GPU thread: [ 3 0 0 ]
```

```text
GPU thread: [ 0 0 0 ]
GPU thread: [ 1 0 0 ]
GPU thread: [ 2 0 0 ]
GPU thread: [ 3 0 0 ]
```

Then run the file, if you haven't setup Mojo yet, check out the [Getting Started](https://docs.modular.com/magic/) guide.

## Imports[​](basics.html#imports "Direct link to Imports")

These are all the imports required to run the examples, put this at the top of your file if you're running from `mojo main.mojo`:

```mojo
from gpu import thread_idx, block_idx, warp, barrier
from gpu.host import DeviceContext, DeviceBuffer, HostBuffer
from gpu.memory import AddressSpace
from memory import stack_allocation
from layout import Layout, LayoutTensor
from math import iota
from sys import sizeof
```

```mojo
from gpu import thread_idx, block_idx, warp, barrier
from gpu.host import DeviceContext, DeviceBuffer, HostBuffer
from gpu.memory import AddressSpace
from memory import stack_allocation
from layout import Layout, LayoutTensor
from math import iota
from sys import sizeof
```

## Your first kernel[​](basics.html#your-first-kernel "Direct link to Your first kernel")

In the context of GPU programming, a kernel is a program that runs on each thread that you launch:

```mojo
fn printing_kernel():
    print("GPU thread: [", thread_idx.x, thread_idx.y, thread_idx.z, "]")
```

```mojo
fn printing_kernel():
    print("GPU thread: [", thread_idx.x, thread_idx.y, thread_idx.z, "]")
```

The term `kernel` in this context originated in the 1980s with the introduction of the [Single Program, Multiple Data](https://en.wikipedia.org/wiki/Single_program,_multiple_data) (SPMD) parallel programming technique, which underpins ROCm and CUDA. In this approach, a kernel executes concurrently across distinct elements of large data structures.

We can pass this function as a parameter to `enqueue_function()` to compile it for your attached GPU and launch it. First we need to get the [`DeviceContext`](https://docs.modular.com/mojo/stdlib/gpu/host/device_context/DeviceContext) for your GPU:

```mojo
var ctx = DeviceContext()
```

```mojo
var ctx = DeviceContext()
```

Now we have the `DeviceContext` we can compile and launch the kernel:

```mojo
ctx.enqueue_function[printing_kernel](grid_dim=1, block_dim=4)

# Wait for the kernel to finish executing before handing back to CPU
ctx.synchronize()
```

```mojo
ctx.enqueue_function[printing_kernel](grid_dim=1, block_dim=4)

# Wait for the kernel to finish executing before handing back to CPU
ctx.synchronize()
```

```text
GPU thread: [ 0 0 0 ]
GPU thread: [ 1 0 0 ]
GPU thread: [ 2 0 0 ]
GPU thread: [ 3 0 0 ]
```

```text
GPU thread: [ 0 0 0 ]
GPU thread: [ 1 0 0 ]
GPU thread: [ 2 0 0 ]
GPU thread: [ 3 0 0 ]
```

## Threads[​](basics.html#threads "Direct link to Threads")

Because we passed `block_dim=4`, we launched 4 threads on the x dimension, the kernel code we wrote is executed on each thread. The printing can be out of order depending on which thread reaches that `print()` call first.

Now add the y and z dimensions with `block_dim=(2, 2, 2)`:

For the `grid_dim` and `block_dim` arguments you can use a single value or a tuple. A single value will launch N blocks/threads on the x dimension, while using a tuple with up to three values will determine the (x, y, z) dimensions.

```mojo
ctx.enqueue_function[printing_kernel](grid_dim=1, block_dim=(2, 2, 2))
ctx.synchronize()
```

```mojo
ctx.enqueue_function[printing_kernel](grid_dim=1, block_dim=(2, 2, 2))
ctx.synchronize()
```

```text
GPU thread: [ 0 0 0 ]
GPU thread: [ 1 0 0 ]
GPU thread: [ 0 1 0 ]
GPU thread: [ 1 1 0 ]
GPU thread: [ 0 0 1 ]
GPU thread: [ 1 0 1 ]
GPU thread: [ 0 1 1 ]
GPU thread: [ 1 1 1 ]
```

```text
GPU thread: [ 0 0 0 ]
GPU thread: [ 1 0 0 ]
GPU thread: [ 0 1 0 ]
GPU thread: [ 1 1 0 ]
GPU thread: [ 0 0 1 ]
GPU thread: [ 1 0 1 ]
GPU thread: [ 0 1 1 ]
GPU thread: [ 1 1 1 ]
```

We're now launching 8 (2x2x2) threads in total.

## Host vs device and enqueue[​](basics.html#host-vs-device-and-enqueue "Direct link to Host vs device and enqueue")

You'll see the word host which refers to the CPU that schedules work for the device, device refers to the accelerator which in this case is a GPU.

When you encounter the term `enqueue` in a method or function call, it means that the host is scheduling the operation to execute asynchronously on the device. If your host-side code relies on the outcome of these device-enqueued operations, you need to call `ctx.synchronize()`. For instance, printing from the CPU without first synchronizing might result in out-of-order output:

```mojo
ctx.enqueue_function[printing_kernel](grid_dim=1, block_dim=4)
print("This might print before the GPU has completed its work")
```

```mojo
ctx.enqueue_function[printing_kernel](grid_dim=1, block_dim=4)
print("This might print before the GPU has completed its work")
```

```text
This might print before the GPU has completed its work
GPU thread: [ 0 0 0 ]
GPU thread: [ 1 0 0 ]
GPU thread: [ 2 0 0 ]
GPU thread: [ 3 0 0 ]
```

```text
This might print before the GPU has completed its work
GPU thread: [ 0 0 0 ]
GPU thread: [ 1 0 0 ]
GPU thread: [ 2 0 0 ]
GPU thread: [ 3 0 0 ]
```

In the above example we failed to call `synchronize()` before printing on the host, the device could be slightly slower to finish its work, so you might see that output after the host output. Let's add a `synchronize()` call:

```mojo
ctx.enqueue_function[printing_kernel](grid_dim=1, block_dim=4)
ctx.synchronize()
print("This will print after the GPU has completed its work")
```

```mojo
ctx.enqueue_function[printing_kernel](grid_dim=1, block_dim=4)
ctx.synchronize()
print("This will print after the GPU has completed its work")
```

```text
GPU thread: [ 0 0 0 ]
GPU thread: [ 1 0 0 ]
GPU thread: [ 2 0 0 ]
GPU thread: [ 3 0 0 ]
This will print after the GPU has completed its work
```

```text
GPU thread: [ 0 0 0 ]
GPU thread: [ 1 0 0 ]
GPU thread: [ 2 0 0 ]
GPU thread: [ 3 0 0 ]
This will print after the GPU has completed its work
```

Any method or function you `enqueue` to run on the device, will run in the order that you enqueued them. It's only when you're doing something from the host which is dependent on the results of enqueued calls that you have to synchronize. More on this later when we introduce device buffers.

In GPU programming with Mojo, when there's a tradeoff between GPU performance and safety or ergonomics, performance takes priority, aligning with the expectations of kernel engineers. For instance, while we could eliminate the `enqueue` prefix from method calls and force synchronization for each of them, this would come at a performance cost. Take note to remember anything from these warning text blocks for potential safety violations:

Synchronization

For any methods or functions prefixed with `enqueue`, you must synchronize before running CPU code that is dependent on what you're enqueuing. Enqueueing multiple method or function calls for a single GPU is safe, as they are scheduled to run in the order you call them.

Mojo enhances the safety and ergonomics of C++ GPU programming where it doesn't sacrifice performance. For example, ASAP destruction automatically frees buffer memory on last use of the object, eliminating memory leaks and ensuring memory is released as early as possible. This is an evolution on modern memory management solutions such as C++ RAII, which is scope based and may hold onto memory for longer than expected, which is a precious resource in AI applications.

## Blocks[​](basics.html#blocks "Direct link to Blocks")

This kernel demonstrates how blocks work:

```mojo
fn block_kernel():
    print(
        "block: [",
        block_idx.x,
        block_idx.y,
        block_idx.z,
        "]",
        "thread: [",
        thread_idx.x,
        thread_idx.y,
        thread_idx.z,
        "]"
    )

ctx.enqueue_function[block_kernel](grid_dim=(2, 2), block_dim=2)
ctx.synchronize()
```

```mojo
fn block_kernel():
    print(
        "block: [",
        block_idx.x,
        block_idx.y,
        block_idx.z,
        "]",
        "thread: [",
        thread_idx.x,
        thread_idx.y,
        thread_idx.z,
        "]"
    )

ctx.enqueue_function[block_kernel](grid_dim=(2, 2), block_dim=2)
ctx.synchronize()
```

```text
block: [ 1 1 0 ] thread: [ 0 0 0 ]
block: [ 1 1 0 ] thread: [ 1 0 0 ]
block: [ 0 0 0 ] thread: [ 0 0 0 ]
block: [ 0 0 0 ] thread: [ 1 0 0 ]
block: [ 1 0 0 ] thread: [ 0 0 0 ]
block: [ 1 0 0 ] thread: [ 1 0 0 ]
block: [ 0 1 0 ] thread: [ 0 0 0 ]
block: [ 0 1 0 ] thread: [ 1 0 0 ]
```

```text
block: [ 1 1 0 ] thread: [ 0 0 0 ]
block: [ 1 1 0 ] thread: [ 1 0 0 ]
block: [ 0 0 0 ] thread: [ 0 0 0 ]
block: [ 0 0 0 ] thread: [ 1 0 0 ]
block: [ 1 0 0 ] thread: [ 0 0 0 ]
block: [ 1 0 0 ] thread: [ 1 0 0 ]
block: [ 0 1 0 ] thread: [ 0 0 0 ]
block: [ 0 1 0 ] thread: [ 1 0 0 ]
```

We're still launching 8 (2x2x2) threads, where there are 4 blocks, each with 2 threads. In GPU programming this grouping of blocks and threads is important, each block can have its own fast SRAM (Static Random Access Memory) which allows threads to communicate. The threads within a block can also communicate through registers, we'll cover this concept when we get to warps. For now the important information to internalize is:

- `grid_dim` defines how many blocks are launched.
- `block_dim` defines how many threads are launched in each block.

## Tiles[​](basics.html#tiles "Direct link to Tiles")

The x, y, z dimensions of blocks are important for splitting up large jobs into tiles, so each thread can work on its own subset of the problem. Below is a visualization for how a contiguous array of data can be split up into tiles, if we have an array of UInt32 (Unsigned Integer 32bit) data like:

```plaintext
[ 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 ]
```

```plaintext
[ 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 ]
```

We could split work up between threads and blocks, we're only going to use the x dimension for threads and blocks to get started:

```plaintext
Thread  |    0  1  2  3
-------------------------
block 0 | [  0  1  2  3 ]
block 1 | [  4  5  6  7 ]
block 2 | [  8  9 10 11 ]
block 3 | [ 12 13 14 15 ]
```

```plaintext
Thread  |    0  1  2  3
-------------------------
block 0 | [  0  1  2  3 ]
block 1 | [  4  5  6  7 ]
block 2 | [  8  9 10 11 ]
block 3 | [ 12 13 14 15 ]
```

If you had a much larger data array you could further split it up in into tiles, e.g. tile with widths \[2, 2] at index (0, 0) would be:

```plaintext
[ 0 1 ]
[ 4 5 ]
```

```plaintext
[ 0 1 ]
[ 4 5 ]
```

And index (2, 0) would be:

```plaintext
[ 2 3 ]
[ 6 7 ]
```

```plaintext
[ 2 3 ]
[ 6 7 ]
```

This is where you'd introduce the y dimension. For now we're going to focus on how blocks and threads interact, splitting up an array into 1 row per block, and 1 value per thread.

## Host buffer[​](basics.html#host-buffer "Direct link to Host buffer")

First we'll initialize a contiguous array on CPU and fill in its values:

```mojo
alias dtype = DType.uint32
alias blocks = 4
alias threads = 4
# One value per thread
alias elements_in = blocks * threads

# Allocate data on the host and return a buffer which owns that data
var host_in_buffer = ctx.enqueue_create_host_buffer[dtype](elements_in)

# Ensure the host buffer has finished being created
ctx.synchronize()

# Fill in the buffer with values from 0 to 15 and print it
iota(host_in_buffer.unsafe_ptr(), elements_in)
print(host_in_buffer)
```

```mojo
alias dtype = DType.uint32
alias blocks = 4
alias threads = 4
# One value per thread
alias elements_in = blocks * threads

# Allocate data on the host and return a buffer which owns that data
var host_in_buffer = ctx.enqueue_create_host_buffer[dtype](elements_in)

# Ensure the host buffer has finished being created
ctx.synchronize()

# Fill in the buffer with values from 0 to 15 and print it
iota(host_in_buffer.unsafe_ptr(), elements_in)
print(host_in_buffer)
```

```text
HostBuffer([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
```

```text
HostBuffer([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
```

## Device buffer[​](basics.html#device-buffer "Direct link to Device buffer")

We now have a host buffer that we can copy to the GPU:

```mojo
# Allocate a buffer for the GPU
var device_in_buffer = ctx.enqueue_create_buffer[dtype](elements_in)

# Copy the data from the CPU to the GPU buffer
host_in_buffer.enqueue_copy_to(device_in_buffer)
```

```mojo
# Allocate a buffer for the GPU
var device_in_buffer = ctx.enqueue_create_buffer[dtype](elements_in)

# Copy the data from the CPU to the GPU buffer
host_in_buffer.enqueue_copy_to(device_in_buffer)
```

Creating the GPU buffer is allocating *global memory* which can be accessed from any block and thread, this memory is relatively slow compared to *shared memory* which is shared between all of the threads in a block, more on that later.

## Enqueue scheduling[​](basics.html#enqueue-scheduling "Direct link to Enqueue scheduling")

As previously stated, when you enqueue multiple method or function calls to run on a device they will be scheduled to run in the order that you enqueue them:

```mojo
alias size = 4
alias dtype_u8 = DType.uint8

fn dummy_kernel(buffer: UnsafePointer[Scalar[dtype_u8]]):
    buffer[thread_idx.x] = thread_idx.x

# All of these method calls run in the order that they were enqueued
var host_buffer = ctx.enqueue_create_host_buffer[dtype_u8](size)
var dev_buffer = ctx.enqueue_create_buffer[dtype_u8](size)
ctx.enqueue_function[dummy_kernel](dev_buffer, grid_dim=1, block_dim=size)
dev_buffer.enqueue_copy_to(host_buffer)

# Have to synchronize here before printing on CPU, or else the kernel may
# not have finished executing.
ctx.synchronize()
print(host_buffer)
```

```mojo
alias size = 4
alias dtype_u8 = DType.uint8

fn dummy_kernel(buffer: UnsafePointer[Scalar[dtype_u8]]):
    buffer[thread_idx.x] = thread_idx.x

# All of these method calls run in the order that they were enqueued
var host_buffer = ctx.enqueue_create_host_buffer[dtype_u8](size)
var dev_buffer = ctx.enqueue_create_buffer[dtype_u8](size)
ctx.enqueue_function[dummy_kernel](dev_buffer, grid_dim=1, block_dim=size)
dev_buffer.enqueue_copy_to(host_buffer)

# Have to synchronize here before printing on CPU, or else the kernel may
# not have finished executing.
ctx.synchronize()
print(host_buffer)
```

```text
HostBuffer([0, 1, 2, 3])
```

```text
HostBuffer([0, 1, 2, 3])
```

You can schedule multiple independent kernels to run at the same time using streams, which is a concept we'll introduce later.

## Tensor indexing from threads[​](basics.html#tensor-indexing-from-threads "Direct link to Tensor indexing from threads")

Now that we have the data set up, we can wrap the data in a `LayoutTensor` so that we can reason about how to index into the array, allowing each thread to get its corresponding value:

```mojo
# Row major: elements are stored sequentially in memory [0, 1, 2, 3, 4, 5, ...]
# Column major: used in some GPU optimizations, stored as [0, 4, 8, 12, 1, ...]
alias layout = Layout.row_major(blocks, threads)

var in_tensor = LayoutTensor[dtype, layout](device_in_buffer)
```

```mojo
# Row major: elements are stored sequentially in memory [0, 1, 2, 3, 4, 5, ...]
# Column major: used in some GPU optimizations, stored as [0, 4, 8, 12, 1, ...]
alias layout = Layout.row_major(blocks, threads)

var in_tensor = LayoutTensor[dtype, layout](device_in_buffer)
```

This `LayoutTensor` is a wrapper over the data stored inside `device_in_buffer`, it doesn't own its memory but allows us to index using block and thread ids. We'll create an alias so that we don't have to repeat the type information for each kernel launch:

```mojo
alias InputLayoutTensor = LayoutTensor[dtype, layout, MutableAnyOrigin]
```

```mojo
alias InputLayoutTensor = LayoutTensor[dtype, layout, MutableAnyOrigin]
```

More information on [origins here](../values/lifetimes.html).

Initially we'll just print the values to confirm it's indexing as we expect:

```mojo
fn print_values_kernel(in_tensor: InputLayoutTensor):
    var bid = block_idx.x
    var tid = thread_idx.x
    print("block:", bid, "thread:", tid, "val:", in_tensor[bid, tid])

ctx.enqueue_function[print_values_kernel](
    in_tensor, grid_dim=blocks, block_dim=threads,
)
ctx.synchronize()
```

```mojo
fn print_values_kernel(in_tensor: InputLayoutTensor):
    var bid = block_idx.x
    var tid = thread_idx.x
    print("block:", bid, "thread:", tid, "val:", in_tensor[bid, tid])

ctx.enqueue_function[print_values_kernel](
    in_tensor, grid_dim=blocks, block_dim=threads,
)
ctx.synchronize()
```

```text
block: 3 thread: 0 val: 12
block: 3 thread: 1 val: 13
block: 3 thread: 2 val: 14
block: 3 thread: 3 val: 15
block: 0 thread: 0 val: 0
block: 0 thread: 1 val: 1
block: 0 thread: 2 val: 2
block: 0 thread: 3 val: 3
block: 2 thread: 0 val: 8
block: 2 thread: 1 val: 9
block: 2 thread: 2 val: 10
block: 2 thread: 3 val: 11
block: 1 thread: 0 val: 4
block: 1 thread: 1 val: 5
block: 1 thread: 2 val: 6
block: 1 thread: 3 val: 7
```

```text
block: 3 thread: 0 val: 12
block: 3 thread: 1 val: 13
block: 3 thread: 2 val: 14
block: 3 thread: 3 val: 15
block: 0 thread: 0 val: 0
block: 0 thread: 1 val: 1
block: 0 thread: 2 val: 2
block: 0 thread: 3 val: 3
block: 2 thread: 0 val: 8
block: 2 thread: 1 val: 9
block: 2 thread: 2 val: 10
block: 2 thread: 3 val: 11
block: 1 thread: 0 val: 4
block: 1 thread: 1 val: 5
block: 1 thread: 2 val: 6
block: 1 thread: 3 val: 7
```

As in the visualization above, the block/thread is getting the corresponding value that we expect. You can see `block: 3 thread: 3` has the last value 15.

## Multiply kernel[​](basics.html#multiply-kernel "Direct link to Multiply kernel")

Now that we've verified we're getting the correct values when indexing, we'll launch a kernel to multiply each value:

```mojo
fn multiply_kernel[multiplier: Int](in_tensor: InputLayoutTensor):
    in_tensor[block_idx.x, thread_idx.x] *= multiplier

ctx.enqueue_function[multiply_kernel[2]](
    in_tensor,
    grid_dim=blocks,
    block_dim=threads,
)

# Copy data back to host and print as 2D array
device_in_buffer.enqueue_copy_to(host_in_buffer)
ctx.synchronize()

var host_tensor = LayoutTensor[dtype, layout](host_in_buffer)
print(host_tensor)
```

```mojo
fn multiply_kernel[multiplier: Int](in_tensor: InputLayoutTensor):
    in_tensor[block_idx.x, thread_idx.x] *= multiplier

ctx.enqueue_function[multiply_kernel[2]](
    in_tensor,
    grid_dim=blocks,
    block_dim=threads,
)

# Copy data back to host and print as 2D array
device_in_buffer.enqueue_copy_to(host_in_buffer)
ctx.synchronize()

var host_tensor = LayoutTensor[dtype, layout](host_in_buffer)
print(host_tensor)
```

```text
0 2 4 6
8 10 12 14
16 18 20 22
24 26 28 30
```

```text
0 2 4 6
8 10 12 14
16 18 20 22
24 26 28 30
```

Congratulations! You've successfully run a kernel that modifies values from your GPU, and printed the result on your CPU. You can see above that each thread multiplied a single value by 2 in parallel on the GPU, and copied the result back to the CPU.

## Sum reduce output[​](basics.html#sum-reduce-output "Direct link to Sum reduce output")

We're going to set up a new buffer which will have all the reduced values with the sum of each thread in the block:

```plaintext
Output: [ block[0] block[1] block[2] block[3] ]
```

```plaintext
Output: [ block[0] block[1] block[2] block[3] ]
```

Set up the output buffer/tensor for the host and device:

```mojo
var host_output_buffer = ctx.enqueue_create_host_buffer[dtype](blocks)
var device_output_buffer = ctx.enqueue_create_buffer[dtype](blocks)

# Zero the values on the device as they'll be used to accumulate results
ctx.enqueue_memset(device_output_buffer, 0)

alias out_layout = Layout.row_major(elements_in)
alias OutputLayoutTensor = LayoutTensor[dtype, out_layout, MutableAnyOrigin]

var out_tensor = OutputLayoutTensor(device_output_buffer)
```

```mojo
var host_output_buffer = ctx.enqueue_create_host_buffer[dtype](blocks)
var device_output_buffer = ctx.enqueue_create_buffer[dtype](blocks)

# Zero the values on the device as they'll be used to accumulate results
ctx.enqueue_memset(device_output_buffer, 0)

alias out_layout = Layout.row_major(elements_in)
alias OutputLayoutTensor = LayoutTensor[dtype, out_layout, MutableAnyOrigin]

var out_tensor = OutputLayoutTensor(device_output_buffer)
```

The problem here is that we can't have all the threads summing their values into the same index in the output buffer as that will introduce race conditions. We're going to introduce new concepts to deal with this.

## Shared memory[​](basics.html#shared-memory "Direct link to Shared memory")

This kernel uses shared memory to accumulate values. Shared memory is much faster than global memory because it resides on-chip, closer to the processing cores, reducing latency and increasing bandwidth. It's not an optimal solution for this kind of reduction operation, but it's a good way to introduce shared memory in a simple example. We'll cover better solutions in the next sections.

```mojo
fn sum_reduce_kernel(
    in_tensor: InputLayoutTensor, out_tensor: OutputLayoutTensor
):
    # This allocates memory to be shared between threads in a block prior to the
    # kernel launching. Each kernel gets a pointer to the allocated memory.
    var shared = stack_allocation[
        threads * sizeof[dtype](),
        Scalar[dtype],
        address_space = AddressSpace.SHARED,
    ]()

    # Place the corresponding value into shared memory
    shared[thread_idx.x] = in_tensor[block_idx.x, thread_idx.x][0]

    # Await all the threads to finish loading their values into shared memory
    barrier()

    # If this is the first thread, sum and write the result to global memory
    if thread_idx.x == 0:
        for i in range(threads):
            out_tensor[block_idx.x] += shared[i]

ctx.enqueue_function[sum_reduce_kernel](
    in_tensor,
    out_tensor,
    grid_dim=blocks,
    block_dim=threads,
)

# Copy the data back to the host and print out the SIMD vector
device_output_buffer.enqueue_copy_to(host_output_buffer)
ctx.synchronize()

print(host_output_buffer)
```

```mojo
fn sum_reduce_kernel(
    in_tensor: InputLayoutTensor, out_tensor: OutputLayoutTensor
):
    # This allocates memory to be shared between threads in a block prior to the
    # kernel launching. Each kernel gets a pointer to the allocated memory.
    var shared = stack_allocation[
        threads * sizeof[dtype](),
        Scalar[dtype],
        address_space = AddressSpace.SHARED,
    ]()

    # Place the corresponding value into shared memory
    shared[thread_idx.x] = in_tensor[block_idx.x, thread_idx.x][0]

    # Await all the threads to finish loading their values into shared memory
    barrier()

    # If this is the first thread, sum and write the result to global memory
    if thread_idx.x == 0:
        for i in range(threads):
            out_tensor[block_idx.x] += shared[i]

ctx.enqueue_function[sum_reduce_kernel](
    in_tensor,
    out_tensor,
    grid_dim=blocks,
    block_dim=threads,
)

# Copy the data back to the host and print out the SIMD vector
device_output_buffer.enqueue_copy_to(host_output_buffer)
ctx.synchronize()

print(host_output_buffer)
```

```text
HostBuffer([6, 22, 38, 54])
```

```text
HostBuffer([6, 22, 38, 54])
```

For our first block/tile we summed the values:

```plaintext
sum([ 0 1 2 3 ]) == 6
```

```plaintext
sum([ 0 1 2 3 ]) == 6
```

And the reduction resulted in the output having the sum of 6 in the first position. Every tile/block has been reduced to:

```plaintext
[ 6 22 38 54]
```

```plaintext
[ 6 22 38 54]
```

## Sum multiple values from a single thread[​](basics.html#sum-multiple-values-from-a-single-thread "Direct link to Sum multiple values from a single thread")

We could skip using shared memory altogether by launching a single thread per block. Each thread can load more than a single value, here we'll be launching one thread per block, loading the 4 corresponding values from that block, and summing them together:

```mojo
fn simd_reduce_kernel(
    in_tensor: InputLayoutTensor, out_tensor: OutputLayoutTensor
):
    # The [4] means it loads 4 sequential values before doing the `reduce_add`
    out_tensor[block_idx.x] = in_tensor.load[4](block_idx.x, 0).reduce_add()

ctx.enqueue_function[simd_reduce_kernel](
    in_tensor,
    out_tensor,
    grid_dim=blocks,
    block_dim=1, # one thread per block
)

# Ensure we have the same result
device_output_buffer.enqueue_copy_to(host_output_buffer)
ctx.synchronize()

print(host_output_buffer)
```

```mojo
fn simd_reduce_kernel(
    in_tensor: InputLayoutTensor, out_tensor: OutputLayoutTensor
):
    # The [4] means it loads 4 sequential values before doing the `reduce_add`
    out_tensor[block_idx.x] = in_tensor.load[4](block_idx.x, 0).reduce_add()

ctx.enqueue_function[simd_reduce_kernel](
    in_tensor,
    out_tensor,
    grid_dim=blocks,
    block_dim=1, # one thread per block
)

# Ensure we have the same result
device_output_buffer.enqueue_copy_to(host_output_buffer)
ctx.synchronize()

print(host_output_buffer)
```

```text
HostBuffer([6, 22, 38, 54])
```

```text
HostBuffer([6, 22, 38, 54])
```

This is cleaner and faster, instead of 4 threads writing to shared memory, we're using 1 thread per block and summing them together without the intermediate step. However, this can be even faster by launching one thread per value and doing a single instruction in parallel using warps.

## Warps[​](basics.html#warps "Direct link to Warps")

Warps

Warp level instructions are an advanced concept, this section is to demonstrate that these low-level primitives are available from Mojo. We'll go into more depth on warps later, so don't worry if it doesn't make sense yet.

A *warp* is a group of threads (32 on NVIDIA GPUs) within a block. Threads within the same warp can synchronize their execution, and take advantage of [Single Instruction, Multiple Threads](https://en.wikipedia.org/wiki/Single_instruction,_multiple_threads) (SIMT). SIMT (GPU-focused) allows multiple threads to execute the same instruction on different data with independent control flow and thread states, while SIMD (CPU-focused) applies a single instruction to multiple data elements simultaneously with no thread independence.

We have only 4 threads within each block, well under the 32 limit, if this wasn't the case you'd have to do two reductions, one from each warp to shared memory, then another from shared memory to the output buffer or tensor.

Here is a simple warp reduction kernel:

```mojo
fn warp_reduce_kernel(
    in_tensor: InputLayoutTensor, out_tensor: OutputLayoutTensor
):
    var value = in_tensor.load[1](block_idx.x, thread_idx.x)

    # Each thread gets the value from one thread higher, summing them as they go
    value = warp.sum(value)

    # Print each reduction step in the first block
    if block_idx.x == 0:
        print("thread:", thread_idx.x, "value:", value)

    # Thread 0 has the reduced sum of the values from all the other threads
    if thread_idx.x == 0:
        out_tensor[block_idx.x] = value

ctx.enqueue_function[warp_reduce_kernel](
    in_tensor,
    out_tensor,
    grid_dim=blocks,
    block_dim=threads,
)
ctx.synchronize()

# Ensure we have the same result
device_output_buffer.enqueue_copy_to(host_output_buffer)
ctx.synchronize()

print(host_output_buffer)
```

```mojo
fn warp_reduce_kernel(
    in_tensor: InputLayoutTensor, out_tensor: OutputLayoutTensor
):
    var value = in_tensor.load[1](block_idx.x, thread_idx.x)

    # Each thread gets the value from one thread higher, summing them as they go
    value = warp.sum(value)

    # Print each reduction step in the first block
    if block_idx.x == 0:
        print("thread:", thread_idx.x, "value:", value)

    # Thread 0 has the reduced sum of the values from all the other threads
    if thread_idx.x == 0:
        out_tensor[block_idx.x] = value

ctx.enqueue_function[warp_reduce_kernel](
    in_tensor,
    out_tensor,
    grid_dim=blocks,
    block_dim=threads,
)
ctx.synchronize()

# Ensure we have the same result
device_output_buffer.enqueue_copy_to(host_output_buffer)
ctx.synchronize()

print(host_output_buffer)
```

```text
thread: 0 value: 6
thread: 1 value: 6
thread: 2 value: 5
thread: 3 value: 3
HostBuffer([6, 22, 38, 54])
```

```text
thread: 0 value: 6
thread: 1 value: 6
thread: 2 value: 5
thread: 3 value: 3
HostBuffer([6, 22, 38, 54])
```

You can see in the output that the first block had the values \[0 1 2 3] and was reduced from top to bottom (shuffle down) in this way, where the sum result of one thread is passed to the next thread down:

| Thread | value | next\_value | result |
|--------|-------|-------------|--------|
| 3      | 3     | N/A         | 3      |
| 2      | 2     | 3           | 5      |
| 1      | 1     | 5           | 6      |
| 0      | 0     | 6           | 6      |

## Exercise[​](basics.html#exercise "Direct link to Exercise")

Now that we've covered some of the core primitives for GPU programming, here's an exercise to solidify your understanding. Feel free to revisit the examples as you work through it the first time, then challenge yourself to write the code independently. Experimenting with the code and observing the results is also a highly valuable way to deepen your skills, don’t hesitate to tweak things and see what happens!

1. Create a host buffer for the input of `DType` `Float32`, with 32 elements, and initialize the numbers ordered sequentially. Copy the host buffer to the device.
2. Create a in\_tensor that wraps the host buffer, with the dimensions (8, 4)
3. Create an host and device buffer for the output of `DType` `Float32`, with 8 elements, don't forget to zero the values with `enqueue_memset()`.
4. Launch a GPU kernel with 8 blocks and 4 threads that reduce sums the values, using your preferred method to write to the output buffer.
5. Copy the device buffer to the host buffer, and print it out on the CPU.

Click to expand answer.

```mojo
alias dtype_f32 = DType.float32
alias elements_f32 = 32
alias blocks_f32 = 8
alias threads_f32 = elements_f32 // blocks_f32

# Create buffers
var in_buffer_host = ctx.enqueue_create_host_buffer[dtype_f32](elements_f32)
var in_buffer_device = ctx.enqueue_create_buffer[dtype_f32](elements_f32)
var out_buffer_host = ctx.enqueue_create_host_buffer[dtype_f32](blocks_f32)
var out_buffer_device = ctx.enqueue_create_buffer[dtype_f32](blocks_f32)

# Zero output buffer values
ctx.enqueue_memset(out_buffer_device, 0)
ctx.synchronize()

# Fill in input values sequentially and copy to device
iota(in_buffer_host.unsafe_ptr(), elements_f32)
in_buffer_host.enqueue_copy_to(in_buffer_device)

# Create the LayoutTensors
alias LayoutF32 = Layout.row_major(blocks_f32, threads_f32)
alias InputTensorF32 = LayoutTensor[dtype_f32, LayoutF32, MutableAnyOrigin]
var float_in_tensor = InputTensorF32(in_buffer_device)

alias OutputLayoutF32 = Layout.row_major(blocks_f32)
alias OutputTensorF32 = LayoutTensor[dtype_f32, OutputLayoutF32, MutableAnyOrigin]
var float_out_tensor = OutputTensorF32(out_buffer_device)

fn reduce_sum_f32(in_tensor: InputTensorF32, output_buffer: OutputTensorF32):
    var value = in_tensor.load[1](block_idx.x, thread_idx.x)
    value = warp.sum(value)
    if thread_idx.x == 0:
        output_buffer[block_idx.x] = value

ctx.enqueue_function[reduce_sum_f32](
    float_in_tensor,
    float_out_tensor,
    grid_dim=8,
    block_dim=4
)

out_buffer_device.enqueue_copy_to(out_buffer_host)

ctx.synchronize()

print(out_buffer_host)
```

```mojo
alias dtype_f32 = DType.float32
alias elements_f32 = 32
alias blocks_f32 = 8
alias threads_f32 = elements_f32 // blocks_f32

# Create buffers
var in_buffer_host = ctx.enqueue_create_host_buffer[dtype_f32](elements_f32)
var in_buffer_device = ctx.enqueue_create_buffer[dtype_f32](elements_f32)
var out_buffer_host = ctx.enqueue_create_host_buffer[dtype_f32](blocks_f32)
var out_buffer_device = ctx.enqueue_create_buffer[dtype_f32](blocks_f32)

# Zero output buffer values
ctx.enqueue_memset(out_buffer_device, 0)
ctx.synchronize()

# Fill in input values sequentially and copy to device
iota(in_buffer_host.unsafe_ptr(), elements_f32)
in_buffer_host.enqueue_copy_to(in_buffer_device)

# Create the LayoutTensors
alias LayoutF32 = Layout.row_major(blocks_f32, threads_f32)
alias InputTensorF32 = LayoutTensor[dtype_f32, LayoutF32, MutableAnyOrigin]
var float_in_tensor = InputTensorF32(in_buffer_device)

alias OutputLayoutF32 = Layout.row_major(blocks_f32)
alias OutputTensorF32 = LayoutTensor[dtype_f32, OutputLayoutF32, MutableAnyOrigin]
var float_out_tensor = OutputTensorF32(out_buffer_device)

fn reduce_sum_f32(in_tensor: InputTensorF32, output_buffer: OutputTensorF32):
    var value = in_tensor.load[1](block_idx.x, thread_idx.x)
    value = warp.sum(value)
    if thread_idx.x == 0:
        output_buffer[block_idx.x] = value

ctx.enqueue_function[reduce_sum_f32](
    float_in_tensor,
    float_out_tensor,
    grid_dim=8,
    block_dim=4
)

out_buffer_device.enqueue_copy_to(out_buffer_host)

ctx.synchronize()

print(out_buffer_host)
```

```text
HostBuffer([6.0, 22.0, 38.0, 54.0, 70.0, 86.0, 102.0, 118.0])
```

```text
HostBuffer([6.0, 22.0, 38.0, 54.0, 70.0, 86.0, 102.0, 118.0])
```

The next chapter is coming soon, in the meantime you can check out some more advanced [GPU programming examples here](https://github.com/modular/max/tree/main/examples/gpu_functions), or learn how you can integrate your GPU programming experience into the Python ecosystem with [with custom ops](https://docs.modular.com/max/custom-ops/).



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fgpu%2Fbasics)

- [Introduction to massively parallel programming](basics.html#introduction-to-massively-parallel-programming)
- [Setup](basics.html#setup)
- [Imports](basics.html#imports)
- [Your first kernel](basics.html#your-first-kernel)
- [Threads](basics.html#threads)
- [Host vs device and enqueue](basics.html#host-vs-device-and-enqueue)
- [Blocks](basics.html#blocks)
- [Tiles](basics.html#tiles)
- [Host buffer](basics.html#host-buffer)
- [Device buffer](basics.html#device-buffer)
- [Enqueue scheduling](basics.html#enqueue-scheduling)
- [Tensor indexing from threads](basics.html#tensor-indexing-from-threads)
- [Multiply kernel](basics.html#multiply-kernel)
- [Sum reduce output](basics.html#sum-reduce-output)
- [Shared memory](basics.html#shared-memory)
- [Sum multiple values from a single thread](basics.html#sum-multiple-values-from-a-single-thread)
- [Warps](basics.html#warps)
- [Exercise](basics.html#exercise)











Get started with GPU programming with Mojo and the MAX Driver | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



- [Mojo](https://docs.modular.com/mojo)
- /[Manual](../index.html)
- /GPU programming
- /Get started with GPU programming

<!--THE END-->

- [Mojo](https://docs.modular.com/mojo)
- /[Manual](../index.html)
- /GPU programming
- /Get started with GPU programming

# Get started with GPU programming with Mojo and the MAX Driver

This tutorial introduces you to GPU programming using Mojo and the MAX Driver. You'll learn how to write a simple program that performs vector addition on a GPU, exploring fundamental concepts of GPU programming along the way.

By the end of this tutorial, you will:

- Understand basic GPU programming concepts like grids and thread blocks
- Learn how to move data between CPU and GPU memory
- Write and compile a simple GPU kernel function
- Execute parallel computations on the GPU

We'll build everything step-by-step, starting with the basics and gradually adding more complexity. The concepts you learn here will serve as a foundation for more advanced GPU programming with Mojo.

Mojo's `gpu` package provides a low-level API for GPU programming. In contrast, the MAX Driver provides a higher-level API for GPU programming with easy-to-use abstractions for managing devices and memory. We're using the MAX Driver in this tutorial because it's easier to use and more convenient for many tasks. If you're interested in learning more about the `gpu` package, see the [GPU basics](basics.html) section of the Mojo Manual.

System requirements:

Mac

Linux

WSL

GPU

## 1. Create a Mojo project with `magic`[​](intro-tutorial.html#1-create-a-mojo-project-with-magic "Direct link to 1-create-a-mojo-project-with-magic")

We'll start by using the [`magic`](https://docs.modular.com/magic) CLI to create a virtual environment and generate our initial project directory.

1. If you don't have the [`magic`](https://docs.modular.com/magic/) CLI yet, you can install it on macOS and Ubuntu Linux with this command:

   ```sh
   curl -ssL https://magic.modular.com/ | bash
   ```

   ```sh
   curl -ssL https://magic.modular.com/ | bash
   ```

   Then run the `source` command that's printed in your terminal.
2. Navigate to the directory in which you want to create the project and execute:

   ```bash
   magic init gpu-intro --format mojoproject
   ```

   ```bash
   magic init gpu-intro --format mojoproject
   ```

   This creates a project directory named `gpu-intro`.
3. Let's go into the directory and verify the project is configured correctly by checking the version of Mojo that's installed within our project's virtual environment:

   ```bash
   cd gpu-intro
   ```

   ```bash
   cd gpu-intro
   ```

   ```bash
   magic run mojo --version
   ```

   ```bash
   magic run mojo --version
   ```

   You should see a version string indicating the version of Mojo installed, which by default should be the latest nightly version. Because we used the `--format mojoproject` option when creating the project, `magic` automatically added the `max` package as a dependency, which includes Mojo and the MAX libraries.
4. Activate the project's virtual environment:

   ```bash
   magic shell
   ```

   ```bash
   magic shell
   ```

   Later on, when you want to exit the virtual environment, just type `exit`.

## 2. Get references to the CPU and GPU[​](intro-tutorial.html#2-get-references-to-the-cpu-and-gpu "Direct link to 2. Get references to the CPU and GPU")

When using the MAX Driver, the [`Device`](https://docs.modular.com/max/api/mojo/driver/device/Device) class represents a logical instance of a device, for example, a CPU or GPU. The [`cpu()`](https://docs.modular.com/max/api/mojo/driver/device/cpu) and `accelerator()` functions return a `Device` reference to the CPU and GPU, respectively. If no GPU is available, the `accelerator()` function raises an error. You can use the [`has_accelerator()`](https://docs.modular.com/mojo/stdlib/sys/info/has_accelerator/) function to check if a GPU is available.

So let's start by writing a program that checks if a GPU is available and then creates a CPU and GPU device. Using any editor, create a file named `vector_addition.mojo` with the following code:

vector\_addition.mojo

```mojo
from max.driver import accelerator, cpu
from sys import exit, has_accelerator

def main():
    if not has_accelerator():
        print("A GPU is required to run this program")
        exit()

    host_device = cpu()
    print("Found the CPU device")
    gpu_device = accelerator()
    print("Found the GPU device")
```

```mojo
from max.driver import accelerator, cpu
from sys import exit, has_accelerator

def main():
    if not has_accelerator():
        print("A GPU is required to run this program")
        exit()

    host_device = cpu()
    print("Found the CPU device")
    gpu_device = accelerator()
    print("Found the GPU device")
```

Save the file and run it using the `mojo` CLI:

```bash
mojo vector_addition.mojo
```

```bash
mojo vector_addition.mojo
```

You should see the following output:

```output
Found the CPU device
Found the GPU device
```

```output
Found the CPU device
Found the GPU device
```

If you don't have a GPU, you'll see the following message:

```output
A GPU is required to run this program
```

```output
A GPU is required to run this program
```

In that case, you need to find a system that has a supported GPU to continue with this tutorial.

## 3. Define a simple kernel[​](intro-tutorial.html#3-define-a-simple-kernel "Direct link to 3. Define a simple kernel")

A GPU *kernel* is simply a function that runs on a GPU, executing a specific computation on a large dataset in parallel across thousands or millions of *threads*. You might already be familiar with threads when programming for a CPU, but GPU threads are different. On a CPU, threads are managed by the operating system and can perform completely independent tasks, such as managing a user interface, fetching data from a database, and so on. But on a GPU, threads are managed by the GPU itself. All the threads on a GPU execute the same kernel function, but they each work on a different part of the data.

When you run a kernel, you need to specify the number of threads you want to use. The number of threads you specify depends on the size of the data you want to process and the amount of parallelism you want to achieve. A common strategy is to use one thread per element of data in the result. So if you're performing an elementwise addition of two 1,024-element vectors, you'd use 1,024 threads.

A *grid* is the top-level organizational structure for the threads executing a kernel function. A grid consists of multiple *thread blocks*, which are further divided into individual threads that execute the kernel function concurrently. The GPU assigns a unique block index to each thread block, and a unique thread index to each thread within a block. Threads within the same thread block can share data through shared memory and synchronize using built-in mechanisms, but they cannot directly communicate with threads in other blocks. For this tutorial, we won't get in the details of why or how to do this, but it's an important concept to keep in mind when you're writing more complex kernels.

To better understand how grids, thread blocks, and threads work together, let's write a simple kernel function that prints the thread block and thread indices. Add the following code to your `vector_addition.mojo` file:

vector\_addition.mojo

```mojo
from gpu.id import block_idx, thread_idx

fn print_threads():
    """Print thread IDs."""
    print("Block index: [",
        block_idx.x,
        "]\tThread index: [",
        thread_idx.x,
        "]"
    )
```

```mojo
from gpu.id import block_idx, thread_idx

fn print_threads():
    """Print thread IDs."""
    print("Block index: [",
        block_idx.x,
        "]\tThread index: [",
        thread_idx.x,
        "]"
    )
```

We're using `fn` here without the `raises` keyword because a kernel function is not allowed to raise an error condition. In contrast, when you define a Mojo function with `def`, the compiler always assumes that the function *can* raise an error condition. See the [Functions](../functions.html) section of the Mojo Manual for more information on the difference between using `fn` and `def` to define functions in Mojo.

## 4. Compile and run the kernel[​](intro-tutorial.html#4-compile-and-run-the-kernel "Direct link to 4. Compile and run the kernel")

Next, we need to update the `main()` function to compile the kernel function for our GPU and then run it, specifying the number of thread blocks in the grid and the number of threads per thread block. For this initial example, let's define a grid consisting of 2 thread blocks, each with 64 threads. Update the imports and modify the `main()` function so that your program looks like this:

vector\_addition.mojo

```mojo
from gpu.host import Dim
from gpu.id import block_idx, thread_idx
from max.driver import Accelerator, Device, accelerator, cpu
from sys import exit, has_accelerator

fn print_threads():
    """Print thread IDs."""
    print("Block index: [",
        block_idx.x,
        "]\tThread index: [",
        thread_idx.x,
        "]"
    )

def main():
    if not has_accelerator():
        print("A GPU is required to run this program")
        exit()

    host_device = cpu()
    print("Found the CPU device")
    gpu_device = accelerator()
    print("Found the GPU device")

    print_threads_gpu = Accelerator.compile[print_threads](gpu_device)

    print_threads_gpu(gpu_device, grid_dim=Dim(2), block_dim=Dim(64))

    # Required for now to keep the main thread alive until the GPU is done
    Device.wait_for(gpu_device)
    print("Program finished")
```

```mojo
from gpu.host import Dim
from gpu.id import block_idx, thread_idx
from max.driver import Accelerator, Device, accelerator, cpu
from sys import exit, has_accelerator

fn print_threads():
    """Print thread IDs."""
    print("Block index: [",
        block_idx.x,
        "]\tThread index: [",
        thread_idx.x,
        "]"
    )

def main():
    if not has_accelerator():
        print("A GPU is required to run this program")
        exit()

    host_device = cpu()
    print("Found the CPU device")
    gpu_device = accelerator()
    print("Found the GPU device")

    print_threads_gpu = Accelerator.compile[print_threads](gpu_device)

    print_threads_gpu(gpu_device, grid_dim=Dim(2), block_dim=Dim(64))

    # Required for now to keep the main thread alive until the GPU is done
    Device.wait_for(gpu_device)
    print("Program finished")
```

Save the file and run it:

```bash
mojo vector_addition.mojo
```

```bash
mojo vector_addition.mojo
```

You should see something like the following output (which is abbreviated here):

```output
Found the CPU device
Found the GPU device
Block index: [ 1 ]	Thread index: [ 0 ]
Block index: [ 1 ]	Thread index: [ 1 ]
Block index: [ 1 ]	Thread index: [ 2 ]
...
Block index: [ 0 ]	Thread index: [ 30 ]
Block index: [ 0 ]	Thread index: [ 31 ]
Program finished
```

```output
Found the CPU device
Found the GPU device
Block index: [ 1 ]	Thread index: [ 0 ]
Block index: [ 1 ]	Thread index: [ 1 ]
Block index: [ 1 ]	Thread index: [ 2 ]
...
Block index: [ 0 ]	Thread index: [ 30 ]
Block index: [ 0 ]	Thread index: [ 31 ]
Program finished
```

The `Accelerator.compile()` function compiles a kernel function so that it can run on a particular GPU architecture. You specify the name of the kernel function as a compile-time Mojo *parameter* and the target GPU device as a run-time Mojo argument. (See the [Functions](../functions.html) section of the Mojo Manual for more information on Mojo function arguments and the [Parameters](../parameters.1.html) section for more information on Mojo compile-time parameters and metaprogramming.)

When you invoke the compiled kernel function, the MAX Driver executes it asynchronously on the GPU. You must provide the following arguments in this order:

- The target GPU device
- Any additional arguments specified by the kernel function definition (none, in this case)
- The grid dimensions, using the `grid_dim` keyword argument
- The thread block dimensions, using the `block_dim` keyword argument

Mojo currently doesn't typecheck the arguments to the compiled kernel function. This means that you can encounter obscure errors if the ordering, types, or argument count doesn't match. We're working to add more robust typechecking soon.

We're invoking the compiled kernel function with `grid_dim=Dim(2)` and `block_dim=Dim(64)`, which means we're using a grid of 2 thread blocks, with 64 threads each for a total of 128 threads in the grid.

When you run a kernel, the GPU assigns each thread block within the grid to a *streaming multiprocessor* for execution. A streaming multiprocessor (SM) is the fundamental processing unit of a GPU, designed to execute multiple parallel workloads efficiently. Each SM contains several cores, which perform the actual computations of the threads executing on the SM, along with shared resources like registers, shared memory, and control mechanisms to coordinate the execution of threads. The number of SMs and the number of cores on a GPU depends on its architecture. For example, the NVIDIA H100 PCIe contains 114 SMs, with 128 32-bit floating point cores per SM.

Additionally, when an SM is assigned a thread block, it divides the block into multiple *warps*, which are groups of 32 or 64 threads, depending on the GPU architecture. These threads execute the same instruction simultaneously in a *single instruction, multiple threads* (SIMT) model. The SM's *warp scheduler* coordinates the execution of warps on an SM's cores.

Warps are used to efficiently utilize GPU hardware by maximizing throughput and minimizing control overhead. Since GPUs are designed for high-performance parallel processing, grouping threads into warps allows for streamlined instruction scheduling and execution, reducing the complexity of managing individual threads. Multiple warps from multiple thread blocks can be active within an SM at any given time, enabling the GPU to keep execution units busy. For example, if the threads of a particular warp are blocked waiting for data from memory, the warp scheduler can immediately switch execution to another warp that's ready to run.

When you invoke the compiled kernel function, the MAX Driver executes it asynchronously on the GPU. In a typical program, the kernel generates some result that you then copy back to the CPU. That copy operation, which we'll see later in this tutorial, blocks until the kernel is done and the result is ready to copy.

In this kernel, we're just printing the thread IDs and there is no result to return. That's why we're using the [`Device.wait_for()`](https://docs.modular.com/max/api/mojo/driver/device/Device#wait_for) call in this example to block the main thread of the CPU until the GPU is done executing the kernel function. Otherwise, the program would exit before the GPU could finish executing the kernel.

## 5. Manage grid dimensions[​](intro-tutorial.html#5-manage-grid-dimensions "Direct link to 5. Manage grid dimensions")

The grid in the previous step consisted of a one-dimensional grid of 2 thread blocks with 64 threads in each block. However, you can also organize the thread blocks in a two- or even a three-dimensional grid. Similarly, you can arrange the threads in a thread block across one, two, or three dimensions. Typically, you determine the dimensions of the grid and thread blocks based on the dimensionality of the data to process. For example, you might choose a 1-dimensional grid for processing large vectors, a 2-dimensional grid for processing matrices, and a 3-dimensional grid for processing the frames of a video.

To better understand how grids, thread blocks, and threads work together, let's modify our `print_threads()` kernel function to print the `x`, `y`, and `z` components of the thread block and thread indices for each thread.

vector\_addition.mojo

```mojo
fn print_threads():
    """Print thread IDs."""
    print("Block index: [",
        block_idx.x, block_idx.y, block_idx.z,
        "]\tThread index: [",
        thread_idx.x, thread_idx.y, thread_idx.z,
        "]"
    )
```

```mojo
fn print_threads():
    """Print thread IDs."""
    print("Block index: [",
        block_idx.x, block_idx.y, block_idx.z,
        "]\tThread index: [",
        thread_idx.x, thread_idx.y, thread_idx.z,
        "]"
    )
```

Then, update the `main()` function to invoke the compiled kernel function with a 2x2x1 grid of thread blocks and a 16x4x2 arrangement of threads within each thread block:

vector\_addition.mojo

```mojo
    print_threads_gpu(
        gpu_device,
        grid_dim=Dim(2, 2, 1),
        block_dim=Dim(16, 4, 2)
    )
```

```mojo
    print_threads_gpu(
        gpu_device,
        grid_dim=Dim(2, 2, 1),
        block_dim=Dim(16, 4, 2)
    )
```

Save the file and run it again:

```bash
mojo vector_addition.mojo
```

```bash
mojo vector_addition.mojo
```

You should see something like the following output (which is abbreviated here):

```output
Found the CPU device
Found the GPU device
Block index: [ 0 1 0 ]	Thread index: [ 0 2 0 ]
Block index: [ 0 1 0 ]	Thread index: [ 1 2 0 ]
Block index: [ 0 1 0 ]	Thread index: [ 2 2 0 ]
...
Block index: [ 1 1 0 ]	Thread index: [ 14 3 0 ]
Block index: [ 1 1 0 ]	Thread index: [ 15 3 0 ]
Program finished
```

```output
Found the CPU device
Found the GPU device
Block index: [ 0 1 0 ]	Thread index: [ 0 2 0 ]
Block index: [ 0 1 0 ]	Thread index: [ 1 2 0 ]
Block index: [ 0 1 0 ]	Thread index: [ 2 2 0 ]
...
Block index: [ 1 1 0 ]	Thread index: [ 14 3 0 ]
Block index: [ 1 1 0 ]	Thread index: [ 15 3 0 ]
Program finished
```

Try changing the grid and thread block dimensions to see how the output changes.

The maximum number of threads per thread block and threads per SM is GPU-specific. For example, the NVIDIA A100 GPU has a maximum of 1,024 threads per thread block and 2,048 threads per SM.

Choosing the size and shape of the grid and thread blocks is a balancing act between maximizing the number of threads that can execute concurrently and minimizing the amount of time spent waiting for data to be loaded from memory. Factors such as the size of the data to process, the number of SMs on the GPU, and the memory bandwidth of the GPU can all play a role in determining the optimal grid and thread block dimensions. One general guideline is to choose a thread block size that is a multiple of the warp size. This helps to maximize the utilization of the GPU's resources and minimizes the overhead of managing multiple warps.

## 6. Model our data using `Tensor`[​](intro-tutorial.html#6-model-our-data-using-tensor "Direct link to 6-model-our-data-using-tensor")

Now that you understand how to manage grid dimensions, let's get ready to create a kernel that performs a simple elementwise addition of two vectors of floating point numbers.

We'll start by determining how to represent our data. Although we're going to be using one-dimensional data, we'll use a data type called a *tensor* that's capable of representing multi-dimensional data — basically, a multi-dimensional array. Because we have only a single dimension of data, this will be a *rank-1* tensor.

We'll use the [`Tensor`](https://docs.modular.com/max/api/mojo/driver/tensor/Tensor) class from the `max.driver` package to represent our data. This `Tensor` class is a convenience class that can allocate memory for the tensor on either the CPU or the GPU. It also includes methods for moving and copying the data between the CPU and the GPU.

Let's add `Tensor` to the list of imports and then update `main()` to create two input tensors on the CPU. We won't need the `print_threads()` kernel function anymore, so we can remove it and the code to compile and invoke it. So after all that, your `vector_addition.mojo` file should look like this:

vector\_addition.mojo

```mojo
from gpu.host import Dim
from gpu.id import block_idx, thread_idx
from max.driver import Accelerator, Tensor, accelerator, cpu
from sys import exit, has_accelerator

alias float_dtype = DType.float32
alias tensor_rank = 1
alias vector_size = 100

def main():
    if not has_accelerator():
        print("A GPU is required to run this program")
        exit()

    host_device = cpu()
    gpu_device = accelerator()

    # Allocate the two input tensors on the host.
    lhs_tensor = Tensor[float_dtype, tensor_rank](vector_size, host_device)
    rhs_tensor = Tensor[float_dtype, tensor_rank](vector_size, host_device)

    # Fill them with initial values.
    for i in range(vector_size):
        lhs_tensor[i] = Float32(i)
        rhs_tensor[i] = Float32(i * 0.5)

    print("lhs_tensor:", lhs_tensor)
    print("rhs_tensor:", rhs_tensor)
```

```mojo
from gpu.host import Dim
from gpu.id import block_idx, thread_idx
from max.driver import Accelerator, Tensor, accelerator, cpu
from sys import exit, has_accelerator

alias float_dtype = DType.float32
alias tensor_rank = 1
alias vector_size = 100

def main():
    if not has_accelerator():
        print("A GPU is required to run this program")
        exit()

    host_device = cpu()
    gpu_device = accelerator()

    # Allocate the two input tensors on the host.
    lhs_tensor = Tensor[float_dtype, tensor_rank](vector_size, host_device)
    rhs_tensor = Tensor[float_dtype, tensor_rank](vector_size, host_device)

    # Fill them with initial values.
    for i in range(vector_size):
        lhs_tensor[i] = Float32(i)
        rhs_tensor[i] = Float32(i * 0.5)

    print("lhs_tensor:", lhs_tensor)
    print("rhs_tensor:", rhs_tensor)
```

The program starts by defining some compile-time aliases for the data type and the size of the vector we're going to process. Then, the `main()` function initializes two input tensors on the CPU.

The `Tensor` constructor has two compile-time parameters:

- `type`: The element data type. We're specifying `float_dtype`, our alias for `DType.float32`.
- `rank`: The rank of the tensor. We're specifying `tensor_rank`, our alias for 1.

We're also passing two run-time arguments to the constructor:

- `shape`: The *shape* of the tensor, which is the size of each dimension of the tensor. You can provide an instance of the [`TensorShape`](https://docs.modular.com/max/api/mojo/tensor/tensor_shape/TensorShape/) struct, a Mojo tuple of integers, or for a rank-1 tensor a single integer. Here, we're providing a single integer, `vector_size`, which is our alias for 100.
- `device`: The device on which to allocate the tensor. If you omit this argument, the tensor is allocated on the host by default. Here, we're explicitly specifying `host_device` to make our intent clear.

After allocating the tensors, we fill them with initial values and then print them.

Now let's run the program to verify that everything is working so far.

```bash
mojo vector_addition.mojo
```

```bash
mojo vector_addition.mojo
```

You should see the following output:

```output
lhs_tensor: Tensor([[0.0, 1.0, 2.0, ..., 97.0, 98.0, 99.0]], dtype=float32, shape=100)
rhs_tensor: Tensor([[0.0, 0.5, 1.0, ..., 48.5, 49.0, 49.5]], dtype=float32, shape=100)
```

```output
lhs_tensor: Tensor([[0.0, 1.0, 2.0, ..., 97.0, 98.0, 99.0]], dtype=float32, shape=100)
rhs_tensor: Tensor([[0.0, 0.5, 1.0, ..., 48.5, 49.0, 49.5]], dtype=float32, shape=100)
```

## 7. Move the input tensors to the GPU and allocate an output tensor[​](intro-tutorial.html#7-move-the-input-tensors-to-the-gpu-and-allocate-an-output-tensor "Direct link to 7. Move the input tensors to the GPU and allocate an output tensor")

Now that we have our input tensors allocated and initialized on the CPU, let's move them to the GPU so that they'll be available for the kernel function to use.

Add the following code to the end of the `main()` function:

vector\_addition.mojo

```mojo
    # Move the input tensors to the accelerator.
    lhs_tensor = lhs_tensor.move_to(gpu_device)
    rhs_tensor = rhs_tensor.move_to(gpu_device)
```

```mojo
    # Move the input tensors to the accelerator.
    lhs_tensor = lhs_tensor.move_to(gpu_device)
    rhs_tensor = rhs_tensor.move_to(gpu_device)
```

The [`move_to()`](https://docs.modular.com/max/api/mojo/driver/tensor/Tensor#move_to) method returns a new `Tensor` object that is allocated on the specified device. It also implicitly calls the destructor on the original `Tensor` object, freeing the memory associated with it. The Mojo compiler would report an error if you tried to use the original `Tensor` object after moving it to the GPU. We could declare new variables to hold the moved tensors, but in this example we'll just reuse the original names.

Next, let's allocate an output tensor on the GPU to hold the result of the kernel function. Add the following code to the end of the `main()` function:

vector\_addition.mojo

```mojo
    # Allocate the output tensor on the accelerator.
    out_tensor = Tensor[float_dtype, tensor_rank](vector_size, gpu_device)
```

```mojo
    # Allocate the output tensor on the accelerator.
    out_tensor = Tensor[float_dtype, tensor_rank](vector_size, gpu_device)
```

## 8. Create `LayoutTensor` views[​](intro-tutorial.html#8-create-layouttensor-views "Direct link to 8-create-layouttensor-views")

One last step before writing the kernel function is that we're going to create a [`LayoutTensor`](https://docs.modular.com/mojo/stdlib/layout/layout_tensor/LayoutTensor/) view for each of the tensors. `LayoutTensor` provides a powerful abstraction for multi-dimensional data with precise control over memory organization. It supports various memory layouts (row-major, column-major, tiled), hardware-specific optimizations, and efficient parallel access patterns. We won't go into the details of using `LayoutTensor` in this tutorial, but in more complex kernels it's a useful tool for manipulating your data.

All we need to do is add the following code to the end of the `main()` function:

vector\_addition.mojo

```mojo
    # Create a LayoutTensor for each tensor.
    lhs_layout_tensor = lhs_tensor.to_layout_tensor()
    rhs_layout_tensor = rhs_tensor.to_layout_tensor()
    out_layout_tensor = out_tensor.to_layout_tensor()
```

```mojo
    # Create a LayoutTensor for each tensor.
    lhs_layout_tensor = lhs_tensor.to_layout_tensor()
    rhs_layout_tensor = rhs_tensor.to_layout_tensor()
    out_layout_tensor = out_tensor.to_layout_tensor()
```

## 9. Define and compile the vector addition kernel function[​](intro-tutorial.html#9-define-and-compile-the-vector-addition-kernel-function "Direct link to 9. Define and compile the vector addition kernel function")

Now we're ready to write the kernel function. Add the following code to `vector_addition.mojo`:

vector\_addition.mojo

```mojo
from gpu.id import block_dim, block_idx, thread_idx
from layout import LayoutTensor, Layout

...

alias block_size = 32

fn vector_addition[
    lhs_layout: Layout,
    rhs_layout: Layout,
    out_layout: Layout,
](
    lhs: LayoutTensor[float_dtype, lhs_layout, MutableAnyOrigin],
    rhs: LayoutTensor[float_dtype, rhs_layout, MutableAnyOrigin],
    out: LayoutTensor[float_dtype, out_layout, MutableAnyOrigin],
):
    """The calculation to perform across the vector on the GPU."""

    alias size = out_layout.size()  # Force compile-time evaluation.
    tid = block_dim.x * block_idx.x + thread_idx.x
    if tid < size:
        out[tid] = lhs[tid] + rhs[tid]
```

```mojo
from gpu.id import block_dim, block_idx, thread_idx
from layout import LayoutTensor, Layout

...

alias block_size = 32

fn vector_addition[
    lhs_layout: Layout,
    rhs_layout: Layout,
    out_layout: Layout,
](
    lhs: LayoutTensor[float_dtype, lhs_layout, MutableAnyOrigin],
    rhs: LayoutTensor[float_dtype, rhs_layout, MutableAnyOrigin],
    out: LayoutTensor[float_dtype, out_layout, MutableAnyOrigin],
):
    """The calculation to perform across the vector on the GPU."""

    alias size = out_layout.size()  # Force compile-time evaluation.
    tid = block_dim.x * block_idx.x + thread_idx.x
    if tid < size:
        out[tid] = lhs[tid] + rhs[tid]
```

Our `vector_addition()` kernel function accepts the two input tensors and the output tensor as arguments. It also accepts compile-time `Layout` parameters for each of the tensors. (For example, `lhs_layout` is the inferred layout for the `lhs` argument.) A [`Layout`](https://docs.modular.com/mojo/stdlib/layout/layout/Layout) is a representation of memory layouts using shape and stride information, and it maps between logical coordinates and linear memory indices. In our kernel function, we use only the layout of the `out` tensor to determine the size of the vector.

It's important to know the size of the vector because it might not be a multiple of the block size. In fact in this example, the size of the vector is 100, which is not a multiple of our block size of 32. So as we assign our threads to read elements from the tensor, we need to make sure we don't overrun the bounds of the tensor.

The body of the kernel function starts by calculating linear index of the tensor element that a particular thread is responsible for. The `block_dim` object (which we added to the list of imports) contains the dimensions of the thread blocks as `x`, `y`, and `z` values. Because we're going to use a one-dimensional grid of thread blocks, we need only the `x` dimension. We can then calculate `tid`, the unique "global" index of the thread within the output tensor as `block_dim.x * block_idx.x + thread_idx.x`. For example, the `tid` values for the threads in the first thread block range from 0 to 31. The `tid` values for the threads in the second thread block range from 32 to 63, and so on.

The function then checks if the calculated `tid` is less than the size of the output tensor. If it is, the thread reads the corresponding elements from the `lhs` and `rhs` tensors, adds them together, and stores the result in the corresponding element of the `out` tensor.

Now that we've written the kernel function, we can compile it by adding the following code to the end of the `main()` function:

vector\_addition.mojo

```mojo
    # Compile the kernel function to run on the GPU.
    gpu_function = Accelerator.compile[
        vector_addition[
            lhs_layout_tensor.layout,
            rhs_layout_tensor.layout,
            out_layout_tensor.layout,
        ]
    ](gpu_device)
```

```mojo
    # Compile the kernel function to run on the GPU.
    gpu_function = Accelerator.compile[
        vector_addition[
            lhs_layout_tensor.layout,
            rhs_layout_tensor.layout,
            out_layout_tensor.layout,
        ]
    ](gpu_device)
```

## 10. Invoke the kernel function and move the output back to the CPU[​](intro-tutorial.html#10-invoke-the-kernel-function-and-move-the-output-back-to-the-cpu "Direct link to 10. Invoke the kernel function and move the output back to the CPU")

The last step is to invoke the kernel function and move the output back to the CPU. Add this line to the list of imports at the top of the file:

vector\_addition.mojo

```mojo
from math import ceildiv
```

```mojo
from math import ceildiv
```

Then, add the following code to the end of the `main()` function:

vector\_addition.mojo

```mojo
    # Calculate the number of thread blocks needed by dividing the vector size
    # by the block size and rounding up.
    num_blocks = ceildiv(vector_size, block_size)

    # Invoke the kernel function.
    gpu_function(
        gpu_device,
        lhs_layout_tensor,
        rhs_layout_tensor,
        out_layout_tensor,
        grid_dim=Dim(num_blocks),
        block_dim=Dim(block_size),
    )

    # Move the output tensor back onto the CPU so that we can read the results.
    out_tensor = out_tensor.move_to(host_device)

    print("out_tensor:", out_tensor)
```

```mojo
    # Calculate the number of thread blocks needed by dividing the vector size
    # by the block size and rounding up.
    num_blocks = ceildiv(vector_size, block_size)

    # Invoke the kernel function.
    gpu_function(
        gpu_device,
        lhs_layout_tensor,
        rhs_layout_tensor,
        out_layout_tensor,
        grid_dim=Dim(num_blocks),
        block_dim=Dim(block_size),
    )

    # Move the output tensor back onto the CPU so that we can read the results.
    out_tensor = out_tensor.move_to(host_device)

    print("out_tensor:", out_tensor)
```

Click here to see the complete version of`vector_addition.mojo`.

vector\_addition.mojo

```mojo
from gpu.host import Dim
from gpu.id import block_dim, block_idx, thread_idx
from layout import LayoutTensor, Layout
from math import ceildiv
from max.driver import Accelerator, Tensor, accelerator, cpu
from sys import exit, has_accelerator

alias float_dtype = DType.float32
alias tensor_rank = 1
alias vector_size = 100
alias block_size = 32

fn vector_addition[
    lhs_layout: Layout,
    rhs_layout: Layout,
    out_layout: Layout,
](
    lhs: LayoutTensor[float_dtype, lhs_layout, MutableAnyOrigin],
    rhs: LayoutTensor[float_dtype, rhs_layout, MutableAnyOrigin],
    out: LayoutTensor[float_dtype, out_layout, MutableAnyOrigin],
):
    """The calculation to perform across the vector on the GPU."""

    alias size = out_layout.size()  # Force compile-time evaluation.
    tid = block_dim.x * block_idx.x + thread_idx.x
    if tid < size:
        out[tid] = lhs[tid] + rhs[tid]

def main():
    if not has_accelerator():
        print("A GPU is required to run this program")
        exit()

    host_device = cpu()
    gpu_device = accelerator()

    # Allocate the two input tensors on the host.
    lhs_tensor = Tensor[float_dtype, tensor_rank](vector_size, host_device)
    rhs_tensor = Tensor[float_dtype, tensor_rank](vector_size, host_device)

    # Fill them with initial values.
    for i in range(vector_size):
        lhs_tensor[i] = Float32(i)
        rhs_tensor[i] = Float32(i * 0.5)

    print("lhs_tensor:", lhs_tensor)
    print("rhs_tensor:", rhs_tensor)

    # Move the input tensors to the accelerator.
    lhs_tensor = lhs_tensor.move_to(gpu_device)
    rhs_tensor = rhs_tensor.move_to(gpu_device)

    # Allocate the output tensor on the accelerator.
    out_tensor = Tensor[float_dtype, tensor_rank](vector_size, gpu_device)

    # Create a LayoutTensor for each tensor.
    lhs_layout_tensor = lhs_tensor.to_layout_tensor()
    rhs_layout_tensor = rhs_tensor.to_layout_tensor()
    out_layout_tensor = out_tensor.to_layout_tensor()

    # Compile the kernel function to run on the GPU.
    gpu_function = Accelerator.compile[
        vector_addition[
            lhs_layout_tensor.layout,
            rhs_layout_tensor.layout,
            out_layout_tensor.layout,
        ]
    ](gpu_device)

    # Calculate the number of thread blocks needed by dividing the vector size
    # by the block size and rounding up.
    num_blocks = ceildiv(vector_size, block_size)

    # Invoke the kernel function.
    gpu_function(
        gpu_device,
        lhs_layout_tensor,
        rhs_layout_tensor,
        out_layout_tensor,
        grid_dim=Dim(num_blocks),
        block_dim=Dim(block_size),
    )

    # Move the output tensor back onto the CPU so that we can read the results.
    out_tensor = out_tensor.move_to(host_device)

    print("out_tensor:", out_tensor)
```

```mojo
from gpu.host import Dim
from gpu.id import block_dim, block_idx, thread_idx
from layout import LayoutTensor, Layout
from math import ceildiv
from max.driver import Accelerator, Tensor, accelerator, cpu
from sys import exit, has_accelerator

alias float_dtype = DType.float32
alias tensor_rank = 1
alias vector_size = 100
alias block_size = 32

fn vector_addition[
    lhs_layout: Layout,
    rhs_layout: Layout,
    out_layout: Layout,
](
    lhs: LayoutTensor[float_dtype, lhs_layout, MutableAnyOrigin],
    rhs: LayoutTensor[float_dtype, rhs_layout, MutableAnyOrigin],
    out: LayoutTensor[float_dtype, out_layout, MutableAnyOrigin],
):
    """The calculation to perform across the vector on the GPU."""

    alias size = out_layout.size()  # Force compile-time evaluation.
    tid = block_dim.x * block_idx.x + thread_idx.x
    if tid < size:
        out[tid] = lhs[tid] + rhs[tid]

def main():
    if not has_accelerator():
        print("A GPU is required to run this program")
        exit()

    host_device = cpu()
    gpu_device = accelerator()

    # Allocate the two input tensors on the host.
    lhs_tensor = Tensor[float_dtype, tensor_rank](vector_size, host_device)
    rhs_tensor = Tensor[float_dtype, tensor_rank](vector_size, host_device)

    # Fill them with initial values.
    for i in range(vector_size):
        lhs_tensor[i] = Float32(i)
        rhs_tensor[i] = Float32(i * 0.5)

    print("lhs_tensor:", lhs_tensor)
    print("rhs_tensor:", rhs_tensor)

    # Move the input tensors to the accelerator.
    lhs_tensor = lhs_tensor.move_to(gpu_device)
    rhs_tensor = rhs_tensor.move_to(gpu_device)

    # Allocate the output tensor on the accelerator.
    out_tensor = Tensor[float_dtype, tensor_rank](vector_size, gpu_device)

    # Create a LayoutTensor for each tensor.
    lhs_layout_tensor = lhs_tensor.to_layout_tensor()
    rhs_layout_tensor = rhs_tensor.to_layout_tensor()
    out_layout_tensor = out_tensor.to_layout_tensor()

    # Compile the kernel function to run on the GPU.
    gpu_function = Accelerator.compile[
        vector_addition[
            lhs_layout_tensor.layout,
            rhs_layout_tensor.layout,
            out_layout_tensor.layout,
        ]
    ](gpu_device)

    # Calculate the number of thread blocks needed by dividing the vector size
    # by the block size and rounding up.
    num_blocks = ceildiv(vector_size, block_size)

    # Invoke the kernel function.
    gpu_function(
        gpu_device,
        lhs_layout_tensor,
        rhs_layout_tensor,
        out_layout_tensor,
        grid_dim=Dim(num_blocks),
        block_dim=Dim(block_size),
    )

    # Move the output tensor back onto the CPU so that we can read the results.
    out_tensor = out_tensor.move_to(host_device)

    print("out_tensor:", out_tensor)
```

First we calculate the number of thread blocks needed by dividing the vector size by the block size and rounding up. Then we can invoke the kernel function.

After that, we move the output tensor back onto the CPU so that we can read the results. This call blocks on the CPU until the kernel function has populated the output tensor and returned. The move also has the side effect of invoking the destructor for the original `out_tensor` object and freeing its allocated memory on the GPU. As for the input tensors, we don't need to move them back to the CPU. Also, the Mojo compiler determines that the `lhs_tensor` and `rhs_tensor` objects are no longer needed after the kernel function has returned, and so it automatically invokes their destructors to free their allocated memory on the GPU. (For a detailed explanation of object lifetime and destruction in Mojo, see the [Death of a value](../lifecycle/death.html) section of the Mojo Manual.)

So it's finally time to run the program to see the results of our hard work.

```bash
mojo vector_addition.mojo
```

```bash
mojo vector_addition.mojo
```

You should see the following output:

```output
lhs_tensor:  Tensor([[0.0, 1.0, 2.0, ..., 97.0, 98.0, 99.0]], dtype=float32, shape=100)
rhs_tensor:  Tensor([[0.0, 0.5, 1.0, ..., 48.5, 49.0, 49.5]], dtype=float32, shape=100)
out_tensor:  Tensor([[0.0, 1.5, 3.0, ..., 145.5, 147.0, 148.5]], dtype=float32, shape=100)
```

```output
lhs_tensor:  Tensor([[0.0, 1.0, 2.0, ..., 97.0, 98.0, 99.0]], dtype=float32, shape=100)
rhs_tensor:  Tensor([[0.0, 0.5, 1.0, ..., 48.5, 49.0, 49.5]], dtype=float32, shape=100)
out_tensor:  Tensor([[0.0, 1.5, 3.0, ..., 145.5, 147.0, 148.5]], dtype=float32, shape=100)
```

And now that you're done with the tutorial, exit your project's virtual environment:

```bash
exit
```

```bash
exit
```

## Summary[​](intro-tutorial.html#summary "Direct link to Summary")

In this tutorial, we've learned how to use the MAX Driver to write a simple kernel function that performs an elementwise addition of two vectors. We covered:

- Understanding basic GPU concepts like devices, grids, and thread blocks
- Moving data between CPU and GPU memory using tensors
- Writing and compiling a GPU kernel function
- Executing parallel computations on the GPU
- Managing memory and object lifetimes across devices

## Next steps[​](intro-tutorial.html#next-steps "Direct link to Next steps")

Now that you understand the basics of GPU programming with Mojo, here are some suggested next steps:

- Check out more [examples](https://github.com/modular/max/tree/main/examples/gpu_functions) of GPU programming with Mojo and the MAX Driver in the public [MAX GitHub repository](https://github.com/modular/max).
- Try implementing other parallel algorithms like matrix multiplication or convolutions.
- Explore the [MAX Driver API](https://docs.modular.com/max/api/mojo/driver/) documentation to discover more advanced GPU programming features.
- Learn more about other features of the [MAX platform](https://docs.modular.com/max/intro) for building and deploying high-performance AI endpoints.
- Read the [GPU basics](basics.html) section of the Mojo Manual to get a taste of the low-level GPU programming APIs available in the [`gpu`](https://docs.modular.com/mojo/stdlib/gpu/) package.
- Check out the [Mojo Manual](https://docs.modular.com/mojo/manual) for more information on the Mojo language.



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fgpu%2Fintro-tutorial)

- [1. Create a Mojo project with `magic`](intro-tutorial.html#1-create-a-mojo-project-with-magic)
- [2. Get references to the CPU and GPU](intro-tutorial.html#2-get-references-to-the-cpu-and-gpu)
- [3. Define a simple kernel](intro-tutorial.html#3-define-a-simple-kernel)
- [4. Compile and run the kernel](intro-tutorial.html#4-compile-and-run-the-kernel)
- [5. Manage grid dimensions](intro-tutorial.html#5-manage-grid-dimensions)
- [6. Model our data using `Tensor`](intro-tutorial.html#6-model-our-data-using-tensor)
- [7. Move the input tensors to the GPU and allocate an output tensor](intro-tutorial.html#7-move-the-input-tensors-to-the-gpu-and-allocate-an-output-tensor)
- [8. Create `LayoutTensor` views](intro-tutorial.html#8-create-layouttensor-views)
- [9. Define and compile the vector addition kernel function](intro-tutorial.html#9-define-and-compile-the-vector-addition-kernel-function)
- [10. Invoke the kernel function and move the output back to the CPU](intro-tutorial.html#10-invoke-the-kernel-function-and-move-the-output-back-to-the-cpu)
- [Summary](intro-tutorial.html#summary)
- [Next steps](intro-tutorial.html#next-steps)











Introduction to layouts | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



- [Mojo](https://docs.modular.com/mojo)
- /[Manual](../index.html)
- /Layouts and LayoutTensor
- /Introduction to layouts

<!--THE END-->

- [Mojo](https://docs.modular.com/mojo)
- /[Manual](../index.html)
- /Layouts and LayoutTensor
- /Introduction to layouts

# Introduction to layouts

Mojo’s [`layout` package](https://docs.modular.com/mojo/stdlib/layout/) provides a number of APIs for working with dense multidimensional arrays, which simplify writing algorithms for handling linear algebra.

This package includes the following main types:

- The [`Layout`](https://docs.modular.com/mojo/stdlib/layout/layout/Layout) struct describes an arrangement of data in memory. A *layout* is a function that maps a set of logical coordinates (like (*x*, *y*) in a two-dimensional array) to a linear index value. Layouts can be hierarchical (for example, representing a 2D matrix that’s further subdivided into tiles).
- [`LayoutTensor`](https://docs.modular.com/mojo/stdlib/layout/layout_tensor/LayoutTensor) is a flexible tensor type that combines a `Layout` and a pointer to data.
- The [`IntTuple`](https://docs.modular.com/mojo/stdlib/layout/int_tuple/IntTuple) struct is a hierarchical tuple type, where each element of the tuple can either be an integral value or a nested `IntTuple`. The `IntTuple` type is used extensively for defining and indexing layouts and layout tensors.

Example code

You can find most of the code examples on this page in the [public GitHub repo](https://github.com/modular/max/tree/main/examples/mojo/layouts).

Some of the concepts presented here can be a little hard to grasp from static examples, so we recommend downloading the example code and experimenting.

## What’s a Layout?[​](layouts.html#whats-a-layout "Direct link to What’s a Layout?")

A layout is a function that maps a set of logical coordinates to a single linear index value.

For example, a layout could describe a 2x4 row-major matrix, or a 6x6 column-major matrix.

```mojo
from layout import Layout, print_layout

var l2x4row_major = Layout.row_major(2, 4)
var l6x6col_major = Layout.col_major(6, 6)
```

```mojo
from layout import Layout, print_layout

var l2x4row_major = Layout.row_major(2, 4)
var l6x6col_major = Layout.col_major(6, 6)
```

Layouts are made up of two tuples: shape and stride, where shape describes the logical coordinate space and the stride determines the mapping to the linear index value. A layout can be written as (*shape*:*stride*). For example, a contiguous vector of length 4 can be represented as (4:1):

![](data:image/png;base64,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PkyPpubS7erqotdff52effZZam5upsmTJ9O+++5bFW5RfJ/uunXr6JFHHqETTjiB9thjj6qMo5rS3bx5M61YsYLefvttampqovHjx9PBBx9MDQ0NoY+lmt+n+8EHH9Dy5ctL4xgyZAhNmDChquPA9+mGfnoktsGaStdxHDruuOPohRdeoKFDh9Knn35aAn3ZZZfR97///dChV1O6/OFx++23069+9atS3HfeeSdNnz499DFwg9WS7v33308XXnhhKWZ/PngcN954Y0leYW7Vku4DDzxAF1xwwRfGMXXqVLr55purMg5IN8wzI9lt1VS6ixYtoksvvZSuvPJKOvbYY2nr1q102mmn0XPPPUfPP/88tbS0hEq/mtL9wQ9+QMuWLeuON47SveSSS0offOeffz61trbSpk2baO7cufTYY4/R4sWLSzPFMLdqSXfevHn0ySef0Jw5c2j06NHEs9758+fTww8/THfffTcddNBBYQ6DUF4IFWfiG6updLmUMHLkyNLluLe9+eabdNhhh5VmKuecc06oCaimdG+99dbShwRfhp9xxhmxnOlWgs1XId/73vf4J47orLPOCjUf1ZJupSBffvllmjVrFvEHy+mnnx76ODDTDRVpohurmXTz+TztvffedN5559G55567HWSuI/Kl4A033BAq/GpK1wv0ySefTJR0efbOs/iFCxfSMcccE2o+opTufffdV/rgqMYVCGa6oZ4WiW+sZtLt6OigadOm0YIFC+j444/fDjTPdLl+uGTJklATAOn2DSfX3Fm4fGPtxRdfJP7l3jC3akv3iSeeoPfff5/WrFlDd911V6nGftttt9GgQYPCHAbKC6HSTH5jNZOud7nHb7zvfve725E+6qij6KOPPuJfig01A5Bu33Bef/31pRluNUo9HEk1pcs3Nrl2+84773QP+vLLLy/duG1sbOwbiF72xkw3VJyJb6xm0uWlVVxCqLRSgWfA7e3txHXSMDdINzhNbyXD4YcfTizfVCoV/OCAe1ZTuv4Q+Krq3nvvLa1cuOqqq+joo48OGGGw3SDdYJyw1/8TqJl0+S45125POukk+uUvf9mdD17BsM8++9CZZ55JF198cah5gnSD4Vy6dCmdffbZpQ9F/uDbaaedgh3Yx72iki6HtW3bNtpvv/3oa1/7WqnUEOYG6YZJM/lt1Uy6jPbkk0+ml156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#light) ![](data:image/png;base64,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Q/VoIF3VM4TygvIZgnSVT5FSAUK6SqXDWzBY6XrjFNRRkG5QpKPRD6QbwjxCumolDdJVKx+qRwPpqp4hlBeUzxCkq3yKlAqw7NKNxWJUX19PBx10EG3ZsoVWr15NbW1tJYEUxPfp7rXXXnTkkUfSc889Rxs3bizJOEq50q2rq6OpU6fS3nvvTVu3bqV33nmH/vrXv1I+n/d9LKX8Pl33OLq6uqi9vb2k48D36fo+PSLbYFmlq2ka3X777TRp0iTavHkzjRo1qgCa//b000/7Dr2U0uU3j1NPPZVmzZpViPsXv/gFrVixwvcxcIOlku73v/99uvLKKwsxu/PB47juuuuI5eXno1TSnTFjBl111VVfGccbb7xB11xzTUnGAen6OTOi3VZZpTtz5ky65JJL6Oabb6YXXniBdtppJ5o/fz4deOCBdMopp9CGDRt8pV9K6d5000108MEH98YbRuledtllNHLkSLr//vvpo48+ol133ZUuvvhimj59Ol1++eWFlaKfj1JJ96KLLqKdd96ZHnjgAfr444+JV70XXnghHXXUUcRjbG5u9nMYhPKCrzgj31hZpfvUU0/RZ599Rueff34v6P3224/4Z4Huu+8+euihh3xNQCmle9pppxXeJHK5HM2bNy+UK92+YPOnkDvuuIMWLlxIjzzyiK/5KJV0+woymUzS3XffTXfddRc9/vjjvo8DK11fkUa6sbJJd8SIEfTKK68UViO///3vt4P84osvEn8UnDPH39/CLKV0nQF897vfjZR0efXOq/gbb7yRlixZ4uuLIUjpHnvssYU3wlJ8AsFK19dpEfnGyibdcePG0aOPPkq33HILPf/889uBZhF3d3fTBRdc4GsCIN3B4eSaOwv329/+Np188sn0ySefDK6BAY4utXQPPfTQQolk/PjxdNJJJxVq7FdffbXvFwUhXV+nReQbK5t0nY97v/rVr+hPf/rTdqD5I2BtbS2dddZZviYA0h0czjPPPJPOO++8kpR6OJJSSpcvbD7xxBO022679Q76tttuo8WLFxdKQH4+IF0/aUa/rbJJl7dWPfbYY33uVODa4XvvvVdYlfj5gHS903R2MixdupTmzp1LlmV5P9njkaWUrjsE/lR13HHH0emnn164UPvHP/7RY4TeDoN0vXHCUf9HoGzS5avkL730Ej377LN066239ubD+TuXHu69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#dark)

**Figure 1.** 1D layout (4:1)

A 3x4 row-major layout can be represented as ((3, 4):(4, 1)). That is, the *shape* is 3x4 and the *strides* are 4 and 1. You can break this down into two sub-layouts or *modes*: a row mode and a column mode: 3 rows with a stride of 4 (3:4, the first numbers from each tuple) and 4 columns with a stride of 1 (4:1, the second numbers from each tuple).

The [`print_layout()`](https://docs.modular.com/mojo/stdlib/layout/layout/print_layout) function generates an ASCII diagram of any 2D layout, showing the coordinates on the outside and the corresponding index values in the grid.

```mojo
var l3x4row_major = Layout.row_major(3, 4)
print_layout(l3x4row_major)
```

```mojo
var l3x4row_major = Layout.row_major(3, 4)
print_layout(l3x4row_major)
```

Output:

```plaintext
((3, 4):(4, 1))
       0    1    2    3
    +----+----+----+----+
 0  |  0 |  1 |  2 |  3 |
    +----+----+----+----+
 1  |  4 |  5 |  6 |  7 |
    +----+----+----+----+
 2  |  8 |  9 | 10 | 11 |
    +----+----+----+----+
```

```plaintext
((3, 4):(4, 1))
       0    1    2    3
    +----+----+----+----+
 0  |  0 |  1 |  2 |  3 |
    +----+----+----+----+
 1  |  4 |  5 |  6 |  7 |
    +----+----+----+----+
 2  |  8 |  9 | 10 | 11 |
    +----+----+----+----+
```

The coordinate to index mapping is performed by calculating the dot product of the logical coordinates and the corresponding strides. For example, given the coordinates (*i, j*) and the layout shown above, the index value is i∗4+j∗1i\*4 + j\*1i∗4+j∗1. So coordinate (1, 1) maps to 5, as shown in the diagram.

The following example shows how to use a `Layout` to convert between coordinates and index values.

```mojo
var coords = IntTuple(1, 1)
var idx = l3x4row_major(coords)
print("index at coordinates (1, 1): ", idx)
print("coordinates at index 7:", l3x4row_major.idx2crd(7))
```

```mojo
var coords = IntTuple(1, 1)
var idx = l3x4row_major(coords)
print("index at coordinates (1, 1): ", idx)
print("coordinates at index 7:", l3x4row_major.idx2crd(7))
```

Output:

```plaintext
index at coordinates (1, 1):  5
coordinates at index 7: (1, 3)
```

```plaintext
index at coordinates (1, 1):  5
coordinates at index 7: (1, 3)
```

As this example shows, the layout is a function that takes a set of integer coordinates and returns a single integer (the linear index). The `Layout` struct also provides an [`idx2crd()`](https://docs.modular.com/mojo/stdlib/layout/layout/Layout#idx2crd) method that transforms a linear index into a set of logical coordinates.

Printing layouts

You can use `print_layout()` to print a diagram of any 2D layout. You can pass *any* layout to the built-in `print()` function to print a string representation of the layout in the form of a (*shape*:*stride*) pair.

### IntTuple: representing hierarchical shapes and strides[​](layouts.html#inttuple-representing-hierarchical-shapes-and-strides "Direct link to IntTuple: representing hierarchical shapes and strides")

A layout’s shape and stride are represented using the [`IntTuple`](https://docs.modular.com/mojo/stdlib/layout/int_tuple/IntTuple) type. Each element of an `IntTuple` is either an integer value or a nested `IntTuple`. You can create nested `IntTuples` using the `IntTuple` constructor:

```mojo
var shape1 = IntTuple(4, IntTuple(2, 2))
```

```mojo
var shape1 = IntTuple(4, IntTuple(2, 2))
```

A layout’s shape and stride tuples must be *congruent*—that is, they need to have the same hierarchical structure: the tuples must have the same number of elements, and any elements that are nested tuples must also have the same number of elements.

The [`int_tuple`](https://docs.modular.com/mojo/stdlib/layout/int_tuple/) package provides a number of functions for working with `IntTuple`. For example, it provides a [`congruent()`](https://docs.modular.com/mojo/stdlib/layout/int_tuple/congruent) function for testing the congruency of two tuples.

### Modes[​](layouts.html#modes "Direct link to Modes")

A layout has one or more *modes*, where a mode is a shape:stride pair. For example, the 1D vector layout (8:1) has a single mode: 8 elements with a stride of 1:

![](data:image/png;base64,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#light) ![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaYAAABgCAYAAABWt9YeAAAAAXNSR0IArs4c6QAAF8RJREFUeF7tXQmUFMWWfZHVC9AIfBz4I7iBINCVWcXSihsqCCqoIKA4ijrKQRQ/Ajou6ICAiKKocFyBI4uMG4ororI4oDN+0QGarqxq4TeigJ+voIIH217oyph6eSo5ZdMt1VZEVkT/F+f84z90ZsR790XmjfviRRYDaoQAIUAIEAKEgEIIMIVsIVMIAUKAECAECAEgYqJJQAgQAoQAIaAUAkRMSoWDjCEECAFCgBAgYqI5QAgQAoQAIaAUAkRMSoWDjCEECAFCgBAgYqI5QAgQAoQAIaAUAkRMSoWDjCEECAFCgBAgYqI5QAgQAoQAIaAUAkRMSoWDjCEECAFdESguLj6/R48e63W1XyW7iZhUigbZQggQAtoiQMQkLnRETOKwpJ4IAUKAECAEBCBAxCQAROqCECAECAFCQBwCREzisKSeCAFCgBAgBAQgkFVi2rhxY7P8/Py+jLFz4vH4V/F4fE3Pnj13CvArK11Eo9G+nPMzTNOcxRjjWTEiw0FjsVgeY2xQTU2NyRgLMMa2McZWB4PBnzLsOiu31/KnKWPMdhxnVSgU2p8VgwQMunv37qb79++fEAgElgeDwe0CuvSlC9u2T+CcD2aMGakDcs4dzvnr4XB4ry+GCByEc55j2/b5AFBkGEYBY6ykoqLinaKiokMCh5He1ZYtW3oEAoFz6hno16qqqqV++pQ1YrJt+88AUAYAxwDAQe+/hmEMCgaD/ys9EgIHiMVirTnnj3POb8BuOeetdXzxxWKx3o7jLAeA41Nigi7t4JwPCIVCOwTCJr2raDR6Guf8zcbijwdYJBKZwxib6DjO3eFweLZ0IAUNYNv2fwDAY/V0d5FlWasFDeVLN5FI5E+GYbzEOR+YHNB9j3HO/1ZdXT2gqKholy+GCBjEtu2ZAHBffV05jtM1HA5vEzBUWl1kjZhisdibjuP0NwyjfzAY/KKkpKSLYRifAMAvpml2Zow5aXmQ5Ys2bNjQoqCgAAm2rWeKrsRk2/a1jLExnPNJpml+VlpaWhCPx8cxxh4GgIcsy/rPLMPdoOEjkchIxti/J26aZlnWX1FpHDhwYAwAzE2s2h8wTXNqgzpU4OKSkpJ+hmF8lFwATQqFQo8oYFZaJti2fS/Oo6qqqpN0emnX51wkElnAGLsJAMYnFcXPyfhMMgxjYjAYLE0LGEUv2rZt279UV1fvA4D/M02zt59ZoKwQ0+bNm0/Kzc39hjE2yzRNnKxui0Qif2GMPR0IBM4rLCxEklK+lZWV5VdUVMwCgBcTChBfhLfrSkx1gV1SUlJgGMYvALAm8XK/UPmAHMVAjFdlZWUlAKy0LOtSnfzZuHFjy/z8/GhiZVsNAB1xAUHElJ0Ibt26td2hQ4f+DgCvWZZ1VXaskDtqNBqdxTm/BwB8V7NZISas98/JyVnHGOtnmuY6D17btrsBQClj7C+maT4rF3bxvUcikScaGzFhuoIxhvtL/2VZ1vXiUfO3x6Qy38o5fzQUCuFDp02LxWLPO44zAtPdjuP8j87EBAD/yM3N/XM4HP5WmwCkGGrbNpLRq8kU91okqurq6godU/h14Z9CvJ9allXf3pO00GWFmGzbHgUACw3DCKbKXdyrcRznR8bYg6ZpTpHmtaSOGykxTUqm8oZZlvWWJOikdltSUnJGIBCwOOcnA8DopOIosizre6kDC+zctu1LEhvs73HORwQCgWLHccp0JSbO+X/jojQJz17O+ZxQKIRZB21aSUnJXYZhPGoYxpB4PD6bMXZq0vhP8/LyrurSpQuqKW1bNBp9inM+Licn5/xu3bp97LcjWSGmSCTivuwcx+kYDoe/9pxOVumVc87nhkKh2/0GI9PxGhsxlZaWnhuPx3FSrjFN82Jd9v1qxzEajeIG9TXevyfTxdO6dev2Y6Yx9+P+L7/88tiamhrMJKw1TXNkLBbrpDkx/c0wjGmJ57wVAIxLpMMKOec3h0KhBX7gKWIM71lPFgnhXtPKRKFNCPcvsfjBsqwgY6xGxFh+91FSUtLBMAwsdMpa+j4rxBSLxW50HGdRPB7v2b1792IP+BT5ON6yrKf8Dkim4zUmYkqWjyIp7TMM4zRdy8VTYxqLxf7VcZwBif2ZpYyxJaZp3phpzP24P5HiXgYAmP4uRDLVlZhisVhhIgV5gWEY84PBIO6TgbfBzhhbb5pmXz/wFDFGNBrFveQnau8xRaPRiagAa7/bRIzpVx/RaHQxVhgnjlWcGQ6HN/g1buo4WSEm27ZxE30VAPybZVn40LnNW6FzzgeFQqEPsgFIJmM2FmJKvkBwQv5cVVV1dmOooEqNq23b7yUqjS5p3rx50w4dOmAhhLItFov1cRzHLQTCFBj+lzGGRyxOwzJ+PGdWXV09VvPzf59wzrtbltVC2UDUMiwWi13sOM4HjLE7TNOcU8c7bEQoFHpdF388O719/mwXB2WFmJKVXv8AgL+apjnQK0P0mBoATrQsa7duQW0MxGTb9ikYlyT2Z1mW9ZVucfDsxZREkyZNqlPz/ZxzFovFPsYXoWmarVVPt6APgUBgUqLMOs/zizHW0nGcoZzziGEYGzAtVlhYiM+T0q20tNQ0DOOnrl277vEMLS4ubpWTk4PnfdZbljVYaQdSjEvJ7qwwTXOI9w6LRCKTEwfTZyTON3XW6fBzCjGhUBjhOE6vcDi8OVvxyAoxobORSOR+xth0lMK4qYtff+Ccj2GM3WOa5qPZAqSh4yb3xa5O7JnlowLknOMK924ssU6cpF5bWFiIZ5y0aMmXhJ08kDoPv5LgGe44DubLX9ep6igajb7GOb+Sc/5CYrP9E8Mw8AsDl3POhwDAc5Zl3apFYI5crWu5xxSNRlEZ9QGAeYZhfJ4oGigAAHzmQ1hEEAwG39UpHpFI5GbG2DysWEWFAQC4x4SHVLO2N5MJfsn0PZLRG5ZlXZFJX5nemzViwpWrbdtTGGN3Jr/6gJtty0zTRMLSZtMwRfoeEQssHTdNc26mQfLrfq+Uur7xEgc7++j0VY6ysrI2VVVV43HBk3IAei9jbFEwGMS5p808S41JysHH0ZZlLfRrfmQ6Du7xxePx2xljY5PPPKYnI7hAtSwLv9ChXbNtG99fVwNAz2QhxNuO44wNh8PlujmT9GV27WrpbPiRNWLynEWCKi0t/VNj2FzPRgBpzPQQwC90NGvWLKCT4vs9z1CpFxUV/Zqe9+pdhefjAoHAoWAwiIe3tW/oj2VZB3Vd7GAAOOfGpk2bmqgwr7JOTNrPSHKAECAECAFCQCgCRExC4aTOCAFCgBAgBDJFgIgpUwTpfkKAECAECAGhCBAxCYWTOiMECAFCgBDIFAEipkwRpPsJAUKAECAEhCJAxCQUTuqMECAECAFCIFMEiJgyRZDuJwQIAUKAEBCKABGTUDipM0KAECAECIFMESBiyhRBup8QIAQIAUJAKAJpERP+4mxlZaU236+rDyH8KnMgEICampqDQlHMQmfoC+dcez9ycnKOaQzx2LVr10OtWrWqatGiBX7/UetWXl7+94KCgvZaOwEAOLfi8Th+0YCeE0WCWVFRMaVfv374yxK/29IiJtu2py1evHhqcfHhn046Wr9K/v3mm28+tGfPHmfFihX4wVVt24QJE2oqKyv5/Pnzc7V1AgBuvPFGOPHEEyunT5/eRHc/OnbsODsvL6/m1VdfvVf35+TWW2+t2rlzZ87KlSsDOsdl8uTJNWvXrq3asGEDfixW2zZq1Cinffv2NTNmzDj8hXkdncHnPRgMzuzVq9fko9nfIGJavHjx0fpT+u/PPfecS0wzZszQmpimTJlS1a5dO2Ps2LHaE9PgwYMrhw4dqj0xDRs27DAx6f6cLFiwwCWmmTNnak1My5cvd4lp3rx5WhPT6NGjawYOHOgMHz5ce2IaOXIkEVNtliRiUmvdgCsoIia1YoLWEDGpFRMipnri4aXydF8JEjGp9cARMakVD88aIia14kLERMSk1oysxxpK5akVJiRYSuWpFRO0hlJ5asUEnxNK5dURE1JM6k1USuWpFRNK5akXD1JMpJjUm5V1WESKSa0wkWJSKx6eNaSY1IoLKaZ64kGKSb2JSopJrZiQYlIvHqSYSDGpNytJMSkfE1JMaoaIFJNacSHFRIpJrRlZjzVUladmmKgqT624kGIixaTWjKzHGtpjUitMpJjUigftMakZD1JMpJjUnJm1rCLFpGaYSDGpFRdSTKSY1JqRpJi0iAcpJjXDRHtMasWFFBMpJrVmJO0xaREPz0hSTGqFixQTKSa1ZiQpJi3iQYpJzTCRYlIrLqSYSDGpNSNJMWkRD1JMaoaJFFMWFBP+cF+XLl3g9NNPh4qKCtiyZQts27ZNygzx44Dt8ccfD/3794d33nkH9u/fL8UPmVV5LVu2hDPOOAN/JwkqKyth+/bt8MUXXwD+4JroJrP4IdWPqqoqKCsrk+oHfStP9OzIvD9STJljKLIHbRSTYRgwd+5c6N69O/z666/QrFkzFwf8tzfffFMkJm5fMokJCXbEiBEwduxYd6x77rkHPvvsM+E+YIeyiGnQoEEwadIk1+bUeKAf999/P+ALXmSTRUwDBw6Ee++99wg/Pv/8c5g8ebIUP4iYRM4MMX0RMYnBUVQv2hDTsGHDYOLEiTB79mx47733oEmTJvDwww9Dz5494YorroC9e/eKwkQ6MT3yyCNw5plnHrZXR2K64447oGnTprBw4UL47rvvoHXr1jBhwgTo27cv3Hnnna7iENlkEdP48eOhoKAAFi1aBN9//z2gerrtttvgwgsvBPRx48aNIt1wf4nXT2LKz893n4+PP/4Yvv32W6G+YGeyih/Q7osuughyc4/8fUvMlHz11VdCfZFNTM2bN4cePXrAqaeeCtXV1ZD4eSA34yO6yUrl4fuqXbt2dZqLz/+nn34q1BVtiOmNN96AH3/8EcaMGXMYgFNOOQXwd5+ef/55WLp0qVBgZCqmq666yiXSmpoamDlzppaKqS6wUc0++eST+LKCF198UWg8ZBFTXUaapgnPPvssPPPMM7Bs2TLhfvhJTEiyV155JWYA4JVXXhHqi0xiKiwshHnz5tVpLz7zon/vTSYxdezYER566KEjXuz4MkdVLjL1LYuYMBYYk7oaZkwuvvhioXNLC2LKy8uDtWvXuqvaJUuW/AaADz/8EDDtMnXqVKHAyCQmz9A+ffo0KmLCVRWqwVmzZsH7778vNB5+EtMll1ziLhZkKFk/FRNmEzDVjW3+/Pnw0ksvCY2JTGKyLMtdGDzwwAPusy+7ySImTNsj7qg2UIEXFxe7rmAKuV+/fnDXXXdpQUx14V9UVARPPPGE6x/OL5FNC2I64YQTXOcfe+wxePfdd3/jP5IVSuNbbrlFJC5S95gaIzHhHiCSUu/evWH48OGwb98+ofGQTUznnnuum47s0KEDDB061N3zu++++4S+NBAQv4gJ05OYRTh06JD7UiRi+v3pKIuYvMVnXe8uoQ9IsjNZiqm2rYwxd0517doVBg8eDAcOHBDqjhbE5KVWHnzwQVi9evVvAMBV1THHHAPXX3+9UGBIMTUMzuuuuw5uuukmKWlV74Uu62cvcFX72muvQZs2bQ47PWfOHFixYoWbbhXZ/CImVHu433f33XfD008/rTUxffTRR25sMJUvMu2VGldZxIQq6fLLL3f3LHEBfdxxx7mLNvz/MppfxHTOOee46UkZaVXveVf+F2yxrPrll1+uswIP9zJ27drlrm5FNiKm9NH0KvTWrVsH06dPB8dx0r85zStlKybPDFTnl156KVx99dVucc0HH3yQpoXpXeYHMXkpVUxvY+k7Pju6KiY8goCKz6vCXbVqlZs5EV31KYuYsFgL95hwcYCLBc8PnFf4N9ELHz+ICRdySEht27Z19y8PHjyY3uRvwFVaKCas/sIJ+fbbb7s5Ta95/y4jx0nElN4suuCCC9z9Pdznw8UBpo5kNL+ICW3HijA8WxaNRt0KQ5FNNjFhVSGm8DZt2uTuz3iLOl2JCbHHZx5ffqg6kHRxzwl9E9lkERPG4uSTT3ZNRRX+zTffwHnnnYeVme4ce/zxx0W6AX4Qk/fMyyhy8sDQgpjQWFwlYUoPS19/+eUX136sBMGXIZ6bWb9+vdAAEzEdHc6zzjrLLXTYvHmze6YJD9nKarKICSs79+zZ4x7Y9hquarGoBkusp0yZItQl2cSEihWrIzG1/fPPP2tLTLhHhikwVBY//fTT4RhgBS6WXA8YMECoapJFTKi6zz777CP2x/HfsXwcC21EpidlE5NXzNGqVSuXXLEiT0bThph69erlrji2bt3qrjRwoxr3NHCljnl0zrlQfGQSE66Y0H58wHBioj87duyAr7/+WvjZBlkHbLt163a4EgdX46kTtLy8/Ii9wEyDI4uYkICwvfXWW24M8LzJZZddBp06dXLTkri/IbLJJKZwOAxPPfWUay4uFrAhyeIGNZLv7t273RckntcS1WSdY6rPvhtuuAFGjRoFuKe5c+dOUW6ALGLC4y3XXnute8wF311ew4XD6NGj3Zf7Dz/8IMwP2cTkVazKOEqRCoI2xIRG44bbuHHj3JwzvghRJeEKSmRgPXBkERNWsyxfvvw3G+3emHiuwfsKgaiZKouYMK2CZzDqahgbrGxLVSGZ+iOLmLAK75prrnEPc3oN9yxfeOEFWLNmTaZmH3G/TGLCjfWRI0f+5lAqEi1WhuFeTWlpqbs3gEUEoposYjr22GMBV+WpB2lTKz+xsEOk0pBFTF5VHu4xYYENNvQD05M494YMGSIqFG4/MokJU9yeD3gWU3aGRPnih9qRw4cNX3oiJ2btMWQRk9BZmEZnsogpjaGFXiKLmFKNbNGihbsZLSs9gWPJJKa6ANd1j8lTRli2j//DYgcs6ce0GB4UxgPDIpssYkIbcasBv4mJiwJc9KAfSKwy9mhkEpP39R3MXGGGQWbTSjHJBIKIyU90Gz6WH8TUcKsafoffxITFEFj2jmfMVq5c2XCDj3KHLMWEq3Os9sSVufcpHCyzRl9QzYpO3cskJizSwlQeEhKWveMHm/FLNqK/ViNbMWEVIVatYhpSVrm7N92ImOp58EgxCX+HZdQhEdMfhw+/Kykr7SKLmFK9RfuRqLCYQ1aTSUypNuNCQaYfMhVTTk6O64roEve6YkrERMQk61kX2i8Rk1A4hXXmBzEJM/Z3OvKLmGT7IpOYZNue2j8RExGTn/PtD49FxPSHoZN6IxGTVHgb3DkRUz2QJT7nPm3x4sVTRX/9t8ERyvAGSuVlCKDg24mYBAMqqDsiJkFACuqGiImISdBUktsNVeXJxbehvftd/NBQ+xp6PRFTQxGTez0RExGT3BkmqHciJkFACuqGiEkQkIK7oT0mwYBm2B3tMdUDIKXyMpxZgm+nVJ5gQAV1R4pJEJCCuiHFRIpJ0FSS2w0pJrn4NrR3UkwNRcyf60kx+YNzuqOQYiLFlO5cyep1pJiyCn+9g5NiUisupJhIMak1I+uxhhSTWmEixaRWPDxrSDGpFRdSTKSY1JqR9VhDiknNMJFiUisupJhIMak1I0kxaREPUkxqhokUk1pxIcVEikmtGUmKSYt4eEaSYlIrXKSYSDGpNSNJMWkRD1JMaoaJFJNacSHFRIpJrRlJikmLeJBiUjNMpJhIMak5M2tZRVV5aoWJFJNa8fCsIcWkVlxIMZFiUmtGkmLSIh6kmNQMEykmUkxqzkxSTErHhRSTmuEhxaRWXEgxkWJSa0aSYtIiHqSY1AwTKaZ64lJcXHx+Tk7OurKysn1qhi49qzp37tyGcw7bt2/X2o9mzZrltm/fvpXu8WCM5Xbq1El7P3D2tW3bdkl5efm6du3ava97XBrLc9KpU6c2jDHQPR6N6Tk56aSTFvTq1Wvy0d7Y7GgXeH9Hckr3WrqOEPhnQ6BHjx7r0Wd6Tv7ZIk/+NgQB7zk52j1pE9PROqK/EwKEACFACBACIhAgYhKBIvVBCBAChAAhIAwBIiZhUFJHhAAhQAgQAiIQIGISgSL1QQgQAoQAISAMASImYVBSR4QAIUAIEAIiECBiEoEi9UEIEAKEACEgDAEiJmFQUkeEACFACBACIhAgYhKBIvVBCBAChAAhIAyB/weI245v0/m1twAAAABJRU5ErkJggg==#dark)

**Figure 2.** 1D layout

The 2D row-major matrix layout ((2, 4):(4, 1)) has two modes, 2:4 (the first numbers from each tuple) and 4:1 (the second numbers from each tuple). Taking them right to left, the second mode describes 4 columns with a stride of one. The first mode specifies that there are two of these groups with a stride of 4:

![](../../../assets/images/2d-layout-with-strides-a6d958d9d61c13a4aa3982ad8fb51090.png#light) ![](../../../assets/images/2d-layout-with-strides-dark-5b0b0b49f7108d4ee14c180eb472f340.png#dark)

**Figure 3.** 2D layout with strides

In a column-major layout, the row number varies the fastest, so a column-major 2x4 matrix has the layout ((2, 4):(1, 2)) and looks like this:

![](../../../assets/images/2d-col-major-layout-with-strides-f9d43f612f4e3b2e42054492c7b643e3.png#light) ![](../../../assets/images/2d-col-major-layout-with-strides-dark-2183ca1ceb8cab7e8c02b77d9b83d7f7.png#dark)

**Figure 4.** 2D column-major layout with strides

A layout’s *rank* is the number of modes in its shape. A rank-1 (or 1D) layout describes a vector. A rank-2 layout describes a 2D matrix, and so on.

A layout’s *size* is defined as the product of all of the modes in the layout’s shape. To put it another way, it’s the number of elements that the layout addresses: that is, the *domain* of the layout function.

Modes can also be nested to represent more complicated strides along a dimension. For example, the layout (8:1) represents a 1D vector of 8 elements.

![](data:image/png;base64,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#light) ![](data:image/png;base64,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#dark)

**Figure 5.** 1D vector layout

The layout (((4, 2):(1, 4))) is *also* a 1D vector of 8 elements. The extra set of parentheses indicates a nested or hierarchical mode. Instead of being represented by a single mode like 8:1, this layout’s single dimension is represented by the multi-mode (4, 2):(1, 4):

![](../../../assets/images/1d-multi-modal-layout-0c77280d14df2f535954aacde7909bd9.png#light) ![](../../../assets/images/1d-multi-modal-layout-dark-0d3fb48db46462b1995ba90d817bf868.png#dark)

**Figure 6.** 1D layout with nested modes

Note that in the nested modes, there’s no notion of row and column. You can think of the first mode as the “inner” mode (defining a group) and the next mode as an “outer” mode (defining a repeat of the group) as shown above.

A set of nested modes (a *multi-mode*) counts as a single mode when considering the parent layout’s rank. For example, the layouts (8:1) and (((4, 2):(1, 4))) are both rank-1 layouts.

This gets more interesting when we move to two dimensions. Consider the following 2D layouts:

![](../../../assets/images/multi-modal-layout-3d3778aabbc2744c4960b264431db440.png#light) ![](../../../assets/images/multi-modal-layout-dark-6feab186676425fd8dc2a46eb99fcb31.png#dark)

**Figure 7.** Two 2D layouts

Layouts A and B are both 2D matrix layouts with the same overall 2D shape, but with the elements in a different order. Layout B is *tiled*, so instead of being in row-major or column-major order, four consecutive indices are grouped into each 2x2 tile. This is sometimes called *tile-major order*.

We can break this tiled layout into two modes, one for the rows and one for the columns:

- Layout B has a row mode of (2, 2):(1, 4). We can further break this into two sub-modes: the inner mode, 2:1, defines a group of two rows with a stride of one. The outer mode, 2:4, specifies that the group occurs twice with a stride of 4.
- The column has the mode (2, 2):(2, 8). Once again we can break this into two sub-modes: (2:2) defines a group of two columns with a stride of two, and the group occurs twice with a stride of 8 (2:8).

If all of those modes are swimming before your eyes, take a moment to study the figure and trace out the strides yourself.

### Coordinates[​](layouts.html#coordinates "Direct link to Coordinates")

Coordinates for layouts can be written in the same format as the shape tuple. For example, coordinates for layout B above can be written ((*i, j*), (*k, l*)). However, this layout can also be addressed as a logical 2D matrix, just like layout A. So ((0, 1), (0, 1)) and (2, 2) are both valid coordinates that map to the same index.

In fact, this is true for any layout: the layout can be addressed with 1D or 2D coordinates as well as its “natural” coordinates. When mapping coordinates, the dimensions are traversed in *colexicographical* order (that is, a generalized column-major order, where the leftmost coordinate varies fastest). Table 1 shows how different 1D and 2D coordinates map to the “natural” coordinates of the ((2, 2), (2, 2)) shape shown above:

| 1D  | 2D     | Natural          |
|-----|--------|------------------|
| 0   | (0, 0) | ((0, 0), (0, 0)) |
| 1   | (1, 0) | ((1, 0), (0, 0)) |
| 2   | (2, 0) | ((0, 1), (0, 0)) |
| 3   | (3, 0) | ((1, 1), (0, 0)) |
| 4   | (0, 1) | ((0, 0), (1, 0)) |
| 5   | (1, 1) | ((1, 0), (1, 0)) |
| 6   | (2, 1) | ((0, 1), (1, 0)) |
| 7   | (3, 1) | ((1, 1), (1, 0)) |
| 8   | (0, 2) | ((0, 0), (0, 1)) |
| ... | ...    | ...              |
| 15  | (3, 3) | ((1, 1), (1, 1)) |

**Table 1.** Mapping between 1D, 2D, and natural coordinates

## Making layouts[​](layouts.html#making-layouts "Direct link to Making layouts")

There are multiple ways to create layouts. The [`row_major()`](https://docs.modular.com/mojo/stdlib/layout/layout/Layout/#row_major) and [`col_major()`](https://docs.modular.com/mojo/stdlib/layout/layout/Layout/#col_major) static methods are probably the simplest ways to create a layout. The `row_major()` method creates a generalized row-major layout: that is, the rightmost coordinate varies the fastest. The `col_major()` method creates a generalized column-major layout, where the leftmost coordinate varies the fastest.

```mojo
print(Layout.row_major(4, 4, 4))
print(Layout.col_major(4, 4, 4))
```

```mojo
print(Layout.row_major(4, 4, 4))
print(Layout.col_major(4, 4, 4))
```

Output:

```plaintext
((4, 4, 4):(16, 4, 1))
((4, 4, 4):(1, 4, 16))
```

```plaintext
((4, 4, 4):(16, 4, 1))
((4, 4, 4):(1, 4, 16))
```

If you know the shape and strides in advance, you can construct an arbitrarily complex layout using the `Layout` constructor. For example:

```mojo
var tiled_layout = Layout(
    IntTuple(IntTuple(3, 2), IntTuple(2, 5)), # shape
    IntTuple(IntTuple(1, 6), IntTuple(3, 12)) # strides
)
print_layout(tiled_layout)
```

```mojo
var tiled_layout = Layout(
    IntTuple(IntTuple(3, 2), IntTuple(2, 5)), # shape
    IntTuple(IntTuple(1, 6), IntTuple(3, 12)) # strides
)
print_layout(tiled_layout)
```

Output:

```plaintext

(((3, 2), (2, 5)):((1, 6), (3, 12)))
       0    1    2    3    4    5    6    7    8    9
    +----+----+----+----+----+----+----+----+----+----+
 0  |  0 |  3 | 12 | 15 | 24 | 27 | 36 | 39 | 48 | 51 |
    +----+----+----+----+----+----+----+----+----+----+
 1  |  1 |  4 | 13 | 16 | 25 | 28 | 37 | 40 | 49 | 52 |
    +----+----+----+----+----+----+----+----+----+----+
 2  |  2 |  5 | 14 | 17 | 26 | 29 | 38 | 41 | 50 | 53 |
    +----+----+----+----+----+----+----+----+----+----+
 3  |  6 |  9 | 18 | 21 | 30 | 33 | 42 | 45 | 54 | 57 |
    +----+----+----+----+----+----+----+----+----+----+
 4  |  7 | 10 | 19 | 22 | 31 | 34 | 43 | 46 | 55 | 58 |
    +----+----+----+----+----+----+----+----+----+----+
 5  |  8 | 11 | 20 | 23 | 32 | 35 | 44 | 47 | 56 | 59 |
    +----+----+----+----+----+----+----+----+----+----+
```

```plaintext

(((3, 2), (2, 5)):((1, 6), (3, 12)))
       0    1    2    3    4    5    6    7    8    9
    +----+----+----+----+----+----+----+----+----+----+
 0  |  0 |  3 | 12 | 15 | 24 | 27 | 36 | 39 | 48 | 51 |
    +----+----+----+----+----+----+----+----+----+----+
 1  |  1 |  4 | 13 | 16 | 25 | 28 | 37 | 40 | 49 | 52 |
    +----+----+----+----+----+----+----+----+----+----+
 2  |  2 |  5 | 14 | 17 | 26 | 29 | 38 | 41 | 50 | 53 |
    +----+----+----+----+----+----+----+----+----+----+
 3  |  6 |  9 | 18 | 21 | 30 | 33 | 42 | 45 | 54 | 57 |
    +----+----+----+----+----+----+----+----+----+----+
 4  |  7 | 10 | 19 | 22 | 31 | 34 | 43 | 46 | 55 | 58 |
    +----+----+----+----+----+----+----+----+----+----+
 5  |  8 | 11 | 20 | 23 | 32 | 35 | 44 | 47 | 56 | 59 |
    +----+----+----+----+----+----+----+----+----+----+
```

The result is a 6x10 tile-major layout. The layout is indexed vertically in 2 groups of 3 rows (3, 2) : (1, 6) ( and horizontally in 5 groups of 2 columns (2, 5):(3, 12). Alternatively, you can think of this as a layout consisting of 3x2 column-major tiles ((3, 2):(1, 3)) that are arranged into two rows of 5, ((2, 5):(6, 12)).

The `Layout` constructor works fine if you know the shape and strides in advance, but calculating the strides for a complicated layout isn’t always intuitive.

An easier way to generate this layout is the [`tile_to_shape()`](https://docs.modular.com/mojo/stdlib/layout/layout/tile_to_shape) function. This takes a layout (representing the tile) and a final shape to tile to:

```mojo
var tts = tile_to_shape(Layout.col_major(3, 2), IntTuple(6, 10))
print_layout(tts)
```

```mojo
var tts = tile_to_shape(Layout.col_major(3, 2), IntTuple(6, 10))
print_layout(tts)
```

Output:

```plaintext
(((3, 2), (2, 5)):((1, 6), (3, 12)))
       0    1    2    3    4    5    6    7    8    9
    +----+----+----+----+----+----+----+----+----+----+
 0  |  0 |  3 | 12 | 15 | 24 | 27 | 36 | 39 | 48 | 51 |
    +----+----+----+----+----+----+----+----+----+----+
 1  |  1 |  4 | 13 | 16 | 25 | 28 | 37 | 40 | 49 | 52 |
    +----+----+----+----+----+----+----+----+----+----+
 2  |  2 |  5 | 14 | 17 | 26 | 29 | 38 | 41 | 50 | 53 |
    +----+----+----+----+----+----+----+----+----+----+
 3  |  6 |  9 | 18 | 21 | 30 | 33 | 42 | 45 | 54 | 57 |
    +----+----+----+----+----+----+----+----+----+----+
 4  |  7 | 10 | 19 | 22 | 31 | 34 | 43 | 46 | 55 | 58 |
    +----+----+----+----+----+----+----+----+----+----+
 5  |  8 | 11 | 20 | 23 | 32 | 35 | 44 | 47 | 56 | 59 |
    +----+----+----+----+----+----+----+----+----+----+
```

```plaintext
(((3, 2), (2, 5)):((1, 6), (3, 12)))
       0    1    2    3    4    5    6    7    8    9
    +----+----+----+----+----+----+----+----+----+----+
 0  |  0 |  3 | 12 | 15 | 24 | 27 | 36 | 39 | 48 | 51 |
    +----+----+----+----+----+----+----+----+----+----+
 1  |  1 |  4 | 13 | 16 | 25 | 28 | 37 | 40 | 49 | 52 |
    +----+----+----+----+----+----+----+----+----+----+
 2  |  2 |  5 | 14 | 17 | 26 | 29 | 38 | 41 | 50 | 53 |
    +----+----+----+----+----+----+----+----+----+----+
 3  |  6 |  9 | 18 | 21 | 30 | 33 | 42 | 45 | 54 | 57 |
    +----+----+----+----+----+----+----+----+----+----+
 4  |  7 | 10 | 19 | 22 | 31 | 34 | 43 | 46 | 55 | 58 |
    +----+----+----+----+----+----+----+----+----+----+
 5  |  8 | 11 | 20 | 23 | 32 | 35 | 44 | 47 | 56 | 59 |
    +----+----+----+----+----+----+----+----+----+----+
```

A variation on `tile_to_shape()` is the [`blocked_product()`](https://docs.modular.com/mojo/stdlib/layout/layout/blocked_product) function. The main difference is that where `tile_to_shape()` takes an output *shape*, `blocked_product()` takes a *tiler* layout: essentially, every element in the tiler layout is replaced by a tile. The following example generates the same tiled layout using `blocked_product()`. It also prints out the two input layouts.

```mojo
# Define 2x3 tile
var tile = Layout.col_major(3, 2)
# Define a 2x5 tiler
var tiler = Layout.col_major(2, 5)
var blocked = blocked_product(tile, tiler)

print("Tile:")
print_layout(tile)
print("\nTiler:")
print_layout(tiler)
print("\nTiled layout:")
print(blocked)
```

```mojo
# Define 2x3 tile
var tile = Layout.col_major(3, 2)
# Define a 2x5 tiler
var tiler = Layout.col_major(2, 5)
var blocked = blocked_product(tile, tiler)

print("Tile:")
print_layout(tile)
print("\nTiler:")
print_layout(tiler)
print("\nTiled layout:")
print(blocked)
```

Output:

```plaintext
Tile:
((3, 2):(1, 3))
      0   1
    +---+---+
 0  | 0 | 3 |
    +---+---+
 1  | 1 | 4 |
    +---+---+
 2  | 2 | 5 |
    +---+---+

Tiler:
((2, 5):(1, 2))
       0    1    2    3    4
    +----+----+----+----+----+
 0  |  0 |  2 |  4 |  6 |  8 |
    +----+----+----+----+----+
 1  |  1 |  3 |  5 |  7 |  9 |
    +----+----+----+----+----+

Tiled layout:
(((3, 2), (2, 5)):((1, 6), (3, 12)))

```

```plaintext
Tile:
((3, 2):(1, 3))
      0   1
    +---+---+
 0  | 0 | 3 |
    +---+---+
 1  | 1 | 4 |
    +---+---+
 2  | 2 | 5 |
    +---+---+

Tiler:
((2, 5):(1, 2))
       0    1    2    3    4
    +----+----+----+----+----+
 0  |  0 |  2 |  4 |  6 |  8 |
    +----+----+----+----+----+
 1  |  1 |  3 |  5 |  7 |  9 |
    +----+----+----+----+----+

Tiled layout:
(((3, 2), (2, 5)):((1, 6), (3, 12)))

```

As you can see, `blocked_product()` combines two simple layouts to generate a more complex one.

Finally, if you know the *shape* you want and the *order* in which you want to iterate through the dimensions, you can use the [`make_ordered_layout()`](https://docs.modular.com/mojo/stdlib/layout/layout/make_ordered_layout) function. For example, the following example is yet one more way to generate the previous tiled layout:

```mojo
var ordered = make_ordered_layout(
    IntTuple(IntTuple(3, 2), IntTuple(2, 5)), # shape
    IntTuple(IntTuple(0, 2), IntTuple(1, 3))  # order
)
print(ordered)
```

```mojo
var ordered = make_ordered_layout(
    IntTuple(IntTuple(3, 2), IntTuple(2, 5)), # shape
    IntTuple(IntTuple(0, 2), IntTuple(1, 3))  # order
)
print(ordered)
```

Output:

```plaintext
(((3, 2), (2, 5)):((1, 6), (3, 12)))
```

```plaintext
(((3, 2), (2, 5)):((1, 6), (3, 12)))
```

The generated layout's strides follow the same ordering as `order`—that is, the dimension with the smallest corresponding `order` value has the smallest stride value, and so on. The strides are computed such that the layout is dense—that is, the logical multidimensional array is contiguous.

## Non-contiguous layouts[​](layouts.html#non-contiguous-layouts "Direct link to Non-contiguous layouts")

All of the examples so far have been dense layouts, where all of the elements are contiguous in memory. However, layouts can also describe sparse logical arrays. For example, a (4:2) layout is a sparse 1D array:

![](../../../assets/images/1d-sparse-layout-4fd9df7c082c54f2d55ab22382daa80e.png#light) ![](../../../assets/images/1d-sparse-layout-dark-32803c316de7708d72977e236a739b08.png#dark)

**Figure 8.** 1D sparse layout (4:2)

A layout’s *cosize* is the size of the layout’s codomain, which you can think of as the size of the smallest contiguous array that can contain all of the layout’s elements. The cosize is the largest linear index value generated by the layout plus 1. So in the example in Figure 9, the layout has a size of 4, but a cosize of 7.



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Flayout%2Flayouts)

- [What’s a Layout?](layouts.html#whats-a-layout)

  - [IntTuple: representing hierarchical shapes and strides](layouts.html#inttuple-representing-hierarchical-shapes-and-strides)
  - [Modes](layouts.html#modes)
  - [Coordinates](layouts.html#coordinates)
- [Making layouts](layouts.html#making-layouts)
- [Non-contiguous layouts](layouts.html#non-contiguous-layouts)











Death of a value | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



- [Mojo](https://docs.modular.com/mojo)
- /[Manual](../index.html)
- /Value lifecycle
- /Death of a value

<!--THE END-->

- [Mojo](https://docs.modular.com/mojo)
- /[Manual](../index.html)
- /Value lifecycle
- /Death of a value

# Death of a value

As soon as a value/object is no longer used, Mojo destroys it. Mojo does *not* wait until the end of a code block—or even until the end of an expression—to destroy an unused value. It destroys values using an “as soon as possible” (ASAP) destruction policy that runs after every sub-expression. Even within an expression like `a+b+c+d`, Mojo destroys the intermediate values as soon as they're no longer needed.

Mojo uses static compiler analysis to find the point where a value is last used. Then, Mojo immediately ends the value's lifetime and calls the `__del__()` destructor to perform any necessary cleanup for the type.

For example, notice when the `__del__()` destructor is called for each instance of `MyPet`:

```mojo
@value
struct MyPet:
    var name: String
    var age: Int

    fn __del__(owned self):
        print("Destruct", self.name)

fn pets():
    var a = MyPet("Loki", 4)
    var b = MyPet("Sylvie", 2)
    print(a.name)
    # a.__del__() runs here for "Loki"

    a = MyPet("Charlie", 8)
    # a.__del__() runs immediately because "Charlie" is never used

    print(b.name)
    # b.__del__() runs here

pets()
```

```mojo
@value
struct MyPet:
    var name: String
    var age: Int

    fn __del__(owned self):
        print("Destruct", self.name)

fn pets():
    var a = MyPet("Loki", 4)
    var b = MyPet("Sylvie", 2)
    print(a.name)
    # a.__del__() runs here for "Loki"

    a = MyPet("Charlie", 8)
    # a.__del__() runs immediately because "Charlie" is never used

    print(b.name)
    # b.__del__() runs here

pets()
```

```output
Loki
Destruct Loki
Destruct Charlie
Sylvie
Destruct Sylvie
```

```output
Loki
Destruct Loki
Destruct Charlie
Sylvie
Destruct Sylvie
```

Notice that each initialization of a value is matched with a call to the destructor, and `a` is actually destroyed multiple times—once for each time it receives a new value.

Also notice that this `__del__()` implementation doesn't actually do anything. Most structs don't require a custom destructor, and Mojo automatically adds a no-op destructor if you don't define one.

### Default destruction behavior[​](death.html#default-destruction-behavior "Direct link to Default destruction behavior")

You may be wondering how Mojo can destroy a type without a custom destructor, or why a no-op destructor is useful. If a type is simply a collection of fields, like the `MyPet` example, Mojo only needs to destroy the fields: `MyPet` doesn't dynamically allocate memory or use any long-lived resources (like file handles). There's no special action to take when a `MyPet` value is destroyed.

Looking at the individual fields, `MyPet` includes an `Int` and a `String`. The `Int` is what Mojo calls a *trivial type*. It's a statically-sized bundle of bits. Mojo knows exactly how big it is, so those bits can be reused to store something else.

The `String` value is a little more complicated. Mojo strings are mutable. The `String` object has an internal buffer—a [`List`](https://docs.modular.com/mojo/stdlib/collections/list/List) field, which holds the characters that make up the string. A `List` stores its contents in dynamically allocated memory on the heap, so the string can grow or shrink. The string itself doesn't have any special destructor logic, but when Mojo destroys a string, it calls the destructor for the `List` field, which de-allocates the memory.

Since `String` and `Int` don't require any custom destructor logic, they both have no-op destructors: literally, `__del__()` methods that don't do anything. This may seem pointless, but it means that Mojo can call the destructor on any value when its lifetime ends. This makes it easier to write generic containers and algorithms.

### Benefits of ASAP destruction[​](death.html#benefits-of-asap-destruction "Direct link to Benefits of ASAP destruction")

Similar to other languages, Mojo follows the principle that objects/values acquire resources in a constructor (`__init__()`) and release resources in a destructor (`__del__()`). However, Mojo's ASAP destruction has some advantages over scope-based destruction (such as the C++ [RAII pattern](https://en.cppreference.com/w/cpp/language/raii), which waits until the end of the code scope to destroy values):

- Destroying values immediately at last-use composes nicely with the "move" optimization, which transforms a "copy+del" pair into a "move" operation.
- Destroying values at end-of-scope in C++ is problematic for some common patterns like tail recursion, because the destructor call happens after the tail call. This can be a significant performance and memory problem for certain functional programming patterns, which is not a problem in Mojo, because the destructor call always happens before the tail call.

Additionally, Mojo's ASAP destruction works great within Python-style `def` functions. That's because Python doesn't really provide scopes beyond a function scope, so the Python garbage collector cleans up resources more often than a scope-based destruction policy would. However, Mojo does not use a garbage collector, so the ASAP destruction policy provides destruction guarantees that are even more fine-grained than in Python.

The Mojo destruction policy is more similar to how Rust and Swift work, because they both have strong value ownership tracking and provide memory safety. One difference is that Rust and Swift require the use of a [dynamic "drop flag"](https://doc.rust-lang.org/nomicon/drop-flags.html)—they maintain hidden shadow variables to keep track of the state of your values to provide safety. These are often optimized away, but the Mojo approach eliminates this overhead entirely, making the generated code faster and avoiding ambiguity.

## Destructor[​](death.html#destructor "Direct link to Destructor")

Mojo calls a value's destructor (`__del__()` method) when the value's lifetime ends (typically the point at which the value is last used). As we mentioned earlier, Mojo provides a default, no-op destructor for all types, so in most cases you don't need to define the `__del__()` method.

You should define the `__del__()` method to perform any kind of cleanup the type requires. Usually, that includes freeing memory for any fields where you dynamically allocated memory (for example, via `UnsafePointer`) and closing any long-lived resources such as file handles.

However, any struct that is just a simple collection of other types does not need to implement the destructor.

For example, consider this simple struct:

```mojo
struct MyPet:
    var name: String
    var age: Int

    fn __init__(out self, name: String, age: Int):
        self.name = name
        self.age = age
```

```mojo
struct MyPet:
    var name: String
    var age: Int

    fn __init__(out self, name: String, age: Int):
        self.name = name
        self.age = age
```

There's no need to define the `__del__()` destructor for this, because it's a simple collection of other types (`String` and `Int`), and it doesn't dynamically allocate memory.

Whereas, the following struct must define the `__del__()` method to free the memory allocated by its [`UnsafePointer`](https://docs.modular.com/mojo/stdlib/memory/unsafe_pointer/UnsafePointer):

```mojo
from memory import UnsafePointer

struct HeapArray:
    var data: UnsafePointer[Int]
    var size: Int

    fn __init__(out self, size: Int, val: Int):
        self.size = size
        self.data = UnsafePointer[Int].alloc(self.size)
        for i in range(self.size):
            (self.data + i).init_pointee_copy(val)

    fn __del__(owned self):
        for i in range(self.size):
            (self.data + i).destroy_pointee()
        self.data.free()
```

```mojo
from memory import UnsafePointer

struct HeapArray:
    var data: UnsafePointer[Int]
    var size: Int

    fn __init__(out self, size: Int, val: Int):
        self.size = size
        self.data = UnsafePointer[Int].alloc(self.size)
        for i in range(self.size):
            (self.data + i).init_pointee_copy(val)

    fn __del__(owned self):
        for i in range(self.size):
            (self.data + i).destroy_pointee()
        self.data.free()
```

Note that a pointer doesn't *own* any values in the memory it points to, so when a pointer is destroyed, Mojo doesn't call the destructors on those values.

So in the `HeapArray` example above, calling `free()` on the pointer releases the memory, but doesn't call the destructors on the stored values. To invoke the destructors, use the `destroy_pointee()` method provided by the `UnsafePointer` type.

You can't just call the destructor explicitly. Because `__del__()` takes `self` as an `owned` value, and owned arguments are copied by default, `foo.__del__()` actually creates and destroys a *copy* of `foo`. When Mojo destroys a value, however, it passes in the original value as `self`, not a copy.

It's important to notice that the `__del__()` method is an "extra" cleanup event, and your implementation does not override any default destruction behaviors. For example, Mojo still destroys all the fields in `MyPet` even if you implement `__del__()` to do nothing:

```mojo
struct MyPet:
    var name: String
    var age: Int

    fn __init__(out self, name: String, age: Int):
        self.name = name
        self.age = age

    fn __del__(owned self):
        # Mojo destroys all the fields when they're last used
        pass
```

```mojo
struct MyPet:
    var name: String
    var age: Int

    fn __init__(out self, name: String, age: Int):
        self.name = name
        self.age = age

    fn __del__(owned self):
        # Mojo destroys all the fields when they're last used
        pass
```

However, the `self` value inside the `__del__()` destructor is still whole (so all fields are still usable) until the destructor returns, as we'll discuss more in the following section.

Destructors cannot raise errors

Currently a Mojo destructor isn't allowed to raise an error. This means that the destructor must be defined as an `fn` function without the `raises` keyword. Mojo won't allow you to define a destructor using `fn raises` or `def`.

## Field lifetimes[​](death.html#field-lifetimes "Direct link to Field lifetimes")

In addition to tracking the lifetime of all objects in a program, Mojo also tracks each field of a structure independently. That is, Mojo keeps track of whether a "whole object" is fully or partially initialized/destroyed, and it destroys each field independently with its ASAP destruction policy.

For example, consider this code that changes the value of a field:

```mojo
@value
struct MyPet:
    var name: String
    var age: Int

fn use_two_strings():
    var pet = MyPet("Po", 8)
    print(pet.name)
    # pet.name.__del__() runs here, because this instance is
    # no longer used; it's replaced below

    pet.name = String("Lola") # Overwrite pet.name
    print(pet.name)
    # pet.__del__() runs here
```

```mojo
@value
struct MyPet:
    var name: String
    var age: Int

fn use_two_strings():
    var pet = MyPet("Po", 8)
    print(pet.name)
    # pet.name.__del__() runs here, because this instance is
    # no longer used; it's replaced below

    pet.name = String("Lola") # Overwrite pet.name
    print(pet.name)
    # pet.__del__() runs here
```

The `pet.name` field is destroyed after the first `print()`, because Mojo knows that it will be overwritten below. You can also see this behavior when using the transfer sigil:

```mojo
fn consume(owned arg: String):
    pass

fn use(arg: MyPet):
    print(arg.name)

fn consume_and_use():
    var pet = MyPet("Selma", 5)
    consume(pet.name^)
    # pet.name.__moveinit__() runs here, which destroys pet.name
    # Now pet is only partially initialized

    # use(pet)  # This fails because pet.name is uninitialized

    pet.name = String("Jasper")  # All together now
    use(pet)                     # This is ok
    # pet.__del__() runs here (and only if the object is whole)
```

```mojo
fn consume(owned arg: String):
    pass

fn use(arg: MyPet):
    print(arg.name)

fn consume_and_use():
    var pet = MyPet("Selma", 5)
    consume(pet.name^)
    # pet.name.__moveinit__() runs here, which destroys pet.name
    # Now pet is only partially initialized

    # use(pet)  # This fails because pet.name is uninitialized

    pet.name = String("Jasper")  # All together now
    use(pet)                     # This is ok
    # pet.__del__() runs here (and only if the object is whole)
```

Notice that the code transfers ownership of the `name` field to `consume()`. For a period of time after that, the `name` field is uninitialized. Then `name` is reinitialized before it is passed to the `use()` function. If you try calling `use()` before `name` is re-initialized, Mojo rejects the code with an uninitialized field error.

Also, if you don't re-initialize the name by the end of the `pet` lifetime, the compiler complains because it's unable to destroy a partially initialized object.

Mojo's policy here is powerful and intentionally straight-forward: fields can be temporarily transferred, but the "whole object" must be constructed with the aggregate type's initializer and destroyed with the aggregate destructor. This means it's impossible to create an object by initializing only its fields, and it's likewise impossible to destroy an object by destroying only its fields.

### Field lifetimes during destruct and move[​](death.html#field-lifetimes-during-destruct-and-move "Direct link to Field lifetimes during destruct and move")

The consuming-move constructor and destructor face an interesting situation with field lifetimes, because, unlike other lifecycle methods, they both take an instance of their own type as an `owned` argument, which is about to be destroyed. You don't really need to worry about this detail when implementing these methods, but it might help you better understand field lifetimes.

Just to recap, the move constructor and destructor method signatures look like this:

```mojo
struct TwoStrings:
    fn __moveinit__(out self, owned existing: Self):
        # Initializes a new `self` by consuming the contents of `existing`
    fn __del__(owned self):
        # Destroys all resources in `self`
```

```mojo
struct TwoStrings:
    fn __moveinit__(out self, owned existing: Self):
        # Initializes a new `self` by consuming the contents of `existing`
    fn __del__(owned self):
        # Destroys all resources in `self`
```

There are two kinds of "self" here: capitalized `Self` is an alias for the current type name (used as a type specifier for the `existing` argument), whereas lowercase `self` is the argument name for the implicitly-passed reference to the current instance (also called "this" in other languages, and also implicitly a `Self` type).

Both of these methods face an interesting but obscure problem: they both must dismantle the `existing`/`self` value that's `owned`. That is, `__moveinit__()` implicitly destroys sub-elements of `existing` in order to transfer ownership to a new instance (read more about the [move constructor](life.html#move-constructor)), while `__del__()` implements the deletion logic for its `self`. As such, they both need to own and transform elements of the `owned` value, and they definitely don't want the original `owned` value's destructor to also run—that could result in a double-free error, and in the case of the `__del__()` method, it would become an infinite loop.

To solve this problem, Mojo handles these two methods specially by assuming that their whole values are destroyed upon reaching any return from the method. This means that the whole object may be used as usual, up until the field values are transferred or the method returns.

For example, the following code works as you would expect (within the destructor, we can still pass ownership of a field value to another function, and there's no infinite loop to destroy `self`):

```mojo
fn consume(owned str: String):
    print('Consumed', str)

struct TwoStrings:
    var str1: String
    var str2: String

    fn __init__(out self, one: String):
        self.str1 = one
        self.str2 = String("bar")

    fn __moveinit__(out self, owned existing: Self):
        self.str1 = existing.str1
        self.str2 = existing.str2

    fn __del__(owned self):
        self.dump() # Self is still whole here
        # Mojo calls self.str2.__del__() since str2 isn't used anymore

        consume(self.str1^)
        # self.str1 has been transferred so it is also destroyed now;
        # `self.__del__()` is not called (avoiding an infinite loop).

    fn dump(mut self):
        print('str1:', self.str1)
        print('str2:', self.str2)

fn use_two_strings():
    var two_strings = TwoStrings("foo")
```

```mojo
fn consume(owned str: String):
    print('Consumed', str)

struct TwoStrings:
    var str1: String
    var str2: String

    fn __init__(out self, one: String):
        self.str1 = one
        self.str2 = String("bar")

    fn __moveinit__(out self, owned existing: Self):
        self.str1 = existing.str1
        self.str2 = existing.str2

    fn __del__(owned self):
        self.dump() # Self is still whole here
        # Mojo calls self.str2.__del__() since str2 isn't used anymore

        consume(self.str1^)
        # self.str1 has been transferred so it is also destroyed now;
        # `self.__del__()` is not called (avoiding an infinite loop).

    fn dump(mut self):
        print('str1:', self.str1)
        print('str2:', self.str2)

fn use_two_strings():
    var two_strings = TwoStrings("foo")
```

## Explicit lifetime extension[​](death.html#explicit-lifetime-extension "Direct link to Explicit lifetime extension")

So far, we've described how Mojo destroys a value at the point it's last used, and this works great in almost all situations. Mojo [origins](../values/lifetimes.html) help the compiler track values that are allocated in one place and used in another.

However, there are very rare situations in which you may need to explicitly extend the lifetime of a value. This can happen:

- When you're writing tests that generate values that aren't actually used, to avoid the compiler issuing warnings and/or optimizing away values.
- You're writing unsafe code (for example, code that explicitly manipulates a value's `origin`).

In these cases, you can force Mojo to keep a value alive up to a certain point by assigning the value to the `_` discard pattern at the point where it's okay to destroy it. For example:

```mojo
# Keep foo alive until this point
_ = foo
```

```mojo
# Keep foo alive until this point
_ = foo
```

If you don't *know* you need to do this, you probably don't.



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Flifecycle%2Fdeath)

- [Default destruction behavior](death.html#default-destruction-behavior)
- [Benefits of ASAP destruction](death.html#benefits-of-asap-destruction)
- [Destructor](death.html#destructor)
- [Field lifetimes](death.html#field-lifetimes)

  - [Field lifetimes during destruct and move](death.html#field-lifetimes-during-destruct-and-move)
- [Explicit lifetime extension](death.html#explicit-lifetime-extension)











Intro to value lifecycle | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



- [Mojo](https://docs.modular.com/mojo)
- /[Manual](../index.html)
- /Value lifecycle
- /Intro to value lifecycle

<!--THE END-->

- [Mojo](https://docs.modular.com/mojo)
- /[Manual](../index.html)
- /Value lifecycle
- /Intro to value lifecycle

# Intro to value lifecycle

So far, we've explained how Mojo allows you to build high-performance code that is memory safe *without* manually managing memory, using Mojo's [ownership model](../values/ownership.html). However, Mojo is designed for [systems programming](https://en.wikipedia.org/wiki/Systems_programming), which often requires manual memory management for custom data types. So, Mojo lets you do that as you see fit. To be clear, Mojo has no reference counter and no garbage collector.

Mojo also has no built-in data types with special privileges. All data types in the standard library (such as [`Bool`](https://docs.modular.com/mojo/stdlib/builtin/bool/Bool), [`Int`](https://docs.modular.com/mojo/stdlib/builtin/int/Int), and [`String`](https://docs.modular.com/mojo/stdlib/collections/string/string/String)) are implemented as [structs](../structs.html).

What's great about the Mojo language is that it provides you these low-level tools for systems programming, but within a framework that helps you build things that are safe and easy to use from higher-level programs. That is, you can get under the hood and write all the "unsafe" code you want, but as long as you do so in accordance with Mojo's [value semantics](../values/value-semantics.html), the programmer instantiating your type/object doesn't need to think about memory management at all, and the behavior will be safe and predictable, thanks to [value ownership](../values/ownership.html).

In summary, it's the responsibility of the type author to manage the memory and resources for each value type, by implementing specific lifecycle methods, such as the constructor, copy constructor, move constructor, and destructor, as necessary. Mojo doesn't create any constructors by default, although it does add a trivial, no-op destructor for types that don't define their own.

In the following pages, we'll explain exactly how to define these lifecycle methods in accordance with value semantics so your types play nicely with value ownership.

## Lifecycles and lifetimes[​](index.html#lifecycles-and-lifetimes "Direct link to Lifecycles and lifetimes")

First, let's clarify some terminology:

- The "lifecycle" of a value is defined by various [dunder methods](../structs.html#special-methods) in a struct. Each lifecycle event is handled by a different method, such as the constructor (`__init__()`), the destructor (`__del__()`), the copy constructor (`__copyinit__()`), and the move constructor (`__moveinit__()`). All values that are declared with the same type have the same lifecycle.
- The "lifetime" of a variable is defined by the span of time during program execution in which the variable is considered valid. The life of a variable begins when its value is initialized (via `__init__()`, `__copyinit__()` or `__moveinit__()`) and ends when the value is destroyed (`__del__()`), or consumed in some other way (for example, as part of a `__moveinit__()` call).

No two values have the exact same lifetime, because every value is created and destroyed at a different point in time (even if the difference is imperceptible).

Origin type

The concept of lifetimes is related to the `origin` type, a Mojo primitive used to track ownership. For most Mojo programming, you won't need to work with `origin` values directly. For information, see [Lifetimes, origins and references](../values/lifetimes.html).

The life of a value in Mojo begins when a variable is initialized and continues up until the value is last used, at which point Mojo destroys it. Mojo destroys every value/object as soon as it's no longer used, using an “as soon as possible” (ASAP) destruction policy that runs after every sub-expression. The Mojo compiler takes care of releasing resources after last use when needed.

As you might imagine, keeping track of a value's life can be difficult if a value is shared across functions many times during the life of a program. However, Mojo makes this predictable partly through its [value semantics](../values/value-semantics.html) and [value ownership](../values/ownership.html) (both prerequisite readings for the following sections). The final piece of the puzzle for lifetime management is the value lifecycle: every value (defined in a struct) needs to implement key lifecycle methods that define how a value is created and destroyed.



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Flifecycle%2F)

- [Lifecycles and lifetimes](index.html#lifecycles-and-lifetimes)











Life of a value | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



- [Mojo](https://docs.modular.com/mojo)
- /[Manual](../index.html)
- /Value lifecycle
- /Life of a value

<!--THE END-->

- [Mojo](https://docs.modular.com/mojo)
- /[Manual](../index.html)
- /Value lifecycle
- /Life of a value

# Life of a value

The life of a value in Mojo begins when a variable is initialized and continues up until the value is last used, at which point Mojo destroys it. This page describes how every value in Mojo is created, copied, and moved. (The next page describes [how values are destroyed](death.html).)

All data types in Mojo—including basic types in the standard library such as [`Bool`](https://docs.modular.com/mojo/stdlib/builtin/bool/Bool), [`Int`](https://docs.modular.com/mojo/stdlib/builtin/int/Int), and [`String`](https://docs.modular.com/mojo/stdlib/collections/string/string/String), up to complex types such as [`SIMD`](https://docs.modular.com/mojo/stdlib/builtin/simd/SIMD) and [`object`](https://docs.modular.com/mojo/stdlib/builtin/object/object)—are defined as a [struct](../structs.html). This means the creation and destruction of any piece of data follows the same lifecycle rules, and you can define your own data types that work exactly the same way.

Mojo structs don't get any default lifecycle methods, such as a constructor, copy constructor, or move constructor. That means you can create a struct without a constructor, but then you can't instantiate it, and it would be useful only as a sort of namespace for static methods. For example:

```mojo
struct NoInstances:
    var state: Int

    @staticmethod
    fn print_hello():
        print("Hello world!")
```

```mojo
struct NoInstances:
    var state: Int

    @staticmethod
    fn print_hello():
        print("Hello world!")
```

Without a constructor, this cannot be instantiated, so it has no lifecycle. The `state` field is also useless because it cannot be initialized (Mojo structs do not support default field values—you must initialize them in a constructor).

So the only thing you can do is call the static method:

```mojo
NoInstances.print_hello()
```

```mojo
NoInstances.print_hello()
```

```output
Hello world!
```

```output
Hello world!
```

## Constructor[​](life.html#constructor "Direct link to Constructor")

To create an instance of a Mojo type, it needs the `__init__()` constructor method. The main responsibility of the constructor is to initialize all fields. For example:

```mojo
struct MyPet:
    var name: String
    var age: Int

    fn __init__(out self, name: String, age: Int):
        self.name = name
        self.age = age
```

```mojo
struct MyPet:
    var name: String
    var age: Int

    fn __init__(out self, name: String, age: Int):
        self.name = name
        self.age = age
```

Now we can create an instance:

```mojo
var mine = MyPet("Loki", 4)
```

```mojo
var mine = MyPet("Loki", 4)
```

An instance of `MyPet` can also be [read](../values/ownership.html#read-arguments-read) and destroyed, but it currently can't be copied or moved.

We believe this is a good default starting point, because there are no built-in lifecycle events and no surprise behaviors. You—the type author—must explicitly decide whether and how the type can be copied or moved, by implementing the copy and move constructors.

Mojo does not require a destructor to destroy an object. As long as all fields in the struct are destructible (every type in the standard library is destructible, except for [pointers](https://docs.modular.com/mojo/stdlib/memory/unsafe)), then Mojo knows how to destroy the type when its lifetime ends. We'll discuss that more in [Death of a value](death.html).

### Overloading the constructor[​](life.html#overloading-the-constructor "Direct link to Overloading the constructor")

Like any other function/method, you can [overload](../functions.html#overloaded-functions) the `__init__()` constructor to initialize the object with different arguments. For example, you might want a default constructor that sets some default values and takes no arguments, and then additional constructors that accept more arguments.

Just be aware that, in order to modify any fields, each constructor must declare the `self` argument with the [`out` convention](../values/ownership.html#mutable-arguments-mut). If you want to call one constructor from another, you simply call upon that constructor as you would externally (you don't need to pass `self`).

For example, here's how you can delegate work from an overloaded constructor:

```mojo
struct MyPet:
    var name: String
    var age: Int

    fn __init__(out self):
        self.name = ""
        self.age = 0

    fn __init__(out self, name: String):
        self = MyPet()
        self.name = name
```

```mojo
struct MyPet:
    var name: String
    var age: Int

    fn __init__(out self):
        self.name = ""
        self.age = 0

    fn __init__(out self, name: String):
        self = MyPet()
        self.name = name
```

### Field initialization[​](life.html#field-initialization "Direct link to Field initialization")

Notice in the previous example that, by the end of each constructor, all fields must be initialized. That's the only requirement in the constructor.

In fact, the `__init__()` constructor is smart enough to treat the `self` object as fully initialized even before the constructor is finished, as long as all fields are initialized. For example, this constructor can pass around `self` as soon as all fields are initialized:

```mojo
fn use(arg: MyPet):
    pass

struct MyPet:
    var name: String
    var age: Int

    fn __init__(out self, name: String, age: Int, cond: Bool):
        self.name = name
        if cond:
            self.age = age
            use(self)  # Safe to use immediately!

        self.age = age
        use(self)  # Safe to use immediately!
```

```mojo
fn use(arg: MyPet):
    pass

struct MyPet:
    var name: String
    var age: Int

    fn __init__(out self, name: String, age: Int, cond: Bool):
        self.name = name
        if cond:
            self.age = age
            use(self)  # Safe to use immediately!

        self.age = age
        use(self)  # Safe to use immediately!
```

### Constructors and implicit conversion[​](life.html#constructors-and-implicit-conversion "Direct link to Constructors and implicit conversion")

Mojo supports implicit conversion from one type to another. Implicit conversion can happen when one of the following occurs:

- You assign a value of one type to a variable with a different type.
- You pass a value of one type to a function that requires a different type.
- You return a value of one type from a function that specifies a different return type.

In all cases, implicit conversion is supported when the target type defines a constructor that meets the following criteria:

- Is declared with the `@implicit` decorator.
- Has a single required, non-keyword argument of the source type.

For example:

```mojo
var a = Source()
var b: Target = a
```

```mojo
var a = Source()
var b: Target = a
```

Mojo implicitly converts the `Source` value in `a` to a `Target` value if `Target` defines a matching constructor like this:

```mojo
struct Target:

    @implicit
    fn __init__(out self, s: Source): ...
```

```mojo
struct Target:

    @implicit
    fn __init__(out self, s: Source): ...
```

With implicit conversion, the assignment above is essentially identical to:

```mojo
var b = Target(a)
```

```mojo
var b = Target(a)
```

In general, types should only support implicit conversions when the conversion lossless, and ideally inexpensive. For example, converting an integer to a floating-point number is usually lossless (except for very large positive and negative integers, where the conversion may be approximate), but converting a floating-point number to an integer is very likely to lose information. So Mojo supports implicit conversion from `Int` to `Float64`, but not the reverse.

The constructor used for implicit conversion can take optional arguments, so the following constructor would also support implicit conversion from `Source` to `Target`:

```mojo
struct Target:

    @implicit
    fn __init__(out self, s: Source, reverse: Bool = False): ...
```

```mojo
struct Target:

    @implicit
    fn __init__(out self, s: Source, reverse: Bool = False): ...
```

Implicit conversion can fail if Mojo can't unambiguously match the conversion to a constructor. For example, if the target type has two overloaded constructors that take different types, and each of those types supports an implicit conversion from the source type, the compiler has two equally-valid paths to convert the values:

```mojo
struct A:
    @implicit
    fn __init__(out self, s: Source): ...

struct B:
    @implicit
    fn __init__(out self, s: Source): ...

struct OverloadedTarget:
    @implicit
    fn __init__(out self, a: A): ...
    @implicit
    fn __init__(out self, b: B): ...

var t = OverloadedTarget(Source()) # Error: ambiguous call to '__init__': each
                                   # candidate requires 1 implicit conversion
```

```mojo
struct A:
    @implicit
    fn __init__(out self, s: Source): ...

struct B:
    @implicit
    fn __init__(out self, s: Source): ...

struct OverloadedTarget:
    @implicit
    fn __init__(out self, a: A): ...
    @implicit
    fn __init__(out self, b: B): ...

var t = OverloadedTarget(Source()) # Error: ambiguous call to '__init__': each
                                   # candidate requires 1 implicit conversion
```

In this case, you can fix the issue by explicitly casting to one of the intermediate types. For example:

```mojo
var t = OverloadedTarget(A(Source())) # OK
```

```mojo
var t = OverloadedTarget(A(Source())) # OK
```

Mojo applies at most one implicit conversion to a variable. For example:

```mojo
var t: OverloadedTarget = Source() # Error: can't implicitly convert Source
                                   # to Target
```

```mojo
var t: OverloadedTarget = Source() # Error: can't implicitly convert Source
                                   # to Target
```

Would fail because there's no direct conversion from `Source` to `OverloadedTarget`.

## Copy constructor[​](life.html#copy-constructor "Direct link to Copy constructor")

When Mojo encounters an assignment statement that doesn't use the [transfer sigil (`^`)](../values/ownership.html#transfer-arguments-owned-and-), it tries to make a copy of the right-side value by calling upon that type's copy constructor: the `__copyinit__()` method. Thus, it's the responsibility of the type author to implement `__copyinit__()` so it returns a copy of the value.

For example, the `MyPet` type above does not have a copy constructor, so this code fails to compile:

```mojo
var mine = MyPet("Loki", 4)
var yours = mine  # This requires a copy, but MyPet has no copy constructor
```

```mojo
var mine = MyPet("Loki", 4)
var yours = mine  # This requires a copy, but MyPet has no copy constructor
```

To make it work, we need to add the copy constructor, like this:

```mojo
struct MyPet:
    var name: String
    var age: Int

    fn __init__(out self, name: String, age: Int):
        self.name = name
        self.age = age

    fn __copyinit__(out self, existing: Self):
        self.name = existing.name
        self.age = existing.age
```

```mojo
struct MyPet:
    var name: String
    var age: Int

    fn __init__(out self, name: String, age: Int):
        self.name = name
        self.age = age

    fn __copyinit__(out self, existing: Self):
        self.name = existing.name
        self.age = existing.age
```

`Self` (capital "S") is an alias for the current type name (`MyPet`, in this example). Using this alias is a best practice to avoid any mistakes when referring to the current struct name.

Also, notice that the `existing` argument in `__copyinit__()` is immutable because the default [argument convention](../values/ownership.html#argument-conventions) is `read`—this is a good thing because this function should not modify the contents of the value being copied.

Now this code works to make a copy:

```mojo
var mine = MyPet("Loki", 4)
var yours = mine
```

```mojo
var mine = MyPet("Loki", 4)
var yours = mine
```

What makes Mojo's copy behavior different, compared to other languages, is that `__copyinit__()` is designed to perform a deep copy of all fields in the type (as per [value semantics](../values/value-semantics.html)). That is, it copies heap-allocated values, rather than just copying the pointer.

However, the Mojo compiler doesn't enforce this, so it's the type author's responsibility to implement `__copyinit__()` with value semantics. For example, here's a new `HeapArray` type that performs a deep copy in the copy constructor:

```mojo
struct HeapArray:
    var data: UnsafePointer[Int]
    var size: Int
    var cap: Int

    fn __init__(out self, size: Int, val: Int):
        self.size = size
        self.cap = size * 2
        self.data = UnsafePointer[Int].alloc(self.cap)
        for i in range(self.size):
            (self.data + i).init_pointee_copy(val)

    fn __copyinit__(out self, existing: Self):
        # Deep-copy the existing value
        self.size = existing.size
        self.cap = existing.cap
        self.data = UnsafePointer[Int].alloc(self.cap)
        for i in range(self.size):
            (self.data + i).init_pointee_copy(existing.data[i])
        # The lifetime of `existing` continues unchanged

    fn __del__(owned self):
        # We must free the heap-allocated data, but
        # Mojo knows how to destroy the other fields
        for i in range(self.size):
            (self.data + i).destroy_pointee()
        self.data.free()

    fn append(mut self, val: Int):
        # Update the array for demo purposes
        if self.size < self.cap:
            (self.data + self.size).init_pointee_copy(val)
            self.size += 1
        else:
            print("Out of bounds")

    fn dump(self):
        # Print the array contents for demo purposes
        print("[", end="")
        for i in range(self.size):
            if i > 0:
                print(", ", end="")
            print(self.data[i], end="")
        print("]")
```

```mojo
struct HeapArray:
    var data: UnsafePointer[Int]
    var size: Int
    var cap: Int

    fn __init__(out self, size: Int, val: Int):
        self.size = size
        self.cap = size * 2
        self.data = UnsafePointer[Int].alloc(self.cap)
        for i in range(self.size):
            (self.data + i).init_pointee_copy(val)

    fn __copyinit__(out self, existing: Self):
        # Deep-copy the existing value
        self.size = existing.size
        self.cap = existing.cap
        self.data = UnsafePointer[Int].alloc(self.cap)
        for i in range(self.size):
            (self.data + i).init_pointee_copy(existing.data[i])
        # The lifetime of `existing` continues unchanged

    fn __del__(owned self):
        # We must free the heap-allocated data, but
        # Mojo knows how to destroy the other fields
        for i in range(self.size):
            (self.data + i).destroy_pointee()
        self.data.free()

    fn append(mut self, val: Int):
        # Update the array for demo purposes
        if self.size < self.cap:
            (self.data + self.size).init_pointee_copy(val)
            self.size += 1
        else:
            print("Out of bounds")

    fn dump(self):
        # Print the array contents for demo purposes
        print("[", end="")
        for i in range(self.size):
            if i > 0:
                print(", ", end="")
            print(self.data[i], end="")
        print("]")
```

Notice that `__copyinit__()` does not copy the `UnsafePointer` value (doing so would make the copied value refer to the same `data` memory address as the original value, which is a shallow copy). Instead, we initialize a new `UnsafePointer` to allocate a new block of memory, and then copy over all the heap-allocated values (this is a deep copy).

Thus, when we copy an instance of `HeapArray`, each copy has its own value on the heap, so changes to one value do not affect the other, as shown here:

```mojo
fn copies():
    var a = HeapArray(2, 1)
    var b = a    # Calls the copy constructor
    a.dump()     # Prints [1, 1]
    b.dump()     # Prints [1, 1]

    b.append(2)  # Changes the copied data
    b.dump()     # Prints [1, 1, 2]
    a.dump()     # Prints [1, 1] (the original did not change)
```

```mojo
fn copies():
    var a = HeapArray(2, 1)
    var b = a    # Calls the copy constructor
    a.dump()     # Prints [1, 1]
    b.dump()     # Prints [1, 1]

    b.append(2)  # Changes the copied data
    b.dump()     # Prints [1, 1, 2]
    a.dump()     # Prints [1, 1] (the original did not change)
```

In `HeapArray`, we must use the `__del__()` destructor to free the heap-allocated data when the `HeapArray` lifetime ends, but Mojo automatically destroys all other fields when their respective lifetimes end. We'll discuss this destructor more in [Death of a value](death.html).

If your type doesn't use any pointers for heap-allocated data, then writing the constructor and copy constructor is all boilerplate code that you shouldn't have to write. For most structs that don't manage memory explicitly, you can just add the [`@value` decorator](../decorators/value.html) to your struct definition and Mojo will synthesize the `__init__()`, `__copyinit__()`, and `__moveinit__()` methods.

Mojo also calls upon the copy constructor when a value is passed to a function that takes the argument as [`owned`](../values/ownership.html#transfer-arguments-owned-and-) *and* when the lifetime of the given value does *not* end at that point. If the lifetime of the value does end there (usually indicated with the transfer sigil `^`), then Mojo instead invokes the move constructor.

## Move constructor[​](life.html#move-constructor "Direct link to Move constructor")

Although copying values provides predictable behavior that matches Mojo's [value semantics](../values/value-semantics.html), copying some data types can be a significant hit on performance. If you're familiar with reference semantics, then the solution here might seem clear: instead of making a copy when passing a value, share the value as a reference. And if the original variable is no longer needed, nullify the original to avoid any double-free or use-after-free errors. That's generally known as a move operation: the memory block holding the data remains the same (the memory does not actually move), but the pointer to that memory moves to a new variable.

To support moving a value, implement the `__moveinit__()` method. The `__moveinit__()` method performs a consuming move: it [transfers ownership](../values/ownership.html#transfer-arguments-owned-and-) of a value from one variable to another when the original variable's lifetime ends (also called a "destructive move").

A move constructor is **not required** to transfer ownership of a value. Unlike in Rust, transferring ownership is not always a move operation; the move constructors are only part of the implementation for how Mojo transfers ownership of a value. You can learn more in the section about [ownership transfer](../values/ownership.html#transfer-arguments-owned-and-).

When a move occurs, Mojo immediately invalidates the original variable, preventing any access to it and disabling its destructor. Invalidating the original variable is important to avoid memory errors on heap-allocated data, such as use-after-free and double-free errors.

Here's how to add the move constructor to the `HeapArray` example:

```mojo
struct HeapArray:
    var data: UnsafePointer[Int]
    var size: Int
    var cap: Int

    fn __init__(out self, size: Int, val: Int):
        self.size = size
        self.cap = size * 2
        self.data = UnsafePointer[Int].alloc(self.cap)
        for i in range(self.size):
            (self.data + i).init_pointee_copy(val)

    fn __copyinit__(out self, existing: Self):
        # Deep-copy the existing value
        self.size = existing.size
        self.cap = existing.cap
        self.data = UnsafePointer[Int].alloc(self.cap)
        for i in range(self.size):
            (self.data + i).init_pointee_copy(existing.data[i])
        # The lifetime of `existing` continues unchanged

    fn __moveinit__(out self, owned existing: Self):
        print("move")
        # Shallow copy the existing value
        self.size = existing.size
        self.cap = existing.cap
        self.data = existing.data
        # Then the lifetime of `existing` ends here, but
        # Mojo does NOT call its destructor

    fn __del__(owned self):
        # We must free the heap-allocated data, but
        # Mojo knows how to destroy the other fields
        for i in range(self.size):
            (self.data + i).destroy_pointee()
        self.data.free()

    fn append(mut self, val: Int):
        # Update the array for demo purposes
        if self.size < self.cap:
            (self.data + self.size).init_pointee_copy(val)
            self.size += 1
        else:
            print("Out of bounds")

    fn dump(self):
        # Print the array contents for demo purposes
        print("[", end="")
        for i in range(self.size):
            if i > 0:
                print(", ", end="")
            print(self.data[i], end="")
        print("]")
```

```mojo
struct HeapArray:
    var data: UnsafePointer[Int]
    var size: Int
    var cap: Int

    fn __init__(out self, size: Int, val: Int):
        self.size = size
        self.cap = size * 2
        self.data = UnsafePointer[Int].alloc(self.cap)
        for i in range(self.size):
            (self.data + i).init_pointee_copy(val)

    fn __copyinit__(out self, existing: Self):
        # Deep-copy the existing value
        self.size = existing.size
        self.cap = existing.cap
        self.data = UnsafePointer[Int].alloc(self.cap)
        for i in range(self.size):
            (self.data + i).init_pointee_copy(existing.data[i])
        # The lifetime of `existing` continues unchanged

    fn __moveinit__(out self, owned existing: Self):
        print("move")
        # Shallow copy the existing value
        self.size = existing.size
        self.cap = existing.cap
        self.data = existing.data
        # Then the lifetime of `existing` ends here, but
        # Mojo does NOT call its destructor

    fn __del__(owned self):
        # We must free the heap-allocated data, but
        # Mojo knows how to destroy the other fields
        for i in range(self.size):
            (self.data + i).destroy_pointee()
        self.data.free()

    fn append(mut self, val: Int):
        # Update the array for demo purposes
        if self.size < self.cap:
            (self.data + self.size).init_pointee_copy(val)
            self.size += 1
        else:
            print("Out of bounds")

    fn dump(self):
        # Print the array contents for demo purposes
        print("[", end="")
        for i in range(self.size):
            if i > 0:
                print(", ", end="")
            print(self.data[i], end="")
        print("]")
```

The critical feature of `__moveinit__()` is that it takes the incoming value as `owned`, meaning this method gets unique ownership of the value. Moreover, because this is a dunder method that Mojo calls only when performing a move (during ownership transfer), the `existing` argument is guaranteed to be a mutable reference to the original value, *not a copy* (unlike other methods that may declare an argument as `owned`, but might receive the value as a copy if the method is called without the [`^` transfer sigil](../values/ownership.html#transfer-arguments-owned-and-)). That is, Mojo calls this move constructor *only* when the original variable's lifetime actually ends at the point of transfer.

Here's an example showing how to invoke the move constructor for `HeapArray`:

```mojo
fn moves():
    var a = HeapArray(3, 1)

    a.dump()   # Prints [1, 1, 1]

    var b = a^ # Prints "move"; the lifetime of `a` ends here

    b.dump()   # Prints [1, 1, 1]
    #a.dump()  # ERROR: use of uninitialized value 'a'
```

```mojo
fn moves():
    var a = HeapArray(3, 1)

    a.dump()   # Prints [1, 1, 1]

    var b = a^ # Prints "move"; the lifetime of `a` ends here

    b.dump()   # Prints [1, 1, 1]
    #a.dump()  # ERROR: use of uninitialized value 'a'
```

Notice that `__moveinit__()` performs a shallow copy of the existing field values (it copies the pointer, instead of allocating new memory on the heap), which is what makes it useful for types with heap-allocated values that are expensive to copy.

To go further and ensure your type can never be copied, you can make it "move-only" by implementing `__moveinit__()` and *excluding* `__copyinit__()`. A move-only type can be passed to other variables and passed into functions with any argument convention (`read`, `mut`, and `owned`)—the only catch is that you must use the `^` transfer sigil to end the lifetime of a move-only type when assigning it to a new variable or when passing it as an `owned` argument.

For types without heap-allocated fields, you get no real benefit from the move constructor. Making copies of simple data types on the stack, like integers, floats, and booleans, is very cheap. Yet, if you allow your type to be copied, then there's generally no reason to disallow moves, so you can synthesize both constructors by adding the [`@value` decorator](../decorators/value.html).

## Simple value types[​](life.html#value-decorator "Direct link to Simple value types")

Because copy and move constructors are opt-in, Mojo provides great control for exotic use cases (such as for atomic values that should never be copied or moved), but most structs are simple aggregations of other types that should be easily copied and moved, and we don't want to write a lot of boilerplate constructors for those simple value types.

To solve this, Mojo provides the [`@value` decorator](../decorators/value.html), which synthesizes the boilerplate code for the `__init__()`, `__copyinit__()`, and `__moveinit__()` methods.

For example, consider a simple struct like this:

```mojo
@value
struct MyPet:
    var name: String
    var age: Int
```

```mojo
@value
struct MyPet:
    var name: String
    var age: Int
```

Mojo sees the `@value` decorator and notices that you don't have a member-wise initializer (a constructor with arguments for each field), a copy constructor, or a move constructor, so it synthesizes them for you. The result is as if you had actually written this:

```mojo
struct MyPet:
    var name: String
    var age: Int

    fn __init__(out self, owned name: String, age: Int):
        self.name = name^
        self.age = age

    fn __copyinit__(out self, existing: Self):
        self.name = existing.name
        self.age = existing.age

    fn __moveinit__(out self, owned existing: Self):
        self.name = existing.name^
        self.age = existing.age
```

```mojo
struct MyPet:
    var name: String
    var age: Int

    fn __init__(out self, owned name: String, age: Int):
        self.name = name^
        self.age = age

    fn __copyinit__(out self, existing: Self):
        self.name = existing.name
        self.age = existing.age

    fn __moveinit__(out self, owned existing: Self):
        self.name = existing.name^
        self.age = existing.age
```

Mojo synthesizes each lifecycle method only when it doesn't exist, so you can use `@value` and still define your own versions to override the default behavior. For example, it is fairly common to use the default member-wise and move constructor, but create a custom copy constructor. Another common pattern is to use `@value` to create a member-wise constructor, and add overloads that take different sets of arguments. For example, if you want to create a `MyPet` struct without specifying an age, you could add an overloaded constructor:

```mojo
@value
struct MyPet:
    var name: String
    var age: Int

    fn __init__(out self, owned name: String):
        self.name = name^
        self.age = 0

```

```mojo
@value
struct MyPet:
    var name: String
    var age: Int

    fn __init__(out self, owned name: String):
        self.name = name^
        self.age = 0

```

Note that this overloaded constructor **doesn't** prevent the `@value` decorator from synthesizing the member-wise constructor. To override this default constructor, you'd need to add a constructor with the same signature as the default member-wise constructor.

Something you can see in this code that we didn't mention yet is that the `__init__()` method takes all arguments as `owned`, because the constructor must take ownership to store each value. This is a useful micro-optimization and enables the use of move-only types. Trivial types like `Int` are also passed as `owned`, but because ownership doesn't mean anything for integers, we can elide that declaration and the transfer sigil (`^`) for simplicity. The transfer operator is also just a formality in this case, because, even if it's not used with `self.name = name^`, the Mojo compiler will notice that `name` is last used here and convert this assignment into a move, instead of a copy+delete.

If your type contains any move-only fields, Mojo will not generate the copy constructor because it cannot copy those fields. Further, the `@value` decorator won't work at all if any of your members are neither copyable nor movable. For example, if you have something like `Atomic` in your struct, then it probably isn't a true value type, and you don't want the copy/move constructors anyway.

Also notice that the `MyPet` struct above doesn't include the `__del__()` destructor (the `@value` decorator does not synthesize this), because Mojo doesn't need it to destroy fields, as discussed in [Death of a value](death.html)

## Trivial types[​](life.html#trivial-types "Direct link to Trivial types")

So far, we've talked about values that live in memory, which means they have an identity (an address) that can be passed around among functions (passed "by reference"). This is great for most types, and it's a safe default for large objects with expensive copy operations. However, it's inefficient for tiny things like a single integer or floating point number. We call these types "trivial" because they are just "bags of bits" that should be copied, moved, and destroyed without invoking any custom lifecycle methods.

Trivial types are the most common types that surround us, and from a language perspective, Mojo doesn't need special support for these written in a struct. Usually, these values are so tiny that they should be passed around in CPU registers, not indirectly through memory.

As such, Mojo provides a struct decorator to declare these types of values: `@register_passable("trivial")`. This decorator tells Mojo that the type should be copyable and movable but that it has no user-defined logic (no lifecycle methods) for doing this. It also tells Mojo to pass the value in CPU registers whenever possible, which has clear performance benefits.

You'll see this decorator on types like `Int` in the standard library:

```mojo
@register_passable("trivial")
struct Int:
    var value: __mlir_type.index

    fn __init__(value: __mlir_type.index) -> Int:
        return Self {value: value}
    ...
```

```mojo
@register_passable("trivial")
struct Int:
    var value: __mlir_type.index

    fn __init__(value: __mlir_type.index) -> Int:
        return Self {value: value}
    ...
```

We expect to use this decorator pervasively on Mojo standard library types, but it is safe to ignore for general application-level code.

For more information, see the [`@register_passable` documentation](../decorators/register-passable.html).

TODO

This decorator is due for reconsideration. Lack of custom copy/move/destroy logic and "passability in a register" are orthogonal concerns and should be split. This former logic should be subsumed into a more general `@value("trivial")` decorator, which is orthogonal from `@register_passable`.



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Flifecycle%2Flife)

- [Constructor](life.html#constructor)

  - [Overloading the constructor](life.html#overloading-the-constructor)
  - [Field initialization](life.html#field-initialization)
  - [Constructors and implicit conversion](life.html#constructors-and-implicit-conversion)
- [Copy constructor](life.html#copy-constructor)
- [Move constructor](life.html#move-constructor)
- [Simple value types](life.html#value-decorator)
- [Trivial types](life.html#trivial-types)











Parameterization: compile-time metaprogramming | Modular![ ](https://static.scarf.sh/a.png?x-pxid=d240bcad-0bb5-4db6-8c37-9061bb991d8e)



- [Mojo](https://docs.modular.com/mojo)
- /[Manual](../index.html)
- /Traits and parameters
- /Parameterization: compile-time metaprogramming

<!--THE END-->

- [Mojo](https://docs.modular.com/mojo)
- /[Manual](../index.html)
- /Traits and parameters
- /Parameterization: compile-time metaprogramming

# Parameterization: compile-time metaprogramming

Many languages have facilities for *metaprogramming*: that is, for writing code that generates or modifies code. Python has facilities for dynamic metaprogramming: features like decorators, metaclasses, and many more. These features make Python very flexible and productive, but since they're dynamic, they come with runtime overhead. Other languages have static or compile-time metaprogramming features, like C preprocessor macros and C++ templates. These can be limiting and hard to use.

To support Modular's work in AI, Mojo aims to provide powerful, easy-to-use metaprogramming with zero runtime cost. This compile-time metaprogramming uses the same language as runtime programs, so you don't have to learn a new language—just a few new features.

The main new feature is *parameters*. You can think of a parameter as a compile-time variable that becomes a runtime constant. This usage of "parameter" is probably different from what you're used to from other languages, where "parameter" and "argument" are often used interchangeably. In Mojo, "parameter" and "parameter expression" refer to compile-time values, and "argument" and "expression" refer to runtime values.

In Mojo, you can add parameters to a struct or function. You can also define named parameter expressions—aliases—that you can use as runtime constants.

## Parameterized functions[​](../parameters.1.html#parameterized-functions "Direct link to Parameterized functions")

To define a *parameterized function*, add parameters in square brackets ahead of the argument list. Each parameter is formatted just like an argument: a parameter name, followed by a colon and a type (which is required). In the following example, the function has a single parameter, `count` of type `Int`.

```mojo
fn repeat[count: Int](msg: String):
    @parameter
    for i in range(count):
        print(msg)
```

```mojo
fn repeat[count: Int](msg: String):
    @parameter
    for i in range(count):
        print(msg)
```

The [`@parameter`](../decorators/parameter.html) decorator shown here causes the `for` loop to be evaluated at compile time. The decorator only works if the loop limits are compile-time constants. Since `count` is a parameter, `range(count)` can be calculated at compile time.

Calling a parameterized function, you provide values for the parameters, just like function arguments:

```mojo
repeat[3]("Hello")
```

```mojo
repeat[3]("Hello")
```

```output
Hello
Hello
Hello
```

```output
Hello
Hello
Hello
```

The compiler resolves the parameter values during compilation, and creates a concrete version of the `repeat[]()` function for each unique parameter value. After resolving the parameter values and unrolling the loop, the `repeat[3]()` function would be roughly equivalent to this:

```mojo
fn repeat_3(msg: String):
    print(msg)
    print(msg)
    print(msg)
```

```mojo
fn repeat_3(msg: String):
    print(msg)
    print(msg)
    print(msg)
```

This doesn't represent actual code generated by the compiler. By the time parameters are resolved, Mojo code has already been transformed to an intermediate representation in [MLIR](https://mlir.llvm.org/).

If the compiler can't resolve all parameter values to constant values, compilation fails.

## Anatomy of a parameter list[​](../parameters.1.html#anatomy-of-a-parameter-list "Direct link to Anatomy of a parameter list")

Parameters to a function or struct appear in square brackets after a function or struct name. Parameters always require type annotations.

When you're looking at a function or struct definition, you may see some special characters such as `/` and `*` in the parameter list. Here's an example:

```mojo
def my_sort[
    # infer-only parameters
    Type: DType,
    width: Int,
    //,
    # positional-only parameter
    values: SIMD[Type, width],
    /,
    # positional-or-keyword parameter
    compare: fn (Scalar[Type], Scalar[Type]) -> Int,
    *,
    # keyword-only parameter
    reverse: Bool = False,
]() -> SIMD[Type, width]:
```

```mojo
def my_sort[
    # infer-only parameters
    Type: DType,
    width: Int,
    //,
    # positional-only parameter
    values: SIMD[Type, width],
    /,
    # positional-or-keyword parameter
    compare: fn (Scalar[Type], Scalar[Type]) -> Int,
    *,
    # keyword-only parameter
    reverse: Bool = False,
]() -> SIMD[Type, width]:
```

Here's a quick overview of the special characters in the parameter list:

- Double slash (`//`): parameters declared before the double slash are [infer-only parameters](../parameters.1.html#infer-only-parameters).
- Slash (`/`): parameters declared before a slash are positional-only parameters. Positional-only and keyword-only parameters follow the same rules as [positional-only and keyword-only arguments](../functions.html#positional-only-and-keyword-only-arguments).
- A parameter name prefixed with a star, like `*Types` identifies a [variadic parameter](../parameters.1.html#variadic-parameters) (not shown in the example above). Any parameters following the variadic parameter are keyword-only.
- Star (`*`): in a parameter list with no variadic parameter, a star by itself indicates that the following parameters are keyword-only parameters.
- An equals sign (`=`) introduces a default value for an [optional parameter](../parameters.1.html#optional-parameters-and-keyword-parameters).

## Parameters and generics[​](../parameters.1.html#parameters-and-generics "Direct link to Parameters and generics")

"Generics" refers to functions that can act on multiple types of values, or containers that can hold multiple types of values. For example, [`List`](https://docs.modular.com/mojo/stdlib/collections/list/List), can hold different types of values, so you can have a list of `Int` values, or a list of `String` values).

In Mojo, generics use parameters to specify types. For example, `List` takes a type parameter, so a vector of integers is written `List[Int]`. So all generics use parameters, but **not** everything that uses parameters is a generic.

For example, the `repeat[]()` function in the previous section includes parameter of type `Int`, and an argument of type `String`. It's parameterized, but not generic. A generic function or struct is parameterized on *type*. For example, we could rewrite `repeat[]()` to take any type of argument that conforms to the [`Stringable`](https://docs.modular.com/mojo/stdlib/builtin/str/Stringable) trait:

```mojo
fn repeat[MsgType: Stringable, count: Int](msg: MsgType):
    @parameter
    for i in range(count):
        print(String(msg))

# Must use keyword parameter for `count`
repeat[count=2](42)
```

```mojo
fn repeat[MsgType: Stringable, count: Int](msg: MsgType):
    @parameter
    for i in range(count):
        print(String(msg))

# Must use keyword parameter for `count`
repeat[count=2](42)
```

```output
42
42
```

```output
42
42
```

This updated function takes any `Stringable` type, so you can pass it an `Int`, `String`, or `Bool` value.

You can't pass the `count` as a positional keyword without also specifying `MsgType`. You can put `//` after `MsgType` to specify that it's always inferred by the argument. Now you can pass the following parameter `count` positionally:

```mojo
fn repeat[MsgType: Stringable, //, count: Int](msg: MsgType):
    @parameter
    for i in range(count):
        print(String(msg))

# MsgType is always inferred, so first positional keyword `2` is passed to `count`
repeat[2](42)
```

```mojo
fn repeat[MsgType: Stringable, //, count: Int](msg: MsgType):
    @parameter
    for i in range(count):
        print(String(msg))

# MsgType is always inferred, so first positional keyword `2` is passed to `count`
repeat[2](42)
```

```output
42
42
```

```output
42
42
```

Mojo's support for generics is still early. You can write generic functions like this using traits and parameters. You can also write generic collections like `List` and `Dict`. If you're interested in learning how these types work, you can find the source code for the standard library collection types [on GitHub](https://github.com/modular/max/blob/main/mojo/stdlib/src/collections/).

## Parameterized structs[​](../parameters.1.html#parameterized-structs "Direct link to Parameterized structs")

You can also add parameters to structs. You can use parameterized structs to build generic collections. For example, a generic array type might include code like this:

```mojo
from memory import UnsafePointer

struct GenericArray[ElementType: CollectionElement]:
    var data: UnsafePointer[ElementType]
    var size: Int

    fn __init__(out self, *elements: ElementType):
        self.size = len(elements)
        self.data = UnsafePointer[ElementType].alloc(self.size)
        for i in range(self.size):
            (self.data + i).init_pointee_move(elements[i])

    fn __del__(owned self):
        for i in range(self.size):
            (self.data + i).destroy_pointee()
        self.data.free()

    fn __getitem__(self, i: Int) raises -> ref [self] ElementType:
        if (i < self.size):
            return self.data[i]
        else:
            raise Error("Out of bounds")
```

```mojo
from memory import UnsafePointer

struct GenericArray[ElementType: CollectionElement]:
    var data: UnsafePointer[ElementType]
    var size: Int

    fn __init__(out self, *elements: ElementType):
        self.size = len(elements)
        self.data = UnsafePointer[ElementType].alloc(self.size)
        for i in range(self.size):
            (self.data + i).init_pointee_move(elements[i])

    fn __del__(owned self):
        for i in range(self.size):
            (self.data + i).destroy_pointee()
        self.data.free()

    fn __getitem__(self, i: Int) raises -> ref [self] ElementType:
        if (i < self.size):
            return self.data[i]
        else:
            raise Error("Out of bounds")
```

This struct has a single parameter, `ElementType`, which is a placeholder for the data type you want to store in the array, sometimes called a *type parameter*. `ElementType` is typed as [`CollectionElement`](https://docs.modular.com/mojo/stdlib/builtin/value/CollectionElement), which is a [trait](../traits.html) representing any type that can be copied and moved.

As with parameterized functions, you need to pass in parameter values when you use a parameterized struct. In this case, when you create an instance of `GenericArray`, you need to specify the type you want to store, like `Int`, or `Float64`. (This is a little confusing, because the *parameter value* you're passing in this case is a *type*. That's OK: a Mojo type is a valid compile-time value.)

You'll see that `ElementType` is used throughout the struct where you'd usually see a type name. For example, as the formal type for the `elements` in the constructor, and the return type of the `__getitem__()` method.

Here's an example of using `GenericArray`:

```mojo
var array = GenericArray[Int](1, 2, 3, 4)
for i in range(array.size):
    print(array[i], end=" ")
```

```mojo
var array = GenericArray[Int](1, 2, 3, 4)
for i in range(array.size):
    print(array[i], end=" ")
```

```output
1 2 3 4
```

```output
1 2 3 4
```

A parameterized struct can use the `Self` type to represent a concrete instance of the struct (that is, with all its parameters specified). For example, you could add a static factory method to `GenericArray` with the following signature:

```mojo
struct GenericArray[ElementType: CollectionElement]:
    ...

    @staticmethod
    fn splat(count: Int, value: ElementType) -> Self:
        # Create a new array with count instances of the given value
```

```mojo
struct GenericArray[ElementType: CollectionElement]:
    ...

    @staticmethod
    fn splat(count: Int, value: ElementType) -> Self:
        # Create a new array with count instances of the given value
```

Here, `Self` is equivalent to writing `GenericArray[ElementType]`. That is, you can call the `splat()` method like this:

```mojo
GenericArray[Float64].splat(8, 0)
```

```mojo
GenericArray[Float64].splat(8, 0)
```

The method returns an instance of `GenericArray[Float64]`.

### Conditional conformance[​](../parameters.1.html#conditional-conformance "Direct link to Conditional conformance")

When creating a generic struct, you might want to define some methods that require extra features. For example, consider a collection like `GenericArray` that holds instances of `CollectionElement`. The `CollectionElement` trait only requires that the stored data type be copyable and movable. This imposes a lot of limitations: you can't implement a `sort()` method because you can't guarantee that the stored type supports the comparison operators; you can't write a useful `__str__()` or `__repr__()` dunder method because you can't guarantee that the stored type supports conversion to a string.

The answer to these issues is *conditional conformance*, which lets you define a method that requires additional features. You do this by defining the `self` value that has a more specific bound on one or more of its parameters.

For example, the following code defines a `Container` type that holds an instance of `CollectionElement`. It also defines a `__str__()` method that can only be called if the stored `ElementType` conforms to `WritableCollectionElement`:

```mojo
@value
struct Container[ElementType: CollectionElement]:
    var element: ElementType

    def __str__[StrElementType: WritableCollectionElement, //](
            self: Container[StrElementType]) -> String:
        return String(self.element)

def use_container():
    float_container = Container(5)
    string_container = Container("Hello")
    print(float_container.__str__())
    print(string_container.__str__())

use_container()
```

```mojo
@value
struct Container[ElementType: CollectionElement]:
    var element: ElementType

    def __str__[StrElementType: WritableCollectionElement, //](
            self: Container[StrElementType]) -> String:
        return String(self.element)

def use_container():
    float_container = Container(5)
    string_container = Container("Hello")
    print(float_container.__str__())
    print(string_container.__str__())

use_container()
```

```output
5
Hello
```

```output
5
Hello
```

Note the signature of the `__str__()` method, which declares the `self` argument with a more specific type. Specifically, it declares that it takes a `Container` with an `ElementType` that conforms to the `WritableCollectionElement` trait.

```mojo
def __str__[StrElementType: WritableCollectionElement, //](
        self: Container[StrElementType]) -> String:
```

```mojo
def __str__[StrElementType: WritableCollectionElement, //](
        self: Container[StrElementType]) -> String:
```

This trait must be a superset of `ElementType`'s original trait: for example, `WritableCollectionElement` inherits from `CollectionElement`, so it includes all of requirements of the original trait.

Note that the `use_container()` function calls the `__str__()` method directly, rather than calling `String(float_container)`. One current limitation of conditional conformance is that Mojo can't recognize the struct `Container[Int]` as conforming to `Stringable`, even though the `__str__()` method is implemented for any `ElementType` that's also `Stringable`.

### Case study: the SIMD type[​](../parameters.1.html#case-study-the-simd-type "Direct link to Case study: the SIMD type")

For a real-world example of a parameterized type, let's look at the [`SIMD`](https://docs.modular.com/mojo/stdlib/builtin/simd/SIMD) type from Mojo's standard library.

[Single instruction, multiple data (SIMD)](https://en.wikipedia.org/wiki/Single_instruction,_multiple_data) is a parallel processing technology built into many modern CPUs, GPUs, and custom accelerators. SIMD allows you to perform a single operation on multiple pieces of data at once. For example, if you want to take the square root of each element in an array, you can use SIMD to parallelize the work.

Processors implement SIMD using low-level vector registers in hardware that hold multiple instances of a scalar data type. In order to use the SIMD instructions on these processors, the data must be shaped into the proper SIMD width (data type) and length (vector size). Processors may support 512-bit or longer SIMD vectors, and support many data types from 8-bit integers to 64-bit floating point numbers, so it's not practical to define all of the possible SIMD variations.

Mojo's [`SIMD`](https://docs.modular.com/mojo/stdlib/builtin/simd/SIMD) type (defined as a struct) exposes the common SIMD operations through its methods, and makes the SIMD data type and size values parametric. This allows you to directly map your data to the SIMD vectors on any hardware.

Here's a cut-down (non-functional) version of Mojo's `SIMD` type definition:

```mojo
struct SIMD[type: DType, size: Int]:
    var value: … # Some low-level MLIR stuff here

    # Create a new SIMD from a number of scalars
    fn __init__(out self, *elems: SIMD[type, 1]):  ...

    # Fill a SIMD with a duplicated scalar value.
    @staticmethod
    fn splat(x: SIMD[type, 1]) -> SIMD[type, size]: ...

    # Cast the elements of the SIMD to a different elt type.
    fn cast[target: DType](self) -> SIMD[target, size]: ...

    # Many standard operators are supported.
    fn __add__(self, rhs: Self) -> Self: ...
```

```mojo
struct SIMD[type: DType, size: Int]:
    var value: … # Some low-level MLIR stuff here

    # Create a new SIMD from a number of scalars
    fn __init__(out self, *elems: SIMD[type, 1]):  ...

    # Fill a SIMD with a duplicated scalar value.
    @staticmethod
    fn splat(x: SIMD[type, 1]) -> SIMD[type, size]: ...

    # Cast the elements of the SIMD to a different elt type.
    fn cast[target: DType](self) -> SIMD[target, size]: ...

    # Many standard operators are supported.
    fn __add__(self, rhs: Self) -> Self: ...
```

So you can create and use a SIMD vector like this:

```mojo
var vector = SIMD[DType.int16, 4](1, 2, 3, 4)
vector = vector * vector
for i in range(4):
    print(vector[i], end=" ")
```

```mojo
var vector = SIMD[DType.int16, 4](1, 2, 3, 4)
vector = vector * vector
for i in range(4):
    print(vector[i], end=" ")
```

```output
1 4 9 16
```

```output
1 4 9 16
```

As you can see, a simple arithmetic operator like `*` applied to a pair of `SIMD` vector operates on the corresponding elements in each vector.

Defining each SIMD variant with parameters is great for code reuse because the `SIMD` type can express all the different vector variants statically, instead of requiring the language to pre-define every variant.

Because `SIMD` is a parameterized type, the `self` argument in its functions carries those parameters—the full type name is `SIMD[type, size]`. Although it's valid to write this out (as shown in the return type of `splat()`), this can be verbose, so we recommend using the `Self` type (from [PEP673](https://peps.python.org/pep-0673/)) like the `__add__` example does.

## Overloading on parameters[​](../parameters.1.html#overloading-on-parameters "Direct link to Overloading on parameters")

Functions and methods can be overloaded on their parameter signatures. For information on overload resolution, see [Overloaded functions](../functions.html#overloaded-functions).

## Using parameterized types and functions[​](../parameters.1.html#using-parameterized-types-and-functions "Direct link to Using parameterized types and functions")

You can use parametric types and functions by passing values to the parameters in square brackets. For example, for the `SIMD` type above, `type` specifies the data type and `size` specifies the length of the SIMD vector (it must be a power of 2):

```mojo
# Make a vector of 4 floats.
var small_vec = SIMD[DType.float32, 4](1.0, 2.0, 3.0, 4.0)

# Make a big vector containing 1.0 in float16 format.
var big_vec = SIMD[DType.float16, 32](1.0)

# Do some math and convert the elements to float32.
var bigger_vec = (big_vec+big_vec).cast[DType.float32]()

# You can write types out explicitly if you want of course.
var bigger_vec2 : SIMD[DType.float32, 32] = bigger_vec

print('small_vec type:', small_vec.element_type, 'length:', len(small_vec))
print('bigger_vec2 type:', bigger_vec2.element_type, 'length:', len(bigger_vec2))
```

```mojo
# Make a vector of 4 floats.
var small_vec = SIMD[DType.float32, 4](1.0, 2.0, 3.0, 4.0)

# Make a big vector containing 1.0 in float16 format.
var big_vec = SIMD[DType.float16, 32](1.0)

# Do some math and convert the elements to float32.
var bigger_vec = (big_vec+big_vec).cast[DType.float32]()

# You can write types out explicitly if you want of course.
var bigger_vec2 : SIMD[DType.float32, 32] = bigger_vec

print('small_vec type:', small_vec.element_type, 'length:', len(small_vec))
print('bigger_vec2 type:', bigger_vec2.element_type, 'length:', len(bigger_vec2))
```

```output
small_vec type: float32 length: 4
bigger_vec2 type: float32 length: 32
```

```output
small_vec type: float32 length: 4
bigger_vec2 type: float32 length: 32
```

Note that the `cast()` method also needs a parameter to specify the type you want from the cast (the method definition above expects a `target` parametric value). Thus, just as the `SIMD` struct is a generic type definition, the `cast()` method is a generic method definition. At compile time, the compiler creates a concrete version of the `cast()` method with the target parameter bound to `DType.float32`.

The code above shows the use of concrete types (that is, the parameters are all bound to known values). But the major power of parameters comes from the ability to define parametric algorithms and types (code that uses the parameter values). For example, here's how to define a parametric algorithm with `SIMD` that is type- and width-agnostic:

```mojo
from math import sqrt

fn rsqrt[dt: DType, width: Int](x: SIMD[dt, width]) -> SIMD[dt, width]:
    return 1 / sqrt(x)

var v = SIMD[DType.float16, 4](42)
print(rsqrt(v))
```

```mojo
from math import sqrt

fn rsqrt[dt: DType, width: Int](x: SIMD[dt, width]) -> SIMD[dt, width]:
    return 1 / sqrt(x)

var v = SIMD[DType.float16, 4](42)
print(rsqrt(v))
```

```output
[0.154296875, 0.154296875, 0.154296875, 0.154296875]
```

```output
[0.154296875, 0.154296875, 0.154296875, 0.154296875]
```

Notice that the `x` argument is actually a `SIMD` type based on the function parameters. The runtime program can use the value of the parameters, because the parameters are resolved at compile-time before they are needed by the runtime program (but compile-time parameter expressions cannot use runtime values).

### Parameter inference[​](../parameters.1.html#parameter-inference "Direct link to Parameter inference")

The Mojo compiler can often *infer* parameter values, so you don't always have to specify them. For example, you can call the `rsqrt()` function defined above without any parameters:

```mojo
var v = SIMD[DType.float16, 4](33)
print(rsqrt(v))
```

```mojo
var v = SIMD[DType.float16, 4](33)
print(rsqrt(v))
```

```output
[0.174072265625, 0.174072265625, 0.174072265625, 0.174072265625]
```

```output
[0.174072265625, 0.174072265625, 0.174072265625, 0.174072265625]
```

The compiler infers its parameters based on the parametric `v` value passed into it, as if you wrote `rsqrt[DType.float16, 4](v)` explicitly.

Mojo can also infer the values of struct parameters from the arguments passed to a constructor or static method.

For example, consider the following struct:

```mojo
@value
struct One[Type: WritableCollectionElement]:
    var value: Type

    fn __init__(out self, value: Type):
        self.value = value

def use_one():
    s1 = One(123)
    s2 = One("Hello")
```

```mojo
@value
struct One[Type: WritableCollectionElement]:
    var value: Type

    fn __init__(out self, value: Type):
        self.value = value

def use_one():
    s1 = One(123)
    s2 = One("Hello")
```

Note that you can create an instance of `One` without specifying the `Type` parameter—Mojo can infer it from the `value` argument.

You can also infer parameters from a parameterized type passed to a constructor or static method:

```mojo
struct Two[Type: WritableCollectionElement]:
    var val1: Type
    var val2: Type

    fn __init__(out self, one: One[Type], another: One[Type]):
        self.val1 = one.value
        self.val2 = another.value
        print(String(self.val1), String(self.val2))

    @staticmethod
    fn fire(thing1: One[Type], thing2: One[Type]):
        print("🔥", String(thing1.value), String(thing2.value))

def use_two():
    s3 = Two(One("infer"), One("me"))
    Two.fire(One(1), One(2))

use_two()
```

```mojo
struct Two[Type: WritableCollectionElement]:
    var val1: Type
    var val2: Type

    fn __init__(out self, one: One[Type], another: One[Type]):
        self.val1 = one.value
        self.val2 = another.value
        print(String(self.val1), String(self.val2))

    @staticmethod
    fn fire(thing1: One[Type], thing2: One[Type]):
        print("🔥", String(thing1.value), String(thing2.value))

def use_two():
    s3 = Two(One("infer"), One("me"))
    Two.fire(One(1), One(2))

use_two()
```

```output
infer me
🔥 1 2
```

```output
infer me
🔥 1 2
```

`Two` takes a `Type` parameter, and its constructor takes values of type `One[Type]`. When constructing an instance of `Two`, you don't need to specify the `Type` parameter, since it can be inferred from the arguments.

Similarly, the static `fire()` method takes values of type `One[Type]`, so Mojo can infer the `Type` value at compile time.

If you're familiar with C++, you may recognize this as similar to Class Template Argument Deduction (CTAD).

## Optional parameters and keyword parameters[​](../parameters.1.html#optional-parameters-and-keyword-parameters "Direct link to Optional parameters and keyword parameters")

Just as you can specify [optional arguments](../functions.html#optional-arguments) in function signatures, you can also define an optional *parameter* by giving it a default value.

You can also pass parameters by keyword, just like you can use [keyword arguments](../functions.html#keyword-arguments). For a function or struct with multiple optional parameters, using keywords allows you to pass only the parameters you want to specify, regardless of their position in the function signature.

For example, here's a function with two parameters, each with a default value:

```mojo
fn speak[a: Int = 3, msg: StringLiteral = "woof"]():
    print(msg, a)

fn use_defaults() raises:
    speak()             # prints 'woof 3'
    speak[5]()          # prints 'woof 5'
    speak[7, "meow"]()  # prints 'meow 7'
    speak[msg="baaa"]() # prints 'baaa 3'
```

```mojo
fn speak[a: Int = 3, msg: StringLiteral = "woof"]():
    print(msg, a)

fn use_defaults() raises:
    speak()             # prints 'woof 3'
    speak[5]()          # prints 'woof 5'
    speak[7, "meow"]()  # prints 'meow 7'
    speak[msg="baaa"]() # prints 'baaa 3'
```

Recall that when a parametric function is called, Mojo can infer the parameter values. That is, it can use the parameter values attached to an argument value (see the `sqrt[]()` example above). If the parametric function also has a default value defined, then the inferred parameter type takes precedence.

For example, in the following code, we update the parametric `speak[]()` function to take an argument with a parametric type. Although the function has a default parameter value for `a`, Mojo instead uses the inferred `a` parameter value from the `bar` argument (as written, the default `a` value can never be used, but this is just for demonstration purposes):

```mojo
@value
struct Bar[v: Int]:
    pass

fn speak[a: Int = 3, msg: StringLiteral = "woof"](bar: Bar[a]):
    print(msg, a)

fn use_inferred():
    speak(Bar[9]())  # prints 'woof 9'
```

```mojo
@value
struct Bar[v: Int]:
    pass

fn speak[a: Int = 3, msg: StringLiteral = "woof"](bar: Bar[a]):
    print(msg, a)

fn use_inferred():
    speak(Bar[9]())  # prints 'woof 9'
```

As mentioned above, you can also use optional parameters and keyword parameters in a struct:

```mojo
struct KwParamStruct[greeting: String = "Hello", name: String = "🔥mojo🔥"]:
    fn __init__(out self):
        print(greeting, name)

fn use_kw_params():
    var a = KwParamStruct[]()                 # prints 'Hello 🔥mojo🔥'
    var b = KwParamStruct[name="World"]()     # prints 'Hello World'
    var c = KwParamStruct[greeting="Hola"]()  # prints 'Hola 🔥mojo🔥'
```

```mojo
struct KwParamStruct[greeting: String = "Hello", name: String = "🔥mojo🔥"]:
    fn __init__(out self):
        print(greeting, name)

fn use_kw_params():
    var a = KwParamStruct[]()                 # prints 'Hello 🔥mojo🔥'
    var b = KwParamStruct[name="World"]()     # prints 'Hello World'
    var c = KwParamStruct[greeting="Hola"]()  # prints 'Hola 🔥mojo🔥'
```

Mojo supports positional-only and keyword-only parameters, following the same rules as [positional-only and keyword-only arguments](../functions.html#positional-only-and-keyword-only-arguments).

## Infer-only parameters[​](../parameters.1.html#infer-only-parameters "Direct link to Infer-only parameters")

Sometimes you need to declare functions where parameters depend on other parameters. Because the signature is processed left to right, a parameter can only *depend* on a parameter earlier in the parameter list. For example:

```mojo
fn dependent_type[dtype: DType, value: Scalar[dtype]]():
    print("Value: ", value)
    print("Value is floating-point: ", dtype.is_floating_point())

dependent_type[DType.float64, Float64(2.2)]()
```

```mojo
fn dependent_type[dtype: DType, value: Scalar[dtype]]():
    print("Value: ", value)
    print("Value is floating-point: ", dtype.is_floating_point())

dependent_type[DType.float64, Float64(2.2)]()
```

```output
Value:  2.2000000000000002
Value is floating-point:  True
```

```output
Value:  2.2000000000000002
Value is floating-point:  True
```

You can't reverse the position of the `dtype` and `value` parameters, because `value` depends on `dtype`. However, because `dtype` is a required parameter, you can't leave it out of the parameter list and let Mojo infer it from `value`:

```mojo
dependent_type[Float64(2.2)]() # Error!
```

```mojo
dependent_type[Float64(2.2)]() # Error!
```

Infer-only parameters are a special class of parameters that are **always** either inferred from context or specified by keyword. Infer-only parameters are placed at the **beginning** of the parameter list, set off from other parameters by the `//` sigil:

```mojo
fn example[type: CollectionElement, //, list: List[type]]()
```

```mojo
fn example[type: CollectionElement, //, list: List[type]]()
```

Transforming `dtype` into an infer-only parameter solves this problem:

```mojo
fn dependent_type[dtype: DType, //, value: Scalar[dtype]]():
    print("Value: ", value)
    print("Value is floating-point: ", dtype.is_floating_point())

dependent_type[Float64(2.2)]()
```

```mojo
fn dependent_type[dtype: DType, //, value: Scalar[dtype]]():
    print("Value: ", value)
    print("Value is floating-point: ", dtype.is_floating_point())

dependent_type[Float64(2.2)]()
```

```output
Value:  2.2000000000000002
Value is floating-point:  True
```

```output
Value:  2.2000000000000002
Value is floating-point:  True
```

Because infer-only parameters are declared at the beginning of the parameter list, other parameters can depend on them, and the compiler will always attempt to infer the infer-only values from bound parameters or arguments.

There are sometimes cases where it's useful to specify an infer-only parameter by keyword. For example, the [`StringSlice`](https://docs.modular.com/mojo/stdlib/collections/string/string_slice/StringSlice) type is parametric on [origin](../values/lifetimes.html):

```mojo
struct StringSlice[mut: Bool, //, origin: Origin[mut]]: ...
```

```mojo
struct StringSlice[mut: Bool, //, origin: Origin[mut]]: ...
```

Here, the `StringSlice` `mut` parameter is infer-only. The value is usually inferred when you create an instance of `StringSlice`. Binding the `mut` parameter by keyword lets you define a new type that's constrained to an immutable origin:

```mojo
alias ImmutableStringSlice = StringSlice[mut=False]
```

```mojo
alias ImmutableStringSlice = StringSlice[mut=False]
```

If the compiler can't infer the value of an infer-only parameter, and it's not specified by keyword, compilation fails.

## Variadic parameters[​](../parameters.1.html#variadic-parameters "Direct link to Variadic parameters")

Mojo also supports variadic parameters, similar to [Variadic arguments](../functions.html#variadic-arguments):

```mojo
struct MyTensor[*dimensions: Int]:
    pass
```

```mojo
struct MyTensor[*dimensions: Int]:
    pass
```

Variadic parameters currently have some limitations that variadic arguments don't have:

- Variadic parameters must be homogeneous—that is, all the values must be the same type.
- The parameter type must be register-passable.
- The parameter values aren't automatically projected into a `VariadicList`, so you need to construct the list explicitly:

```mojo
fn sum_params[*values: Int]() -> Int:
    alias list = VariadicList(values)
    var sum = 0
    for v in list:
        sum += v
    return sum
```

```mojo
fn sum_params[*values: Int]() -> Int:
    alias list = VariadicList(values)
    var sum = 0
    for v in list:
        sum += v
    return sum
```

Variadic keyword parameters (for example, `**kwparams`) are not supported yet.

## Parameter expressions are just Mojo code[​](../parameters.1.html#parameter-expressions-are-just-mojo-code "Direct link to Parameter expressions are just Mojo code")

A parameter expression is any code expression (such as `a+b`) that occurs where a parameter is expected. Parameter expressions support operators and function calls, just like runtime code, and all parameter types use the same type system as the runtime program (such as `Int` and `DType`).

Because parameter expressions use the same grammar and types as runtime Mojo code, you can use many ["dependent type"](https://en.wikipedia.org/wiki/Dependent_type) features. For example, you might want to define a helper function to concatenate two SIMD vectors:

```mojo
fn concat[ty: DType, len1: Int, len2: Int](
        lhs: SIMD[ty, len1], rhs: SIMD[ty, len2]) -> SIMD[ty, len1+len2]:

    var result = SIMD[ty, len1 + len2]()
    for i in range(len1):
        result[i] = SIMD[ty, 1](lhs[i])
    for j in range(len2):
        result[len1 + j] = SIMD[ty, 1](rhs[j])
    return result

var a = SIMD[DType.float32, 2](1, 2)
var x = concat(a, a)

print('result type:', x.element_type, 'length:', len(x))
```

```mojo
fn concat[ty: DType, len1: Int, len2: Int](
        lhs: SIMD[ty, len1], rhs: SIMD[ty, len2]) -> SIMD[ty, len1+len2]:

    var result = SIMD[ty, len1 + len2]()
    for i in range(len1):
        result[i] = SIMD[ty, 1](lhs[i])
    for j in range(len2):
        result[len1 + j] = SIMD[ty, 1](rhs[j])
    return result

var a = SIMD[DType.float32, 2](1, 2)
var x = concat(a, a)

print('result type:', x.element_type, 'length:', len(x))
```

```output
result type: float32 length: 4
```

```output
result type: float32 length: 4
```

Note that the resulting length is the sum of the input vector lengths, and this is expressed with a simple `+` operation.

### Powerful compile-time programming[​](../parameters.1.html#powerful-compile-time-programming "Direct link to Powerful compile-time programming")

While simple expressions are useful, sometimes you want to write imperative compile-time logic with control flow. You can even do compile-time recursion. For instance, here is an example "tree reduction" algorithm that sums all elements of a vector recursively into a scalar:

```mojo
fn slice[ty: DType, new_size: Int, size: Int](
        x: SIMD[ty, size], offset: Int) -> SIMD[ty, new_size]:
    var result = SIMD[ty, new_size]()
    for i in range(new_size):
        result[i] = SIMD[ty, 1](x[i + offset])
    return result

fn reduce_add[ty: DType, size: Int](x: SIMD[ty, size]) -> Int:
    @parameter
    if size == 1:
        return Int(x[0])
    elif size == 2:
        return Int(x[0]) + Int(x[1])

    # Extract the top/bottom halves, add them, sum the elements.
    alias half_size = size // 2
    var lhs = slice[ty, half_size, size](x, 0)
    var rhs = slice[ty, half_size, size](x, half_size)
    return reduce_add[ty, half_size](lhs + rhs)

var x = SIMD[DType.index, 4](1, 2, 3, 4)
print(x)
print("Elements sum:", reduce_add(x))
```

```mojo
fn slice[ty: DType, new_size: Int, size: Int](
        x: SIMD[ty, size], offset: Int) -> SIMD[ty, new_size]:
    var result = SIMD[ty, new_size]()
    for i in range(new_size):
        result[i] = SIMD[ty, 1](x[i + offset])
    return result

fn reduce_add[ty: DType, size: Int](x: SIMD[ty, size]) -> Int:
    @parameter
    if size == 1:
        return Int(x[0])
    elif size == 2:
        return Int(x[0]) + Int(x[1])

    # Extract the top/bottom halves, add them, sum the elements.
    alias half_size = size // 2
    var lhs = slice[ty, half_size, size](x, 0)
    var rhs = slice[ty, half_size, size](x, half_size)
    return reduce_add[ty, half_size](lhs + rhs)

var x = SIMD[DType.index, 4](1, 2, 3, 4)
print(x)
print("Elements sum:", reduce_add(x))
```

```output
[1, 2, 3, 4]
Elements sum: 10
```

```output
[1, 2, 3, 4]
Elements sum: 10
```

This makes use of the [`@parameter`](../decorators/parameter.html) decorator to create a parametric if condition, which is an `if` statement that runs at compile-time. It requires that its condition be a valid parameter expression, and ensures that only the live branch of the `if` statement is compiled into the program. (This is similar to use of the `@parameter` decorator with a `for` loop shown earlier.)

## Mojo types are just parameter expressions[​](../parameters.1.html#mojo-types-are-just-parameter-expressions "Direct link to Mojo types are just parameter expressions")

While we've shown how you can use parameter expressions within types, type annotations can themselves be arbitrary expressions (just like in Python). Types in Mojo have a special metatype type, allowing type-parametric algorithms and functions to be defined.

For example, we can create a simplified `Array` that supports arbitrary types of elements (via the `AnyTrivialRegType` parameter):

```mojo
from memory import UnsafePointer

struct Array[T: AnyTrivialRegType]:
    var data: UnsafePointer[T]
    var size: Int

    fn __init__(out self, size: Int, value: T):
        self.size = size
        self.data = UnsafePointer[T].alloc(self.size)
        for i in range(self.size):
            (self.data + i).init_pointee_copy(value)

    fn __getitem__(self, i: Int) -> T:
        return self.data[i]

    fn __del__(owned self):
        for i in range(self.size):
            (self.data + i).destroy_pointee()
        self.data.free()

var v = Array[Float32](4, 3.14)
print(v[0], v[1], v[2], v[3])
```

```mojo
from memory import UnsafePointer

struct Array[T: AnyTrivialRegType]:
    var data: UnsafePointer[T]
    var size: Int

    fn __init__(out self, size: Int, value: T):
        self.size = size
        self.data = UnsafePointer[T].alloc(self.size)
        for i in range(self.size):
            (self.data + i).init_pointee_copy(value)

    fn __getitem__(self, i: Int) -> T:
        return self.data[i]

    fn __del__(owned self):
        for i in range(self.size):
            (self.data + i).destroy_pointee()
        self.data.free()

var v = Array[Float32](4, 3.14)
print(v[0], v[1], v[2], v[3])
```

Notice that the `T` parameter is being used as the formal type for the `value` arguments and the return type of the `__getitem__()` function. Parameters allow the `Array` type to provide different APIs based on the different use-cases.

There are many other cases that benefit from more advanced use of parameters. For example, you can execute a closure N times in parallel, feeding in a value from the context, like this:

```mojo
fn parallelize[func: fn (Int) -> None](num_work_items: Int):
    # Not actually parallel: see the 'algorithm' module for real implementation.
    for i in range(num_work_items):
        func(i)
```

```mojo
fn parallelize[func: fn (Int) -> None](num_work_items: Int):
    # Not actually parallel: see the 'algorithm' module for real implementation.
    for i in range(num_work_items):
        func(i)
```

Another example where this is important is with variadic generics, where an algorithm or data structure may need to be defined over a list of heterogeneous types such as for a tuple. Right now, this is not fully supported in Mojo and requires writing some MLIR by hand. In the future, this will be possible in pure Mojo.

## `alias`: named parameter expressions[​](../parameters.1.html#alias-named-parameter-expressions "Direct link to alias-named-parameter-expressions")

It is very common to want to *name* compile-time values. Whereas `var` defines a runtime value, we need a way to define a compile-time temporary value. For this, Mojo uses an `alias` declaration.

For example, the [`DType`](https://docs.modular.com/mojo/stdlib/builtin/dtype/DType) struct implements a simple enum using aliases for the enumerators like this (the actual `DType` implementation details vary a bit):

```mojo
struct DType:
    var value : UI8
    alias invalid = DType(0)
    alias bool = DType(1)
    alias int8 = DType(2)
    alias uint8 = DType(3)
    alias int16 = DType(4)
    alias int16 = DType(5)
    ...
    alias float32 = DType(15)
```

```mojo
struct DType:
    var value : UI8
    alias invalid = DType(0)
    alias bool = DType(1)
    alias int8 = DType(2)
    alias uint8 = DType(3)
    alias int16 = DType(4)
    alias int16 = DType(5)
    ...
    alias float32 = DType(15)
```

This allows clients to use `DType.float32` as a parameter expression (which also works as a runtime value) naturally. Note that this is invoking the runtime constructor for `DType` at compile-time.

Types are another common use for aliases. Because types are compile-time expressions, it is handy to be able to do things like this:

```mojo
alias Float16 = SIMD[DType.float16, 1]
alias UInt8 = SIMD[DType.uint8, 1]

var x: Float16 = 0  # Float16 works like a "typedef"
```

```mojo
alias Float16 = SIMD[DType.float16, 1]
alias UInt8 = SIMD[DType.uint8, 1]

var x: Float16 = 0  # Float16 works like a "typedef"
```

Like `var` variables, aliases obey scope, and you can use local aliases within functions as you'd expect.

## Fully-bound, partially-bound, and unbound types[​](../parameters.1.html#fully-bound-partially-bound-and-unbound-types "Direct link to Fully-bound, partially-bound, and unbound types")

A parametric type with its parameters specified is said to be *fully-bound*. That is, all of its parameters are bound to values. As mentioned before, you can only instantiate a fully-bound type (sometimes called a *concrete type*).

However, parametric types can be *unbound* or *partially bound* in some contexts. For example, you can alias a partially-bound type to create a new type that requires fewer parameters:

```mojo
from collections import Dict

alias StringKeyDict = Dict[String, _]
var b = StringKeyDict[UInt8]()
b["answer"] = 42
```

```mojo
from collections import Dict

alias StringKeyDict = Dict[String, _]
var b = StringKeyDict[UInt8]()
b["answer"] = 42
```

Here, `StringKeyDict` is a type alias for a `Dict` that takes `String` keys. The underscore `_` in the parameter list indicates that the second parameter, `V` (the value type), is unbound. You specify the `V` parameter later, when you use `StringKeyDict`.

For example, given the following type:

```mojo
struct MyType[s: String, i: Int, i2: Int, b: Bool = True]:
    pass
```

```mojo
struct MyType[s: String, i: Int, i2: Int, b: Bool = True]:
    pass
```

It can appear in code in the following forms:

- *Fully bound*, with all of its parameters specified:

  ```mojo
  MyType["Hello", 3, 4, True]
  ```

  ```mojo
  MyType["Hello", 3, 4, True]
  ```
- *Partially bound*, with *some but not all* of its parameters specified:

  ```mojo
  MyType["Hola", _, _, True]
  ```

  ```mojo
  MyType["Hola", _, _, True]
  ```
- *Unbound*, with no parameters specified:

  ```mojo
  MyType[_, _, _, _]
  ```

  ```mojo
  MyType[_, _, _, _]
  ```

You can also use the star-underscore expression `*_` to unbind an arbitrary number of positional parameters at the end of a parameter list.

```mojo
# These two types are equivalent
MyType["Hello", *_]
MyType["Hello", _, _, _]
```

```mojo
# These two types are equivalent
MyType["Hello", *_]
MyType["Hello", _, _, _]
```

The `*_` expression specifically matches any parameters that can be specified by position (positional-only or positional-or-keyword). To unbind keyword-only parameters, use the double-star-underscore expression, `**_`, which matches any parameters that can be specified by keyword (positional-or-keyword or keyword-only).

```mojo
@value
struct KeyWordStruct[pos_or_kw: Int, *, kw_only: Int = 10]:
    pass

# Unbind both pos_or_kw and kw_only parameters
fn use_kw_struct(k: KeyWordStruct[**_]):
    pass

def main():
    use_kw_struct(KeyWordStruct[10, kw_only=11]())
```

```mojo
@value
struct KeyWordStruct[pos_or_kw: Int, *, kw_only: Int = 10]:
    pass

# Unbind both pos_or_kw and kw_only parameters
fn use_kw_struct(k: KeyWordStruct[**_]):
    pass

def main():
    use_kw_struct(KeyWordStruct[10, kw_only=11]())
```

When a parameter is explicitly unbound with the `_`, `*_`, or `**_` expressions, you **must** specify a value for that parameter to use the type. Any default value from the original type declaration is ignored.

Partially-bound and unbound parametric types can be used in some contexts where the missing (unbound) parameters will be supplied later—such as in [aliases](../parameters.1.html#alias-named-parameter-expressions) and [automatically parameterized functions](../parameters.1.html#automatic-parameterization-of-functions).

### Omitted parameters[​](../parameters.1.html#omitted-parameters "Direct link to Omitted parameters")

Mojo also supports an alternate format for unbound parameter where the parameter is simply omitted from the expression:

```mojo
# Partially bound
MyType["Hi there"]
# Unbound
MyType
```

```mojo
# Partially bound
MyType["Hi there"]
# Unbound
MyType
```

This format differs from the explicit unbinding syntax described above in that the default values for omitted parameters are bound immediately. For example, the following expressions are equivalent:

```mojo
MyType["Hi there"]
# equivalent to
MyType["Hi there", _, _, True] # Uses the default value for `b`
```

```mojo
MyType["Hi there"]
# equivalent to
MyType["Hi there", _, _, True] # Uses the default value for `b`
```

This format is currently supported for backwards compatibility. We intend to deprecate this format in the future in favor of the explicit unbinding syntax.

## Automatic parameterization of functions[​](../parameters.1.html#automatic-parameterization-of-functions "Direct link to Automatic parameterization of functions")

Mojo supports "automatic" parameterization of functions. If a function argument type is a [partially-bound or unbound type](../parameters.1.html#fully-bound-partially-bound-and-unbound-types), the unbound parameters are automatically added as input parameters on the function. This is easier to understand with an example:

```mojo
fn print_params(vec: SIMD[*_]):
    print(vec.type)
    print(vec.size)

var v = SIMD[DType.float64, 4](1.0, 2.0, 3.0, 4.0)
print_params(v)
```

```mojo
fn print_params(vec: SIMD[*_]):
    print(vec.type)
    print(vec.size)

var v = SIMD[DType.float64, 4](1.0, 2.0, 3.0, 4.0)
print_params(v)
```

```output
float64
4
```

```output
float64
4
```

In the above example, the `print_params` function is automatically parameterized. The `vec` argument takes an argument of type `SIMD[*_]`. This is an [unbound parameterized type](../parameters.1.html#fully-bound-partially-bound-and-unbound-types)—that is, it doesn't specify any parameter values for the type. Mojo treats the unbound parameters on `vec` as infer-only parameters on the function. This is roughly equivalent to the following codes:

```mojo
fn print_params[t: DType, s: Int, //](vec: SIMD[t, s]):
    print(vec.type)
    print(vec.size)
```

```mojo
fn print_params[t: DType, s: Int, //](vec: SIMD[t, s]):
    print(vec.type)
    print(vec.size)
```

When you call `print_params()` you must pass it a concrete instance of the `SIMD` type—that is, one with all of its parameters specified, like `SIMD[DType.float64, 4]`. The Mojo compiler *infers* the parameter values from the input argument.

With a manually parameterized function, you can access the input parameters by name (for example, `t` and `s` in the previous example). For an automatically parameterized function, you can access the parameters as attributes on the argument (for example, `vec.type`).

This ability to access a type's input parameters is not specific to automatically parameterized functions, you can use it anywhere. You can access the input parameters of a parameterized type as attributes on the type itself:

```mojo
fn on_type():
    print(SIMD[DType.float32, 2].size) # prints 2
```

```mojo
fn on_type():
    print(SIMD[DType.float32, 2].size) # prints 2
```

Or as attributes on an *instance* of the type:

```mojo
fn on_instance():
    var x = SIMD[DType.int32, 2](4, 8)
    print(x.type) # prints int32
```

```mojo
fn on_instance():
    var x = SIMD[DType.int32, 2](4, 8)
    print(x.type) # prints int32
```

You can even use this syntax in the function's signature to define a function's arguments and return type based on an argument's parameters. For example, if you want your function to take two SIMD vectors with the same type and size, you can write code like this:

```mojo
fn interleave(v1: SIMD, v2: __type_of(v1)) -> SIMD[v1.type, v1.size*2]:
    var result = SIMD[v1.type, v1.size*2]()
    for i in range(v1.size):
        result[i*2] = SIMD[v1.type, 1](v1[i])
        result[i*2+1] = SIMD[v1.type, 1](v2[i])
    return result

var a = SIMD[DType.int16, 4](1, 2, 3, 4)
var b = SIMD[DType.int16, 4](0, 0, 0, 0)
var c = interleave(a, b)
print(c)
```

```mojo
fn interleave(v1: SIMD, v2: __type_of(v1)) -> SIMD[v1.type, v1.size*2]:
    var result = SIMD[v1.type, v1.size*2]()
    for i in range(v1.size):
        result[i*2] = SIMD[v1.type, 1](v1[i])
        result[i*2+1] = SIMD[v1.type, 1](v2[i])
    return result

var a = SIMD[DType.int16, 4](1, 2, 3, 4)
var b = SIMD[DType.int16, 4](0, 0, 0, 0)
var c = interleave(a, b)
print(c)
```

```output
[1, 0, 2, 0, 3, 0, 4, 0]
```

```output
[1, 0, 2, 0, 3, 0, 4, 0]
```

As shown in the example, you can use the magic `__type_of(x)` call if you just want to match the type of an argument. In this case, it's more convenient and compact that writing the equivalent `SIMD[v1.type, v1.size]`.

### Automatic parameterization of parameters[​](../parameters.1.html#automatic-parameterization-of-parameters "Direct link to Automatic parameterization of parameters")

You can also take advantage of automatic parameterization in a function's parameter list. For example:

```mojo
fn foo[value: SIMD]():
    pass

# Equivalent to:
fn foo[type: DType, size: Int, //, value: SIMD[type, size]]():
    pass
```

```mojo
fn foo[value: SIMD]():
    pass

# Equivalent to:
fn foo[type: DType, size: Int, //, value: SIMD[type, size]]():
    pass
```

### Automatic parameterization with partially-bound types[​](../parameters.1.html#automatic-parameterization-with-partially-bound-types "Direct link to Automatic parameterization with partially-bound types")

Mojo also supports automatic parameterization: with [partially-bound parameterized types](../parameters.1.html#fully-bound-partially-bound-and-unbound-types) (that is, types with some but not all of the parameters specified).

For example, suppose we have a `Fudge` struct with three parameters:

```mojo
@value
struct Fudge[sugar: Int, cream: Int, chocolate: Int = 7](Stringable):
    fn __str__(self) -> String:
        return String.write("Fudge (", sugar, ",", cream, ",", chocolate, ")")
```

```mojo
@value
struct Fudge[sugar: Int, cream: Int, chocolate: Int = 7](Stringable):
    fn __str__(self) -> String:
        return String.write("Fudge (", sugar, ",", cream, ",", chocolate, ")")
```

We can write a function that takes a `Fudge` argument with just one bound parameter (it's *partially bound*):

```mojo
fn eat(f: Fudge[5, *_]):
    print("Ate " + String(f))
```

```mojo
fn eat(f: Fudge[5, *_]):
    print("Ate " + String(f))
```

The `eat()` function takes a `Fudge` struct with the first parameter (`sugar`) bound to the value 5. The second and third parameters, `cream` and `chocolate` are unbound.

The unbound `cream` and `chocolate` parameters become implicit input parameters on the `eat` function. In practice, this is roughly equivalent to writing:

```mojo
fn eat[cr: Int, ch: Int](f: Fudge[5, cr, ch]):
    print("Ate", String(f))
```

```mojo
fn eat[cr: Int, ch: Int](f: Fudge[5, cr, ch]):
    print("Ate", String(f))
```

In both cases, we can call the function by passing in an instance with the `cream` and `chocolate` parameters bound:

```mojo
eat(Fudge[5, 5, 7]())
eat(Fudge[5, 8, 9]())
```

```mojo
eat(Fudge[5, 5, 7]())
eat(Fudge[5, 8, 9]())
```

```output
Ate Fudge (5,5,7)
Ate Fudge (5,8,9)
```

```output
Ate Fudge (5,5,7)
Ate Fudge (5,8,9)
```

If you try to pass in an argument with a `sugar` value other than 5, compilation fails, because it doesn't match the argument type:

```mojo
eat(Fudge[12, 5, 7]())
# ERROR: invalid call to 'eat': argument #0 cannot be converted from 'Fudge[12, 5, 7]' to 'Fudge[5, 5, 7]'
```

```mojo
eat(Fudge[12, 5, 7]())
# ERROR: invalid call to 'eat': argument #0 cannot be converted from 'Fudge[12, 5, 7]' to 'Fudge[5, 5, 7]'
```

You can also explicitly unbind individual parameters. This gives you more freedom in specifying unbound parameters.

For example, you might want to let the user specify values for `sugar` and `chocolate`, and leave `cream` constant. To do this, replace each unbound parameter value with a single underscore (`_`):

```mojo
fn devour(f: Fudge[_, 6, _]):
    print("Devoured",  String(f))
```

```mojo
fn devour(f: Fudge[_, 6, _]):
    print("Devoured",  String(f))
```

Again, the unbound parameters (`sugar` and `chocolate`) are added as implicit input parameters on the function. This version is roughly equivalent to the following code, where these two values are explicitly bound to the input parameters, `su` and `ch`:

```mojo
fn devour[su: Int, ch: Int](f: Fudge[su, 6, ch]):
    print("Devoured", String(f))
```

```mojo
fn devour[su: Int, ch: Int](f: Fudge[su, 6, ch]):
    print("Devoured", String(f))
```

You can also specify parameters by keyword, or mix positional and keyword parameters, so the following function is roughly equivalent to the previous one: the first parameter, `sugar` is explicitly unbound with the underscore character. The `chocolate` parameter is unbound using the keyword syntax, `chocolate=_`. And `cream` is explicitly bound to the value 6:

```mojo
fn devour(f: Fudge[_, chocolate=_, cream=6]):
    print("Devoured", String(f))
```

```mojo
fn devour(f: Fudge[_, chocolate=_, cream=6]):
    print("Devoured", String(f))
```

All three versions of the `devour()` function work with the following calls:

```mojo
devour(Fudge[3, 6, 9]())
devour(Fudge[4, 6, 8]())
```

```mojo
devour(Fudge[3, 6, 9]())
devour(Fudge[4, 6, 8]())
```

```output
Devoured Fudge (3,6,9)
Devoured Fudge (4,6,8)
```

```output
Devoured Fudge (3,6,9)
Devoured Fudge (4,6,8)
```

### Legacy syntax (omitted parameters)[​](../parameters.1.html#legacy-syntax-omitted-parameters "Direct link to Legacy syntax (omitted parameters)")

You can also specify an unbound or partially-bound type by omitting parameters: for example:

```mojo
fn nibble(f: Fudge[5]):
    print("Ate", String(f))

nibble(Fudge[5, 4, 7]())

```

```mojo
fn nibble(f: Fudge[5]):
    print("Ate", String(f))

nibble(Fudge[5, 4, 7]())

```

```output
Ate Fudge (5,4,7)
```

```output
Ate Fudge (5,4,7)
```

Here, `Fudge[5]` works like `Fudge[5, *_]` **except** in the handling of parameters with default values. Instead of discarding the default value of `chocolate`, `Fudge[5]` binds the default value immediately, making it equivalent to: `Fudge[5, _, 7]`.

This means that the following code won't compile with the previous definition for the `nibble()` function, since it doesn't use the default value for `chocolate`:

```mojo
nibble(Fudge[5, 5, 9]())
# ERROR: invalid call to 'nibble': argument #0 cannot be converted from 'Fudge[5, 5, 9]' to 'Fudge[5, 5, 7]'
```

```mojo
nibble(Fudge[5, 5, 9]())
# ERROR: invalid call to 'nibble': argument #0 cannot be converted from 'Fudge[5, 5, 9]' to 'Fudge[5, 5, 7]'
```

TODO

Support for omitting unbound parameters will eventually be deprecated in favor of explicitly unbound parameters using `_` and `*_`.

## The `rebind()` builtin[​](../parameters.1.html#the-rebind-builtin "Direct link to the-rebind-builtin")

One of the consequences of Mojo not performing function instantiation in the parser like C++ is that Mojo cannot always figure out whether some parametric types are equal and complain about an invalid conversion. This typically occurs in static dispatch patterns. For example, the following code won't compile:

```mojo
fn take_simd8(x: SIMD[DType.float32, 8]):
    pass

fn generic_simd[nelts: Int](x: SIMD[DType.float32, nelts]):
    @parameter
    if nelts == 8:
        take_simd8(x)
```

```mojo
fn take_simd8(x: SIMD[DType.float32, 8]):
    pass

fn generic_simd[nelts: Int](x: SIMD[DType.float32, nelts]):
    @parameter
    if nelts == 8:
        take_simd8(x)
```

The parser will complain:

```plaintext
error: invalid call to 'take_simd8': argument #0 cannot be converted from
'SIMD[f32, nelts]' to 'SIMD[f32, 8]'
        take_simd8(x)
        ~~~~~~~~~~^~~
```

```plaintext
error: invalid call to 'take_simd8': argument #0 cannot be converted from
'SIMD[f32, nelts]' to 'SIMD[f32, 8]'
        take_simd8(x)
        ~~~~~~~~~~^~~
```

This is because the parser fully type-checks the function without instantiation, and the type of `x` is still `SIMD[f32, nelts]`, and not `SIMD[f32, 8]`, despite the static conditional. The remedy is to manually "rebind" the type of `x`, using the `rebind` builtin, which inserts a compile-time assert that the input and result types resolve to the same type after function instantiation:

```mojo
fn take_simd8(x: SIMD[DType.float32, 8]):
    pass

fn generic_simd[nelts: Int](x: SIMD[DType.float32, nelts]):
    @parameter
    if nelts == 8:
        take_simd8(rebind[SIMD[DType.float32, 8]](x))
```

```mojo
fn take_simd8(x: SIMD[DType.float32, 8]):
    pass

fn generic_simd[nelts: Int](x: SIMD[DType.float32, nelts]):
    @parameter
    if nelts == 8:
        take_simd8(rebind[SIMD[DType.float32, 8]](x))
```



[Submit](https://github.com/modular/mojo/issues/new?assignees=&labels=documentation%2Cmojo-repo&projects=&template=doc_issue.yaml&title=%5BDocs%5D&url=https%3A%2F%2Fdocs.modular.com%2Fmojo%2Fmanual%2Fparameters%2F)

- [Parameterized functions](../parameters.1.html#parameterized-functions)
- [Anatomy of a parameter list](../parameters.1.html#anatomy-of-a-parameter-list)
- [Parameters and generics](../parameters.1.html#parameters-and-generics)
- [Parameterized structs](../parameters.1.html#parameterized-structs)

  - [Conditional conformance](../parameters.1.html#conditional-conformance)
  - [Case study: the SIMD type](../parameters.1.html#case-study-the-simd-type)
- [Overloading on parameters](../parameters.1.html#overloading-on-parameters)
- [Using parameterized types and functions](../parameters.1.html#using-parameterized-types-and-functions)

  - [Parameter inference](../parameters.1.html#parameter-inference)
- [Optional parameters and keyword parameters](../parameters.1.html#optional-parameters-and-keyword-parameters)
- [Infer-only parameters](../parameters.1.html#infer-only-parameters)
- [Variadic parameters](../parameters.1.html#variadic-parameters)
- [Parameter expressions are just Mojo code](../parameters.1.html#parameter-expressions-are-just-mojo-code)

  - [Powerful compile-time programming](../parameters.1.html#powerful-compile-time-programming)
- [Mojo types are just parameter expressions](../parameters.1.html#mojo-types-are-just-parameter-expressions)
- [`alias`: named parameter expressions](../parameters.1.html#alias-named-parameter-expressions)
- [Fully-bound, partially-bound, and unbound types](../parameters.1.html#fully-bound-partially-bound-and-unbound-types)

  - [Omitted parameters](../parameters.1.html#omitted-parameters)
- [Automatic parameterization of functions](../parameters.1.html#automatic-parameterization-of-functions)

  - [Automatic parameterization of parameters](../parameters.1.html#automatic-parameterization-of-parameters)
  - [Automatic parameterization with partially-bound types](../parameters.1.html#automatic-parameterization-with-partially-bound-types)
  - [Legacy syntax (omitted parameters)](../parameters.1.html#legacy-syntax-omitted-parameters)
- [The `rebind()` builtin](../parameters.1.html#the-rebind-builtin)










