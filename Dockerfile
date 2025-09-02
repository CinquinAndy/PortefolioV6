# Utiliser une image Node plus récente avec pnpm préinstallé
FROM node:20-alpine

# Installation de pnpm
RUN npm install -g pnpm

# Définition du répertoire de travail
WORKDIR /usr/app

# Copie des fichiers de configuration pnpm et package
COPY pnpm-lock.yaml ./
COPY package.json ./

# Installation des dépendances de production uniquement
RUN pnpm install --frozen-lockfile --prod --ignore-scripts

# Copie du code source après l'installation des dépendances
COPY . .

# Build de l'application
RUN pnpm build

# Exposition du port 3000
EXPOSE 3000

# Variables d'environnement pour la production
ENV NODE_ENV=production
ENV NEXT_SHARP_PATH=./node_modules/sharp

# Execution du serveur
CMD ["pnpm", "start"]