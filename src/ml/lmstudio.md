# LM Studio Server + CLI

To call a list of models that are loaded/ready

```bash
curl http://127.0.0.1:1234/v1/models/
```

...and for Windows PowerShell:

```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:1234/v1/models/"
```

#### Chat Completion (UNIX)

> [!TIP]
> On Windows, use Git Bash instead.

```bash
curl http://127.0.0.1:1234/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<your-model-here>",
    "messages": [ 
      { "role": "system", "content": "Always answer in rhymes." },
      { "role": "user", "content": "Introduce yourself." }
    ], 
    "temperature": 0.7, 
    "max_tokens": -1,
    "stream": true
  }'

```

---

Below is a Python chatbot example that uses tools through OpenAI-like calls to the chat.completions API, enabling an LM Studio model to query wikipedia.

```python
# Steps (in LM Studio):
# - Load a model
# - Start the server
# - Save the below example code with the "Save as Python File" button
# - Copy and paste the post-save command into your terminal and press Enter

"""
LM Studio Tool Use Demo: Wikipedia Querying Chatbot
Demonstrates how an LM Studio model can query Wikipedia
"""

# Standard library imports
import itertools
import json
import shutil
import sys
import threading
import time
import urllib.parse
import urllib.request

# Third-party imports
from openai import OpenAI

# Initialize LM Studio client
client = OpenAI(base_url="http://127.0.0.1:1234/v1", api_key="lm-studio")
MODEL = "<your-model-here>"


def fetch_wikipedia_content(search_query: str) -> dict:
    """Fetches wikipedia content for a given search_query"""
    try:
        # Search for most relevant article
        search_url = "https://en.wikipedia.org/w/api.php"
        search_params = {
            "action": "query",
            "format": "json",
            "list": "search",
            "srsearch": search_query,
            "srlimit": 1,
        }

        url = f"{search_url}?{urllib.parse.urlencode(search_params)}"
        with urllib.request.urlopen(url) as response:
            search_data = json.loads(response.read().decode())

        if not search_data["query"]["search"]:
            return {
                "status": "error",
                "message": f"No Wikipedia article found for '{search_query}'",
            }

        # Get the normalized title from search results
        normalized_title = search_data["query"]["search"][0]["title"]

        # Now fetch the actual content with the normalized title
        content_params = {
            "action": "query",
            "format": "json",
            "titles": normalized_title,
            "prop": "extracts",
            "exintro": "true",
            "explaintext": "true",
            "redirects": 1,
        }

        url = f"{search_url}?{urllib.parse.urlencode(content_params)}"
        with urllib.request.urlopen(url) as response:
            data = json.loads(response.read().decode())

        pages = data["query"]["pages"]
        page_id = list(pages.keys())[0]

        if page_id == "-1":
            return {
                "status": "error",
                "message": f"No Wikipedia article found for '{search_query}'",
            }

        content = pages[page_id]["extract"].strip()
        return {
            "status": "success",
            "content": content,
            "title": pages[page_id]["title"],
        }

    except Exception as e:
        return {"status": "error", "message": str(e)}


# Define tool for LM Studio
WIKI_TOOL = {
    "type": "function",
    "function": {
        "name": "fetch_wikipedia_content",
        "description": (
            "Search Wikipedia and fetch the introduction of the most relevant article. "
            "Always use this if the user is asking for something that is likely on wikipedia. "
            "If the user has a typo in their search query, correct it before searching."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "search_query": {
                    "type": "string",
                    "description": "Search query for finding the Wikipedia article",
                },
            },
            "required": ["search_query"],
        },
    },
}


# Class for displaying the state of model processing
class Spinner:
    def __init__(self, message="Processing..."):
        self.spinner = itertools.cycle(["-", "/", "|", "\\"])
        self.busy = False
        self.delay = 0.1
        self.message = message
        self.thread = None

    def write(self, text):
        sys.stdout.write(text)
        sys.stdout.flush()

    def _spin(self):
        while self.busy:
            self.write(f"\r{self.message} {next(self.spinner)}")
            time.sleep(self.delay)
        self.write("\r\033[K")  # Clear the line

    def __enter__(self):
        self.busy = True
        self.thread = threading.Thread(target=self._spin)
        self.thread.start()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.busy = False
        time.sleep(self.delay)
        if self.thread:
            self.thread.join()
        self.write("\r")  # Move cursor to beginning of line


def chat_loop():
    """
    Main chat loop that processes user input and handles tool calls.
    """
    messages = [
        {
            "role": "system",
            "content": (
                "You are an assistant that can retrieve Wikipedia articles. "
                "When asked about a topic, you can retrieve Wikipedia articles "
                "and cite information from them."
            ),
        }
    ]

    print(
        "Assistant: "
        "Hi! I can access Wikipedia to help answer your questions about history, "
        "science, people, places, or concepts - or we can just chat about "
        "anything else!"
    )
    print("(Type 'quit' to exit)")

    while True:
        user_input = input("\nYou: ").strip()
        if user_input.lower() == "quit":
            break

        messages.append({"role": "user", "content": user_input})
        try:
            with Spinner("Thinking..."):
                response = client.chat.completions.create(
                    model=MODEL,
                    messages=messages,
                    tools=[WIKI_TOOL],
                )

            if response.choices[0].message.tool_calls:
                # Handle all tool calls
                tool_calls = response.choices[0].message.tool_calls

                # Add all tool calls to messages
                messages.append(
                    {
                        "role": "assistant",
                        "tool_calls": [
                            {
                                "id": tool_call.id,
                                "type": tool_call.type,
                                "function": tool_call.function,
                            }
                            for tool_call in tool_calls
                        ],
                    }
                )

                # Process each tool call and add results
                for tool_call in tool_calls:
                    args = json.loads(tool_call.function.arguments)
                    result = fetch_wikipedia_content(args["search_query"])

                    # Print the Wikipedia content in a formatted way
                    terminal_width = shutil.get_terminal_size().columns
                    print("\n" + "=" * terminal_width)
                    if result["status"] == "success":
                        print(f"\nWikipedia article: {result['title']}")
                        print("-" * terminal_width)
                        print(result["content"])
                    else:
                        print(
                            f"\nError fetching Wikipedia content: {result['message']}"
                        )
                    print("=" * terminal_width + "\n")

                    messages.append(
                        {
                            "role": "tool",
                            "content": json.dumps(result),
                            "tool_call_id": tool_call.id,
                        }
                    )

                # Stream the post-tool-call response
                print("\nAssistant:", end=" ", flush=True)
                stream_response = client.chat.completions.create(
                    model=MODEL, messages=messages, stream=True
                )
                collected_content = ""
                for chunk in stream_response:
                    if chunk.choices[0].delta.content:
                        content = chunk.choices[0].delta.content
                        print(content, end="", flush=True)
                        collected_content += content
                print()  # New line after streaming completes
                messages.append(
                    {
                        "role": "assistant",
                        "content": collected_content,
                    }
                )
            else:
                # Handle regular response
                print("\nAssistant:", response.choices[0].message.content)
                messages.append(
                    {
                        "role": "assistant",
                        "content": response.choices[0].message.content,
                    }
                )

        except Exception as e:
            print(
                f"\nError chatting with the LM Studio server!\n\n"
                f"Please ensure:\n"
                f"1. LM Studio server is running at 127.0.0.1:1234 (hostname:port)\n"
                f"2. Model '{MODEL}' is downloaded\n"
                f"3. Model '{MODEL}' is loaded, or that just-in-time model loading is enabled\n\n"
                f"Error details: {str(e)}\n"
                "See https://lmstudio.ai/docs/basics/server for more information"
            )
            exit(1)


if __name__ == "__main__":
    chat_loop()
```

Run the previous script after starting your server. **Remember that the model must be enabled for web queries.**

```bash
-> % python tool-use-example.py

Assistant: Hi! I can access Wikipedia to help answer your questions about history, science, people, places, or concepts - or we can just chat about anything else!
(Type 'quit' to exit)

You:

```

This example demonstrates a model requesting a tool call using the curl utility.

```bash
curl http://127.0.0.1:1234/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<your-model-here>",
    "messages": [{"role": "user", "content": "What dell products do you have under $50 in electronics?"}],
    "tools": [
      {
        "type": "function",
        "function": {
          "name": "search_products",
          "description": "Search the product catalog by various criteria. Use this whenever a customer asks about product availability, pricing, or specifications.",
          "parameters": {
            "type": "object",
            "properties": {
              "query": {
                "type": "string",
                "description": "Search terms or product name"
              },
              "category": {
                "type": "string", 
                "description": "Product category to filter by",
                "enum": ["electronics", "clothing", "home", "outdoor"]
              },
              "max_price": {
                "type": "number",
                "description": "Maximum price in dollars"
              }
            },
            "required": ["query"],
            "additionalProperties": false
          }
        }
      }
    ]
  }'

```

All parameters recognized by /v1/chat/completions will be honored, and the array of available tools should be provided in the tools field.

If the model decides that the user message would be best fulfilled with a tool call, an array of tool call request objects will be provided in the response field, choices[0].message.tool_calls.

The finish_reason field of the top-level response object will also be populated with "tool_calls".

- An example response to the above curl request will look like:

```bash
{
  "id": "chatcmpl-gb1t1uqzefudice8ntxd9i",
  "object": "chat.completion",
  "created": 1730913210,
  "model": "<your-model-here>",
  "choices": [
    {
      "index": 0,
      "logprobs": null,
      "finish_reason": "tool_calls",
      "message": {
        "role": "assistant",
        "tool_calls": [
          {
            "id": "365174485",
            "type": "function",
            "function": {
              "name": "search_products",
              "arguments": "{\"query\":\"dell\",\"category\":\"electronics\",\"max_price\":50}"
            }
          }
        ]
      }
    }
  ],
  "usage": {
    "prompt_tokens": 263,
    "completion_tokens": 34,
    "total_tokens": 297
  },
  "system_fingerprint": "<your-model-here>"
}
```

In plain english, the above response can be thought of as the model saying:


> "Please call the search_products function, with arguments:

-> 'dell' for the query parameter,

-> 'electronics' for the category parameter

-> '50' for the max_price parameter

-> and give me back the results"

The tool_calls field will need to be parsed to call actual functions/APIs, as shown in the Python example code.

```
┌──────────────────────────┐
│ SETUP: LLM + Tool list   │
└──────────┬───────────────┘
           ▼
┌──────────────────────────┐
│    Get user input        │◄────┐
└──────────┬───────────────┘     │
           ▼                     │
┌──────────────────────────┐     │
│ LLM prompted w/messages  │     │
└──────────┬───────────────┘     │
           ▼                     │
     Needs tools?                │
      │         │                │
    Yes         No               │
      │         │                │
      ▼         └────────────┐   │
┌─────────────┐              │   │
│Tool Response│              │   │
└──────┬──────┘              │   │
       ▼                     │   │
┌─────────────┐              │   │
│Execute tools│              │   │
└──────┬──────┘              │   │
       ▼                     ▼   │
┌─────────────┐          ┌───────────┐
│Add results  │          │  Normal   │
│to messages  │          │ response  │
└──────┬──────┘          └─────┬─────┘
       │                       ▲
       └───────────────────────┘

```

#### Tools and Functions

- Provide a list of these functions and their parameters to the model through the tools field of the /v1/chat/completions request body.

```python
# Function definition
def search_products(query: str, category: str = None, max_price: float = None):
    """
    Search products in catalog based on criteria
    Args:
        query: Search terms
        category: Product category filter
        max_price: Maximum price filter
    Returns:
        Search results
    """
    # Implementation here
    pass

# Corresponding Tool List Definition
tools = [
    {
        "type": "function",
        "function": {
            "name": "search_products",
            "description": "Search the product catalog by various criteria",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "Search terms or product name"
                    },
                    "category": {
                        "type": "string",
                        "description": "Product category to filter by",
                        "enum": ["electronics", "clothing", "home", "outdoor"]
                    },
                    "max_price": {
                        "type": "number",
                        "description": "Maximum price in dollars"
                    }
                },
                "required": ["query"]
            }
        }
    }
]
```

#### Image Input

The API supports requests containing images when a vision-enabled model (e.g. LLaVA) is loaded. Images are passed in using the messages array in a request to the /v1/chat/completions endpoint.

Important: The API does not recognize filepaths, so images must be encoded in base64. See pro tip for this below.

```bash
curl http://127.0.0.1:1234/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<your-model-here>",
    "messages": [
      { 
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "What is this image?"
          },
          {
            "type": "image_url",
            "image_url": { "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbCAYAAACN1PRVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQ2SURBVEhL3ZVrTBxVFMf/d2f2vcsCWxZYZKVQW4vVUmmtNpgaSSA1NUWpkFhpWkOwxsZa0WpqjMYXaTQR4wdjSttQ2tDaGIRqa5HWVmwFYgwasRhoeRipi1BWdpd9sDvjndmBZbzgt/ZDf1927jl3zv+ec8+ZJbcvLRBxk9AovzeFW1ds3jtzcQ6YHXcCQR+EsQEQuwvEaAPvGUCKdhK8cRq/BP1wTxKIyttjj78Iw9VuWLrPxQzzwIhtwb1wl+2FL8GGTcfq8U9SMlo3liK7vxdFJz+HzhBC/s52WF0e+ENAxxUeX/fwaPAWgBu/Bu3ffyiRWJgyuktfgc9KhY7XY8psUQnpzQGs3nVBFpIw64HC3AjefyKIrk1nsQxD4ECwf2yd7P8vjNi0XhcTMllw+rFyZA5dlYVMiT6s2X0BloxJZacal13EZzt82K5PRc60RbGqYcpYoy1BxJqM5rIKZAwPYkPzcSQ6xpH3zCUYkgPKrnkIcQi9W4zosA3b7ZfQyU0ojjhMZj5rAk5u3jIrZL9tlJbuu/8XktBGwT/UB1NtE5YUuBWjGkbsYnEJFrn/koUc2SNYVtmOs70RNHcQTHjVjRukDdLWDXzRQbvRB3AP9wGJQTy1NqzsUMOUseSR/ShuaYJz+SAySjvxXJ0G3ilApxURFQg+rooiKxWY9It49hMe417aKAYqTON/WBlFID0Hd4lXsOZtKyamiBI1BpPZhlPHkLmyH/c83YnuYRHjtB+OVkdx6HlB9v/QGwvw86AGI9eBw7sjOPwCFUldjELdAeQF67Ak3Ii0FVnyvrkwmTXlu7Cq7FfqiZXJQ7NKS4r5rtMy8vR4CWaCUFg6CIFzUcxX5K/B3TSjt8xHcSp6Hyp81UirqcDs1FOYzBxFPbKQhIHO0YyQRLKVyELSIU7/RGDUxwN5uQSsNfSjPPw6zCSIMG+GoKP1nQMjNuJhTAx/jgMftXDYWsvLGUq8xh9BRXgvOoXlGBZTYZoagyak7mAmcp87bvommo+sQKOyipPjBHY9KsAXIDjjX4HzQh4smgDOGPagmj+BPeEq2LpalN1xmDvbvDqMD8qC8vOokIQWYR0q+a/k9Qw9Q8DOT3mIJjPIS28o1hgcBDzg/x4N+9gPMiPGa0S0VvuQnaIyqxDppTd8q8GhNg6NL0dU9ypRVW9Ea49WWcVhyhihs/TOl/GLFX530KGinTKH34aJLHSHU0RKgvpQPw5yaLvMCklwiXbXm8rzLANjHDKTosh1CgjXrocm3QuSRqdXIcUmYlWOiCfXC9Dr4oM7FSbYWmei46Ie5hkWbL0DR9Jx8dUHIU6YoMm9plhjEEKwcrH05YgHPd/L4f59SejXuBQLy4JihUEnPKNGlCe342AXT7Nlt0p/nucu89jRYMS2g2aMLC2Ee9t7ipeFaZAbyYKZ3QhuVTHgX54yfufoA1ofAAAAAElFTkSuQmCC" }
          }
        ]
      }
    ],
    "temperature": 0.7,
    "max_tokens": -1,
    "stream": false
}'
```

##### Pro Tip -> `base64`

Suppose your local image exists in the path /path/to/image. You can use the base64 utility packaged with GNU coreutils like so:

```json
  {
    "type": "image_url",
    "image_url": { "url": "data:image/png;base64,'"$( base64 -w 0 /path/to/image )"'" }
  }

```



