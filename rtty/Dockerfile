FROM --platform=linux/amd64 ubuntu:22.04  
RUN apt update && apt install  openssh-server sudo -y

RUN useradd -rm -d /home/ubuntu -s /bin/bash -g root -G sudo -u 1000 test 
RUN  echo 'test:test' | chpasswd

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]

RUN service ssh start
# ARG PORT=9996
# EXPOSE 22
EXPOSE ${PORT}

RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.5/zsh-in-docker.sh)" -- \
    -t robbyrussell


# COPY ./rttyLinux /bin/exe_rtty
COPY ./exe_rtty /bin/exe_rtty
COPY ./getpods /bin/getpods
COPY ./getpods2 /bin/getpods2
COPY ./config /bin/config

COPY ./ca.crt /bin/ca.crt
COPY ./client.crt /bin/client.crt
COPY ./client.key /bin/client.key

# Default powerline10k theme, no plugins installed
# RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.5/zsh-in-docker.sh)"
# RUN   sed -i "s|powerlevel10k/powerlevel10k|robbyrussell|" ~/.zshrc

# RUN ["apt", "update"]
# RUN ["apt", "install", "-y", "zsh"]
# CMD ["/usr/sbin/sshd","-D"]
# ENTRYPOINT ["exe_rtty run bash"]
ARG TERM=xterm
CMD bin/exe_rtty run zsh -p $PORT --font "Roboto Mono" --font-size 20 
# CMD ["/bin/exe_rtty", "run", "bash", "-p $PORT"]
