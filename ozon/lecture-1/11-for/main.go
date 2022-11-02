package main

import "fmt"

func forever() {
	for {
		_ = 2
	}
}

func likeWhile(val int) int {
	i := 1
	for {
		if i * i >= val {
			break
		}
		i++
	}

	if i * i == val {
		return i
	}

	return -1
}

func likeC() {
	for i := 10; i > 0; i-- {
		fmt.Printf("%d bottles on table\n", i)
	}

	fmt.Println("No bottles on table\n")
}

func main() {
	fmt.Println(likeWhile(4))
	likeC()
}