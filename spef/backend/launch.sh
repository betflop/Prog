#!/bin/bash

if [ "$SCRIPT_NAME" = "main.py" ]; then
   python main.py
elif [ "$SCRIPT_NAME" = "tg.py" ]; then
   python tg.py
else
   echo "Invalid script name. Please set SCRIPT_NAME to either main.py or tg.py."
   exit 1
fi
