package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	file, err := os.Open("nginx.conf")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	newUpstream := "upstream new_upstream {\n  server new_server:new_port;\n}\n"
	var lines []string
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}
	if err := scanner.Err(); err != nil {
		panic(err)
	}
	for i, line := range lines {
		if strings.Contains(line, "#####") {
			lines = append(lines[:i], append([]string{newUpstream}, lines[i:]...)...)
			break
		}
	}

	file, err = os.Create("nginx.conf")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	w := bufio.NewWriter(file)
	for _, line := range lines {
		fmt.Fprintln(w, line)
	}
	w.Flush()
}
