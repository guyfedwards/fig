const meow = require('meow')
const commands = require('./src')

const cli = meow(`
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
    $ fig open hackerman
`, {
  flags: {
    force: {
      type: 'boolean',
      alias: 'f'
    }
  }
})

;(async () => {
  if (cli.input.length < 1) {
    cli.showHelp()
  }

  if (commands[cli.input[0]]) {
    const [cmd, ...args] = cli.input

    try {
      const msg = await commands[cmd](args, cli.flags)
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
