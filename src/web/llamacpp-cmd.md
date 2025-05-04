### Start a server at `127.0.0.1:8080`

`llama-server.exe -m models\7B\ggml-model.gguf -c 2048`

### Start in Docker, with CUDA enabled

`docker run -p 8080:8080 -v /path/to/models:/models --gpus all ghcr.io/ggml-org/llama.cpp:server-cuda -m models/7B/ggml-model.gguf -c 512 --host 0.0.0.0 --port 8080 --n-gpu-layers 99`