# Fig

CLI for storing and retrieving gifs or really any string values.  

## Install
See [releases](https://github.com/guyfedwards/fig/releases)

## Usage
```sh
Usage of fig:
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
```

## Weechat
To access fig in weechat, add the following to `$HOME/.weechat/alias.conf`
```
fig = "/exec -norc fig"
```
Then just use:
```
/fig list
/fig get hackerman
```
