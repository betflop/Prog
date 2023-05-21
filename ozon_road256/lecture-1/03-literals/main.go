package main

import "fmt"

func main() {
	fmt.Printf("%v %t\n", 4, 4)
	fmt.Printf("%v %t\n", -3, -3)
	fmt.Printf("%v %t\n", 9.5, 9.5)
	fmt.Printf("%v %t\n", 0.867 + 0.5i, 0.867 + 0.5i)
	fmt.Printf("%v %t\n", true, true)
	fmt.Printf("%v %t\n", false, false)
	fmt.Printf("%v %t\n", "", "")
	fmt.Printf("%v %t\n", 'a', 'a')
	fmt.Printf("%v %t\n", `a
				b`, `a
						b`)
	fmt.Printf("%v %t\n", nil, nil)

	a := "👻"
	fmt.Printf("%v %t\n", a, &a)
}

