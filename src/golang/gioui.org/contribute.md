[![Gio logo](/files/logo-text.svg)](/)

- [Home](/)
- [Newsletter](/news)
- [Install](/doc/install) ▼
  
  - [Linux](/doc/install/linux)
  - [Windows](/doc/install/windows)
  - [macOS](/doc/install/macos)
  - [Android](/doc/install/android)
  - [iOS, tvOS](/doc/install/ios)
  - [WebAssembly](/doc/install/wasm)
- [Learn](/doc/learn) ▼
  
  - [Get Started](/doc/learn/get-started)
  - [Split Widget](/doc/learn/split-widget)
  - [Common Errors](/doc/learn/common-errors)
- [Showcase](/doc/showcase) ▼
  
  - [Anvil](/doc/showcase/anvil)
  - [Chapar](/doc/showcase/chapar)
  - [Cryptopower](/doc/showcase/cryptopower)
  - [G45W](/doc/showcase/g45w)
  - [godcr](/doc/showcase/godcr)
  - [gotraceui](/doc/showcase/gotraceui)
  - [Photon](/doc/showcase/photon)
  - [Protonet](/doc/showcase/protonet)
  - [Sointu](/doc/showcase/sointu)
  - [Sprig](/doc/showcase/sprig)
  - [Transito](/doc/showcase/transito)
  - [Wormhole William](/doc/showcase/wormhole-william)
- [Architecture](/doc/architecture) ▼
  
  - [Window](/doc/architecture/window)
  - [Drawing](/doc/architecture/drawing)
  - [Input](/doc/architecture/input)
  - [Widget](/doc/architecture/widget)
  - [Layout](/doc/architecture/layout)
  - [Theme](/doc/architecture/theme)
  - [Units](/doc/architecture/units)
  - [Text](/doc/architecture/text)
  - [Color](/doc/architecture/color)
- [Community](/doc/community)
- [Contributing](/doc/contribute)
- [FAQ](/doc/faq)

# Contributing Helping out the project

- [Sponsoring](#sponsoring)
- [Reporting Issues](#reporting-issues)
- [Sending Patches](#sending-patches)
- [Style](#style)
- [Automated Tests](#automated-tests)
- [Github](#github)
- [git send-email setup](#git-send-email-setup)

## Sponsoring

One good way to support the project is via sponsoring. If you find Gio useful, please consider sponsoring the [project on OpenCollective](https://opencollective.com/gioui) or one or more of its developers directly.

## Reporting Issues

Bugs or feature requests can be submitted through the [**issue tracker**](https://todo.sr.ht/~eliasnaur/gio) or send an email to [~eliasnaur/gio@todo.sr.ht](mailto:~eliasnaur/gio@todo.sr.ht).

## Sending Patches

The primary development platform is [sourcehut](https://sr.ht/~eliasnaur/gio/) with the [main repository here](https://git.sr.ht/~eliasnaur/gio). Sourcehut is used due to a few reasons [elaborated here](/doc/faq#why-sourcehut). No Sourcehut account is required and you can post without being subscribed.

Patches should be sent to [~eliasnaur/gio-patches@lists.sr.ht](mailto:~eliasnaur/gio-patches@lists.sr.ht) mailing list with the `git send-email` command. See [git-send-email.io](https://git-send-email.io) for a thorough setup guide.

If you have a [sourcehut](https://sr.ht) account, you can also fork the Gio repository, push your changes to that and use the web-based flow for emailing the patch. Start the process by clicking the “Prepare a patchset” button on the front page of your fork.

### Style

Commit messages follow [the Go project style](https://golang.org/doc/contribute.html#commit_messages): the first line is prefixed with the package and a short summary. The rest of the message provides context for the change and what it does. See [an example](https://gioui.org/commit/abb9d291e954f3b80384046d7d4487e1ead6bd6a).

Add `Fixes: https://todo.sr.ht/~eliasnaur/gio/nnn` or `References: https://todo.sr.ht/~eliasnaur/gio/nnn` (matching the syntax described [here](https://man.sr.ht/git.sr.ht/#referencing-tickets-in-git-commit-messages)) if the change fixes or updates an existing issue.

Contributors must agree to the [developer certificate of origin](https://developercertificate.org/), to ensure their work is compatible with the MIT license and the UNLICENSE. Sign your commits with Signed-off-by statements to show your agreement. The `git commit --signoff` (or `-s`) command signs a commit with your name and email address.

### Automated Tests

Patches with the project name “gio” in the subject will be picked up by the automatic testers at [builds.sr.ht](https://builds.sr.ht). A report with the testing results will be sent to you, CC’ed to the mailing list.

### Github

If using sourcehut is problematic the project is mirrored on [**Github**](https://github.com/gioui) and does accept pull-requests. However, signing the commits with `--signoff` is still required.

## git send-email setup

For a thorough setup guide see [git-send-email.io](https://git-send-email.io).

With `git send-email` configured, you can clone the project and set it up for submitting your changes:

```sh
git clone https://git.sr.ht/~eliasnaur/gio
cd gio
git config sendemail.to '~eliasnaur/gio-patches@lists.sr.ht'
git config sendemail.annotate yes
```

Include the project name in the mail subject:

```sh
git config format.subjectPrefix "PATCH gio"
```

If you’re contributing for a different project, replace “gio” with the repository name from [https://sr.ht/~eliasnaur/gio/sources](https://sr.ht/~eliasnaur/gio/sources). For example, “giouiorg” is the repository for the [gioui.org](https://gioui.org) website.

Configure your name and email address if you have not done so already:

```sh
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```

Whenever you want to submit your work for review, use `git send-email` with the number of commit on the current branch you want to send. For example, to submit the most recent commit use

```sh
git send-email -1
```

If you revise your patchset, add a version to the subject line with the `-vX` flag:

```sh
git send-email -v2 -1
```