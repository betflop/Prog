package main

import "fmt"

func main() {
	// Явное указание размера
	var decisions [4]uint
	fmt.Printf("len: %d\n", len(decisions)) // 4
	fmt.Printf("cap: %d\n", cap(decisions)) // 4

	// Выводимый размер
	levels := [...]string{"fatal", "error", "info", "debug"}
	fmt.Printf("len: %d\n", len(levels)) // 4
	fmt.Printf("cap: %d\n", cap(levels)) // 4

	//levels[3] = "Hello, world!"
	for index, value := range levels {
		fmt.Printf("%d. %v\n", index, value)
	}

	levels2 := [...]string{"fatal", "error", "info", "debug"}
	if levels == levels2 {
		fmt.Println("ok")
	}
}

