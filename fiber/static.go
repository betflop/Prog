package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

func main() {

    app := fiber.New()

    app.Static("/", "./src_go")
    fmt.Println("------")
    log.Fatal(app.Listen(":3000"))
}
