# Fig

CLI for storing, opening and copying gifs

## Install
```
$ yarn global add fig
```

## Usage
```
$ fig --help

  Usage
    $ fig [command] [options] [args...]

    If no command is provided, defaults to copy

  Commands
    add [name] [url] Add new entry
    copy [name]      Copy gif url to clipboard
    list [name]      List all gif names
    open [name]      Open gif in browser

  Options
    -f, --force Override existing entry [Default: false]

  Examples
    $ fig add hackerman https://media.giphy.com/media/QbumCX9HFFDQA/giphy.gif
    $ fig hackerman
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
