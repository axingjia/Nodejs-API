start mongodb:
mongod --dbpath=data --bind_ip 127.0.0.1

self signed certificate:
openssl genrsa 1024 > private.key
openssl req -new -key private.key -out cert.csr
openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem

https://github.com/jmuppala/conFusion-React

React Firebase:    
git clone https://github.com/jmuppala/conFusion-React-Firebase.git

Loopback Reac:
git clone https://github.com/jmuppala/conFusion-React-Loopback.git