package main

import "testing"

func TestAbs(t *testing.T) {
	got := Abs(-1)
	if got != 1 {
		t.Errorf("Abs(-1) = %f; want 1", got)
	}
}

func BenchmarkAbs(t *testing.B) {
	for i := 0; i < 100; i++ {
		got := Abs(-1)
		if got != 1 {
			t.Errorf("Abs(-1) = %f; want 1", got)
		}
	}
}