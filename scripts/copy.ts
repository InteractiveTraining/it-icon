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


let interfaceValue = '';
const svgFiles = fs.readdirSync(optimizedSvgsDir);
svgFiles.map(file => file.split('.')[0]).map((name, key) => {
  interfaceValue += `'${name}'${(svgFiles.length - 1 !== key) ? ` | ` : ''}`;
});

let iconNameInterface = `export type  IItIconName = ${interfaceValue};
export type IItIconColors = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark';`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'components', 'icon', 'interfaces.ts'), iconNameInterface);