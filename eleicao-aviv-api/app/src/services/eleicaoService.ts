import { Eleicao } from "../entities/eleicao";
import EleicaoRepository from "../repositories/eleicaoRepository";
import { ApiError } from "../util/api-error";

export default class EleicaoService {

    public async inserirEleicao(eleicaoPayload: any): Promise<Eleicao> {
        const eleicao: Eleicao = {
            _id: eleicaoPayload._id,
            nome: eleicaoPayload.nome,
            dataEleicao: new Date(eleicaoPayload.dataEleicao),
            quantidadeEleitores: (eleicaoPayload.quantidadeEleitores && Number(eleicaoPayload.quantidadeEleitores)) || null        
        };

        const eleicaoRepository = new EleicaoRepository();
        const eleicaoExistente = await eleicaoRepository.obterEleicaoPorCodigo(eleicao._id);

        if(eleicaoExistente) {
            throw new ApiError('Já existe eleição cadastrada com esse código', 409);
        }

        await eleicaoRepository.inserirEleicao(eleicao);

        return eleicao;
    }

    public async atualizarEleicao(id: string, eleicaoPayload: any): Promise<Eleicao> {
        const eleicao: Eleicao = {
            _id: id,
            nome: eleicaoPayload.nome,
            dataEleicao: new Date(eleicaoPayload.dataEleicao),
            quantidadeEleitores: (eleicaoPayload.quantidadeEleitores && Number(eleicaoPayload.quantidadeEleitores)) || null        
        };

        const eleicaoRepository = new EleicaoRepository();
        
        await eleicaoRepository.atualizarEleicao(id, eleicao);

        return eleicao;
    }

    public obterEleicaoPorId(id: string): Promise<Eleicao> {
        return new EleicaoRepository().obterEleicaoPorCodigo(id);
    }

    public listarEleicoes(): Promise<Eleicao[]> {
        return new EleicaoRepository().listarEleicoes();
    }
}