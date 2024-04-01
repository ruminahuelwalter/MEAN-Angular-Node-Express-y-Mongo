import { Component, OnInit } from '@angular/core';
import { RouterLink} from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { error } from 'console';
import { Producto } from '../../models/producto';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-productos',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, CurrencyPipe],
  templateUrl: './listar-productos.component.html',
  styleUrl: './listar-productos.component.css'
})
export class ListarProductosComponent implements OnInit {
  listProductos: Producto[]=[]
  constructor(private _productoService: ProductoService, private toastr:ToastrService){}
  
  ngOnInit(): void {
    this.obtenerProductos()
  }

  obtenerProductos() {
    this._productoService.getProductos().subscribe({ next: data =>  {
      console.log(data),
      this.listProductos = data}
      ,error: e => console.error})
    /*
     this._productoService.getProductos().subscribe( data => {
      console.log(data)
    }, error => {
       console.log(error)
    })
    */
  }

  eliminarProducto(id:any){
    this._productoService.eliminarProducto(id).subscribe({ next: data =>  {
      this.toastr.error('El producto fue eliminado con éxito', 'Eliminado')
      this.obtenerProductos()}
      ,error: e => console.error})
  }

}
