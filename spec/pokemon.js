describe('Test Pokemon', () => {
    let squirtle
    let especieSquirlte
    let tipoAgua
    let onix
    let especieOnix
    let tipoRoca
    let entrenador1

    beforeEach(() => {
        tipoAgua = new Tipo("Agua")
        tipoRoca = new Tipo("Roca")
        especieSquirlte = new Especie("Squirtle", tipoAgua)
        especieOnix = new Especie("Onix", tipoRoca)
        squirtle = new Pokemon("Squirtle", especieSquirlte)
        onix = new Pokemon("Onix", especieOnix)
        entrenador1 = new Entrenador()
    })

    it('Pokemon experiencia 0 nivel 0', () => {
        squirtle.calcularNivel();
        expect(1).toBe(squirtle.nivel)
    })

    it('Pokemon experiencia 3124987,5 nivel 250', () => {
        squirtle.experiencia = 3124987, 5;
        squirtle.calcularNivel();
        expect(250).toBe(squirtle.nivel)
    })

    it('Pokemon es fuerte a otro pokemon', () => {
        tipoAgua.tiposFuertes.push(tipoRoca)
        expect(true).toBe(squirtle.esFuerteA(onix))
    })

    it('Pokemon es resistente a otro pokemon', () => {
        tipoAgua.tiposResistentes.push(tipoRoca)
        expect(true).toBe(squirtle.esResistenteA(onix))
    })

    it('Calcular chances de ganar No Fuerte, No Resistente y No Experto', () => {
        squirtle.ptosAtaque = 20
        squirtle.entrenador = entrenador1
        expect('20.0').toBe(squirtle.calcularChancesDeGanar(onix))
    })

    it('Calcular chances de ganar Si Fuerte, No Resistente y No Experto', () => {
        squirtle.ptosAtaque = 20
        squirtle.entrenador = entrenador1
        tipoAgua.tiposFuertes.push(tipoRoca)
        expect('25.0').toBe(squirtle.calcularChancesDeGanar(onix))
    })

    it('Calcular chances de ganar No Fuerte, Si Resistente y No Experto', () => {
        squirtle.ptosAtaque = 20
        squirtle.entrenador = entrenador1
        tipoAgua.tiposResistentes.push(tipoRoca)
        expect('23.0').toBe(squirtle.calcularChancesDeGanar(onix))
    })

    it('Calcular chances de ganar No Fuerte, No Resistente y Si Experto', () => {
        squirtle.ptosAtaque = 20
        entrenador1.cambiarExperto()
        squirtle.entrenador = entrenador1
        expect('24.0').toBe(squirtle.calcularChancesDeGanar(onix))
    })

    it('Calcular chances de ganar Si Fuerte, Si Resistente y Si Experto', () => {
        squirtle.ptosAtaque = 20
        entrenador1.cambiarExperto()
        squirtle.entrenador = entrenador1
        tipoAgua.tiposFuertes.push(tipoRoca)
        tipoAgua.tiposResistentes.push(tipoRoca)
        expect('34.5').toBe(squirtle.calcularChancesDeGanar(onix))
    })   
})