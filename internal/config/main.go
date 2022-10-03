package config

import (
	"errors"
	"flag"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

type Options struct {
	Force      bool
	Silent     bool
	Command    string
	ConfigPath string
	Args       []string
}

var errNotEnoughArgs = errors.New("not enough arguments")

func (o Options) Usage() {
	fmt.Printf(`Usage of fig:
$ fig [command] [options] [args...]

If no command is provided, defaults to copy
Commands
  add     [name] [url] Add new entry
  list,ls [name]       List all gif names

Options
  -f, --force Override existing entry [Default: false]
  -s, --silent Suppress output messages [Default: false]
	-c, --config Custom config location [Default: OS User Config Dir]

Examples
  $ fig add hackerman https://media.giphy.com/media/QbumCX9HFFDQA/giphy.gif
  $ fig get hackerman
`)
}

func GetOpts() (Options, error) {
	var (
		force      bool
		silent     bool
		configPath string
	)

	flag.BoolVar(&force, "force", false, "Override existing entry")
	flag.BoolVar(&force, "f", false, "Override existing entry")

	flag.BoolVar(&silent, "silent", false, "Suppress output messages")
	flag.BoolVar(&silent, "s", false, "Suppress output messages")

	flag.StringVar(&configPath, "config", "", "Suppress output messages")

	flag.Parse()

	var args []string

	if len(os.Args) < 2 {
		return Options{}, errNotEnoughArgs
	}

	if configPath == "" {
		configDir, err := os.UserConfigDir()

		if err != nil {
			return Options{}, fmt.Errorf("config: %w", err)
		}

		configPath = filepath.Join(configDir, "fig")
	}

	for _, a := range os.Args[1:] {
		// strip out flags
		if !strings.HasPrefix(a, "-") {
			args = append(args, a)
		}
	}

	opts := Options{
		Force:      force,
		ConfigPath: configPath,
		Silent:     silent,
		Command:    args[0],
		Args:       args[1:],
	}

	return opts, nil
}
