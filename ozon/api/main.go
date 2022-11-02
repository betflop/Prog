package main

import (
	"fmt"
	"log"
	"net"

	"github.com/pavlyk/pkg/adder"
	"github.com/pavlyk/pkg/api"

	"google.golang.org/grpc"
)

func main() {
	s := grpc.NewServer()
	srv := &adder.GRPCServer{}
	api.RegisterAdderServer(s, srv)

	l, err := net.Listen("tcp", ":8080")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%v", l)
	// if err := s.Server(l); err != nil {
	// 	log.Fatal(err)
	// }

}
