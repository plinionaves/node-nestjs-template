ARG USER="node"

FROM node:16.17.1-slim as development

RUN mkdir -p /usr/share/man/man1 && \
    echo 'deb http://ftp.debian.org/debian stretch-backports main' | tee /etc/apt/sources.list.d/stretch-backports.list && \
    apt update && apt install -y \
    git \
    ca-certificates \
    zsh \
    curl \
    wget \
    fonts-powerline \
    procps
RUN npm install -g @nestjs/cli@9.1.4 npm@8.19.2
USER $USER
WORKDIR /app
COPY --chown=$USER:$USER package*.json ./
RUN npm install
COPY --chown=$USER:$USER . .
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.2/zsh-in-docker.sh)" -- \
    -t https://github.com/romkatv/powerlevel10k \
    -p git \
    -p git-flow \
    -p https://github.com/zdharma-continuum/fast-syntax-highlighting \
    -p https://github.com/zsh-users/zsh-autosuggestions \
    -p https://github.com/zsh-users/zsh-completions \
    -a 'export TERM=xterm-256color'
RUN echo '[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh' >> ~/.zshrc && \
    echo 'HISTFILE=/home/node/zsh/.zsh_history' >> ~/.zshrc


FROM development as build

ENV NODE_ENV production
RUN npm run build
RUN npm ci --only=production && npm cache clean --force
USER node


FROM node:16.17.1-slim as production

COPY --chown=$USER:$USER --from=build /app/node_modules ./node_modules
COPY --chown=$USER:$USER --from=build /app/dist ./dist
EXPOSE 3000
RUN npm install -g pm2
ENTRYPOINT ["npx", "pm2-runtime", "start", "pm2.config.js"]
CMD ["--env production"]
