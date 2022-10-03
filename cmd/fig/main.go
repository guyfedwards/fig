package main

import (
	"os"

	"github.com/guyfedwards/fig/internal/commands"
	"github.com/guyfedwards/fig/internal/config"
	"github.com/guyfedwards/fig/internal/store"
)

func main() {
	opts, err := config.GetOpts()

	if err != nil {
		opts.Usage()
		os.Exit(1)
	}

	store := store.New(opts.ConfigPath)

	cmds := commands.New(opts, store)

	switch opts.Command {
	case "add":
		cmds.Add()
	case "list", "ls":
		cmds.List()
	case "get":
		cmds.Get()
	default:
		opts.Usage()
	}
}
