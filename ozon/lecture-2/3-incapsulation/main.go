package main

import (
	"fmt"

	"gitlab.ozon.dev/go/classroom-2/teachers/lecture-1/22-incapsulation/vertex"
)

func main() {
	v := vertex.NewVertex2D(3, 4)
	fmt.Println(v.Abs())
	v.Scale(10)
	fmt.Println(v.Abs())

	v = vertex.NewVertex3D(3, 4, 6)
	fmt.Println(v.Abs())
	v.Scale(10)
	fmt.Println(v.Abs())
}
