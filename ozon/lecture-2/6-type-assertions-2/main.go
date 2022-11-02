package main

import (
	"fmt"
	"runtime"
)

type MyErr struct {
	Where string
	HasZero bool
	HasNaN bool
}

func NewMyError(hasZero bool, hasNaN bool) error {
	_, filename, line, _ := runtime.Caller(1)
	return &MyErr{
		Where:  fmt.Sprintf("%s:%d", filename, line),
		HasZero: false,
		HasNaN:  false,
	}
}

func (e *MyErr) Error() string {
	return fmt.Sprintf("Error happend in %s. HasZero: %v, Has NaN: %v", e.Where, e.HasZero, e.HasNaN)
}

func main() {
	var tmp interface{}
	err := NewMyError(false, false)
	tmp = err
	if err, ok := tmp.(error); ok {
		fmt.Println(err)
	}
}


