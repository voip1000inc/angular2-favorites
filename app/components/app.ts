/// <reference path="../../typings/browser.d.ts" />

// Import ambient dependencies
import 'semantic-ui';
import $ from 'jquery';

// Import bits and pieces
import {Component, Injectable, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/rx';
import shortid from 'shortid';

export class Favorite {
    constructor() {
        this.uuid = shortid.generate();
    }
}

export interface Favorite {
    uuid: string;
    description: string;
    url: string;
    categories: string;
}

@Injectable()
export class FavoritesManager {
    private _selected: number;
    public items: Favorite[];
    
    public get selected() {
        return this._selected;
    }
    
    constructor() {
        this.items = [];
        this._selected = 0;
        this.addItem(new Favorite());
    }
    
    addItem(item: Favorite) {
        this.items.push(item);
    }
    
    selectItem(index: number) {
        this._selected = index;
    }
}
@Component({
    selector: 'app-cmp',
    templateUrl: 'app/components/app.html',
    directives: [...CORE_DIRECTIVES, ...FORM_DIRECTIVES]
})
export class AppComponent implements OnInit {
    get current() {
        return this.manager.items[this.manager.selected];
    }
    
    constructor(public manager: FavoritesManager) {
    }
    
    onSubmit() {
        this.manager.addItem(new Favorite());
        this.manager.selected = this.manager.items.length - 1;
    }
    
    ngOnInit() {
        (<any>$).fn.dropdown.settings.debug = true;
        (<any>$('#categories')).dropdown({
            allowAdditions: true,
            onChange: (value: string) => {
                this.current.categories = value;
            }
        });
    }
}