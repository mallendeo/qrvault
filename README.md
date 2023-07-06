# QR Vault

## Setup

```bash
# ...TODO...
```

# Development

---

**IMPORTANT:** You need an HTTPS enabled domain for Workers to work on your network (accessing from another device).
Otherwise **you will get an error** that `Worker` is `undefined`.

You can redirect a domain to your local machine using your hosts file (`/etc/hosts`) and run a proxy like Caddy Nginx with Let's Encrypt.

The devcontainer comes with Caddy on port `4433` and `8080`, and Cloudflare module. You can start it with:

```bash
touch .env
cat "CF_API_TOKEN=cloudflare_token" >> .env
cat "CF_DEV_DOMAIN=example.com" >> .env
sudo caddy run --envfile .env --config .devcontainer/caddy/Caddyfile
```

After that you can run the development server using: `HMR_PORT=4433 NODE_TLS_REJECT_UNAUTHORIZED=0 pnpm dev --https`

---

Install the dependencies:

```bash
pnpm install
```

Start the development server on `http://localhost:3000`:

**Local-Only**
```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

## Conventional commits

Install [Commitizen](https://github.com/commitizen/cz-cli) for [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).

```bash
pip install --user -U Commitizen

# Example
cz commit
cz bump
```

# Dev-Container

A VSCode devcontainer configuration is provided with all the required extensions for Vue to work well with TypeScript, UnoCSS, and Iconify.

## Setup

### Environment

In your local environment (`.bashrc` or `.zshrc`), make sure the `DEVCONTAINER_CPUS` is set to a number of cpu's below the number of total
that you have on your machine (e.g 8 cores -> 6 cores for the container).

**The devcontainer won't start if you don't set this variable.**

`.zshrc`
```bash
export DEVCONTAINER_CPUS=4
```

### Commitizen
The devcontainer already comes with Commitizen and the [Conventional Commits extension](https://github.com/vivaxy/vscode-conventional-commits) for VSCode.


### Git

Set your git email and username:

```bash
git config --global user.email "admin@example.com"
git config --global user.name "admin"
```

# Notes

If you are using the devcontainer and have to rebuild it, backup the ~/.zsh_history `cp ~/.zsh_history ./`
Then restore it back with `cp .zsh_history ~/.zsh_history && exit`, open a new terminal and your history will be back.

---

Make sure the Volar extension takes over VSCode own TypeScript service:
https://vuejs.org/guide/typescript/overview.html#volar-takeover-mode
