import { CargoCandidato } from "../entities/cargo-candidato";
import { CargoCandidatoRepository } from "../repositories/cargoCandidatoRepository";
import { v4 as uuid } from "uuid";
import { ApiError } from "../util/api-error";
import CargoRepository from "../repositories/cargoRepository";

export default class CargoCandidatoService {

    public obterCandidatosPorCargo(cargoId: string) : Promise<CargoCandidato[]> {
        return new CargoCandidatoRepository().obterCandidatosPorCargo(cargoId);
    }

    public excluirCargoCandidato(id: string)  {
        return new CargoCandidatoRepository().excluirCargoCandidato(id);
    }

    public async inserirCargoCandidato(cargoId: string, cargoCandidatoPayload: any): Promise<CargoCandidato[]> {
        const novosCargoCandidatos: CargoCandidato[] = [];
        const cargoCandidtoRepository = new CargoCandidatoRepository();
        const cargosCandidatosExistentes = await cargoCandidtoRepository.obterCandidatosPorCargo(cargoId);

        for(let candidatoId of cargoCandidatoPayload) {

            if(cargosCandidatosExistentes.find(c => c.candidatoId == candidatoId))
                continue;

            const cargoCandidato: CargoCandidato = {
                _id: uuid(),
                cargoId,
                candidatoId,
                votos: 0
            };

            novosCargoCandidatos.push(cargoCandidato);
        }

        if(novosCargoCandidatos.length > 0)
            await cargoCandidtoRepository.inserirCargoCandidatos(novosCargoCandidatos);

        return novosCargoCandidatos;
    }

    public async aceitarCargo(cargoId: string, candidatoId: string) {
        const cargoRepository = new CargoRepository();
        const cargoCandidatoRepository = new CargoCandidatoRepository();
        const cargo = await cargoRepository.obterCargoPorCodigo(cargoId);
        const cargoCandidatos = await cargoCandidatoRepository.obterCandidatosPorCargo(cargoId);
        const qtdeCandidatosEleitos = cargoCandidatos.filter(c => c.eleitoNesseCargo).length;

        if(qtdeCandidatosEleitos == cargo.vagas) {
            throw new ApiError('Limite de candidatos eleitos atingido', 422);
        }
        
        const cargoCandidato = await cargoCandidatoRepository.obterCargoCandidato(cargoId, candidatoId);
        cargoCandidato.eleitoNesseCargo = true;
        await cargoCandidatoRepository.atualizarCargoCandidato(cargoCandidato);

        const cargosRepository = new CargoRepository();
        const outrosCargos = await cargosRepository.listarCargos(cargo.eleicaoId);

        for(let outroCargo of outrosCargos.filter(c => c._id != cargoId)) {
            const candidatosOutroCargo = await cargoCandidatoRepository.obterCandidatosPorCargo(outroCargo._id);
            const outroCargoCandidatoEleito = candidatosOutroCargo.find(c => c.candidatoId == candidatoId);

            if(outroCargoCandidatoEleito) {
                outroCargoCandidatoEleito.eleitoEmOutroCargo = true;
                await cargoCandidatoRepository.atualizarCargoCandidato(outroCargoCandidatoEleito);
            }
        }
    }
}