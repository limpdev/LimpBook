# `tailscale`


> To route a localhost through Tailscale, use the `tailscale serve` command, which essentially acts as a reverse proxy, allowing you to expose your local services (running on localhost) to other devices within your Tailscale network by binding them to your Tailscale IP address and port number; you can access these services using your Tailscale hostname or IP address.
 
```sh
tailscale serve <localhost:6969>
```