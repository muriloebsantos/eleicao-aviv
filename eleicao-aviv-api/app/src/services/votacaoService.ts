import { Voto } from "../entities/voto";
import { v4 as uuid } from "uuid";
import EleicaoRepository from "../repositories/eleicaoRepository";
import CargoRepository from "../repositories/cargoRepository";
import { ApiError } from "../util/api-error";
import { CargoCandidatoRepository } from "../repositories/cargoCandidatoRepository";
import VotacaoRepository from "../repositories/votacaoRepository";

export default class VotacaoService {

    public async registrarVoto(votoPayload: any) : Promise<Voto> {

        const voto: Voto = {
            _id: uuid(),
            eleicaoId: votoPayload.eleicaoId,
            cargoId: votoPayload.cargoId,
            candidatoId: votoPayload.candidatoId,
            dataInclusao: new Date()
        };

        const cargo = await new CargoRepository().obterCargoPorCodigo(voto.cargoId);

        if(!cargo) {
            throw new ApiError('Não é possível registrar o voto: cargo não encontrado', 422);
        }

        if(!cargo.dataInicioVotacao) {
            throw new ApiError('Não é possível registrar o voto: votação não iniciada', 422);
        }

        if(cargo.dataFimVotacao) {
            throw new ApiError('Não é possível registrar o voto: votação encerrada', 422);
        }

        const candidatos = await new CargoCandidatoRepository().obterCandidatosPorCargo(voto.cargoId);
        const candidato = candidatos.find(c => c.candidatoId == voto.candidatoId);

        if(!candidato) {
            throw new ApiError('Não é possível registrar o voto: candidato não encontrado', 422);
        }

        if(candidato.eleitoEmOutroCargo) {
            throw new ApiError('Não é possível registrar o voto: candidato eleito em outro cargo', 422);
        }

        const eleicao = await new EleicaoRepository().obterEleicaoPorCodigo(voto.eleicaoId);
        const votoRepository = new VotacaoRepository();
        const qtdeVotos = await votoRepository.obterQuantidadeVotos(voto.cargoId);

        if(!eleicao.quantidadeEleitores || qtdeVotos < eleicao.quantidadeEleitores) {
            await votoRepository.inserirVoto(voto);
        } else {
            throw new ApiError('Não é possível registrar o voto: limite de votos atingido', 422);
        }
        
        return voto;
    }
}