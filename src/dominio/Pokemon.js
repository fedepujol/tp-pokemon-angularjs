class Pokemon {
    constructor(unNombre, unaEspecie, unaExperiencia, ptosVida, unGenero, ptosVidaMax, unIdRepo, unIdPokemon, unEstado) {
        this.nombre = unNombre
        this.especie = unaEspecie
        this.experiencia = unaExperiencia
        this.entrenador
        this.nivel
        this.puntosDeAtaque
        this.estado = unEstado
        this.puntosDeVida = ptosVida
        this.genero = unGenero
        this.puntosDeVidaMax = ptosVidaMax
        this.idRepo = unIdRepo
        this.idPokemon = unIdPokemon
        this.calcularNivel()
    }

    static asPokemon(jsonPokemon) {
        return angular.extend(new Pokemon(), jsonPokemon)
    }

    calcularNivel() {
        return this.nivel = Math.trunc((Math.sqrt(100 * (2 * this.experiencia + 25)) + 50) / 100)
    }

    calcularExpMax() {
        return (50 * Math.pow((this.nivel + 1), 2)) - (51 / 4)
    }

    calcularPorcentajeVida() {
        return parseFloat((this.puntosDeVida * 100) / this.puntosDeVidaMax).toFixed(2)
    }

    calcularPorcentajeExperiencia() {
        let experienciaMax = this.calcularExpMax()
        return parseFloat((this.experiencia * 100) / this.calcularExpMax()).toFixed(2)
    }

    calcularChancesDeGanar(unPokemon) {
        this.calculoExpMax()
        var chance = 0
        chance = this.puntosDeAtaque;

        if (this.esFuerteA(unPokemon)) {
            chance = chance * 1.25;
        }

        if (this.esResistenteA(unPokemon)) {
            chance = chance * 1.15;
        }

        if (this.entrenador.esExperto) {
            chance = chance * 1.20;
        }

        return parseFloat(chance).toFixed(1)
    }

    esFuerteA(unPokemon) {
        return this.especie.fuerteA(unPokemon.especie.tipos);
    }

    esResistenteA(unPokemon) {
        return this.especie.resistenteA(unPokemon.especie.tipos);
    }

    estaEnEquipo() {
        return this.estado
    }
}