# unsloth - replace ollama!

## ✨ Finetune for Free

All notebooks are **beginner friendly**! Add your dataset, click “Run All”, and you’ll get a 2x faster finetuned model which can be exported to GGUF, Ollama, vLLM or uploaded to Hugging Face.

Unsloth supports | Free Notebooks | Performance | Memory use  
---|---|---|---  
**Llama 3.2 (3B)** | [▶️ Start for free](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/Llama3.2_\(1B_and_3B)-Conversational.ipynb) | 2x faster | 70% less  
**GRPO (R1 reasoning)** | [▶️ Start for free](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/Llama3.1_\(8B)-GRPO.ipynb) | 2x faster | 80% less  
**Phi-4 (14B)** | [▶️ Start for free](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/Phi_4-Conversational.ipynb) | 2x faster | 70% less  
**Llama 3.2 Vision (11B)** | [▶️ Start for free](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/Llama3.2_\(11B)-Vision.ipynb) | 2x faster | 50% less  
**Llama 3.1 (8B)** | [▶️ Start for free](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/Llama3.1_\(8B)-Alpaca.ipynb) | 2x faster | 70% less  
**Gemma 2 (9B)** | [▶️ Start for free](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/Gemma2_\(9B)-Alpaca.ipynb) | 2x faster | 70% less  
**Qwen 2.5 (7B)** | [▶️ Start for free](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/Qwen2.5_\(7B)-Alpaca.ipynb) | 2x faster | 70% less  
**Mistral v0.3 (7B)** | [▶️ Start for free](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/Mistral_v0.3_\(7B)-Conversational.ipynb) | 2.2x faster | 75% less  
**Ollama** | [▶️ Start for free](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/Llama3_\(8B)-Ollama.ipynb) | 1.9x faster | 60% less  
**DPO Zephyr** | [▶️ Start for free](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/Zephyr_\(7B)-DPO.ipynb) | 1.9x faster | 50% less  
  
  * See [all our notebooks](https://docs.unsloth.ai/get-started/unsloth-notebooks) and [all our models](https://docs.unsloth.ai/get-started/all-our-models)
  * **Kaggle Notebooks** for [Llama 3.2 Kaggle notebook](https://www.kaggle.com/danielhanchen/kaggle-llama-3-2-1b-3b-unsloth-notebook), [Llama 3.1 (8B)](https://www.kaggle.com/danielhanchen/kaggle-llama-3-1-8b-unsloth-notebook), [Gemma 2 (9B)](https://www.kaggle.com/code/danielhanchen/kaggle-gemma-7b-unsloth-notebook/), [Mistral (7B)](https://www.kaggle.com/code/danielhanchen/kaggle-mistral-7b-unsloth-notebook)
  * Run notebooks for [Llama 3.2 conversational](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/Llama3.2_\(1B_and_3B)-Conversational.ipynb), [Llama 3.1 conversational](https://colab.research.google.com/drive/15OyFkGoCImV9dSsewU1wa2JuKB4-mDE_?usp=sharing) and [Mistral v0.3 ChatML](https://colab.research.google.com/drive/15F1xyn8497_dUbxZP4zWmPZ3PJx1Oymv?usp=sharing)
  * This [continued pretraining notebook](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/Mistral_v0.3_\(7B)-CPT.ipynb) is for learning another language
  * Click [here](https://docs.unsloth.ai/) for detailed documentation for Unsloth.



## 🦥 Unsloth.ai News

  * 📣 NEW! Introducing [Reasoning](https://unsloth.ai/blog/r1-reasoning) in Unsloth. You can now reproduce DeepSeek-R1’s “aha” moment with just 7GB VRAM. Transform Llama, Phi, Mistral etc. into reasoning LLMs!
  * 📣 NEW! [DeepSeek-R1](https://unsloth.ai/blog/deepseek-r1) \- the most powerful open reasoning models with Llama & Qwen distillations. Run or fine-tune them now! More details: [unsloth.ai/blog/deepseek-r1](https://unsloth.ai/blog/deepseek-r1). All model uploads: [here](https://huggingface.co/collections/unsloth/deepseek-r1-all-versions-678e1c48f5d2fce87892ace5).
  * 📣 NEW! [Phi-4](https://unsloth.ai/blog/phi4) by Microsoft is now supported. We also [fixed bugs](https://unsloth.ai/blog/phi4) in Phi-4 and [uploaded GGUFs, 4-bit](https://huggingface.co/collections/unsloth/phi-4-all-versions-677eecf93784e61afe762afa). Try the [Phi-4 Colab notebook](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/Phi_4-Conversational.ipynb)
  * 📣 NEW! [Llama 3.3 (70B)](https://huggingface.co/collections/unsloth/llama-33-all-versions-67535d7d994794b9d7cf5e9f), Meta’s latest model is supported.
  * 📣 NEW! We worked with Apple to add [Cut Cross Entropy](https://arxiv.org/abs/2411.09009). Unsloth now supports 89K context for Meta’s Llama 3.3 (70B) on a 80GB GPU - 13x longer than HF+FA2. For Llama 3.1 (8B), Unsloth enables 342K context, surpassing its native 128K support.
  * 📣 Introducing Unsloth [Dynamic 4-bit Quantization](https://unsloth.ai/blog/dynamic-4bit)! We dynamically opt not to quantize certain parameters and this greatly increases accuracy while only using <10% more VRAM than BnB 4-bit. See our collection on [Hugging Face here.](https://huggingface.co/collections/unsloth/unsloth-4-bit-dynamic-quants-67503bb873f89e15276c44e7)
  * 📣 [Vision models](https://unsloth.ai/blog/vision) now supported! [Llama 3.2 Vision (11B)](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/Llama3.2_\(11B)-Vision.ipynb), [Qwen 2.5 VL (7B)](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/Qwen2_VL_\(7B)-Vision.ipynb) and [Pixtral (12B) 2409](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/Pixtral_\(12B)-Vision.ipynb)



Click for more news

  * 📣 We found and helped fix a [gradient accumulation bug](https://unsloth.ai/blog/gradient)! Please update Unsloth and transformers.
  * 📣 Try out [Chat interface](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/Unsloth_Studio.ipynb)!
  * 📣 NEW! Qwen-2.5 including [Coder](https://unsloth.ai/blog/qwen-coder) models are now supported with bugfixes. 14b fits in a Colab GPU! [Qwen 2.5 conversational notebook](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/Qwen2.5_Coder_\(14B)-Conversational.ipynb)
  * 📣 NEW! [Mistral Small 22b notebook](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/Mistral_Small_\(22B)-Alpaca.ipynb) finetuning fits in under 16GB of VRAM!
  * 📣 NEW! `pip install unsloth` now works! Head over to [pypi](https://pypi.org/project/unsloth/) to check it out! This allows non git pull installs. Use `pip install unsloth[colab-new]` for non dependency installs.
  * 📣 NEW! Continued Pretraining [notebook](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/Mistral_v0.3_\(7B)-CPT.ipynb) for other languages like Korean!
  * 📣 [2x faster inference](https://colab.research.google.com/github/unslothai/notebooks/blob/main/nb/Llama3.1_\(8B)-Inference.ipynb) added for all our models
  * 📣 We cut memory usage by a [further 30%](https://unsloth.ai/blog/long-context) and now support [4x longer context windows](https://unsloth.ai/blog/long-context)!



## 🔗 Links and Resources

Type | Links  
---|---  
📚 **Documentation & Wiki** | [Read Our Docs](https://docs.unsloth.ai/)  
💾 **Installation** | [unsloth/README.md](https://github.com/unslothai/unsloth/tree/main#-installation-instructions)  
🥇 **Benchmarking** | [Performance Tables](https://github.com/unslothai/unsloth/tree/main#-performance-benchmarking)  
🌐 **Released Models** | [Unsloth Releases](https://docs.unsloth.ai/get-started/all-our-models)  
✍️ **Blog** | [Read our Blogs](https://unsloth.ai/blog)  
  
## ⭐ Key Features

  * All kernels written in [OpenAI’s Triton](https://openai.com/index/triton/) language. **Manual backprop engine**.
  * **0% loss in accuracy** \- no approximation methods - all exact.
  * No change of hardware. Supports NVIDIA GPUs since 2018+. Minimum CUDA Capability 7.0 (V100, T4, Titan V, RTX 20, 30, 40x, A100, H100, L40 etc) [Check your GPU!](https://developer.nvidia.com/cuda-gpus) GTX 1070, 1080 works, but is slow.
  * Works on **Linux** and **Windows** via WSL.
  * Supports 4bit and 16bit QLoRA / LoRA finetuning via [bitsandbytes](https://github.com/TimDettmers/bitsandbytes).
  * Open source trains 5x faster - see [Unsloth Pro](https://unsloth.ai/) for up to **30x faster training**!



### Citation

You can cite the Unsloth repo as follows:
``` 
    @software{unsloth,
      author = {Daniel Han, Michael Han and Unsloth team},
      title = {Unsloth},
      url = {http://github.com/unslothai/unsloth},
      year = {2023}
    }
    
```

### Thank You to

  * [Erik](https://github.com/erikwijmans) for his help adding [Apple’s ML Cross Entropy](https://github.com/apple/ml-cross-entropy) in Unsloth
  * [HuyNguyen-hust](https://github.com/HuyNguyen-hust) for making [RoPE Embeddings 28% faster](https://github.com/unslothai/unsloth/pull/238)
  * [RandomInternetPreson](https://github.com/RandomInternetPreson) for confirming WSL support
  * [152334H](https://github.com/152334H) for experimental DPO support
  * [atgctg](https://github.com/atgctg) for syntax highlighting


