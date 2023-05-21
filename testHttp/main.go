package main

import (
	"bytes"
	"fmt"
	"net/http"
	"runtime"
	"strconv"
	"time"
)

func hello(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, "hello\n")
	duration := time.Duration(3)*time.Second 
	time.Sleep(duration)
	fmt.Println("hello run in gorutine")
    fmt.Println(getGID())
	// fmt.Println(runtime.NumGoroutine())
}

func headers(w http.ResponseWriter, req *http.Request) {
	for name, headers := range req.Header {
		for _, h := range headers {
			fmt.Fprintf(w, "%v: %v\n", name, h)
		}
	}
	fmt.Println("headers run in gorutine")
    fmt.Println(getGID())
	// fmt.Println(runtime.NumGoroutine())
}


func getGID() uint64 {
    b := make([]byte, 64)
    b = b[:runtime.Stack(b, false)]
    b = bytes.TrimPrefix(b, []byte("goroutine "))
    b = b[:bytes.IndexByte(b, ' ')]
    n, _ := strconv.ParseUint(string(b), 10, 64)
    return n
}

func main() {
	http.HandleFunc("/hello", hello)
	http.HandleFunc("/headers", headers)
	http.ListenAndServe(":8090", nil)
}
