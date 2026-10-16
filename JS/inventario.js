export class Inventario {
    constructor(){
        this.primero = null;
    }

    //----------------- Extras -------------------------------
    agregarse(nuevoP,nodo){
        if (nodo.siguiente === null) {
            nodo.siguiente = nuevoP;
            nodo.siguiente.anterior = nodo;
        } else if (nuevoP.codigo < nodo.siguiente.codigo && nuevoP.codigo > nodo.codigo) {
            nuevoP.siguiente = nodo.siguiente;
            nuevoP.anterior = nodo;
            nodo.siguiente = nuevoP;
            nuevoP.siguiente.anterior = nuevoP;
        } else {
            this.agregarse(nuevoP,nodo.siguiente);
        }
    }   

    existeProducto(codigo) {
    let nodo = this.primero;
    while (nodo !== null) {
        if (nodo.codigo === codigo) {
            return true; 
        }
        nodo = nodo.siguiente; 
    }
        return false; 
    }
    // ------------------------------------------------------

    agregarProducto(producto){
        if (this.existeProducto(producto.codigo)) {
            return `Error: El código ${producto.codigo} ya existe.`;
        }
        if (this.primero === null){
            this.primero = producto;
        } else if (producto.codigo < this.primero.codigo) {
            producto.siguiente = this.primero;
            this.primero.anterior = producto;
            this.primero = producto;
        } else {
            this.agregarse(producto,this.primero);
        }
        return `Se ha agregado el producto ${producto.nombre}`;
    }

    buscarPorCodigo(codigo,nodo){
        let encontrado = false;
            if(nodo.codigo === codigo){
                encontrado = true;
            } else {
                while(nodo.siguiente !== null){
                    if(nodo.siguiente.codigo === codigo){
                        encontrado = true;
                        break;
                    } else {
                        nodo = nodo.siguiente;
                    }
                }
            }
        return encontrado;
    }

    eliminarPorCodigo(codigo,nodo){
        let encontrado = false;
        if(nodo.codigo === codigo){
            this.primero = this.primero.siguiente;
            encontrado = true;
        } else {
            while(nodo.siguiente !== null){
                if(nodo.siguiente.codigo === codigo){
                    nodo.siguiente = nodo.siguiente.siguiente;
                    encontrado = true;
                    break;
                } else {
                    nodo = nodo.siguiente;
                }
            }
        }
        
        if(encontrado){
            return `Producto con el codigo: ${codigo} ha sido eliminado`;
        } else {
            return `No se encontro ningun producto con el codigo ${codigo}`;
        }
    }


    listar(nodo){
        let texto = ``;
        while(nodo){
            texto += nodo.info();
            nodo = nodo.siguiente;
        }
        return texto;
    }

    listarInverso(){
        let texto = "";
        let auxiliar = this.primero;

        while (auxiliar !== null) {
            texto = auxiliar.info() + '\n' + texto;
            auxiliar = auxiliar.siguiente;
        }
        return texto;
    }

    extraerPrimerElemento(){
        let auxiliar = this.primero;
        this.primero = this.primero.siguiente;
        return `Se extrajo el producto ${auxiliar.nombre}`;
    }

    extraerUltimoElemento(){
        let auxiliar = this.primero;
        this.primero = this.primero.siguiente;
        return `Se extrajo el producto ${auxiliar.nombre}`;
    }

}
