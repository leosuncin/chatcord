import { addAliases } from 'module-alias';
import { resolve } from 'path';

const rootPath = resolve(__dirname, '..', 'dist');

addAliases({
  '@src': rootPath,
});
