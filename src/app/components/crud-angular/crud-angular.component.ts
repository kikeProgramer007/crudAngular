import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-crud-angular',
  templateUrl: './crud-angular.component.html',
  styleUrls: ['./crud-angular.component.css']
})
export class CrudAngularComponent implements OnInit {

  listTarjeta: any[] = [];
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;
  // listTarjeta: any[] = [
  //   {titular: 'Juan Perez', numeroTarjeta:'223423424324', fechaExpiracion:'11/12', cvv:'118'},
  //   {titular: 'Miguel Fernandez', numeroTarjeta:'666242342342', fechaExpiracion:'04/10', cvv:'102'},
  // ];


  //CREAR Y VALIDAR VARIABLES DE REQUEST
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,            //permitir acceder a toastr
    private _tarjetaService: TarjetaService   //api
  ) { 
    this.form = this.fb.group({
      titular:['', Validators.required],
      numeroTarjeta: ['',[Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', Validators.required, Validators.maxLength(5),Validators.minLength(5)],
      cvv:['',[Validators.required, Validators.maxLength(3),Validators.minLength(3)]]
    })
  }

  //iniciar componente
  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas(){
    this._tarjetaService.getListTarjetas().subscribe(data => {
      //  console.log(data);
      this.listTarjeta = data;
    }, error => {
        console.log(error);
      }
    )
  }

  guardarTarjeta(){
    // console.log(this.form);
    //Capturando valores ingresados desde el formulario
    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    }
    if (this.id == undefined) {
      //Agregamos una nueva tarjeta
      this._tarjetaService.saveTarjeta(tarjeta).subscribe(data =>{
        this.toastr.success('La tarjeta fue registrado con exito!', 'Tarjeta Registrada');
        this.obtenerTarjetas();
        this.form.reset();            //Linmpiar formulario
      }, error => {
        this.toastr.error('Oops... ocurrio un error.', 'Error!');
        console.log(error);
      })
    }else{
      //Editar tarjeta
        tarjeta.id = this.id;
        this._tarjetaService.updateTarjeta(this.id, tarjeta).subscribe(data =>{
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.toastr.info('La tarjeta fue actualizada con exito!','Tarjeta actualizada');
        this.obtenerTarjetas();
      },error =>{
        console.log(error);
      })
    }



    //this.listTarjeta.push(tarjeta)//añadiendo registro
    // console.log(tarjeta);
  }

  eliminarTarjeta(id: number){
    // console.log(index)
    // this.listTarjeta.splice(index, 1);
      this._tarjetaService.deleteTarjeta(id).subscribe(data =>{
      this.toastr.error('La tarjeta fue eliminada con exito!', 'Tarjeta Eliminada');
      this.obtenerTarjetas();
    }, error => {
      console.log(error);
    })
  }

  editarTarjeta(tarjeta: any){
   //  console.log(tarjeta); Ver registro

    this.accion = 'Editar';
    this.id = tarjeta.id;

    // this.form.patchValue({
    //   titular: tarjeta.titular,
    //   numeroTarjeta: tarjeta.numeroTarjeta,
    //   cvv: tarjeta.cvv,
    //   fechaExpiracion: tarjeta.fechaExpiracion,
    // })

    this.form.setValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      cvv: tarjeta.cvv,
      fechaExpiracion: tarjeta.fechaExpiracion,
    });

  }


}
