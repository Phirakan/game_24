FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

RUN addgroup -g 1001 -S nodejs && \
    adduser -S adonisjs -u 1001 -G nodejs

RUN chown -R adonisjs:nodejs /app
USER adonisjs

# Expose port
EXPOSE 3333

# Start the application
CMD ["npm", "start"]