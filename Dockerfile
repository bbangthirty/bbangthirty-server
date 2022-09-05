FROM node:16.17.0

# 앱 디렉터리 생성
WORKDIR /home/node/app

COPY package*.json ./
RUN npm install

# dockerfile을 실행하는 경로에서 소스 복사
COPY . .

# 아래 포트로 매핑
EXPOSE 80

# pm2-runtime으로 실행 
# CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]
CMD [ "npm", "run", "prod" ]