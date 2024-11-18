import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
})
export class PokemonListPage implements OnInit {
  pokemonName: string = '';
  pokemonData: any = null;
  loading = false;
  errorMessage: string = '';

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.searchPokemon();
  }

  searchPokemon() {
    if (!this.pokemonName.trim()) {
      this.errorMessage = 'Por favor, ingresa el nombre de un Pokémon.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.pokemonData = null;

    this.pokemonService.getPokemons(this.pokemonName.toLowerCase()).subscribe({
      next: (response) => {
        this.pokemonData = response;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Pokémon no encontrado. Intenta con otro nombre.';
        this.loading = false;
      },
    });
  }

}
