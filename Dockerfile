FROM node:20-alpine

# Définition du répertoire de travail
WORKDIR /usr/app

# Copie des fichiers nécessaires
COPY ./.next ./.next
COPY ./public ./public
COPY ./package*.json .
COPY ./next* .

RUN npm ci --omit=dev --ignore-scripts

# Exposition du port 3000
EXPOSE 3000

# Execution du serveur
CMD ["npm", "start"]