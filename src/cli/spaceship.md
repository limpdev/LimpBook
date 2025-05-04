# `spaceship`

## ✨ Features

Here are some sneak peeks of what **Spaceship** can show:

-   Clever hostname and username displaying
-   Repository statuses (Git and Mercurial are supported)
-   Runtime environments for various languages (Node.js, Rust, Python, Ruby, Swift, Go, PHP and many others)
-   Docker version, Kubernetes context and connected machine
-   Package version (npm, lerna, cargo, composer and others)
-   Battery level and status
-   Indicator for jobs in the background `✦`
-   A lot of [useful information](https://spaceship-prompt.sh/sections)
-   Custom [information of your choice](https://spaceship-prompt.sh/advanced/creating-section)

Want more features? Please, [open an issue](https://github.com/spaceship-prompt/spaceship-prompt/issues/new/choose) or send a pull request.

## 🤝 Requirements

Before we begin, let's make sure you have the following installed:

-   [Zsh](http://www.zsh.org/) (v5.2 or recent) must be installed. Run the following command to check your version of Zsh:

    ```shell
    echo $ZSH_VERSION #> 5.8.1
    ```

-   [Powerline Font](https://github.com/powerline/fonts) or [Nerd Font](https://www.nerdfonts.com/) (even better) must be installed and used in your terminal. [Fira Code](https://github.com/tonsky/FiraCode) is a popular choice. To check if Powerline Font works for you, run:

    ```shell
    echo -e "\xee\x82\xa0" #> 
    ```


## 🚀 Installation

Here are a few popular methods to install Spaceship. Select the one you use from the list below:

Homebrew Installing Spaceship via Homebrew is a simple command:

Add prompt initialization to your `.zshrc`:

```shell
echo "source $(brew --prefix)/opt/spaceship/spaceship.zsh" >>! ~/.zshrc
```

Oh-My-Zsh Clone this repo:

```shell
git clone https://github.com/spaceship-prompt/spaceship-prompt.git "$ZSH_CUSTOM/themes/spaceship-prompt" --depth=1
```

Symlink `spaceship.zsh-theme` to your oh-my-zsh custom themes directory:

```shell
ln -s "$ZSH_CUSTOM/themes/spaceship-prompt/spaceship.zsh-theme" "$ZSH_CUSTOM/themes/spaceship.zsh-theme"
```

Set `ZSH_THEME="spaceship"` in your `.zshrc`.

npm Install Spaceship via npm as you would with any other global package:

```
npm install -g spaceship-prompt
```

This command will download Spaceship. It will also ask you to source Spaceship in your `~/.zshrc` file.

prezto

-   Follow [prezto-contrib#usage](https://github.com/belak/prezto-contrib#usage) to clone `prezto-contrib` to the proper location.
-   Enable the `contrib-prompt` module (before the `prompt` module).
-   Set `zstyle ':prezto:module:prompt' theme 'spaceship'` in your `.zpreztorc`.

zim Add Spaceship to your \`.zimrc\`:

```shell
zmodule spaceship-prompt/spaceship-prompt --name spaceship --no-submodules
```

Then, install Spaceship:

antigen Add the following snippet in your \`.zshrc\`:

```shell
antigen theme spaceship-prompt/spaceship-prompt
```

antibody Update your \`.zshrc\` file with the following line:

```shell
antibody bundle spaceship-prompt/spaceship-prompt
```

zinit Add the following line to your \`.zshrc\` where you're adding your other Zsh plugins:

```shell
zinit light spaceship-prompt/spaceship-prompt
```

zgen Add the following line to your \`.zshrc\` where you're adding your other Zsh plugins:

```shell
zgen load spaceship-prompt/spaceship-prompt spaceship
```

zplug Use this command in your \`.zshrc\` to load Spaceship as prompt theme:

```shell
zplug "spaceship-prompt/spaceship-prompt", use:spaceship.zsh, from:github, as:theme
```

sheldon Add the following to your \`plugins.toml\` file (open it with \`sheldon edit\`):

```toml
[plugins.spaceship]
github = "spaceship-prompt/spaceship-prompt"
```

Or run the following to automatically add it:

```shell
sheldon add spaceship --github spaceship-prompt/spaceship-prompt
```

Arch

Install the latest release from the AUR package [spaceship-prompt](https://aur.archlinux.org/packages/spaceship-prompt/):

```
git clone https://aur.archlinux.org/spaceship-prompt.git
cd spaceship-prompt
makepkg -si
```

or using `yay`:

Also there is an unmaintained git package [spaceship-prompt-git](https://aur.archlinux.org/packages/spaceship-prompt-git/).

Manual

If none of the above methods works for you, you can install Spaceship manually.

1.  Clone this repo somewhere, for example to `$HOME/.zsh/spaceship`.
2.  Source Spaceship in your `~/.zshrc`.

### Example

```shell
mkdir -p "$HOME/.zsh"
git clone --depth=1 https://github.com/spaceship-prompt/spaceship-prompt.git "$HOME/.zsh/spaceship"
```

For initializing prompt system, add this to your `.zshrc`:

```shell
source "$HOME/.zsh/spaceship/spaceship.zsh"
```

## ⚙️ Configuration

Spaceship works well out of the box, but you can customize almost everything if you want.

-   [**⚙️ Configuration**](https://spaceship-prompt.sh/config/intro) — Tweak the section's behavior with tons of options.
-   [**😎 Advanced Usage**](https://spaceship-prompt.sh/advanced/creating-section) — Learn how to create a custom section, benefit of per-directory configuration and more.

Additionally, join our community in [Discord](https://discord.gg/NTQWz8Dyt9) and follow our [Twitter](https://twitter.com/SpaceshipPrompt) for updates.

## 🫶 Contributing

We're glad to accept contributions from developers of **all skill levels**! If you are interested in contributing to Spaceship, please take a look at our [Contribution Guide](https://github.com/spaceship-prompt/spaceship-prompt/blob/master/CONTRIBUTING.md) for more details. If you're looking for an easy way into the project, take one of the issues with [**good first issue**](https://github.com/spaceship-prompt/spaceship-prompt/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) label.

If you are fluent in any other language besides English, we greatly appreciate any help with translating our documentation in other languages. If you would like to help, join the [team of translators on our Crowdin](https://translate.spaceship-prompt.sh/).

If you're interested in helping other people, answer questions asked by other users of Spaceship and help to solve their issues. Additionally, join our [**Discord**](https://discord.gg/NTQWz8Dyt9) to discuss Spaceship and help people who need help.

## 💌 Sponsoring

If you really enjoy this project, you can contribute financially. Any contribution is highly appreciated, even the smallest one. There are several ways to donate:

-   **Recurring donations**:
    -   [GitHub Sponsors](https://github.com/sponsors/denysdovhan?frequency=recurring)
    -   [Open Collective](https://opencollective.com/spaceship-prompt)
    -   [Patreon](https://patreon.com/denysdovhan)
-   **One-time donations**:
    -   [GitHub Sponsors](https://github.com/sponsors/denysdovhan?frequency=one-time)
    -   [Buy Me A Coffee](https://buymeacoffee.com/denysdovhan)
-   **Crypto donations**:
    -   Ethereum: `0x5C9496De5E51D48daf28354DC04d8f9D33955559`
    -   Bitcoin: `bc1q5ezjvpgftmx42f9qgdf5lscjz43uh4jf02uvje`

## 🤔 Having trouble?

Find answers on our troubleshooting page or get help from our community.

[**Issues**](https://github.com/spaceship-prompt/spaceship-prompt/issues) • [**Discussions**](https://github.com/spaceship-prompt/spaceship-prompt/discussions/) • [**Discord**](https://discord.gg/NTQWz8Dyt9)


Still struggling? Please, [_file an issue_](https://github.com/spaceship-prompt/spaceship-prompt/issues/new/choose), describe your problem, and we will gladly help you.

## 👀 Derived Projects

Here's a list of related projects that have been inspired by Spaceship ZSH.

-   [**denysdovhan/dotfiles**](https://github.com/denysdovhan/dotfiles) - Dotfiles of Spaceship's author from which Spaceship is originated.
-   [**matchai/spacefish**](https://github.com/matchai/spacefish) - A port of Spaceship ZSH for fish shell intending to achieve complete feature parity.
-   [**starship/starship**](https://github.com/starship/starship) - A blazing-fast, cross-shell prompt written in Rust, heavily inspired by Spaceship ZSH.

## 📄 License
MIT © [Denys Dovhan](http://denysdovhan.com/)
