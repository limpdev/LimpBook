> Details + Methods for Utlizing Localized **Vision LLM** Models

[Automatic image describer.](https://imgur.com/gkfsvhA)

[PDF OCR script.](https://imgur.com/ApEipWs)

[Here is a copy of the PDF OCR script.](https://pastebin.com/tCir9gnQ)

The great thing about koboldcpp is that it is one executable. No python dependencies, transformers or loading hugging face crap which downloads to cache directories, no messing with command line settings, no opening ports, no dealing with ollama, no docker. Just launch it, point it at a model and a projector, and run your script which talks to the api and gets a response back.

```python
import argparse
import base64
import requests
import fitz  # PyMuPDF
import io
 
def process_pdf(file_path):
    try:
        doc = fitz.open(file_path)
        processed_images = []
        
        for page in doc:
            pix = page.get_pixmap()
            img_bytes = pix.tobytes("jpeg")
            base64_encoded = base64.b64encode(img_bytes).decode('utf-8')
            processed_images.append(base64_encoded)
        
        return processed_images, doc.page_count
    except Exception as e:
        print(f"Error processing PDF: {str(e)}")
        return None, None
 
class LLMProcessor:
    def __init__(self, api_url, api_password):
        self.api_url = api_url
        self.headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_password}",
        }
 
    def send_image_to_llm(self, base64_image, page_number, total_pages):
        prompt = f"<|im_start|>user\nRepeat verbatim all text on the image.<|im_end|>\n<|im_start|>assistant\n"
        payload = {
            "prompt": prompt,
            "max_length": 2048,
            "images": [base64_image],
            "temp": 0,
        }
        response = requests.post(f"{self.api_url}/api/v1/generate", json=payload, headers=self.headers)
        if response.status_code == 200:
            return response.json()["results"][0].get("text")
        else:
            print(f"Error: {response.status_code} - {response.text}")
            return None
 
def main():
    parser = argparse.ArgumentParser(description="Send all PDF images to LLM API")
    parser.add_argument("pdf_path", help="Path to the PDF file")
    parser.add_argument("--api-url", default="http://localhost:5001", help="URL for the LLM API")
    parser.add_argument("--api-password", default="", help="Password for the LLM API")
    args = parser.parse_args()
 
    llm_processor = LLMProcessor(args.api_url, args.api_password)
 
    base64_images, total_pages = process_pdf(args.pdf_path)
    if base64_images and total_pages:
        print(f"Processing PDF with {total_pages} pages.")
        for i, base64_image in enumerate(base64_images, start=1):
            print(f"\nProcessing page {i} of {total_pages}:")
            result = llm_processor.send_image_to_llm(base64_image, i, total_pages)
            if result:
                print("LLM Response:")
                print(result)
            else:
                print(f"Failed to get a response from the LLM for page {i}.")
    else:
        print("Failed to process the PDF.")
 
if __name__ == "__main__":
    main()
```

___

## KoboldCpp Vision Model Guide

## Getting Started

### Introductory Note

I am not an expert in this area, I just have a bit of experience. Any information contained herein is based on what I have learned through trial and error and public information. Corrections, additions, and good-faith criticisms are welcome!

### Language Models and Vision Projectors

For each set of quantized vision system weights we care about two parts:

-   The language model
    
-   The projector
    

When quantized as gguf they are generally useable by KoboldCpp.

The language model starts as either a foundational or a fine tune, but it is almost always going to be instruct model. It will be named similar to other quantized lanuage models but will usually contain the name of the vision system in the filename. A few examples:

-   Bunny-Llama-3-8B-V-Q4\_K\_M
    
-   LLaVA-NeXT-Video-7B-DPO-7B-Q8\_0
    
-   llava-v1.6-34b.Q5\_K\_M
    
-   llava-phi-3-mini-f16
    

The projectors are trained along with the language model and are actually part of the same model weights in the unquantized, non-gguf state. When converted to gguf the vision encoder is removed and quantized separately as its own file. It is advised to keep the projector as F16 or otherwise as little quantized as possible due to the more negative effects of quantization on vision systems. They almost always have the term 'mmproj' in the filename and match their language pair. A few examples to match the ones given above:

-   Bunny-Llama-3-8B-V-mmproj-model-f16
    
-   llava-next-video-mmproj-f16
    
-   llava-v1.6-34b-mmproj-model-f16
    
-   llava-phi-3-mini-mmproj-f16
    

_HOWEVER_

Many times the projectors are generically named. They come out of the gguf conversion process with the naming scheme mmproj-model- followed by the quant and are not appropriately named by the repo holder, so it is highly possible to end up with a bunch of copies of mmproj-model-f16 and no idea what to do with them. Don't let this happen! Name them as you download them so instead of:

-   MiniCPM-V-2\_6-Q6\_K\_L.gguf
    
-   mmproj-model-f16.gguf
    

you have:

-   MiniCPM-V-2\_6-Q6\_K\_L.gguf
    
-   minicpm-V-2-6-mmproj-model-f16.gguf
    

Whatever naming scheme you choose, make it INTUITIVE and CONSISTENT.

Once you have the language and vision gguf pairs, you run them in the KoboldCpp by selecting the lanuage model as the model, and set the mmproj as the projector. In the GUI this will be found the 'Model file' section. In the command line the flag is --mmproj followed by the location of the projector. You want generally want to follow the guidlines advised for the lanuage model you are using for any settings like flash attention or samplers.

### Moving Forward

When you want to move away from the 'showroom' weights you have a lot of room to experiment due to the modular nature of vision projectors. Once you have a vision projector trained to work with a certain model base architecture and parameter size, you can _generally_ use that projector with other tunes with the same base.

Note: you _do not_ have to match the quant of the projector with the language model. The projector should almost always be F16 and the language model can be whatever quant you are happy with (Q4\_K\_M, Q6\_K, IQ3\_XS, etc).

Example of know working combinations:

-   Tunes: Uncensored\_Qwen2-7B, Einstein-v7-Qwen2-7B
    
-   Projector: minicpm-V-2-6-mmproj
    

Llama 3.1 and 3.0 can often share projectors and language models. Examples:

-   Tunes: Medical-Llama3-v2, sfr-iterative-dpo-llama-3-8b, Meta-Llama-3.1-8B-Instruct-abliterated
    
-   Projectors: llava-llama-3-8b-v1\_1-mmproj, llava-llama-3.1-8b-mmproj-f16, minicpm-V-2-5-mmproj
    

## Theory

-   A CLIP model is usually composed of a vision encoder and a text encoder. The vision encoder takes features of an image and converts them into embeddings. The text encoder does the same but with text. When combined they can do things like classify images by comparing them with given words or compare descriptions with images and see if they match. This is useful for things like searching and image generation. However, a plain CLIP model is not capable of generating text the way an LLM can.
    
-   The way vision models work with KoboldCPP is by taking a CLIP model, usually a vision transformer (ViT), and replacing or supplementing the text encoder with an LLM. By training together, the LLM is then able to generate text while accessing the embeddings shared with the vision model.
    
-   The bridge between them takes the form of a projector. This projector is highly modular. It can be swapped between LLM model weights, but it cannot move across model architectures! You cannot attach a Vicuna projector to a Llama 3 language model, or even a Vicuna 7B projector with a Vicuna 13B model! However, given the active nature of the fine-tuning community, you usually have a great number of models to choose from for a given projector.
    

## Step-by-step through API

1.  Image files are converted to a text representation of their binary data, called base64. This was developed as a way to send binary files over text mediums, like adding a zip file in the body of a text file.
    
2.  The base64 text is sent to the KoboldCPP backend over the API in a JSON file as an item in an array called 'Images'. Up to four images can be in this array. Also in the JSON is the prompt as a string in the prompt field, sampler settings, and other optional values the client can specify.
    
3.  The image data is sent behind the context and memory and the prompt, so if these are long, the image may lose relevance to the model.
    
4.  The image is decoded by KoboldCPP and sent to the CLIP encoder. This processes the image, turning it into an array of RGB number values, then resizes it and segments it into portions as specified by the model. It is commonly chopped into 'patches' of 14x14 pixels, which are roughly the equivalent of an image 'token'.
    
5.  These patches are then turned into embeddings, which are a series of high-dimensional numbers called vectors. The LLM and the image projector have been trained to share the same vector space, so the vision model can send this to the language model which can 'see' it the same way it grasps ideas in language.
    

## FAQ:

### How do I know which projector can work with which model?

The same way you know which prompt template to use for a fine-tune: either you are told or you figure out what the base model is, or you just try it and see if it works or not. Do not despair, though, for I have included here a list at the bottom of this guide to get you started.

### I am getting nonsense or repetitive generations. What is happening?

Your prompt is bad, your model and projector fit well enough to not crash KoboldCPP but not well enough to actually work, or your sampler settings are wrong. Even if you send it an image composed of random pixels it should still produce coherent generations when asked about it (I have tried it).

### The model is ignoring the image!

KoboldCPP attaches the image behind the memory, context, and prompt. If those are too long it gets lost and the model forgets about it.

### It refuses to see what is actually in the image!

Yeah, if your image has people in it touching each other's bathing suit areas, it tends to either ignore that, ignore the image completely, or mention an 'intimate moment'.

### I have a question about something not addressed in this document.

Add a comment with your question and I will try to answer it.

## List

This is a partial list of some language and projector pairs, along with the type of vision encoder and image dimensions (this can be deceiving; there are a lot of factors that make the projectors good or bad for your purposes besides these; they are just for reference). Feel free to add corrections and additions:

-   Llava Phi
    
    -   Phi-3 Mini 4k 4B (clip-vit-large-patch14-336)
        
-   Xtuner
    
    -   Llama 3 8B (336)
        
-   Llava 1.5
    
    -   Mistral 7B (vit-large336-custom)
        
    -   Phi-2 3B
        
-   Unhinged
    
    -   Llama 3.1 8B
        
-   Llava 1.6 (Llava Next)
    
    -   Nous-Hermes-Yi 34B (vit-large336-custom)
        
    -   Vicuna 1.5 7B, 13B (vit-large336-custom)
        
    -   Mistral 7B (vit-large336-custom)
        
    -   Llama 3 8B (clip-vit-large-patch14-336)
        
-   Llava Next Video
    
    -   Mistral 7B (vit-large336-custom)
        
-   MobileVLM
    
    -   MobileLlama 1.4B (?) (?)
        
-   MobileVLM 2.1
    
    -   MobileLlama 1.4B (2048) (clip-vit-large-patch14-336)
        
-   MiniCPM 2.5
    
    -   Llama 3 8B (image encoder for MiniCPM-V) (448px)
        
-   MiniCPM 2.6
    
    -   Qwen2 7B (image encoder for MiniCPM-V) (448px)
        
-   ShareGPT4V
    
    -   Vicuna 7B, 13B (vit-large336-l12)
        
-   Bunny V
    
    -   Phi-3 Mini 4K 4B
        
    -   Llama3 8B