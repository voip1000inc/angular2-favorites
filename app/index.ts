// Import bootstrapping code
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent, FavoritesManager} from './components/app';
import {Observable} from 'rxjs/rx';

export function main() {
    bootstrap(AppComponent, [FavoritesManager]);
}