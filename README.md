# Fig

CLI for storing, opening and *copying* gifs.  
Optionally uses cloudinary to store original `.gif`

## Install
```
$ yarn global add fig
```

## Usage
```sh
Usage
    $ fig [command] [options] [args...]

    If no command is provided, defaults to copy

  Commands
    add     [name] [url] Add new entry
    copy,cp    [name]       Copy gif url to clipboard
    list,ls [name]       List all gif names
    open    [name]       Open gif in browser
    get     [name]       Get gif url

  Options
    -f, --force Override existing entry [Default: false]
    -s, --silent Suppress output messages [Default: false]

  Examples
    $ fig add hackerman https://media.giphy.com/media/QbumCX9HFFDQA/giphy.gif
    $ fig open hackerman
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
