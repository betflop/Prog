package main

import "fmt"

type ErrorLevel int

type UserID int

func printCurrentErrorLevel(level ErrorLevel) {
	fmt.Println(level)
}

func main() {
	printCurrentErrorLevel(1)

	id := UserID(3)
	printCurrentErrorLevel(id)

	//fmt.Println(int(32) * float64(4.4))
}
