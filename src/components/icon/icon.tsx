import {Component, Element, getAssetPath, h, Host, Prop, State, Watch} from '@stencil/core';

// https://github.com/ionic-team/ionicons

@Component({
  tag: 'it-icon',
  assetsDir: 'svg',
  styleUrl: 'icon.scss',
  shadow: true
})
export class Icon {
  @Element() el!: HTMLElement;
  
  @Prop() name?: string;
  @Prop() src?: string;
  @Prop() size?: 'small' | 'medium' | 'large';
  
  @State() svgContent?: string;
  
  componentDidLoad() {
    this.loadIcon();
  }
  
  @Watch('name')
  @Watch('src')
  private async loadIcon() {
    const url = (this.src) ? this.src : getAssetPath(`svg/${this.name}.svg`);
    if (url) {
      this.svgContent = await this.getSvgContent(url);
    }
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
      return <Host role="img" class={{[`icon-${this.size}`]: !!this.size}}>
        <div class="icon-inner" innerHTML={this.svgContent}/>
      </Host>;
    }
  }
}

