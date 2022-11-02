package main

import "fmt"

// Глобальные
var (
	found bool
	Answer int
)


func main() {
	// Локальные
	var answer int // zero-value: 0

	// Группа локальных
	var (
		found  bool  // zero-value: false
		newAnswer *uint // zero-value: nil
	)

	// Определение с объявлением
	a := int8(42)


	// Позволяет игнорировать ошибку о неиспользованной переменной
	_ = answer
	_ = found
	_ = Answer
	_ = newAnswer
	_ = a

	a, b := 20, 30
	fmt.Printf("a=%d and b=%d\n", a, &b)
	b, c := 40, 50
	fmt.Printf("b=%d and c=%d\n", &b, c)
}
