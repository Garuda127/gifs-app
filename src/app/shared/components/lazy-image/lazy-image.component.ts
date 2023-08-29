import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
@Input()
export class LazyImageComponent implements OnInit {
  @Input()
  public url!: string;
  @Input()
  public alt?: string;
  private _hasLoaded: boolean = false;
  get hasLoaded() {
    return this._hasLoaded;
  }
  ngOnInit(): void {
    if (!this.url) throw new Error('Image Required.');
  }
  onLoad() {
    setTimeout(() => {
      this._hasLoaded = true;
    }, 200);
  }
}
