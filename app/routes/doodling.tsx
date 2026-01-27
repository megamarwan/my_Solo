import { useState, useEffect } from "react";
import { Loader2, Zap, Shield, Heart } from "lucide-react";

interface PokemonData {
  name: string;
  sprites: { front_default: string };
  stats: { base_stat: number; stat: { name: string } }[];
  types: { type: { name: string } }[];
}

export default function PokemonFetcher() {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pokemonName, setPokemonName] = useState<string>("pikachu");

  const fetchPokemon = async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      if (!response.ok) throw new Error("Pokemon not found!");
      
      const data = await response.ok ? await response.json() : null;
      setPokemon(data);
    } catch (err: any) {
      setError(err.message);
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon(pokemonName);
  }, []);

  return (
    <div className="p-6 max-w-sm mx-auto bg-[#1a1c2e] rounded-3xl border border-white/10 text-white shadow-xl">
      {/* Search Bar */}
      <div className="flex gap-2 mb-6">
        <input 
          type="text" 
          placeholder="Enter name..."
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 w-full outline-none focus:border-orange-500"
          onKeyDown={(e) => e.key === 'Enter' && fetchPokemon(pokemonName)}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button 
          onClick={() => fetchPokemon(pokemonName)}
          className="bg-orange-500 hover:bg-orange-600 p-2 rounded-xl transition-colors"
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="flex justify-center py-10"><Loader2 className="animate-spin text-orange-500" size={40} /></div>
      )}

      {error && <div className="text-red-400 text-center py-10">{error}</div>}

      {pokemon && !loading && (
        <div className="text-center">
          <img 
            src={pokemon.sprites.front_default} 
            alt={pokemon.name} 
            className="w-40 h-40 mx-auto drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]"
          />
          <h2 className="text-3xl font-bold capitalize mb-4">{pokemon.name}</h2>
          
          <div onClick = { ()=>console.log('hello world') }className="flex justify-center gap-2 mb-6">
            {pokemon.types.map(t => (
              <span key={t.type.name} className="px-3 py-1 bg-white/10 rounded-full text-xs uppercase tracking-widest border border-white/5">
                {t.type.name}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm bg-black/20 p-4 rounded-2xl">
            <div className="flex flex-col items-center">
              <Heart size={16} className="text-red-500 mb-1" />
              <span>{pokemon.stats[0].base_stat}</span>
            </div>
            <div className="flex flex-col items-center">
              <Zap size={16} className="text-yellow-500 mb-1" />
              <span>{pokemon.stats[1].base_stat}</span>
            </div>
            <div className="flex flex-col items-center">
              <Shield size={16} className="text-blue-500 mb-1" />
              <span>{pokemon.stats[2].base_stat}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}