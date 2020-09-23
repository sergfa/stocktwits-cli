import { Command, flags } from '@oclif/command';
import { map, take } from 'rxjs/operators';
import { StockWitsDataProviderService } from '../services/stockwits-data-provider.service';
import { StreamsProductType } from './../models/streams.model';
import { Message } from './../models/common.model';
import * as fs from 'fs';
const he = require('he');

export default class Streams extends Command {
  static description = 'Returns the most recent messages for the specified product.';

  static examples = [
    `$ stocktwits-cli streams symbol --data 'TSLA'`,
    `$ stocktwits-cli streams trending`,
    `$ stocktwits-cli streams trending --output results.txt`
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    delimiter: flags.string({ char: 'd', default: '\r\n' }),
    data: flags.string({ char: 'a', required: false, default: 'TSLA' }),
    output: flags.string({ char: 'o', description: 'append output to file' })
  };

  static args = [
    { name: 'product', required: true, description: 'Supported products', options: [StreamsProductType.SYMBOL, StreamsProductType.TRENDING_EQUITIES] }
  ];

  async run() {
    const srv = new StockWitsDataProviderService();
    const { args, flags } = this.parse(Streams);
    srv
      .getStreamsData(args.product, flags.data.split(' '))
      .pipe(map((messagesData: Message[]) => messagesData.map(this.prepareMessageOutput)))
      .subscribe(
        (messages: string[]) => {
          const content = messages.join(flags.delimiter) + '\r\n';
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

  private prepareMessageOutput = (item: Message): string => {
    let body: string = he.decode(item.body);
    // replace all new lines
    body = body.replace(/[\r\n]+/g, ' ');
    // replace tabs
    //body = body.replace(/\t/g, ' ');
    body = body.replace(/\s\s+/g, ' ');
    //  body = body.replace(/https?:\/\/\S+/g, '*url*');
    let steintment = item.entities?.sentiment?.basic || 'Unknown';
    return [item.id, body, steintment].join('\t');
  };
}
