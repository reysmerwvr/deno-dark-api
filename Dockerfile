FROM reysmerwvr/alpine-deno:1.0.2

LABEL version="1.0.0" description="Deno Dark API" maintainer="Reysmer Valle <reysmerwvr@gmail.com>"

ENV port 8000
ENV appDir /var/www/app/current
ENV NODE_ENV production

RUN mkdir -p /var/www/app/current
WORKDIR ${appDir}

COPY . ./var/www/app/current

EXPOSE ${port}

ENTRYPOINT ["deno"]
CMD ["run", "--allow-write", "--allow-read", "--allow-plugin", "--allow-net", "--allow-env", "--unstable",  "server.ts"]