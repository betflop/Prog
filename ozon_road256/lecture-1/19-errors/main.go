package main

import (
	"errors"
	"fmt"
	"io/fs"
	"os"
)

type MyError struct {
	val int
	prevErr error
}

func (m MyError) Error() string {
	return fmt.Sprintf("My erorr: %d", m)
}

func (m MyError) Unwrap() error {
	return m.prevErr
}

func main() {
	// Создание своей ошибки
	err := errors.New("missed user")
	fmt.Println(err)


	// Приведение ошибок
	if _, err := os.Open("non-existing"); err != nil {
		var pathError *fs.PathError
		if errors.As(err, &pathError) {
			fmt.Println("Failed at path:", pathError.Path)
		} else {
			fmt.Println(err)
		}
	}


	// Оборачивание ошибок
	err = fs.ErrExist
	wrapErr:= fmt.Errorf("error during process %w", err)


	err = MyError{4, err}
	fmt.Println(errors.Unwrap(err))

	// Проверка типа ошибки
	if errors.Is(wrapErr, fs.ErrExist) {
		fmt.Println("File already exists IS")
	}
	if wrapErr == fs.ErrExist {
		fmt.Println("File already exists ==")
	}
}
