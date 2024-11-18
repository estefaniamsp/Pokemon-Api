import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  // Obtener la lista de Pokémon
  getPokemonList(): Observable<any> {
    return this.http.get(`${this.apiUrl}?limit=100000&offset=0`);
  }

  getPokemonListWithPagination(limit: number, offset: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?limit=${limit}&offset=${offset}`);
  }
  

  getPokemons(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${name}`);
                                          
  }

  // Obtener detalles de un Pokémon por nombre o ID
  getPokemonDetails(name: string): Observable<any> {
    const url = `${this.apiUrl}/${name}`;
    console.log('Fetching details from URL:', url); 
    return this.http.get(url);
  }
}