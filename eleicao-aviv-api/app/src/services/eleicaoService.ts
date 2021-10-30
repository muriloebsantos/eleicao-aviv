import { Eleicao } from "../entities/eleicao";
import EleicaoRepository from "../repositories/eleicaoRepository";
import { ApiError } from "../util/api-error";

export default class EleicaoService {

    public async inserirEleicao(eleicaoPayload: any): Promise<Eleicao> {
        const eleicao: Eleicao = {
            _id: eleicaoPayload.codigo,
            nome: eleicaoPayload.nome,
            igrejaId: eleicaoPayload.igrejaId,
            dataInicio: null,
            dataFim: null
        };

        const eleicaoRepository = new EleicaoRepository();
        const eleicaoExistente = await eleicaoRepository.obterEleicaoPorCodigo(eleicao._id);

        if(eleicaoExistente) {
            throw new ApiError('Já existe eleição cadastrada com esse código', 409);
        }

        await eleicaoRepository.inserirEleicao(eleicao);

        return eleicao;
    }

    public async iniciarEleicao(id: string): Promise<Eleicao> {
        const eleicaoRepository = new EleicaoRepository();
        const eleicaoExistente = await eleicaoRepository.obterEleicaoPorCodigo(id);

        if(!eleicaoExistente) {
            throw new ApiError('Eleição não existe', 404);
        }

        if(eleicaoExistente.dataInicio){
            throw new ApiError('Eleição já iniciada', 422); 
        }

        eleicaoExistente.dataInicio = new Date();

        await eleicaoRepository.atualizarEleicao(eleicaoExistente);

        return eleicaoExistente;
    } 

    public obterEleicaoPorId(id: string): Promise<Eleicao> {
        return new EleicaoRepository().obterEleicaoPorCodigo(id);
    }
}