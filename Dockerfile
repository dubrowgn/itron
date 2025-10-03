from node:alpine

copy main.js \
	openssl.conf \
	package.json \
	package-lock.json \
	/itron/

workdir /itron
run npm install
run ln -sf /opt/itron/config.js /itron/config.js

entrypoint ["node", "main.js"]
