import {Component, Element, getAssetPath, h, Host, Prop, State, Watch} from '@stencil/core';
import {IItIconColors, IItIconName} from './interfaces';

// https://github.com/ionic-team/ionicons

@Component({
  tag: 'it-icon',
  assetsDir: 'svg',
  styleUrl: 'icon.scss',
  shadow: true
})
export class Icon {
  @Element() el!: HTMLElement;
  
  @Prop() name: IItIconName;
  @Prop() src?: string;
  @Prop() size?: 'small' | 'medium' | 'large';
  @Prop() color: IItIconColors = 'primary';
  @Prop() secondaryColor: IItIconColors = 'dark';
  
  @State() svgContent?: string;
  
  componentDidLoad() {
    this.loadIcon();
  }
  
  @Watch('name')
  @Watch('src')
  private async loadIcon() {
    const url = (this.src) ? this.src : getAssetPath(`svg/${this.name}.svg`);
    if (url) {
      const secondaryColor = window.getComputedStyle(document.documentElement).getPropertyValue('--it-color-' + this.secondaryColor);
      this.svgContent = this.replaceAll(await this.getSvgContent(url), `fill="#333"`, `fill="${secondaryColor}"`);
    }
  }
  
  private replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'g'), replace);
  }
  
  // https://github.com/ionic-team/ionicons/blob/master/src/components/icon/request.ts
  private getSvgContent(url: string) {
    // see if we already have a request for this url
    let req = window.itIconRequests.get(url);
    
    if (!req) {
      // we don't already have a request
      req = fetch(url).then(rsp => {
        if (rsp.status <= 299) {
          return rsp.text();
        }
        return Promise.resolve(null);
      });
      
      // cache for the same requests
      window.itIconRequests.set(url, req);
    }
    
    return req;
  };
  
  render() {
    if (this.svgContent) {
      return <Host role="img" class={{[`icon-${this.size}`]: !!this.size}}
                   style={{fill: `var(--it-color-${this.color})`}}>
        <div class="icon-inner" innerHTML={this.svgContent}/>
      </Host>;
    }
  }
}

