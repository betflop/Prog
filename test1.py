import os
pid = os.getpid()
print('PID is ' + str(pid))

while True:
    something = input('Введите текст: ')
    print(something)
