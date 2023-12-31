ARG VARIANT=20-bullseye

# Caddy
# Build xcaddy with Cloudflare DNS module
# -----------------
FROM caddy:2-builder AS builder
RUN xcaddy build --with github.com/caddy-dns/cloudflare

FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

COPY --from=builder /usr/bin/caddy /usr/bin/caddy

# curl and ca-certificates are needed for volta and zsh installation
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends python-is-python3 python3-pip golang \
    && apt-get -y install --no-install-recommends magic-wormhole rsync iputils-ping curl wget zsh

RUN su node -c "pip install --user -U Commitizen"
RUN su node -c "npm install -g npm && npm install -g pm2 np tsx"

RUN su node -c "curl -L https://git.io/antigen > ~/.antigen.zsh"

RUN echo '\n\
    source ~/.antigen.zsh \n\
    antigen use oh-my-zsh \n\
    antigen bundle git \n\
    antigen bundle bash \n\
    antigen bundle command-not-found \n\
    antigen bundle zsh-users/zsh-syntax-highlighting \n\
    antigen bundle zsh-users/zsh-autosuggestions \n\
    antigen theme spaceship-prompt/spaceship-prompt \n\
    antigen apply' > /home/node/.zshrc

RUN chown node /home/node/.zshrc
RUN chsh -s $(which zsh) node

# Volta
# -----------------

# Install volta as node user
# Needed by volta() function
USER node

ENV VOLTA_HOME /home/node/.volta
ENV PATH /home/node/.local/bin:${PATH}

# Make sure packages managed by volta will be in PATH
ENV PATH $VOLTA_HOME/bin:$PATH

RUN curl https://get.volta.sh | bash
RUN chown node /home/node/.volta

RUN volta install node@20

USER root

RUN groupadd docker && usermod -aG docker node

EXPOSE 80 443 3000 24678
