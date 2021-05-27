const meow = require('meow')
const commands = require('./src')

const cli = meow(`
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
`, {
  flags: {
    force: {
      alias: 'f',
      type: 'boolean',
    },
    silent: {
      alias: 's',
      type: 'boolean',
    }
  }
})

const deAlias = (cmd) => {
  const aliases = {
    'cp': 'copy',
    'ls': 'list'
  }

  const alias = aliases[cmd]

  if (alias) {
    return alias
  }

  return cmd
}

;(async () => {
  if (cli.input.length < 1) {
    cli.showHelp()
  }

  const cmd = commands[deAlias(cli.input[0])]

  if (cmd) {
    const [_, ...args] = cli.input

    try {
      const msg = await cmd(args, cli.flags)
      if (msg) {
        console.log(msg)
      }
    } catch(err) {
      console.log(err)
    }
  } else {
    try {
      const msg = await commands.copy(cli.input)
      if (msg) {
        console.log(msg)
      }
    } catch(err) {
      console.log(err)
    }
  }
})()
