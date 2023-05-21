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

func switch_a(level int) string {
	switch level {
	case 0:
		return "DEBUG"
	case 1:
		return "INFO"
	default:
		return "unsupported"
	}
}

func switch_b(level int) string {
	switch level {
	case 0:
		return "DEBUG"
	case 1:
		fallthrough
	default:
		return "INFO"
	}
}
func switch_c(level string) string {
	switch level {
	case "-1", "0", "3.3":
		return "DEBUG"
	case 1:
		fallthrough
	default:
		return "INFO"
	}
}



func main() {
	fmt.Println(switch_a(1))
	fmt.Println(switch_b(1))
	fmt.Println(switch_c(-1))

	a := readFloat("Input value for a: ")
	b := readFloat("Input value for b: ")
	c := readFloat("Input value for c: ")

	switch D := b*b - 4 * a * c; {
	case D < 0:
		fmt.Printf("No soultion in real space")
	case D == 0:
		fmt.Println("One solution: ", -b/(2*a))
	default:
		fmt.Println("First solution: ", (-b + math.Sqrt(D))/(2*a))
		fmt.Println("Second solution: ", -(-b + math.Sqrt(D))/(2*a))
	}
}
