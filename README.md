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

# Journey to Nodejs
* www.jonathanfmills.com
* template string ` ${chalk()}`
* "debug" module, require("debug")('app');
* "morgan" module, add middleware, app.use(morgan('combined//or tiny'))
* res.send("a string")
* res.sendFile(__ dirname+"/views/index.html") XXX
* use path.join(__ dirname, "views/index.html")
* use cdn, app.use(express.static(path.join(__ dirname, "/public/")));
* eslint
* node.green
* nodemon: nodemon app.js
* nodemonConfig

        //in package.json
        "nodemonConfig":{
            "restarable":"rs",
            "ignore": ["node_modules/* * /node_modules"],
            "delay":"2500",

        }

* app.set('views',"./src/views");
* app.set("view engine","pug");
* res.render
