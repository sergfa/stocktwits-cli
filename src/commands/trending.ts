import { Command, flags } from '@oclif/command';
import { map } from 'rxjs/operators';
import { TrendingProductType } from '../models/trending.model';
import { StockWitsDataProviderService } from '../services/stockwits-data-provider.service';
import { Symbol } from '../models/common.model';
import * as fs from 'fs';

export default class Trending extends Command {
  static description = 'Returns a list of all the trending symbols at the moment requested. These are updated in 5-minute intervals.';

  static examples = [
    `$ stocktwits-cli trending symbols`,
    `stocktwits-cli trending symbols --output results.txt`,
    `$ stocktwits-cli trending -d ';' symbols`,
    `$ stocktwits-cli trending equities`
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    delimiter: flags.string({ char: 'd', default: ',' }),
    output: flags.string({ char: 'o', description: 'append output to file' })
  };

  static args = [
    {
      name: 'product',
      required: true,
      description: "Symbols include equties and non-equities like futures and forex. Equities doesn't include futures and forex",
      options: [TrendingProductType.SYMBOLS, TrendingProductType.EQUITIES]
    }
  ];

  async run() {
    const srv = new StockWitsDataProviderService();
    const { args, flags } = this.parse(Trending);
    srv
      .getTrendingData(args.product)
      .pipe(map((symbolsData: Symbol[]) => symbolsData.map((item) => item.symbol)))
      .subscribe(
        (symbols: string[]) => {
          const content = symbols.join(flags.delimiter) + '\r\n';
          if (flags.output) {
            fs.appendFile(flags.output, content, (err: NodeJS.ErrnoException | null) => {
              if (err) {
                this.log('Failed to save output', err.message);
              }
            });
          } else {
            this.log(content);
          }
        },
        (err: Error) => this.log(err.message)
      );
  }
}
