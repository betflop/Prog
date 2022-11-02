package main

import "fmt"

func main() {
	//func () {
	//	var idToName map[uint]string
	//	fmt.Println(idToName[0])
	//
	//    idToName[1] = "Vera"
	//}()


	//func () {
	//	idToName := map[uint]string{}
	//	idToName[1] = "Vera"
	//
	//	for key, value := range idToName {
	//		fmt.Println(key, value)
	//	}
	//}()
	//
	func () {
		idToName := map[uint]string{
			0: "Sveta",
			1: "Vera",
			2: "Nika",
		}
		idToName[3] = "Veronika"
		_, ok := idToName[0]
		fmt.Println(ok)
		if val, found := idToName[0]; found {
			fmt.Println("id 0 has ", val)
		}
		for key, value := range idToName {
			fmt.Println(key, value)
		}
	}()



}