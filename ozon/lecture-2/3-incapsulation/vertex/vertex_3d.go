package vertex

import "math"

type vertex3d struct {
	x, y, z float64
}

func (v vertex3d) Abs() float64 {
	return math.Sqrt(v.x*v.x + v.y*v.y + v.z*v.z)
}

func (v *vertex3d) Scale(f float64) {
	if v == nil {
		return
	}
	v.x = v.x * f
	v.y = v.y * f
	v.z = v.z * f
}

