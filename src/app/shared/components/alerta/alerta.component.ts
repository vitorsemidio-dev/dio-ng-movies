import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Alerta } from '../../model/alerta';
@Component({
  selector: 'dio-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss'],
})
export class AlertaComponent implements OnInit {
  alertaConfig: Alerta = {
    titulo: 'Sucesso!',
    descricao: 'Seu registro foi cadastrado com sucesso',
    btnSuccessText: 'Ok',
    btnCancelText: 'Cancelar',
    btnSuccessColor: 'accent',
    btnCancelColor: 'warn',
    possuiBtnFechar: false,
  };

  constructor(
    public dialogRef: MatDialogRef<AlertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.carregarValoresPadroes();
  }

  carregarValoresPadroes() {
    if (this.data) {
      this.alertaConfig.titulo = this.data.titulo || this.alertaConfig.titulo;
      this.alertaConfig.descricao =
        this.data.descricao || this.alertaConfig.descricao;
      this.alertaConfig.btnSuccessText =
        this.data.btnSuccessText || this.alertaConfig.btnSuccessText;
      this.alertaConfig.btnCancelText =
        this.data.btnCancelText || this.alertaConfig.btnCancelText;
      this.alertaConfig.btnSuccessColor =
        this.data.btnSuccessColor || this.alertaConfig.btnSuccessColor;
      this.alertaConfig.btnCancelColor =
        this.data.btnCancelColor || this.alertaConfig.btnCancelColor;
      this.alertaConfig.possuiBtnFechar =
        this.data.possuiBtnFechar || this.alertaConfig.possuiBtnFechar;
    }
  }
}
