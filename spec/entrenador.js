describe('Test Entrenaor', () => {
    let entrenador
    let tabla

    beforeEach(() => {
        tabla = new TablaNiveles()
        entrenador = new Entrenador("Ash", 0, 0, [])
        entrenador.tablaNiveles = tabla
        tabla.agregarNivel(1, 0)
        tabla.agregarNivel(2, 1000)
    })

    it('Entrenador con experiencia 0 es nivel 1', () => {
        expect(1).toBe(entrenador.calcularNivel())
    })

    it('Entrenador con experiencia 160000 es nivel 18', () => {
        tabla.agregarNivel(18, 160000)
        entrenador.experiencia = 160000
        expect(18).toBe(entrenador.calcularNivel())
    })

    it('Entrenador sin experiencia sube a nivel 2', () => {
        expect(1).toBe(entrenador.calcularNivel())
        entrenador.experiencia = 1000
        expect(2).toBe(entrenador.calcularNivel())
    })
    
    it('Entrenador se mueve al norte y su posicionY aumenta en 0.001', () => {        
        entrenador.moverNorte()
        expect('0.001').toBe(entrenador.posicionY)
    })    

    it('Entrenador se mueve al sur y su posicionY disminuye en 0.001', () => {        
        entrenador.moverSur()
        expect('-0.001').toBe(entrenador.posicionY)
    })
    
    it('Entrenador se mueve al este y su posicionX aumenta en 0.001', () => {        
        entrenador.moverEste()
        expect('0.001').toBe(entrenador.posicionX)
    })

    it('Entrenador se mueve al oeste y su posicionX disminuye en 0.001', () => {        
        entrenador.moverOeste()
        expect('-0.001').toBe(entrenador.posicionX)
    })    
})