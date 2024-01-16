
#!/bin/bash

# Чтение файла
filename="test.txt"
while IFS= read -r line
do
 # Вывод строки
 echo "$line"
done < "$filename"

# Бесконечный цикл sleep
while true
do
 sleep 1
done
