package main

import (
	"fmt"
	"reflect"
)

func main() {
	// Первый закон
	var x float64 = 3.4
	fmt.Println("type:", reflect.TypeOf(x))

	_, _ = fmt.Scanln()

	v := reflect.ValueOf(x)
	fmt.Println("value:", reflect.ValueOf(x).String())

	_, _ = fmt.Scanln()

	fmt.Println("type:", v.Type())
	fmt.Println("kind is float64:", v.Kind() == reflect.Float64)
	fmt.Println("value:", v.Float())

	_, _ = fmt.Scanln()

	//fmt.Println("value:", v.Int())

	// Второй закон
	y := v.Interface().(float64) // y имеет тип float64.
	fmt.Println(y)

	_, _ = fmt.Scanln()
	// Третий закон.
	v = reflect.ValueOf(&x)
	v.Elem().SetFloat(7.1)
	fmt.Println(x)

}