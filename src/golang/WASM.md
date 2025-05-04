<details><summary><i>  Go WASM | Powered by Rust </i></summary>

- [Documentation](#section-documentation)

  - [Overview](#pkg-overview)
  - [Index](#pkg-index)
  - [Constants](#pkg-constants)
  - [Variables](#pkg-variables)
  - [Functions](#pkg-functions)

    - [IsCompilerAvailable(compiler)](#IsCompilerAvailable "IsCompilerAvailable(compiler)")
    - [IsEngineAvailable(engine)](#IsEngineAvailable "IsEngineAvailable(engine)")
    - [LimitMaxUnbound()](#LimitMaxUnbound "LimitMaxUnbound()")
    - [ValidateModule(store, bytes)](#ValidateModule "ValidateModule(store, bytes)")
    - [Wat2Wasm(wat)](#Wat2Wasm "Wat2Wasm(wat)")
  - [Types](#pkg-types)

    - [type CompilerKind](#CompilerKind "type CompilerKind")

      - [(self) String()](#CompilerKind.String "(self) String()")
    - [type Config](#Config "type Config")

      - [NewConfig()](#NewConfig "NewConfig()")
      - [(self) UseCraneliftCompiler()](#Config.UseCraneliftCompiler "(self) UseCraneliftCompiler()")
      - [(self) UseDylibEngine()](#Config.UseDylibEngine "(self) UseDylibEngine()")
      - [(self) UseJITEngine()](#Config.UseJITEngine "(self) UseJITEngine()")
      - [(self) UseLLVMCompiler()](#Config.UseLLVMCompiler "(self) UseLLVMCompiler()")
      - [(self) UseNativeEngine()](#Config.UseNativeEngine "(self) UseNativeEngine()")
      - [(self) UseSinglepassCompiler()](#Config.UseSinglepassCompiler "(self) UseSinglepassCompiler()")
      - [(self) UseTarget(target)](#Config.UseTarget "(self) UseTarget(target)")
      - [(self) UseUniversalEngine()](#Config.UseUniversalEngine "(self) UseUniversalEngine()")
    - [type CpuFeatures](#CpuFeatures "type CpuFeatures")

      - [NewCpuFeatures()](#NewCpuFeatures "NewCpuFeatures()")
      - [(self) Add(feature)](#CpuFeatures.Add "(self) Add(feature)")
    - [type Engine](#Engine "type Engine")

      - [NewDylibEngine()](#NewDylibEngine "NewDylibEngine()")
      - [NewEngine()](#NewEngine "NewEngine()")
      - [NewEngineWithConfig(config)](#NewEngineWithConfig "NewEngineWithConfig(config)")
      - [NewJITEngine()](#NewJITEngine "NewJITEngine()")
      - [NewNativeEngine()](#NewNativeEngine "NewNativeEngine()")
      - [NewUniversalEngine()](#NewUniversalEngine "NewUniversalEngine()")
    - [type EngineKind](#EngineKind "type EngineKind")

      - [(self) String()](#EngineKind.String "(self) String()")
    - [type Error](#Error "type Error")

      - [(error) Error()](#Error.Error "(error) Error()")
    - [type ExportType](#ExportType "type ExportType")

      - [NewExportType(name, ty)](#NewExportType "NewExportType(name, ty)")
      - [(self) Close()](#ExportType.Close "(self) Close()")
      - [(self) Name()](#ExportType.Name "(self) Name()")
      - [(self) Type()](#ExportType.Type "(self) Type()")
    - [type Exports](#Exports "type Exports")

      - [(self) Close()](#Exports.Close "(self) Close()")
      - [(self) Get(name)](#Exports.Get "(self) Get(name)")
      - [(self) GetFunction(name)](#Exports.GetFunction "(self) GetFunction(name)")
      - [(self) GetGlobal(name)](#Exports.GetGlobal "(self) GetGlobal(name)")
      - [(self) GetMemory(name)](#Exports.GetMemory "(self) GetMemory(name)")
      - [(self) GetRawFunction(name)](#Exports.GetRawFunction "(self) GetRawFunction(name)")
      - [(self) GetTable(name)](#Exports.GetTable "(self) GetTable(name)")
      - [(self) GetWasiStartFunction()](#Exports.GetWasiStartFunction "(self) GetWasiStartFunction()")
    - [type Extern](#Extern "type Extern")

      - [(self) IntoExtern()](#Extern.IntoExtern "(self) IntoExtern()")
      - [(self) IntoFunction()](#Extern.IntoFunction "(self) IntoFunction()")
      - [(self) IntoGlobal()](#Extern.IntoGlobal "(self) IntoGlobal()")
      - [(self) IntoMemory()](#Extern.IntoMemory "(self) IntoMemory()")
      - [(self) IntoTable()](#Extern.IntoTable "(self) IntoTable()")
      - [(self) Kind()](#Extern.Kind "(self) Kind()")
      - [(self) Type()](#Extern.Type "(self) Type()")
    - [type ExternKind](#ExternKind "type ExternKind")

      - [(self) String()](#ExternKind.String "(self) String()")
    - [type ExternType](#ExternType "type ExternType")

      - [(self) IntoFunctionType()](#ExternType.IntoFunctionType "(self) IntoFunctionType()")
      - [(self) IntoGlobalType()](#ExternType.IntoGlobalType "(self) IntoGlobalType()")
      - [(self) IntoMemoryType()](#ExternType.IntoMemoryType "(self) IntoMemoryType()")
      - [(self) IntoTableType()](#ExternType.IntoTableType "(self) IntoTableType()")
      - [(self) Kind()](#ExternType.Kind "(self) Kind()")
    - [type Frame](#Frame "type Frame")

      - [(self) FunctionIndex()](#Frame.FunctionIndex "(self) FunctionIndex()")
      - [(self) FunctionOffset()](#Frame.FunctionOffset "(self) FunctionOffset()")
      - [(self) Instance()](#Frame.Instance "(self) Instance()")
      - [(self) ModuleOffset()](#Frame.ModuleOffset "(self) ModuleOffset()")
    - [type Function](#Function "type Function")

      - [NewFunction(store, ty, function)](#NewFunction "NewFunction(store, ty, function)")
      - [NewFunctionWithEnvironment(store, ty, userEnvironment, functionWithEnv)](#NewFunctionWithEnvironment "NewFunctionWithEnvironment(store, ty, userEnvironment, functionWithEnv)")
      - [(self) Call(parameters)](#Function.Call "(self) Call(parameters)")
      - [(self) IntoExtern()](#Function.IntoExtern "(self) IntoExtern()")
      - [(self) Native()](#Function.Native "(self) Native()")
      - [(self) ParameterArity()](#Function.ParameterArity "(self) ParameterArity()")
      - [(self) ResultArity()](#Function.ResultArity "(self) ResultArity()")
      - [(self) Type()](#Function.Type "(self) Type()")
    - [type FunctionType](#FunctionType "type FunctionType")

      - [NewFunctionType(params, results)](#NewFunctionType "NewFunctionType(params, results)")
      - [(self) IntoExternType()](#FunctionType.IntoExternType "(self) IntoExternType()")
      - [(self) Params()](#FunctionType.Params "(self) Params()")
      - [(self) Results()](#FunctionType.Results "(self) Results()")
    - [type Global](#Global "type Global")

      - [NewGlobal(store, ty, value)](#NewGlobal "NewGlobal(store, ty, value)")
      - [(self) Get()](#Global.Get "(self) Get()")
      - [(self) IntoExtern()](#Global.IntoExtern "(self) IntoExtern()")
      - [(self) Set(value, kind)](#Global.Set "(self) Set(value, kind)")
      - [(self) Type()](#Global.Type "(self) Type()")
    - [type GlobalMutability](#GlobalMutability "type GlobalMutability")

      - [(self) String()](#GlobalMutability.String "(self) String()")
    - [type GlobalType](#GlobalType "type GlobalType")

      - [NewGlobalType(valueType, mutability)](#NewGlobalType "NewGlobalType(valueType, mutability)")
      - [(self) IntoExternType()](#GlobalType.IntoExternType "(self) IntoExternType()")
      - [(self) Mutability()](#GlobalType.Mutability "(self) Mutability()")
      - [(self) ValueType()](#GlobalType.ValueType "(self) ValueType()")
    - [type ImportObject](#ImportObject "type ImportObject")

      - [NewImportObject()](#NewImportObject "NewImportObject()")
      - [(self) ContainsNamespace(name)](#ImportObject.ContainsNamespace "(self) ContainsNamespace(name)")
      - [(self) Register(namespaceName, namespace)](#ImportObject.Register "(self) Register(namespaceName, namespace)")
    - [type ImportType](#ImportType "type ImportType")

      - [NewImportType(module, name, ty)](#NewImportType "NewImportType(module, name, ty)")
      - [(self) Close()](#ImportType.Close "(self) Close()")
      - [(self) Module()](#ImportType.Module "(self) Module()")
      - [(self) Name()](#ImportType.Name "(self) Name()")
      - [(self) Type()](#ImportType.Type "(self) Type()")
    - [type Instance](#Instance "type Instance")

      - [NewInstance(module, imports)](#NewInstance "NewInstance(module, imports)")
      - [(self) Close()](#Instance.Close "(self) Close()")
    - [type IntoExtern](#IntoExtern "type IntoExtern")
    - [type IntoExternType](#IntoExternType "type IntoExternType")
    - [type Limits](#Limits "type Limits")

      - [NewLimits(minimum, maximum)](#NewLimits "NewLimits(minimum, maximum)")
      - [(self) Maximum()](#Limits.Maximum "(self) Maximum()")
      - [(self) Minimum()](#Limits.Minimum "(self) Minimum()")
    - [type Memory](#Memory "type Memory")

      - [NewMemory(store, ty)](#NewMemory "NewMemory(store, ty)")
      - [(self) Data()](#Memory.Data "(self) Data()")
      - [(self) DataSize()](#Memory.DataSize "(self) DataSize()")
      - [(self) Grow(delta)](#Memory.Grow "(self) Grow(delta)")
      - [(self) IntoExtern()](#Memory.IntoExtern "(self) IntoExtern()")
      - [(self) Size()](#Memory.Size "(self) Size()")
      - [(self) Type()](#Memory.Type "(self) Type()")
    - [type MemoryType](#MemoryType "type MemoryType")

      - [NewMemoryType(limits)](#NewMemoryType "NewMemoryType(limits)")
      - [(self) IntoExternType()](#MemoryType.IntoExternType "(self) IntoExternType()")
      - [(self) Limits()](#MemoryType.Limits "(self) Limits()")
    - [type Module](#Module "type Module")

      - [DeserializeModule(store, bytes)](#DeserializeModule "DeserializeModule(store, bytes)")
      - [NewModule(store, bytes)](#NewModule "NewModule(store, bytes)")
      - [(self) Close()](#Module.Close "(self) Close()")
      - [(self) Exports()](#Module.Exports "(self) Exports()")
      - [(self) Imports()](#Module.Imports "(self) Imports()")
      - [(self) Name()](#Module.Name "(self) Name()")
      - [(self) Serialize()](#Module.Serialize "(self) Serialize()")
    - [type NativeFunction](#NativeFunction "type NativeFunction")
    - [type Pages](#Pages "type Pages")

      - [(self) ToBytes()](#Pages.ToBytes "(self) ToBytes()")
      - [(self) ToUint32()](#Pages.ToUint32 "(self) ToUint32()")
    - [type Store](#Store "type Store")

      - [NewStore(engine)](#NewStore "NewStore(engine)")
      - [(self) Close()](#Store.Close "(self) Close()")
    - [type Table](#Table "type Table")

      - [(self) IntoExtern()](#Table.IntoExtern "(self) IntoExtern()")
      - [(self) Size()](#Table.Size "(self) Size()")
    - [type TableSize](#TableSize "type TableSize")

      - [(self) ToUint32()](#TableSize.ToUint32 "(self) ToUint32()")
    - [type TableType](#TableType "type TableType")

      - [NewTableType(valueType, limits)](#NewTableType "NewTableType(valueType, limits)")
      - [(self) IntoExternType()](#TableType.IntoExternType "(self) IntoExternType()")
      - [(self) Limits()](#TableType.Limits "(self) Limits()")
      - [(self) ValueType()](#TableType.ValueType "(self) ValueType()")
    - [type Target](#Target "type Target")

      - [NewTarget(triple, cpuFeatures)](#NewTarget "NewTarget(triple, cpuFeatures)")
    - [type Trace](#Trace "type Trace")
    - [type Trap](#Trap "type Trap")

      - [NewTrap(store, message)](#NewTrap "NewTrap(store, message)")
      - [(self) Message()](#Trap.Message "(self) Message()")
      - [(self) Origin()](#Trap.Origin "(self) Origin()")
      - [(self) Trace()](#Trap.Trace "(self) Trace()")
    - [type TrapError](#TrapError "type TrapError")

      - [(self) Error()](#TrapError.Error "(self) Error()")
      - [(self) Origin()](#TrapError.Origin "(self) Origin()")
      - [(self) Trace()](#TrapError.Trace "(self) Trace()")
    - [type Triple](#Triple "type Triple")

      - [NewTriple(triple)](#NewTriple "NewTriple(triple)")
      - [NewTripleFromHost()](#NewTripleFromHost "NewTripleFromHost()")
    - [type Value](#Value "type Value")

      - [NewF32(value)](#NewF32 "NewF32(value)")
      - [NewF64(value)](#NewF64 "NewF64(value)")
      - [NewI32(value)](#NewI32 "NewI32(value)")
      - [NewI64(value)](#NewI64 "NewI64(value)")
      - [NewValue(value, kind)](#NewValue "NewValue(value, kind)")
      - [(self) F32()](#Value.F32 "(self) F32()")
      - [(self) F64()](#Value.F64 "(self) F64()")
      - [(self) I32()](#Value.I32 "(self) I32()")
      - [(self) I64()](#Value.I64 "(self) I64()")
      - [(self) Kind()](#Value.Kind "(self) Kind()")
      - [(self) Unwrap()](#Value.Unwrap "(self) Unwrap()")
    - [type ValueKind](#ValueKind "type ValueKind")

      - [(self) IsNumber()](#ValueKind.IsNumber "(self) IsNumber()")
      - [(self) IsReference()](#ValueKind.IsReference "(self) IsReference()")
      - [(self) String()](#ValueKind.String "(self) String()")
    - [type ValueType](#ValueType "type ValueType")

      - [NewValueType(kind)](#NewValueType "NewValueType(kind)")
      - [NewValueTypes(kinds)](#NewValueTypes "NewValueTypes(kinds)")
      - [(self) Kind()](#ValueType.Kind "(self) Kind()")
    - [type WasiEnvironment](#WasiEnvironment "type WasiEnvironment")

      - [(self) GenerateImportObject(store, module)](#WasiEnvironment.GenerateImportObject "(self) GenerateImportObject(store, module)")
      - [(self) ReadStderr()](#WasiEnvironment.ReadStderr "(self) ReadStderr()")
      - [(self) ReadStdout()](#WasiEnvironment.ReadStdout "(self) ReadStdout()")
    - [type WasiStateBuilder](#WasiStateBuilder "type WasiStateBuilder")

      - [NewWasiStateBuilder(programName)](#NewWasiStateBuilder "NewWasiStateBuilder(programName)")
      - [(self) Argument(argument)](#WasiStateBuilder.Argument "(self) Argument(argument)")
      - [(self) CaptureStderr()](#WasiStateBuilder.CaptureStderr "(self) CaptureStderr()")
      - [(self) CaptureStdout()](#WasiStateBuilder.CaptureStdout "(self) CaptureStdout()")
      - [(self) Environment(key, value)](#WasiStateBuilder.Environment "(self) Environment(key, value)")
      - [(self) Finalize()](#WasiStateBuilder.Finalize "(self) Finalize()")
      - [(self) InheritStderr()](#WasiStateBuilder.InheritStderr "(self) InheritStderr()")
      - [(self) InheritStdin()](#WasiStateBuilder.InheritStdin "(self) InheritStdin()")
      - [(self) InheritStdout()](#WasiStateBuilder.InheritStdout "(self) InheritStdout()")
      - [(self) MapDirectory(alias, directory)](#WasiStateBuilder.MapDirectory "(self) MapDirectory(alias, directory)")
      - [(self) PreopenDirectory(preopenDirectory)](#WasiStateBuilder.PreopenDirectory "(self) PreopenDirectory(preopenDirectory)")
    - [type WasiVersion](#WasiVersion "type WasiVersion")

      - [GetWasiVersion(module)](#GetWasiVersion "GetWasiVersion(module)")
      - [(self) String()](#WasiVersion.String "(self) String()")
- [Source Files](#section-sourcefiles)
- [Directories](#section-directories)

</details>

### Overview [¶](#pkg-overview "Go to Overview")

- [Features](#hdr-Features)
- [Quick Introduction](#hdr-Quick_Introduction)
- [WebAssembly C API standard](#hdr-WebAssembly_C_API_standard)
- [Examples](#hdr-Examples)

Package wasmer is a complete and mature WebAssembly runtime for Go based on Wasmer ([https://github.com/wasmerio/wasmer](https://github.com/wasmerio/wasmer)).

#### Features [¶](#hdr-Features "Go to Features")

• Easy to use: The wasmer API mimics the standard WebAssembly API,

• Fast: wasmer executes the WebAssembly modules as fast as possible, close to native speed,

• Safe: All calls to WebAssembly will be fast, but more importantly, complete safe and sandboxed.

#### Quick Introduction [¶](#hdr-Quick_Introduction "Go to Quick Introduction")

The wasmer Go package brings the required API to execute WebAssembly modules. In a nutshell, wasmer compiles the WebAssembly module into compiled code, and then executes it. wasmer is designed to work in various environments and platforms: From nano single-board computers to large and powerful servers, including more exotic ones. To address those requirements, Wasmer provides 2 engines and 3 compilers.

Succinctly, an engine is responsible to drive the compilation and the execution of a WebAssembly module. By extension, a headless engine can only execute a WebAssembly module, i.e. a module that has previously been compiled, or compiled, serialized and deserialized. By default, the wasmer package comes with 2 headless engines:

• Universal, the compiled machine code lives in memory,

• Dylib, the compiled machine code lives in a shared object file (.so, .dylib, or .dll), and is natively executed.

The wasmer Go packages comes with 3 compilers:

• Singlepass: Super fast compilation times, slower execution times. Not prone to JIT-bombs. Ideal for blockchains.

• Cranelift: Fast compilation times, fast execution times. Ideal for development.

• LLVM: Slow compilation times, very fast execution times (close to native). Ideal for production.

#### WebAssembly C API standard [¶](#hdr-WebAssembly_C_API_standard "Go to WebAssembly C API standard")

Wasmer —the runtime— is written in Rust; C and C++ bindings exist. This Go package relies on the so-called wasm\_c\_api, [https://github.com/WebAssembly/wasm-c-api](https://github.com/WebAssembly/wasm-c-api), which is the new standard C API, implemented inside Wasmer as the Wasmer C API, [https://wasmerio.github.io/wasmer/crates/wasmer\_c\_api/](https://wasmerio.github.io/wasmer/crates/wasmer_c_api/). This standard is characterized as a living standard. The API is not yet stable, even though it shows maturity overtime. However, the Wasmer C API provides some extensions, like the wasi\_* or wasmer\_* types and functions, which aren't yet defined by the standard. The Go package commits to keep a semantic versioning over the API, regardless what happens with the C API.

#### Examples [¶](#hdr-Examples "Go to Examples")

The very basic example is the following

```
// Let's assume we don't have WebAssembly bytes at hand. We
// will write WebAssembly manually.
wasmBytes := []byte(`
	(module
	  (type (func (param i32 i32) (result i32)))
	  (func (type 0)
	    local.get 0
	    local.get 1
	    i32.add)
	  (export "sum" (func 0)))
`)

// Create an Engine
engine := wasmer.NewEngine()

// Create a Store
store := wasmer.NewStore(engine)

// Let's compile the module.
module, err := wasmer.NewModule(store, wasmBytes)

if err != nil {
	fmt.Println("Failed to compile module:", err)
}

// Create an empty import object.
importObject := wasmer.NewImportObject()

// Let's instantiate the WebAssembly module.
instance, err := wasmer.NewInstance(module, importObject)

if err != nil {
	panic(fmt.Sprintln("Failed to instantiate the module:", err))
}

// Now let's execute the `sum` function.
sum, err := instance.Exports.GetFunction("sum")

if err != nil {
	panic(fmt.Sprintln("Failed to get the `add_one` function:", err))
}

result, err := sum(1, 2)

if err != nil {
	panic(fmt.Sprintln("Failed to call the `add_one` function:", err))
}

fmt.Println("Results of `sum`:", result)

// Output:
// Results of `sum`: 3
```

That's it. Now explore the API! Some pointers for the adventurers:

• The basic elements are Module and Instance,

• Exports of an instance are represented by the Exports type,

• Maybe your module needs to import Function, Memory, Global or Table? Well, there is the ImportObject for that!

### Index [¶](#pkg-index "Go to Index")

- [Constants](#pkg-constants)
- [func IsCompilerAvailable(compiler CompilerKind) bool](#IsCompilerAvailable)
- [func IsEngineAvailable(engine EngineKind) bool](#IsEngineAvailable)
- [func LimitMaxUnbound() uint32](#LimitMaxUnbound)
- [func ValidateModule(store \*Store, bytes \[\]byte) error](#ValidateModule)
- [func Wat2Wasm(wat string) (\[\]byte, error)](#Wat2Wasm)
- [type CompilerKind](#CompilerKind)
- - [func (self CompilerKind) String() string](#CompilerKind.String)
- [type Config](#Config)
- - [func NewConfig() \*Config](#NewConfig)
- - [func (self \*Config) UseCraneliftCompiler() \*Config](#Config.UseCraneliftCompiler)
  - [func (self \*Config) UseDylibEngine() \*Config](#Config.UseDylibEngine)
  - [func (self \*Config) UseJITEngine() \*Config](#Config.UseJITEngine)
  - [func (self \*Config) UseLLVMCompiler() \*Config](#Config.UseLLVMCompiler)
  - [func (self \*Config) UseNativeEngine() \*Config](#Config.UseNativeEngine)
  - [func (self \*Config) UseSinglepassCompiler() \*Config](#Config.UseSinglepassCompiler)
  - [func (self \*Config) UseTarget(target \*Target) \*Config](#Config.UseTarget)
  - [func (self \*Config) UseUniversalEngine() \*Config](#Config.UseUniversalEngine)
- [type CpuFeatures](#CpuFeatures)
- - [func NewCpuFeatures() \*CpuFeatures](#NewCpuFeatures)
- - [func (self \*CpuFeatures) Add(feature string) error](#CpuFeatures.Add)
- [type Engine](#Engine)
- - [func NewDylibEngine() \*Engine](#NewDylibEngine)
  - [func NewEngine() \*Engine](#NewEngine)
  - [func NewEngineWithConfig(config \*Config) \*Engine](#NewEngineWithConfig)
  - [func NewJITEngine() \*Engine](#NewJITEngine)
  - [func NewNativeEngine() \*Engine](#NewNativeEngine)
  - [func NewUniversalEngine() \*Engine](#NewUniversalEngine)
- [type EngineKind](#EngineKind)
- - [func (self EngineKind) String() string](#EngineKind.String)
- [type Error](#Error)
- - [func (error \*Error) Error() string](#Error.Error)
- [type ExportType](#ExportType)
- - [func NewExportType(name string, ty IntoExternType) \*ExportType](#NewExportType)
- - [func (self \*ExportType) Close()](#ExportType.Close)
  - [func (self \*ExportType) Name() string](#ExportType.Name)
  - [func (self \*ExportType) Type() \*ExternType](#ExportType.Type)
- [type Exports](#Exports)
- - [func (self \*Exports) Close()](#Exports.Close)
  - [func (self \*Exports) Get(name string) (\*Extern, error)](#Exports.Get)
  - [func (self \*Exports) GetFunction(name string) (NativeFunction, error)](#Exports.GetFunction)
  - [func (self \*Exports) GetGlobal(name string) (\*Global, error)](#Exports.GetGlobal)
  - [func (self \*Exports) GetMemory(name string) (\*Memory, error)](#Exports.GetMemory)
  - [func (self \*Exports) GetRawFunction(name string) (\*Function, error)](#Exports.GetRawFunction)
  - [func (self \*Exports) GetTable(name string) (\*Table, error)](#Exports.GetTable)
  - [func (self \*Exports) GetWasiStartFunction() (NativeFunction, error)](#Exports.GetWasiStartFunction)
- [type Extern](#Extern)
- - [func (self \*Extern) IntoExtern() \*Extern](#Extern.IntoExtern)
  - [func (self \*Extern) IntoFunction() \*Function](#Extern.IntoFunction)
  - [func (self \*Extern) IntoGlobal() \*Global](#Extern.IntoGlobal)
  - [func (self \*Extern) IntoMemory() \*Memory](#Extern.IntoMemory)
  - [func (self \*Extern) IntoTable() \*Table](#Extern.IntoTable)
  - [func (self \*Extern) Kind() ExternKind](#Extern.Kind)
  - [func (self \*Extern) Type() \*ExternType](#Extern.Type)
- [type ExternKind](#ExternKind)
- - [func (self ExternKind) String() string](#ExternKind.String)
- [type ExternType](#ExternType)
- - [func (self \*ExternType) IntoFunctionType() \*FunctionType](#ExternType.IntoFunctionType)
  - [func (self \*ExternType) IntoGlobalType() \*GlobalType](#ExternType.IntoGlobalType)
  - [func (self \*ExternType) IntoMemoryType() \*MemoryType](#ExternType.IntoMemoryType)
  - [func (self \*ExternType) IntoTableType() \*TableType](#ExternType.IntoTableType)
  - [func (self \*ExternType) Kind() ExternKind](#ExternType.Kind)
- [type Frame](#Frame)
- - [func (self \*Frame) FunctionIndex() uint32](#Frame.FunctionIndex)
  - [func (self \*Frame) FunctionOffset() uint](#Frame.FunctionOffset)
  - [func (self \*Frame) Instance()](#Frame.Instance)
  - [func (self \*Frame) ModuleOffset() uint](#Frame.ModuleOffset)
- [type Function](#Function)
- - [func NewFunction(store \*Store, ty \*FunctionType, function func(\[\]Value) (\[\]Value, error)) \*Function](#NewFunction)
  - [func NewFunctionWithEnvironment(store \*Store, ty \*FunctionType, userEnvironment interface{}, ...) \*Function](#NewFunctionWithEnvironment)
- - [func (self \*Function) Call(parameters ...interface{}) (interface{}, error)](#Function.Call)
  - [func (self \*Function) IntoExtern() \*Extern](#Function.IntoExtern)
  - [func (self \*Function) Native() NativeFunction](#Function.Native)
  - [func (self \*Function) ParameterArity() uint](#Function.ParameterArity)
  - [func (self \*Function) ResultArity() uint](#Function.ResultArity)
  - [func (self \*Function) Type() \*FunctionType](#Function.Type)
- [type FunctionType](#FunctionType)
- - [func NewFunctionType(params \[\]\*ValueType, results \[\]\*ValueType) \*FunctionType](#NewFunctionType)
- - [func (self \*FunctionType) IntoExternType() \*ExternType](#FunctionType.IntoExternType)
  - [func (self \*FunctionType) Params() \[\]\*ValueType](#FunctionType.Params)
  - [func (self \*FunctionType) Results() \[\]\*ValueType](#FunctionType.Results)
- [type Global](#Global)
- - [func NewGlobal(store \*Store, ty \*GlobalType, value Value) \*Global](#NewGlobal)
- - [func (self \*Global) Get() (interface{}, error)](#Global.Get)
  - [func (self \*Global) IntoExtern() \*Extern](#Global.IntoExtern)
  - [func (self \*Global) Set(value interface{}, kind ValueKind) error](#Global.Set)
  - [func (self \*Global) Type() \*GlobalType](#Global.Type)
- [type GlobalMutability](#GlobalMutability)
- - [func (self GlobalMutability) String() string](#GlobalMutability.String)
- [type GlobalType](#GlobalType)
- - [func NewGlobalType(valueType \*ValueType, mutability GlobalMutability) \*GlobalType](#NewGlobalType)
- - [func (self \*GlobalType) IntoExternType() \*ExternType](#GlobalType.IntoExternType)
  - [func (self \*GlobalType) Mutability() GlobalMutability](#GlobalType.Mutability)
  - [func (self \*GlobalType) ValueType() \*ValueType](#GlobalType.ValueType)
- [type ImportObject](#ImportObject)
- - [func NewImportObject() \*ImportObject](#NewImportObject)
- - [func (self \*ImportObject) ContainsNamespace(name string) bool](#ImportObject.ContainsNamespace)
  - [func (self \*ImportObject) Register(namespaceName string, namespace map\[string\]IntoExtern)](#ImportObject.Register)
- [type ImportType](#ImportType)
- - [func NewImportType(module string, name string, ty IntoExternType) \*ImportType](#NewImportType)
- - [func (self \*ImportType) Close()](#ImportType.Close)
  - [func (self \*ImportType) Module() string](#ImportType.Module)
  - [func (self \*ImportType) Name() string](#ImportType.Name)
  - [func (self \*ImportType) Type() \*ExternType](#ImportType.Type)
- [type Instance](#Instance)
- - [func NewInstance(module \*Module, imports \*ImportObject) (\*Instance, error)](#NewInstance)
- - [func (self \*Instance) Close()](#Instance.Close)
- [type IntoExtern](#IntoExtern)
- [type IntoExternType](#IntoExternType)
- [type Limits](#Limits)
- - [func NewLimits(minimum uint32, maximum uint32) (\*Limits, error)](#NewLimits)
- - [func (self \*Limits) Maximum() uint32](#Limits.Maximum)
  - [func (self \*Limits) Minimum() uint32](#Limits.Minimum)
- [type Memory](#Memory)
- - [func NewMemory(store \*Store, ty \*MemoryType) \*Memory](#NewMemory)
- - [func (self \*Memory) Data() \[\]byte](#Memory.Data)
  - [func (self \*Memory) DataSize() uint](#Memory.DataSize)
  - [func (self \*Memory) Grow(delta Pages) bool](#Memory.Grow)
  - [func (self \*Memory) IntoExtern() \*Extern](#Memory.IntoExtern)
  - [func (self \*Memory) Size() Pages](#Memory.Size)
  - [func (self \*Memory) Type() \*MemoryType](#Memory.Type)
- [type MemoryType](#MemoryType)
- - [func NewMemoryType(limits \*Limits) \*MemoryType](#NewMemoryType)
- - [func (self \*MemoryType) IntoExternType() \*ExternType](#MemoryType.IntoExternType)
  - [func (self \*MemoryType) Limits() \*Limits](#MemoryType.Limits)
- [type Module](#Module)
- - [func DeserializeModule(store \*Store, bytes \[\]byte) (\*Module, error)](#DeserializeModule)
  - [func NewModule(store \*Store, bytes \[\]byte) (\*Module, error)](#NewModule)
- - [func (self \*Module) Close()](#Module.Close)
  - [func (self \*Module) Exports() \[\]\*ExportType](#Module.Exports)
  - [func (self \*Module) Imports() \[\]\*ImportType](#Module.Imports)
  - [func (self \*Module) Name() string](#Module.Name)
  - [func (self \*Module) Serialize() (\[\]byte, error)](#Module.Serialize)
- [type NativeFunction](#NativeFunction)
- [type Pages](#Pages)
- - [func (self \*Pages) ToBytes() uint](#Pages.ToBytes)
  - [func (self \*Pages) ToUint32() uint32](#Pages.ToUint32)
- [type Store](#Store)
- - [func NewStore(engine \*Engine) \*Store](#NewStore)
- - [func (self \*Store) Close()](#Store.Close)
- [type Table](#Table)
- - [func (self \*Table) IntoExtern() \*Extern](#Table.IntoExtern)
  - [func (self \*Table) Size() TableSize](#Table.Size)
- [type TableSize](#TableSize)
- - [func (self \*TableSize) ToUint32() uint32](#TableSize.ToUint32)
- [type TableType](#TableType)
- - [func NewTableType(valueType \*ValueType, limits \*Limits) \*TableType](#NewTableType)
- - [func (self \*TableType) IntoExternType() \*ExternType](#TableType.IntoExternType)
  - [func (self \*TableType) Limits() \*Limits](#TableType.Limits)
  - [func (self \*TableType) ValueType() \*ValueType](#TableType.ValueType)
- [type Target](#Target)
- - [func NewTarget(triple \*Triple, cpuFeatures \*CpuFeatures) \*Target](#NewTarget)
- [type Trace](#Trace)
- [type Trap](#Trap)
- - [func NewTrap(store \*Store, message string) \*Trap](#NewTrap)
- - [func (self \*Trap) Message() string](#Trap.Message)
  - [func (self \*Trap) Origin() \*Frame](#Trap.Origin)
  - [func (self \*Trap) Trace() \*Trace](#Trap.Trace)
- [type TrapError](#TrapError)
- - [func (self \*TrapError) Error() string](#TrapError.Error)
  - [func (self \*TrapError) Origin() \*Frame](#TrapError.Origin)
  - [func (self \*TrapError) Trace() \[\]\*Frame](#TrapError.Trace)
- [type Triple](#Triple)
- - [func NewTriple(triple string) (\*Triple, error)](#NewTriple)
  - [func NewTripleFromHost() \*Triple](#NewTripleFromHost)
- [type Value](#Value)
- - [func NewF32(value interface{}) Value](#NewF32)
  - [func NewF64(value interface{}) Value](#NewF64)
  - [func NewI32(value interface{}) Value](#NewI32)
  - [func NewI64(value interface{}) Value](#NewI64)
  - [func NewValue(value interface{}, kind ValueKind) Value](#NewValue)
- - [func (self \*Value) F32() float32](#Value.F32)
  - [func (self \*Value) F64() float64](#Value.F64)
  - [func (self \*Value) I32() int32](#Value.I32)
  - [func (self \*Value) I64() int64](#Value.I64)
  - [func (self \*Value) Kind() ValueKind](#Value.Kind)
  - [func (self \*Value) Unwrap() interface{}](#Value.Unwrap)
- [type ValueKind](#ValueKind)
- - [func (self ValueKind) IsNumber() bool](#ValueKind.IsNumber)
  - [func (self ValueKind) IsReference() bool](#ValueKind.IsReference)
  - [func (self ValueKind) String() string](#ValueKind.String)
- [type ValueType](#ValueType)
- - [func NewValueType(kind ValueKind) \*ValueType](#NewValueType)
  - [func NewValueTypes(kinds ...ValueKind) \[\]\*ValueType](#NewValueTypes)
- - [func (self \*ValueType) Kind() ValueKind](#ValueType.Kind)
- [type WasiEnvironment](#WasiEnvironment)
- - [func (self \*WasiEnvironment) GenerateImportObject(store \*Store, module \*Module) (\*ImportObject, error)](#WasiEnvironment.GenerateImportObject)
  - [func (self \*WasiEnvironment) ReadStderr() \[\]byte](#WasiEnvironment.ReadStderr)
  - [func (self \*WasiEnvironment) ReadStdout() \[\]byte](#WasiEnvironment.ReadStdout)
- [type WasiStateBuilder](#WasiStateBuilder)
- - [func NewWasiStateBuilder(programName string) \*WasiStateBuilder](#NewWasiStateBuilder)
- - [func (self \*WasiStateBuilder) Argument(argument string) \*WasiStateBuilder](#WasiStateBuilder.Argument)
  - [func (self \*WasiStateBuilder) CaptureStderr() \*WasiStateBuilder](#WasiStateBuilder.CaptureStderr)
  - [func (self \*WasiStateBuilder) CaptureStdout() \*WasiStateBuilder](#WasiStateBuilder.CaptureStdout)
  - [func (self \*WasiStateBuilder) Environment(key string, value string) \*WasiStateBuilder](#WasiStateBuilder.Environment)
  - [func (self \*WasiStateBuilder) Finalize() (\*WasiEnvironment, error)](#WasiStateBuilder.Finalize)
  - [func (self \*WasiStateBuilder) InheritStderr() \*WasiStateBuilder](#WasiStateBuilder.InheritStderr)
  - [func (self \*WasiStateBuilder) InheritStdin() \*WasiStateBuilder](#WasiStateBuilder.InheritStdin)
  - [func (self \*WasiStateBuilder) InheritStdout() \*WasiStateBuilder](#WasiStateBuilder.InheritStdout)
  - [func (self \*WasiStateBuilder) MapDirectory(alias string, directory string) \*WasiStateBuilder](#WasiStateBuilder.MapDirectory)
  - [func (self \*WasiStateBuilder) PreopenDirectory(preopenDirectory string) \*WasiStateBuilder](#WasiStateBuilder.PreopenDirectory)
- [type WasiVersion](#WasiVersion)
- - [func GetWasiVersion(module \*Module) WasiVersion](#GetWasiVersion)
- - [func (self WasiVersion) String() string](#WasiVersion.String)

### Constants [¶](#pkg-constants "Go to Constants")

[View Source](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/config.go#L9)

```
const (
	// Represents the Cranelift compiler.
	CRANELIFT = CompilerKind(C.CRANELIFT)

	// Represents the LLVM compiler.
	LLVM = CompilerKind(C.LLVM)

	// Represents the Singlepass compiler.
	SINGLEPASS = CompilerKind(C.SINGLEPASS)
)
```

[View Source](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/config.go#L49)

```
const (
	// Represents the Universal engine.
	UNIVERSAL = EngineKind(C.UNIVERSAL)

	// Represents the Dylib engine.
	DYLIB = EngineKind(C.DYLIB)

	// Deprecated constant. Please use UNIVERSAL instead.
	JIT = UNIVERSAL

	// Deprecated constant. Please use DYLIB instead.
	NATIVE = DYLIB
)
```

[View Source](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/externtype.go#L10)

```
const (
	// Represents an extern of kind function.
	FUNCTION = ExternKind(C.WASM_EXTERN_FUNC)

	// Represents an extern of kind global.
	GLOBAL = ExternKind(C.WASM_EXTERN_GLOBAL)

	// Represents an extern of kind table.
	TABLE = ExternKind(C.WASM_EXTERN_TABLE)

	// Represents an extern of kind memory.
	MEMORY = ExternKind(C.WASM_EXTERN_MEMORY)
)
```

[View Source](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/globaltype.go#L9)

```
const (
	// Represents a global that is immutable.
	IMMUTABLE = GlobalMutability(C.WASM_CONST)

	// Represents a global that is mutable.
	MUTABLE = GlobalMutability(C.WASM_VAR)
)
```

[View Source](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/valuetype.go#L13)

```
const (
	// A 32-bit integer. In WebAssembly, integers are
	// sign-agnostic, i.E. this can either be signed or unsigned.
	I32 = ValueKind(C.WASM_I32)

	// A 64-bit integer. In WebAssembly, integers are
	// sign-agnostic, i.E. this can either be signed or unsigned.
	I64 = ValueKind(C.WASM_I64)

	// A 32-bit float.
	F32 = ValueKind(C.WASM_F32)

	// A 64-bit float.
	F64 = ValueKind(C.WASM_F64)

	// An externref value which can hold opaque data to the
	// WebAssembly instance itself.
	AnyRef = ValueKind(C.WASM_ANYREF)

	// A first-class reference to a WebAssembly function.
	FuncRef = ValueKind(C.WASM_FUNCREF)
)
```

[View Source](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/wasi.go#L65)

```
const (
	// Latest version. It's a “floating” version, i.e. it's an
	// alias to the latest version. Using this version is a way to
	// ensure that modules will run only if they come with the
	// latest WASI version (in case of security issues for
	// instance), by just updating the runtime.
	WASI_VERSION_LATEST = WasiVersion(C.LATEST)

	// Represents the wasi_unstable version.
	WASI_VERSION_SNAPSHOT0 = WasiVersion(C.SNAPSHOT0)

	// Represents the wasi_snapshot_preview1 version.
	WASI_VERSION_SNAPSHOT1 = WasiVersion(C.SNAPSHOT1)

	// Represents an invalid version.
	WASI_VERSION_INVALID = WasiVersion(C.INVALID_VERSION)
)
```

[View Source](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/pages.go#L13)

```
const WasmMaxPages = uint(0x10000)
```

Represents the maximum number of pages.

[View Source](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/pages.go#L16)

```
const WasmMinPages = uint(0x100)
```

Represents the minimum number of pages.

[View Source](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/pages.go#L10)

```
const WasmPageSize = uint(0x10000)
```

Represents a memory page size.

### Variables [¶](#pkg-variables "Go to Variables")

This section is empty.

### Functions [¶](#pkg-functions "Go to Functions")

#### func [IsCompilerAvailable](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/config.go#L42) [¶](#IsCompilerAvailable "Go to IsCompilerAvailable") added in v1.0.3

```
func IsCompilerAvailable(compiler CompilerKind) bool
```

IsCompilerAvailable checks that the given compiler is available in this current version of \`wasmer-go\`.

```
IsCompilerAvailable(CRANELIFT)
```

#### func [IsEngineAvailable](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/config.go#L82) [¶](#IsEngineAvailable "Go to IsEngineAvailable") added in v1.0.3

```
func IsEngineAvailable(engine EngineKind) bool
```

IsEngineAvailable checks that the given engine is available in this current version of \`wasmer-go\`.

```
IsEngineAvailable(UNIVERSAL)
```

#### func [LimitMaxUnbound](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/limits.go#L13) [¶](#LimitMaxUnbound "Go to LimitMaxUnbound")

```
func LimitMaxUnbound() uint32
```

LimitMaxUnbound returns the value used to represent an unbound limit, i.e. when a limit only has a min but not a max. See Limit.

#### func [ValidateModule](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/module.go#L119) [¶](#ValidateModule "Go to ValidateModule")

```
func ValidateModule(store *Store, bytes []byte) error
```

ValidateModule validates a new Module against the given Store.

It takes two arguments, the Store and the WebAssembly module as a byte array. The function returns an error describing why the bytes are invalid, otherwise it returns nil.

```
wasmBytes := []byte(`...`)
engine := wasmer.NewEngine()
store := wasmer.NewStore(engine)
err := wasmer.ValidateModule(store, wasmBytes)

isValid := err != nil
```

#### func [Wat2Wasm](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/wat.go#L20) [¶](#Wat2Wasm "Go to Wat2Wasm")

```
func Wat2Wasm(wat string) ([]byte, error)
```

Wat2Wasm parses a string as either WAT code or a binary Wasm module.

See [https://webassembly.github.io/spec/core/text/index.html](https://webassembly.github.io/spec/core/text/index.html).

Note: This is not part of the standard Wasm C API. It is Wasmer specific.

```
wat := "(module)"
wasm, _ := Wat2Wasm(wat)
engine := wasmer.NewEngine()
store := wasmer.NewStore(engine)
module, _ := wasmer.NewModule(store, wasmBytes)
```

### Types [¶](#pkg-types "Go to Types")

#### type [CompilerKind](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/config.go#L7) [¶](#CompilerKind "Go to CompilerKind") added in v1.0.3

```
type CompilerKind C.wasmer_compiler_t
```

CompilerKind represents the possible compiler types.

#### func (CompilerKind) [String](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/config.go#L24) [¶](#CompilerKind.String "Go to CompilerKind.String") added in v1.0.3

```
func (self CompilerKind) String() string
```

Strings returns the CompilerKind as a string.

```
CRANELIFT.String() // "cranelift"
LLVM.String() // "llvm"
```

#### type [Config](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/config.go#L87) [¶](#Config "Go to Config")

```
type Config struct {
	// contains filtered or unexported fields
}
```

Config holds the compiler and the Engine used by the Store.

#### func [NewConfig](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/config.go#L94) [¶](#NewConfig "Go to NewConfig")

```
func NewConfig() *Config
```

NewConfig instantiates and returns a new Config.

```
config := NewConfig()
```

#### func (\*Config) [UseCraneliftCompiler](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/config.go#L159) [¶](#Config.UseCraneliftCompiler "Go to Config.UseCraneliftCompiler")

```
func (self *Config) UseCraneliftCompiler() *Config
```

UseCraneliftCompiler sets the compiler to Cranelift in the configuration.

```
config := NewConfig()
config.UseCraneliftCompiler()
```

This method might fail if the Cranelift compiler isn't available. Check \`IsCompilerAvailable\` to learn more.

#### func (\*Config) [UseDylibEngine](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/config.go#L130) [¶](#Config.UseDylibEngine "Go to Config.UseDylibEngine") added in v1.0.4

```
func (self *Config) UseDylibEngine() *Config
```

UseDylibEngine sets the engine to Dylib in the configuration.

```
config := NewConfig()
config.UseDylibEngine()
```

This method might fail if the Dylib engine isn't available. Check \`IsEngineAvailable\` to learn more.

#### func (\*Config) [UseJITEngine](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/config.go#L142) [¶](#Config.UseJITEngine "Go to Config.UseJITEngine")

```
func (self *Config) UseJITEngine() *Config
```

UseJITEngine is a deprecated method. Please use UseUniversalEngine instead.

#### func (\*Config) [UseLLVMCompiler](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/config.go#L176) [¶](#Config.UseLLVMCompiler "Go to Config.UseLLVMCompiler")

```
func (self *Config) UseLLVMCompiler() *Config
```

UseLLVMCompiler sets the compiler to LLVM in the configuration.

```
config := NewConfig()
config.UseLLVMCompiler()
```

This method might fail if the LLVM compiler isn't available. Check \`IsCompilerAvailable\` to learn more.

#### func (\*Config) [UseNativeEngine](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/config.go#L148) [¶](#Config.UseNativeEngine "Go to Config.UseNativeEngine")

```
func (self *Config) UseNativeEngine() *Config
```

UseNativeEngine is a deprecated method. Please use UseDylibEngine instead.

#### func (\*Config) [UseSinglepassCompiler](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/config.go#L194) [¶](#Config.UseSinglepassCompiler "Go to Config.UseSinglepassCompiler") added in v1.0.3

```
func (self *Config) UseSinglepassCompiler() *Config
```

UseSinglepassCompiler sets the compiler to Singlepass in the configuration.

```
config := NewConfig()
config.UseSinglepassCompiler()
```

This method might fail if the Singlepass compiler isn't available. Check \`IsCompilerAvailable\` to learn more.

#### func (\*Config) [UseTarget](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/config.go#L212) [¶](#Config.UseTarget "Go to Config.UseTarget")

```
func (self *Config) UseTarget(target *Target) *Config
```

Use a specific target for doing cross-compilation.

```
triple, _ := NewTriple("aarch64-unknown-linux-gnu")
cpuFeatures := NewCpuFeatures()
target := NewTarget(triple, cpuFeatures)

config := NewConfig()
config.UseTarget(target)
```

#### func (\*Config) [UseUniversalEngine](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/config.go#L113) [¶](#Config.UseUniversalEngine "Go to Config.UseUniversalEngine") added in v1.0.4

```
func (self *Config) UseUniversalEngine() *Config
```

UseNativeEngine sets the engine to Universal in the configuration.

```
config := NewConfig()
config.UseUniversalEngine()
```

This method might fail if the Universal engine isn't available. Check \`IsEngineAvailable\` to learn more.

#### type [CpuFeatures](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/target.go#L124) [¶](#CpuFeatures "Go to CpuFeatures")

```
type CpuFeatures struct {
	// contains filtered or unexported fields
}
```

CpuFeatures holds a set of CPU features. They are identified by their stringified names. The reference is the GCC options:

• [https://gcc.gnu.org/onlinedocs/gcc/x86-Options.html](https://gcc.gnu.org/onlinedocs/gcc/x86-Options.html),

• [https://gcc.gnu.org/onlinedocs/gcc/ARM-Options.html](https://gcc.gnu.org/onlinedocs/gcc/ARM-Options.html),

• [https://gcc.gnu.org/onlinedocs/gcc/AArch64-Options.html](https://gcc.gnu.org/onlinedocs/gcc/AArch64-Options.html).

At the time of writing this documentation (it might be outdated in the future), the supported featurse are the following:

• sse2,

• sse3,

• ssse3,

• sse4.1,

• sse4.2,

• popcnt,

• avx,

• bmi,

• bmi2,

• avx2,

• avx512dq,

• avx512vl,

• lzcnt.

#### func [NewCpuFeatures](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/target.go#L142) [¶](#NewCpuFeatures "Go to NewCpuFeatures")

```
func NewCpuFeatures() *CpuFeatures
```

NewCpuFeatures creates a new CpuFeatures, which is a set of CPU features.

#### func (\*CpuFeatures) [Add](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/target.go#L147) [¶](#CpuFeatures.Add "Go to CpuFeatures.Add")

```
func (self *CpuFeatures) Add(feature string) error
```

Add adds a new CPU feature to the existing set.

#### type [Engine](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/engine.go#L9) [¶](#Engine "Go to Engine")

```
type Engine struct {
	// contains filtered or unexported fields
}
```

Engine is used by the Store to drive the compilation and the execution of a WebAssembly module.

#### func [NewDylibEngine](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/engine.go#L57) [¶](#NewDylibEngine "Go to NewDylibEngine") added in v1.0.4

```
func NewDylibEngine() *Engine
```

NewDylibEngine instantiates and returns a new Dylib engine.

```
engine := NewDylibEngine()
```

#### func [NewEngine](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/engine.go#L29) [¶](#NewEngine "Go to NewEngine")

```
func NewEngine() *Engine
```

NewEngine instantiates and returns a new Engine with the default configuration.

```
engine := NewEngine()
```

#### func [NewEngineWithConfig](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/engine.go#L38) [¶](#NewEngineWithConfig "Go to NewEngineWithConfig")

```
func NewEngineWithConfig(config *Config) *Engine
```

NewEngineWithConfig instantiates and returns a new Engine with the given configuration.

```
config := NewConfig()
engine := NewEngineWithConfig(config)
```

#### func [NewJITEngine](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/engine.go#L69) [¶](#NewJITEngine "Go to NewJITEngine")

```
func NewJITEngine() *Engine
```

NewJITEngine is a deprecated function. Please use NewUniversalEngine instead.

#### func [NewNativeEngine](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/engine.go#L74) [¶](#NewNativeEngine "Go to NewNativeEngine")

```
func NewNativeEngine() *Engine
```

NewNativeEngine is a deprecated function. Please use NewDylibEngine instead.

#### func [NewUniversalEngine](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/engine.go#L46) [¶](#NewUniversalEngine "Go to NewUniversalEngine") added in v1.0.4

```
func NewUniversalEngine() *Engine
```

NewUniversalEngine instantiates and returns a new Universal engine.

```
engine := NewUniversalEngine()
```

#### type [EngineKind](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/config.go#L47) [¶](#EngineKind "Go to EngineKind") added in v1.0.3

```
type EngineKind C.wasmer_engine_t
```

EngineKind represents the possible engine types.

#### func (EngineKind) [String](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/config.go#L67) [¶](#EngineKind.String "Go to EngineKind.String") added in v1.0.3

```
func (self EngineKind) String() string
```

Strings returns the EngineKind as a string.

```
JIT.String() // "jit"
NATIVE.String() // "native"
```

#### type [Error](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/error.go#L11) [¶](#Error "Go to Error")

```
type Error struct {
	// contains filtered or unexported fields
}
```

Error represents a Wasmer runtime error.

#### func (\*Error) [Error](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/error.go#L52) [¶](#Error.Error "Go to Error.Error")

```
func (error *Error) Error() string
```

Error returns the Error's message.

#### type [ExportType](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/exporttype.go#L51) [¶](#ExportType "Go to ExportType")

```
type ExportType struct {
	// contains filtered or unexported fields
}
```

ExportType is a descriptor for an exported WebAssembly value.

#### func [NewExportType](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/exporttype.go#L75) [¶](#NewExportType "Go to NewExportType")

```
func NewExportType(name string, ty IntoExternType) *ExportType
```

NewExportType instantiates a new ExportType with a name and an extern type.

Note: An extern type is anything implementing IntoExternType: FunctionType, GlobalType, MemoryType, TableType.

```
valueType := NewValueType(I32)
globalType := NewGlobalType(valueType, CONST)
exportType := NewExportType("a_global", globalType)
```

#### func (\*ExportType) [Close](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/exporttype.go#L129) [¶](#ExportType.Close "Go to ExportType.Close") added in v1.0.4

```
func (self *ExportType) Close()
```

Force to close the ExportType.

A runtime finalizer is registered on the ExportType, but it is possible to force the destruction of the ExportType by calling Close manually.

#### func (\*ExportType) [Name](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/exporttype.go#L103) [¶](#ExportType.Name "Go to ExportType.Name")

```
func (self *ExportType) Name() string
```

Name returns the name of the export type.

```
exportType := NewExportType("a_global", globalType)
exportType.Name() // "global"
```

#### func (\*ExportType) [Type](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/exporttype.go#L116) [¶](#ExportType.Type "Go to ExportType.Type")

```
func (self *ExportType) Type() *ExternType
```

Type returns the type of the export type.

```
exportType := NewExportType("a_global", globalType)
exportType.Type() // ExternType
```

#### type [Exports](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/exports.go#L13) [¶](#Exports "Go to Exports")

```
type Exports struct {
	// contains filtered or unexported fields
}
```

Exports is a special kind of map that allows easily unwrapping the types of instances.

#### func (\*Exports) [Close](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/exports.go#L204) [¶](#Exports.Close "Go to Exports.Close") added in v1.0.4

```
func (self *Exports) Close()
```

Force to close the Exports.

A runtime finalizer is registered on the Exports, but it is possible to force the destruction of the Exports by calling Close manually.

#### func (\*Exports) [Get](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/exports.go#L60) [¶](#Exports.Get "Go to Exports.Get")

```
func (self *Exports) Get(name string) (*Extern, error)
```

Get retrieves and returns an Extern by its name.

Note: If the name does not refer to an existing export, Get will return an Error.

```
instance, _ := NewInstance(module, NewImportObject())
extern, error := instance.Exports.Get("an_export")
```

#### func (\*Exports) [GetFunction](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/exports.go#L114) [¶](#Exports.GetFunction "Go to Exports.GetFunction")

```
func (self *Exports) GetFunction(name string) (NativeFunction, error)
```

GetFunction retrieves a exported function by its name and returns it as a native Go function.

The difference with GetRawFunction is that Function.Native has been called on the exported function.

Note: If the name does not refer to an existing export, GetFunction will return an Error.

Note: If the export is not a function, GetFunction will return nil as its result.

```
instance, _ := NewInstance(module, NewImportObject())
exportedFunc, error := instance.Exports.GetFunction("an_exported_function")

if error != nil && exportedFunc != nil {
    exportedFunc()
}
```

#### func (\*Exports) [GetGlobal](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/exports.go#L135) [¶](#Exports.GetGlobal "Go to Exports.GetGlobal")

```
func (self *Exports) GetGlobal(name string) (*Global, error)
```

GetGlobal retrieves and returns a exported Global by its name.

Note: If the name does not refer to an existing export, GetGlobal will return an Error.

Note: If the export is not a global, GetGlobal will return nil as a result.

```
instance, _ := NewInstance(module, NewImportObject())
exportedGlobal, error := instance.Exports.GetGlobal("an_exported_global")
```

#### func (\*Exports) [GetMemory](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/exports.go#L177) [¶](#Exports.GetMemory "Go to Exports.GetMemory")

```
func (self *Exports) GetMemory(name string) (*Memory, error)
```

GetMemory retrieves and returns a exported Memory by its name.

Note: If the name does not refer to an existing export, GetMemory will return an Error.

Note: If the export is not a memory, GetMemory will return nil as a result.

```
instance, _ := NewInstance(module, NewImportObject())
exportedMemory, error := instance.Exports.GetMemory("an_exported_memory")
```

#### func (\*Exports) [GetRawFunction](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/exports.go#L85) [¶](#Exports.GetRawFunction "Go to Exports.GetRawFunction")

```
func (self *Exports) GetRawFunction(name string) (*Function, error)
```

GetRawFunction retrieves and returns an exported Function by its name.

Note: If the name does not refer to an existing export, GetRawFunction will return an Error.

Note: If the export is not a function, GetRawFunction will return nil as its result.

```
instance, _ := NewInstance(module, NewImportObject())
exportedFunc, error := instance.Exports.GetRawFunction("an_exported_function")

if error != nil && exportedFunc != nil {
    exportedFunc.Call()
}
```

#### func (\*Exports) [GetTable](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/exports.go#L156) [¶](#Exports.GetTable "Go to Exports.GetTable")

```
func (self *Exports) GetTable(name string) (*Table, error)
```

GetTable retrieves and returns a exported Table by its name.

Note: If the name does not refer to an existing export, GetTable will return an Error.

Note: If the export is not a table, GetTable will return nil as a result.

```
instance, _ := NewInstance(module, NewImportObject())
exportedTable, error := instance.Exports.GetTable("an_exported_table")
```

#### func (\*Exports) [GetWasiStartFunction](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/exports.go#L189) [¶](#Exports.GetWasiStartFunction "Go to Exports.GetWasiStartFunction")

```
func (self *Exports) GetWasiStartFunction() (NativeFunction, error)
```

GetWasiStartFunction is similar to GetFunction("\_start"). It saves you the cost of knowing the name of the WASI start function.

#### type [Extern](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/extern.go#L9) [¶](#Extern "Go to Extern")

```
type Extern struct {
	// contains filtered or unexported fields
}
```

Extern is the runtime representation of an entity that can be imported or exported.

#### func (\*Extern) [IntoExtern](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/extern.go#L44) [¶](#Extern.IntoExtern "Go to Extern.IntoExtern")

```
func (self *Extern) IntoExtern() *Extern
```

#### func (\*Extern) [IntoFunction](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/extern.go#L80) [¶](#Extern.IntoFunction "Go to Extern.IntoFunction")

```
func (self *Extern) IntoFunction() *Function
```

IntoFunction converts the Extern into a Function.

Note:️ If the Extern is not a Function, IntoFunction will return nil as its result.

```
function, _ := instance.Exports.GetFunction("exported_function")
extern = function.IntoExtern()
_ := extern.IntoFunction()
```

#### func (\*Extern) [IntoGlobal](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/extern.go#L98) [¶](#Extern.IntoGlobal "Go to Extern.IntoGlobal")

```
func (self *Extern) IntoGlobal() *Global
```

IntoGlobal converts the Extern into a Global.

Note:️ If the Extern is not a Global, IntoGlobal will return nil as its result.

```
global, _ := instance.Exports.GetGlobal("exported_global")
extern = global.IntoExtern()
_ := extern.IntoGlobal()
```

#### func (\*Extern) [IntoMemory](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/extern.go#L134) [¶](#Extern.IntoMemory "Go to Extern.IntoMemory")

```
func (self *Extern) IntoMemory() *Memory
```

IntoMemory converts the Extern into a Memory.

Note:️ If the Extern is not a Memory, IntoMemory will return nil as its result.

```
memory, _ := instance.Exports.GetMemory("exported_memory")
extern = memory.IntoExtern()
_ := extern.IntoMemory()
```

#### func (\*Extern) [IntoTable](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/extern.go#L116) [¶](#Extern.IntoTable "Go to Extern.IntoTable")

```
func (self *Extern) IntoTable() *Table
```

IntoTable converts the Extern into a Table.

Note:️ If the Extern is not a Table, IntoTable will return nil as its result.

```
table, _ := instance.Exports.GetTable("exported_table")
extern = table.IntoExtern()
_ := extern.IntoTable()
```

#### func (\*Extern) [Kind](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/extern.go#L52) [¶](#Extern.Kind "Go to Extern.Kind")

```
func (self *Extern) Kind() ExternKind
```

Kind returns the Extern's ExternKind.

```
global, _ := instance.Exports.GetGlobal("exported_global")
_ = global.IntoExtern().Kind()
```

#### func (\*Extern) [Type](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/extern.go#L64) [¶](#Extern.Type "Go to Extern.Type")

```
func (self *Extern) Type() *ExternType
```

Type returns the Extern's ExternType.

```
global, _ := instance.Exports.GetGlobal("exported_global")
_ = global.IntoExtern().Type()
```

#### type [ExternKind](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/externtype.go#L8) [¶](#ExternKind "Go to ExternKind")

```
type ExternKind C.wasm_externkind_t
```

Represents the kind of an Extern.

#### func (ExternKind) [String](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/externtype.go#L30) [¶](#ExternKind.String "Go to ExternKind.String")

```
func (self ExternKind) String() string
```

String returns the ExternKind as a string.

```
FUNCTION.String() // "func"
GLOBAL.String()   // "global"
TABLE.String()    // "table"
MEMORY.String()   // "memory"
```

#### type [ExternType](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/externtype.go#L49) [¶](#ExternType "Go to ExternType")

```
type ExternType struct {
	// contains filtered or unexported fields
}
```

- [See also](#hdr-See_also-ExternType)

ExternType classifies imports and external values with their respective types.

#### See also [¶](#hdr-See_also-ExternType "Go to See also")

Specification: [https://webassembly.github.io/spec/core/syntax/types.html#external-types](https://webassembly.github.io/spec/core/syntax/types.html#external-types)

#### func (\*ExternType) [IntoFunctionType](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/externtype.go#L103) [¶](#ExternType.IntoFunctionType "Go to ExternType.IntoFunctionType")

```
func (self *ExternType) IntoFunctionType() *FunctionType
```

IntoFunctionType converts the ExternType into a FunctionType.

Note:️ If the ExternType is not a FunctionType, IntoFunctionType will return nil as its result.

```
function, _ := instance.Exports.GetFunction("exported_function")
externType = function.IntoExtern().Type()
_ := externType.IntoFunctionType()
```

#### func (\*ExternType) [IntoGlobalType](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/externtype.go#L122) [¶](#ExternType.IntoGlobalType "Go to ExternType.IntoGlobalType")

```
func (self *ExternType) IntoGlobalType() *GlobalType
```

IntoGlobalType converts the ExternType into a GlobalType.

Note:️ If the ExternType is not a GlobalType, IntoGlobalType will return nil as its result.

```
global, _ := instance.Exports.GetGlobal("exported_global")
externType = global.IntoExtern().Type()
_ := externType.IntoGlobalType()
```

#### func (\*ExternType) [IntoMemoryType](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/externtype.go#L159) [¶](#ExternType.IntoMemoryType "Go to ExternType.IntoMemoryType")

```
func (self *ExternType) IntoMemoryType() *MemoryType
```

IntoMemoryType converts the ExternType into a MemoryType.

Note:️ If the ExternType is not a MemoryType, IntoMemoryType will return nil as its result.

```
memory, _ := instance.Exports.GetMemory("exported_memory")
externType = memory.IntoExtern().Type()
_ := externType.IntoMemoryType()
```

#### func (\*ExternType) [IntoTableType](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/externtype.go#L140) [¶](#ExternType.IntoTableType "Go to ExternType.IntoTableType")

```
func (self *ExternType) IntoTableType() *TableType
```

IntoTableType converts the ExternType into a TableType.

Note:️ If the ExternType is not a TableType, IntoTableType will return nil as its result.

```
table, _ := instance.Exports.GetTable("exported_table")
externType = table.IntoExtern().Type()
_ := externType.IntoTableType()
```

#### func (\*ExternType) [Kind](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/externtype.go#L87) [¶](#ExternType.Kind "Go to ExternType.Kind")

```
func (self *ExternType) Kind() ExternKind
```

Kind returns the ExternType's ExternKind

```
global, _ := instance.Exports.GetGlobal("exported_global")
extern = global.IntoExtern()
_ = extern.Kind()
```

#### type [Frame](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/trap.go#L115) [¶](#Frame "Go to Frame")

```
type Frame struct {
	// contains filtered or unexported fields
}
```

Frame represents a frame of a WebAssembly stack trace.

#### func (\*Frame) [FunctionIndex](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/trap.go#L149) [¶](#Frame.FunctionIndex "Go to Frame.FunctionIndex")

```
func (self *Frame) FunctionIndex() uint32
```

FunctionIndex returns the function index in the original WebAssembly module that this frame corresponds to.

#### func (\*Frame) [FunctionOffset](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/trap.go#L160) [¶](#Frame.FunctionOffset "Go to Frame.FunctionOffset")

```
func (self *Frame) FunctionOffset() uint
```

FunctionOffset returns the byte offset from the beginning of the function in the original WebAssembly file to the instruction this frame points to.

#### func (\*Frame) [Instance](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/trap.go#L168) [¶](#Frame.Instance "Go to Frame.Instance")

```
func (self *Frame) Instance()
```

#### func (\*Frame) [ModuleOffset](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/trap.go#L175) [¶](#Frame.ModuleOffset "Go to Frame.ModuleOffset")

```
func (self *Frame) ModuleOffset() uint
```

ModuleOffset returns the byte offset from the beginning of the original WebAssembly file to the instruction this frame points to.

#### type [Function](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/function.go#L33) [¶](#Function "Go to Function")

```
type Function struct {
	// contains filtered or unexported fields
}
```

Function is a WebAssembly function instance.

#### func [NewFunction](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/function.go#L85) [¶](#NewFunction "Go to NewFunction")

```
func NewFunction(store *Store, ty *FunctionType, function func([]Value) ([]Value, error)) *Function
```

NewFunction instantiates a new Function in the given Store.

It takes three arguments, the Store, the FunctionType and the definition for the Function.

The function definition must be a native Go function with a Value array as its single argument. The function must return a Value array or an error.

Note:️ Even if the function does not take any argument (or use any argument) it must receive a Value array as its single argument. At runtime, this array will be empty. The same applies to the result.

```
hostFunction := wasmer.NewFunction(
	store,
	wasmer.NewFunctionType(
		wasmer.NewValueTypes(), // zero argument
		wasmer.NewValueTypes(wasmer.I32), // one i32 result
	),
	func(args []wasmer.Value) ([]wasmer.Value, error) {
		return []wasmer.Value{wasmer.NewI32(42)}, nil
	},
)
```

#### func [NewFunctionWithEnvironment](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/function.go#L158) [¶](#NewFunctionWithEnvironment "Go to NewFunctionWithEnvironment")

```
func NewFunctionWithEnvironment(store *Store, ty *FunctionType, userEnvironment interface{}, functionWithEnv func(interface{}, []Value) ([]Value, error)) *Function
```

NewFunctionWithEnvironment is similar to NewFunction except that the user-defined host function (in Go) accepts an additional first parameter which is an environment. This environment can be anything. It is typed as interface{}.

```
type MyEnvironment struct {
	foo int32
}

environment := &MyEnvironment {
	foo: 42,
}

hostFunction := wasmer.NewFunction(
	store,
	wasmer.NewFunctionType(
		wasmer.NewValueTypes(), // zero argument
		wasmer.NewValueTypes(wasmer.I32), // one i32 result
	),
	environment,
	func(environment interface{}, args []wasmer.Value) ([]wasmer.Value, error) {
		_ := environment.(*MyEnvironment)

		return []wasmer.Value{wasmer.NewI32(42)}, nil
	},
)
```

#### func (\*Function) [Call](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/function.go#L265) [¶](#Function.Call "Go to Function.Call")

```
func (self *Function) Call(parameters ...interface{}) (interface{}, error)
```

Call will call the Function and return its results as native Go values.

```
function, _ := instance.Exports.GetFunction("exported_function")
_ = function.Call(1, 2, 3)
```

#### func (\*Function) [IntoExtern](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/function.go#L223) [¶](#Function.IntoExtern "Go to Function.IntoExtern")

```
func (self *Function) IntoExtern() *Extern
```

IntoExtern converts the Function into an Extern.

```
function, _ := instance.Exports.GetFunction("exported_function")
extern := function.IntoExtern()
```

#### func (\*Function) [Native](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/function.go#L275) [¶](#Function.Native "Go to Function.Native")

```
func (self *Function) Native() NativeFunction
```

Native will turn the Function into a native Go function that can be then called.

```
function, _ := instance.Exports.GetFunction("exported_function")
nativeFunction = function.Native()
_ = nativeFunction(1, 2, 3)
```

#### func (\*Function) [ParameterArity](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/function.go#L247) [¶](#Function.ParameterArity "Go to Function.ParameterArity")

```
func (self *Function) ParameterArity() uint
```

ParameterArity returns the number of arguments the Function expects as per its definition.

```
function, _ := instance.Exports.GetFunction("exported_function")
arity := function.ParameterArity()
```

#### func (\*Function) [ResultArity](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/function.go#L256) [¶](#Function.ResultArity "Go to Function.ResultArity")

```
func (self *Function) ResultArity() uint
```

ParameterArity returns the number of results the Function will return.

```
function, _ := instance.Exports.GetFunction("exported_function")
arity := function.ResultArity()
```

#### func (\*Function) [Type](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/function.go#L234) [¶](#Function.Type "Go to Function.Type")

```
func (self *Function) Type() *FunctionType
```

Type returns the Function's FunctionType.

```
function, _ := instance.Exports.GetFunction("exported_function")
ty := function.Type()
```

#### type [FunctionType](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/functiontype.go#L14) [¶](#FunctionType "Go to FunctionType")

```
type FunctionType struct {
	// contains filtered or unexported fields
}
```

- [See also](#hdr-See_also-FunctionType)

FunctionType classifies the signature of functions, mapping a vector of parameters to a vector of results. They are also used to classify the inputs and outputs of instructions.

#### See also [¶](#hdr-See_also-FunctionType "Go to See also")

Specification: [https://webassembly.github.io/spec/core/syntax/types.html#function-types](https://webassembly.github.io/spec/core/syntax/types.html#function-types)

#### func [NewFunctionType](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/functiontype.go#L38) [¶](#NewFunctionType "Go to NewFunctionType")

```
func NewFunctionType(params []*ValueType, results []*ValueType) *FunctionType
```

NewFunctionType instantiates a new FunctionType from two ValueType arrays: the parameters and the results.

```
params := wasmer.NewValueTypes()
results := wasmer.NewValueTypes(wasmer.I32)
functionType := wasmer.NewFunctionType(params, results)
```

#### func (\*FunctionType) [IntoExternType](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/functiontype.go#L89) [¶](#FunctionType.IntoExternType "Go to FunctionType.IntoExternType")

```
func (self *FunctionType) IntoExternType() *ExternType
```

IntoExternType converts the FunctionType into an ExternType.

```
function, _ := instance.Exports.GetFunction("exported_function")
functionType := function.Type()
externType = functionType.IntoExternType()
```

#### func (\*FunctionType) [Params](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/functiontype.go#L67) [¶](#FunctionType.Params "Go to FunctionType.Params")

```
func (self *FunctionType) Params() []*ValueType
```

Params returns the parameters definitions from the FunctionType as a ValueType array

```
params := wasmer.NewValueTypes()
results := wasmer.NewValueTypes(wasmer.I32)
functionType := wasmer.NewFunctionType(params, results)
paramsValueTypes = functionType.Params()
```

#### func (\*FunctionType) [Results](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/functiontype.go#L79) [¶](#FunctionType.Results "Go to FunctionType.Results")

```
func (self *FunctionType) Results() []*ValueType
```

Results returns the results definitions from the FunctionType as a ValueType array

```
params := wasmer.NewValueTypes()
results := wasmer.NewValueTypes(wasmer.I32)
functionType := wasmer.NewFunctionType(params, results)
resultsValueTypes = functionType.Results()
```

#### type [Global](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/global.go#L15) [¶](#Global "Go to Global")

```
type Global struct {
	// contains filtered or unexported fields
}
```

- [See also](#hdr-See_also-Global)

Global stores a single value of the given GlobalType.

#### See also [¶](#hdr-See_also-Global "Go to See also")

[https://webassembly.github.io/spec/core/syntax/modules.html#globals](https://webassembly.github.io/spec/core/syntax/modules.html#globals)

#### func [NewGlobal](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/global.go#L40) [¶](#NewGlobal "Go to NewGlobal")

```
func NewGlobal(store *Store, ty *GlobalType, value Value) *Global
```

NewGlobal instantiates a new Global in the given Store.

It takes three arguments, the Store, the GlobalType and the Value for the Global.

```
valueType := NewValueType(I32)
globalType := NewGlobalType(valueType, CONST)
global := NewGlobal(store, globalType, NewValue(42, I32))
```

#### func (\*Global) [Get](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/global.go#L115) [¶](#Global.Get "Go to Global.Get")

```
func (self *Global) Get() (interface{}, error)
```

Get returns the Global's value as a native Go value.

```
global, _ := instance.Exports.GetGlobal("exported_global")
value, _ := global.Get()
```

#### func (\*Global) [IntoExtern](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/global.go#L67) [¶](#Global.IntoExtern "Go to Global.IntoExtern")

```
func (self *Global) IntoExtern() *Extern
```

IntoExtern converts the Global into an Extern.

```
global, _ := instance.Exports.GetGlobal("exported_global")
extern := global.IntoExtern()
```

#### func (\*Global) [Set](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/global.go#L93) [¶](#Global.Set "Go to Global.Set")

```
func (self *Global) Set(value interface{}, kind ValueKind) error
```

Set sets the Global's value.

It takes two arguments, the Global's value as a native Go value and the value's ValueKind.

```
global, _ := instance.Exports.GetGlobal("exported_global")
_ = global.Set(1, I32)
```

#### func (\*Global) [Type](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/global.go#L78) [¶](#Global.Type "Go to Global.Type")

```
func (self *Global) Type() *GlobalType
```

Type returns the Global's GlobalType.

```
global, _ := instance.Exports.GetGlobal("exported_global")
ty := global.Type()
```

#### type [GlobalMutability](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/globaltype.go#L7) [¶](#GlobalMutability "Go to GlobalMutability")

```
type GlobalMutability C.wasm_mutability_t
```

#### func (GlobalMutability) [String](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/globaltype.go#L22) [¶](#GlobalMutability.String "Go to GlobalMutability.String")

```
func (self GlobalMutability) String() string
```

String returns the GlobalMutability as a string.

```
IMMUTABLE.String() // "const"
MUTABLE.String()   // "var"
```

#### type [GlobalType](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/globaltype.go#L38) [¶](#GlobalType "Go to GlobalType")

```
type GlobalType struct {
	// contains filtered or unexported fields
}
```

- [See also](#hdr-See_also-GlobalType)

GlobalType classifies global variables, which hold a value and can either be mutable or immutable.

#### See also [¶](#hdr-See_also-GlobalType "Go to See also")

Specification: [https://webassembly.github.io/spec/core/syntax/types.html#global-types](https://webassembly.github.io/spec/core/syntax/types.html#global-types)

#### func [NewGlobalType](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/globaltype.go#L60) [¶](#NewGlobalType "Go to NewGlobalType")

```
func NewGlobalType(valueType *ValueType, mutability GlobalMutability) *GlobalType
```

NewGlobalType instantiates a new GlobalType from a ValueType and a GlobalMutability

```
valueType := NewValueType(I32)
globalType := NewGlobalType(valueType, IMMUTABLE)
```

#### func (\*GlobalType) [IntoExternType](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/globaltype.go#L112) [¶](#GlobalType.IntoExternType "Go to GlobalType.IntoExternType")

```
func (self *GlobalType) IntoExternType() *ExternType
```

IntoExternType converts the GlobalType into an ExternType.

```
valueType := NewValueType(I32)
globalType := NewGlobalType(valueType, IMMUTABLE)
externType = globalType.IntoExternType()
```

#### func (\*GlobalType) [Mutability](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/globaltype.go#L98) [¶](#GlobalType.Mutability "Go to GlobalType.Mutability")

```
func (self *GlobalType) Mutability() GlobalMutability
```

Mutability returns the GlobalType's GlobalMutability

```
valueType := NewValueType(I32)
globalType := NewGlobalType(valueType, IMMUTABLE)
globalType.Mutability().String() // "const"
```

#### func (\*GlobalType) [ValueType](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/globaltype.go#L84) [¶](#GlobalType.ValueType "Go to GlobalType.ValueType")

```
func (self *GlobalType) ValueType() *ValueType
```

ValueType returns the GlobalType's ValueType

```
valueType := NewValueType(I32)
globalType := NewGlobalType(valueType, IMMUTABLE)
globalType.ValueType().Kind().String() // "i32"
```

#### type [ImportObject](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/import_object.go#L12) [¶](#ImportObject "Go to ImportObject")

```
type ImportObject struct {
	// contains filtered or unexported fields
}
```

ImportObject contains all of the import data used when instantiating a WebAssembly module.

#### func [NewImportObject](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/import_object.go#L20) [¶](#NewImportObject "Go to NewImportObject")

```
func NewImportObject() *ImportObject
```

NewImportObject instantiates a new empty ImportObject.

```
imports := NewImportObject()
```

#### func (\*ImportObject) [ContainsNamespace](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/import_object.go#L58) [¶](#ImportObject.ContainsNamespace "Go to ImportObject.ContainsNamespace")

```
func (self *ImportObject) ContainsNamespace(name string) bool
```

ContainsNamespace returns true if the ImportObject contains the given namespace (or module name)

```
imports := NewImportObject()
_ = imports.ContainsNamespace("env") // false
```

#### func (\*ImportObject) [Register](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/import_object.go#L90) [¶](#ImportObject.Register "Go to ImportObject.Register")

```
func (self *ImportObject) Register(namespaceName string, namespace map[string]IntoExtern)
```

Register registers a namespace (or module name) in the ImportObject.

It takes two arguments: the namespace name and a map with imports names as key and externs as values.

Note:️ An extern is anything implementing IntoExtern: Function, Global, Memory, Table.

```
 imports := NewImportObject()
 importObject.Register(
 	"env",
 	map[string]wasmer.IntoExtern{
 		"host_function": hostFunction,
 		"host_global": hostGlobal,
 	},
)
```

Note:️ The namespace (or module name) may be empty:

```
imports := NewImportObject()
importObject.Register(
	"",
	map[string]wasmer.IntoExtern{
 		"host_function": hostFunction,
		"host_global": hostGlobal,
	},
)
```

#### type [ImportType](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/importtype.go#L52) [¶](#ImportType "Go to ImportType")

```
type ImportType struct {
	// contains filtered or unexported fields
}
```

ImportType is a descriptor for an imported value into a WebAssembly module.

#### func [NewImportType](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/importtype.go#L79) [¶](#NewImportType "Go to NewImportType")

```
func NewImportType(module string, name string, ty IntoExternType) *ImportType
```

NewImportType instantiates a new ImportType with a module name (or namespace), a name and an extern type.

Note:️ An extern type is anything implementing IntoExternType: FunctionType, GlobalType, MemoryType, TableType.

```
valueType := NewValueType(I32)
globalType := NewGlobalType(valueType, CONST)
importType := NewImportType("ns", "host_global", globalType)
```

#### func (\*ImportType) [Close](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/importtype.go#L156) [¶](#ImportType.Close "Go to ImportType.Close") added in v1.0.4

```
func (self *ImportType) Close()
```

Force to close the ImportType.

A runtime finalizer is registered on the ImportType, but it is possible to force the destruction of the ImportType by calling Close manually.

#### func (\*ImportType) [Module](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/importtype.go#L111) [¶](#ImportType.Module "Go to ImportType.Module")

```
func (self *ImportType) Module() string
```

Module returns the ImportType's module name (or namespace).

```
valueType := NewValueType(I32)
globalType := NewGlobalType(valueType, CONST)
importType := NewImportType("ns", "host_global", globalType)
_ = importType.Module()
```

#### func (\*ImportType) [Name](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/importtype.go#L127) [¶](#ImportType.Name "Go to ImportType.Name")

```
func (self *ImportType) Name() string
```

Name returns the ImportType's name.

```
valueType := NewValueType(I32)
globalType := NewGlobalType(valueType, CONST)
importType := NewImportType("ns", "host_global", globalType)
_ = importType.Name()
```

#### func (\*ImportType) [Type](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/importtype.go#L143) [¶](#ImportType.Type "Go to ImportType.Type")

```
func (self *ImportType) Type() *ExternType
```

Type returns the ImportType's type as an ExternType.

```
valueType := NewValueType(I32)
globalType := NewGlobalType(valueType, CONST)
importType := NewImportType("ns", "host_global", globalType)
_ = importType.Type()
```

#### type [Instance](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/instance.go#L7) [¶](#Instance "Go to Instance")

```
type Instance struct {
	Exports *Exports
	// contains filtered or unexported fields
}
```

#### func [NewInstance](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/instance.go#L29) [¶](#NewInstance "Go to NewInstance")

```
func NewInstance(module *Module, imports *ImportObject) (*Instance, error)
```

NewInstance instantiates a new Instance.

It takes two arguments, the Module and an ImportObject.

Note:️ Instantiating a module may return TrapError if the module's start function traps.

```
wasmBytes := []byte(`...`)
engine := wasmer.NewEngine()
store := wasmer.NewStore(engine)
module, err := wasmer.NewModule(store, wasmBytes)
importObject := wasmer.NewImportObject()
instance, err := wasmer.NewInstance(module, importObject)
```

#### func (\*Instance) [Close](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/instance.go#L80) [¶](#Instance.Close "Go to Instance.Close") added in v1.0.4

```
func (self *Instance) Close()
```

Force to close the Instance.

A runtime finalizer is registered on the Instance, but it is possible to force the destruction of the Instance by calling Close manually.

#### type [IntoExtern](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/extern.go#L16) [¶](#IntoExtern "Go to IntoExtern")

```
type IntoExtern interface {
	IntoExtern() *Extern
}
```

IntoExtern is an interface implemented by entity that can be imported of exported.

#### type [IntoExternType](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/externtype.go#L54) [¶](#IntoExternType "Go to IntoExternType")

```
type IntoExternType interface {
	IntoExternType() *ExternType
}
```

#### type [Limits](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/limits.go#L23) [¶](#Limits "Go to Limits")

```
type Limits struct {
	// contains filtered or unexported fields
}
```

- [See also](#hdr-See_also-Limits)

Limits classify the size range of resizeable storage associated with memory types and table types.

#### See also [¶](#hdr-See_also-Limits "Go to See also")

Specification: [https://webassembly.github.io/spec/core/syntax/types.html#limits](https://webassembly.github.io/spec/core/syntax/types.html#limits)

#### func [NewLimits](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/limits.go#L47) [¶](#NewLimits "Go to NewLimits")

```
func NewLimits(minimum uint32, maximum uint32) (*Limits, error)
```

NewLimits instantiates a new Limits which describes the Memory used. The minimum and maximum parameters are "number of memory pages".

️Note: Each page is 64 KiB in size.

Note: You cannot Memory.Grow the Memory beyond the maximum defined here.

#### func (\*Limits) [Maximum](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/limits.go#L76) [¶](#Limits.Maximum "Go to Limits.Maximum")

```
func (self *Limits) Maximum() uint32
```

Maximum returns the maximum size of the Memory allocated in "number of pages".

Each page is 64 KiB in size.

Note: You cannot Memory.Grow beyond this defined maximum size.

#### func (\*Limits) [Minimum](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/limits.go#L67) [¶](#Limits.Minimum "Go to Limits.Minimum")

```
func (self *Limits) Minimum() uint32
```

Minimum returns the minimum size of the Memory allocated in "number of pages".

Note:️ Each page is 64 KiB in size.

#### type [Memory](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/memory.go#L16) [¶](#Memory "Go to Memory")

```
type Memory struct {
	// contains filtered or unexported fields
}
```

- [See also](#hdr-See_also-Memory)

Memory is a vector of raw uninterpreted bytes.

#### See also [¶](#hdr-See_also-Memory "Go to See also")

Specification: [https://webassembly.github.io/spec/core/syntax/modules.html#memories](https://webassembly.github.io/spec/core/syntax/modules.html#memories)

#### func [NewMemory](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/memory.go#L42) [¶](#NewMemory "Go to NewMemory")

```
func NewMemory(store *Store, ty *MemoryType) *Memory
```

NewMemory instantiates a new Memory in the given Store.

It takes two arguments, the Store and the MemoryType for the Memory.

```
memory := wasmer.NewMemory(
    store,
    wasmer.NewMemoryType(wasmer.NewLimits(1, 4)),
)
```

#### func (\*Memory) [Data](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/memory.go#L99) [¶](#Memory.Data "Go to Memory.Data")

```
func (self *Memory) Data() []byte
```

Data returns the Memory's contents as an byte array.

```
memory, _ := instance.Exports.GetMemory("exported_memory")
data := memory.Data()
```

#### func (\*Memory) [DataSize](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/memory.go#L90) [¶](#Memory.DataSize "Go to Memory.DataSize")

```
func (self *Memory) DataSize() uint
```

Size returns the Memory's size as a number of bytes.

```
memory, _ := instance.Exports.GetMemory("exported_memory")
size := memory.DataSize()
```

#### func (\*Memory) [Grow](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/memory.go#L120) [¶](#Memory.Grow "Go to Memory.Grow")

```
func (self *Memory) Grow(delta Pages) bool
```

Grow grows the Memory's size by a given number of Pages (the delta).

```
memory, _ := instance.Exports.GetMemory("exported_memory")
grown := memory.Grow(2)
```

#### func (\*Memory) [IntoExtern](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/memory.go#L129) [¶](#Memory.IntoExtern "Go to Memory.IntoExtern")

```
func (self *Memory) IntoExtern() *Extern
```

IntoExtern converts the Memory into an Extern.

```
memory, _ := instance.Exports.GetMemory("exported_memory")
extern := memory.IntoExtern()
```

#### func (\*Memory) [Size](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/memory.go#L81) [¶](#Memory.Size "Go to Memory.Size")

```
func (self *Memory) Size() Pages
```

Size returns the Memory's size as Pages.

```
memory, _ := instance.Exports.GetMemory("exported_memory")
size := memory.Size()
```

#### func (\*Memory) [Type](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/memory.go#L68) [¶](#Memory.Type "Go to Memory.Type")

```
func (self *Memory) Type() *MemoryType
```

Type returns the Memory's MemoryType.

```
memory, _ := instance.Exports.GetMemory("exported_memory")
ty := memory.Type()
```

#### type [MemoryType](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/memorytype.go#L13) [¶](#MemoryType "Go to MemoryType")

```
type MemoryType struct {
	// contains filtered or unexported fields
}
```

- [See also](#hdr-See_also-MemoryType)

MemoryType classifies linear memories and their size range.

#### See also [¶](#hdr-See_also-MemoryType "Go to See also")

Specification: [https://webassembly.github.io/spec/core/syntax/types.html#memory-types](https://webassembly.github.io/spec/core/syntax/types.html#memory-types)

#### func [NewMemoryType](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/memorytype.go#L35) [¶](#NewMemoryType "Go to NewMemoryType")

```
func NewMemoryType(limits *Limits) *MemoryType
```

NewMemoryType instantiates a new MemoryType given some Limits.

```
limits := NewLimits(1, 4)
memoryType := NewMemoryType(limits)
```

#### func (\*MemoryType) [IntoExternType](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/memorytype.go#L73) [¶](#MemoryType.IntoExternType "Go to MemoryType.IntoExternType")

```
func (self *MemoryType) IntoExternType() *ExternType
```

IntoExternType converts the MemoryType into an ExternType.

```
limits := NewLimits(1, 4)
memoryType := NewMemoryType(limits)
externType = memoryType.IntoExternType()
```

#### func (\*MemoryType) [Limits](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/memorytype.go#L59) [¶](#MemoryType.Limits "Go to MemoryType.Limits")

```
func (self *MemoryType) Limits() *Limits
```

Limits returns the MemoryType's Limits.

```
limits := NewLimits(1, 4)
memoryType := NewMemoryType(limits)
_ = memoryType.Limits()
```

#### type [Module](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/module.go#L53) [¶](#Module "Go to Module")

```
type Module struct {
	// contains filtered or unexported fields
}
```

- [See also](#hdr-See_also-Module)

Module contains stateless WebAssembly code that has already been compiled and can be instantiated multiple times.

WebAssembly programs are organized into modules, which are the unit of deployment, loading, and compilation. A module collects definitions for types, functions, tables, memories, and globals. In addition, it can declare imports and exports and provide initialization logic in the form of data and element segments or a start function.

#### See also [¶](#hdr-See_also-Module "Go to See also")

Specification: [https://webassembly.github.io/spec/core/syntax/modules.html#modules](https://webassembly.github.io/spec/core/syntax/modules.html#modules)

#### func [DeserializeModule](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/module.go#L237) [¶](#DeserializeModule "Go to DeserializeModule")

```
func DeserializeModule(store *Store, bytes []byte) (*Module, error)
```

DeserializeModule deserializes an byte array to a Module.

```
wasmBytes := []byte(`...`)
engine := wasmer.NewEngine()
store := wasmer.NewStore(engine)
module, _ := wasmer.NewModule(store, wasmBytes)
bytes := module.Serialize()
//...
deserializedModule := wasmer.DeserializeModule(store, bytes)
```

#### func [NewModule](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/module.go#L71) [¶](#NewModule "Go to NewModule")

```
func NewModule(store *Store, bytes []byte) (*Module, error)
```

NewModule instantiates a new Module with the given Store.

It takes two arguments, the Store and the Wasm module as a byte array of WAT code.

```
wasmBytes := []byte(`...`)
engine := wasmer.NewEngine()
store := wasmer.NewStore(engine)
module, err := wasmer.NewModule(store, wasmBytes)
```

#### func (\*Module) [Close](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/module.go#L271) [¶](#Module.Close "Go to Module.Close") added in v1.0.4

```
func (self *Module) Close()
```

Force to close the Module.

A runtime finalizer is registered on the Module, but it is possible to force the destruction of the Module by calling Close manually.

#### func (\*Module) [Exports](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/module.go#L194) [¶](#Module.Exports "Go to Module.Exports")

```
func (self *Module) Exports() []*ExportType
```

Exports returns the Module's exports as an ExportType array.

```
wasmBytes := []byte(`...`)
engine := wasmer.NewEngine()
store := wasmer.NewStore(engine)
module, _ := wasmer.NewModule(store, wasmBytes)
exports := module.Exports()
```

#### func (\*Module) [Imports](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/module.go#L179) [¶](#Module.Imports "Go to Module.Imports")

```
func (self *Module) Imports() []*ImportType
```

Imports returns the Module's imports as an ImportType array.

```
wasmBytes := []byte(`...`)
engine := wasmer.NewEngine()
store := wasmer.NewStore(engine)
module, _ := wasmer.NewModule(store, wasmBytes)
imports := module.Imports()
```

#### func (\*Module) [Name](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/module.go#L160) [¶](#Module.Name "Go to Module.Name")

```
func (self *Module) Name() string
```

Name returns the Module's name.

Note:️ This is not part of the standard Wasm C API. It is Wasmer specific.

```
wasmBytes := []byte(`(module $moduleName)`)
engine := wasmer.NewEngine()
store := wasmer.NewStore(engine)
module, _ := wasmer.NewModule(store, wasmBytes)
name := module.Name()
```

#### func (\*Module) [Serialize](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/module.go#L209) [¶](#Module.Serialize "Go to Module.Serialize")

```
func (self *Module) Serialize() ([]byte, error)
```

Serialize serializes the module and returns the Wasm code as an byte array.

```
wasmBytes := []byte(`...`)
engine := wasmer.NewEngine()
store := wasmer.NewStore(engine)
module, _ := wasmer.NewModule(store, wasmBytes)
bytes := module.Serialize()
```

#### type [NativeFunction](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/function.go#L30) [¶](#NativeFunction "Go to NativeFunction")

```
type NativeFunction = func(...interface{}) (interface{}, error)
```

NativeFunction is a type alias representing a host function that can be called as any Go function.

#### type [Pages](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/pages.go#L7) [¶](#Pages "Go to Pages")

```
type Pages C.wasm_memory_pages_t
```

Units of WebAssembly pages (as specified to be 65,536 bytes).

#### func (\*Pages) [ToBytes](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/pages.go#L32) [¶](#Pages.ToBytes "Go to Pages.ToBytes")

```
func (self *Pages) ToBytes() uint
```

ToBytes converts a Pages to a native Go uint which is the Pages' size in bytes.

```
memory, _ := instance.Exports.GetMemory("exported_memory")
size := memory.Size().ToBytes()
```

#### func (\*Pages) [ToUint32](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/pages.go#L23) [¶](#Pages.ToUint32 "Go to Pages.ToUint32")

```
func (self *Pages) ToUint32() uint32
```

ToUint32 converts a Pages to a native Go uint32 which is the Pages' size.

```
memory, _ := instance.Exports.GetMemory("exported_memory")
size := memory.Size().ToUint32()
```

#### type [Store](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/store.go#L18) [¶](#Store "Go to Store")

```
type Store struct {
	Engine *Engine
	// contains filtered or unexported fields
}
```

- [See also](#hdr-See_also-Store)

Store represents all global state that can be manipulated by WebAssembly programs. It consists of the runtime representation of all instances of functions, tables, memories, and globals that have been allocated during the life time of the abstract machine.

The Store holds the Engine (that is — amongst many things — used to compile the Wasm bytes into a valid module artifact).

#### See also [¶](#hdr-See_also-Store "Go to See also")

Specification: [https://webassembly.github.io/spec/core/exec/runtime.html#store](https://webassembly.github.io/spec/core/exec/runtime.html#store)

#### func [NewStore](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/store.go#L27) [¶](#NewStore "Go to NewStore")

```
func NewStore(engine *Engine) *Store
```

NewStore instantiates a new Store with an Engine.

```
engine := NewEngine()
store := NewStore(engine)
```

#### func (\*Store) [Close](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/store.go#L48) [¶](#Store.Close "Go to Store.Close") added in v1.0.4

```
func (self *Store) Close()
```

Force to close the Store.

A runtime finalizer is registered on the Store, but it is possible to force the destruction of the Store by calling Close manually.

#### type [Table](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/table.go#L25) [¶](#Table "Go to Table")

```
type Table struct {
	// contains filtered or unexported fields
}
```

- [See also](#hdr-See_also-Table)

A table instance is the runtime representation of a table. It holds a vector of function elements and an optional maximum size, if one was specified in the table type at the table’s definition site.

#### See also [¶](#hdr-See_also-Table "Go to See also")

Specification: [https://webassembly.github.io/spec/core/exec/runtime.html#table-instances](https://webassembly.github.io/spec/core/exec/runtime.html#table-instances)

#### func (\*Table) [IntoExtern](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/table.go#L68) [¶](#Table.IntoExtern "Go to Table.IntoExtern")

```
func (self *Table) IntoExtern() *Extern
```

IntoExtern converts the Table into an Extern.

```
table, _ := instance.Exports.GetTable("exported_table")
extern := table.IntoExtern()
```

#### func (\*Table) [Size](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/table.go#L59) [¶](#Table.Size "Go to Table.Size")

```
func (self *Table) Size() TableSize
```

Size returns the Table's size.

```
table, _ := instance.Exports.GetTable("exported_table")
size := table.Size()
```

#### type [TableSize](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/table.go#L8) [¶](#TableSize "Go to TableSize")

```
type TableSize C.wasm_table_size_t
```

TableSize represents the size of a table.

#### func (\*TableSize) [ToUint32](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/table.go#L14) [¶](#TableSize.ToUint32 "Go to TableSize.ToUint32")

```
func (self *TableSize) ToUint32() uint32
```

ToUint32 converts a TableSize to a native Go uint32.

```
table, _ := instance.Exports.GetTable("exported_table")
size := table.Size().ToUint32()
```

#### type [TableType](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/tabletype.go#L13) [¶](#TableType "Go to TableType")

```
type TableType struct {
	// contains filtered or unexported fields
}
```

- [See also](#hdr-See_also-TableType)

TableType classifies tables over elements of element types within a size range.

#### See also [¶](#hdr-See_also-TableType "Go to See also")

Specification: [https://webassembly.github.io/spec/core/syntax/types.html#table-types](https://webassembly.github.io/spec/core/syntax/types.html#table-types)

#### func [NewTableType](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/tabletype.go#L37) [¶](#NewTableType "Go to NewTableType")

```
func NewTableType(valueType *ValueType, limits *Limits) *TableType
```

NewTableType instantiates a new TableType given a ValueType and some Limits.

```
valueType := NewValueType(I32)
limits := NewLimits(1, 4)
tableType := NewTableType(valueType, limits)
_ = tableType.IntoExternType()
```

#### func (\*TableType) [IntoExternType](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/tabletype.go#L92) [¶](#TableType.IntoExternType "Go to TableType.IntoExternType")

```
func (self *TableType) IntoExternType() *ExternType
```

IntoExternType converts the TableType into an ExternType.

```
valueType := NewValueType(I32)
limits := NewLimits(1, 4)
tableType := NewTableType(valueType, limits)
_ = tableType.IntoExternType()
```

#### func (\*TableType) [Limits](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/tabletype.go#L77) [¶](#TableType.Limits "Go to TableType.Limits")

```
func (self *TableType) Limits() *Limits
```

Limits returns the TableType's Limits.

```
valueType := NewValueType(I32)
limits := NewLimits(1, 4)
tableType := NewTableType(valueType, limits)
_ = tableType.Limits()
```

#### func (\*TableType) [ValueType](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/tabletype.go#L62) [¶](#TableType.ValueType "Go to TableType.ValueType")

```
func (self *TableType) ValueType() *ValueType
```

ValueType returns the TableType's ValueType.

```
valueType := NewValueType(I32)
limits := NewLimits(1, 4)
tableType := NewTableType(valueType, limits)
_ = tableType.ValueType()
```

#### type [Target](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/target.go#L8) [¶](#Target "Go to Target")

```
type Target struct {
	// contains filtered or unexported fields
}
```

Target represents a triple + CPU features pairs.

#### func [NewTarget](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/target.go#L29) [¶](#NewTarget "Go to NewTarget")

```
func NewTarget(triple *Triple, cpuFeatures *CpuFeatures) *Target
```

NewTarget creates a new target.

```
triple, err := NewTriple("aarch64-unknown-linux-gnu")
cpuFeatures := NewCpuFeatures()
target := NewTarget(triple, cpuFeatures)
```

#### type [Trace](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/trap.go#L184) [¶](#Trace "Go to Trace") added in v1.0.2

```
type Trace struct {
	// contains filtered or unexported fields
}
```

Trace represents a WebAssembly trap.

#### type [Trap](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/trap.go#L22) [¶](#Trap "Go to Trap")

```
type Trap struct {
	// contains filtered or unexported fields
}
```

Trap stores trace message with backtrace when an error happened.

#### func [NewTrap](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/trap.go#L51) [¶](#NewTrap "Go to NewTrap")

```
func NewTrap(store *Store, message string) *Trap
```

Creates a new trap with a message.

```
engine := wasmer.NewEngine()
store := wasmer.NewStore(engine)
trap := NewTrap(store, "oops")
```

#### func (\*Trap) [Message](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/trap.go#L81) [¶](#Trap.Message "Go to Trap.Message")

```
func (self *Trap) Message() string
```

Message returns the message attached to the current Trap.

#### func (\*Trap) [Origin](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/trap.go#L97) [¶](#Trap.Origin "Go to Trap.Origin")

```
func (self *Trap) Origin() *Frame
```

Origin returns the top frame of WebAssembly stack responsible for this trap.

```
frame := trap.Origin()
```

#### func (\*Trap) [Trace](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/trap.go#L110) [¶](#Trap.Trace "Go to Trap.Trace")

```
func (self *Trap) Trace() *Trace
```

Trace returns the trace of WebAssembly frames for this trap.

#### type [TrapError](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/error.go#L61) [¶](#TrapError "Go to TrapError")

```
type TrapError struct {
	// contains filtered or unexported fields
}
```

- [See also](#hdr-See_also-TrapError)

TrapError represents a trap produced during Wasm execution.

#### See also [¶](#hdr-See_also-TrapError "Go to See also")

Specification: [https://webassembly.github.io/spec/core/intro/overview.html#trap](https://webassembly.github.io/spec/core/intro/overview.html#trap)

#### func (\*TrapError) [Error](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/error.go#L78) [¶](#TrapError.Error "Go to TrapError.Error")

```
func (self *TrapError) Error() string
```

Error returns the TrapError's message.

#### func (\*TrapError) [Origin](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/error.go#L83) [¶](#TrapError.Origin "Go to TrapError.Origin")

```
func (self *TrapError) Origin() *Frame
```

Origin returns the TrapError's origin as a Frame.

#### func (\*TrapError) [Trace](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/error.go#L88) [¶](#TrapError.Trace "Go to TrapError.Trace")

```
func (self *TrapError) Trace() []*Frame
```

Trace returns the TrapError's trace as a Frame array.

#### type [Triple](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/target.go#L39) [¶](#Triple "Go to Triple")

```
type Triple struct {
	// contains filtered or unexported fields
}
```

Triple; historically such things had three fields, though they have added additional fields over time.

#### func [NewTriple](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/target.go#L59) [¶](#NewTriple "Go to NewTriple")

```
func NewTriple(triple string) (*Triple, error)
```

NewTriple creates a new triple, otherwise it returns an error specifying why the provided triple isn't valid.

```
triple, err := NewTriple("aarch64-unknown-linux-gnu")
```

#### func [NewTripleFromHost](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/target.go#L79) [¶](#NewTripleFromHost "Go to NewTripleFromHost")

```
func NewTripleFromHost() *Triple
```

NewTripleFromHost creates a new triple from the current host.

#### type [Value](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/value.go#L41) [¶](#Value "Go to Value")

```
type Value struct {
	// contains filtered or unexported fields
}
```

- [See Also](#hdr-See_Also-Value)

Value; WebAssembly computations manipulate values of basic value types:

• Integer (32 or 64 bit width),

• Floating-point (32 or 64 bit width),

• Vectors (128 bits, with 32 or 64 bit lanes).

#### See Also [¶](#hdr-See_Also-Value "Go to See Also")

Specification: [https://webassembly.github.io/spec/core/exec/runtime.html#values](https://webassembly.github.io/spec/core/exec/runtime.html#values)

#### func [NewF32](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/value.go#L91) [¶](#NewF32 "Go to NewF32")

```
func NewF32(value interface{}) Value
```

NewF32 instantiates a new F32 Value with the given value.

Note: If a Wasm value cannot be created from the given value, NewF32 will panic.

```
value := NewF32(4.2)
```

#### func [NewF64](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/value.go#L101) [¶](#NewF64 "Go to NewF64")

```
func NewF64(value interface{}) Value
```

NewF64 instantiates a new F64 Value with the given value.

Note: If a Wasm value cannot be created from the given value, NewF64 will panic.

```
value := NewF64(4.2)
```

#### func [NewI32](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/value.go#L71) [¶](#NewI32 "Go to NewI32")

```
func NewI32(value interface{}) Value
```

NewI32 instantiates a new I32 Value with the given value.

Note: If a Wasm value cannot be created from the given value, NewI32 will panic.

```
value := NewI32(42)
```

#### func [NewI64](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/value.go#L81) [¶](#NewI64 "Go to NewI64")

```
func NewI64(value interface{}) Value
```

NewI64 instantiates a new I64 Value with the given value.

Note: If a Wasm value cannot be created from the given value, NewI64 will panic.

```
value := NewI64(42)
```

#### func [NewValue](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/value.go#L55) [¶](#NewValue "Go to NewValue")

```
func NewValue(value interface{}, kind ValueKind) Value
```

NewValue instantiates a new Value with the given value and ValueKind.

Note: If a Wasm value cannot be created from the given value,

```
value := NewValue(42, I32)
```

#### func (\*Value) [F32](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/value.go#L165) [¶](#Value.F32 "Go to Value.F32")

```
func (self *Value) F32() float32
```

F32 returns the Value's value as a native Go float32.

Note: It panics if the value is not of type F32.

```
value := NewF32(4.2)
_ = value.F32()
```

#### func (\*Value) [F64](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/value.go#L182) [¶](#Value.F64 "Go to Value.F64")

```
func (self *Value) F64() float64
```

F64 returns the Value's value as a native Go float64.

Note: It panics if the value is not of type F64.

```
value := NewF64(4.2)
_ = value.F64()
```

#### func (\*Value) [I32](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/value.go#L131) [¶](#Value.I32 "Go to Value.I32")

```
func (self *Value) I32() int32
```

I32 returns the Value's value as a native Go int32.

Note: It panics if the value is not of type I32.

```
value := NewI32(42)
_ = value.I32()
```

#### func (\*Value) [I64](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/value.go#L148) [¶](#Value.I64 "Go to Value.I64")

```
func (self *Value) I64() int64
```

I64 returns the Value's value as a native Go int64.

Note: It panics if the value is not of type I64.

```
value := NewI64(42)
_ = value.I64()
```

#### func (\*Value) [Kind](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/value.go#L113) [¶](#Value.Kind "Go to Value.Kind")

```
func (self *Value) Kind() ValueKind
```

Kind returns the Value's ValueKind.

```
value := NewF64(4.2)
_ = value.Kind()
```

#### func (\*Value) [Unwrap](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/value.go#L121) [¶](#Value.Unwrap "Go to Value.Unwrap")

```
func (self *Value) Unwrap() interface{}
```

Unwrap returns the Value's value as a native Go value.

```
value := NewF64(4.2)
_ = value.Unwrap()
```

#### type [ValueKind](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/valuetype.go#L11) [¶](#ValueKind "Go to ValueKind")

```
type ValueKind C.wasm_valkind_t
```

ValueKind represents the kind of a value.

#### func (ValueKind) [IsNumber](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/valuetype.go#L70) [¶](#ValueKind.IsNumber "Go to ValueKind.IsNumber")

```
func (self ValueKind) IsNumber() bool
```

IsNumber returns true if the ValueKind is a number type.

```
I32.IsNumber()     // true
I64.IsNumber()     // true
F32.IsNumber()     // true
F64.IsNumber()     // true
AnyRef.IsNumber()  // false
FuncRef.IsNumber() // false
```

#### func (ValueKind) [IsReference](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/valuetype.go#L82) [¶](#ValueKind.IsReference "Go to ValueKind.IsReference")

```
func (self ValueKind) IsReference() bool
```

IsReference returns true if the ValueKind is a reference.

```
I32.IsReference()     // false
I64.IsReference()     // false
F32.IsReference()     // false
F64.IsReference()     // false
AnyRef.IsReference()  // true
FuncRef.IsReference() // true
```

#### func (ValueKind) [String](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/valuetype.go#L44) [¶](#ValueKind.String "Go to ValueKind.String")

```
func (self ValueKind) String() string
```

String returns the ValueKind as a string.

```
I32.String()     // "i32"
I64.String()     // "i64"
F32.String()     // "f32"
F64.String()     // "f64"
AnyRef.String()  // "anyref"
FuncRef.String() // "funcref"
```

#### type [ValueType](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/valuetype.go#L92) [¶](#ValueType "Go to ValueType")

```
type ValueType struct {
	// contains filtered or unexported fields
}
```

ValueType classifies the individual values that WebAssembly code can compute with and the values that a variable accepts.

#### func [NewValueType](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/valuetype.go#L100) [¶](#NewValueType "Go to NewValueType")

```
func NewValueType(kind ValueKind) *ValueType
```

NewValueType instantiates a new ValueType given a ValueKind.

```
valueType := NewValueType(I32)
```

#### func [NewValueTypes](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/valuetype.go#L146) [¶](#NewValueTypes "Go to NewValueTypes")

```
func NewValueTypes(kinds ...ValueKind) []*ValueType
```

NewValueTypes instantiates a new ValueType array from a list of ValueKind. Not that the list may be empty.

```
valueTypes := NewValueTypes(I32, I64, F32)
```

Note:️ NewValueTypes is specifically designed to help you declare function types, e.g. with NewFunctionType:

```
functionType := NewFunctionType(
	NewValueTypes(), // arguments
	NewValueTypes(I32), // results
)
```

#### func (\*ValueType) [Kind](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/valuetype.go#L126) [¶](#ValueType.Kind "Go to ValueType.Kind")

```
func (self *ValueType) Kind() ValueKind
```

Kind returns the ValueType's ValueKind

```
valueType := NewValueType(I32)
_ = valueType.Kind()
```

#### type [WasiEnvironment](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/wasi.go#L264) [¶](#WasiEnvironment "Go to WasiEnvironment")

```
type WasiEnvironment struct {
	// contains filtered or unexported fields
}
```

WasiEnvironment represents the environment provided to the WASI imports (see NewFunctionWithEnvironment which is designed for user-defined host function; that's the same idea here but applied to WASI functions and other imports).

#### func (\*WasiEnvironment) [GenerateImportObject](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/wasi.go#L356) [¶](#WasiEnvironment.GenerateImportObject "Go to WasiEnvironment.GenerateImportObject")

```
func (self *WasiEnvironment) GenerateImportObject(store *Store, module *Module) (*ImportObject, error)
```

GenerateImportObject generates an import object, that can be extended and passed to NewInstance.

```
wasiEnv, _ := NewWasiStateBuilder("test-program").
	Argument("--foo").
	Environment("ABC", "DEF").
	Environment("X", "ZY").
	MapDirectory("the_host_current_directory", ".").
	Finalize()

importObject, _ := wasiEnv.GenerateImportObject(store, module)
instance, _ := NewInstance(module, importObject)
start, _ := instance.Exports.GetWasiStartFunction()

start()
```

#### func (\*WasiEnvironment) [ReadStderr](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/wasi.go#L334) [¶](#WasiEnvironment.ReadStderr "Go to WasiEnvironment.ReadStderr") added in v1.0.2

```
func (self *WasiEnvironment) ReadStderr() []byte
```

ReadStderr reads the WASI module stderr if captured with WasiStateBuilder.CaptureStderr. See ReadStdout to see an example.

#### func (\*WasiEnvironment) [ReadStdout](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/wasi.go#L325) [¶](#WasiEnvironment.ReadStdout "Go to WasiEnvironment.ReadStdout") added in v1.0.2

```
func (self *WasiEnvironment) ReadStdout() []byte
```

ReadStdout reads the WASI module stdout if captured with WasiStateBuilder.CaptureStdout

```
wasiEnv, _ := NewWasiStateBuilder("test-program").
	Argument("--foo").
	Environment("ABC", "DEF").
	Environment("X", "ZY").
	MapDirectory("the_host_current_directory", ".").
	CaptureStdout().
	Finalize()

importObject, _ := wasiEnv.GenerateImportObject(store, module)
instance, _ := NewInstance(module, importObject)
start, _ := instance.Exports.GetWasiStartFunction()

start()

stdout := string(wasiEnv.ReadStdout())
```

#### type [WasiStateBuilder](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/wasi.go#L110) [¶](#WasiStateBuilder "Go to WasiStateBuilder")

```
type WasiStateBuilder struct {
	// contains filtered or unexported fields
}
```

WasiStateBuilder is a convenient API for configuring WASI.

#### func [NewWasiStateBuilder](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/wasi.go#L118) [¶](#NewWasiStateBuilder "Go to NewWasiStateBuilder")

```
func NewWasiStateBuilder(programName string) *WasiStateBuilder
```

NewWasiStateBuilder creates a new WASI state builder, starting by configuring the WASI program name.

```
wasiStateBuilder := NewWasiStateBuilder("test-program")
```

#### func (\*WasiStateBuilder) [Argument](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/wasi.go#L134) [¶](#WasiStateBuilder.Argument "Go to WasiStateBuilder.Argument") added in v1.0.1

```
func (self *WasiStateBuilder) Argument(argument string) *WasiStateBuilder
```

Argument configures a new argument to the WASI module.

```
wasiStateBuilder := NewWasiStateBuilder("test-program").
	Argument("--foo")
```

#### func (\*WasiStateBuilder) [CaptureStderr](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/wasi.go#L226) [¶](#WasiStateBuilder.CaptureStderr "Go to WasiStateBuilder.CaptureStderr") added in v1.0.1

```
func (self *WasiStateBuilder) CaptureStderr() *WasiStateBuilder
```

CaptureStderr configures the WASI module to capture its stderr.

#### func (\*WasiStateBuilder) [CaptureStdout](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/wasi.go#L211) [¶](#WasiStateBuilder.CaptureStdout "Go to WasiStateBuilder.CaptureStdout") added in v1.0.1

```
func (self *WasiStateBuilder) CaptureStdout() *WasiStateBuilder
```

CaptureStdout configures the WASI module to capture its stdout.

```
wasiStateBuilder := NewWasiStateBuilder("test-program").
	Argument("--foo").
	Environment("KEY", "VALUE").
	MapDirectory("the_host_current_directory", ".")
	CaptureStdout()
```

#### func (\*WasiStateBuilder) [Environment](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/wasi.go#L147) [¶](#WasiStateBuilder.Environment "Go to WasiStateBuilder.Environment") added in v1.0.1

```
func (self *WasiStateBuilder) Environment(key string, value string) *WasiStateBuilder
```

Environment configures a new environment variable for the WASI module.

```
wasiStateBuilder := NewWasiStateBuilder("test-program").
	Argument("--foo").
	Environment("KEY", "VALUE")
```

#### func (\*WasiStateBuilder) [Finalize](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/wasi.go#L252) [¶](#WasiStateBuilder.Finalize "Go to WasiStateBuilder.Finalize") added in v1.0.1

```
func (self *WasiStateBuilder) Finalize() (*WasiEnvironment, error)
```

Finalize tells the state builder to produce a WasiEnvironment. It consumes the current WasiStateBuilder.

It can return an error if the state builder contains invalid configuration.

```
wasiEnvironment, err := NewWasiStateBuilder("test-program").
	Argument("--foo").
	Environment("KEY", "VALUE").
	MapDirectory("the_host_current_directory", ".")
	CaptureStdout().
  Finalize()
```

#### func (\*WasiStateBuilder) [InheritStderr](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/wasi.go#L234) [¶](#WasiStateBuilder.InheritStderr "Go to WasiStateBuilder.InheritStderr") added in v1.0.1

```
func (self *WasiStateBuilder) InheritStderr() *WasiStateBuilder
```

InheritStderr configures the WASI module to inherit the stderr from the host.

#### func (\*WasiStateBuilder) [InheritStdin](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/wasi.go#L198) [¶](#WasiStateBuilder.InheritStdin "Go to WasiStateBuilder.InheritStdin") added in v1.0.1

```
func (self *WasiStateBuilder) InheritStdin() *WasiStateBuilder
```

InheritStdin configures the WASI module to inherit the stdin from the host.

#### func (\*WasiStateBuilder) [InheritStdout](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/wasi.go#L219) [¶](#WasiStateBuilder.InheritStdout "Go to WasiStateBuilder.InheritStdout") added in v1.0.1

```
func (self *WasiStateBuilder) InheritStdout() *WasiStateBuilder
```

InheritStdout configures the WASI module to inherit the stdout from the host.

#### func (\*WasiStateBuilder) [MapDirectory](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/wasi.go#L184) [¶](#WasiStateBuilder.MapDirectory "Go to WasiStateBuilder.MapDirectory") added in v1.0.1

```
func (self *WasiStateBuilder) MapDirectory(alias string, directory string) *WasiStateBuilder
```

MapDirectory configures a new directory to pre-open with a different name exposed to the WASI module.

```
wasiStateBuilder := NewWasiStateBuilder("test-program").
	Argument("--foo").
	Environment("KEY", "VALUE").
	MapDirectory("the_host_current_directory", ".")
```

#### func (\*WasiStateBuilder) [PreopenDirectory](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/wasi.go#L168) [¶](#WasiStateBuilder.PreopenDirectory "Go to WasiStateBuilder.PreopenDirectory") added in v1.0.1

```
func (self *WasiStateBuilder) PreopenDirectory(preopenDirectory string) *WasiStateBuilder
```

PreopenDirectory configures a new directory to pre-open.

This opens the given directory at the virtual root /, and allows the WASI module to read and write to the given directory.

```
wasiStateBuilder := NewWasiStateBuilder("test-program").
	Argument("--foo").
	Environment("KEY", "VALUE").
	PreopenDirectory("bar")
```

#### type [WasiVersion](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/wasi.go#L63) [¶](#WasiVersion "Go to WasiVersion")

```
type WasiVersion C.wasi_version_t
```

WasiVersion represents the possible WASI versions.

#### func [GetWasiVersion](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/wasi.go#L105) [¶](#GetWasiVersion "Go to GetWasiVersion")

```
func GetWasiVersion(module *Module) WasiVersion
```

GetWasiVersion returns the WASI version of the given Module if any, WASI\_VERSION\_INVALID otherwise.

```
wasiVersion := GetWasiVersion(module)
```

#### func (WasiVersion) [String](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/wasi.go#L87) [¶](#WasiVersion.String "Go to WasiVersion.String")

```
func (self WasiVersion) String() string
```

String returns the WasiVersion as a string.

```
WASI_VERSION_SNAPSHOT0.String() //  "wasi_unstable"
WASI_VERSION_SNAPSHOT1.String() // "wasi_snapshot_preview1"
```

## ![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzQ1NUE2NCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE0IDJINmMtMS4xIDAtMS45OS45LTEuOTkgMkw0IDIwYzAgMS4xLjg5IDIgMS45OSAySDE4YzEuMSAwIDItLjkgMi0yVjhsLTYtNnpNNiAyMFY0aDd2NWg1djExSDZ6Ii8+PC9zdmc+) Source Files [¶](#section-sourcefiles "Go to Source Files")

[View all Source files](https://github.com/wasmerio/wasmer-go/tree/v1.0.4/wasmer)

- [cgo.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/cgo.go "cgo.go")
- [config.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/config.go "config.go")
- [engine.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/engine.go "engine.go")
- [error.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/error.go "error.go")
- [exports.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/exports.go "exports.go")
- [exporttype.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/exporttype.go "exporttype.go")
- [extern.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/extern.go "extern.go")
- [externtype.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/externtype.go "externtype.go")
- [function.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/function.go "function.go")
- [functiontype.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/functiontype.go "functiontype.go")
- [global.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/global.go "global.go")
- [globaltype.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/globaltype.go "globaltype.go")
- [import\_object.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/import_object.go "import_object.go")
- [importtype.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/importtype.go "importtype.go")
- [instance.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/instance.go "instance.go")
- [limits.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/limits.go "limits.go")
- [memory.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/memory.go "memory.go")
- [memorytype.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/memorytype.go "memorytype.go")
- [module.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/module.go "module.go")
- [name.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/name.go "name.go")
- [pages.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/pages.go "pages.go")
- [store.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/store.go "store.go")
- [table.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/table.go "table.go")
- [tabletype.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/tabletype.go "tabletype.go")
- [target.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/target.go "target.go")
- [trap.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/trap.go "trap.go")
- [value.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/value.go "value.go")
- [valuetype.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/valuetype.go "valuetype.go")
- [wasi.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/wasi.go "wasi.go")
- [wasmer.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/wasmer.go "wasmer.go")
- [wat.go](https://github.com/wasmerio/wasmer-go/blob/v1.0.4/wasmer/wat.go "wat.go")

## ![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzQ1NUE2NCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTIwIDZoLThsLTItMkg0Yy0xLjEgMC0xLjk5LjktMS45OSAyTDIgMThjMCAxLjEuOSAyIDIgMmgxNmMxLjEgMCAyLS45IDItMlY4YzAtMS4xLS45LTItMi0yem0wIDEySDRWOGgxNnYxMHoiLz48L3N2Zz4=) Directories [¶](#section-directories "Go to Directories")

Show internal Expand all

Path Synopsis

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzQ1NUE2NCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEwIDE3bDUtNS01LTV2MTB6Ii8+PC9zdmc+) packaged

[include](https://pkg.go.dev/github.com/wasmerio/wasmer-go@v1.0.4/wasmer/packaged/include)

See https://github.com/golang/go/issues/26366.

See https://github.com/golang/go/issues/26366.

[lib](https://pkg.go.dev/github.com/wasmerio/wasmer-go@v1.0.4/wasmer/packaged/lib)

See https://github.com/golang/go/issues/26366.

See https://github.com/golang/go/issues/26366.

[lib/darwin-aarch64](https://pkg.go.dev/github.com/wasmerio/wasmer-go@v1.0.4/wasmer/packaged/lib/darwin-aarch64)

See https://github.com/golang/go/issues/26366.

See https://github.com/golang/go/issues/26366.

[lib/darwin-amd64](https://pkg.go.dev/github.com/wasmerio/wasmer-go@v1.0.4/wasmer/packaged/lib/darwin-amd64)

See https://github.com/golang/go/issues/26366.

See https://github.com/golang/go/issues/26366.

[lib/linux-aarch64](https://pkg.go.dev/github.com/wasmerio/wasmer-go@v1.0.4/wasmer/packaged/lib/linux-aarch64)

See https://github.com/golang/go/issues/26366.

See https://github.com/golang/go/issues/26366.

[lib/linux-amd64](https://pkg.go.dev/github.com/wasmerio/wasmer-go@v1.0.4/wasmer/packaged/lib/linux-amd64)

See https://github.com/golang/go/issues/26366.

See https://github.com/golang/go/issues/26366.

Click to show internal directories.

Click to hide internal directories.

[Why Go](https://go.dev/solutions) [Use Cases](https://go.dev/solutions#use-cases) [Case Studies](https://go.dev/solutions#case-studies)

[Get Started](https://learn.go.dev/) [Playground](https://play.golang.org) [Tour](https://tour.golang.org) [Stack Overflow](https://stackoverflow.com/questions/tagged/go?tab=Newest) [Help](https://go.dev/help)

[Packages](https://pkg.go.dev) [Standard Library](https://pkg.go.dev/std) [Sub-repositories](https://pkg.go.dev/golang.org/x) [About Go Packages](https://pkg.go.dev/about)

[About](https://go.dev/project) [Download](https://go.dev/dl/) [Blog](https://go.dev/blog) [Issue Tracker](https://github.com/golang/go/issues) [Release Notes](https://go.dev/doc/devel/release.html) [Brand Guidelines](https://blog.golang.org/go-brand) [Code of Conduct](https://go.dev/conduct)

[Connect](https://www.twitter.com/golang) [Twitter](https://www.twitter.com/golang) [GitHub](https://github.com/golang) [Slack](https://invite.slack.golangbridge.org/) [r/golang](https://reddit.com/r/golang) [Meetup](https://www.meetup.com/pro/go) [Golang Weekly](https://golangweekly.com/)

![Gopher in flight goggles](data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTQzMSA5MDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1taXRlcmxpbWl0PSIyIj48cGF0aCBkPSJNMzM1LjYgODY3LjhjLS42LTMzLTEuMS00Ny43LTIuMi02OS42LS42LTEwLjYtLjctMTEuMi0yLjQtMTAtMSAuNy01LjcgNC42LTEwLjYgOC42LTE1LjQgMTIuNS0yNS4xIDE2LjItNDcuNCAxNy43LTEyLjcuOS0xNy4yIDIuMS0zMiA5LTcuNSAzLjUtMTUuNSA2LjgtMTcuOCA3LjUtMy4xLjgtMTUuNi45LTQ1IC40bC00MC43LS43LTkuNSA0Yy0xOC40IDcuOC0zMS45IDExLTQxLjUgOS44LTktMS4yLTIxLjQtNC40LTI2LjQtNy0xMS41LTUuOC0yMy4xLTE4LjMtMzguOC00Mi0xOS43LTI5LjYtMjQuNi00Mi0xOS4yLTQ4LjkgMS4yLTEuNSA0LjktNC4xIDguMy01LjggMTEuMy01LjYgMTEuOS02LjQgMTQuMS0xNy4xIDEuMi02IDcuMy04LjQgMTMuMy01LjMgMy43IDIgOS40IDguMSAxMy40IDE0LjYgNC40IDcuMSA0LjYgNy41IDYuOSAyMC41IDIuOCAxNS41IDguNSAzOC45IDEwLjggNDQgMS44IDQgMi40IDQuNSA3LjcgNi4xIDguNSAyLjQgMjMuNSAxLjUgMzIuOS0yLjEgMy45LTEuNCAxMi4yLTQgMTguNS01LjYgMTEuMS0yLjkgMTIuNS0zLjEgMzYuNS0zLjQgMzUtLjQgNTQuOC0zLjYgNjIuNS0xMC4xIDctNS45IDI4LTU2LjEgMzUuNC04NC44IDUuMi0xOS43IDUuNy0zMC45IDIuMi00Ni41LTUuMy0yMy40LTEzLjMtNzcuOC0xNC4zLTk2LjYtLjYtMTEuNSAxLTIzLjMgNi00NmwyLjItMTAtNS4xLTUuMmMtNi4yLTYuMS0xMS40LTE1LjEtMTQuNC0yNC44LTMtOS42LTMuOC0yOC4xLTEuNi0zOC40LjktNC4xIDEuNS03LjUgMS4zLTcuNi0uMS0uMS0zLjEtMi4yLTYuNy00LjctMjItMTUuNC0zMy4xLTM2LjQtMzMuMy02Mi44LS4xLTEzLjYgMS4zLTIyLjggNS45LTM3IDQuNi0xNC41IDEwLjgtMjQuNiAyMS4zLTM1IDEwLjEtMTAgMTguMS0xNC45IDMwLjgtMTkgMTMuMS00LjIgMjAuOC01LjMgMzguMy01LjNoMTUuNmwyLjMtMTEuMWMzLjQtMTYuMyA4LjYtMzIuOSAxMy43LTQzLjQgNy41LTE1LjUgMjAuNS0yNyA0NS4xLTM5LjkgOC41LTQuNCAxMi42LTcuNCAxOS4zLTEzLjggNS4zLTUuMSAxNC41LTEyLjEgMjQuNS0xOC44IDE4LjMtMTIuMSAzNS44LTI2LjcgNDcuMi0zOS40IDExLjMtMTIuNyAxNC42LTE1LjYgMjYuOC0yMy43IDE4LjgtMTIuNSA1NS0zMS44IDc5LjEtNDIuMSAxNC42LTYuMyAyMy04LjMgNjIuNC0xNC45IDE4LjQtMy4yIDM5LjEtNi45IDQ2LTguNEM2ODkuMi42IDY5MC4zLjUgNzIzLjUuNWMzNS45IDAgNTEuMi45IDgyLjUgNS4xIDIxLjEgMi44IDM0LjYgNiA0NCAxMC4yIDYuOSAzLjIgMzQuNSAxMy4zIDYyIDIyLjcgNDMuNyAxNS4xIDU3IDE5LjkgNjIuNSAyMi43IDE0LjIgNy4xIDM2LjEgMjQuNyA3MCA1Ni4zIDIwLjIgMTguOCAyMiAyMC4yIDQyLjkgMzQuNSAzMi4zIDIyIDM1LjQgMjYuMiA0OC43IDY3LjUgMTIuMyAzOC4yIDExIDM1IDE0LjUgMzQuOCA1LjYtLjMgMjQuNiAxLjcgMzEuMyAzLjMgMy42LjggMTEuMiAzLjggMTYuOCA2LjUgMjEuOCAxMC43IDM1LjMgMjguOCA0My4xIDU3LjggMi4xIDguMSAyLjYgMTEuOCAyLjYgMjQuMS4xIDEzLjQtLjEgMTUuMi0yLjggMjMuMy00LjYgMTQtMTQuMyAyNy4xLTI1LjYgMzQuOGwtNS4xIDMuNC44IDEwYzEuMyAxNi40LjggMzktMS4xIDQ4LjQtMS44IDguOS02LjEgMTkuMy05LjIgMjIuNS0xLjYgMS43LTEuOCAzLjItMS42IDEwLjIuNCA4LjEtMS42IDI2LjktNC4zIDQwLjctMS4zIDctMS4zIDcuMyAxIDExLjIgMS4zIDIuMiA1LjEgNy4yIDguNSAxMSAzLjQgMy45IDcgOC43IDguMSAxMC44IDUuNSAxMC40IDguNiAzNS40IDcuNSA2MC0xLjMgMjkuMy00LjggNDAuOS0yNi42IDg2LjQtOC42IDE4LTExLjQgMjUuNi0xMC42IDI5LjcuOCA0LjMgNS4zIDEwLjcgMTAuNiAxNS4xIDYuNyA1LjYgMjkgMjAuMyA0MC45IDI2LjkgNy43IDQuNCAxMi45IDguMyAyMC41IDE1LjUgMTMuMiAxMi41IDE4LjcgMTUuNSAyOC4xIDE1LjUgMTIuNi0uMSAxOS43LTUuMyAyOC40LTIxIDcuNi0xMy43IDExLTE4IDI2LjktMzQuNSAxNS40LTE1LjkgMjMuNi0yMi41IDM1LjItMjguNCAxOS44LTEwIDM3LjgtOS45IDQ5LjIuMyA1LjcgNS4yIDcuOCA5LjIgNy44IDE1LjEgMCA1LjUtMS4zIDguNC02LjIgMTMuNy04LjIgOC45LTIyIDE2LjUtNDQuMiAyNC4zLTEzLjcgNC45LTE4LjIgNy43LTI5LjggMTkuMWwtMTAuNiAxMC41LTQuMSAxMi44Yy0yLjIgNy01LjMgMTQuNi03IDE3LTYuOCA5LjgtMjQuMiAyMy43LTMxLjUgMjUuMS0yLjUuNS01LjgtLjItMTMtMi44LTExLjgtNC4zLTIxLTYuMy0zNS4yLTcuNS0xOC4yLTEuNy0zMS44LTcuNi02Ni42LTI5LjQtMTYuOS0xMC41LTI3LjgtMTYuNy0yOS4zLTE2LjctLjMgMC0uMyAxNC41LjEgMzIuMy40IDE3LjcuNCAzNi4xIDAgNDFsLS44IDguN0gzMzYuM2wtLjctMzMuMnoiIGZpbGw9IiMwYTBhMGEiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxnIGZpbGw9IiNmZWZlZmUiIGZpbGwtcnVsZT0ibm9uemVybyI+PHBhdGggZD0iTTM0OCA4NzQuOGMwLTE0LjUtLjctNDIuOS0xLjUtNjMuM2wtMS40LTM3IDMuNy0zYzEzLjUtMTAuOSAyMi43LTIyLjUgMzEuNy0zOS44IDYuNi0xMi45IDYuOS0xNS42IDIuOC0zNS44LTQuOS0yNC44LTMuNy0zOS42IDUuOS03NS45IDEuNy02LjMgMy4zLTEyLjUgMy42LTEzLjcuMi0xLjMuOC0yLjMgMS4xLTIuMy40IDAgNS40IDIuNCAxMS4yIDUuNCAxMi4zIDYuNSAyNy4zIDExLjggNDEuMyAxNC44IDguMSAxLjcgMTMuNiAyLjEgMjcuNiAyLjIgMzYuNi4xIDcxLjMtOC4yIDEwMy40LTI0LjYgMTAuMy01LjMgMjkuOS0xNy45IDMxLjMtMjAuMS40LS42IDEuMiAyLjYgMS45IDcuMSAyLjcgMTkuMiAxMyAzMCAzMiAzMy41bDYuOSAxLjMtLjMgNy41Yy0uMSA0LjEtLjcgMTYuNC0xLjIgMjcuNC0xLjUgMzItMS40IDM3LjIgMS40IDQzLjEgNi42IDE0LjEgMjQgMjEuOSA0MSAxOC40IDcuNS0xLjUgMTkuOS03LjkgMjYuMi0xMy40bDQuOS00LjMgNC40IDMuNGM5LjcgNy40IDI0LjYgMTIuNiAzNi4xIDEyLjUgMTUuOS0uMSAyOS4xLTEwLjQgMzMuNy0yNi40IDIuMy04LjMgMi44LTM1LjQuOS01My40LS45LTguMy0xLjYtMTUuNi0xLjYtMTYuMiAwLS43IDEuMi0xLjIgMi44LTEuMiA0LjYgMCAxNS42LTIuNyAyMC41LTUgMTEuMi01LjMgMTkuMy0xNi44IDIxLjgtMzEuMi43LTQgMS4zLTcuNCAxLjUtNy42LjEtLjIgMi44IDEuMyA2IDMuNCAxNiAxMC4yIDQyLjMgMjAuNiA2NS40IDI1LjggMjEuNSA0LjggMzIuOSA2IDU3IDYgMjQuOS4xIDMzLjctMS4yIDUxLjktNy42IDIxLjUtNy41IDQ5LjEtMjQuNyA2My0zOS4yIDEuOS0yIDMuOC0zLjYgNC4yLTMuNi40IDAgMSA0LjYgMS4zIDEwLjMgMS45IDI4LjggNS4yIDQ0LjUgMTIuNiA1OS4yIDggMTYuMSA5LjQgMjIuNCA5LjQgNDUuNWwuMSAxOS41LTUuMSAxNy41Yy03LjEgMjQuMS05LjYgMzYuNS05LjggNDguNS0uMSA4LjcuMiAxMC42IDIuMyAxNC40IDQuOCA5LjEgMTcuNyAyMC41IDMzLjggMzBsNy4zIDQuMy4yIDQzLjcuMyA0My42djE0Ljk1YzQuNS45LTg2IDMuMjY3LTM5MC43IDMuMzY3TDM0OCA5MTQuMjY0Vjg3NC44eiIvPjxwYXRoIGQ9Ik0xMjg4LjUgODYzLjljLTkuMy0zLjctMjMuMy02LjgtMzUuNC03LjktMTkuMS0xLjYtMzAuNC02LjUtNjUuOC0yOC42LTEwLjEtNi4zLTI1LjEtMTUtMzMuNC0xOS40LTI2LjYtMTQuMi00MC44LTI0LjktNDUuNS0zNC42LTIuNS01LTIuNi02LjItMi4xLTEzLjQuOC05LjggNC40LTI2LjMgMTAuNC00Ni45IDQuMS0xNC4zIDQuNS0xNi44IDUtMjkuOS45LTIzLjItMi41LTQwLjUtMTAuOC01NS43LTYuOS0xMi43LTEwLjUtMzEuMy0xMS41LTU5LjVsLS42LTE2LjUgNS44LTdjOS42LTExLjcgMTguOC0yNi43IDI0LjItMzkuM2wyLjMtNS4zIDQuNy44YzIuNi40IDExLjkuNyAyMC43LjYgMTUuMy0uMSAyMy45LTEuMyAzMi45LTQuOSAxLjgtLjcgMS45LS4zIDEuMiA4LjItLjMgNC45LTEuOCAxNi4zLTMuMiAyNS40LTEuNCA5LTIuMyAxNy43LTIgMTkuMy43IDMuNCA1IDkuOCAxMi45IDE5IDMuMyAzLjggNi44IDkuMiA3LjkgMTEuOSAzLjIgOC40IDQuOCAyMi45IDQuOCA0Mi44IDAgMzQtMi4xIDQxLjYtMjQuNSA4OS41LTUuNyAxMi4xLTEwLjggMjMuOC0xMS40IDI2LTMuNiAxMy40IDEuNyAyNC4yIDE4LjIgMzYuNCAxMC4yIDcuNiAyNyAxOC40IDM4LjcgMjQuOSA0LjYgMi41IDExLjcgOC4xIDE4LjQgMTQuMiA2LjMgNS45IDEzLjUgMTEuNSAxNyAxMy4zIDUuNyAzIDYuOCAzLjIgMTYuMSAzLjIgOC45IDAgMTAuNi0uMyAxNS43LTIuOCA3LjQtMy42IDE1LjQtMTIuNCAyMS4zLTIzLjIgMi42LTQuNyA2LjMtMTAuNyA4LjMtMTMuNCA0LjYtNiAyOC0zMC43IDI4LjUtMzAuMS4yLjMgMi4zIDYgNC41IDEyLjhsNC4xIDEyLjItNS43IDMuNmMtNy4xIDQuNi0yNS44IDIyLjctMjguMiAyNy40LS45IDEuOS0zLjEgOC00LjggMTMuNS0zLjYgMTEuNS03LjIgMTcuNS0xNC41IDI0LjEtNi40IDUuOC0xNSAxMS40LTE3LjQgMTEuNC0xLS4xLTQtMS02LjgtMi4xek03Ny41IDgzMy40Yy0xMC40LTIuMi0xNi44LTUuNi0yNC4yLTEyLjYtNy44LTcuNS0xNS40LTE3LjMtMjYuMy0zNC04LjEtMTIuMi0xOC0zMC43LTE4LTMzLjQgMC0uNyAzLjUtMy4xIDcuOC01LjMgMTAuNi01LjMgMTQuNy0xMC4yIDE2LjQtMTkuNi40LTEuNyAxLTEuNCA0LjYgMi40IDYuNSA3LjEgOC43IDEyLjMgMTEuNyAyNy42IDUuNCAyOC44IDEwLjQgNDUuMiAxNC44IDQ5LjQgOCA3LjUgMzEuNyA4LjcgNDguOCAyLjUgMTkuOC03LjIgMjIuMS03LjYgNTIuOS04LjQgNDYuNy0xLjMgNjQtNS41IDcxLjgtMTcuOCAxMS4zLTE3LjUgMzEuNi03MC45IDM2LjItOTQuOSAyLjktMTUuNSAyLjUtMjktMS44LTQ4LjgtNi40LTMwLjItMTMuNy04NS4zLTEyLjctOTYgLjYtNi4yIDctNDAuNCA3LjctNDEgLjItLjIgNC4xIDEgOC44IDIuNiAxMC44IDMuNiAyMS4zIDUuMiAzMC43IDQuNyA0LjgtLjIgNy4zIDAgNy4zLjggMCAuNiAyIDUuMiA0LjUgMTAuMiAxMi41IDI1LjkgMzkuMiA1Ni44IDYyLjkgNzMuMSAzLjUgMi40IDQuNiAzLjcgNC4xIDQuOS0xLjMgMy40LTkuNSAzNi4xLTExLjcgNDYuNy0zLjEgMTUuNS0zIDMxLjUuNiA0OS40IDMuNSAxOC4yIDMuNCAyMS41LTEgMzAuNC00LjcgOS40LTEzLjIgMjIuMS0xOC42IDI3LjctMi40IDIuNS0xMS4xIDEwLjQtMTkuMiAxNy41LTM0LjEgMjkuOC0zNy4yIDMxLjUtNjIuMiAzMy41LTE2LjkgMS4zLTIxLjIgMi41LTM2LjkgMTAuMmwtMTMgNi4zLTQ0LjUuMS00NC41LjItMTIuNSA1Yy0yMC45IDguNS0yOS40IDkuOC00NC41IDYuNnpNMTM3NS41IDc4NS44Yy0zLjctMTAtNC40LTEzLjItMy4zLTEzLjkgMS45LTEuMiAyLjYtLjMgNC4zIDUuOS45IDMuMSAxLjggNi41IDIuMSA3LjUuNiAyLTIuNCAyLjUtMy4xLjV6TTEzODAuNyA3ODIuNmMtLjQtMSAxLjMtMiA1LjYtMy42IDkuNS0zLjQgMjMuNy0xMC44IDI4LjUtMTQuNyA3LjItNS45IDguOC0xMS4xIDUuMi0xNy4xLTUuNy05LjQtMjQuMy05LjctNDMuNy0uNy04LjYgNC0xMC43IDIuOS0zLjEtMS41IDExLjktNi44IDI1LjUtMTAgMzQuMy04LjEgOS40IDIuMSAxNy41IDkuMyAxNy41IDE1LjUgMCA4LjYtMTEuNiAxOC4xLTMzLjMgMjcuNC01LjQgMi4zLTkuOSA0LjItMTAuMSA0LjItLjIgMC0uNi0uNi0uOS0xLjR6Ii8+PHBhdGggZD0iTTEzNzguMiA3NzQuM2MtMS4xLTMuNy0uOS01LjMgMS01LjMgMS43IDAgMTguMS03LjkgMjAtOS43IDIuNS0yLjIgMi4zLTUuMS0uNS01LjgtMi4zLS42LTEwIDEuNS0xOS41IDUuNGwtNS4zIDIuMS0xLjgtNC4yLTEuOC00LjMgNC42LTIuNGM3LjMtMy44IDE4LTcuMSAyNS4xLTcuNyA1LjQtLjUgNy41LS4zIDExLjMgMS40IDUuMSAyLjMgOSA3LjQgOC4xIDEwLjctMSAzLjctMTAuMSAxMS4xLTE4LjYgMTUuMy04LjcgNC4yLTE4LjUgOC4yLTIwLjQgOC4yLS42IDAtMS42LTEuNi0yLjItMy43eiIvPjxwYXRoIGQ9Ik0xMzY5LjYgNzY5LjNjLTIuMy0yLjMgNC43LTYuNCAxOS4zLTExLjMgMTIuMi00LjEgMTEuOC0xLjUtLjYgNC4zLTEwLjkgNS0xOCA3LjctMTguNyA3ek0xMzY1LjYgNzU2LjVjLTMuMS05LjUtMS42LTEwLjkgMi40LTIuMSAzLjQgNy41IDMuNSA4LjIgMS42IDguOS0xLjEuNC0yLjEtMS40LTQtNi44ek02NzIuMyA3MDcuNGMtNC45LTEuOC0xMi04LjUtMTMtMTIuMy0uNy0yLjYgMS4zLTYwLjMgMi4zLTY3LjdsLjYtNC4yIDUuOC0uNmMzLjMtLjQgOC4zLTEuNCAxMS4yLTIuMiAxNi4yLTQuNSAyNC4xLTYuMyAzMC43LTYuOWw3LjMtLjctLjMgMzguNy0uNCAzOC43LTYgNS42Yy0xMS42IDEwLjgtMjcuMyAxNS42LTM4LjIgMTEuNnpNNzU0LjEgNzA1LjVjLTguMS0xLjgtMTcuNi02LjMtMjIuMi0xMC42bC0zLjctMy40LjUtMzkuNC42LTM5LjQgNy44LjdjOS43LjggNDQuMSA2LjUgNDUuMSA3LjQuNC40IDEuNCA4LjEgMi4zIDE3LjIgMi4xIDIwLjQgMS43IDQ1LS45IDUyLjEtNC42IDEyLjYtMTUuNiAxOC40LTI5LjUgMTUuNHpNNDUzLjggNjE2LjVjLTQzLjUtNi44LTg3LjctMzcuMy0xMTYuNy04MC40LTE2LjQtMjQuMy0yMC0zNi43LTIwLjgtNzIuMi0uNi0yNS4xLjQtMzkuMSA0LjItNTguNCAxMS40LTU3LjMgMzguOC0xMDEgODEuNC0xMjkuNiA0OS0zMyAxMzIuNy01My44IDI0OC42LTYxLjkgMzEuOC0yLjIgMTA3LjgtMy4zIDE0MC45LTIuMSAxMzguMiA1IDIyMi43IDI3IDI3MCA3MC4yIDMzLjQgMzAuNiA1NS4yIDcyLjIgNjMuNiAxMjEuMyA2IDM1LjIgNCA3OC40LTQuNyA5OS0zLjUgOC41LTEyIDIyLjctMTguOCAzMS42LTI2LjkgMzQuOC01OS4zIDU3LjEtOTcgNjYuNy0xMC41IDIuNy0xMi4xIDIuOC0zNCAyLjgtMjguNiAwLTQ0LjUtMi4yLTcwLjQtOS43LTE4LjktNS40LTM5LjMtMTQuNy01Mi42LTIzLjktNi40LTQuNC03LjItNS40LTktMTAuNi01LjItMTUuMi0yMS44LTI5LjctNDQuOS0zOC45bC04LTMuMy0xLjEtNC45Yy0xLjMtNS43LTQuMS05LjktOS4zLTE0LTE3LjQtMTMuOC01Mi4xLTE4LjEtNzkuNy0xMC0yMC4zIDUuOS0zMi4yIDE4LjEtMjkuNSAzMC4ybC43IDMuMy04LjYgMy45Yy0xOC41IDguMy0zNSAyMi4yLTQxLjkgMzUuMi0yLjYgNC45LTUuMSA3LjctMTEgMTIuNC0xOS42IDE1LjctNDMgMjcuNy02OC40IDM1LjQtMjcuMyA4LjItNjAuNyAxMS4zLTgzIDcuOXptODMuNy01MC45YzI5LjctNS4yIDU4LjMtMTcuMiA4MC43LTMzLjggMTEuMS04LjIgMzAuMy0yNS40IDM3LTMzLjEgMTcuMi0xOS43IDI3LjUtMzkuOSAzMi45LTY0LjcgMy4xLTEzLjcgMy4zLTM5LjcuNi01My4zLTkuMS00NC45LTM4LTgxLjgtNzkuOC0xMDEuNi0zOS4zLTE4LjctNzkuNy0xOS45LTEyMy45LTMuOC02Ni4yIDI0LjEtMTA5LjIgNjUuOC0xMjIuNSAxMTguNy0zLjcgMTQuOC00LjggMjQuMi00LjcgNDEgLjEgMTYuOSAxLjYgMjggNS43IDQwLjkgMTMuNSA0Mi43IDQ5LjMgNzQuNCA5Ny41IDg2LjYgOC4zIDIuMSAxMi41IDIuOCAyNy41IDQuOSA2LjEuOSA0MS4zLS40IDQ5LTEuOHptNDEzLTE4LjZjMzcuOS0zLjcgNzAuNi0xNy41IDkzLjUtMzkuNiAxOC40LTE3LjcgMjkuNS0zOS40IDMzLjctNjUuOCAyLjQtMTUuNSAxLjQtNDguOS0yLjEtNjUuMy0xNC40LTY4LjItNjQuNy0xMTAuMS0xNDcuNi0xMjIuOC0xNC41LTIuMi00OC4zLTMuMS01OS4xLTEuNi00NyA2LjgtODYuNSAzMy0xMDkuMyA3Mi44LTEzLjEgMjIuOC0xOC4zIDQ0LjYtMTcuMyA3My4xLjYgMTguMyAyLjcgMjkuMyA4LjcgNDQuNyA5LjUgMjQuNSAyNy45IDQ4IDQ5LjcgNjMuNyAxMC40IDcuNSAzNSAyMC43IDQ4LjMgMjYgMzIuNyAxMi44IDY4LjIgMTggMTAxLjUgMTQuOHoiLz48cGF0aCBkPSJNNDgwLjIgNTU3LjRjLTI0LjUtMy41LTQ4LjUtMTMuMS02Ny4yLTI2LjctMTQuNC0xMC41LTMwLjQtMzAuNS0zNy00Ni4zLTExLjgtMjguMy0xMi44LTYzLjktMi44LTk1LjMgNy4xLTIyLjUgMTcuNC0zOC45IDM1LjctNTcuMSAxMC44LTEwLjcgMjIuMS0yMC4yIDIyLjEtMTguNyAwIC4zLTEuNiAyLjUtMy43IDQuOS05LjYgMTEuNC0xOS4yIDI4LjctMjQuMSA0My41LTUuNyAxNi44LTYuNyAyMy44LTYuNyA0NS4zLjEgMTcgLjQgMjAuNyAyLjQgMjkgNyAyOC40IDIwLjYgNTIgNDEuMyA3MS41IDI2LjUgMjQuOSA1OS42IDM4LjYgOTYuOCA0MC4yIDEzLjEuNSAzMC0uNiAzNC41LTIuMy44LS4zIDEuNS0uMSAxLjUuNCAwIDEuMi0xNC41IDYuMS0yNS41IDguNy0xOS41IDQuNS00Ny45IDUuOC02Ny4zIDIuOXoiLz48cGF0aCBkPSJNNTI3LjUgNTM1LjRjLTE3LjItMi41LTI5LjgtNi4yLTQzLjQtMTIuNS0zOS44LTE4LjYtNjcuNi01NC41LTc0LjctOTYuNC0yLjQtMTQuMy0xLjUtMzcuMyAyLTUwLjUgNi41LTI0LjQgMTYuOC00Mi4zIDM0LjUtNjAuMSAzNC4xLTM0IDg0LjQtNDcuNSAxMzIuMS0zNS40IDUwLjkgMTMgODkuMSA1Mi42IDk5LjEgMTAzIDIuMSAxMC40IDEuOCAzNi44LS41IDQ3LjMtNS40IDI1LjItMTcuMyA0Ny0zNS42IDY1LjItMTguOCAxOC45LTQyLjQgMzEuNS03MCAzNy41LTcuMyAxLjYtMzYuOSAyLjktNDMuNSAxLjl6bTExMC42LTgyLjZjMTIuMS02IDIxLjEtMTYuOSAyNC4zLTI5LjMgNi45LTI2LjEtMTAuMS01Mi0zNy4xLTU2LjctMjEuNi0zLjctNDMuNCA5LjgtNTAuMyAzMS4xLTEuOSA2LjEtMi4yIDguNi0xLjggMTYuNy41IDguNCAxIDEwLjMgNC4yIDE2LjkgNS45IDExLjkgMTUuMiAxOS45IDI4LjEgMjQuMSAyLjUuOSA3LjggMS4zIDE0LjYgMS4xIDkuOS0uMiAxMS0uNCAxOC0zLjl6Ii8+PHBhdGggZD0iTTYyNy44IDQyOC40Yy0zLjEtMS42LTUuOC02LjEtNS44LTkuNSAwLTMuNCAzLjgtOC42IDcuMS05LjggNi0yLjEgMTMgMS43IDE0LjQgNy45LjkgNC0xLjcgOS42LTUuNCAxMS40LTMuNyAyLTYuOCAyLTEwLjMgMHpNOTEyLjUgNTM4LjRjLTE4LjUtMi4xLTI1LjgtNC40LTEzLjctNC40IDEwLjkgMCAyNy44LTMuNCA0Mi4yLTguNSA0Mi43LTE1LjEgNzctNTAuNiA4OS44LTkzIDQuNi0xNSA1LjctMjMuMyA1LjYtNDEtLjEtMTIuNS0uNi0xOC4zLTIuMy0yNi41LTQtMTguOS0xMS44LTM2LjgtMjMuMi01My02LjgtOS43LTI0LjQtMjcuMi0zMy43LTMzLjUtNC0yLjctNi45LTUuMS02LjQtNS4zIDEuNi0uNSAxOS43IDcuNCAyOC43IDEyLjUgMzAuMiAxNy4yIDUyLjEgNDMuMSA2Mi41IDc0LjEgOC45IDI2LjcgMTEgNjUuMiA1IDkwLjEtMTEuOSA0OC45LTUzLjMgODAuNi0xMTUgODguMS03LjguOS0zMi40IDEuMi0zOS41LjR6Ii8+PHBhdGggZD0iTTg4MCA1MjIuM2MtNTEuNi0zLjctOTYuNS0zNC44LTExNi4xLTgwLjMtNi44LTE1LjctOS0yNi4xLTkuNi00NS0uNC0xMi40LS4xLTE4LjcgMS4xLTI1LjUgOC40LTQ4LjUgNDYuNi05MC4xIDk1LjEtMTAzLjYgMTguOS01LjIgNDMuMy02LjYgNjIuMi0zLjMgNTAuNSA4LjUgOTIuNCA0NC41IDEwNi43IDkxLjQgNy41IDI0LjcgNy4yIDUxLjQtLjkgNzUuNy02LjEgMTguMi0xNS4xIDMzLjQtMjguMiA0Ny4zLTIzLjQgMjQuOS01NC4zIDM5LjgtODguOCA0My0xMC43IDEtMTIuMiAxLTIxLjUuM3pNOTgwLjIgNDQxYzEyLjMtNC42IDIzLjItMTUuOSAyNy40LTI4LjIgMi44LTguMiAyLjUtMjEuNS0uNi0zMC4xLTQuNi0xMi45LTE1LjYtMjMuNC0yOS0yNy43LTUuOC0xLjktOC42LTIuMi0xNi40LTEuOC04LjMuMy0xMC4yLjgtMTYuOCA0LjEtOS43IDQuNy0xNi44IDExLjgtMjEuNSAyMS41LTMuMiA2LjQtMy43IDguNS00LjEgMTYuNC0uNiAxMS4xIDEuNSAxOS41IDYuNyAyNy42IDYuNSA5LjkgMTcuNyAxNy45IDI4LjQgMjAuMiA2LjcgMS40IDE5LjUuNSAyNS45LTJ6Ii8+PHBhdGggZD0iTTk3MS4zIDQxMi41Yy0zLjItMy4yLTMuNS0zLjktMy03LjggMS41LTExLjMgMTYtMTMuNCAyMC40LTMgMi44IDYuOS0yLjMgMTQuMy05LjkgMTQuMy0zLjIgMC00LjctLjctNy41LTMuNXpNNjQ2LjUgNjEwLjljLTcuNy0xLjItMTUuNi01LjEtMTguOS05LjQtMy42LTQuNy02LTE0LjUtNS4yLTIxLjUgMS40LTExLjggOS45LTI0LjEgMjMuMi0zMy42IDUuOS00LjIgMjUuNy0xNC40IDI4LTE0LjQuNiAwIDMuOCAxLjYgNyAzLjUgMjEuNiAxMyA2MS43IDEzLjkgODUuNiAxLjkgMy43LTEuOSA4LjMtNC43IDEwLjItNi40bDMuNC0zLjEgNi43IDIuNWMxMyA1IDIyLjcgMTAuNyAzMC4xIDE4LjEgOS45IDkuOCAxMS45IDE0LjMgMTEuOSAyNyAwIDguOS0uNCAxMC43LTIuOSAxNi4zLTcuOCAxNy0yMy4xIDIwLjMtNjIuMSAxMy4zLTMwLjgtNS41LTU4LjctNS4yLTc3LjMuOS0xNC4zIDQuNy0yOSA2LjUtMzkuNyA0Ljl6TTI5MC4xIDUwMC45Yy0yMi40LTQuNC0zNS41LTE1LjItNDEuOS0zNC43LTIuMS02LjUtMi41LTkuNi0yLjYtMjAuMiAwLTYuOS4yLTEzIC42LTEzLjUuNC0uNyA1LjEtLjYgMTQuNS4zIDEyIDEuMSA0MS4zIDEuMiA0NSAuMSAxLS4zIDEuNCA1LjUgMS43IDI1LjYuMyAyMi42IDEgMzEuOCAzLjEgNDEuMy41IDIuMS40IDIuMi03LjcgMi4xLTQuNi0uMS0xMC4zLS41LTEyLjctMXpNMTEzOSA0OTIuMWMtMy0uMy01LjQtMS01LjMtMS42IDIuNC0xNSAzLjQtMjkuNiAzLjEtNDcuN2wtLjMtMjAuOCAzLjUuOGM3LjUgMS42IDI5LjIuNSA0NS40LTIuMiA4LjctMS41IDE2LjEtMi40IDE2LjUtMi4xIDEuMyAxLjQuNiA0MS44LS44IDQ3LjUtMi4xIDguNS01LjUgMTUuMy04LjkgMTguMi04LjUgNy4yLTMwLjEgMTAuNC01My4yIDcuOXpNMjc5LjMgNDIzLjRjLjMtMS4xIDEuOC03LjMgMy4yLTEzLjkgMy42LTE2LjMgMTAuMS00Mi4zIDEzLTUyLjEgNS40LTE3LjggMjAuOC00NS42IDQ3LjktODYuNmwxLjgtMi44LTIuOC0xLjFjLTQuMi0xLjYtMTcuNC00LjktMTkuNi00LjktMyAwLTMtMi0uMy0xNC4xIDMuNi0xNi4yIDgtMzAuMSAxMi41LTM5LjUgNi4xLTEyLjggMTguMy0yMy41IDM5LjEtMzQuOGw4LjYtNC42LjcgMy4xYy4zIDEuNy42IDUuNy42IDguOCAwIDcuOSAyLjYgMzEuNSA1IDQ1LjIgMi4zIDEzLjcgNi4xIDI3LjIgOS41IDM0LjNsMi41IDUuMS0yLjIgMS41Yy0xNi42IDExLjEtMzcgMzAuMi00Ny45IDQ1LTIwLjcgMjguMS0zNC44IDYyLjgtNDAuNSAxMDAuMi0xLjQgOC45LTIuMiAxMS43LTMuNCAxMS43LS44IDAtNy41LjQtMTQuOS43LTEyLjcuNi0xMy4zLjYtMTIuOC0xLjJ6Ii8+PHBhdGggZD0iTTI1Ni41IDQxNi43Yy0yNC40LTkuOS0zOS40LTI2LjQtNDQuMS00OC44LTQuNS0yMSAyLjgtNTIgMTYuMy02OS45IDEwLjctMTQuMSAyOC4xLTIzLjIgNDkuOC0yNi4xIDE0LjUtMS45IDQ3LjQuNyA0Ni44IDMuNy0uMS42LTQuMiA3LjQtOS4xIDE1LjMtNSA3LjgtMTEuMiAxOC4zLTEzLjggMjMuMmwtNC45IDguOS00LjUtLjdjLTE4LjItMi42LTMwLjUgMi4zLTMzLjggMTMuMy0yLjEgNy4xLTEuNSAxNi4zIDEuMyAyMi4xIDIuMyA0LjUgOC43IDExLjcgMTUuMiAxN2wyLjIgMS44LTIuOCAxMmMtMS42IDYuNi0zLjkgMTYuNC01LjEgMjEuOC0xLjcgNy41LTIuNSA5LjctMy44IDkuNy0uOSAwLTUuMy0xLjUtOS43LTMuM3pNMTE0MSA0MTMuN2MtNC43LTEtNS41LTEuNS01LjgtMy43LS45LTcuMi01LjYtMjguNy04LjItMzcuMy0xNi43LTU2LjEtNTMuNC0xMDEuOC0xMDAuNS0xMjUuNC00LjktMi41LTkuMS00LjYtOS4yLTQuNy0uMi0uMiAyLjQtNi41IDUuOC0xNC4yIDMuMy03LjYgNy44LTE4LjQgMTAuMS0yMy45IDMuMS03LjggMjYuMy01OCAyNy4zLTU5LjMuMS0uMiA0LjcgMi44IDEwLjEgNi42IDUuNSAzLjggMTUgMTAuNCAyMS4yIDE0LjcgMTEuNSA4IDIwLjcgMTcuNiAyNS4xIDI2LjMgMSAyLjEgNS45IDE2LjMgMTAuOSAzMS43IDUgMTUuNCA5LjQgMjguOCA5LjcgMjkuNy41IDEuMyAwIDEuOS0yLjIgMi40LTcuNSAxLjYtMTggNC42LTE5LjIgNS40LTEuMS42LjkgNS43IDkuOCAyNSAyMi41IDQ4LjYgMjkuOSA2Ny40IDMyLjcgODMgMS44IDEwLjEgNCA0MSAzLjEgNDMuNC0uNSAxLjMtMiAxLjYtNy45IDEuNS00IDAtOS44LS42LTEyLjgtMS4yeiIvPjxwYXRoIGQ9Ik0xMTczLjYgMzk5LjNjLS4zLTQuMy0xLjEtMTIuOS0xLjctMTkuMS0uNi02LjMtLjktMTEuNS0uNy0xMS42LjItLjIgMi44LTEuNyA1LjgtMy40IDYuNy0zLjcgMTMuNS0xMC4zIDE2LjMtMTUuNyA0LjgtOSAxLjYtMjIuOS03LTMwLjUtNi41LTUuNy0xMi4zLTcuMy0yNC45LTYuOWwtMTAuNS40LTkuOC0yMS4zYy01LjQtMTEuNy05LjYtMjEuNC05LjItMjEuNiAxLjQtLjkgMTYuNi0yLjYgMjMuMS0yLjYgMzggMCA2Mi44IDE4LjQgNzMuNiA1NC41IDIuMSA2LjkgMi44IDExLjkgMy4xIDIxLjUuNiAxNC4xLS42IDIwLjktNS40IDMwLjgtMy45IDgtMTUuOSAxOS44LTI0LjggMjQuNC02LjMgMy4zLTIyLjcgOC44LTI2IDguOC0uOSAwLTEuNS0yLjMtMS45LTcuN3pNNDAyLjIgMjU0LjNjLTYtMTUuNi0xMC4yLTM5LjgtMTIuMy03MC43bC0xLjMtMTcuOSA4LTcuNmM0LjctNC42IDE0LjMtMTEuOSAyMy45LTE4LjMgMTktMTIuNSAzMy4yLTI0LjUgNTEuNS00My41IDE3LjYtMTguMiAyOS40LTI2IDcyLjUtNDcuOCAzNi43LTE4LjYgNDEuMy0yMCA5NS0yOC45IDE0LjktMi41IDMyLjgtNS43IDM5LjktNy4xIDctMS40IDEyLjktMi41IDEzLjEtMi41LjcgMCAxLjUgNS41IDMuOSAyNiA1LjYgNDcuOCA1LjkgNTIuOCA2LjEgMTA1LjUuMSAyNy41LjUgNTIuNS45IDU1LjZsLjggNS43LTE1LjguNmMtMTIyLjcgNS0yMTAuNCAyMi0yNzAuNCA1Mi43LTYuNCAzLjItMTIgNS45LTEyLjMgNS45LS4zIDAtMS45LTMuNS0zLjUtNy43ek0xMDAwLjQgMjM2Yy0zNS41LTEzLjctODkuOS0yNC41LTE0Ny45LTI5LjQtMzYuOC0zLjItNTQuMS0zLjktOTgtNGwtNDUtLjEtLjctMTMuNWMtLjQtNy40LS42LTMxLjctLjYtNTQgLjItNDMuMi0uNi01NS4zLTYuNy0xMDQuOS0xLjQtMTAuNy0yLjItMTkuNy0xLjktMjAgMS0xLjEgNTEuNy0uNCA2Ni40LjggMzMuNCAyLjcgNTguOCA2LjQgNzAuNSAxMC4xIDMuMyAxIDExLjQgNC4xIDE4IDYuOCAxMC43IDQuNCA0My45IDE2LjMgNzAuNSAyNS4zIDIwLjMgNi44IDQxLjcgMTQuNyA0Ni42IDE3LjIgMTEuMyA1LjcgMzcuOCAyNy40IDY4LjYgNTYuMWwxNS43IDE0LjYtMi44IDYuM2MtMS42IDMuNC02LjMgMTMuNC0xMC42IDIyLjItNC4yIDguOC05LjggMjEuMi0xMi40IDI3LjUtMTAgMjQtMTguNCA0My0xOSA0Mi45LS4zIDAtNS4yLTEuOC0xMC43LTMuOXoiLz48L2c+PC9zdmc+)

- [Copyright](https://go.dev/copyright)
- [Terms of Service](https://go.dev/tos)
- [Privacy Policy](http://www.google.com/intl/en/policies/privacy/)
- [Report an Issue](https://go.dev/s/pkgsite-feedback)
- ![System theme](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzQ1NUE2NCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTIwIDE1LjMxTDIzLjMxIDEyIDIwIDguNjlWNGgtNC42OUwxMiAuNjkgOC42OSA0SDR2NC42OUwuNjkgMTIgNCAxNS4zMVYyMGg0LjY5TDEyIDIzLjMxIDE1LjMxIDIwSDIwdi00LjY5ek0xMiAxOFY2YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2eiIvPjwvc3ZnPg==) ![Dark theme](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzQ1NUE2NCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEwIDJjLTEuODIgMC0zLjUzLjUtNSAxLjM1QzcuOTkgNS4wOCAxMCA4LjMgMTAgMTJzLTIuMDEgNi45Mi01IDguNjVDNi40NyAyMS41IDguMTggMjIgMTAgMjJjNS41MiAwIDEwLTQuNDggMTAtMTBTMTUuNTIgMiAxMCAyeiIvPjwvc3ZnPg==) ![Light theme](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI0IDI0IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0cHgiIGZpbGw9IiM0NTVBNjQiPjxyZWN0IGZpbGw9Im5vbmUiIGhlaWdodD0iMjQiIHdpZHRoPSIyNCIvPjxwYXRoIGQ9Ik0xMiw3Yy0yLjc2LDAtNSwyLjI0LTUsNXMyLjI0LDUsNSw1czUtMi4yNCw1LTVTMTQuNzYsNywxMiw3TDEyLDd6IE0yLDEzbDIsMGMwLjU1LDAsMS0wLjQ1LDEtMXMtMC40NS0xLTEtMWwtMiwwIGMtMC41NSwwLTEsMC40NS0xLDFTMS40NSwxMywyLDEzeiBNMjAsMTNsMiwwYzAuNTUsMCwxLTAuNDUsMS0xcy0wLjQ1LTEtMS0xbC0yLDBjLTAuNTUsMC0xLDAuNDUtMSwxUzE5LjQ1LDEzLDIwLDEzeiBNMTEsMnYyIGMwLDAuNTUsMC40NSwxLDEsMXMxLTAuNDUsMS0xVjJjMC0wLjU1LTAuNDUtMS0xLTFTMTEsMS40NSwxMSwyeiBNMTEsMjB2MmMwLDAuNTUsMC40NSwxLDEsMXMxLTAuNDUsMS0xdi0yYzAtMC41NS0wLjQ1LTEtMS0xIEMxMS40NSwxOSwxMSwxOS40NSwxMSwyMHogTTUuOTksNC41OGMtMC4zOS0wLjM5LTEuMDMtMC4zOS0xLjQxLDBjLTAuMzksMC4zOS0wLjM5LDEuMDMsMCwxLjQxbDEuMDYsMS4wNiBjMC4zOSwwLjM5LDEuMDMsMC4zOSwxLjQxLDBzMC4zOS0xLjAzLDAtMS40MUw1Ljk5LDQuNTh6IE0xOC4zNiwxNi45NWMtMC4zOS0wLjM5LTEuMDMtMC4zOS0xLjQxLDBjLTAuMzksMC4zOS0wLjM5LDEuMDMsMCwxLjQxIGwxLjA2LDEuMDZjMC4zOSwwLjM5LDEuMDMsMC4zOSwxLjQxLDBjMC4zOS0wLjM5LDAuMzktMS4wMywwLTEuNDFMMTguMzYsMTYuOTV6IE0xOS40Miw1Ljk5YzAuMzktMC4zOSwwLjM5LTEuMDMsMC0xLjQxIGMtMC4zOS0wLjM5LTEuMDMtMC4zOS0xLjQxLDBsLTEuMDYsMS4wNmMtMC4zOSwwLjM5LTAuMzksMS4wMywwLDEuNDFzMS4wMywwLjM5LDEuNDEsMEwxOS40Miw1Ljk5eiBNNy4wNSwxOC4zNiBjMC4zOS0wLjM5LDAuMzktMS4wMywwLTEuNDFjLTAuMzktMC4zOS0xLjAzLTAuMzktMS40MSwwbC0xLjA2LDEuMDZjLTAuMzksMC4zOS0wLjM5LDEuMDMsMCwxLjQxczEuMDMsMC4zOSwxLjQxLDBMNy4wNSwxOC4zNnoiLz48L3N2Zz4=)

  Theme Toggle
- ![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzQ1NUE2NCI+PHBhdGggZD0iTTIwIDVINGMtMS4xIDAtMS45OS45LTEuOTkgMkwyIDE3YzAgMS4xLjkgMiAyIDJoMTZjMS4xIDAgMi0uOSAyLTJWN2MwLTEuMS0uOS0yLTItMnptLTkgM2gydjJoLTJWOHptMCAzaDJ2MmgtMnYtMnpNOCA4aDJ2Mkg4Vjh6bTAgM2gydjJIOHYtMnptLTEgMkg1di0yaDJ2MnptMC0zSDVWOGgydjJ6bTkgN0g4di0yaDh2MnptMC00aC0ydi0yaDJ2MnptMC0zaC0yVjhoMnYyem0zIDNoLTJ2LTJoMnYyem0wLTNoLTJWOGgydjJ6Ii8+PHBhdGggZD0iTTAgMGgyNHYyNEgwem0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48L3N2Zz4=)

  Shortcuts Modal

[![Google logo](data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNLjEyOCA5LjI3NmMwLTUuMTA1IDQuMzItOS4yNjEgOS40NTctOS4yNjEgMi44NDIgMCA0Ljg2NSAxLjEwNyA2LjM4OCAyLjU1MmwtMS43OTYgMS43ODVjLTEuMDkxLTEuMDE3LTIuNTY5LTEuODA3LTQuNTkyLTEuODA3LTMuNzUgMC02LjY4MyAzLjAwNC02LjY4MyA2LjczMXMyLjkzMiA2LjczMiA2LjY4MyA2LjczMmMyLjQzMiAwIDMuODItLjk3MSA0LjcwNi0xLjg1My43MjctLjcyMiAxLjIwNC0xLjc2MSAxLjM4Ni0zLjE4NEg5LjU4NVY4LjQ0aDguNTdjLjA5MS40NTEuMTM3Ljk5My4xMzcgMS41OCAwIDEuODk4LS41MjMgNC4yNDgtMi4yMDYgNS45Mi0xLjYzNiAxLjY5My0zLjcyOCAyLjU5Ny02LjUgMi41OTctNS4xMzkgMC05LjQ1OC00LjE1Ni05LjQ1OC05LjI2Mk0yNS4yMTggMTYuMTg5Yy0xLjgxOSAwLTMuMzg3LTEuNDkxLTMuMzg3LTMuNjE1IDAtMi4xNDYgMS41NjgtMy42MTQgMy4zODctMy42MTQgMS44MTggMCAzLjM4NyAxLjQ2OCAzLjM4NyAzLjYxNCAwIDIuMTI0LTEuNTY5IDMuNjE1LTMuMzg3IDMuNjE1bTAtOS41NzhjLTMuMzIgMC02LjAyNCAyLjUwNy02LjAyNCA1Ljk2MyAwIDMuNDM0IDIuNzA1IDUuOTY0IDYuMDI0IDUuOTY0IDMuMzE4IDAgNi4wMjQtMi41MyA2LjAyNC01Ljk2NCAwLTMuNDU2LTIuNzA2LTUuOTYzLTYuMDI0LTUuOTYzTTM4LjM2IDE2LjE4OWMtMS44MiAwLTMuMzg4LTEuNDkxLTMuMzg4LTMuNjE1IDAtMi4xNDYgMS41NjktMy42MTQgMy4zODctMy42MTQgMS44MTkgMCAzLjM4NyAxLjQ2OCAzLjM4NyAzLjYxNCAwIDIuMTI0LTEuNTY4IDMuNjE1LTMuMzg3IDMuNjE1bTAtOS41NzhjLTMuMzE5IDAtNi4wMjQgMi41MDctNi4wMjQgNS45NjMgMCAzLjQzNCAyLjcwNSA1Ljk2NCA2LjAyNCA1Ljk2NHM2LjAyNC0yLjUzIDYuMDI0LTUuOTY0YzAtMy40NTYtMi43MDUtNS45NjMtNi4wMjQtNS45NjNNNTEuNDY2IDE2LjE4OWMtMS44MTggMC0zLjM0MS0xLjUxNC0zLjM0MS0zLjU5MiAwLTIuMSAxLjUyMy0zLjYzNyAzLjM0MS0zLjYzNyAxLjc5NiAwIDMuMjA2IDEuNTM2IDMuMjA2IDMuNjM3IDAgMi4wNzgtMS40MSAzLjU5Mi0zLjIwNiAzLjU5MnptMy4wMjQtOS4yMTd2Ljk3MmgtLjA5MWMtLjU5MS0uNy0xLjcyOC0xLjMzMy0zLjE2LTEuMzMzLTMgMC01Ljc1MSAyLjYyLTUuNzUxIDUuOTg2IDAgMy4zNDMgMi43NSA1Ljk0MSA1Ljc1IDUuOTQxIDEuNDMzIDAgMi41Ny0uNjMzIDMuMTYtMS4zNTZoLjA5MnYuODU5YzAgMi4yODEtMS4yMjggMy41MDEtMy4yMDYgMy41MDEtMS42MTQgMC0yLjYxNC0xLjE1Mi0zLjAyMy0yLjEyM2wtMi4yOTYuOTQ5Yy42NiAxLjU4MSAyLjQxIDMuNTI0IDUuMzIgMy41MjQgMy4wOTEgMCA1LjcwNS0xLjgwOCA1LjcwNS02LjIxMlY2Ljk3MmgtMi41ek02MS40NDYgMTguMTc2aC0yLjYzN1YuNjQ3aDIuNjM3ek02OC40NyA4LjkxNWMxLjA0NiAwIDEuOTMyLjUyIDIuMjI4IDEuMjY1bC01LjM2NSAyLjIxNGMtLjA2OC0yLjMwNSAxLjc5Ni0zLjQ4IDMuMTM3LTMuNDhtLjIwNSA3LjI3NWMtMS4zNDIgMC0yLjI5Ni0uNjEtMi45MS0xLjgwN2w4LjAyNS0zLjI5OC0uMjczLS42NzhjLS41LTEuMzMzLTIuMDI0LTMuNzk1LTUuMTM4LTMuNzk1LTMuMDkyIDAtNS42NiAyLjQxNy01LjY2IDUuOTYzIDAgMy4zNDQgMi41NDYgNS45NjQgNS45NTYgNS45NjQgMi43NSAwIDQuMzQyLTEuNjcyIDUtMi42NDNMNzEuNjMgMTQuNTRjLS42ODIuOTk0LTEuNjE0IDEuNjQ5LTIuOTU1IDEuNjQ5Ii8+PC9nPjwvc3ZnPg==)](https://google.com)

## Jump to

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzQ1NUE2NCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE5IDYuNDFMMTcuNTkgNSAxMiAxMC41OSA2LjQxIDUgNSA2LjQxIDEwLjU5IDEyIDUgMTcuNTkgNi40MSAxOSAxMiAxMy40MSAxNy41OSAxOSAxOSAxNy41OSAxMy40MSAxMiAxOSA2LjQxeiIvPjwvc3ZnPg==)

Close

## Keyboard shortcuts

![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjRweCIgZmlsbD0iIzQ1NUE2NCI+PHBhdGggZD0iTTAgMGgyNHYyNEgwVjB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE5IDYuNDFMMTcuNTkgNSAxMiAxMC41OSA2LjQxIDUgNSA2LjQxIDEwLjU5IDEyIDUgMTcuNTkgNi40MSAxOSAxMiAxMy40MSAxNy41OSAxOSAxOSAxNy41OSAxMy40MSAxMiAxOSA2LjQxeiIvPjwvc3ZnPg==)

|                |                 |
|----------------|-----------------|
| **?**          | : This menu     |
| **/**          | : Search site   |
| **f** or **F** | : Jump to       |
| **y** or **Y** | : Canonical URL |

Close

go.dev uses cookies from Google to deliver and enhance the quality of its services and to analyze traffic. [Learn more.](https://policies.google.com/technologies/cookies)

Okay
