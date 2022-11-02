package main

import (
	"fmt"
	"log"
	"math"
)

func readFloat(msg string) float64 {
	var f float64

	fmt.Print(msg)
	_, err := fmt.Scanf("%f", &f)

	if err != nil {
		log.Fatalln(err)
	}

	return f
}

func main() {
	a := readFloat("Input value for a: ")
	b := readFloat("Input value for b: ")
	c := readFloat("Input value for c: ")


	if D := b*b - 4 * a * c; D < 0 {
		fmt.Printf("No soultion in real space")
	} else if D == 0 {
		fmt.Println("One solution: ", -b/(2*a))
	} else {
		fmt.Println("First solution: ", (-b + math.Sqrt(D))/(2*a))
		fmt.Println("Second solution: ", -(-b + math.Sqrt(D))/(2*a))
	}
}
