package main

import "fmt"

func main() {
	nihongo := "日本語"

	fmt.Printf("len: %d\n", len(nihongo))
	//fmt.Printf("cap: %d\n", cap(nihongo))

	fmt.Println(nihongo[0], " vs ", []rune(nihongo)[0])
	fmt.Println(len(nihongo), " vs ", len([]rune(nihongo)))

	str := "ABC€"

	b := []byte(str)
	fmt.Println(b)

	b[0] = 'B'
	fmt.Println(str)

	s := string([]byte{65, 66, 67, 226, 130, 172})
	for _, v := range s {
		fmt.Println(v)
	}
	fmt.Println(s[:4])
}
