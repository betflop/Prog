package main

import "fmt"

type person struct {
	name string
	age int
	//married bool
}

type child struct {
	name string
	age int
	//haveToys bool
}

func main() {
	bob := person{
		name: "bob",
		age: 15,
	}
	babyBob := child(bob)
	fmt.Println(bob, babyBob)


	var tmp interface{}
	tmp = bob
	if babyBob, ok := tmp.(child); ok {
		fmt.Println(bob, babyBob)
	}
}