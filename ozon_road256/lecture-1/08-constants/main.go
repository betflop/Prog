package main

import "fmt"

const (
	MessageOk   = "ok"
	MessageFail = "fail"
)

type Level uint8

const (
	DebugLevel Level = iota // 0
	InfoLevel               // 1
	WarnLevel               // 2
	ErrorLevel              // 3
	_
	GodLevel
	// ...
)

func main() {
	const (
		helloMessage = "hello world"
		exitMessage  = "exit"
	)

	fmt.Println(helloMessage)
	fmt.Println(MessageOk)
	fmt.Println(GodLevel)
}


