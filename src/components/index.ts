export * from './components';

declare global {
  export interface Window {
    itIconRequests: Map<string, Promise<string>>;
  }
}