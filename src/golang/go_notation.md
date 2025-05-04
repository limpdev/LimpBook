---
title: Go's Standard Notation | Go
draft: false
---

# Function Signature Format (FSF)

The Function Signature Format (FSF) is a standard notation for describing the signature of a function in Go. It is a concise and human-readable way to represent the type signature of a function.

```go
func FunctionName(param1 Type1, param2 Type2) ReturnType
```

#### Real Example:

`func WindowSetTitle(ctx context.Context, title string)`

- There is **NO ReturnType**, therefore, this function returns nothing. It simply performs an **ACTION**, and then exits.
- The function name is `WindowSetTitle`. It takes two parameters: `ctx` of type `context.Context`, and `title` of type `string`. The `ctx` will likely be defined within a struct, and the `title` will be the string that will be set as the title of the window.
