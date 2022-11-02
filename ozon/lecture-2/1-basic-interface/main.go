package main

import "fmt"

type Stringer interface {
	String() string
}

func (u *User) String() string {
	return u.Name
}

type User struct {
	Name string
}

func foo(s Stringer) {
	fmt.Println(s.String())
}

func main(){
	user := User{
		Name: "Anna",
	}

	foo(&user)
	fmt.Println(user)

// 	var stringer Stringer
// 	var user2 *User
// 	stringer = user2
// 	if stringer == nil {
// 		fmt.Println("Stringer is null")
// 	}
// 	fmt.Printf("%v", stringer)

}
