import { Cargo } from "../entities/cargo";
import { v4 as uuid } from "uuid";
import CargoRepository from "../repositories/cargoRepository";

export class CargoService {

    public async inserirCargo(cargoPayload: any): Promise<Cargo> {
        const cargo: Cargo = {
            _id: uuid(),
            eleicaoId: cargoPayload.eleicaoId,
            nome: cargoPayload.nome,
            vagas: Number(cargoPayload.vagas)
        };

        await new CargoRepository().inserirCargo(cargo);

        return cargo;
    }

    public async atualizarCargo(id: string, cargoPayload: any): Promise<Cargo> {
        const cargoRepository = new CargoRepository();
        const cargo = await cargoRepository.obterCargoPorCodigo(id);
        cargo.nome = cargoPayload.nome;
        cargo.vagas = Number(cargoPayload.vagas);

        await cargoRepository.atualizarCargo(id, cargo);

        return cargo;
    }

    public listarCargos(eleicaoId: string): Promise<Cargo[]> {
        return new CargoRepository().listarCargos(eleicaoId);
    }

    public async excluirCargo(id: string) {
        await new CargoRepository().excluirCargo(id);
    }
}