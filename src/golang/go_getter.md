---
title: go-getter - Flex-Tool For Downloads | Golang
draft: false
---

<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z" clip-rule="evenodd"/>
</svg>

→ [Go Package](https://pkg.go.dev/github.com/hashicorp/go-getter) ←

<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
    <path fill-rule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clip-rule="evenodd"/>
</svg>

[GitHub Repository](https://github.com/hashicorp/go-getter)


## ![](/static/shared/icon/chrome_reader_mode_gm_grey_24dp.svg) README [¶](#section-readme "Go to Readme")

### go-getter

go-getter is a library for Go (golang) for downloading files or directories from various sources using a URL as the primary form of input.

The power of this library is being flexible in being able to download from a number of different sources (file paths, Git, HTTP, Mercurial, etc.) using a single string as input. This removes the burden of knowing how to download from a variety of sources from the implementer.

The concept of a *detector* automatically turns invalid URLs into proper URLs. For example: "github.com/hashicorp/go-getter" would turn into a Git URL. Or "./foo" would turn into a file URL. These are extensible.

This library is used by [Terraform](https://terraform.io) for downloading modules and [Nomad](https://nomadproject.io) for downloading binaries.

#### Installation and Usage

Package documentation can be found on [GoDoc](http://godoc.org/github.com/hashicorp/go-getter).

Installation can be done with a normal `go get`:

```bash
go get github.com/hashicorp/go-getter
```

go-getter also has a command you can use to test URL strings:

```bash
go install github.com/hashicorp/go-getter/cmd/go-getter
```

```bash
go-getter github.com/foo/bar ./foo
```

The command is useful for verifying URL structures.

#### Security

Fetching resources from user-supplied URLs is an inherently dangerous operation and may leave your application vulnerable to [server side request forgery](https://owasp.org/www-community/attacks/Server_Side_Request_Forgery), [path traversal](https://owasp.org/www-community/attacks/Path_Traversal), [denial of service](https://owasp.org/www-community/attacks/Denial_of_Service) or other security flaws.

go-getter contains mitigations for some of these security issues, but should still be used with caution in security-critical contexts. See the available [security options](#readme-Security-Options) that can be configured to mitigate some of these risks.

go-getter may return values that contain caller-provided query parameters that can contain sensitive data. Context around what parameters are and are not sensitive is known only by the caller of go-getter, and specific to each use case. We recommend the caller ensure that go-getter's return values (e.g., error messages) are properly handled and sanitized to ensure sensitive data is not persisted to logs.

#### URL Format

go-getter uses a single string URL as input to download from a variety of protocols. go-getter has various "tricks" with this URL to do certain things. This section documents the URL format.

##### Supported Protocols and Detectors

**Protocols** are used to download files/directories using a specific mechanism. Example protocols are Git and HTTP.

**Detectors** are used to transform a valid or invalid URL into another URL if it matches a certain pattern. Example: "github.com/user/repo" is automatically transformed into a fully valid Git URL. This allows go-getter to be very user friendly.

go-getter out of the box supports the following protocols. Additional protocols can be augmented at runtime by implementing the `Getter` interface.

- Local files
- Git
- Mercurial
- HTTP
- Amazon S3
- Google GCP

In addition to the above protocols, go-getter has what are called "detectors." These take a URL and attempt to automatically choose the best protocol for it, which might involve even changing the protocol. The following detection is built-in by default:

- File paths such as "./foo" are automatically changed to absolute file URLs.
- GitHub URLs, such as "github.com/mitchellh/vagrant" are automatically changed to Git protocol over HTTP.
- GitLab URLs, such as "gitlab.com/inkscape/inkscape" are automatically changed to Git protocol over HTTP.
- BitBucket URLs, such as "bitbucket.org/mitchellh/vagrant" are automatically changed to a Git or mercurial protocol using the BitBucket API.

##### Forced Protocol

In some cases, the protocol to use is ambiguous depending on the source URL. For example, "[http://github.com/mitchellh/vagrant.git"](http://github.com/mitchellh/vagrant.git%22) could reference an HTTP URL or a Git URL. Forced protocol syntax is used to disambiguate this URL.

Forced protocol can be done by prefixing the URL with the protocol followed by double colons. For example: `git::http://github.com/mitchellh/vagrant.git` would download the given HTTP URL using the Git protocol.

Forced protocols will also override any detectors.

In the absence of a forced protocol, detectors may be run on the URL, transforming the protocol anyways. The above example would've used the Git protocol either way since the Git detector would've detected it was a GitHub URL.

##### Protocol-Specific Options

Each protocol can support protocol-specific options to configure that protocol. For example, the `git` protocol supports specifying a `ref` query parameter that tells it what ref to checkout for that Git repository.

The options are specified as query parameters on the URL (or URL-like string) given to go-getter. Using the Git example above, the URL below is a valid input to go-getter:

```
github.com/hashicorp/go-getter?ref=abcd1234
```

The protocol-specific options are documented below the URL format section. But because they are part of the URL, we point it out here so you know they exist.

##### Subdirectories

If you want to download only a specific subdirectory from a downloaded directory, you can specify a subdirectory after a double-slash `//`. go-getter will first download the URL specified *before* the double-slash (as if you didn't specify a double-slash), but will then copy the path after the double slash into the target directory.

For example, if you're downloading this GitHub repository, but you only want to download the `testdata` directory, you can do the following:

```
https://github.com/hashicorp/go-getter.git//testdata
```

If you downloaded this to the `/tmp` directory, then the file `/tmp/archive.gz` would exist. Notice that this file is in the `testdata` directory in this repository, but because we specified a subdirectory, go-getter automatically copied only that directory contents.

Subdirectory paths may also use filesystem glob patterns. The path must match *exactly one* entry or go-getter will return an error. This is useful if you're not sure the exact directory name but it follows a predictable naming structure.

For example, the following URL would also work:

```
https://github.com/hashicorp/go-getter.git//test-*
```

##### Checksumming

For file downloads of any protocol, go-getter can automatically verify a checksum for you. Note that checksumming only works for downloading files, not directories, but checksumming will work for any protocol.

To checksum a file, append a `checksum` query parameter to the URL. go-getter will parse out this query parameter automatically and use it to verify the checksum. The parameter value can be in the format of `type:value` or just `value`, where type is "md5", "sha1", "sha256", "sha512" or "file" . The "value" should be the actual checksum value or download URL for "file". When `type` part is omitted, type will be guessed based on the length of the checksum string. Examples:

```
./foo.txt?checksum=md5:b7d96c89d09d9e204f5fedc4d5d55b21
```

```
./foo.txt?checksum=b7d96c89d09d9e204f5fedc4d5d55b21
```

```
./foo.txt?checksum=file:./foo.txt.sha256sum
```

When checksumming from a file - ex: with `checksum=file:url` - go-getter will get the file linked in the URL after `file:` using the same configuration. For example, in `file:http://releases.ubuntu.com/cosmic/MD5SUMS` go-getter will download a checksum file under the aforementioned url using the http protocol. All protocols supported by go-getter can be used. The checksum file will be downloaded in a temporary file then parsed. The destination of the temporary file can be changed by setting system specific environment variables: `TMPDIR` for unix; `TMP`, `TEMP` or `USERPROFILE` on windows. Read godoc of [os.TempDir](https://golang.org/pkg/os/#TempDir) for more information on the temporary directory selection. Content of files are expected to be BSD or GNU style. Once go-getter is done with the checksum file; it is deleted.

The checksum query parameter is never sent to the backend protocol implementation. It is used at a higher level by go-getter itself.

If the destination file exists and the checksums match: download will be skipped.

##### Unarchiving

go-getter will automatically unarchive files into a file or directory based on the extension of the file being requested (over any protocol). This works for both file and directory downloads.

go-getter looks for an `archive` query parameter to specify the format of the archive. If this isn't specified, go-getter will use the extension of the path to see if it appears archived. Unarchiving can be explicitly disabled by setting the `archive` query parameter to `false`.

The following archive formats are supported:

- `tar.gz` and `tgz`
- `tar.bz2` and `tbz2`
- `tar.xz` and `txz`
- `zip`
- `gz`
- `bz2`
- `xz`

For example, an example URL is shown below:

```
./foo.zip
```

This will automatically be inferred to be a ZIP file and will be extracted. You can also be explicit about the archive type:

```
./some/other/path?archive=zip
```

And finally, you can disable archiving completely:

```
./some/path?archive=false
```

You can combine unarchiving with the other features of go-getter such as checksumming. The special `archive` query parameter will be removed from the URL before going to the final protocol downloader.

#### Protocol-Specific Options

This section documents the protocol-specific options that can be specified for go-getter. These options should be appended to the input as normal query parameters ([HTTP headers](#readme-headers) are an exception to this, however). Depending on the usage of go-getter, applications may provide alternate ways of inputting options. For example, [Nomad](https://www.nomadproject.io) provides a nice options block for specifying options rather than in the URL.

#### General (All Protocols)

The options below are available to all protocols:

- `archive` - The archive format to use to unarchive this file, or "" (empty string) to disable unarchiving. For more details, see the complete section on archive support above.
- `checksum` - Checksum to verify the downloaded file or archive. See the entire section on checksumming above for format and more details.
- `filename` - When in file download mode, allows specifying the name of the downloaded file on disk. Has no effect in directory mode.

##### Local Files (`file`)

None

##### Git (`git`)

- `ref` - The Git ref to checkout. This is a ref, so it can point to a commit SHA, a branch name, etc. If it is a named ref such as a branch name, go-getter will update it to the latest on each get.
- `sshkey` - An SSH private key to use during clones. The provided key must be a base64-encoded string. For example, to generate a suitable `sshkey` from a private key file on disk, you would run `base64 -w0 <file>`.

  **Note**: Git 2.3+ is required to use this feature.
- `depth` - The Git clone depth. The provided number specifies the last `n` revisions to clone from the repository.

The `git` getter accepts both URL-style SSH addresses like `git::ssh://git@example.com/foo/bar`, and "scp-style" addresses like `git::git@example.com/foo/bar`. In the latter case, omitting the `git::` force prefix is allowed if the username prefix is exactly `git@`.

The "scp-style" addresses *cannot* be used in conjunction with the `ssh://` scheme prefix, because in that case the colon is used to mark an optional port number to connect on, rather than to delimit the path from the host.

##### Mercurial (`hg`)

- `rev` - The Mercurial revision to checkout.

##### HTTP (`http`)

###### Basic Authentication

To use HTTP basic authentication with go-getter, simply prepend `username:password@` to the hostname in the URL such as `https://Aladdin:OpenSesame@www.example.com/index.html`. All special characters, including the username and password, must be URL encoded.

###### Headers

Optional request headers can be added by supplying them in a custom [`HttpGetter`](https://godoc.org/github.com/hashicorp/go-getter#HttpGetter) (*not* as query parameters like most other options). These headers will be sent out on every request the getter in question makes.

##### S3 (`s3`)

S3 takes various access configurations in the URL. Note that it will also read these from standard AWS environment variables if they're set. S3 compliant servers like Minio are also supported. If the query parameters are present, these take priority.

- `aws_access_key_id` - AWS access key.
- `aws_access_key_secret` - AWS access key secret.
- `aws_access_token` - AWS access token if this is being used.
- `aws_profile` - Use this profile from local ~/.aws/ config. Takes priority over the other three.

###### Using IAM Instance Profiles with S3

If you use go-getter and want to use an EC2 IAM Instance Profile to avoid using credentials, then just omit these and the profile, if available will be used automatically.

##### Using S3 with Minio

If you use go-gitter for Minio support, you must consider the following:

- `aws_access_key_id` (required) - Minio access key.
- `aws_access_key_secret` (required) - Minio access key secret.
- `region` (optional - defaults to us-east-1) - Region identifier to use.
- `version` (optional - defaults to Minio default) - Configuration file format.

###### S3 Bucket Examples

S3 has several addressing schemes used to reference your bucket. These are listed here: [https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-bucket-intro.html](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-bucket-intro.html)

Some examples for these addressing schemes:

- s3::[https://s3.amazonaws.com/bucket/foo](https://s3.amazonaws.com/bucket/foo)
- s3::[https://s3-eu-west-1.amazonaws.com/bucket/foo](https://s3-eu-west-1.amazonaws.com/bucket/foo)
- bucket.s3.amazonaws.com/foo
- bucket.s3-eu-west-1.amazonaws.com/foo/bar
- "s3::[http://127.0.0.1:9000/test-bucket/hello.txt?aws\_access\_key\_id=KEYID&amp;aws\_access\_key\_secret=SECRETKEY&amp;region=us-east-2"](http://127.0.0.1:9000/test-bucket/hello.txt?aws_access_key_id=KEYID&aws_access_key_secret=SECRETKEY&region=us-east-2%22)

##### GCS (`gcs`)

###### GCS Authentication

In order to access to GCS, authentication credentials should be provided. More information can be found [here](https://cloud.google.com/docs/authentication/getting-started)

###### GCS Bucket Examples

- gcs::[https://www.googleapis.com/storage/v1/bucket](https://www.googleapis.com/storage/v1/bucket)
- gcs::[https://www.googleapis.com/storage/v1/bucket/foo.zip](https://www.googleapis.com/storage/v1/bucket/foo.zip)
- [www.googleapis.com/storage/v1/bucket/foo](https://www.googleapis.com/storage/v1/bucket/foo)

###### GCS Testing

The tests for `get_gcs.go` require you to have GCP credentials set in your environment. These credentials can have any level of permissions to any project, they just need to exist. This means setting `GOOGLE_APPLICATION_CREDENTIALS="~/path/to/credentials.json"` or `GOOGLE_CREDENTIALS="{stringified-credentials-json}"`. Due to this configuration, `get_gcs_test.go` will fail for external contributors in CircleCI.

##### Security Options

**Disable Symlinks**

In your getter client config, we recommend using the `DisableSymlinks` option, which prevents writing through or copying from symlinks (which may point outside the directory).

```
client := getter.Client{
    // This will prevent copying or writing files through symlinks
    DisableSymlinks: true,
}
```

**Disable or Limit `X-Terraform-Get`**

Go-Getter supports arbitrary redirects via the `X-Terraform-Get` header. This functionality exists to support [Terraform use cases](https://www.terraform.io/language/modules/sources#http-urls), but is likely not needed in most applications.

For code that uses the `HttpGetter`, add the following configuration options:

```
var httpGetter = &getter.HttpGetter{
    // Most clients should disable X-Terraform-Get
    // See the note below
    XTerraformGetDisabled: true,
    // Your software probably doesn’t rely on X-Terraform-Get, but
    // if it does, you should set the above field to false, plus
    // set XTerraformGet Limit to prevent endless redirects
    // XTerraformGetLimit: 10,
}
```

**Enforce Timeouts**

The `HttpGetter` supports timeouts and other resource-constraining configuration options. The `GitGetter` and `HgGetter` only support timeouts.

Configuration for the `HttpGetter`:

```
var httpGetter = &getter.HttpGetter{
    // Disable pre-fetch HEAD requests
    DoNotCheckHeadFirst: true,

    // As an alternative to the above setting, you can
    // set a reasonable timeout for HEAD requests
    // HeadFirstTimeout: 10 * time.Second,

    // Read timeout for HTTP operations
    ReadTimeout: 30 * time.Second,

    // Set the maximum number of bytes
    // that can be read by the getter
    MaxBytes: 500000000, // 500 MB
}
```

For code that uses the `GitGetter` or `HgGetter`, set the `Timeout` option:

```
var gitGetter = &getter.GitGetter{
    // Set a reasonable timeout for git operations
    Timeout: 5 * time.Minute,
}
```

```
var hgGetter = &getter.HgGetter{
    // Set a reasonable timeout for hg operations
    Timeout: 5 * time.Minute,
}
```

Expand ▾ Collapse ▴

## ![](/static/shared/icon/code_gm_grey_24dp.svg) Documentation [¶](#section-documentation "Go to Documentation")

[Rendered for](https://go.dev/about#build-context) linux/amd64 windows/amd64 darwin/amd64 js/wasm

### Overview [¶](#pkg-overview "Go to Overview")

getter is a package for downloading files or directories from a variety of protocols.

getter is unique in its ability to download both directories and files. It also detects certain source strings to be protocol-specific URLs. For example, "github.com/hashicorp/go-getter" would turn into a Git URL and use the Git protocol.

Protocols and detectors are extensible.

To get started, see Client.

### Index [¶](#pkg-index "Go to Index")

- [Variables](#pkg-variables)
- [func Copy(ctx context.Context, dst io.Writer, src io.Reader) (int64, error)](#Copy)
- [func Detect(src string, pwd string, ds \[\]Detector) (string, error)](#Detect)
- [func Get(dst, src string, opts ...ClientOption) error](#Get)
- [func GetAny(dst, src string, opts ...ClientOption) error](#GetAny)
- [func GetFile(dst, src string, opts ...ClientOption) error](#GetFile)
- [func LimitedDecompressors(filesLimit int, fileSizeLimit int64) map\[string\]Decompressor](#LimitedDecompressors)
- [func RedactURL(u \*url.URL) string](#RedactURL)
- [func SourceDirSubdir(src string) (string, string)](#SourceDirSubdir)
- [func SubdirGlob(dst, subDir string) (string, error)](#SubdirGlob)
- [func TestDecompressor(t testing.T, d Decompressor, cases \[\]TestDecompressCase)](#TestDecompressor)
- [func WithInsecure() func(\*Client) error](#WithInsecure)
- [func WithProgress(pl ProgressTracker) func(\*Client) error](#WithProgress)
- [type BitBucketDetector](#BitBucketDetector)
- - [func (d \*BitBucketDetector) Detect(src, _ string) (string, bool, error)](#BitBucketDetector.Detect)
- [type Bzip2Decompressor](#Bzip2Decompressor)
- - [func (d \*Bzip2Decompressor) Decompress(dst, src string, dir bool, umask os.FileMode) error](#Bzip2Decompressor.Decompress)
- [type ChecksumError](#ChecksumError)
- - [func (cerr \*ChecksumError) Error() string](#ChecksumError.Error)
- [type Client](#Client)
- - [func (c \*Client) ChecksumFromFile(checksumFile string, src \*url.URL) (\*FileChecksum, error)](#Client.ChecksumFromFile)
  - [func (c \*Client) Configure(opts ...ClientOption) error](#Client.Configure)
  - [func (c \*Client) Get() error](#Client.Get)
- [type ClientMode](#ClientMode)
- [type ClientOption](#ClientOption)
- - [func WithContext(ctx context.Context) ClientOption](#WithContext)
  - [func WithDecompressors(decompressors map\[string\]Decompressor) ClientOption](#WithDecompressors)
  - [func WithDetectors(detectors \[\]Detector) ClientOption](#WithDetectors)
  - [func WithGetters(getters map\[string\]Getter) ClientOption](#WithGetters)
  - [func WithMode(mode ClientMode) ClientOption](#WithMode)
  - [func WithUmask(mode os.FileMode) ClientOption](#WithUmask)
- [type Decompressor](#Decompressor)
- [type Detector](#Detector)
- [type FileChecksum](#FileChecksum)
- [type FileDetector](#FileDetector)
- - [func (d \*FileDetector) Detect(src, pwd string) (string, bool, error)](#FileDetector.Detect)
- [type FileGetter](#FileGetter)
- - [func (g \*FileGetter) ClientMode(u \*url.URL) (ClientMode, error)](#FileGetter.ClientMode)
  - [func (g \*FileGetter) Context() context.Context](#FileGetter.Context)
  - [func (g \*FileGetter) Get(dst string, u \*url.URL) error](#FileGetter.Get)
  - [func (g \*FileGetter) GetFile(dst string, u \*url.URL) error](#FileGetter.GetFile)
  - [func (g \*FileGetter) SetClient(c \*Client)](#FileGetter.SetClient)
- [type FolderStorage](#FolderStorage)
- - [func (s \*FolderStorage) Dir(key string) (d string, e bool, err error)](#FolderStorage.Dir)
  - [func (s \*FolderStorage) Get(key string, source string, update bool) error](#FolderStorage.Get)
- [type GCSDetector](#GCSDetector)
- - [func (d \*GCSDetector) Detect(src, _ string) (string, bool, error)](#GCSDetector.Detect)
- [type GCSGetter](#GCSGetter)
- - [func (g \*GCSGetter) ClientMode(u \*url.URL) (ClientMode, error)](#GCSGetter.ClientMode)
  - [func (g \*GCSGetter) Context() context.Context](#GCSGetter.Context)
  - [func (g \*GCSGetter) Get(dst string, u \*url.URL) error](#GCSGetter.Get)
  - [func (g \*GCSGetter) GetFile(dst string, u \*url.URL) error](#GCSGetter.GetFile)
  - [func (g \*GCSGetter) SetClient(c \*Client)](#GCSGetter.SetClient)
- [type Getter](#Getter)
- [type GitDetector](#GitDetector)
- - [func (d \*GitDetector) Detect(src, _ string) (string, bool, error)](#GitDetector.Detect)
- [type GitGetter](#GitGetter)
- - [func (g \*GitGetter) ClientMode(_ \*url.URL) (ClientMode, error)](#GitGetter.ClientMode)
  - [func (g \*GitGetter) Context() context.Context](#GitGetter.Context)
  - [func (g \*GitGetter) Get(dst string, u \*url.URL) error](#GitGetter.Get)
  - [func (g \*GitGetter) GetFile(dst string, u \*url.URL) error](#GitGetter.GetFile)
  - [func (g \*GitGetter) SetClient(c \*Client)](#GitGetter.SetClient)
- [type GitHubDetector](#GitHubDetector)
- - [func (d \*GitHubDetector) Detect(src, _ string) (string, bool, error)](#GitHubDetector.Detect)
- [type GitLabDetector](#GitLabDetector)
- - [func (d \*GitLabDetector) Detect(src, _ string) (string, bool, error)](#GitLabDetector.Detect)
- [type GzipDecompressor](#GzipDecompressor)
- - [func (d \*GzipDecompressor) Decompress(dst, src string, dir bool, umask os.FileMode) error](#GzipDecompressor.Decompress)
- [type HgGetter](#HgGetter)
- - [func (g \*HgGetter) ClientMode(_ \*url.URL) (ClientMode, error)](#HgGetter.ClientMode)
  - [func (g \*HgGetter) Context() context.Context](#HgGetter.Context)
  - [func (g \*HgGetter) Get(dst string, u \*url.URL) error](#HgGetter.Get)
  - [func (g \*HgGetter) GetFile(dst string, u \*url.URL) error](#HgGetter.GetFile)
  - [func (g \*HgGetter) SetClient(c \*Client)](#HgGetter.SetClient)
- [type HttpGetter](#HttpGetter)
- - [func (g \*HttpGetter) ClientMode(u \*url.URL) (ClientMode, error)](#HttpGetter.ClientMode)
  - [func (g \*HttpGetter) Context() context.Context](#HttpGetter.Context)
  - [func (g \*HttpGetter) Get(dst string, u \*url.URL) error](#HttpGetter.Get)
  - [func (g \*HttpGetter) GetFile(dst string, src \*url.URL) error](#HttpGetter.GetFile)
  - [func (g \*HttpGetter) SetClient(c \*Client)](#HttpGetter.SetClient)
- [type MockGetter](#MockGetter)
- - [func (g \*MockGetter) ClientMode(u \*url.URL) (ClientMode, error)](#MockGetter.ClientMode)
  - [func (g \*MockGetter) Context() context.Context](#MockGetter.Context)
  - [func (g \*MockGetter) Get(dst string, u \*url.URL) error](#MockGetter.Get)
  - [func (g \*MockGetter) GetFile(dst string, u \*url.URL) error](#MockGetter.GetFile)
  - [func (g \*MockGetter) SetClient(c \*Client)](#MockGetter.SetClient)
- [type ProgressTracker](#ProgressTracker)
- [type S3Detector](#S3Detector)
- - [func (d \*S3Detector) Detect(src, _ string) (string, bool, error)](#S3Detector.Detect)
- [type S3Getter](#S3Getter)
- - [func (g \*S3Getter) ClientMode(u \*url.URL) (ClientMode, error)](#S3Getter.ClientMode)
  - [func (g \*S3Getter) Context() context.Context](#S3Getter.Context)
  - [func (g \*S3Getter) Get(dst string, u \*url.URL) error](#S3Getter.Get)
  - [func (g \*S3Getter) GetFile(dst string, u \*url.URL) error](#S3Getter.GetFile)
  - [func (g \*S3Getter) SetClient(c \*Client)](#S3Getter.SetClient)
- [type Storage](#Storage)
- [type TarBzip2Decompressor](#TarBzip2Decompressor)
- - [func (d \*TarBzip2Decompressor) Decompress(dst, src string, dir bool, umask os.FileMode) error](#TarBzip2Decompressor.Decompress)
- [type TarDecompressor](#TarDecompressor)
- - [func (d \*TarDecompressor) Decompress(dst, src string, dir bool, umask os.FileMode) error](#TarDecompressor.Decompress)
- [type TarGzipDecompressor](#TarGzipDecompressor)
- - [func (d \*TarGzipDecompressor) Decompress(dst, src string, dir bool, umask os.FileMode) error](#TarGzipDecompressor.Decompress)
- [type TarXzDecompressor](#TarXzDecompressor)
- - [func (d \*TarXzDecompressor) Decompress(dst, src string, dir bool, umask os.FileMode) error](#TarXzDecompressor.Decompress)
- [type TarZstdDecompressor](#TarZstdDecompressor)
- - [func (d \*TarZstdDecompressor) Decompress(dst, src string, dir bool, umask os.FileMode) error](#TarZstdDecompressor.Decompress)
- [type TestDecompressCase](#TestDecompressCase)
- [type XzDecompressor](#XzDecompressor)
- - [func (d \*XzDecompressor) Decompress(dst, src string, dir bool, umask os.FileMode) error](#XzDecompressor.Decompress)
- [type ZipDecompressor](#ZipDecompressor)
- - [func (d \*ZipDecompressor) Decompress(dst, src string, dir bool, umask os.FileMode) error](#ZipDecompressor.Decompress)
- [type ZstdDecompressor](#ZstdDecompressor)
- - [func (d \*ZstdDecompressor) Decompress(dst, src string, dir bool, umask os.FileMode) error](#ZstdDecompressor.Decompress)

### Constants [¶](#pkg-constants "Go to Constants")

This section is empty.

### Variables [¶](#pkg-variables "Go to Variables")

[View Source](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress.go#L66)

```
var Decompressors = LimitedDecompressors(noFilesLimit, noFileSizeLimit)
```

Decompressors is the mapping of extension to the Decompressor implementation configured with default settings that will decompress that extension/type.

Note: these decompressors by default do not limit the number of files or the maximum file size created by the decompressed payload.

[View Source](https://github.com/hashicorp/go-getter/blob/v1.7.8/detect.go#L24)

```
var Detectors []Detector
```

Detectors is the list of detectors that are tried on an invalid URL. This is also the order they're tried (index 0 is first).

[View Source](https://github.com/hashicorp/go-getter/blob/v1.7.8/client.go#L21)

```
var ErrSymlinkCopy = errors.New("copying of symlinks has been disabled")
```

ErrSymlinkCopy means that a copy of a symlink was encountered on a request with DisableSymlinks enabled.

[View Source](https://github.com/hashicorp/go-getter/blob/v1.7.8/get.go#L56)

```
var Getters map[string]Getter
```

Getters is the mapping of scheme to the Getter implementation that will be used to get a dependency.

### Functions [¶](#pkg-functions "Go to Functions")

#### func [Copy](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_file_copy.go#L19) [¶](#Copy "Go to Copy")

```
func Copy(ctx context.Context, dst io.Writer, src io.Reader) (int64, error)
```

Copy is a io.Copy cancellable by context

#### func [Detect](https://github.com/hashicorp/go-getter/blob/v1.7.8/detect.go#L47) [¶](#Detect "Go to Detect")

```
func Detect(src string, pwd string, ds []Detector) (string, error)
```

Detect turns a source string into another source string if it is detected to be of a known pattern.

The third parameter should be the list of detectors to use in the order to try them. If you don't want to configure this, just use the global Detectors variable.

This is safe to be called with an already valid source string: Detect will just return it.

#### func [Get](https://github.com/hashicorp/go-getter/blob/v1.7.8/get.go#L86) [¶](#Get "Go to Get")

```
func Get(dst, src string, opts ...ClientOption) error
```

Get downloads the directory specified by src into the folder specified by dst. If dst already exists, Get will attempt to update it.

src is a URL, whereas dst is always just a file path to a folder. This folder doesn't need to exist. It will be created if it doesn't exist.

#### func [GetAny](https://github.com/hashicorp/go-getter/blob/v1.7.8/get.go#L101) [¶](#GetAny "Go to GetAny")

```
func GetAny(dst, src string, opts ...ClientOption) error
```

GetAny downloads a URL into the given destination. Unlike Get or GetFile, both directories and files are supported.

dst must be a directory. If src is a file, it will be downloaded into dst with the basename of the URL. If src is a directory or archive, it will be unpacked directly into dst.

#### func [GetFile](https://github.com/hashicorp/go-getter/blob/v1.7.8/get.go#L112) [¶](#GetFile "Go to GetFile")

```
func GetFile(dst, src string, opts ...ClientOption) error
```

GetFile downloads the file specified by src into the path specified by dst.

#### func [LimitedDecompressors](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress.go#L26) [¶](#LimitedDecompressors "Go to LimitedDecompressors") added in v1.7.0

```
func LimitedDecompressors(filesLimit int, fileSizeLimit int64) map[string]Decompressor
```

LimitedDecompressors creates the set of Decompressors, but with each compressor configured with the given filesLimit and/or fileSizeLimit where applicable.

#### func [RedactURL](https://github.com/hashicorp/go-getter/blob/v1.7.8/url.go#L13) [¶](#RedactURL "Go to RedactURL") added in v1.5.8

```
func RedactURL(u *url.URL) string
```

RedactURL is a port of url.Redacted from the standard library, which is like url.String but replaces any password with "redacted". Only the password in u.URL is redacted. This allows the library to maintain compatibility with go1.14. This port was also extended to redact SSH key from URL query parameter.

#### func [SourceDirSubdir](https://github.com/hashicorp/go-getter/blob/v1.7.8/source.go#L20) [¶](#SourceDirSubdir "Go to SourceDirSubdir")

```
func SourceDirSubdir(src string) (string, string)
```

SourceDirSubdir takes a source URL and returns a tuple of the URL without the subdir and the subdir.

ex:

```
dom.com/path/?q=p               => dom.com/path/?q=p, ""
proto://dom.com/path//*?q=p     => proto://dom.com/path?q=p, "*"
proto://dom.com/path//path2?q=p => proto://dom.com/path?q=p, "path2"
```

#### func [SubdirGlob](https://github.com/hashicorp/go-getter/blob/v1.7.8/source.go#L63) [¶](#SubdirGlob "Go to SubdirGlob")

```
func SubdirGlob(dst, subDir string) (string, error)
```

SubdirGlob returns the actual subdir with globbing processed.

dst should be a destination directory that is already populated (the download is complete) and subDir should be the set subDir. If subDir is an empty string, this returns an empty string.

The returned path is the full absolute path.

#### func [TestDecompressor](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_testing.go#L33) [¶](#TestDecompressor "Go to TestDecompressor")

```
func TestDecompressor(t testing.T, d Decompressor, cases []TestDecompressCase)
```

TestDecompressor is a helper function for testing generic decompressors.

#### func [WithInsecure](https://github.com/hashicorp/go-getter/blob/v1.7.8/client_option_insecure.go#L12) [¶](#WithInsecure "Go to WithInsecure") added in v1.5.4

```
func WithInsecure() func(*Client) error
```

WithInsecure allows for a user to avoid checking certificates (not recommended). For example, when connecting on HTTPS where an invalid certificate is presented. User assumes all risk. Not all getters have support for insecure mode yet.

#### func [WithProgress](https://github.com/hashicorp/go-getter/blob/v1.7.8/client_option_progress.go#L15) [¶](#WithProgress "Go to WithProgress")

```
func WithProgress(pl ProgressTracker) func(*Client) error
```

WithProgress allows for a user to track the progress of a download. For example by displaying a progress bar with current download. Not all getters have progress support yet.

### Types [¶](#pkg-types "Go to Types")

#### type [BitBucketDetector](https://github.com/hashicorp/go-getter/blob/v1.7.8/detect_bitbucket.go#L16) [¶](#BitBucketDetector "Go to BitBucketDetector")

```
type BitBucketDetector struct{}
```

BitBucketDetector implements Detector to detect BitBucket URLs and turn them into URLs that the Git or Hg Getter can understand.

#### func (\*BitBucketDetector) [Detect](https://github.com/hashicorp/go-getter/blob/v1.7.8/detect_bitbucket.go#L18) [¶](#BitBucketDetector.Detect "Go to BitBucketDetector.Detect")

```
func (d *BitBucketDetector) Detect(src, _ string) (string, bool, error)
```

#### type [Bzip2Decompressor](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_bzip2.go#L15) [¶](#Bzip2Decompressor "Go to Bzip2Decompressor")

```
type Bzip2Decompressor struct {
	// FileSizeLimit limits the size of a decompressed file.
	//
	// The zero value means no limit.
	FileSizeLimit int64
}
```

Bzip2Decompressor is an implementation of Decompressor that can decompress bz2 files.

#### func (\*Bzip2Decompressor) [Decompress](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_bzip2.go#L22) [¶](#Bzip2Decompressor.Decompress "Go to Bzip2Decompressor.Decompress")

```
func (d *Bzip2Decompressor) Decompress(dst, src string, dir bool, umask os.FileMode) error
```

#### type [ChecksumError](https://github.com/hashicorp/go-getter/blob/v1.7.8/checksum.go#L34) [¶](#ChecksumError "Go to ChecksumError") added in v1.2.0

```
type ChecksumError struct {
	Hash     hash.Hash
	Actual   []byte
	Expected []byte
	File     string
}
```

A ChecksumError is returned when a checksum differs

#### func (\*ChecksumError) [Error](https://github.com/hashicorp/go-getter/blob/v1.7.8/checksum.go#L41) [¶](#ChecksumError.Error "Go to ChecksumError.Error") added in v1.2.0

```
func (cerr *ChecksumError) Error() string
```

#### type [Client](https://github.com/hashicorp/go-getter/blob/v1.7.8/client.go#L28) [¶](#Client "Go to Client")

```
type Client struct {
	// Ctx for cancellation
	Ctx context.Context

	// Src is the source URL to get.
	//
	// Dst is the path to save the downloaded thing as. If Dir is set to
	// true, then this should be a directory. If the directory doesn't exist,
	// it will be created for you.
	//
	// Pwd is the working directory for detection. If this isn't set, some
	// detection may fail. Client will not default pwd to the current
	// working directory for security reasons.
	Src string
	Dst string
	Pwd string

	// Mode is the method of download the client will use. See ClientMode
	// for documentation.
	Mode ClientMode

	// Umask is used to mask file permissions when storing local files or decompressing
	// an archive
	Umask os.FileMode

	// Detectors is the list of detectors that are tried on the source.
	// If this is nil, then the default Detectors will be used.
	Detectors []Detector

	// Decompressors is the map of decompressors supported by this client.
	// If this is nil, then the default value is the Decompressors global.
	Decompressors map[string]Decompressor

	// Getters is the map of protocols supported by this client. If this
	// is nil, then the default Getters variable will be used.
	Getters map[string]Getter

	// Dir, if true, tells the Client it is downloading a directory (versus
	// a single file). This distinction is necessary since filenames and
	// directory names follow the same format so disambiguating is impossible
	// without knowing ahead of time.
	//
	// WARNING: deprecated. If Mode is set, that will take precedence.
	Dir bool

	// ProgressListener allows to track file downloads.
	// By default a no op progress listener is used.
	ProgressListener ProgressTracker

	// Insecure controls whether a client verifies the server's
	// certificate chain and host name. If Insecure is true, crypto/tls
	// accepts any certificate presented by the server and any host name in that
	// certificate. In this mode, TLS is susceptible to machine-in-the-middle
	// attacks unless custom verification is used. This should be used only for
	// testing or in combination with VerifyConnection or VerifyPeerCertificate.
	// This is identical to tls.Config.InsecureSkipVerify.
	Insecure bool

	// Disable symlinks
	DisableSymlinks bool

	Options []ClientOption
}
```

Client is a client for downloading things.

Top-level functions such as Get are shortcuts for interacting with a client. Using a client directly allows more fine-grained control over how downloading is done, as well as customizing the protocols supported.

#### func (\*Client) [ChecksumFromFile](https://github.com/hashicorp/go-getter/blob/v1.7.8/checksum.go#L196) [¶](#Client.ChecksumFromFile "Go to Client.ChecksumFromFile") added in v1.4.0

```
func (c *Client) ChecksumFromFile(checksumFile string, src *url.URL) (*FileChecksum, error)
```

ChecksumFromFile will return all the FileChecksums found in file

ChecksumFromFile will try to guess the hashing algorithm based on content of checksum file

ChecksumFromFile will only return checksums for files that match file behind src

#### func (\*Client) [Configure](https://github.com/hashicorp/go-getter/blob/v1.7.8/client_option.go#L17) [¶](#Client.Configure "Go to Client.Configure")

```
func (c *Client) Configure(opts ...ClientOption) error
```

Configure applies all of the given client options, along with any default behavior including context, decompressors, detectors, and getters used by the client.

#### func (\*Client) [Get](https://github.com/hashicorp/go-getter/blob/v1.7.8/client.go#L107) [¶](#Client.Get "Go to Client.Get")

```
func (c *Client) Get() error
```

Get downloads the configured source to the destination.

#### type [ClientMode](https://github.com/hashicorp/go-getter/blob/v1.7.8/client_mode.go#L7) [¶](#ClientMode "Go to ClientMode")

```
type ClientMode uint
```

ClientMode is the mode that the client operates in.

```
const (
	ClientModeInvalid ClientMode = iota

	// ClientModeAny downloads anything it can. In this mode, dst must
	// be a directory. If src is a file, it is saved into the directory
	// with the basename of the URL. If src is a directory or archive,
	// it is unpacked directly into dst.
	ClientModeAny

	// ClientModeFile downloads a single file. In this mode, dst must
	// be a file path (doesn't have to exist). src must point to a single
	// file. It is saved as dst.
	ClientModeFile

	// ClientModeDir downloads a directory. In this mode, dst must be
	// a directory path (doesn't have to exist). src must point to an
	// archive or directory (such as in s3).
	ClientModeDir
)
```

#### type [ClientOption](https://github.com/hashicorp/go-getter/blob/v1.7.8/client_option.go#L12) [¶](#ClientOption "Go to ClientOption")

```
type ClientOption func(*Client) error
```

ClientOption is used to configure a client.

#### func [WithContext](https://github.com/hashicorp/go-getter/blob/v1.7.8/client_option.go#L57) [¶](#WithContext "Go to WithContext")

```
func WithContext(ctx context.Context) ClientOption
```

WithContext allows to pass a context to operation in order to be able to cancel a download in progress.

#### func [WithDecompressors](https://github.com/hashicorp/go-getter/blob/v1.7.8/client_option.go#L65) [¶](#WithDecompressors "Go to WithDecompressors") added in v1.6.0

```
func WithDecompressors(decompressors map[string]Decompressor) ClientOption
```

WithDecompressors specifies which Decompressor are available.

#### func [WithDetectors](https://github.com/hashicorp/go-getter/blob/v1.7.8/client_option.go#L73) [¶](#WithDetectors "Go to WithDetectors") added in v1.6.0

```
func WithDetectors(detectors []Detector) ClientOption
```

WithDecompressors specifies which compressors are available.

#### func [WithGetters](https://github.com/hashicorp/go-getter/blob/v1.7.8/client_option.go#L81) [¶](#WithGetters "Go to WithGetters") added in v1.6.0

```
func WithGetters(getters map[string]Getter) ClientOption
```

WithGetters specifies which getters are available.

#### func [WithMode](https://github.com/hashicorp/go-getter/blob/v1.7.8/client_option.go#L89) [¶](#WithMode "Go to WithMode") added in v1.6.0

```
func WithMode(mode ClientMode) ClientOption
```

WithMode specifies which client mode the getters should operate in.

#### func [WithUmask](https://github.com/hashicorp/go-getter/blob/v1.7.8/client_option.go#L98) [¶](#WithUmask "Go to WithUmask") added in v1.6.0

```
func WithUmask(mode os.FileMode) ClientOption
```

WithUmask specifies how to mask file permissions when storing local files or decompressing an archive.

#### type [Decompressor](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress.go#L17) [¶](#Decompressor "Go to Decompressor")

```
type Decompressor interface {
	// Decompress should decompress src to dst. dir specifies whether dst
	// is a directory or single file. src is guaranteed to be a single file
	// that exists. dst is not guaranteed to exist already.
	Decompress(dst, src string, dir bool, umask os.FileMode) error
}
```

Decompressor defines the interface that must be implemented to add support for decompressing a type.

Important: if you're implementing a decompressor, please use the containsDotDot helper in this file to ensure that files can't be decompressed outside of the specified directory.

#### type [Detector](https://github.com/hashicorp/go-getter/blob/v1.7.8/detect.go#L16) [¶](#Detector "Go to Detector")

```
type Detector interface {
	// Detect will detect whether the string matches a known pattern to
	// turn it into a proper URL.
	Detect(string, string) (string, bool, error)
}
```

Detector defines the interface that an invalid URL or a URL with a blank scheme is passed through in order to determine if its shorthand for something else well-known.

#### type [FileChecksum](https://github.com/hashicorp/go-getter/blob/v1.7.8/checksum.go#L26) [¶](#FileChecksum "Go to FileChecksum") added in v1.4.0

```
type FileChecksum struct {
	Type     string
	Hash     hash.Hash
	Value    []byte
	Filename string
}
```

FileChecksum helps verifying the checksum for a file.

#### type [FileDetector](https://github.com/hashicorp/go-getter/blob/v1.7.8/detect_file.go#L14) [¶](#FileDetector "Go to FileDetector")

```
type FileDetector struct{}
```

FileDetector implements Detector to detect file paths.

#### func (\*FileDetector) [Detect](https://github.com/hashicorp/go-getter/blob/v1.7.8/detect_file.go#L16) [¶](#FileDetector.Detect "Go to FileDetector.Detect")

```
func (d *FileDetector) Detect(src, pwd string) (string, bool, error)
```

#### type [FileGetter](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_file.go#L13) [¶](#FileGetter "Go to FileGetter")

```
type FileGetter struct {

	// Copy, if set to true, will copy data instead of using a symlink. If
	// false, attempts to symlink to speed up the operation and to lower the
	// disk space usage. If the symlink fails, may attempt to copy on windows.
	Copy bool
	// contains filtered or unexported fields
}
```

FileGetter is a Getter implementation that will download a module from a file scheme.

#### func (\*FileGetter) [ClientMode](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_file.go#L22) [¶](#FileGetter.ClientMode "Go to FileGetter.ClientMode")

```
func (g *FileGetter) ClientMode(u *url.URL) (ClientMode, error)
```

#### func (\*FileGetter) [Context](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_base.go#L18) [¶](#FileGetter.Context "Go to FileGetter.Context")

```
func (g *FileGetter) Context() context.Context
```

Context tries to returns the Contex from the getter's client. otherwise context.Background() is returned.

#### func (\*FileGetter) [Get](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_file_unix.go#L15) [¶](#FileGetter.Get "Go to FileGetter.Get")

```
func (g *FileGetter) Get(dst string, u *url.URL) error
```

#### func (\*FileGetter) [GetFile](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_file_unix.go#L54) [¶](#FileGetter.GetFile "Go to FileGetter.GetFile")

```
func (g *FileGetter) GetFile(dst string, u *url.URL) error
```

#### func (\*FileGetter) [SetClient](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_base.go#L14) [¶](#FileGetter.SetClient "Go to FileGetter.SetClient")

```
func (g *FileGetter) SetClient(c *Client)
```

#### type [FolderStorage](https://github.com/hashicorp/go-getter/blob/v1.7.8/folder_storage.go#L16) [¶](#FolderStorage "Go to FolderStorage")

```
type FolderStorage struct {
	// StorageDir is the directory where the modules will be stored.
	StorageDir string
}
```

FolderStorage is an implementation of the Storage interface that manages modules on the disk.

#### func (\*FolderStorage) [Dir](https://github.com/hashicorp/go-getter/blob/v1.7.8/folder_storage.go#L22) [¶](#FolderStorage.Dir "Go to FolderStorage.Dir")

```
func (s *FolderStorage) Dir(key string) (d string, e bool, err error)
```

Dir implements Storage.Dir

#### func (\*FolderStorage) [Get](https://github.com/hashicorp/go-getter/blob/v1.7.8/folder_storage.go#L45) [¶](#FolderStorage.Get "Go to FolderStorage.Get")

```
func (s *FolderStorage) Get(key string, source string, update bool) error
```

Get implements Storage.Get

#### type [GCSDetector](https://github.com/hashicorp/go-getter/blob/v1.7.8/detect_gcs.go#L14) [¶](#GCSDetector "Go to GCSDetector") added in v1.2.0

```
type GCSDetector struct{}
```

GCSDetector implements Detector to detect GCS URLs and turn them into URLs that the GCSGetter can understand.

#### func (\*GCSDetector) [Detect](https://github.com/hashicorp/go-getter/blob/v1.7.8/detect_gcs.go#L16) [¶](#GCSDetector.Detect "Go to GCSDetector.Detect") added in v1.2.0

```
func (d *GCSDetector) Detect(src, _ string) (string, bool, error)
```

#### type [GCSGetter](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_gcs.go#L25) [¶](#GCSGetter "Go to GCSGetter") added in v1.2.0

```
type GCSGetter struct {

	// Timeout sets a deadline which all GCS operations should
	// complete within. Zero value means no timeout.
	Timeout time.Duration

	// FileSizeLimit limits the size of an single
	// decompressed file.
	//
	// The zero value means no limit.
	FileSizeLimit int64
	// contains filtered or unexported fields
}
```

GCSGetter is a Getter implementation that will download a module from a GCS bucket.

#### func (\*GCSGetter) [ClientMode](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_gcs.go#L39) [¶](#GCSGetter.ClientMode "Go to GCSGetter.ClientMode") added in v1.2.0

```
func (g *GCSGetter) ClientMode(u *url.URL) (ClientMode, error)
```

#### func (\*GCSGetter) [Context](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_base.go#L18) [¶](#GCSGetter.Context "Go to GCSGetter.Context") added in v1.2.0

```
func (g *GCSGetter) Context() context.Context
```

Context tries to returns the Contex from the getter's client. otherwise context.Background() is returned.

#### func (\*GCSGetter) [Get](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_gcs.go#L82) [¶](#GCSGetter.Get "Go to GCSGetter.Get") added in v1.2.0

```
func (g *GCSGetter) Get(dst string, u *url.URL) error
```

#### func (\*GCSGetter) [GetFile](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_gcs.go#L147) [¶](#GCSGetter.GetFile "Go to GCSGetter.GetFile") added in v1.2.0

```
func (g *GCSGetter) GetFile(dst string, u *url.URL) error
```

#### func (\*GCSGetter) [SetClient](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_base.go#L14) [¶](#GCSGetter.SetClient "Go to GCSGetter.SetClient") added in v1.2.0

```
func (g *GCSGetter) SetClient(c *Client)
```

#### type [Getter](https://github.com/hashicorp/go-getter/blob/v1.7.8/get.go#L30) [¶](#Getter "Go to Getter")

```
type Getter interface {
	// Get downloads the given URL into the given directory. This always
	// assumes that we're updating and gets the latest version that it can.
	//
	// The directory may already exist (if we're updating). If it is in a
	// format that isn't understood, an error should be returned. Get shouldn't
	// simply nuke the directory.
	Get(string, *url.URL) error

	// GetFile downloads the give URL into the given path. The URL must
	// reference a single file. If possible, the Getter should check if
	// the remote end contains the same file and no-op this operation.
	GetFile(string, *url.URL) error

	// ClientMode returns the mode based on the given URL. This is used to
	// allow clients to let the getters decide which mode to use.
	ClientMode(*url.URL) (ClientMode, error)

	// SetClient allows a getter to know it's client
	// in order to access client's Get functions or
	// progress tracking.
	SetClient(*Client)
}
```

Getter defines the interface that schemes must implement to download things.

#### type [GitDetector](https://github.com/hashicorp/go-getter/blob/v1.7.8/detect_git.go#L8) [¶](#GitDetector "Go to GitDetector")

```
type GitDetector struct{}
```

GitDetector implements Detector to detect Git SSH URLs such as git@host.com:dir1/dir2 and converts them to proper URLs.

#### func (\*GitDetector) [Detect](https://github.com/hashicorp/go-getter/blob/v1.7.8/detect_git.go#L10) [¶](#GitDetector.Detect "Go to GitDetector.Detect")

```
func (d *GitDetector) Detect(src, _ string) (string, bool, error)
```

#### type [GitGetter](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_git.go#L29) [¶](#GitGetter "Go to GitGetter")

```
type GitGetter struct {

	// Timeout sets a deadline which all git CLI operations should
	// complete within. Zero value means no timeout.
	Timeout time.Duration
	// contains filtered or unexported fields
}
```

GitGetter is a Getter implementation that will download a module from a git repository.

#### func (\*GitGetter) [ClientMode](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_git.go#L40) [¶](#GitGetter.ClientMode "Go to GitGetter.ClientMode")

```
func (g *GitGetter) ClientMode(_ *url.URL) (ClientMode, error)
```

#### func (\*GitGetter) [Context](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_base.go#L18) [¶](#GitGetter.Context "Go to GitGetter.Context")

```
func (g *GitGetter) Context() context.Context
```

Context tries to returns the Contex from the getter's client. otherwise context.Background() is returned.

#### func (\*GitGetter) [Get](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_git.go#L44) [¶](#GitGetter.Get "Go to GitGetter.Get")

```
func (g *GitGetter) Get(dst string, u *url.URL) error
```

#### func (\*GitGetter) [GetFile](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_git.go#L152) [¶](#GitGetter.GetFile "Go to GitGetter.GetFile")

```
func (g *GitGetter) GetFile(dst string, u *url.URL) error
```

GetFile for Git doesn't support updating at this time. It will download the file every time.

#### func (\*GitGetter) [SetClient](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_base.go#L14) [¶](#GitGetter.SetClient "Go to GitGetter.SetClient")

```
func (g *GitGetter) SetClient(c *Client)
```

#### type [GitHubDetector](https://github.com/hashicorp/go-getter/blob/v1.7.8/detect_github.go#L14) [¶](#GitHubDetector "Go to GitHubDetector")

```
type GitHubDetector struct{}
```

GitHubDetector implements Detector to detect GitHub URLs and turn them into URLs that the Git Getter can understand.

#### func (\*GitHubDetector) [Detect](https://github.com/hashicorp/go-getter/blob/v1.7.8/detect_github.go#L16) [¶](#GitHubDetector.Detect "Go to GitHubDetector.Detect")

```
func (d *GitHubDetector) Detect(src, _ string) (string, bool, error)
```

#### type [GitLabDetector](https://github.com/hashicorp/go-getter/blob/v1.7.8/detect_gitlab.go#L14) [¶](#GitLabDetector "Go to GitLabDetector") added in v1.4.2

```
type GitLabDetector struct{}
```

GitLabDetector implements Detector to detect GitLab URLs and turn them into URLs that the Git Getter can understand.

#### func (\*GitLabDetector) [Detect](https://github.com/hashicorp/go-getter/blob/v1.7.8/detect_gitlab.go#L16) [¶](#GitLabDetector.Detect "Go to GitLabDetector.Detect") added in v1.4.2

```
func (d *GitLabDetector) Detect(src, _ string) (string, bool, error)
```

#### type [GzipDecompressor](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_gzip.go#L15) [¶](#GzipDecompressor "Go to GzipDecompressor")

```
type GzipDecompressor struct {
	// FileSizeLimit limits the size of a decompressed file.
	//
	// The zero value means no limit.
	FileSizeLimit int64
}
```

GzipDecompressor is an implementation of Decompressor that can decompress gzip files.

#### func (\*GzipDecompressor) [Decompress](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_gzip.go#L22) [¶](#GzipDecompressor.Decompress "Go to GzipDecompressor.Decompress")

```
func (d *GzipDecompressor) Decompress(dst, src string, dir bool, umask os.FileMode) error
```

#### type [HgGetter](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_hg.go#L22) [¶](#HgGetter "Go to HgGetter")

```
type HgGetter struct {

	// Timeout sets a deadline which all hg CLI operations should
	// complete within. Zero value means no timeout.
	Timeout time.Duration
	// contains filtered or unexported fields
}
```

HgGetter is a Getter implementation that will download a module from a Mercurial repository.

#### func (\*HgGetter) [ClientMode](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_hg.go#L30) [¶](#HgGetter.ClientMode "Go to HgGetter.ClientMode")

```
func (g *HgGetter) ClientMode(_ *url.URL) (ClientMode, error)
```

#### func (\*HgGetter) [Context](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_base.go#L18) [¶](#HgGetter.Context "Go to HgGetter.Context")

```
func (g *HgGetter) Context() context.Context
```

Context tries to returns the Contex from the getter's client. otherwise context.Background() is returned.

#### func (\*HgGetter) [Get](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_hg.go#L34) [¶](#HgGetter.Get "Go to HgGetter.Get")

```
func (g *HgGetter) Get(dst string, u *url.URL) error
```

#### func (\*HgGetter) [GetFile](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_hg.go#L85) [¶](#HgGetter.GetFile "Go to HgGetter.GetFile")

```
func (g *HgGetter) GetFile(dst string, u *url.URL) error
```

GetFile for Hg doesn't support updating at this time. It will download the file every time.

#### func (\*HgGetter) [SetClient](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_base.go#L14) [¶](#HgGetter.SetClient "Go to HgGetter.SetClient")

```
func (g *HgGetter) SetClient(c *Client)
```

#### type [HttpGetter](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_http.go#L46) [¶](#HttpGetter "Go to HttpGetter")

```
type HttpGetter struct {

	// Netrc, if true, will lookup and use auth information found
	// in the user's netrc file if available.
	Netrc bool

	// Client is the http.Client to use for Get requests.
	// This defaults to a cleanhttp.DefaultClient if left unset.
	Client *http.Client

	// Header contains optional request header fields that should be included
	// with every HTTP request. Note that the zero value of this field is nil,
	// and as such it needs to be initialized before use, via something like
	// make(http.Header).
	Header http.Header

	// DoNotCheckHeadFirst configures the client to NOT check if the server
	// supports HEAD requests.
	DoNotCheckHeadFirst bool

	// HeadFirstTimeout configures the client to enforce a timeout when
	// the server supports HEAD requests.
	//
	// The zero value means no timeout.
	HeadFirstTimeout time.Duration

	// ReadTimeout configures the client to enforce a timeout when
	// making a request to an HTTP server and reading its response body.
	//
	// The zero value means no timeout.
	ReadTimeout time.Duration

	// MaxBytes limits the number of bytes that will be ready from an HTTP
	// response body returned from a server. The zero value means no limit.
	MaxBytes int64

	// XTerraformGetLimit configures how many times the client with follow
	// the " X-Terraform-Get" header value.
	//
	// The zero value means no limit.
	XTerraformGetLimit int

	// XTerraformGetDisabled disables the client's usage of the "X-Terraform-Get"
	// header value.
	XTerraformGetDisabled bool
	// contains filtered or unexported fields
}
```

HttpGetter is a Getter implementation that will download from an HTTP endpoint.

For file downloads, HTTP is used directly.

The protocol for downloading a directory from an HTTP endpoint is as follows:

An HTTP GET request is made to the URL with the additional GET parameter "terraform-get=1". This lets you handle that scenario specially if you wish. The response must be a 2xx.

First, a header is looked for "X-Terraform-Get" which should contain a source URL to download. This source must use one of the configured protocols and getters for the client, or "http"/"https" if using the HttpGetter directly.

If the header is not present, then a meta tag is searched for named "terraform-get" and the content should be a source URL.

The source URL, whether from the header or meta tag, must be a fully formed URL. The shorthand syntax of "github.com/foo/bar" or relative paths are not allowed.

#### func (\*HttpGetter) [ClientMode](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_http.go#L94) [¶](#HttpGetter.ClientMode "Go to HttpGetter.ClientMode")

```
func (g *HttpGetter) ClientMode(u *url.URL) (ClientMode, error)
```

#### func (\*HttpGetter) [Context](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_base.go#L18) [¶](#HttpGetter.Context "Go to HttpGetter.Context")

```
func (g *HttpGetter) Context() context.Context
```

Context tries to returns the Contex from the getter's client. otherwise context.Background() is returned.

#### func (\*HttpGetter) [Get](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_http.go#L171) [¶](#HttpGetter.Get "Go to HttpGetter.Get")

```
func (g *HttpGetter) Get(dst string, u *url.URL) error
```

#### func (\*HttpGetter) [GetFile](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_http.go#L381) [¶](#HttpGetter.GetFile "Go to HttpGetter.GetFile")

```
func (g *HttpGetter) GetFile(dst string, src *url.URL) error
```

GetFile fetches the file from src and stores it at dst. If the server supports Accept-Range, HttpGetter will attempt a range request. This means it is the caller's responsibility to ensure that an older version of the destination file does not exist, else it will be either falsely identified as being replaced, or corrupted with extra bytes appended.

#### func (\*HttpGetter) [SetClient](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_base.go#L14) [¶](#HttpGetter.SetClient "Go to HttpGetter.SetClient")

```
func (g *HttpGetter) SetClient(c *Client)
```

#### type [MockGetter](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_mock.go#L11) [¶](#MockGetter "Go to MockGetter")

```
type MockGetter struct {

	// Proxy, if set, will be called after recording the calls below.
	// If it isn't set, then the *Err values will be returned.
	Proxy Getter

	GetCalled bool
	GetDst    string
	GetURL    *url.URL
	GetErr    error

	GetFileCalled bool
	GetFileDst    string
	GetFileURL    *url.URL
	GetFileErr    error
	// contains filtered or unexported fields
}
```

MockGetter is an implementation of Getter that can be used for tests.

#### func (\*MockGetter) [ClientMode](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_mock.go#L52) [¶](#MockGetter.ClientMode "Go to MockGetter.ClientMode")

```
func (g *MockGetter) ClientMode(u *url.URL) (ClientMode, error)
```

#### func (\*MockGetter) [Context](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_base.go#L18) [¶](#MockGetter.Context "Go to MockGetter.Context")

```
func (g *MockGetter) Context() context.Context
```

Context tries to returns the Contex from the getter's client. otherwise context.Background() is returned.

#### func (\*MockGetter) [Get](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_mock.go#L29) [¶](#MockGetter.Get "Go to MockGetter.Get")

```
func (g *MockGetter) Get(dst string, u *url.URL) error
```

#### func (\*MockGetter) [GetFile](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_mock.go#L41) [¶](#MockGetter.GetFile "Go to MockGetter.GetFile")

```
func (g *MockGetter) GetFile(dst string, u *url.URL) error
```

#### func (\*MockGetter) [SetClient](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_base.go#L14) [¶](#MockGetter.SetClient "Go to MockGetter.SetClient")

```
func (g *MockGetter) SetClient(c *Client)
```

#### type [ProgressTracker](https://github.com/hashicorp/go-getter/blob/v1.7.8/client_option_progress.go#L23) [¶](#ProgressTracker "Go to ProgressTracker")

```
type ProgressTracker interface {
	// TrackProgress should be called when
	// a new object is being downloaded.
	// src is the location the file is
	// downloaded from.
	// currentSize is the current size of
	// the file in case it is a partial
	// download.
	// totalSize is the total size in bytes,
	// size can be zero if the file size
	// is not known.
	// stream is the file being downloaded, every
	// written byte will add up to processed size.
	//
	// TrackProgress returns a ReadCloser that wraps the
	// download in progress ( stream ).
	// When the download is finished, body shall be closed.
	TrackProgress(src string, currentSize, totalSize int64, stream io.ReadCloser) (body io.ReadCloser)
}
```

ProgressTracker allows to track the progress of downloads.

#### type [S3Detector](https://github.com/hashicorp/go-getter/blob/v1.7.8/detect_s3.go#L14) [¶](#S3Detector "Go to S3Detector")

```
type S3Detector struct{}
```

S3Detector implements Detector to detect S3 URLs and turn them into URLs that the S3 getter can understand.

#### func (\*S3Detector) [Detect](https://github.com/hashicorp/go-getter/blob/v1.7.8/detect_s3.go#L16) [¶](#S3Detector.Detect "Go to S3Detector.Detect")

```
func (d *S3Detector) Detect(src, _ string) (string, bool, error)
```

#### type [S3Getter](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_s3.go#L25) [¶](#S3Getter "Go to S3Getter")

```
type S3Getter struct {

	// Timeout sets a deadline which all S3 operations should
	// complete within.
	//
	// The zero value means timeout.
	Timeout time.Duration
	// contains filtered or unexported fields
}
```

S3Getter is a Getter implementation that will download a module from a S3 bucket.

#### func (\*S3Getter) [ClientMode](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_s3.go#L35) [¶](#S3Getter.ClientMode "Go to S3Getter.ClientMode")

```
func (g *S3Getter) ClientMode(u *url.URL) (ClientMode, error)
```

#### func (\*S3Getter) [Context](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_base.go#L18) [¶](#S3Getter.Context "Go to S3Getter.Context")

```
func (g *S3Getter) Context() context.Context
```

Context tries to returns the Contex from the getter's client. otherwise context.Background() is returned.

#### func (\*S3Getter) [Get](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_s3.go#L83) [¶](#S3Getter.Get "Go to S3Getter.Get")

```
func (g *S3Getter) Get(dst string, u *url.URL) error
```

#### func (\*S3Getter) [GetFile](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_s3.go#L166) [¶](#S3Getter.GetFile "Go to S3Getter.GetFile")

```
func (g *S3Getter) GetFile(dst string, u *url.URL) error
```

#### func (\*S3Getter) [SetClient](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_base.go#L14) [¶](#S3Getter.SetClient "Go to S3Getter.SetClient")

```
func (g *S3Getter) SetClient(c *Client)
```

#### type [Storage](https://github.com/hashicorp/go-getter/blob/v1.7.8/storage.go#L9) [¶](#Storage "Go to Storage")

```
type Storage interface {
	// Dir returns the directory on local disk where the directory source
	// can be loaded from.
	Dir(string) (string, bool, error)

	// Get will download and optionally update the given directory.
	Get(string, string, bool) error
}
```

Storage is an interface that knows how to lookup downloaded directories as well as download and update directories from their sources into the proper location.

#### type [TarBzip2Decompressor](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_tbz2.go#L14) [¶](#TarBzip2Decompressor "Go to TarBzip2Decompressor")

```
type TarBzip2Decompressor struct {
	// FileSizeLimit limits the total size of all
	// decompressed files.
	//
	// The zero value means no limit.
	FileSizeLimit int64

	// FilesLimit limits the number of files that are
	// allowed to be decompressed.
	//
	// The zero value means no limit.
	FilesLimit int
}
```

TarBzip2Decompressor is an implementation of Decompressor that can decompress tar.bz2 files.

#### func (\*TarBzip2Decompressor) [Decompress](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_tbz2.go#L28) [¶](#TarBzip2Decompressor.Decompress "Go to TarBzip2Decompressor.Decompress")

```
func (d *TarBzip2Decompressor) Decompress(dst, src string, dir bool, umask os.FileMode) error
```

#### type [TarDecompressor](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_tar.go#L154) [¶](#TarDecompressor "Go to TarDecompressor") added in v1.5.5

```
type TarDecompressor struct {
	// FileSizeLimit limits the total size of all
	// decompressed files.
	//
	// The zero value means no limit.
	FileSizeLimit int64

	// FilesLimit limits the number of files that are
	// allowed to be decompressed.
	//
	// The zero value means no limit.
	FilesLimit int
}
```

TarDecompressor is an implementation of Decompressor that can unpack tar files.

#### func (\*TarDecompressor) [Decompress](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_tar.go#L168) [¶](#TarDecompressor.Decompress "Go to TarDecompressor.Decompress") added in v1.5.5

```
func (d *TarDecompressor) Decompress(dst, src string, dir bool, umask os.FileMode) error
```

#### type [TarGzipDecompressor](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_tgz.go#L15) [¶](#TarGzipDecompressor "Go to TarGzipDecompressor")

```
type TarGzipDecompressor struct {
	// FileSizeLimit limits the total size of all
	// decompressed files.
	//
	// The zero value means no limit.
	FileSizeLimit int64

	// FilesLimit limits the number of files that are
	// allowed to be decompressed.
	//
	// The zero value means no limit.
	FilesLimit int
}
```

TarGzipDecompressor is an implementation of Decompressor that can decompress tar.gzip files.

#### func (\*TarGzipDecompressor) [Decompress](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_tgz.go#L29) [¶](#TarGzipDecompressor.Decompress "Go to TarGzipDecompressor.Decompress")

```
func (d *TarGzipDecompressor) Decompress(dst, src string, dir bool, umask os.FileMode) error
```

#### type [TarXzDecompressor](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_txz.go#L16) [¶](#TarXzDecompressor "Go to TarXzDecompressor")

```
type TarXzDecompressor struct {
	// FileSizeLimit limits the total size of all
	// decompressed files.
	//
	// The zero value means no limit.
	FileSizeLimit int64

	// FilesLimit limits the number of files that are
	// allowed to be decompressed.
	//
	// The zero value means no limit.
	FilesLimit int
}
```

TarXzDecompressor is an implementation of Decompressor that can decompress tar.xz files.

#### func (\*TarXzDecompressor) [Decompress](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_txz.go#L30) [¶](#TarXzDecompressor.Decompress "Go to TarXzDecompressor.Decompress")

```
func (d *TarXzDecompressor) Decompress(dst, src string, dir bool, umask os.FileMode) error
```

#### type [TarZstdDecompressor](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_tzst.go#L16) [¶](#TarZstdDecompressor "Go to TarZstdDecompressor") added in v1.5.2

```
type TarZstdDecompressor struct {
	// FileSizeLimit limits the total size of all
	// decompressed files.
	//
	// The zero value means no limit.
	FileSizeLimit int64

	// FilesLimit limits the number of files that are
	// allowed to be decompressed.
	//
	// The zero value means no limit.
	FilesLimit int
}
```

TarZstdDecompressor is an implementation of Decompressor that can decompress tar.zstd files.

#### func (\*TarZstdDecompressor) [Decompress](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_tzst.go#L30) [¶](#TarZstdDecompressor.Decompress "Go to TarZstdDecompressor.Decompress") added in v1.5.2

```
func (d *TarZstdDecompressor) Decompress(dst, src string, dir bool, umask os.FileMode) error
```

#### type [TestDecompressCase](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_testing.go#L23) [¶](#TestDecompressCase "Go to TestDecompressCase")

```
type TestDecompressCase struct {
	Input   string     // Input is the complete path to the input file
	Dir     bool       // Dir is whether or not we're testing directory mode
	Err     bool       // Err is whether we expect an error or not
	DirList []string   // DirList is the list of files for Dir mode
	FileMD5 string     // FileMD5 is the expected MD5 for a single file
	Mtime   *time.Time // Mtime is the optionally expected mtime for a single file (or all files if in Dir mode)
}
```

TestDecompressCase is a single test case for testing decompressors

#### type [XzDecompressor](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_xz.go#L16) [¶](#XzDecompressor "Go to XzDecompressor")

```
type XzDecompressor struct {
	// FileSizeLimit limits the size of a decompressed file.
	//
	// The zero value means no limit.
	FileSizeLimit int64
}
```

XzDecompressor is an implementation of Decompressor that can decompress xz files.

#### func (\*XzDecompressor) [Decompress](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_xz.go#L23) [¶](#XzDecompressor.Decompress "Go to XzDecompressor.Decompress")

```
func (d *XzDecompressor) Decompress(dst, src string, dir bool, umask os.FileMode) error
```

#### type [ZipDecompressor](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_zip.go#L15) [¶](#ZipDecompressor "Go to ZipDecompressor")

```
type ZipDecompressor struct {
	// FileSizeLimit limits the total size of all
	// decompressed files.
	//
	// The zero value means no limit.
	FileSizeLimit int64

	// FilesLimit limits the number of files that are
	// allowed to be decompressed.
	//
	// The zero value means no limit.
	FilesLimit int
}
```

ZipDecompressor is an implementation of Decompressor that can decompress zip files.

#### func (\*ZipDecompressor) [Decompress](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_zip.go#L29) [¶](#ZipDecompressor.Decompress "Go to ZipDecompressor.Decompress")

```
func (d *ZipDecompressor) Decompress(dst, src string, dir bool, umask os.FileMode) error
```

#### type [ZstdDecompressor](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_zstd.go#L16) [¶](#ZstdDecompressor "Go to ZstdDecompressor") added in v1.5.2

```
type ZstdDecompressor struct {
	// FileSizeLimit limits the size of a decompressed file.
	//
	// The zero value means no limit.
	FileSizeLimit int64
}
```

ZstdDecompressor is an implementation of Decompressor that can decompress .zst files.

#### func (\*ZstdDecompressor) [Decompress](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_zstd.go#L23) [¶](#ZstdDecompressor.Decompress "Go to ZstdDecompressor.Decompress") added in v1.5.2

```
func (d *ZstdDecompressor) Decompress(dst, src string, dir bool, umask os.FileMode) error
```

## ![](/static/shared/icon/insert_drive_file_gm_grey_24dp.svg) Source Files [¶](#section-sourcefiles "Go to Source Files")

[View all Source files](https://github.com/hashicorp/go-getter/tree/v1.7.8)

- [checksum.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/checksum.go "checksum.go")
- [client.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/client.go "client.go")
- [client\_mode.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/client_mode.go "client_mode.go")
- [client\_option.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/client_option.go "client_option.go")
- [client\_option\_insecure.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/client_option_insecure.go "client_option_insecure.go")
- [client\_option\_progress.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/client_option_progress.go "client_option_progress.go")
- [common.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/common.go "common.go")
- [copy\_dir.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/copy_dir.go "copy_dir.go")
- [decompress.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress.go "decompress.go")
- [decompress\_bzip2.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_bzip2.go "decompress_bzip2.go")
- [decompress\_gzip.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_gzip.go "decompress_gzip.go")
- [decompress\_tar.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_tar.go "decompress_tar.go")
- [decompress\_tbz2.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_tbz2.go "decompress_tbz2.go")
- [decompress\_testing.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_testing.go "decompress_testing.go")
- [decompress\_tgz.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_tgz.go "decompress_tgz.go")
- [decompress\_txz.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_txz.go "decompress_txz.go")
- [decompress\_tzst.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_tzst.go "decompress_tzst.go")
- [decompress\_xz.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_xz.go "decompress_xz.go")
- [decompress\_zip.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_zip.go "decompress_zip.go")
- [decompress\_zstd.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/decompress_zstd.go "decompress_zstd.go")
- [detect.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/detect.go "detect.go")
- [detect\_bitbucket.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/detect_bitbucket.go "detect_bitbucket.go")
- [detect\_file.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/detect_file.go "detect_file.go")
- [detect\_gcs.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/detect_gcs.go "detect_gcs.go")
- [detect\_git.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/detect_git.go "detect_git.go")
- [detect\_github.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/detect_github.go "detect_github.go")
- [detect\_gitlab.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/detect_gitlab.go "detect_gitlab.go")
- [detect\_s3.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/detect_s3.go "detect_s3.go")
- [detect\_ssh.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/detect_ssh.go "detect_ssh.go")
- [folder\_storage.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/folder_storage.go "folder_storage.go")
- [get.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/get.go "get.go")
- [get\_base.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_base.go "get_base.go")
- [get\_file.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_file.go "get_file.go")
- [get\_file\_copy.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_file_copy.go "get_file_copy.go")
- [get\_file\_unix.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_file_unix.go "get_file_unix.go")
- [get\_gcs.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_gcs.go "get_gcs.go")
- [get\_git.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_git.go "get_git.go")
- [get\_hg.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_hg.go "get_hg.go")
- [get\_http.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_http.go "get_http.go")
- [get\_mock.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_mock.go "get_mock.go")
- [get\_s3.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/get_s3.go "get_s3.go")
- [netrc.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/netrc.go "netrc.go")
- [source.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/source.go "source.go")
- [storage.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/storage.go "storage.go")
- [url.go](https://github.com/hashicorp/go-getter/blob/v1.7.8/url.go "url.go")

## ![](/static/shared/icon/folder_gm_grey_24dp.svg) Directories [¶](#section-directories "Go to Directories")

Show internal Expand all

| Path                                                              | Synopsis |
|-------------------------------------------------------------------|----------|
| ![](/static/shared/icon/arrow_right_gm_grey_24dp.svg) cmd         |          |
| [go-getter](/github.com/hashicorp/go-getter@v1.7.8/cmd/go-getter) |          |
| [gcs](/github.com/hashicorp/go-getter/gcs/v2) module              |          |
| ![](/static/shared/icon/arrow_right_gm_grey_24dp.svg) helper      |          |
| [url](/github.com/hashicorp/go-getter@v1.7.8/helper/url)          |          |
| [s3](/github.com/hashicorp/go-getter/s3/v2) module                |          |

Click to show internal directories.

Click to hide internal directories.

[Why Go](https://go.dev/solutions) [Use Cases](https://go.dev/solutions#use-cases) [Case Studies](https://go.dev/solutions#case-studies)

[Get Started](https://learn.go.dev/) [Playground](https://play.golang.org) [Tour](https://tour.golang.org) [Stack Overflow](https://stackoverflow.com/questions/tagged/go?tab=Newest) [Help](https://go.dev/help)

[Packages](https://pkg.go.dev) [Standard Library](/std) [Sub-repositories](/golang.org/x) [About Go Packages](https://pkg.go.dev/about)

[About](https://go.dev/project) [Download](https://go.dev/dl/) [Blog](https://go.dev/blog) [Issue Tracker](https://github.com/golang/go/issues) [Release Notes](https://go.dev/doc/devel/release.html) [Brand Guidelines](https://blog.golang.org/go-brand) [Code of Conduct](https://go.dev/conduct)

[Connect](https://www.twitter.com/golang) [Twitter](https://www.twitter.com/golang) [GitHub](https://github.com/golang) [Slack](https://invite.slack.golangbridge.org/) [r/golang](https://reddit.com/r/golang) [Meetup](https://www.meetup.com/pro/go) [Golang Weekly](https://golangweekly.com/)

![Gopher in flight goggles](/static/shared/gopher/pilot-bust-1431x901.svg)

- [Copyright](https://go.dev/copyright)
- [Terms of Service](https://go.dev/tos)
- [Privacy Policy](http://www.google.com/intl/en/policies/privacy/)
- [Report an Issue](https://go.dev/s/pkgsite-feedback)
- ![System theme](/static/shared/icon/brightness_6_gm_grey_24dp.svg) ![Dark theme](/static/shared/icon/brightness_2_gm_grey_24dp.svg) ![Light theme](/static/shared/icon/light_mode_gm_grey_24dp.svg)

  Theme Toggle
- ![](/static/shared/icon/keyboard_grey_24dp.svg)

  Shortcuts Modal

[![Google logo](/static/shared/logo/google-white.svg)](https://google.com)

## Jump to

![](/static/shared/icon/close_gm_grey_24dp.svg)

Close

## Keyboard shortcuts

![](/static/shared/icon/close_gm_grey_24dp.svg)

| **?**          | : This menu     |
|----------------|-----------------|
| **/**          | : Search site   |
| **f** or **F** | : Jump to       |
| **y** or **Y** | : Canonical URL |

Close

go.dev uses cookies from Google to deliver and enhance the quality of its services and to analyze traffic. [Learn more.](https://policies.google.com/technologies/cookies)

Okay
