package anagram
// package main
import (
	// "fmt"
	// "io/ioutil"
	"strings"
	"sort"
	// "testing"
)


func FindAnagrams(dictionary []string, word string) (result []string) {
	myword := strings.ReplaceAll(strings.ToLower(word), " ", "")
    	fword := []rune(myword)
    	sort.Slice(fword, func(i int, j int) bool { return fword[i] < fword[j] })
	answer := make([]string, 0, 1)

	for _, currentword := range dictionary {
		if strings.ToLower(currentword) == strings.ToLower(word) {
			// println("myword", word, currentword)
			continue
		}
		w := strings.ReplaceAll(strings.ToLower(currentword), " ", "")
		if w == "" {
			break
		}
		fw := []rune(w)
    		sort.Slice(fw, func(i int, j int) bool { return fw[i] < fw[j] })
		// println(word, w, string(fword), string(fw))
		if string(fword) == string(fw){
			answer = append(answer, currentword)
				// println("ANSWER!!", word, w)
		}
		// println(i, w)
	}

	// fmt.Printf("%v", answer)
	return answer
}

