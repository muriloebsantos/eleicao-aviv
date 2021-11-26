import { Component, OnInit } from '@angular/core';
import { Eleicao } from 'src/app/@core/models/eleicao.model';
import { Cargo } from 'src/app/@core/models/cargo.model';
import { CargoService } from 'src/app/@core/services/cargo.service';
import { EleicaoService } from 'src/app/@core/services/eleicao.service';
import { CargoCandidato } from 'src/app/@core/models/cargo-candidato.model';
import { forkJoin, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-impressao-eleicao',
  templateUrl: './impressao-eleicao.component.html',
  styleUrls: ['./impressao-eleicao.component.scss']
})
export class ImpressaoEleicaoComponent implements OnInit {

  constructor(private eleicaoService: EleicaoService,
              private cargoService: CargoService,
              private route: ActivatedRoute
    ) { }

  public eleicaoId: string = "";
  public eleicao?: Eleicao;
  public cargos: Cargo[] = [];
  public cargosCandidatos: CargoCandidato[] = [];

  ngOnInit() {
    this.route.params.subscribe({
      next: params => {
          this.eleicaoId = params.id;
          this.carregarDados();
      }
    });
  }

  carregarDados() {
    const getEleicaoObservable = this.eleicaoService.obterEleicaoPorCodigo(this.eleicaoId);
    const getCargosObservable = this.cargoService.listarCargos(this.eleicaoId);  

    forkJoin([getEleicaoObservable, getCargosObservable]).subscribe({
      next: result => {
        this.eleicao = result[0];
        this.cargos = result[1];
        
        const cargosCandidatosObservable: Observable<CargoCandidato[]>[] = [];

        this.cargos.forEach(cargo => {
          cargosCandidatosObservable.push(this.cargoService.listarCandidatosDoCargo(cargo._id));
        });

        forkJoin(cargosCandidatosObservable).subscribe({
          next: resultCargos => {
            resultCargos.forEach(resultCargo => {
              resultCargo.forEach(cargo => this.cargosCandidatos.push(cargo));
            });
          }
        });
      }
    });
  }

  filterCandidatos(cargoId: string) {
    return this.cargosCandidatos.filter(c => c.cargoId == cargoId);
  }
}
