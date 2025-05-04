# the fuck is `bufio`

Using bufio in Go is all about performance and efficiency when dealing with I/O operations, especially ones that are expensive, slow, or do small reads/writes frequently (like file reads, stdin/stdout, sockets, etc.).

*So what does bufio actually do?* ⇾ When you wrap a Reader or Writer with `bufio`, it adds a buffer in memory between your app and the underlying data source or sink.

⸻

## Why does that matter?

Imagine this:

You’re reading a file one byte at a time:

`file.Read(make([]byte, 1)) // ⇾ every time, you're hitting disk`

↪ ..*~~bruh ChatGPT actually wrote this shit fr fr~~* ↓

That’s super inefficient, because disk I/O is **slow af** and every .Read() is a `syscall`. Now wrap that same file with `bufio.NewReader()`:

```go
reader := bufio.NewReader(file)
b, _ := reader.ReadByte()
```

> Now it reads, say, 4KB at once under the hood and just gives you bytes from that buffer. One `syscall`, <u>many reads</u>. Boom — faster, smoother, cleaner, and way less gay (no cap).

Same thing for writing:

```go
w := bufio.NewWriter(file)
w.WriteString("log this\n")
```

- It won’t write to disk immediately — it waits until the buffer is full (or you flush it), so it batches writes and avoids tons of small, wasteful syscalls.

⸻

⚡ Use cases where buffered I/O is clutch:

- Reading big files line by line (`bufio.Scanner` is a wrapper on top of `bufio.Reader`)
- Reading from stdin where the input may be interactive or line-based
- Writing logs or chunked output to files
- Parsing protocols like HTTP, where data arrives in uneven bits over a socket
- Any time your reads/writes are small or irregular but you want them to be efficient

⸻

### TL;DR:

#### Use `bufio` when:

- You’re doing lots of small reads/writes
- You want to avoid unnecessary system calls
- You want convenient helpers (ReadLine, ReadString, Peek, etc.)

If you’re streaming something byte-by-byte, line-by-line, or char-by-char — `bufio` is your friend.
