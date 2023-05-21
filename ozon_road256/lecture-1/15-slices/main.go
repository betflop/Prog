package main

import "fmt"

func main() {
	// Объявление
	var decisions []uint
	fmt.Printf("len: %d\n", len(decisions))
	fmt.Printf("cap: %d\n", cap(decisions))
	fmt.Printf("%t %v\n", decisions, decisions)
	fmt.Printf("%v\n", decisions == nil)

	// Инициализация с заданным размером и вместимостью
	decisions2 := make([]uint, 10, 20)
	fmt.Printf("len: %d\n", len(decisions2))
	fmt.Printf("cap: %d\n", cap(decisions2))
	fmt.Printf("%t %v\n", decisions2, decisions2)

	// Выводимый размер
	levels := make([]string, 0, 10)
	levels = append(levels, []string{"fatal", "error", "info", "debug"}... )
	fmt.Printf("len: %d\n", len(levels))
	fmt.Printf("cap: %d\n", cap(levels))

	// Добавление элемента
	levels2 := append(levels, "Hello, world!")
	for index, value := range levels {
		fmt.Printf("%d. %v\n", index, value)
	}
	_ = levels2

	// Подвыборка
	highLevels := levels[:0]

	fmt.Printf("len: %d\n", len(highLevels))
	fmt.Printf("cap: %d\n", cap(highLevels))
	for index, value := range highLevels {
		fmt.Printf("%d. %v\n", index, value)
	}
}

