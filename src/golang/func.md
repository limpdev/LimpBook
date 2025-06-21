#  func

## Introduction

- Functions are essential in programming, including Go.
- This tutorial covers basics; advanced topics will be in the next video.

## What is a Function?

- A **block of reusable code**.
- Can be called multiple times.
- Can **take inputs (parameters)** and **return outputs**.

### Examples of Functions

1. **Absolute Value Function**
   - Takes a value `x` and returns `|x|`.
   - Example: `abs(-5)` returns `5`.
2. **Functions Without Inputs/Outputs**
   - A function can:
     - Take no inputs (`func greet() { ... }`).
     - Return no outputs (`func print(x int) { ... }`).

---

## **Basic Function Syntax**
### **Defining a Function**
```go
func functionName() {
    // Code to execute
}
```

### **Example: Simple Function**
```go
func test() {
    fmt.Println("test")
}
```

### **Calling a Function**
- Use `functionName()` to execute.
```go
test() // Output: "test"
```
- Can call multiple times:
```go
test()
test()
// Output: "test" (twice)
```

---

## **Parameters & Return Types**
### **Functions with Parameters**
- Parameters are inputs passed to a function.
```go
func add(x int, y int) {
    fmt.Println(x + y)
}
```
- **Shortcut for same-type parameters**:
```go
func add(x, y int) { // Both x and y are int
    fmt.Println(x + y)
}
```

### **Calling with Arguments**
```go
add(6, 7) // Output: 13
```

### **Returning Values**
- Specify return type after parameters.
```go
func add(x, y int) int {
    return x + y
}
```
- **Usage**:
```go
result := add(6, 7)
fmt.Println(result) // Output: 13
```

### **Multiple Return Values**
- Enclose return types in `()`.
```go
func mathOps(x, y int) (int, int) {
    return x + y, x - y
}
```
- **Usage**:
```go
sum, diff := mathOps(14, 7)
fmt.Println(sum, diff) // Output: 21 7
```

### **Named Return Values**
- Assign names to return values for clarity.
```go
func mathOps(x, y int) (sum int, diff int) {
    sum = x + y
    diff = x - y
    return // Automatically returns sum and diff
}
```

---

## **Defer Statement**
- **Defers execution until the function exits**.
- Useful for cleanup (e.g., closing files).
```go
func example() {
    defer fmt.Println("hello") // Runs last
    fmt.Println("before return")
}
```
**Output**:
```
before return
hello
```

---

## **Summary**
- **Functions** are reusable code blocks.
- Can take **parameters** and **return values**.
- **`defer`** delays execution until function exit.
- **Next video**: Advanced functions (anonymous functions, closures, etc.).
