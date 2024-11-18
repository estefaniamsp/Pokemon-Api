import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
})
export class PokemonListPage implements OnInit {
  pokemonList: any[] = [];
  selectedPokemon: any = null;
  loadingList = false;
  loadingDetails = false;
  loading = false;
  errorMessage: string = '';

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.fetchPokemons();
  }

  fetchPokemons(limit = 50, offset = 0) {
    this.loading = true;
    this.errorMessage = '';

    this.pokemonService.getPokemonListWithPagination(limit, offset).subscribe({
      next: (response) => {
        this.pokemonList = response.results;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching Pokémon list:', error);
        this.errorMessage = 'No se pudo cargar la lista de Pokémon.';
        this.loading = false;
      },
    });
  }

  fetchPokemonDetails(name: string) {
    this.loadingDetails = true;
    this.selectedPokemon = null;
    this.errorMessage = '';

    this.pokemonService.getPokemonDetails(name).subscribe({
      next: (response) => {
        console.log('Lista de Pokémon:', response.results);
        this.selectedPokemon = response;
        this.loadingDetails = false;
      },
      error: (error) => {
        console.error('Error fetching Pokémon details:', error);
        this.errorMessage = 'No se pudieron cargar los detalles del Pokémon.';
        this.loadingDetails = false;
      },
    });
  }

}
