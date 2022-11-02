package main

// import "fmt"

func main() {
	i := int8(1)
	j := new(int8)
	k := new(int8)
	l := int8(3)
	println(&i)
	println(&j)
	println(j)
	println(&k)
	println(&l)
	// fmt.Printf
	// m := new(int8)
	// println(&m)
	// println(m)
}
