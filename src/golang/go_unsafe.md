---
title: unsafe | Golang
draft: false
description: https://devdocs.io/go/fmt/index
---

## Package unsafe

*   `import "unsafe"`
*   [Overview](https://devdocs.io/go/fmt/index#pkg-overview)
*   [Index](https://devdocs.io/go/fmt/index#pkg-index)

## Overview

Package unsafe contains operations that step around the type safety of Go programs.

Packages that import unsafe may be non-portable and are not protected by the Go 1 compatibility guidelines.

## Index

*   [func Alignof(x ArbitraryType) uintptr](https://devdocs.io/go/fmt/index#Alignof)
*   [func Offsetof(x ArbitraryType) uintptr](https://devdocs.io/go/fmt/index#Offsetof)
*   [func Sizeof(x ArbitraryType) uintptr](https://devdocs.io/go/fmt/index#Sizeof)
*   [func String(ptr *byte, len IntegerType) string](https://devdocs.io/go/fmt/index#String)
*   [func StringData(str string) *byte](https://devdocs.io/go/fmt/index#StringData)
*   [type ArbitraryType](https://devdocs.io/go/fmt/index#ArbitraryType)
*   [func Slice(ptr *ArbitraryType, len IntegerType) []ArbitraryType](https://devdocs.io/go/fmt/index#Slice)
*   [func SliceData(slice []ArbitraryType) *ArbitraryType](https://devdocs.io/go/fmt/index#SliceData)
*   [type IntegerType](https://devdocs.io/go/fmt/index#IntegerType)
*   [type Pointer](https://devdocs.io/go/fmt/index#Pointer)
*   [func Add(ptr Pointer, len IntegerType) Pointer](https://devdocs.io/go/fmt/index#Add)

### Package files

unsafe.go

## func Alignof

```go
func Alignof(x ArbitraryType) uintptr
```

## func Offsetof

```go
func Offsetof(x ArbitraryType) uintptr
```

## func Sizeof

```go
func Sizeof(x ArbitraryType) uintptr
```

## func String

```go
func String(ptr *byte, len IntegerType) string
```

The len argument must be of integer type or an untyped constant. A constant len argument must be non-negative and representable by a value of type int; if it is an untyped constant it is given type int. At run time, if len is negative, or if ptr is nil and len is not zero, a run-time panic occurs.

Since Go strings are immutable, the bytes passed to String must not be modified as long as the returned string value exists.

## func StringData

```go
func StringData(str string) *byte
```

Since Go strings are immutable, the bytes returned by StringData must not be modified.

## type ArbitraryType

ArbitraryType is here for the purposes of documentation only and is not actually part of the unsafe package. It represents the type of an arbitrary Go expression.

```go
type ArbitraryType int
```

```go
func Slice(ptr *ArbitraryType, len IntegerType) []ArbitraryType
```

```go
(*[len]ArbitraryType)(unsafe.Pointer(ptr))[:]
```

The len argument must be of integer type or an untyped constant. A constant len argument must be non-negative and representable by a value of type int; if it is an untyped constant it is given type int. At run time, if len is negative, or if ptr is nil and len is not zero, a run-time panic occurs.

### func SliceData

```go
func SliceData(slice []ArbitraryType) *ArbitraryType
```

*   If cap(slice) > 0, SliceData returns &slice[:1][0].
*   If slice == nil, SliceData returns nil.
*   Otherwise, SliceData returns a non-nil pointer to an unspecified memory address.

## type IntegerType

IntegerType is here for the purposes of documentation only and is not actually part of the unsafe package. It represents any arbitrary integer type.

```go
type IntegerType int
```

Pointer represents a pointer to an arbitrary type. There are four special operations available for type Pointer that are not available for other types:

*   A pointer value of any type can be converted to a Pointer.
*   A Pointer can be converted to a pointer value of any type.
*   A uintptr can be converted to a Pointer.
*   A Pointer can be converted to a uintptr.

Pointer therefore allows a program to defeat the type system and read and write arbitrary memory. It should be used with extreme care.

The following patterns involving Pointer are valid. Code not using these patterns is likely to be invalid today or to become invalid in the future. Even the valid patterns below come with important caveats.

Running "go vet" can help find uses of Pointer that do not conform to these patterns, but silence from "go vet" is not a guarantee that the code is valid.

(1) Conversion of a *T1 to Pointer to *T2.

Provided that T2 is no larger than T1 and that the two share an equivalent memory layout, this conversion allows reinterpreting data of one type as data of another type. An example is the implementation of math.Float64bits:

```go
func Float64bits(f float64) uint64 {
return *(*uint64)(unsafe.Pointer(&f))
}
```

Converting a Pointer to a uintptr produces the memory address of the value pointed at, as an integer. The usual use for such a uintptr is to print it.

Conversion of a uintptr back to Pointer is not valid in general.

A uintptr is an integer, not a reference. Converting a Pointer to a uintptr creates an integer value with no pointer semantics. Even if a uintptr holds the address of some object, the garbage collector will not update that uintptr's value if the object moves, nor will that uintptr keep the object from being reclaimed.

The remaining patterns enumerate the only valid conversions from uintptr to Pointer.

(3) Conversion of a Pointer to a uintptr and back, with arithmetic.

If p points into an allocated object, it can be advanced through the object by conversion to uintptr, addition of an offset, and conversion back to Pointer.

```go
p = unsafe.Pointer(uintptr(p) + offset)
```

```go
f := unsafe.Pointer(uintptr(unsafe.Pointer(&s)) + unsafe.Offsetof(s.f))


e := unsafe.Pointer(uintptr(unsafe.Pointer(&x[0])) + i*unsafe.Sizeof(x[0]))
```

Unlike in C, it is not valid to advance a pointer just beyond the end of its original allocation:

```go
var s thing
end = unsafe.Pointer(uintptr(unsafe.Pointer(&s)) + unsafe.Sizeof(s))


b := make([]byte, n)
end = unsafe.Pointer(uintptr(unsafe.Pointer(&b[0])) + uintptr(n))
```

```go

u := uintptr(p)
p = unsafe.Pointer(u + offset)
```

```go
u := unsafe.Pointer(nil)
p := unsafe.Pointer(uintptr(u) + offset)
```

The Syscall functions in package syscall pass their uintptr arguments directly to the operating system, which then may, depending on the details of the call, reinterpret some of them as pointers. That is, the system call implementation is implicitly converting certain arguments back from uintptr to pointer.

If a pointer argument must be converted to uintptr for use as an argument, that conversion must appear in the call expression itself:

```go
syscall.Syscall(SYS_READ, uintptr(fd), uintptr(unsafe.Pointer(p)), uintptr(n))
```

For the compiler to recognize this pattern, the conversion must appear in the argument list:

```go

u := uintptr(unsafe.Pointer(p))
syscall.Syscall(SYS_READ, uintptr(fd), u, uintptr(n))
```

Package reflect's Value methods named Pointer and UnsafeAddr return type uintptr instead of unsafe.Pointer to keep callers from changing the result to an arbitrary type without first importing "unsafe". However, this means that the result is fragile and must be converted to Pointer immediately after making the call, in the same expression:

```go
p := (*int)(unsafe.Pointer(reflect.ValueOf(new(int)).Pointer()))
```

```go

u := reflect.ValueOf(new(int)).Pointer()
p := (*int)(unsafe.Pointer(u))
```

As in the previous case, the reflect data structures SliceHeader and StringHeader declare the field Data as a uintptr to keep callers from changing the result to an arbitrary type without first importing "unsafe". However, this means that SliceHeader and StringHeader are only valid when interpreting the content of an actual slice or string value.

```go
var s string
hdr := (*reflect.StringHeader)(unsafe.Pointer(&s))
hdr.Data = uintptr(unsafe.Pointer(p))
hdr.Len = n
```

In general, reflect.SliceHeader and reflect.StringHeader should be used only as *reflect.SliceHeader and *reflect.StringHeader pointing at actual slices or strings, never as plain structs. A program should not declare or allocate variables of these struct types.

```go
var hdr reflect.StringHeader
hdr.Data = uintptr(unsafe.Pointer(p))
hdr.Len = n
s := *(*string)(unsafe.Pointer(&hdr))
```

### func Add

```go
func Add(ptr Pointer, len IntegerType) Pointer
```
