#파일 복사
docker 테스트 2

#서버 접속
ssh -i "first-sg-key.pem" ubuntu@ec2-52-78-52-247.ap-northeast-2.compute.amazonaws.com

# pm2설치 
sudo npm install pm2 -g

#서버 실행
sudo pm2 start ecosystem.config.js --env production

# 서버 리스트
sudo pm2 list

# 서버 종류
sudo pm2 stop name  
