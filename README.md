stocktwits-cli
=======

Provides stock data by Stocktwits REST API

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g stocktwits-cli
$ stocktwits-cli COMMAND
running command...
$ stocktwits-cli (-v|--version|version)
stocktwits-cli/0.0.1 darwin-x64 node-v13.12.0
$ stocktwits-cli --help [COMMAND]
USAGE
  $ stocktwits-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`stocktwits-cli help [COMMAND]`](#stocktwits-cli-help-command)
* [`stocktwits-cli streams PRODUCT`](#stocktwits-cli-streams-product)
* [`stocktwits-cli trending PRODUCT`](#stocktwits-cli-trending-product)

## `stocktwits-cli help [COMMAND]`

display help for stocktwits-cli

```
USAGE
  $ stocktwits-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `stocktwits-cli streams PRODUCT`

Returns the most recent messages for the specified product.

```
USAGE
  $ stocktwits-cli streams PRODUCT

ARGUMENTS
  PRODUCT  (symbol|trending) Supported products

OPTIONS
  -a, --data=data            [default: TSLA]

  -d, --delimiter=delimiter  [default:
                             ]

  -h, --help                 show CLI help

  -o, --output=output        append output to file

EXAMPLES
  $ stocktwits-cli streams symbol --data 'TSLA'
  $ stocktwits-cli streams trending
  $ stocktwits-cli streams trending --output results.txt
```

_See code: [src/commands/streams.ts](https://github.com/sergfa/stocktwits-cli/blob/v0.0.1/src/commands/streams.ts)_

## `stocktwits-cli trending PRODUCT`

Returns a list of all the trending symbols at the moment requested. These are updated in 5-minute intervals.

```
USAGE
  $ stocktwits-cli trending PRODUCT

ARGUMENTS
  PRODUCT  (symbols|equities) Symbols include equties and non-equities like futures and forex. Equities doesn't include
           futures and forex

OPTIONS
  -d, --delimiter=delimiter  [default: ,]
  -h, --help                 show CLI help
  -o, --output=output        append output to file

EXAMPLES
  $ stocktwits-cli trending symbols
  stocktwits-cli trending symbols --output results.txt
  $ stocktwits-cli trending -d ';' symbols
  $ stocktwits-cli trending equities
```

_See code: [src/commands/trending.ts](https://github.com/sergfa/stocktwits-cli/blob/v0.0.1/src/commands/trending.ts)_
<!-- commandsstop -->
* [`stocktwits-cli help [COMMAND]`](#stocktwits-cli-help-command)

## `stocktwits-cli streams PRODUCT`
Returns the most recent messages for the specified product.

```
USAGE
  $ stocktwits-cli streams PRODUCT

ARGUMENTS
  PRODUCT  (symbol|trending) Supported products

OPTIONS
  -a, --data=data            [default: TSLA]

  -d, --delimiter=delimiter  [default: 
                             ]

  -h, --help                 show CLI help

  -o, --output=output        append output to file

EXAMPLES
  $ stocktwits-cli streams symbol --data 'TSLA'
  $ stocktwits-cli streams trending
  $ stocktwits-cli streams trending --output results.txt

```  

## `stocktwits-cli trending PRODUCT`

Returns a list of all the trending symbols at the moment requested. These are updated in 5-minute intervals.

```
USAGE
  $ stocktwits-cli trending PRODUCT

ARGUMENTS
  PRODUCT  (symbols|equities) Symbols include equties and non-equities like futures and forex. Equities doesn't include futures and forex

OPTIONS
  -d, --delimiter=delimiter  [default: ,]
  -h, --help                 show CLI help
  -o, --output=output        append output to file
EXAMPLE
  $ stocktwits-cli trending equities
  SAVA,CCXX,MFAC,OSH,CEO,ISEE,VALE,IQ,CNBKA,LCA,AERI,NNOX,BMY,CTRA,ORCL,AVDL,SNAP,MA,SOAC,WMT,HLT,SUPN,HSY,HAL,BMI,SGMO,BLNK,GRAF,CPE,MAT
```

## `stocktwits-cli help [COMMAND]`

display help for stocktwits-cli

```
USAGE
  $ stocktwits-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```
