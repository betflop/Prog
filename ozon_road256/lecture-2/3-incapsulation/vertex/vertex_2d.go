package vertex

import "math"

type vertex2d struct {
	x, y float64
}

func (v vertex2d) Abs() float64 {
	return math.Sqrt(v.x*v.x + v.y*v.y)
}

func (v *vertex2d) Scale(f float64) {
	if v == nil {
		return
	}
	v.x = v.x * f
	v.y = v.y * f
}

