![https://raw.githubusercontent.com/containers/podman/main/logo/podman-logo.png](https://raw.githubusercontent.com/containers/podman/main/logo/podman-logo.png)

# Introduction[¶](#introduction "Link to this heading")

[Containers](https://developers.redhat.com/blog/2018/02/22/container-terminology-practical-introduction/#h.j2uq93kgxe0e) simplify the production, distribution, discoverability, and usage of applications with all of their dependencies and default configuration files. Users test drive or deploy a new application with one or two commands instead of following pages of installation instructions. Here’s how to find your first [Container Image](https://developers.redhat.com/blog/2018/02/22/container-terminology-practical-introduction/#h.dqlu6589ootw):

```bash
podman search docker.io/busybox
```

Output:

```bash
NAME                                         DESCRIPTION
docker.io/library/busybox                    Busybox base image.
docker.io/rancher/busybox
docker.io/openebs/busybox-client
docker.io/antrea/busybox
docker.io/hugegraph/busybox                  test image
...
```

The previous command returned a list of publicly available container images on DockerHub. These container images are easy to consume, but of differing levels of quality and maintenance. Let’s use the first one listed because it seems to be well maintained.

To run the busybox container image, it’s just a single command:

```bash
podman run -it docker.io/library/busybox
```

Output:

```yaml
/ #
```

You can poke around in the busybox container for a while, but you’ll quickly find that running small container with a few Linux utilities in it provides limited value, so exit out:

```yaml
exit
```

There’s an old saying that “nobody runs an operating system just to run an operating system” and the same is true with containers. It’s the workload running on top of an operating system or in a container that’s interesting and valuable.

Sometimes we can find a publicly available container image for the exact workload we’re looking for and it will already be packaged exactly how we want. But, more often than not, there’s something that we want to add, remove, or customize. It can be as simple as a configuration setting for security or performance, or as complex as adding a complex workload. Either way, containers make it fairly easy to make the changes we need.

Container Images aren’t actually images. They are repositories often made up of multiple layers. These layers can easily be added, saved, and shared with others by using a Containerfile (Dockerfile). This single file often contains all the instructions needed to build a new container image and can easily be shared with others publicly using tools like GitHub.

Here’s an example of how to build a container image from content that resides in a git repository:

```bash
podman build -t hello https://github.com/containers/PodmanHello.git
```

Once, the image build completes, it’s easy to run the new image from our local cache:

```bash
podman run -it hello
```

Output:

```bash
!... Hello Podman World ...!

         .--"--.
       / -     - \
      / (O)   (O) \
   ~~~| -=(,Y,)=- |
    .---. /`  \   |~~
 ~/  o  o \~~~~.----. ~~
  | =(X)= |~  / (O (O) \
   ~~~~~~~  ~| =(Y_)=-  |
  ~~~~    ~~~|   U      |~~

Project:   https://github.com/containers/podman
Website:   https://podman.io
Desktop:   https://podman-desktop.io
Documents: https://docs.podman.io
YouTube:   https://youtube.com/@Podman
X/Twitter: @Podman_io
Mastodon:  @Podman_io@fosstodon.org
```

Building new images is great, but sharing our work with others lets them review our work, critique how we built them, and offer improved versions. Our newly built hello image can be published at quay.io or docker.io to share it with the world. Everything needed to run the hello application is provided in the container image. Others can easily pull it down and use it, or make improvements to it.

Standardizing on container images and [Container Registries](https://developers.redhat.com/blog/2018/02/22/container-terminology-practical-introduction/#h.4cxnedx7tmvq) enable a new level of collaboration through simple consumption. This simple consumption model is possible because every major Container Engine and Registry Server uses the Open Containers Initiative ([OCI](https://www.opencontainers.org/)) format. This allows users to find, run, build, share and deploy containers anywhere they want. Podman and other [Container Engines](https://developers.redhat.com/blog/2018/02/22/container-terminology-practical-introduction/#h.6yt1ex5wfo3l) like CRI-O, Docker, or containerd can create and consume container images from docker.io, quay.io, an on premise registry or even one provided by a cloud provider. The OCI image format facilitates this ecosystem through a single standard.

For example, if we wanted to share our newly built hello container image on quay.io it’s easy. First log in to quay:

```bash
podman login quay.io
```

Input:

```bash
Username: USERNAME
Password: ********
Login Succeeded!
```

Next, tag the image so that we can push it into our user account:

```bash
podman tag localhost/hello quay.io/USERNAME/hello
```

Finally, push the image:

```bash
podman push quay.io/USERNAME/hello
```

Output:

```bash
Getting image source signatures
Copying blob bf62b9b17289 done   |
Copying config 17a4bf5a30 done   |
Writing manifest to image destination
```

Notice that we pushed one layer to our registry and now it’s available for others to share. Take a quick look:

```bash
podman inspect quay.io/USERNAME/hello
```

Output:

```json
[
    {
        "Id": "17a4bf5a301a374771ac66dd09c33d1d765af5265d20d6b4da7ac578381efd87",
        "Digest": "sha256:ee693991b0c8c8c12dfe0e90c25db1b73867e672478fd7a187a2fae31f72531a",
        "RepoTags": [
            "quay.io/USERNAME/hello:latest",
...
```

To summarize, Podman makes it easy to find, run, build and share containers.

- Find: whether finding a container on dockerhub.io or quay.io, an internal registry server, or directly from a vendor, a couple of [podman search](http://docs.podman.io/en/latest/markdown/podman-search.1.html), and [podman pull](http://docs.podman.io/en/latest/markdown/podman-pull.1.html) commands make it easy
- Run: it’s easy to consume pre-built images with everything needed to run an entire application, or start from a Linux distribution base image with the [podman run](http://docs.podman.io/en/latest/markdown/podman-run.1.html) command
- Build: creating new layers with small tweaks, or major overhauls is easy with [podman build](http://docs.podman.io/en/latest/markdown/podman-build.1.html)
- Share: Podman lets you push your newly built containers anywhere you want with a single [podman push](http://docs.podman.io/en/latest/markdown/podman-push.1.html) command

## Commands[¶](#commands "Link to this heading")

| COMMAND | DESCRIPTION |
| :----: | :---- |
| [Podman](markdown/podman.1.html) | (Pod Manager) Global Options, Environment Variables, Exit Codes, Configuration Files, and more |
| [artifact](markdown/podman-artifact.1.html) | Manage OCI artifacts |
| [attach](markdown/podman-attach.1.html) | Attach to a running container |
| [auto-update](markdown/podman-auto-update.1.html) | Auto update containers according to their auto-update policy |
| [build](markdown/podman-build.1.html) | Build an image using instructions from Containerfiles |
| [commit](markdown/podman-commit.1.html) | Create new image based on the changed container |
| [container](markdown/podman-container.1.html) | Manage containers |
| [cp](markdown/podman-cp.1.html) | Copy files/folders between a container and the local filesystem |
| [create](markdown/podman-create.1.html) | Create but do not start a container |
| [diff](markdown/podman-diff.1.html) | Display the changes to the object’s file system |
| [events](markdown/podman-events.1.html) | Show podman system events |
| [exec](markdown/podman-exec.1.html) | Run a process in a running container |
| [export](markdown/podman-export.1.html) | Export container’s filesystem contents as a tar archive |
| [farm](markdown/podman-farm.1.html) | Farm out builds to remote machines |
| [generate](markdown/podman-generate.1.html) | Generate structured data based on containers, pods or volumes |
| [healthcheck](markdown/podman-healthcheck.1.html) | Manage health checks on containers |
| [history](markdown/podman-history.1.html) | Show history of a specified image |
| [image](markdown/podman-image.1.html) | Manage images |
| [images](markdown/podman-images.1.html) | List images in local storage |
| [import](markdown/podman-import.1.html) | Import a tarball to create a filesystem image |
| [info](markdown/podman-info.1.html) | Display podman system information |
| [init](markdown/podman-init.1.html) | Initialize one or more containers |
| [inspect](markdown/podman-inspect.1.html) | Display the configuration of object denoted by ID |
| [kill](markdown/podman-kill.1.html) | Kill one or more running containers with a specific signal |
| [kube](markdown/podman-kube.1.html) | Play containers, pods or volumes from a structured file |
| [load](markdown/podman-load.1.html) | Load image(s) from a tar archive |
| [login](markdown/podman-login.1.html) | Log in to a container registry |
| [logout](markdown/podman-logout.1.html) | Log out of a container registry |
| [logs](markdown/podman-logs.1.html) | Fetch the logs of one or more containers |
| [machine](markdown/podman-machine.1.html) | Manage a virtual machine |
| [manifest](markdown/podman-manifest.1.html) | Manipulate manifest lists and image indexes |
| [mount](markdown/podman-mount.1.html) | Mount a working container’s root filesystem |
| [network](markdown/podman-network.1.html) | Manage networks |
| [pause](markdown/podman-pause.1.html) | Pause all the processes in one or more containers |
| [pod](markdown/podman-pod.1.html) | Manage pods |
| [port](markdown/podman-port.1.html) | List port mappings or a specific mapping for the container |
| [ps](markdown/podman-ps.1.html) | List containers |
| [pull](markdown/podman-pull.1.html) | Pull an image from a registry |
| [push](markdown/podman-push.1.html) | Push an image to a specified destination |
| [rename](markdown/podman-rename.1.html) | Rename an existing container |
| [restart](markdown/podman-restart.1.html) | Restart one or more containers |
| [rm](markdown/podman-rm.1.html) | Remove one or more containers |
| [rmi](markdown/podman-rmi.1.html) | Remove one or more images from local storage |
| [run](markdown/podman-run.1.html) | Run a command in a new container |
| [save](markdown/podman-save.1.html) | Save image(s) to an archive |
| [search](markdown/podman-search.1.html) | Search registry for image |
| [secret](markdown/podman-secret.1.html) | Manage secrets |
| [start](markdown/podman-start.1.html) | Start one or more containers |
| [stats](markdown/podman-stats.1.html) | Display a live stream of container resource usage statistics |
| [stop](markdown/podman-stop.1.html) | Stop one or more containers |
| [system](markdown/podman-system.1.html) | Manage podman |
| [tag](markdown/podman-tag.1.html) | Add an additional name to a local image |
| [top](markdown/podman-top.1.html) | Display the running processes of a container |
| [unmount](markdown/podman-unmount.1.html) | Unmount working container’s root filesystem |
| [unpause](markdown/podman-unpause.1.html) | Unpause the processes in one or more containers |
| [unshare](markdown/podman-unshare.1.html) | Run a command in a modified user namespace |
| [untag](markdown/podman-untag.1.html) | Remove a name from a local image |
| [update](markdown/podman-update.1.html) | Update an existing container |
| [version](markdown/podman-version.1.html) | Display the Podman version information |
| [volume](markdown/podman-volume.1.html) | Manage volumes |
| [wait](markdown/podman-wait.1.html) | Block on one or more containers |

---

### Tutorials[¶](#tutorials "Link to this heading")

<details><summary>↑↓LINKS</summary>

- [Basic Setup and Use of Podman](https://github.com/containers/podman/blob/main/docs/tutorials/podman_tutorial.md): Learn how to set up Podman and perform some basic commands with the utility.
- [Basic Setup and Use of Podman in a Rootless environment](https://github.com/containers/podman/blob/main/docs/tutorials/rootless_tutorial.md): The steps required to set up rootless Podman are enumerated.
- [Podman for Windows](https://github.com/containers/podman/blob/main/docs/tutorials/podman-for-windows.md): A guide to installing and using Podman on Windows.
- [Podman Remote Clients on Mac/Windows](https://github.com/containers/podman/blob/main/docs/tutorials/mac_win_client.md): Advanced setup for connecting to a remote Linux system using the Podman remote client on Mac and Windows.
- [How to sign and distribute container images using Podman](https://github.com/containers/podman/blob/main/docs/tutorials/image_signing.md): Learn how to set up and use image signing with Podman.
- [Podman remote-client tutorial](https://github.com/containers/podman/blob/main/docs/tutorials/remote_client.md): A brief how-to on using the Podman remote-client.
- [How to use libpod for custom/derivative projects](https://github.com/containers/podman/blob/main/docs/tutorials/podman-derivative-api.md): How the libpod API can be used within your own project.
- [How to use Podman’s Go RESTful bindings](https://github.com/containers/podman/tree/main/pkg/bindings): An introduction to using our RESTful Golang bindings in an external application.
- [Common network setups](https://github.com/containers/podman/blob/main/docs/tutorials/basic_networking.md): A basic guide to common network setups for Podman.
- [Socket activation](https://github.com/containers/podman/blob/main/docs/tutorials/socket_activation.md): Learn how to run containers that support socket activation.

</details>

## API REFERENCE

> [!TIP]
> _Click this [link](https://docs.podman.io/en/latest/_static/api.html) to ensure you are referencing the latest documentation!_
