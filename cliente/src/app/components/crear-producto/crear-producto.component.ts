import { NgIf, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Producto } from '../../models/producto';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf,
    UpperCasePipe

  ],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css'
})
export class CrearProductoComponent implements OnInit{
  productoForm : FormGroup;
  titulo = 'Crear producto'
  id: string | null

  constructor(private fb: FormBuilder,
          private router: Router,
          private toastr: ToastrService,
          private _productoService: ProductoService,
          private aRouter: ActivatedRoute 
          ){
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    });

    this.id =this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    
    this.esEditar()
  }

  agregarProducto() {
    //console.log(this.productoForm)
    // acceder al valor del producto
    //console.log(this.productoForm.get('producto')?.value)

    const PRODUCTO : Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    }

    if(this.id !== null) {
      // editamos producto
      this._productoService.editarProducto(this.id, PRODUCTO).subscribe({next: data =>{
        this.toastr.success('El producto fue actualizado con éxito!', 'Producto Actualizado!');
        this.router.navigate(['/'])
      },error: e => {console.error, this.productoForm.reset()}
    })
    }
    else{
    // agregamos
    console.log(PRODUCTO);
    this._productoService.guardarProducto(PRODUCTO).subscribe({ next: data => {
      this.toastr.success('El producto fue registrado con éxito!', 'Producto Registrado!');
      this.router.navigate(['/'])
      },error: e => {console.error, this.productoForm.reset()}
    })
    }
  }

  esEditar() {
    //Se cargan los datos del producto que se va a editar
   if(this.id !== null){
    this.titulo = 'Editar producto'
    this._productoService.obtenerProducto(this.id).subscribe({next: data => {
      this.productoForm.setValue({
        producto: data.nombre,
        categoria: data.categoria,
        ubicacion: data.ubicacion,
        precio: data.precio
      })
    }})
   }
  }
}
