import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _apiKey: string = 'IJfLO7bLNSZ3pkKyLMqzkKkwZWKf8TaM';
  private _url: string = 'https://api.giphy.com/v1/gifs/search';
  private _historial: string[] = [];

  public resultados: any[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private httpClient: HttpClient) {
    const ls = localStorage.getItem('historial');
    this._historial= JSON.parse(ls!) || [];

    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial',JSON.stringify(this._historial));
    }

    this.httpClient
      .get(`${this._url}?api_key=${this._apiKey}&q=${query}&limit=10`)
      .subscribe((resp: any) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados',JSON.stringify(this.resultados));

      });
  }
}
