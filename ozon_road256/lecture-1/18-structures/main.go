package main

import (
	"fmt"

	"gitlab.ozon.dev/go/classroom-2/teachers/lecture-1/18-structures/vertex"
)

func main() {
	v := vertex.NewVertex(3, 4)
	fmt.Println(v.Abs())
	v.Scale(10)
	fmt.Println(v.Abs())
}