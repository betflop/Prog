package main

import "fmt"

func MinMax(a, b uint) (min uint, max uint) {
	if a < b {
		min = a
		max = b
	} else {
		min = b
		max = a
	}

	return // naked return, можно return min, max
}

func min(values ...int) int {
	min := values[0]

	for _, cur := range values {
		if cur < min {
			min = cur
		}
	}

	return min
}

type RangeFunc func(values ...int) int

func main() {
	fmt.Print(MinMax(3, 5))

	// Функторы
	minMax := MinMax
	fmt.Println(minMax(1, 2))

	// Лямбды и замыкания
	t := float64(20)
	fmt.Printf(
		"100 (°F) = %.2f (°C)\n",
		func() float64 {
			return (t - 32.0) * (5.0 / 9.0)
		}())

	// Функциональные типы
	var f RangeFunc
	fmt.Printf("%t\t%v", f, f)
	fmt.Println(f(3, 4, 5, 6))

}