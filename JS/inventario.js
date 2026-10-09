export class Inventario {
    constructor(){
        this.primero = null;
    }

    //----------------- Extras -------------------------------
    agregarse(nuevoP,nodo){
        if(nodo.siguiente === null){
            nodo.siguiente = nuevoP;
        } else {
            this.agregarse(nuevoP,nodo.siguiente);
        }
    }
    // ----------------------------------------------------------

    agregarProducto(producto){
        if(this.primero === null){
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

    agregarProductoPosicion(producto,posicion,nodo){
        let i = 2;
        if(posicion === 1){
            this.primero = producto;
            this.primero.siguiente = nodo;
        } else {
            while(nodo){
                if(i === posicion){
                    producto.siguiente = nodo.siguiente;
                    nodo.siguiente = producto;
                    break;
                } else{
                    nodo = nodo.siguiente;
                    i++;
                }
            }
        }
        return `Se ha agregado ${producto.nombre} en la posicion ${posicion}`;
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

    agregarProductoInicio(producto){
        producto.siguiente = this.primero;
        this.primero = producto;
        return `Se ha agregado al inicio el producto ${producto.nombre}`;
    }
}
