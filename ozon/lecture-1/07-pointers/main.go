package main

import "fmt"
import "unsafe"

func adresses() {
	answer := 42
	fmt.Printf("address of answer: %v\n", &answer)

	answer_2 := new(int)
	fmt.Printf("value of answer: %v\n", *answer_2)

	// var answer_3 *int
	// fmt.Printf("value of answer: %v\n", *answer_3)
}

func dontDoIt() {
	vals := []int{10, 20, 30, 40}
	start := unsafe.Pointer(&vals[0])
	size := unsafe.Sizeof(int(0))
	for i := 0; i < len(vals); i++ {
		item := *(*int)(unsafe.Pointer(uintptr(start) + size*uintptr(i)))
		fmt.Println(item)
	}
}

func main() {
	adresses()

	//dontDoIt()

}
