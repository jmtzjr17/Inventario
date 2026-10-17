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
        if(this.primero === null){
            return `No hay productos en el inventario`;
        }
        let encontrado = false;
        if (this.primero.siguiente === null && this.primero.codigo === codigo){
            this.primero = null;
            encontrado = true;
        } else if(nodo.codigo === codigo){
            this.primero = this.primero.siguiente;
            this.primero.anterior = null;
            encontrado = true;
        } else {
            while(nodo.siguiente !== null){
                if(nodo.siguiente.codigo === codigo){
                    if(nodo.siguiente.siguiente !== null){
                        nodo.siguiente = nodo.siguiente.siguiente;
                        nodo.siguiente.anterior = nodo;
                        encontrado = true;
                    } else {
                        nodo.siguiente.anterior = null;
                        nodo.siguiente = null;
                        encontrado = true;
                    }
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
        if(this.primero === null){
            return `No hay productos en el inventario`;
        }
        let texto = ``;
        while(nodo){
            texto += nodo.info();
            nodo = nodo.siguiente;
        }
        return texto;
    }

    listarInverso(){
        if(this.primero === null){
            return `No hay productos en el inventario`;
        }
        let texto = "";
        let auxiliar = this.primero;

        while (auxiliar !== null) {
            texto = auxiliar.info() + '\n' + texto;
            auxiliar = auxiliar.siguiente;
        }
        return texto;
    }

    extraerPrimerElemento(){
        if(this.primero === null){
            return `No hay productos en el inventario`;
        }
        let auxiliar = this.primero;
        if(this.primero.siguiente === null){
            this.primero = null;
        } else {
            this.primero = this.primero.siguiente;
            this.primero.anterior = null;
        }

        return `Se extrajo el primer elemento: ${auxiliar.nombre}`;
    }

    extraerUltimoElemento(){
        if(this.primero === null){
            return `No hay productos en el inventario`;
        }
        let nodo = this.primero;
        let auxiliar;

        if(this.primero.siguiente === null){
            auxiliar = this.primero;
            this.primero = null;
            return `Se extrajo el ultimo elemento ${auxiliar.nombre}`;
        }

        while(nodo){
            if(nodo.siguiente === null){
                auxiliar = nodo;
                nodo = nodo.anterior;
                nodo.siguiente.anterior = null;
                nodo.siguiente = null;
                break;
            }
            nodo = nodo.siguiente;
        }
        return `Se extrajo el ultimo elemento ${auxiliar.nombre}`;
    }

}
