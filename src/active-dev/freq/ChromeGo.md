#  Vector Database

## Links

<details><summary>📦<i>TABLE OF CONTENTS</i></summary>

- [README](#section-readme)
    - [Contents](#readme-contents)
    - [Use cases](#readme-use-cases)
        - [RAG](#readme-rag)
    - [Interface](#readme-interface)
    - [Features](#readme-features)
        - [Roadmap](#readme-roadmap)
    - [Installation](#readme-installation)
    - [Usage](#readme-usage)
        - [Quickstart](#readme-quickstart)
    - [Benchmarks](#readme-benchmarks)
    - [Development](#readme-development)
    - [Motivation](#readme-motivation)
    - [Related projects](#readme-related-projects)
- [Documentation](#section-documentation)
    - [Index](#pkg-index)
    - [Constants](#pkg-constants)
    - [Variables](#pkg-variables)
    - [Functions](#pkg-functions)
    - [Types](#pkg-types)
        - [type Collection](#Collection "type Collection")
            - [(c) Add(ctx, ids, embeddings, metadatas, contents)](#Collection.Add "(c) Add(ctx, ids, embeddings, metadatas, contents)")
            - [(c) AddConcurrently(ctx, ids, embeddings, metadatas, contents, concurrency)](#Collection.AddConcurrently "(c) AddConcurrently(ctx, ids, embeddings, metadatas, contents, concurrency)")
            - [(c) AddDocument(ctx, doc)](#Collection.AddDocument "(c) AddDocument(ctx, doc)")
            - [(c) AddDocuments(ctx, documents, concurrency)](#Collection.AddDocuments "(c) AddDocuments(ctx, documents, concurrency)")
            - [(c) Count()](#Collection.Count "(c) Count()")
            - [(c) Delete(\_, where, whereDocument, ids)](#Collection.Delete "(c) Delete(_, where, whereDocument, ids)")
            - [(c) GetByID(ctx, id)](#Collection.GetByID "(c) GetByID(ctx, id)")
            - [(c) Query(ctx, queryText, nResults, where, whereDocument)](#Collection.Query "(c) Query(ctx, queryText, nResults, where, whereDocument)")
            - [(c) QueryEmbedding(ctx, queryEmbedding, nResults, where, whereDocument)](#Collection.QueryEmbedding "(c) QueryEmbedding(ctx, queryEmbedding, nResults, where, whereDocument)")
            - [(c) QueryWithOptions(ctx, options)](#Collection.QueryWithOptions "(c) QueryWithOptions(ctx, options)")
        - [type DB](#DB "type DB")
            - [NewDB()](#NewDB "NewDB()")
            - [NewPersistentDB(path, compress)](#NewPersistentDB "NewPersistentDB(path, compress)")
            - [(db) CreateCollection(name, metadata, embeddingFunc)](#DB.CreateCollection "(db) CreateCollection(name, metadata, embeddingFunc)")
            - [(db) DeleteCollection(name)](#DB.DeleteCollection "(db) DeleteCollection(name)")
            - [(db) Export(filePath, compress, encryptionKey)](#DB.Export "(db) Export(filePath, compress, encryptionKey)")
            - [(db) ExportToFile(filePath, compress, encryptionKey, collections)](#DB.ExportToFile "(db) ExportToFile(filePath, compress, encryptionKey, collections)")
            - [(db) ExportToWriter(writer, compress, encryptionKey, collections)](#DB.ExportToWriter "(db) ExportToWriter(writer, compress, encryptionKey, collections)")
            - [(db) GetCollection(name, embeddingFunc)](#DB.GetCollection "(db) GetCollection(name, embeddingFunc)")
            - [(db) GetOrCreateCollection(name, metadata, embeddingFunc)](#DB.GetOrCreateCollection "(db) GetOrCreateCollection(name, metadata, embeddingFunc)")
            - [(db) Import(filePath, encryptionKey)](#DB.Import "(db) Import(filePath, encryptionKey)")
            - [(db) ImportFromFile(filePath, encryptionKey, collections)](#DB.ImportFromFile "(db) ImportFromFile(filePath, encryptionKey, collections)")
            - [(db) ImportFromReader(reader, encryptionKey, collections)](#DB.ImportFromReader "(db) ImportFromReader(reader, encryptionKey, collections)")
            - [(db) ListCollections()](#DB.ListCollections "(db) ListCollections()")
            - [(db) Reset()](#DB.Reset "(db) Reset()")
        - [type Document](#Document "type Document")
            - [NewDocument(ctx, id, metadata, embedding, content, embeddingFunc)](#NewDocument "NewDocument(ctx, id, metadata, embedding, content, embeddingFunc)")
        - [type EmbeddingFunc](#EmbeddingFunc "type EmbeddingFunc")
            - [NewEmbeddingFuncAzureOpenAI(apiKey, deploymentURL, apiVersion, model)](#NewEmbeddingFuncAzureOpenAI "NewEmbeddingFuncAzureOpenAI(apiKey, deploymentURL, apiVersion, model)")
            - [NewEmbeddingFuncCohere(apiKey, model)](#NewEmbeddingFuncCohere "NewEmbeddingFuncCohere(apiKey, model)")
            - [NewEmbeddingFuncDefault()](#NewEmbeddingFuncDefault "NewEmbeddingFuncDefault()")
            - [NewEmbeddingFuncJina(apiKey, model)](#NewEmbeddingFuncJina "NewEmbeddingFuncJina(apiKey, model)")
            - [NewEmbeddingFuncLocalAI(model)](#NewEmbeddingFuncLocalAI "NewEmbeddingFuncLocalAI(model)")
            - [NewEmbeddingFuncMistral(apiKey)](#NewEmbeddingFuncMistral "NewEmbeddingFuncMistral(apiKey)")
            - [NewEmbeddingFuncMixedbread(apiKey, model)](#NewEmbeddingFuncMixedbread "NewEmbeddingFuncMixedbread(apiKey, model)")
            - [NewEmbeddingFuncOllama(model, baseURLOllama)](#NewEmbeddingFuncOllama "NewEmbeddingFuncOllama(model, baseURLOllama)")
            - [NewEmbeddingFuncOpenAI(apiKey, model)](#NewEmbeddingFuncOpenAI "NewEmbeddingFuncOpenAI(apiKey, model)")
            - [NewEmbeddingFuncOpenAICompat(baseURL, apiKey, model, normalized)](#NewEmbeddingFuncOpenAICompat "NewEmbeddingFuncOpenAICompat(baseURL, apiKey, model, normalized)")
            - [NewEmbeddingFuncVertex(apiKey, project, model, opts)](#NewEmbeddingFuncVertex "NewEmbeddingFuncVertex(apiKey, project, model, opts)")
        - [type EmbeddingModelCohere](#EmbeddingModelCohere "type EmbeddingModelCohere")
        - [type EmbeddingModelJina](#EmbeddingModelJina "type EmbeddingModelJina")
        - [type EmbeddingModelMixedbread](#EmbeddingModelMixedbread "type EmbeddingModelMixedbread")
        - [type EmbeddingModelOpenAI](#EmbeddingModelOpenAI "type EmbeddingModelOpenAI")
        - [type EmbeddingModelVertex](#EmbeddingModelVertex "type EmbeddingModelVertex")
        - [type NegativeMode](#NegativeMode "type NegativeMode")
        - [type NegativeQueryOptions](#NegativeQueryOptions "type NegativeQueryOptions")
        - [type QueryOptions](#QueryOptions "type QueryOptions")
        - [type Result](#Result "type Result")
        - [type VertexOption](#VertexOption "type VertexOption")
            - [WithVertexAPIEndpoint(apiEndpoint)](#WithVertexAPIEndpoint "WithVertexAPIEndpoint(apiEndpoint)")
            - [WithVertexAutoTruncate(autoTruncate)](#WithVertexAutoTruncate "WithVertexAutoTruncate(autoTruncate)")
- [Source Files](#section-sourcefiles)
- [Directories](#section-directories)

</details>

### chromem-go

[![Go Reference](https://pkg.go.dev/badge/github.com/philippgille/chromem-go.svg)](https://pkg.go.dev/github.com/philippgille/chromem-go) [![Build status](https://github.com/philippgille/chromem-go/actions/workflows/go.yml/badge.svg)](https://github.com/philippgille/chromem-go/actions/workflows/go.yml) [![Go Report Card](https://goreportcard.com/badge/github.com/philippgille/chromem-go)](https://goreportcard.com/report/github.com/philippgille/chromem-go) [![GitHub Releases](https://img.shields.io/github/release/philippgille/chromem-go.svg)](https://github.com/philippgille/chromem-go/releases)

Embeddable vector database for Go with Chroma-like interface and zero third-party dependencies. In-memory with optional persistence.

Because `chromem-go` is embeddable it enables you to add retrieval augmented generation (RAG) and similar embeddings-based features into your Go app _without having to run a separate database_. Like when using SQLite instead of PostgreSQL/MySQL/etc.

It's _not_ a library to connect to Chroma and also not a reimplementation of it in Go. It's a database on its own.

The focus is not scale (millions of documents) or number of features, but simplicity and performance for the most common use cases. On a mid-range 2020 Intel laptop CPU you can query 1,000 documents in 0.3 ms and 100,000 documents in 40 ms, with very few and small memory allocations. See [Benchmarks](#readme-benchmarks) for details.

> [!WARNING]
> The project is in beta, under heavy construction, and may introduce breaking changes in releases before `v1.0.0`. All changes are documented in the [`CHANGELOG`](https://github.com/philippgille/chromem-go/blob/v0.7.0/CHANGELOG.md).

#### Contents

1. [Use cases](#readme-use-cases)
2. [Interface](#readme-interface)
3. [Features + Roadmap](#readme-features)
4. [Installation](#readme-installation)
5. [Usage](#readme-usage)
6. [Benchmarks](#readme-benchmarks)
7. [Development](#readme-development)
8. [Motivation](#readme-motivation)
9. [Related projects](#readme-related-projects)

#### Use cases

With a vector database you can do various things:

- Retrieval augmented generation (RAG), question answering (Q&amp;A)
- Text and code search
- Recommendation systems
- Classification
- Clustering

Let's look at the RAG use case in more detail:

##### RAG

The knowledge of large language models (LLMs) - even the ones with 30 billion, 70 billion parameters and more - is limited. They don't know anything about what happened after their training ended, they don't know anything about data they were not trained with (like your company's intranet, Jira / bug tracker, wiki or other kinds of knowledge bases), and even the data they _do_ know they often can't reproduce it _exactly_, but start to _hallucinate_ instead.

Fine-tuning an LLM can help a bit, but it's more meant to improve the LLMs reasoning about specific topics, or reproduce the style of written text or code. Fine-tuning does _not_ add knowledge _1:1_ into the model. Details are lost or mixed up. And knowledge cutoff (about anything that happened after the fine-tuning) isn't solved either.

=&gt; A vector database can act as the up-to-date, precise knowledge for LLMs:

1. You store relevant documents that you want the LLM to know in the database.
2. The database stores the _embeddings_ alongside the documents, which you can either provide or can be created by specific "embedding models" like OpenAI's `text-embedding-3-small`.

    - `chromem-go` can do this for you and supports multiple embedding providers and models out-of-the-box.

3. Later, when you want to talk to the LLM, you first send the question to the vector DB to find _similar_/_related_ content. This is called "nearest neighbor search".
4. In the question to the LLM, you provide this content alongside your question.
5. The LLM can take this up-to-date precise content into account when answering.

Check out the [example code](https://github.com/philippgille/chromem-go/blob/v0.7.0/examples) to see it in action!

#### Interface

Our original inspiration was the [Chroma](https://www.trychroma.com/) interface, whose core API is the following (taken from their [README](https://github.com/chroma-core/chroma/blob/0.4.21/README.md)):

Chroma core interface

```python
import chromadb
# setup Chroma in-memory, for easy prototyping. Can add persistence easily!
client = chromadb.Client()

# Create collection. get_collection, get_or_create_collection, delete_collection also available!
collection = client.create_collection("all-my-documents")

# Add docs to the collection. Can also update and delete. Row-based API coming soon!
collection.add(
    documents=["This is document1", "This is document2"], # we handle tokenization, embedding, and indexing automatically. You can skip that and add your own embeddings as well
    metadatas=[{"source": "notion"}, {"source": "google-docs"}], # filter on these!
    ids=["doc1", "doc2"], # unique for each doc
)

# Query/search 2 most similar results. You can also .get by id
results = collection.query(
    query_texts=["This is a query document"],
    n_results=2,
    # where={"metadata_field": "is_equal_to_this"}, # optional filter
    # where_document={"$contains":"search_string"}  # optional filter
)
```

Our Go library exposes the same interface:

chromem-go equivalent

```go
package main

import "github.com/philippgille/chromem-go"

func main() {
    // Set up chromem-go in-memory, for easy prototyping. Can add persistence easily!
    // We call it DB instead of client because there's no client-server separation. The DB is embedded.
    db := chromem.NewDB()

    // Create collection. GetCollection, GetOrCreateCollection, DeleteCollection also available!
    collection, _ := db.CreateCollection("all-my-documents", nil, nil)

    // Add docs to the collection. Update and delete will be added in the future.
    // Can be multi-threaded with AddConcurrently()!
    // We're showing the Chroma-like method here, but more Go-idiomatic methods are also available!
    _ = collection.Add(ctx,
        []string{"doc1", "doc2"}, // unique ID for each doc
        nil, // We handle embedding automatically. You can skip that and add your own embeddings as well.
        []map[string]string{{"source": "notion"}, {"source": "google-docs"}}, // Filter on these!
        []string{"This is document1", "This is document2"},
    )

    // Query/search 2 most similar results. Getting by ID will be added in the future.
    results, _ := collection.Query(ctx,
        "This is a query document",
        2,
        map[string]string{"metadata_field": "is_equal_to_this"}, // optional filter
        map[string]string{"$contains": "search_string"},         // optional filter
    )
}
```

Initially `chromem-go` started with just the four core methods, but we added more over time. We intentionally don't want to cover 100% of Chroma's API surface though.
We're providing some alternative methods that are more Go-idiomatic instead.

For the full interface see the Godoc: [https://pkg.go.dev/github.com/philippgille/chromem-go](https://pkg.go.dev/github.com/philippgille/chromem-go)

#### Features

- Zero dependencies on third party libraries
- Embeddable (like SQLite, i.e. no client-server model, no separate DB to maintain)
- Multithreaded processing (when adding and querying documents), making use of Go's native concurrency features
- Experimental WebAssembly binding
- Embedding creators:

    - Hosted:

        - [OpenAI](https://platform.openai.com/docs/guides/embeddings/embedding-models) (default)
        - [Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/embeddings)
        - [Cohere](https://cohere.com/models/embed)
        - [Mistral](https://docs.mistral.ai/platform/endpoints/#embedding-models)
        - [Jina](https://jina.ai/embeddings)
        - [mixedbread.ai](https://www.mixedbread.ai/)

    - Local:

        - [Ollama](https://github.com/ollama/ollama)
        - [LocalAI](https://github.com/mudler/LocalAI)

    - Bring your own (implement [`chromem.EmbeddingFunc`](https://pkg.go.dev/github.com/philippgille/chromem-go#EmbeddingFunc))
    - You can also pass existing embeddings when adding documents to a collection, instead of letting `chromem-go` create them

- Similarity search:

    - Exhaustive nearest neighbor search using cosine similarity (sometimes also called exact search or brute-force search or FLAT index)

- Filters:

    - Document filters: `$contains`, `$not_contains`
    - Metadata filters: Exact matches

- Storage:

    - In-memory
    - Optional immediate persistence (writes one file for each added collection and document, encoded as [gob](https://go.dev/blog/gob), optionally gzip-compressed)
    - Backups: Export and import of the entire DB to/from a single file (encoded as [gob](https://go.dev/blog/gob), optionally gzip-compressed and AES-GCM encrypted)

        - Includes methods for generic `io.Writer`/`io.Reader` so you can plug S3 buckets and other blob storage, see [examples/s3-export-import](https://github.com/philippgille/chromem-go/blob/v0.7.0/examples/s3-export-import) for example code

- Data types:

    - Documents (text)

##### Roadmap

- Performance:

    - Use SIMD for dot product calculation on supported CPUs (draft PR: [#48](https://github.com/philippgille/chromem-go/pull/48))
    - Add [roaring bitmaps](https://github.com/RoaringBitmap/roaring) to speed up full text filtering

- Embedding creators:

    - Add an `EmbeddingFunc` that downloads and shells out to [llamafile](https://github.com/Mozilla-Ocho/llamafile)

- Similarity search:

    - Approximate nearest neighbor search with index (ANN)

        - Hierarchical Navigable Small World (HNSW)
        - Inverted file flat (IVFFlat)

- Filters:

    - Operators (`$and`, `$or` etc.)

- Storage:

    - JSON as second encoding format
    - Write-ahead log (WAL) as second file format
    - Optional remote storage (S3, PostgreSQL, ...)

- Data types:

    - Images
    - Videos

#### Installation

`go get github.com/philippgille/chromem-go@latest`

#### Usage

See the Godoc for a reference: [https://pkg.go.dev/github.com/philippgille/chromem-go](https://pkg.go.dev/github.com/philippgille/chromem-go)

For full, working examples, using the vector database for retrieval augmented generation (RAG) and semantic search and using either OpenAI or locally running the embeddings model and LLM (in Ollama), see the [example code](https://github.com/philippgille/chromem-go/blob/v0.7.0/examples).

##### Quickstart

This is taken from the ["minimal" example](https://github.com/philippgille/chromem-go/blob/v0.7.0/examples/minimal):

```go
package main

import (
 "context"
 "fmt"
 "runtime"

 "github.com/philippgille/chromem-go"
)

func main() {
  ctx := context.Background()

  db := chromem.NewDB()

  c, err := db.CreateCollection("knowledge-base", nil, nil)
  if err != nil {
    panic(err)
  }

  err = c.AddDocuments(ctx, []chromem.Document{
    {
      ID:      "1",
      Content: "The sky is blue because of Rayleigh scattering.",
    },
    {
      ID:      "2",
      Content: "Leaves are green because chlorophyll absorbs red and blue light.",
    },
  }, runtime.NumCPU())
  if err != nil {
    panic(err)
  }

  res, err := c.Query(ctx, "Why is the sky blue?", 1, nil, nil)
  if err != nil {
    panic(err)
  }

  fmt.Printf("ID: %v\nSimilarity: %v\nContent: %v\n", res[0].ID, res[0].Similarity, res[0].Content)
}
```

Output:

```go
ID: 1
Similarity: 0.6833369
Content: The sky is blue because of Rayleigh scattering.
```

#### Benchmarks

Benchmarked on 2024-03-17 with:

- Computer: Framework Laptop 13 (first generation, 2021)
- CPU: 11th Gen Intel Core i5-1135G7 (2020)
- Memory: 32 GB
- OS: Fedora Linux 39

    - Kernel: 6.7

```bash
$ go test -benchmem -run=^$ -bench .
goos: linux
goarch: amd64
pkg: github.com/philippgille/chromem-go
cpu: 11th Gen Intel(R) Core(TM) i5-1135G7 @ 2.40GHz
BenchmarkCollection_Query_NoContent_100-8          13164      90276 ns/op     5176 B/op       95 allocs/op
BenchmarkCollection_Query_NoContent_1000-8          2142     520261 ns/op    13558 B/op      141 allocs/op
BenchmarkCollection_Query_NoContent_5000-8           561    2150354 ns/op    47096 B/op      173 allocs/op
BenchmarkCollection_Query_NoContent_25000-8          120    9890177 ns/op   211783 B/op      208 allocs/op
BenchmarkCollection_Query_NoContent_100000-8          30   39574238 ns/op   810370 B/op      232 allocs/op
BenchmarkCollection_Query_100-8                    13225      91058 ns/op     5177 B/op       95 allocs/op
BenchmarkCollection_Query_1000-8                    2226     519693 ns/op    13552 B/op      140 allocs/op
BenchmarkCollection_Query_5000-8                     550    2128121 ns/op    47108 B/op      173 allocs/op
BenchmarkCollection_Query_25000-8                    100   10063260 ns/op   211705 B/op      205 allocs/op
BenchmarkCollection_Query_100000-8                    30   39404005 ns/op   810295 B/op      229 allocs/op
PASS
ok   github.com/philippgille/chromem-go 28.402s
```

#### Development

- Build: `go build ./...`
- Test: `go test -v -race -count 1 ./...`
- Benchmark:

    - `go test -benchmem -run=^$ -bench .` (add `> bench.out` or similar to write to a file)
    - With profiling: `go test -benchmem -run ^$ -cpuprofile cpu.out -bench .`

        - (profiles: `-cpuprofile`, `-memprofile`, `-blockprofile`, `-mutexprofile`)

- Compare benchmarks:

    1. Install `benchstat`: `go install golang.org/x/perf/cmd/benchstat@latest`
    2. Compare two benchmark results: `benchstat before.out after.out`

#### Motivation

In December 2023, when I wanted to play around with retrieval augmented generation (RAG) in a Go program, I looked for a vector database that could be embedded in the Go program, just like you would embed SQLite in order to not require any separate DB setup and maintenance. I was surprised when I didn't find any, given the abundance of embedded key-value stores in the Go ecosystem.

At the time most of the popular vector databases like Pinecone, Qdrant, Milvus, Chroma, Weaviate and others were not embeddable at all or only in Python or JavaScript/TypeScript.

Then I found [@eliben](https://github.com/eliben)'s [blog post](https://eli.thegreenplace.net/2023/retrieval-augmented-generation-in-go/) and [example code](https://github.com/eliben/code-for-blog/tree/eda87b87dad9ed8bd45d1c8d6395efba3741ed39/2023/go-rag-openai) which showed that with very little Go code you could create a very basic PoC of a vector database.

That's when I decided to build my own vector database, embeddable in Go, inspired by the ChromaDB interface. ChromaDB stood out for being embeddable (in Python), and by showing its core API in 4 commands on their README and on the landing page of their website.

#### Related projects

- Shoutout to [@eliben](https://github.com/eliben) whose [blog post](https://eli.thegreenplace.net/2023/retrieval-augmented-generation-in-go/) and [example code](https://github.com/eliben/code-for-blog/tree/eda87b87dad9ed8bd45d1c8d6395efba3741ed39/2023/go-rag-openai) inspired me to start this project!
- [Chroma](https://github.com/chroma-core/chroma): Looking at Pinecone, Qdrant, Milvus, Weaviate and others, Chroma stood out by showing its core API in 4 commands on their README and on the landing page of their website. It was also putting the most emphasis on its embeddability (in Python).
- The big, full-fledged client-server-based vector databases for maximum scale and performance:

    - [Pinecone](https://www.pinecone.io/): Closed source
    - [Qdrant](https://github.com/qdrant/qdrant): Written in Rust, not embeddable in Go
    - [Milvus](https://github.com/milvus-io/milvus): Written in Go and C++, but not embeddable as of December 2023
    - [Weaviate](https://github.com/weaviate/weaviate): Written in Go, but not embeddable in Go as of March 2024 (only in Python and JavaScript/TypeScript and that's experimental)

- Some non-specialized SQL, NoSQL and Key-Value databases added support for storing vectors and (some of them) querying based on similarity:

    - [pgvector](https://github.com/pgvector/pgvector) extension for [PostgreSQL](https://www.postgresql.org/): Client-server model
    - [Redis](https://github.com/redis/redis) ([1](https://redis.io/docs/interact/search-and-query/query/vector-search/), [2](https://redis.io/docs/interact/search-and-query/advanced-concepts/vectors/)): Client-server model
    - [sqlite-vss](https://github.com/asg017/sqlite-vss) extension for [SQLite](https://www.sqlite.org/): Embedded, but the [Go bindings](https://github.com/asg017/sqlite-vss/tree/8fc44301843029a13a474d1f292378485e1fdd62/bindings/go) require CGO. There's a [CGO-free Go library](https://gitlab.com/cznic/sqlite) for SQLite, but then it's without the vector search extension.
    - [DuckDB](https://github.com/duckdb/duckdb) has a function to calculate cosine similarity ([1](https://duckdb.org/docs/sql/functions/nested)): Embedded, but the Go bindings use CGO
    - [MongoDB](https://github.com/mongodb/mongo)'s cloud platform offers a vector search product ([1](https://www.mongodb.com/products/platform/atlas-vector-search)): Client-server model

- Some libraries for vector similarity search:

    - [Faiss](https://github.com/facebookresearch/faiss): Written in C++; 3rd party Go bindings use CGO
    - [Annoy](https://github.com/spotify/annoy): Written in C++; Go bindings use CGO ([1](https://github.com/spotify/annoy/raw/2be37c9e015544be2cf60c431f0cccc076151a2d/README_GO.rst))
    - [USearch](https://github.com/unum-cloud/usearch): Written in C++; Go bindings use CGO

- Some orchestration libraries, inspired by the Python library [LangChain](https://github.com/langchain-ai/langchain), but with no or only rudimentary embedded vector DB:

    - [LangChain Go](https://github.com/tmc/langchaingo)
    - [LinGoose](https://github.com/henomis/lingoose)
    - [GoLC](https://github.com/hupe1980/golc)

---

## ![](/static/shared/icon/code_gm_grey_24dp.svg) Documentation [¶](#section-documentation "Go to Documentation")

### Index [¶](#pkg-index "Go to Index")

<details><summary>📦<i>PACKAGE INDEX</i></summary>

- [Constants](#pkg-constants)
- [type Collection](#Collection)
-   - [func (c \*Collection) Add(ctx context.Context, ids \[\]string, embeddings \[\]\[\]float32, ...) error](#Collection.Add)
    - [func (c \*Collection) AddConcurrently(ctx context.Context, ids \[\]string, embeddings \[\]\[\]float32, ...) error](#Collection.AddConcurrently)
    - [func (c \*Collection) AddDocument(ctx context.Context, doc Document) error](#Collection.AddDocument)
    - [func (c \*Collection) AddDocuments(ctx context.Context, documents \[\]Document, concurrency int) error](#Collection.AddDocuments)
    - [func (c \*Collection) Count() int](#Collection.Count)
    - [func (c \*Collection) Delete(\_ context.Context, where, whereDocument map\[string\]string, ids ...string) error](#Collection.Delete)
    - [func (c \*Collection) GetByID(ctx context.Context, id string) (Document, error)](#Collection.GetByID)
    - [func (c \*Collection) Query(ctx context.Context, queryText string, nResults int, ...) (\[\]Result, error)](#Collection.Query)
    - [func (c \*Collection) QueryEmbedding(ctx context.Context, queryEmbedding \[\]float32, nResults int, ...) (\[\]Result, error)](#Collection.QueryEmbedding)
    - [func (c \*Collection) QueryWithOptions(ctx context.Context, options QueryOptions) (\[\]Result, error)](#Collection.QueryWithOptions)
- [type DB](#DB)
-   - [func NewDB() \*DB](#NewDB)
    - [func NewPersistentDB(path string, compress bool) (\*DB, error)](#NewPersistentDB)
-   - [func (db \*DB) CreateCollection(name string, metadata map\[string\]string, embeddingFunc EmbeddingFunc) (\*Collection, error)](#DB.CreateCollection)
    - [func (db \*DB) DeleteCollection(name string) error](#DB.DeleteCollection)
    - [func (db \*DB) Export(filePath string, compress bool, encryptionKey string) error](#DB.Export)deprecated
    - [func (db \*DB) ExportToFile(filePath string, compress bool, encryptionKey string, collections ...string) error](#DB.ExportToFile)
    - [func (db \*DB) ExportToWriter(writer io.Writer, compress bool, encryptionKey string, collections ...string) error](#DB.ExportToWriter)
    - [func (db \*DB) GetCollection(name string, embeddingFunc EmbeddingFunc) \*Collection](#DB.GetCollection)
    - [func (db \*DB) GetOrCreateCollection(name string, metadata map\[string\]string, embeddingFunc EmbeddingFunc) (\*Collection, error)](#DB.GetOrCreateCollection)
    - [func (db \*DB) Import(filePath string, encryptionKey string) error](#DB.Import)deprecated
    - [func (db \*DB) ImportFromFile(filePath string, encryptionKey string, collections ...string) error](#DB.ImportFromFile)
    - [func (db \*DB) ImportFromReader(reader io.ReadSeeker, encryptionKey string, collections ...string) error](#DB.ImportFromReader)
    - [func (db \*DB) ListCollections() map\[string\]\*Collection](#DB.ListCollections)
    - [func (db \*DB) Reset() error](#DB.Reset)
- [type Document](#Document)
-   - [func NewDocument(ctx context.Context, id string, metadata map\[string\]string, ...) (Document, error)](#NewDocument)
- [type EmbeddingFunc](#EmbeddingFunc)
-   - [func NewEmbeddingFuncAzureOpenAI(apiKey string, deploymentURL string, apiVersion string, model string) EmbeddingFunc](#NewEmbeddingFuncAzureOpenAI)
    - [func NewEmbeddingFuncCohere(apiKey string, model EmbeddingModelCohere) EmbeddingFunc](#NewEmbeddingFuncCohere)
    - [func NewEmbeddingFuncDefault() EmbeddingFunc](#NewEmbeddingFuncDefault)
    - [func NewEmbeddingFuncJina(apiKey string, model EmbeddingModelJina) EmbeddingFunc](#NewEmbeddingFuncJina)
    - [func NewEmbeddingFuncLocalAI(model string) EmbeddingFunc](#NewEmbeddingFuncLocalAI)
    - [func NewEmbeddingFuncMistral(apiKey string) EmbeddingFunc](#NewEmbeddingFuncMistral)
    - [func NewEmbeddingFuncMixedbread(apiKey string, model EmbeddingModelMixedbread) EmbeddingFunc](#NewEmbeddingFuncMixedbread)
    - [func NewEmbeddingFuncOllama(model string, baseURLOllama string) EmbeddingFunc](#NewEmbeddingFuncOllama)
    - [func NewEmbeddingFuncOpenAI(apiKey string, model EmbeddingModelOpenAI) EmbeddingFunc](#NewEmbeddingFuncOpenAI)
    - [func NewEmbeddingFuncOpenAICompat(baseURL, apiKey, model string, normalized \*bool) EmbeddingFunc](#NewEmbeddingFuncOpenAICompat)
    - [func NewEmbeddingFuncVertex(apiKey, project string, model EmbeddingModelVertex, opts ...VertexOption) EmbeddingFunc](#NewEmbeddingFuncVertex)
- [type EmbeddingModelCohere](#EmbeddingModelCohere)
- [type EmbeddingModelJina](#EmbeddingModelJina)
- [type EmbeddingModelMixedbread](#EmbeddingModelMixedbread)
- [type EmbeddingModelOpenAI](#EmbeddingModelOpenAI)
- [type EmbeddingModelVertex](#EmbeddingModelVertex)
- [type NegativeMode](#NegativeMode)
- [type NegativeQueryOptions](#NegativeQueryOptions)
- [type QueryOptions](#QueryOptions)
- [type Result](#Result)
- [type VertexOption](#VertexOption)
-   - [func WithVertexAPIEndpoint(apiEndpoint string) VertexOption](#WithVertexAPIEndpoint)
    - [func WithVertexAutoTruncate(autoTruncate bool) VertexOption](#WithVertexAutoTruncate)

</details>

### Constants [¶](#pkg-constants "Go to Constants")

[View Source](https://github.com/philippgille/chromem-go/blob/v0.7.0/embed_cohere.go#L29)

```go
const (
	InputTypeCohereSearchDocumentPrefix string = "search_document: "
	InputTypeCohereSearchQueryPrefix    string = "search_query: "
	InputTypeCohereClassificationPrefix string = "classification: "
	InputTypeCohereClusteringPrefix     string = "clustering: "
)
```

Prefixes for external use.

[View Source](https://github.com/philippgille/chromem-go/blob/v0.7.0/embed_openai.go#L15)

```go
const BaseURLOpenAI = "https://api.openai.com/v1"
```

### Variables [¶](#pkg-variables "Go to Variables")

This section is empty.

### Functions [¶](#pkg-functions "Go to Functions")

This section is empty.

### Types [¶](#pkg-types "Go to Types")

#### type [Collection](https://github.com/philippgille/chromem-go/blob/v0.7.0/collection.go#L16) [¶](#Collection "Go to Collection")

```go
type Collection struct {
	Name string
	// contains filtered or unexported fields
}
```

Collection represents a collection of documents. It also has a configured embedding function, which is used when adding documents that don't have embeddings yet.

#### func (\*Collection) [Add](https://github.com/philippgille/chromem-go/blob/v0.7.0/collection.go#L131) [¶](#Collection.Add "Go to Collection.Add")

```go
func (c *Collection) Add(ctx context.Context, ids []string, embeddings [][]float32, metadatas []map[string]string, contents []string) error
```

Add embeddings to the datastore.

- ids: The ids of the embeddings you wish to add
- embeddings: The embeddings to add. If nil, embeddings will be computed based on the contents using the embeddingFunc set for the Collection. Optional.
- metadatas: The metadata to associate with the embeddings. When querying, you can filter on this metadata. Optional.
- contents: The contents to associate with the embeddings.

This is a Chroma-like method. For a more Go-idiomatic one, see [Collection.AddDocuments](#Collection.AddDocuments).

#### func (\*Collection) [AddConcurrently](https://github.com/philippgille/chromem-go/blob/v0.7.0/collection.go#L140) [¶](#Collection.AddConcurrently "Go to Collection.AddConcurrently") added in v0.2.0

```go
func (c *Collection) AddConcurrently(ctx context.Context, ids []string, embeddings [][]float32, metadatas []map[string]string, contents []string, concurrency int) error
```

AddConcurrently is like Add, but adds embeddings concurrently. This is mostly useful when you don't pass any embeddings, so they have to be created. Upon error, concurrently running operations are canceled and the error is returned.

This is a Chroma-like method. For a more Go-idiomatic one, see [Collection.AddDocuments](#Collection.AddDocuments).

#### func (\*Collection) [AddDocument](https://github.com/philippgille/chromem-go/blob/v0.7.0/collection.go#L250) [¶](#Collection.AddDocument "Go to Collection.AddDocument") added in v0.4.0

```go
func (c *Collection) AddDocument(ctx context.Context, doc Document) error
```

AddDocument adds a document to the collection. If the document doesn't have an embedding, it will be created using the collection's embedding function.

#### func (\*Collection) [AddDocuments](https://github.com/philippgille/chromem-go/blob/v0.7.0/collection.go#L193) [¶](#Collection.AddDocuments "Go to Collection.AddDocuments") added in v0.4.0

```go
func (c *Collection) AddDocuments(ctx context.Context, documents []Document, concurrency int) error
```

AddDocuments adds documents to the collection with the specified concurrency. If the documents don't have embeddings, they will be created using the collection's embedding function. Upon error, concurrently running operations are canceled and the error is returned.

#### func (\*Collection) [Count](https://github.com/philippgille/chromem-go/blob/v0.7.0/collection.go#L378) [¶](#Collection.Count "Go to Collection.Count") added in v0.4.0

```go
func (c *Collection) Count() int
```

Count returns the number of documents in the collection.

#### func (\*Collection) [Delete](https://github.com/philippgille/chromem-go/blob/v0.7.0/collection.go#L325) [¶](#Collection.Delete "Go to Collection.Delete") added in v0.6.0

```go
func (c *Collection) Delete(_ context.Context, where, whereDocument map[string]string, ids ...string) error
```

Delete removes document(s) from the collection.

- where: Conditional filtering on metadata. Optional.
- whereDocument: Conditional filtering on documents. Optional.
- ids: The ids of the documents to delete. If empty, all documents are deleted.

#### func (\*Collection) [GetByID](https://github.com/philippgille/chromem-go/blob/v0.7.0/collection.go#L298) [¶](#Collection.GetByID "Go to Collection.GetByID") added in v0.7.0

```go
func (c *Collection) GetByID(ctx context.Context, id string) (Document, error)
```

GetByID returns a document by its ID. The returned document is a copy of the original document, so it can be safely modified without affecting the collection.

#### func (\*Collection) [Query](https://github.com/philippgille/chromem-go/blob/v0.7.0/collection.go#L405) [¶](#Collection.Query "Go to Collection.Query")

```go
func (c *Collection) Query(ctx context.Context, queryText string, nResults int, where, whereDocument map[string]string) ([]Result, error)
```

Query performs an exhaustive nearest neighbor search on the collection.

- queryText: The text to search for. Its embedding will be created using the collection's embedding function.
- nResults: The maximum number of results to return. Must be &gt; 0. There can be fewer results if a filter is applied.
- where: Conditional filtering on metadata. Optional.
- whereDocument: Conditional filtering on documents. Optional.

#### func (\*Collection) [QueryEmbedding](https://github.com/philippgille/chromem-go/blob/v0.7.0/collection.go#L478) [¶](#Collection.QueryEmbedding "Go to Collection.QueryEmbedding") added in v0.5.0

```go
func (c *Collection) QueryEmbedding(ctx context.Context, queryEmbedding []float32, nResults int, where, whereDocument map[string]string) ([]Result, error)
```

QueryEmbedding performs an exhaustive nearest neighbor search on the collection.

- queryEmbedding: The embedding of the query to search for. It must be created with the same embedding model as the document embeddings in the collection. The embedding will be normalized if it's not the case yet.
- nResults: The maximum number of results to return. Must be &gt; 0. There can be fewer results if a filter is applied.
- where: Conditional filtering on metadata. Optional.
- whereDocument: Conditional filtering on documents. Optional.

#### func (\*Collection) [QueryWithOptions](https://github.com/philippgille/chromem-go/blob/v0.7.0/collection.go#L421) [¶](#Collection.QueryWithOptions "Go to Collection.QueryWithOptions") added in v0.7.0

```go
func (c *Collection) QueryWithOptions(ctx context.Context, options QueryOptions) ([]Result, error)
```

QueryWithOptions performs an exhaustive nearest neighbor search on the collection.

- options: The options for the query. See [QueryOptions](#QueryOptions) for more information.

#### type [DB](https://github.com/philippgille/chromem-go/blob/v0.7.0/db.go#L29) [¶](#DB "Go to DB") added in v0.3.0

```go
type DB struct {
	// contains filtered or unexported fields
}
```

DB is the chromem-go database. It holds collections, which hold documents.

```go
+----+    1-n    +------------+    n-n    +----------+
| DB |-----------| Collection |-----------| Document |
+----+           +------------+           +----------+
```

#### func [NewDB](https://github.com/philippgille/chromem-go/blob/v0.7.0/db.go#L44) [¶](#NewDB "Go to NewDB") added in v0.3.0

```go
func NewDB() *DB
```

NewDB creates a new in-memory chromem-go DB. While it doesn't write files when you add collections and documents, you can still use [DB.Export](#DB.Export) and [DB.Import](#DB.Import) to export and import the entire DB from a file.

#### func [NewPersistentDB](https://github.com/philippgille/chromem-go/blob/v0.7.0/db.go#L68) [¶](#NewPersistentDB "Go to NewPersistentDB") added in v0.4.0

```go
func NewPersistentDB(path string, compress bool) (*DB, error)
```

NewPersistentDB creates a new persistent chromem-go DB. If the path is empty, it defaults to "./chromem-go". If compress is true, the files are compressed with gzip.

The persistence covers the collections (including their documents) and the metadata. However, it doesn't cover the EmbeddingFunc, as functions can't be serialized. When some data is persisted, and you create a new persistent DB with the same path, you'll have to provide the same EmbeddingFunc as before when getting an existing collection and adding more documents to it.

Currently, the persistence is done synchronously on each write operation, and each document addition leads to a new file, encoded as gob. In the future we will make this configurable (encoding, async writes, WAL-based writes, etc.).

In addition to persistence for each added collection and document you can use [DB.ExportToFile](#DB.ExportToFile) / [DB.ExportToWriter](#DB.ExportToWriter) and [DB.ImportFromFile](#DB.ImportFromFile) / [DB.ImportFromReader](#DB.ImportFromReader) to export and import the entire DB to/from a file or writer/reader, which also works for the pure in-memory DB.

#### func (\*DB) [CreateCollection](https://github.com/philippgille/chromem-go/blob/v0.7.0/db.go#L498) [¶](#DB.CreateCollection "Go to DB.CreateCollection") added in v0.3.0

```go
func (db *DB) CreateCollection(name string, metadata map[string]string, embeddingFunc EmbeddingFunc) (*Collection, error)
```

CreateCollection creates a new collection with the given name and metadata.

- name: The name of the collection to create.
- metadata: Optional metadata to associate with the collection.
- embeddingFunc: Optional function to use to embed documents. Uses the default embedding function if not provided.

#### func (\*DB) [DeleteCollection](https://github.com/philippgille/chromem-go/blob/v0.7.0/db.go#L586) [¶](#DB.DeleteCollection "Go to DB.DeleteCollection") added in v0.4.0

```go
func (db *DB) DeleteCollection(name string) error
```

DeleteCollection deletes the collection with the given name. If the collection doesn't exist, this is a no-op. If the DB is persistent, it also removes the collection's directory. You shouldn't hold any references to the collection after calling this method.

#### func (\*DB) [Export](https://github.com/philippgille/chromem-go/blob/v0.7.0/db.go#L368) deprecated added in v0.5.0

```go
func (db *DB) Export(filePath string, compress bool, encryptionKey string) error
```

Export exports the DB to a file at the given path. The file is encoded as gob, optionally compressed with flate (as gzip) and optionally encrypted with AES-GCM. This works for both the in-memory and persistent DBs. If the file exists, it's overwritten, otherwise created.

- filePath: If empty, it defaults to "./chromem-go.gob" (+ ".gz" + ".enc")
- compress: Optional. Compresses as gzip if true.
- encryptionKey: Optional. Encrypts with AES-GCM if provided. Must be 32 bytes long if provided.

Deprecated: Use [DB.ExportToFile](#DB.ExportToFile) instead.

#### func (\*DB) [ExportToFile](https://github.com/philippgille/chromem-go/blob/v0.7.0/db.go#L384) [¶](#DB.ExportToFile "Go to DB.ExportToFile") added in v0.7.0

```go
func (db *DB) ExportToFile(filePath string, compress bool, encryptionKey string, collections ...string) error
```

ExportToFile exports the DB to a file at the given path. The file is encoded as gob, optionally compressed with flate (as gzip) and optionally encrypted with AES-GCM. This works for both the in-memory and persistent DBs. If the file exists, it's overwritten, otherwise created.

- filePath: If empty, it defaults to "./chromem-go.gob" (+ ".gz" + ".enc")
- compress: Optional. Compresses as gzip if true.
- encryptionKey: Optional. Encrypts with AES-GCM if provided. Must be 32 bytes long if provided.
- collections: Optional. If provided, only the collections with the given names are exported. Non-existing collections are ignored. If not provided, all collections are exported.

#### func (\*DB) [ExportToWriter](https://github.com/philippgille/chromem-go/blob/v0.7.0/db.go#L450) [¶](#DB.ExportToWriter "Go to DB.ExportToWriter") added in v0.7.0

```go
func (db *DB) ExportToWriter(writer io.Writer, compress bool, encryptionKey string, collections ...string) error
```

ExportToWriter exports the DB to a writer. The stream is encoded as gob, optionally compressed with flate (as gzip) and optionally encrypted with AES-GCM. This works for both the in-memory and persistent DBs. If the writer has to be closed, it's the caller's responsibility. This can be used to export DBs to object storage like S3. See [https://github.com/philippgille/chromem-go/tree/main/examples/s3-export-import](https://github.com/philippgille/chromem-go/tree/main/examples/s3-export-import) for an example.

- writer: An implementation of [io.Writer](/io#Writer)
- compress: Optional. Compresses as gzip if true.
- encryptionKey: Optional. Encrypts with AES-GCM if provided. Must be 32 bytes long if provided.
- collections: Optional. If provided, only the collections with the given names are exported. Non-existing collections are ignored. If not provided, all collections are exported.

#### func (\*DB) [GetCollection](https://github.com/philippgille/chromem-go/blob/v0.7.0/db.go#L543) [¶](#DB.GetCollection "Go to DB.GetCollection") added in v0.4.0

```go
func (db *DB) GetCollection(name string, embeddingFunc EmbeddingFunc) *Collection
```

GetCollection returns the collection with the given name. The embeddingFunc param is only used if the DB is persistent and was just loaded from storage, in which case no embedding func is set yet (funcs are not (de-)serializable). It can be nil, in which case the default one will be used. The returned collection is a reference to the original collection, so any methods on the collection like Add() will be reflected on the DB's collection. Those operations are concurrency-safe. If the collection doesn't exist, this returns nil.

#### func (\*DB) [GetOrCreateCollection](https://github.com/philippgille/chromem-go/blob/v0.7.0/db.go#L569) [¶](#DB.GetOrCreateCollection "Go to DB.GetOrCreateCollection") added in v0.4.0

```go
func (db *DB) GetOrCreateCollection(name string, metadata map[string]string, embeddingFunc EmbeddingFunc) (*Collection, error)
```

GetOrCreateCollection returns the collection with the given name if it exists in the DB, or otherwise creates it. When creating:

- name: The name of the collection to create.
- metadata: Optional metadata to associate with the collection.
- embeddingFunc: Optional function to use to embed documents. Uses the default embedding function if not provided.

#### func (\*DB) [Import](https://github.com/philippgille/chromem-go/blob/v0.7.0/db.go#L193) deprecated added in v0.5.0

```go
func (db *DB) Import(filePath string, encryptionKey string) error
```

Import imports the DB from a file at the given path. The file must be encoded as gob and can optionally be compressed with flate (as gzip) and encrypted with AES-GCM. This works for both the in-memory and persistent DBs. Existing collections are overwritten.

\- filePath: Mandatory, must not be empty - encryptionKey: Optional, must be 32 bytes long if provided

Deprecated: Use [DB.ImportFromFile](#DB.ImportFromFile) instead.

#### func (\*DB) [ImportFromFile](https://github.com/philippgille/chromem-go/blob/v0.7.0/db.go#L208) [¶](#DB.ImportFromFile "Go to DB.ImportFromFile") added in v0.7.0

```go
func (db *DB) ImportFromFile(filePath string, encryptionKey string, collections ...string) error
```

ImportFromFile imports the DB from a file at the given path. The file must be encoded as gob and can optionally be compressed with flate (as gzip) and encrypted with AES-GCM. This works for both the in-memory and persistent DBs. Existing collections are overwritten.

- filePath: Mandatory, must not be empty
- encryptionKey: Optional, must be 32 bytes long if provided
- collections: Optional. If provided, only the collections with the given names are imported. Non-existing collections are ignored. If not provided, all collections are imported.

#### func (\*DB) [ImportFromReader](https://github.com/philippgille/chromem-go/blob/v0.7.0/db.go#L297) [¶](#DB.ImportFromReader "Go to DB.ImportFromReader") added in v0.7.0

```go
func (db *DB) ImportFromReader(reader io.ReadSeeker, encryptionKey string, collections ...string) error
```

ImportFromReader imports the DB from a reader. The stream must be encoded as gob and can optionally be compressed with flate (as gzip) and encrypted with AES-GCM. This works for both the in-memory and persistent DBs. Existing collections are overwritten. If the writer has to be closed, it's the caller's responsibility. This can be used to import DBs from object storage like S3. See [https://github.com/philippgille/chromem-go/tree/main/examples/s3-export-import](https://github.com/philippgille/chromem-go/tree/main/examples/s3-export-import) for an example.

- reader: An implementation of [io.ReadSeeker](/io#ReadSeeker)
- encryptionKey: Optional, must be 32 bytes long if provided
- collections: Optional. If provided, only the collections with the given names are imported. Non-existing collections are ignored. If not provided, all collections are imported.

#### func (\*DB) [ListCollections](https://github.com/philippgille/chromem-go/blob/v0.7.0/db.go#L523) [¶](#DB.ListCollections "Go to DB.ListCollections") added in v0.4.0

```go
func (db *DB) ListCollections() map[string]*Collection
```

ListCollections returns all collections in the DB, mapping name-&gt;Collection. The returned map is a copy of the internal map, so it's safe to directly modify the map itself. Direct modifications of the map won't reflect on the DB's map. To do that use the DB's methods like [DB.CreateCollection](#DB.CreateCollection) and [DB.DeleteCollection](#DB.DeleteCollection). The map is not an entirely deep clone, so the collections themselves are still the original ones. Any methods on the collections like Add() for adding documents will be reflected on the DB's collections and are concurrency-safe.

#### func (\*DB) [Reset](https://github.com/philippgille/chromem-go/blob/v0.7.0/db.go#L610) [¶](#DB.Reset "Go to DB.Reset") added in v0.4.0

```go
func (db *DB) Reset() error
```

Reset removes all collections from the DB. If the DB is persistent, it also removes all contents of the DB directory. You shouldn't hold any references to old collections after calling this method.

#### type [Document](https://github.com/philippgille/chromem-go/blob/v0.7.0/document.go#L9) [¶](#Document "Go to Document") added in v0.4.0

```go
type Document struct {
	ID        string
	Metadata  map[string]string
	Embedding []float32
	Content   string
}
```

Document represents a single document.

#### func [NewDocument](https://github.com/philippgille/chromem-go/blob/v0.7.0/document.go#L28) [¶](#NewDocument "Go to NewDocument") added in v0.4.0

```go
func NewDocument(ctx context.Context, id string, metadata map[string]string, embedding []float32, content string, embeddingFunc EmbeddingFunc) (Document, error)
```

NewDocument creates a new document, including its embeddings. Metadata is optional. If the embeddings are not provided, they are created using the embedding function. You can leave the content empty if you only want to store embeddings. If embeddingFunc is nil, the default embedding function is used.

If you want to create a document without embeddings, for example to let [Collection.AddDocuments](#Collection.AddDocuments) create them concurrently, you can create a document with \`chromem.Document{...}\` instead of using this constructor.

#### type [EmbeddingFunc](https://github.com/philippgille/chromem-go/blob/v0.7.0/db.go#L22) [¶](#EmbeddingFunc "Go to EmbeddingFunc")

```go
type EmbeddingFunc func(ctx context.Context, text string) ([]float32, error)
```

EmbeddingFunc is a function that creates embeddings for a given text. chromem-go will use OpenAI\`s "text-embedding-3-small" model by default, but you can provide your own function, using any model you like. The function must return a \*normalized\* vector, i.e. the length of the vector must be 1. OpenAI's and Mistral's embedding models do this by default. Some others like Nomic's "nomic-embed-text-v1.5" don't.

#### func [NewEmbeddingFuncAzureOpenAI](https://github.com/philippgille/chromem-go/blob/v0.7.0/embed_compat.go#L98) [¶](#NewEmbeddingFuncAzureOpenAI "Go to NewEmbeddingFuncAzureOpenAI") added in v0.7.0

```go
func NewEmbeddingFuncAzureOpenAI(apiKey string, deploymentURL string, apiVersion string, model string) EmbeddingFunc
```

NewEmbeddingFuncAzureOpenAI returns a function that creates embeddings for a text using the Azure OpenAI API. The \`deploymentURL\` is the URL of the deployed model, e.g. "[https://YOUR_RESOURCE_NAME.openai.azure.com/openai/deployments/YOUR_DEPLOYMENT_NAME](https://YOUR_RESOURCE_NAME.openai.azure.com/openai/deployments/YOUR_DEPLOYMENT_NAME)" See [https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/embeddings?tabs=console#how-to-get-embeddings](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/embeddings?tabs=console#how-to-get-embeddings)

#### func [NewEmbeddingFuncCohere](https://github.com/philippgille/chromem-go/blob/v0.7.0/embed_cohere.go#L84) [¶](#NewEmbeddingFuncCohere "Go to NewEmbeddingFuncCohere") added in v0.5.0

```go
func NewEmbeddingFuncCohere(apiKey string, model EmbeddingModelCohere) EmbeddingFunc
```

NewEmbeddingFuncCohere returns a function that creates embeddings for a text using Cohere's API. One important difference to OpenAI's and other's APIs is that Cohere differentiates between document embeddings and search/query embeddings. In order for this embedding func to do the differentiation, you have to prepend the text with either "search_document" or "search_query". We'll cut off that prefix before sending the document/query body to the API, we'll just use the prefix to choose the right "input type" as they call it.

When you set up a chromem-go collection with this embedding function, you might want to create the document separately with [NewDocument](#NewDocument) and then cut off the prefix before adding the document to the collection. Otherwise, when you query the collection, the returned documents will still have the prefix in their content.

```go
cohereFunc := chromem.NewEmbeddingFuncCohere(cohereApiKey, chromem.EmbeddingModelCohereEnglishV3)
content := "The sky is blue because of Rayleigh scattering."
// Create the document with the prefix.
contentWithPrefix := chromem.InputTypeCohereSearchDocumentPrefix + content
doc, _ := NewDocument(ctx, id, metadata, nil, contentWithPrefix, cohereFunc)
// Remove the prefix so that later query results don't have it.
doc.Content = content
_ = collection.AddDocument(ctx, doc)
```

This is not necessary if you don't keep the content in the documents, as chromem-go also works when documents only have embeddings. You can also keep the prefix in the document, and only remove it after querying.

We plan to improve this in the future.

#### func [NewEmbeddingFuncDefault](https://github.com/philippgille/chromem-go/blob/v0.7.0/embed_openai.go#L36) [¶](#NewEmbeddingFuncDefault "Go to NewEmbeddingFuncDefault") added in v0.3.0

```go
func NewEmbeddingFuncDefault() EmbeddingFunc
```

NewEmbeddingFuncDefault returns a function that creates embeddings for a text using OpenAI\`s "text-embedding-3-small" model via their API. The model supports a maximum text length of 8191 tokens. The API key is read from the environment variable "OPENAI_API_KEY".

#### func [NewEmbeddingFuncJina](https://github.com/philippgille/chromem-go/blob/v0.7.0/embed_compat.go#L38) [¶](#NewEmbeddingFuncJina "Go to NewEmbeddingFuncJina") added in v0.3.0

```go
func NewEmbeddingFuncJina(apiKey string, model EmbeddingModelJina) EmbeddingFunc
```

NewEmbeddingFuncJina returns a function that creates embeddings for a text using the Jina API.

#### func [NewEmbeddingFuncLocalAI](https://github.com/philippgille/chromem-go/blob/v0.7.0/embed_compat.go#L86) [¶](#NewEmbeddingFuncLocalAI "Go to NewEmbeddingFuncLocalAI") added in v0.3.0

```go
func NewEmbeddingFuncLocalAI(model string) EmbeddingFunc
```

NewEmbeddingFuncLocalAI returns a function that creates embeddings for a text using the LocalAI API. You can start a LocalAI instance like this:

```go
docker run -it -p 127.0.0.1:8080:8080 localai/localai:v2.7.0-ffmpeg-core bert-cpp
```

And then call this constructor with model "bert-cpp-minilm-v6". But other embedding models are supported as well. See the LocalAI documentation for details.

#### func [NewEmbeddingFuncMistral](https://github.com/philippgille/chromem-go/blob/v0.7.0/embed_compat.go#L11) [¶](#NewEmbeddingFuncMistral "Go to NewEmbeddingFuncMistral") added in v0.3.0

```go
func NewEmbeddingFuncMistral(apiKey string) EmbeddingFunc
```

NewEmbeddingFuncMistral returns a function that creates embeddings for a text using the Mistral API.

#### func [NewEmbeddingFuncMixedbread](https://github.com/philippgille/chromem-go/blob/v0.7.0/embed_compat.go#L71) [¶](#NewEmbeddingFuncMixedbread "Go to NewEmbeddingFuncMixedbread") added in v0.3.0

```go
func NewEmbeddingFuncMixedbread(apiKey string, model EmbeddingModelMixedbread) EmbeddingFunc
```

NewEmbeddingFuncMixedbread returns a function that creates embeddings for a text using the mixedbread.ai API.

#### func [NewEmbeddingFuncOllama](https://github.com/philippgille/chromem-go/blob/v0.7.0/embed_ollama.go#L26) [¶](#NewEmbeddingFuncOllama "Go to NewEmbeddingFuncOllama") added in v0.4.0

```go
func NewEmbeddingFuncOllama(model string, baseURLOllama string) EmbeddingFunc
```

NewEmbeddingFuncOllama returns a function that creates embeddings for a text using Ollama's embedding API. You can pass any model that Ollama supports and that supports embeddings. A good one as of 2024-03-02 is "nomic-embed-text". See [https://ollama.com/library/nomic-embed-text](https://ollama.com/library/nomic-embed-text) baseURLOllama is the base URL of the Ollama API. If it's empty, "[http://localhost:11434/api](http://localhost:11434/api)" is used.

#### func [NewEmbeddingFuncOpenAI](https://github.com/philippgille/chromem-go/blob/v0.7.0/embed_openai.go#L43) [¶](#NewEmbeddingFuncOpenAI "Go to NewEmbeddingFuncOpenAI") added in v0.3.0

```go
func NewEmbeddingFuncOpenAI(apiKey string, model EmbeddingModelOpenAI) EmbeddingFunc
```

NewEmbeddingFuncOpenAI returns a function that creates embeddings for a text using the OpenAI API.

#### func [NewEmbeddingFuncOpenAICompat](https://github.com/philippgille/chromem-go/blob/v0.7.0/embed_openai.go#L60) [¶](#NewEmbeddingFuncOpenAICompat "Go to NewEmbeddingFuncOpenAICompat") added in v0.3.0

```go
func NewEmbeddingFuncOpenAICompat(baseURL, apiKey, model string, normalized *bool) EmbeddingFunc
```

NewEmbeddingFuncOpenAICompat returns a function that creates embeddings for a text using an OpenAI compatible API. For example:

- Azure OpenAI: [https://azure.microsoft.com/en-us/products/ai-services/openai-service](https://azure.microsoft.com/en-us/products/ai-services/openai-service)
- LitLLM: [https://github.com/BerriAI/litellm](https://github.com/BerriAI/litellm)
- Ollama: [https://github.com/ollama/ollama/blob/main/docs/openai.md](https://github.com/ollama/ollama/blob/main/docs/openai.md)
- etc.

The \`normalized\` parameter indicates whether the vectors returned by the embedding model are already normalized, as is the case for OpenAI's and Mistral's models. The flag is optional. If it's nil, it will be autodetected on the first request (which bears a small risk that the vector just happens to have a length of 1).

#### func [NewEmbeddingFuncVertex](https://github.com/philippgille/chromem-go/blob/v0.7.0/embed_vertex.go#L67) [¶](#NewEmbeddingFuncVertex "Go to NewEmbeddingFuncVertex") added in v0.7.0

```go
func NewEmbeddingFuncVertex(apiKey, project string, model EmbeddingModelVertex, opts ...VertexOption) EmbeddingFunc
```

#### type [EmbeddingModelCohere](https://github.com/philippgille/chromem-go/blob/v0.7.0/embed_cohere.go#L15) [¶](#EmbeddingModelCohere "Go to EmbeddingModelCohere") added in v0.5.0

```go
type EmbeddingModelCohere string
```

```go
const (
	EmbeddingModelCohereMultilingualV2 EmbeddingModelCohere = "embed-multilingual-v2.0"
	EmbeddingModelCohereEnglishLightV2 EmbeddingModelCohere = "embed-english-light-v2.0"
	EmbeddingModelCohereEnglishV2      EmbeddingModelCohere = "embed-english-v2.0"

	EmbeddingModelCohereMultilingualLightV3 EmbeddingModelCohere = "embed-multilingual-light-v3.0"
	EmbeddingModelCohereEnglishLightV3      EmbeddingModelCohere = "embed-english-light-v3.0"
	EmbeddingModelCohereMultilingualV3      EmbeddingModelCohere = "embed-multilingual-v3.0"
	EmbeddingModelCohereEnglishV3           EmbeddingModelCohere = "embed-english-v3.0"
)
```

#### type [EmbeddingModelJina](https://github.com/philippgille/chromem-go/blob/v0.7.0/embed_compat.go#L23) [¶](#EmbeddingModelJina "Go to EmbeddingModelJina") added in v0.3.0

```go
type EmbeddingModelJina string
```

```go
const (
	EmbeddingModelJina2BaseEN EmbeddingModelJina = "jina-embeddings-v2-base-en"
	EmbeddingModelJina2BaseES EmbeddingModelJina = "jina-embeddings-v2-base-es"
	EmbeddingModelJina2BaseDE EmbeddingModelJina = "jina-embeddings-v2-base-de"
	EmbeddingModelJina2BaseZH EmbeddingModelJina = "jina-embeddings-v2-base-zh"

	EmbeddingModelJina2BaseCode EmbeddingModelJina = "jina-embeddings-v2-base-code"

	EmbeddingModelJinaClipV1 EmbeddingModelJina = "jina-clip-v1"
)
```

#### type [EmbeddingModelMixedbread](https://github.com/philippgille/chromem-go/blob/v0.7.0/embed_compat.go#L44) [¶](#EmbeddingModelMixedbread "Go to EmbeddingModelMixedbread") added in v0.3.0

```go
type EmbeddingModelMixedbread string
```

```go
const (
	// Possibly outdated / not available anymore
	EmbeddingModelMixedbreadUAELargeV1 EmbeddingModelMixedbread = "UAE-Large-V1"
	// Possibly outdated / not available anymore
	EmbeddingModelMixedbreadBGELargeENV15 EmbeddingModelMixedbread = "bge-large-en-v1.5"
	// Possibly outdated / not available anymore
	EmbeddingModelMixedbreadGTELarge EmbeddingModelMixedbread = "gte-large"
	// Possibly outdated / not available anymore
	EmbeddingModelMixedbreadE5LargeV2 EmbeddingModelMixedbread = "e5-large-v2"
	// Possibly outdated / not available anymore
	EmbeddingModelMixedbreadMultilingualE5Large EmbeddingModelMixedbread = "multilingual-e5-large"
	// Possibly outdated / not available anymore
	EmbeddingModelMixedbreadMultilingualE5Base EmbeddingModelMixedbread = "multilingual-e5-base"
	// Possibly outdated / not available anymore
	EmbeddingModelMixedbreadAllMiniLML6V2 EmbeddingModelMixedbread = "all-MiniLM-L6-v2"
	// Possibly outdated / not available anymore
	EmbeddingModelMixedbreadGTELargeZh EmbeddingModelMixedbread = "gte-large-zh"

	EmbeddingModelMixedbreadLargeV1          EmbeddingModelMixedbread = "mxbai-embed-large-v1"
	EmbeddingModelMixedbreadDeepsetDELargeV1 EmbeddingModelMixedbread = "deepset-mxbai-embed-de-large-v1"
	EmbeddingModelMixedbread2DLargeV1        EmbeddingModelMixedbread = "mxbai-embed-2d-large-v1"
)
```

#### type [EmbeddingModelOpenAI](https://github.com/philippgille/chromem-go/blob/v0.7.0/embed_openai.go#L17) [¶](#EmbeddingModelOpenAI "Go to EmbeddingModelOpenAI") added in v0.3.0

```go
type EmbeddingModelOpenAI string
```

```go
const (
	EmbeddingModelOpenAI2Ada EmbeddingModelOpenAI = "text-embedding-ada-002"

	EmbeddingModelOpenAI3Small EmbeddingModelOpenAI = "text-embedding-3-small"
	EmbeddingModelOpenAI3Large EmbeddingModelOpenAI = "text-embedding-3-large"
)
```

#### type [EmbeddingModelVertex](https://github.com/philippgille/chromem-go/blob/v0.7.0/embed_vertex.go#L14) [¶](#EmbeddingModelVertex "Go to EmbeddingModelVertex") added in v0.7.0

```go
type EmbeddingModelVertex string
```

```go
const (
	EmbeddingModelVertexEnglishV1 EmbeddingModelVertex = "textembedding-gecko@001"
	EmbeddingModelVertexEnglishV2 EmbeddingModelVertex = "textembedding-gecko@002"
	EmbeddingModelVertexEnglishV3 EmbeddingModelVertex = "textembedding-gecko@003"
	EmbeddingModelVertexEnglishV4 EmbeddingModelVertex = "text-embedding-004"

	EmbeddingModelVertexMultilingualV1 EmbeddingModelVertex = "textembedding-gecko-multilingual@001"
	EmbeddingModelVertexMultilingualV2 EmbeddingModelVertex = "text-multilingual-embedding-002"
)
```

#### type [NegativeMode](https://github.com/philippgille/chromem-go/blob/v0.7.0/collection.go#L33) [¶](#NegativeMode "Go to NegativeMode") added in v0.7.0

```go
type NegativeMode string
```

NegativeMode represents the mode to use for the negative text. See QueryOptions for more information.

```go
const (
	// NEGATIVE_MODE_FILTER filters out results based on the similarity between the
	// negative embedding and the document embeddings.
	// NegativeFilterThreshold controls the threshold for filtering. Documents with
	// similarity above the threshold will be removed from the results.
	NEGATIVE_MODE_FILTER NegativeMode = "filter"

	// NEGATIVE_MODE_SUBTRACT subtracts the negative embedding from the query embedding.
	// This is the default behavior.
	NEGATIVE_MODE_SUBTRACT NegativeMode = "subtract"

	// The default threshold for the negative filter.
	DEFAULT_NEGATIVE_FILTER_THRESHOLD = 0.5
)
```

#### type [NegativeQueryOptions](https://github.com/philippgille/chromem-go/blob/v0.7.0/collection.go#L75) [¶](#NegativeQueryOptions "Go to NegativeQueryOptions") added in v0.7.0

```go
type NegativeQueryOptions struct {
	// Mode is the mode to use for the negative text.
	Mode NegativeMode

	// Text is the text to exclude from the results.
	Text string

	// Embedding is the embedding of the negative text. It must be created
	// with the same embedding model as the document embeddings in the collection.
	// The embedding will be normalized if it's not the case yet.
	// If both Text and Embedding are set, Embedding will be used.
	Embedding []float32

	// FilterThreshold is the threshold for the negative filter. Used when Mode is NEGATIVE_MODE_FILTER.
	FilterThreshold float32
}
```

#### type [QueryOptions](https://github.com/philippgille/chromem-go/blob/v0.7.0/collection.go#L51) [¶](#QueryOptions "Go to QueryOptions") added in v0.7.0

```go
type QueryOptions struct {
	// The text to search for.
	QueryText string

	// The embedding of the query to search for. It must be created
	// with the same embedding model as the document embeddings in the collection.
	// The embedding will be normalized if it's not the case yet.
	// If both QueryText and QueryEmbedding are set, QueryEmbedding will be used.
	QueryEmbedding []float32

	// The number of results to return.
	NResults int

	// Conditional filtering on metadata.
	Where map[string]string

	// Conditional filtering on documents.
	WhereDocument map[string]string

	// Negative is the negative query options.
	// They can be used to exclude certain results from the query.
	Negative NegativeQueryOptions
}
```

QueryOptions represents the options for a query.

#### type [Result](https://github.com/philippgille/chromem-go/blob/v0.7.0/collection.go#L385) [¶](#Result "Go to Result")

```go
type Result struct {
	ID        string
	Metadata  map[string]string
	Embedding []float32
	Content   string

	// The cosine similarity between the query and the document.
	// The higher the value, the more similar the document is to the query.
	// The value is in the range [-1, 1].
	Similarity float32
}
```

Result represents a single result from a query.

#### type [VertexOption](https://github.com/philippgille/chromem-go/blob/v0.7.0/embed_vertex.go#L40) [¶](#VertexOption "Go to VertexOption") added in v0.7.0

```go
type VertexOption func(*vertexOptions)
```

#### func [WithVertexAPIEndpoint](https://github.com/philippgille/chromem-go/blob/v0.7.0/embed_vertex.go#L42) [¶](#WithVertexAPIEndpoint "Go to WithVertexAPIEndpoint") added in v0.7.0

```go
func WithVertexAPIEndpoint(apiEndpoint string) VertexOption
```

#### func [WithVertexAutoTruncate](https://github.com/philippgille/chromem-go/blob/v0.7.0/embed_vertex.go#L48) [¶](#WithVertexAutoTruncate "Go to WithVertexAutoTruncate") added in v0.7.0

```go
func WithVertexAutoTruncate(autoTruncate bool) VertexOption
```

## ![](/static/shared/icon/insert_drive_file_gm_grey_24dp.svg) Source Files [¶](#section-sourcefiles "Go to Source Files")

[View all Source files](https://github.com/philippgille/chromem-go/tree/v0.7.0)

- [collection.go](https://github.com/philippgille/chromem-go/blob/v0.7.0/collection.go "collection.go")
- [db.go](https://github.com/philippgille/chromem-go/blob/v0.7.0/db.go "db.go")
- [document.go](https://github.com/philippgille/chromem-go/blob/v0.7.0/document.go "document.go")
- [embed_cohere.go](https://github.com/philippgille/chromem-go/blob/v0.7.0/embed_cohere.go "embed_cohere.go")
- [embed_compat.go](https://github.com/philippgille/chromem-go/blob/v0.7.0/embed_compat.go "embed_compat.go")
- [embed_ollama.go](https://github.com/philippgille/chromem-go/blob/v0.7.0/embed_ollama.go "embed_ollama.go")
- [embed_openai.go](https://github.com/philippgille/chromem-go/blob/v0.7.0/embed_openai.go "embed_openai.go")
- [embed_vertex.go](https://github.com/philippgille/chromem-go/blob/v0.7.0/embed_vertex.go "embed_vertex.go")
- [persistence.go](https://github.com/philippgille/chromem-go/blob/v0.7.0/persistence.go "persistence.go")
- [query.go](https://github.com/philippgille/chromem-go/blob/v0.7.0/query.go "query.go")
- [vector.go](https://github.com/philippgille/chromem-go/blob/v0.7.0/vector.go "vector.go")

## ![](/static/shared/icon/folder_gm_grey_24dp.svg) Directories [¶](#section-directories "Go to Directories")

Show internal Expand all

| Path                                                                                                             | Synopsis |
| ---------------------------------------------------------------------------------------------------------------- | -------- |
| [example](/github.com/philippgille/chromem-go/example) module                                                    |          |
| ![](/static/shared/icon/arrow_right_gm_grey_24dp.svg) examples                                                   |          |
| [minimal](/github.com/philippgille/chromem-go/examples/minimal) Module                                           |          |
| [rag-wikipedia-ollama](/github.com/philippgille/chromem-go/examples/rag-wikipedia-ollama) Module                 |          |
| [s3-export-import](/github.com/philippgille/chromem-go/examples/s3-export-import) Module                         |          |
| [semantic-search-arxiv-openai](/github.com/philippgille/chromem-go/examples/semantic-search-arxiv-openai) Module |          |
| [wasm](/github.com/philippgille/chromem-go@v0.7.0/wasm)                                                          |          |
