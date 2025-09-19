# Stage 1: Build
FROM node:18-alpine AS build

# 1) 安装 pnpm
RUN npm install -g pnpm@10.12.1

WORKDIR /app

# 2) 仅拷贝清单，最大化依赖层缓存命中
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.json ./
COPY packages/material/package.json ./packages/material/
COPY packages/code-generator/package.json ./packages/code-generator/
COPY packages/website/package.json ./packages/website/

# 3) 预取依赖（不需要源码即可缓存）
RUN pnpm fetch

# 4) 拷贝源码
COPY . .

# 5) 离线安装（利用上一步缓存），并可选 cache bust
ARG CACHE_BUST=1
RUN echo "cache bust: $CACHE_BUST" && pnpm install --offline --frozen-lockfile

# 6) 构建
RUN pnpm run build:website

# Stage 2: Serve
FROM nginx:1.25-alpine
COPY --from=build /app/lowcode-dist /opt/lowcode-dist
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]