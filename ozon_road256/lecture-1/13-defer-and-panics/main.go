package main

import (
	"fmt"
)

func min(values ...int)  (val int) {
	defer func() {
		if v := recover(); v != nil {
			fmt.Printf("Recovered from panic: %v %T\n", v, v)
			val = -1
		}
	}()

	min := values[0]

	for _, cur := range values {
		if cur < min {
			min = cur
		}
	}

	return min
}

func main() {
	fmt.Println(min(1, 2, 3, 5, 0))
	fmt.Println(min())

}

