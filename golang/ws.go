package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"net/url"

	"github.com/koding/websocketproxy"
)

var (
	flagBackend = flag.String("backend", "ws://127.0.0.1:9994", "Backend URL for proxying")
)

func main() {
	u, err := url.Parse(*flagBackend)
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Println(u)
	err = http.ListenAndServe(":8080", websocketproxy.NewProxy(u))
	if err != nil {
		log.Fatalln(err)
	}
}
