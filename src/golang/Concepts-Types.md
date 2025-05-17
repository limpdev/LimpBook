# TYPES

>   

*It's just a label!* → types tell the compiler ==what *it* is==; thereby, allowing it to **infer** ==what can be done with *it*==.

---

<details><summary>🔖 <strong>CHEATSHEET</strong></summary>

| You want to...                                  | Use...               |
| ----------------------------------------------- | -------------------- |
| Represent a **single** number, string, etc.     | Built-in types       |
| **Group** multiple values together              | `struct`             |
| Create a **list**                               | `[]T` (slice)        |
| Use **key-value** storage                       | `map[K]V`            |
| Model **behavior**                              | `interface`          |
| Add **logic** to a value                        | Custom type + method |
| **Add** type safety to **primitives**           | `type MyInt int`     |

</details>

---

##  Built-In

> [!NOTE]
> Go's basic type system can be summed up with these:
> `int`, `float64`, `string`, `bool`, `rune`, `byte`

### Composite Types

```Go
array     // [5]int
slice     // []int
map       // map[string]int
struct    // struct { name string; age int }
pointer   // *int
function  // func(string) bool
channel   // chan int
interface // interface{}
```

- These are made for more complex stuctures - ==yes, even functions are types!==
- And you can <strong><u>delcare your own</u></strong>

### Declaration of Types

> `type UserID int` ← A user-id made up of purely integers *(1, 2, 3, ...)*.

... and, now `UserID` is an actual type. It is an `int`, *though not all `int` are `UserID`!*. ==Intent is the whole point==, so be intentional.

```Go
var a UserID = 42       // ✅
var b int = a           // ❌ ⇾ think again motherfucker.
```

1. Type Aliases

`type ID = int` → *less intentional and, consequently, `ID` is NOT a type in this scenario. It's just an alias.*

2. Type Struct, or `Structs`

> A *struct* is a [composite type](), but can bundle many values!

```Go
type User struct {
    Name string
    Age  int
}
```

3. `Interfaces` Are Contracts

Any type that has a `Read([]byte) (n int, err error)` method *satisfies* this interface. Interfaces define ==behavior==, rather than structure.

```Go
type Reader interface {
    Read(p []byte) (n int, err error)
}
```

## Methods on Types

> ==*On your own types*==, you may define `methods`.

```Go
type UserID int

func (id UserID) IsValid() bool {
    return id > 0
}
```

##  THINKING...

Rather than thinking about *'what kind of data'* you hold, start thinking:

1. What *operations* should be allowed on this type?

2. What *units of behavior* do these types represent?

3. Should this be a *completely new* type?

***
