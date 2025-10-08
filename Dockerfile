from node:alpine

copy package.json \
	package-lock.json \
	/itron/

workdir /itron
run npm install
run ln -sf /opt/itron/config.js /itron/config.js

# Copy src last to avoid npm re-install if possible
copy main.js \
	openssl.conf \
	/itron/


entrypoint ["node", "main.js"]
