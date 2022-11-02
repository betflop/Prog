package vertex

type Vertex interface {
	Abs() float64
	Scale(f float64)
}

func NewVertex2D(x, y float64) Vertex {
	return &vertex2d{
		x: x,
		y: y,
	}
}

func NewVertex3D(x, y, z float64) Vertex {
	return &vertex3d{
		x: x,
		y: y,
		z: z,
	}
}

