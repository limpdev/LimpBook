---
title: maps | Golang
draft: false
---

## Package maps

*   `import "maps"`
*   [Overview](https://devdocs.io/go/fmt/index#pkg-overview)
*   [Index](https://devdocs.io/go/fmt/index#pkg-index)
*   [Examples](https://devdocs.io/go/fmt/index#pkg-examples)

## Overview

Package maps defines various functions useful with maps of any type.

This package does not have any special handling for non-reflexive keys (keys k where k != k), such as floating-point NaNs.

## Index

*   [func All[Map ~map[K]V, K comparable, V any](m Map) iter.Seq2[K, V]](https://devdocs.io/go/fmt/index#All)
*   [func Clone[M ~map[K]V, K comparable, V any](m M) M](https://devdocs.io/go/fmt/index#Clone)
*   [func Collect[K comparable, V any](seq iter.Seq2[K, V]) map[K]V](https://devdocs.io/go/fmt/index#Collect)
*   [func Copy[M1 ~map[K]V, M2 ~map[K]V, K comparable, V any](dst M1, src M2)](https://devdocs.io/go/fmt/index#Copy)
*   [func DeleteFunc[M ~map[K]V, K comparable, V any](m M, del func(K, V) bool)](https://devdocs.io/go/fmt/index#DeleteFunc)
*   [func Equal[M1, M2 ~map[K]V, K, V comparable](m1 M1, m2 M2) bool](https://devdocs.io/go/fmt/index#Equal)
*   [func EqualFunc[M1 ~map[K]V1, M2 ~map[K]V2, K comparable, V1, V2 any](m1 M1, m2 M2, eq func(V1, V2) bool) bool](https://devdocs.io/go/fmt/index#EqualFunc)
*   [func Insert[Map ~map[K]V, K comparable, V any](m Map, seq iter.Seq2[K, V])](https://devdocs.io/go/fmt/index#Insert)
*   [func Keys[Map ~map[K]V, K comparable, V any](m Map) iter.Seq[K]](https://devdocs.io/go/fmt/index#Keys)
*   [func Values[Map ~map[K]V, K comparable, V any](m Map) iter.Seq[V]](https://devdocs.io/go/fmt/index#Values)

### Package files

iter.go maps.go

## func All 1.23

```go
func All[Map ~map[K]V, K comparable, V any](m Map) iter.Seq2[K, V]
```

#### Example

Code:

```go
m1 := map[string]int{
    "one": 1,
    "two": 2,
}
m2 := map[string]int{
    "one": 10,
}
maps.Insert(m2, maps.All(m1))
fmt.Println("m2 is:", m2)
```

```go
m2 is: map[one:1 two:2]
```

```go
func Clone[M ~map[K]V, K comparable, V any](m M) M
```

#### Example

Code:

```go
m1 := map[string]int{
    "key": 1,
}
m2 := maps.Clone(m1)
m2["key"] = 100
fmt.Println(m1["key"])
fmt.Println(m2["key"])

m3 := map[string][]int{
    "key": {1, 2, 3},
}
m4 := maps.Clone(m3)
fmt.Println(m4["key"][0])
m4["key"][0] = 100
fmt.Println(m3["key"][0])
fmt.Println(m4["key"][0])

```

```go
1
100
1
100
100
```

```go
func Collect[K comparable, V any](seq iter.Seq2[K, V]) map[K]V
```

#### Example

Code:

```go
s1 := []string{"zero", "one", "two", "three"}
m1 := maps.Collect(slices.All(s1))
fmt.Println("m1 is:", m1)
```

```go
m1 is: map[0:zero 1:one 2:two 3:three]
```

```go
func Copy[M1 ~map[K]V, M2 ~map[K]V, K comparable, V any](dst M1, src M2)
```

#### Example

Code:

```go
m1 := map[string]int{
    "one": 1,
    "two": 2,
}
m2 := map[string]int{
    "one": 10,
}

maps.Copy(m2, m1)
fmt.Println("m2 is:", m2)

m2["one"] = 100
fmt.Println("m1 is:", m1)
fmt.Println("m2 is:", m2)

m3 := map[string][]int{
    "one": {1, 2, 3},
    "two": {4, 5, 6},
}
m4 := map[string][]int{
    "one": {7, 8, 9},
}

maps.Copy(m4, m3)
fmt.Println("m4 is:", m4)

m4["one"][0] = 100
fmt.Println("m3 is:", m3)
fmt.Println("m4 is:", m4)

```

```go
m2 is: map[one:1 two:2]
m1 is: map[one:1 two:2]
m2 is: map[one:100 two:2]
m4 is: map[one:[1 2 3] two:[4 5 6]]
m3 is: map[one:[100 2 3] two:[4 5 6]]
m4 is: map[one:[100 2 3] two:[4 5 6]]
```

```go
func DeleteFunc[M ~map[K]V, K comparable, V any](m M, del func(K, V) bool)
```

#### Example

Code:

```go
m := map[string]int{
    "one":   1,
    "two":   2,
    "three": 3,
    "four":  4,
}
maps.DeleteFunc(m, func(k string, v int) bool {
    return v%2 != 0
})
fmt.Println(m)
```

```go
map[four:4 two:2]
```

```go
func Equal[M1, M2 ~map[K]V, K, V comparable](m1 M1, m2 M2) bool
```

#### Example

Code:

```go
m1 := map[int]string{
    1:    "one",
    10:   "Ten",
    1000: "THOUSAND",
}
m2 := map[int]string{
    1:    "one",
    10:   "Ten",
    1000: "THOUSAND",
}
m3 := map[int]string{
    1:    "one",
    10:   "ten",
    1000: "thousand",
}

fmt.Println(maps.Equal(m1, m2))
fmt.Println(maps.Equal(m1, m3))
```

```go
true
false
```

```go
func EqualFunc[M1 ~map[K]V1, M2 ~map[K]V2, K comparable, V1, V2 any](m1 M1, m2 M2, eq func(V1, V2) bool) bool
```

#### Example

Code:

```go
m1 := map[int]string{
    1:    "one",
    10:   "Ten",
    1000: "THOUSAND",
}
m2 := map[int][]byte{
    1:    []byte("One"),
    10:   []byte("Ten"),
    1000: []byte("Thousand"),
}
eq := maps.EqualFunc(m1, m2, func(v1 string, v2 []byte) bool {
    return strings.ToLower(v1) == strings.ToLower(string(v2))
})
fmt.Println(eq)
```

```go
true
```

```go
func Insert[Map ~map[K]V, K comparable, V any](m Map, seq iter.Seq2[K, V])
```

#### Example

Code:

```go
m1 := map[int]string{
    1000: "THOUSAND",
}
s1 := []string{"zero", "one", "two", "three"}
maps.Insert(m1, slices.All(s1))
fmt.Println("m1 is:", m1)
```

```go
m1 is: map[0:zero 1:one 2:two 3:three 1000:THOUSAND]
```

```go
func Keys[Map ~map[K]V, K comparable, V any](m Map) iter.Seq[K]
```

#### Example

Code:

```go
m1 := map[int]string{
    1:    "one",
    10:   "Ten",
    1000: "THOUSAND",
}
keys := slices.Sorted(maps.Keys(m1))
fmt.Println(keys)
```

```go
[1 10 1000]
```

```go
func Values[Map ~map[K]V, K comparable, V any](m Map) iter.Seq[V]
```

#### Example

Code:

```go
m1 := map[int]string{
    1:    "one",
    10:   "Ten",
    1000: "THOUSAND",
}
values := slices.Sorted(maps.Values(m1))
fmt.Println(values)
```

```go
[THOUSAND Ten one]
```
