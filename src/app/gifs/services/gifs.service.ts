import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _tagsHistory: string[] = [];
  private _giftApiKey = environment.GIPHY_API_KEY;
  private _serviceURL: string = 'https://api.giphy.com/v1/gifs';
  public gifList: Gif[] = [];

  constructor(private http: HttpClient) {
    this._readLocalStorage();
  }

  get tagsHitory() {
    return [...this._tagsHistory];
  }

  private _organizeHistory(tag: string) {
    tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this._saveLocalStorage();
  }

  private _saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }
  private _readLocalStorage(): void {
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  public searchTag(tag: string): void {
    if (tag.length === 0) return;
    this._organizeHistory(tag);
    const params = new HttpParams()
      .set('api_key', this._giftApiKey)
      .set('limit', '10')
      .set('q', tag);
    this.http
      .get<SearchResponse>(`${this._serviceURL}/search`, { params })
      .subscribe({
        next: (resp) => (this.gifList = resp.data),
      });
  }
}
