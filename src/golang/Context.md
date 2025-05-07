# ctx.Context

> [!TIP]
> The context package in Go is mainly used to carry deadlines, cancellation signals, and other request-scoped values across API boundaries and between goroutines. It helps keep things clean, cancellable, and efficient, especially in concurrent or long-running operations.

## How It Works

-	context.Context is an interface that’s usually passed down through function calls.
-	You don’t modify it — you derive new contexts from it (context.WithCancel, context.WithTimeout, context.WithValue, etc.).
-	It’s typically used to:
-	Cancel work when a client disconnects
-	Set timeouts
-	Pass metadata like request IDs or auth tokens


## Your Code Explained

```go
OnStartup: func(ctx context.Context) {
    app.SetContext(ctx)
    otherStruct.SetContext(ctx)
}
```

==Here’s what’s going on:==

1.	OnStartup is a callback (probably from some framework like fyne or go-app?).
2.	It gives you a context.Context, likely tied to the app’s lifecycle.
3.	You’re storing this context in app and otherStruct — probably to be used later in async tasks like API calls, goroutines, or background jobs.


## ⚠️ Why This Matters

By setting the context on app and otherStruct, you’re giving them a “window” into the app’s lifecycle. So, if the context gets cancelled (e.g., the app shuts down), any goroutine using that context can react, clean up, or bail out early. You avoid zombie goroutines and wasted CPU.


### Pro Tip

Just make sure not to store the context for longer than necessary — it’s meant to be short-lived, scoped to a specific request or operation.
