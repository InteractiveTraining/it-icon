// https://github.com/ionic-team/ionicons/blob/master/scripts/copy-tasks.js
import * as fs from 'fs-extra';
import * as path from 'path';

let optimizedSvgsDir = path.join(__dirname, '..', 'src', 'svg');
let componentSvgsDir = path.join(__dirname, '..', 'dist', 'it-icon', 'svg');
let collectionSvgsDir = path.join(__dirname, '..', 'dist', 'collection', 'icon', 'svg');

fs.emptyDirSync(componentSvgsDir);
fs.emptyDirSync(collectionSvgsDir);

fs.copySync(optimizedSvgsDir, collectionSvgsDir);
fs.copySync(optimizedSvgsDir, componentSvgsDir, {overwrite: true});