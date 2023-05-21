package main

import "fmt"

type SomeInterface interface {
	SomeMethod(in string) (out string)
}

type SomeStruct struct {
	prefix string
}

func (s SomeStruct) SomeMethod(in string) (out string) {
	return s.prefix + ": " + in
}

type SomeOtherStruct struct {
	postfix string
}

func (s SomeOtherStruct) SomeMethod(in string) (out string) {
	return in + ": " + s.postfix
}

func main() {
	var iv1 SomeInterface = SomeStruct{"I say"}
	var iv2 SomeInterface = SomeOtherStruct{"I say"}

	fmt.Printf("method  %q\n", iv1.SomeMethod("Hello, world!"))
	fmt.Printf("method  %q\n", iv2.SomeMethod("Hello, world!"))
}
