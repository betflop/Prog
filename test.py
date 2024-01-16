import time
import os
pid = os.getpid()
print('PID is ' + str(pid))


while True:
    print("Hello")
    time.sleep(2)
