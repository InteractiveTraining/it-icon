import {Config} from '@stencil/core';
import {sass} from '@stencil/sass';

export const config: Config = {
  namespace: 'it-icon',
  srcDir: 'src/components/',
  globalScript: 'src/components/global.ts',
  plugins: [
    sass()
  ],
  outputTargets: [
    {
      type: 'dist'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      copy: [
        {
          src: '../svg/',
          dest: './build/svg/',
          keepDirStructure: true
        }
      ],
      serviceWorker: null
    }
  ],
  
  devServer: {
    openBrowser: false,
  },
  preamble: '(C) 2019 Interactive.Training https://interactive.training'
};
