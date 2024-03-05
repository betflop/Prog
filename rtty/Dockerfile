FROM --platform=linux/amd64 ubuntu:22.04

RUN apt update && apt install sudo -y
RUN ["apt-get", "install", "-y", "vim"]

RUN groupadd -r test && useradd -r -m -g test test
RUN chown test:test /home/test
RUN addgroup test sudo
RUN echo "%sudo ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

RUN apt install wget -y
USER test
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.5/zsh-in-docker.sh)" -- \
    -t robbyrussell

COPY ./exe_rtty /bin/exe_rtty
COPY ./getpods /bin/getpods
COPY ./getpods2 /bin/getpods2
COPY ./config /bin/config

USER root
RUN delgroup test sudo
ENV SUDO_FORCE_REMOVE=yes
RUN apt-get purge -y sudo && apt-get autoremove -y

WORKDIR /home/test

USER test
ARG TERM=xterm
CMD ../../bin/exe_rtty run zsh -p $PORT --font "Roboto Mono" --font-size 20
