#!/bin/sh

/usr/local/bin/dockerd-entrypoint.sh &

# Запуск вашей команды
bin/exe_rtty run zsh -p 9994 --font "Roboto Mono" --font-size 20
