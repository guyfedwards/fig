package commands

import (
	"fmt"
	"log"
	"math"
	"sort"

	"github.com/guyfedwards/fig/internal/config"
	"github.com/guyfedwards/fig/internal/store"
)

type Commands struct {
	store store.Storer
	opts  config.Options
}

func New(o config.Options, s store.Storer) *Commands {
	return &Commands{
		store: s,
		opts:  o,
	}
}

func (c *Commands) Add() {
	if len(c.opts.Args) < 2 {
		c.opts.Usage()
		return
	}
	key := c.opts.Args[0]
	value := c.opts.Args[1]

	s, err := c.store.Read()
	if err != nil {
		log.Fatal(err)
	}

	s[key] = store.Gif{URL: value}

	err = c.store.Write(s)
	if err != nil {
		log.Fatal(err)
	}
}

func (c *Commands) List() {
	result, err := c.store.Read()

	if err != nil {
		log.Fatal(err)
	}

	keys := make([]string, len(result))
	i := 0
	longestKey := 0
	for k := range result {
		keys[i] = k
		if len(k) > longestKey {
			longestKey = len(k)
		}
		i++
	}
	sort.Strings(keys)

	var subListSize int

	cols := 3
	// round up the column length to get enough rows
	subListSize = int(math.Ceil(float64(len(keys)) / float64(cols)))
	lines := make([][3]string, subListSize)

	for i, v := range keys {
		col := i / subListSize
		index := i - subListSize*col

		if col < len(lines[index]) {
			lines[index][col] = v
		}
	}

	for i := 0; i < len(lines); i++ {
		// TODO: build lines dynamically depending on number of columns
		l := ""
		for col := 0; col < cols; col++ {
			l = fmt.Sprintf("%s %-*s", l, longestKey, lines[i][col])
		}
		fmt.Println(l)
	}
}

func (c *Commands) Get() {
	if len(c.opts.Args) < 1 {
		c.opts.Usage()
		return
	}

	key := c.opts.Args[0]
	s, err := c.store.Read()
	if err != nil {
		log.Fatal(err)
	}

	result := s[key].URL

	if err != nil {
		c.opts.Usage()
		return
	}

	fmt.Println(result)
}
