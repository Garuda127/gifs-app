import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  private _oldTag: string = '';
  constructor(private gifsService: GifsService) {}

  get tagHistory(): string[] {
    return this.gifsService.tagsHitory;
  }

  public getOldGifs(tag: string): void {
    if (this._oldTag === tag) return;
    this.gifsService.searchTag(tag);
    this._oldTag = tag;
  }
}
