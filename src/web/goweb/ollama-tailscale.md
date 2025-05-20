Let me help you set up remote access to your Ollama instance. Since you're using Tailscale already, this should be relatively straightforward.

Here are the key steps to expose your Ollama instance:

1. First, you'll need to modify how Ollama binds to network interfaces. By default, it only binds to localhost (127.0.0.1). You'll want it to bind to either:
   - Your machine's Tailscale IP (recommended for security)
   - All interfaces (0.0.0.0) if you want broader access

2. To change the binding, you have two options:

   ```bash
   # Option 1: Environment variable
   OLLAMA_HOST=0.0.0.0:11434 ollama serve

   # Option 2: Command line flag
   ollama serve --host 0.0.0.0:11434
   ```

3. Since you're running this through Docker, you'll need to modify your Docker configuration. Can you show me your current docker-compose.yml or docker run command? You'll likely need to:
   - Update the container's environment variables
   - Ensure the port mapping is correct
   - Make sure the container can access the network properly

4. Once configured, you should be able to access Ollama from your Macbook using:
   ```bash
   export OLLAMA_HOST=your-pc-tailscale-ip:11434
   ```

Are you running this with docker-compose or a direct docker run command? That would help me give you more specific configuration instructions.

Also, as a security note: If you use 0.0.0.0, make sure your firewall is properly configured to prevent unwanted access. Using the Tailscale IP is generally safer as it ensures only devices on your Tailscale network can connect.