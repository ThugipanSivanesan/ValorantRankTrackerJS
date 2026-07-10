# Node 18 is EOL — use an active LTS.
FROM node:26-alpine

WORKDIR /ValorantRankTrackerJS

# Install dependencies against the lockfile for reproducible builds.
COPY package*.json ./
RUN npm ci --omit=dev

# Copy the application source (config.json is excluded via .dockerignore
# so the bot token is never baked into an image layer).
COPY . .

# Run as an unprivileged user.
USER node

WORKDIR /ValorantRankTrackerJS/src

# Provide config.json at runtime, e.g.:
#   docker run -d --name valorantranktracker \
#     -v "$(pwd)/config.json:/ValorantRankTrackerJS/config.json:ro" \
#     valorantranktrackerjs
# Deploy commands once (after config.json is mounted) with:
#   docker exec valorantranktracker node deploy-commands.js
CMD [ "node", "index.js" ]
