
# USAGE | `docling`

## Conversion

### Convert a single document

To convert individual PDF documents, use `convert()`, for example:

```py
from docling.document_converter import DocumentConverter

source = "https://arxiv.org/pdf/2408.09869"  # PDF path or URL
converter = DocumentConverter()
result = converter.convert(source)
print(result.document.export_to_markdown())  # output: "### Docling Technical Report[...]"
```

### CLI

You can also use Docling directly from your command line to convert individual files —be it local or by URL— or whole directories.

```bash
docling https://arxiv.org/pdf/2206.01062
```

You can also use 🥚[SmolDocling](https://huggingface.co/ds4sd/SmolDocling-256M-preview) and other VLMs via Docling CLI:

```bash
docling --pipeline vlm --vlm-model smoldocling https://arxiv.org/pdf/2206.01062
```

This will use MLX acceleration on supported Apple Silicon hardware.

To see all available options (export formats etc.) run `docling --help`. More details in the [CLI reference page](https://docling-project.github.io/docling/reference/cli/).

### Advanced options

#### Model prefetching and offline usage

By default, models are downloaded automatically upon first usage. If you would prefer to explicitly prefetch them for offline use (e.g. in air-gapped environments) you can do that as follows:

**Step 1: Prefetch the models**

Use the `docling-tools models download` utility:

```bash
$ docling-tools models download
Downloading layout model...
Downloading tableformer model...
Downloading picture classifier model...
Downloading code formula model...
Downloading easyocr models...
Models downloaded into $HOME/.cache/docling/models.
```

Alternatively, models can be programmatically downloaded using `docling.utils.model_downloader.download_models()`.

**Step 2: Use the prefetched models**

```py
from docling.datamodel.base_models import InputFormat
from docling.datamodel.pipeline_options import EasyOcrOptions, PdfPipelineOptions
from docling.document_converter import DocumentConverter, PdfFormatOption

artifacts_path = "/local/path/to/models"

pipeline_options = PdfPipelineOptions(artifacts_path=artifacts_path)
doc_converter = DocumentConverter(
    format_options={
        InputFormat.PDF: PdfFormatOption(pipeline_options=pipeline_options)
    }
)
```

Or using the CLI:

```bash
docling --artifacts-path="/local/path/to/models" FILE
```

Or using the `DOCLING_ARTIFACTS_PATH` environment variable:

```bash
export DOCLING_ARTIFACTS_PATH="/local/path/to/models"
python my_docling_script.py
```

#### Using remote services

The main purpose of Docling is to run local models which are not sharing any user data with remote services. Anyhow, there are valid use cases for processing part of the pipeline using remote services, for example invoking OCR engines from cloud vendors or the usage of hosted LLMs.

In Docling we decided to allow such models, but we require the user to explicitly opt-in in communicating with external services.

```py
from docling.datamodel.base_models import InputFormat
from docling.datamodel.pipeline_options import PdfPipelineOptions
from docling.document_converter import DocumentConverter, PdfFormatOption

pipeline_options = PdfPipelineOptions(enable_remote_services=True)
doc_converter = DocumentConverter(
    format_options={
        InputFormat.PDF: PdfFormatOption(pipeline_options=pipeline_options)
    }
)
```

When the value `enable_remote_services=True` is not set, the system will raise an exception `OperationNotAllowed()`.

*Note: This option is only related to the system sending user data to remote services. Control of pulling data (e.g. model weights) follows the logic described in [Model prefetching and offline usage](#model-prefetching-and-offline-usage).*

##### List of remote model services

The options in this list require the explicit `enable_remote_services=True` when processing the documents.

- `PictureDescriptionApiOptions`: Using vision models via API calls.

#### Adjust pipeline features

The example file [custom\_convert.py](https://docling-project.github.io/docling/examples/custom_convert/) contains multiple ways one can adjust the conversion pipeline and features.

##### Control PDF table extraction options

You can control if table structure recognition should map the recognized structure back to PDF cells (default) or use text cells from the structure prediction itself. This can improve output quality if you find that multiple columns in extracted tables are erroneously merged into one.

```py
from docling.datamodel.base_models import InputFormat
from docling.document_converter import DocumentConverter, PdfFormatOption
from docling.datamodel.pipeline_options import PdfPipelineOptions

pipeline_options = PdfPipelineOptions(do_table_structure=True)
pipeline_options.table_structure_options.do_cell_matching = False  # uses text cells predicted from table structure model

doc_converter = DocumentConverter(
    format_options={
        InputFormat.PDF: PdfFormatOption(pipeline_options=pipeline_options)
    }
)
```

Since docling 1.16.0: You can control which TableFormer mode you want to use. Choose between `TableFormerMode.FAST` (faster but less accurate) and `TableFormerMode.ACCURATE` (default) to receive better quality with difficult table structures.

```py
from docling.datamodel.base_models import InputFormat
from docling.document_converter import DocumentConverter, PdfFormatOption
from docling.datamodel.pipeline_options import PdfPipelineOptions, TableFormerMode

pipeline_options = PdfPipelineOptions(do_table_structure=True)
pipeline_options.table_structure_options.mode = TableFormerMode.ACCURATE  # use more accurate TableFormer model

doc_converter = DocumentConverter(
    format_options={
        InputFormat.PDF: PdfFormatOption(pipeline_options=pipeline_options)
    }
)
```

#### Impose limits on the document size

You can limit the file size and number of pages which should be allowed to process per document:

```py
from pathlib import Path
from docling.document_converter import DocumentConverter

source = "https://arxiv.org/pdf/2408.09869"
converter = DocumentConverter()
result = converter.convert(source, max_num_pages=100, max_file_size=20971520)
```

#### Convert from binary PDF streams

You can convert PDFs from a binary stream instead of from the filesystem as follows:

```py
from io import BytesIO
from docling.datamodel.base_models import DocumentStream
from docling.document_converter import DocumentConverter

buf = BytesIO(your_binary_stream)
source = DocumentStream(name="my_doc.pdf", stream=buf)
converter = DocumentConverter()
result = converter.convert(source)
```

#### Limit resource usage

You can limit the CPU threads used by Docling by setting the environment variable `OMP_NUM_THREADS` accordingly. The default setting is using 4 CPU threads.

#### Use specific backend converters

Note

This section discusses directly invoking a [backend](https://docling-project.github.io/docling/concepts/architecture/), i.e. using a low-level API. This should only be done when necessary. For most cases, using a `DocumentConverter` (high-level API) as discussed in the sections above should suffice — and is the recommended way.

By default, Docling will try to identify the document format to apply the appropriate conversion backend (see the list of [supported formats](https://docling-project.github.io/docling/usage/supported_formats/)). You can restrict the `DocumentConverter` to a set of allowed document formats, as shown in the [Multi-format conversion](https://docling-project.github.io/docling/examples/run_with_formats/) example. Alternatively, you can also use the specific backend that matches your document content. For instance, you can use `HTMLDocumentBackend` for HTML pages:

```py
import urllib.request
from io import BytesIO
from docling.backend.html_backend import HTMLDocumentBackend
from docling.datamodel.base_models import InputFormat
from docling.datamodel.document import InputDocument

url = "https://en.wikipedia.org/wiki/Duck"
text = urllib.request.urlopen(url).read()
in_doc = InputDocument(
    path_or_stream=BytesIO(text),
    format=InputFormat.HTML,
    backend=HTMLDocumentBackend,
    filename="duck.html",
)
backend = HTMLDocumentBackend(in_doc=in_doc, path_or_stream=BytesIO(text))
dl_doc = backend.convert()
print(dl_doc.export_to_markdown())
```

## Chunking

You can chunk a Docling document using a [chunker](https://docling-project.github.io/docling/concepts/chunking/), such as a `HybridChunker`, as shown below (for more details check out [this example](https://docling-project.github.io/docling/examples/hybrid_chunking/)):

```py
from docling.document_converter import DocumentConverter
from docling.chunking import HybridChunker

conv_res = DocumentConverter().convert("https://arxiv.org/pdf/2206.01062")
doc = conv_res.document

chunker = HybridChunker(tokenizer="BAAI/bge-small-en-v1.5")  # set tokenizer as needed
chunk_iter = chunker.chunk(doc)
```

An example chunk would look like this:

```py
print(list(chunk_iter)[11])
# {
#   "text": "In this paper, we present the DocLayNet dataset. [...]",
#   "meta": {
#     "doc_items": [{
#       "self_ref": "#/texts/28",
#       "label": "text",
#       "prov": [{
#         "page_no": 2,
#         "bbox": {"l": 53.29, "t": 287.14, "r": 295.56, "b": 212.37, ...},
#       }], ...,
#     }, ...],
#     "headings": ["1 INTRODUCTION"],
#   }
# }
```
## Enrich | `docling`

Docling allows to enrich the conversion pipeline with additional steps which process specific document components, e.g. code blocks, pictures, etc. The extra steps usually require extra models executions which may increase the processing time consistently. For this reason most enrichment models are disabled by default.

The following table provides an overview of the default enrichment models available in Docling.

| Feature                | Parameter                   | Processed item                  | Description                                |
|------------------------|-----------------------------|---------------------------------|--------------------------------------------|
| Code understanding     | `do_code_enrichment`        | `CodeItem`                      | See [docs below](#code-understanding).     |
| Formula understanding  | `do_formula_enrichment`     | `TextItem` with label `FORMULA` | See [docs below](#formula-understanding).  |
| Picture classification | `do_picture_classification` | `PictureItem`                   | See [docs below](#picture-classification). |
| Picture description    | `do_picture_description`    | `PictureItem`                   | See [docs below](#picture-description).    |

## Enrichments details

### Code understanding

The code understanding step allows to use advance parsing for code blocks found in the document. This enrichment model also set the `code_language` property of the `CodeItem`.

Model specs: see the [`CodeFormula` model card](https://huggingface.co/ds4sd/CodeFormula).

Example command line:

```
docling --enrich-code FILE
```

Example code:

```
from docling.document_converter import DocumentConverter, PdfFormatOption
from docling.datamodel.pipeline_options import PdfPipelineOptions
from docling.datamodel.base_models import InputFormat

pipeline_options = PdfPipelineOptions()
pipeline_options.do_code_enrichment = True

converter = DocumentConverter(format_options={
    InputFormat.PDF: PdfFormatOption(pipeline_options=pipeline_options)
})

result = converter.convert("https://arxiv.org/pdf/2501.17887")
doc = result.document
```

### Formula understanding

The formula understanding step will analize the equation formulas in documents and extract their LaTeX representation. The HTML export functions in the DoclingDocument will leverage the formula and visualize the result using the mathml html syntax.

Model specs: see the [`CodeFormula` model card](https://huggingface.co/ds4sd/CodeFormula).

Example command line:

```
docling --enrich-formula FILE
```

Example code:

```
from docling.document_converter import DocumentConverter, PdfFormatOption
from docling.datamodel.pipeline_options import PdfPipelineOptions
from docling.datamodel.base_models import InputFormat

pipeline_options = PdfPipelineOptions()
pipeline_options.do_formula_enrichment = True

converter = DocumentConverter(format_options={
    InputFormat.PDF: PdfFormatOption(pipeline_options=pipeline_options)
})

result = converter.convert("https://arxiv.org/pdf/2501.17887")
doc = result.document
```

### Picture classification

The picture classification step classifies the `PictureItem` elements in the document with the `DocumentFigureClassifier` model. This model is specialized to understand the classes of pictures found in documents, e.g. different chart types, flow diagrams, logos, signatures, etc.

Model specs: see the [`DocumentFigureClassifier` model card](https://huggingface.co/ds4sd/DocumentFigureClassifier).

Example command line:

```
docling --enrich-picture-classes FILE
```

Example code:

```
from docling.document_converter import DocumentConverter, PdfFormatOption
from docling.datamodel.pipeline_options import PdfPipelineOptions
from docling.datamodel.base_models import InputFormat

pipeline_options = PdfPipelineOptions()
pipeline_options.generate_picture_images = True
pipeline_options.images_scale = 2
pipeline_options.do_picture_classification = True

converter = DocumentConverter(format_options={
    InputFormat.PDF: PdfFormatOption(pipeline_options=pipeline_options)
})

result = converter.convert("https://arxiv.org/pdf/2501.17887")
doc = result.document
```

### Picture description

The picture description step allows to annotate a picture with a vision model. This is also known as a "captioning" task. The Docling pipeline allows to load and run models completely locally as well as connecting to remote API which support the chat template. Below follow a few examples on how to use some common vision model and remote services.

```
from docling.document_converter import DocumentConverter, PdfFormatOption
from docling.datamodel.pipeline_options import PdfPipelineOptions
from docling.datamodel.base_models import InputFormat

pipeline_options = PdfPipelineOptions()
pipeline_options.do_picture_description = True

converter = DocumentConverter(format_options={
    InputFormat.PDF: PdfFormatOption(pipeline_options=pipeline_options)
})

result = converter.convert("https://arxiv.org/pdf/2501.17887")
doc = result.document
```

#### Granite Vision model

Model specs: see the [`ibm-granite/granite-vision-3.1-2b-preview` model card](https://huggingface.co/ibm-granite/granite-vision-3.1-2b-preview).

Usage in Docling:

```
from docling.datamodel.pipeline_options import granite_picture_description

pipeline_options.picture_description_options = granite_picture_description
```

#### SmolVLM model

Model specs: see the [`HuggingFaceTB/SmolVLM-256M-Instruct` model card](https://huggingface.co/HuggingFaceTB/SmolVLM-256M-Instruct).

Usage in Docling:

```
from docling.datamodel.pipeline_options import smolvlm_picture_description

pipeline_options.picture_description_options = smolvlm_picture_description
```

#### Other vision models

The option class `PictureDescriptionVlmOptions` allows to use any another model from the Hugging Face Hub.

```
from docling.datamodel.pipeline_options import PictureDescriptionVlmOptions

pipeline_options.picture_description_options = PictureDescriptionVlmOptions(
    repo_id="",  # <-- add here the Hugging Face repo_id of your favorite VLM
    prompt="Describe the image in three sentences. Be consise and accurate.",
)
```

#### Remote vision model

The option class `PictureDescriptionApiOptions` allows to use models hosted on remote platforms, e.g. on local endpoints served by [VLLM](https://docs.vllm.ai), [Ollama](https://ollama.com/) and others, or cloud providers like [IBM watsonx.ai](https://www.ibm.com/products/watsonx-ai), etc.

*Note: in most cases this option will send your data to the remote service provider.*

Usage in Docling:

```
from docling.datamodel.pipeline_options import PictureDescriptionApiOptions

# Enable connections to remote services
pipeline_options.enable_remote_services=True  # <-- this is required!

# Example using a model running locally, e.g. via VLLM
# $ vllm serve MODEL_NAME
pipeline_options.picture_description_options = PictureDescriptionApiOptions(
    url="http://localhost:8000/v1/chat/completions",
    params=dict(
        model="MODEL NAME",
        seed=42,
        max_completion_tokens=200,
    ),
    prompt="Describe the image in three sentences. Be consise and accurate.",
    timeout=90,
)
```
# `docling`

## Vision Models

The `VlmPipeline` in Docling allows to convert documents end-to-end using a vision-language model.

Docling supports vision-language models which output:

- DocTags (e.g. [SmolDocling](https://huggingface.co/ds4sd/SmolDocling-256M-preview)), the preferred choice
- Markdown
- HTML

For running Docling using local models with the `VlmPipeline`:

CLIPython

```
docling --pipeline vlm FILE
```

See also the example [minimal\_vlm\_pipeline.py](https://docling-project.github.io/docling/examples/minimal_vlm_pipeline/).

```py
from docling.datamodel.base_models import InputFormat
from docling.document_converter import DocumentConverter, PdfFormatOption
from docling.pipeline.vlm_pipeline import VlmPipeline

converter = DocumentConverter(
    format_options={
        InputFormat.PDF: PdfFormatOption(
            pipeline_cls=VlmPipeline,
        ),
    }
)

doc = converter.convert(source="FILE").document
```

## Available local models

By default, the vision-language models are running locally. Docling allows to choose between the Hugging Face [Transformers](https://github.com/huggingface/transformers) framweork and the [MLX](https://github.com/Blaizzy/mlx-vlm) (for Apple devices with MPS acceleration) one.

The following table reports the models currently available out-of-the-box.

| Model instance                                | Model                                                                                                         | Framework                             | Device | Num pages | Inference time (sec) |
|-----------------------------------------------|---------------------------------------------------------------------------------------------------------------|---------------------------------------|--------|-----------|----------------------|
| `vlm_model_specs.SMOLDOCLING_TRANSFORMERS`    | [ds4sd/SmolDocling-256M-preview](https://huggingface.co/ds4sd/SmolDocling-256M-preview)                       | `Transformers/AutoModelForVision2Seq` | MPS    | 1         | 102.212              |
| `vlm_model_specs.SMOLDOCLING_MLX`             | [ds4sd/SmolDocling-256M-preview-mlx-bf16](https://huggingface.co/ds4sd/SmolDocling-256M-preview-mlx-bf16)     | `MLX`                                 | MPS    | 1         | 6.15453              |
| `vlm_model_specs.QWEN25_VL_3B_MLX`            | [mlx-community/Qwen2.5-VL-3B-Instruct-bf16](https://huggingface.co/mlx-community/Qwen2.5-VL-3B-Instruct-bf16) | `MLX`                                 | MPS    | 1         | 23.4951              |
| `vlm_model_specs.PIXTRAL_12B_MLX`             | [mlx-community/pixtral-12b-bf16](https://huggingface.co/mlx-community/pixtral-12b-bf16)                       | `MLX`                                 | MPS    | 1         | 308.856              |
| `vlm_model_specs.GEMMA3_12B_MLX`              | [mlx-community/gemma-3-12b-it-bf16](https://huggingface.co/mlx-community/gemma-3-12b-it-bf16)                 | `MLX`                                 | MPS    | 1         | 378.486              |
| `vlm_model_specs.GRANITE_VISION_TRANSFORMERS` | [ibm-granite/granite-vision-3.2-2b](https://huggingface.co/ibm-granite/granite-vision-3.2-2b)                 | `Transformers/AutoModelForVision2Seq` | MPS    | 1         | 104.75               |
| `vlm_model_specs.PHI4_TRANSFORMERS`           | [microsoft/Phi-4-multimodal-instruct](https://huggingface.co/microsoft/Phi-4-multimodal-instruct)             | `Transformers/AutoModelForCasualLM`   | CPU    | 1         | 1175.67              |
| `vlm_model_specs.PIXTRAL_12B_TRANSFORMERS`    | [mistral-community/pixtral-12b](https://huggingface.co/mistral-community/pixtral-12b)                         | `Transformers/AutoModelForVision2Seq` | CPU    | 1         | 1828.21              |

*Inference time is computed on a Macbook M3 Max using the example page `tests/data/pdf/2305.03393v1-pg9.pdf`. The comparision is done with the example [compare\_vlm\_models.py](https://docling-project.github.io/docling/examples/compare_vlm_models/).*

For choosing the model, the code snippet above can be extended as follow

```py
from docling.datamodel.base_models import InputFormat
from docling.document_converter import DocumentConverter, PdfFormatOption
from docling.pipeline.vlm_pipeline import VlmPipeline
from docling.datamodel.pipeline_options import (
    VlmPipelineOptions,
)
from docling.datamodel import vlm_model_specs

pipeline_options = VlmPipelineOptions(
    vlm_options=vlm_model_specs.SMOLDOCLING_MLX,  # <-- change the model here
)

converter = DocumentConverter(
    format_options={
        InputFormat.PDF: PdfFormatOption(
            pipeline_cls=VlmPipeline,
            pipeline_options=pipeline_options,
        ),
    }
)

doc = converter.convert(source="FILE").document
```

### Other models

Other models can be configured by directly providing the Hugging Face `repo_id`, the prompt and a few more options.

For example:

```py
from docling.datamodel.pipeline_options_vlm_model import InlineVlmOptions, InferenceFramework, TransformersModelType

pipeline_options = VlmPipelineOptions(
    vlm_options=InlineVlmOptions(
        repo_id="ibm-granite/granite-vision-3.2-2b",
        prompt="Convert this page to markdown. Do not miss any text and only output the bare markdown!",
        response_format=ResponseFormat.MARKDOWN,
        inference_framework=InferenceFramework.TRANSFORMERS,
        transformers_model_type=TransformersModelType.AUTOMODEL_VISION2SEQ,
        supported_devices=[
            AcceleratorDevice.CPU,
            AcceleratorDevice.CUDA,
            AcceleratorDevice.MPS,
        ],
        scale=2.0,
        temperature=0.0,
    )
)
```
