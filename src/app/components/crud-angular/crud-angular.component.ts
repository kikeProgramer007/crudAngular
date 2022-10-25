import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crud-angular',
  templateUrl: './crud-angular.component.html',
  styleUrls: ['./crud-angular.component.css']
})
export class CrudAngularComponent implements OnInit {

  listTarjeta: any[] = [
    {titular: 'Juan Perez', numeroTarjeta:'223423424324', fechaExpiracion:'11/12', cvv:'118'},
    {titular: 'Miguel Fernandez', numeroTarjeta:'666242342342', fechaExpiracion:'04/10', cvv:'102'},
  ];

  form: FormGroup;

  //CREAR Y VALIDAR VARIABLES DE REQUEST
  constructor(private fb: FormBuilder, private toastr: ToastrService) { //permitir acceder a toastr
    this.form = this.fb.group({
      titular:['', Validators.required],
      numeroTarjeta: ['',[Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', Validators.required, Validators.maxLength(5),Validators.minLength(5)],
      cvv:['',[Validators.required, Validators.maxLength(3),Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
  }

  agregarTarjeta(){
    console.log(this.form);

    //Capturando valores ingresados desde el formulario
    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    }

    this.listTarjeta.push(tarjeta)//añadiendo registro
    // console.log(tarjeta);
    this.toastr.success('La tarjeta fue registrado con exito!', 'Tarjeta Registrada');
    this.form.reset();            //Linmpiar formulario
  }

  eliminarTarjeta(index: number){
    // console.log(index)
    this.listTarjeta.splice(index, 1);
    this.toastr.error('La tarjeta fue eliminada con exito!', 'Tarjeta Eliminada')
  }
}
