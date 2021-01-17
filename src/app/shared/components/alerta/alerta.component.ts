import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dio-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss'],
})
export class AlertaComponent implements OnInit {
  titulo = 'Sucesso!';
  descricao = 'Seu registro foi cadastrado com sucesso';
  btnSuccessText = 'Ok';
  btnCancelText = 'Cancelar';
  btnSuccessColor = 'primary';
  possuiBtnFechar = false;

  constructor(
    public dialogRef: MatDialogRef<AlertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.carregarValoresPadroes();
  }

  carregarValoresPadroes() {
    if (this.data) {
      this.titulo = this.data.titulo || this.titulo;
      this.descricao = this.data.descricao || this.descricao;
      this.btnSuccessText = this.data.btnSuccessText || this.btnSuccessText;
      this.btnCancelText = this.data.btnCancelText || this.btnCancelText;
      this.btnSuccessColor = this.data.btnSuccessColor || this.btnSuccessColor;
      this.possuiBtnFechar = this.data.possuiBtnFechar || this.possuiBtnFechar;
    }
  }
}
