package vertex

import (
	"math"
)

type Vertex struct {
	x, y float64
}

func NewVertex(x, y float64) *Vertex {
	return &Vertex{
		x: x,
		y: y,
	}
}

func (v Vertex) Abs() float64 {
	return math.Sqrt(v.x*v.x + v.y*v.y)
}

func (v *Vertex) Scale(f float64) {
	if v == nil {
		return
	}
	v.x = v.x * f
	v.y = v.y * f
}



