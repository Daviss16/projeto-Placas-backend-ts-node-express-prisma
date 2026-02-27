import { PrismaClient } from "@prisma/client"
import { PlacasRepository } from "../../../core/service/placas/placas";
import { Placas } from "../../../core/entities/placas";

export type PrismaProps = {
    prisma: PrismaClient;
}

export class PlacasRepositoryPrisma implements PlacasRepository {
    private constructor (readonly props: PrismaProps) {};

    public static build(props: PrismaProps) {
        return new PlacasRepositoryPrisma(props);
    }

    public async save(placa: Placas): Promise<void> {
        const data = {
            id: placa.id,
            placaCinza: placa.placaCinza,
            placaMercoS: placa.placaMercosul,
            estadoOrigem: placa.estado,
            regiao: placa.regiao
        }

        await this.props.prisma.placa.upsert({
            where: {id: placa.id},
            update: data,
            create: data,
        });
    }

    public async findPlaca(placaMercosul: string): Promise<Placas | null> {
        const aPlaca = await this.props.prisma.placa.findFirst({
            where: { placaMercoS: placaMercosul}
        });

        if (!aPlaca) return null;

        const { id, placaCinza,estadoOrigem,regiao } = aPlaca;

        const placa = Placas.with(id,placaCinza,placaMercosul,estadoOrigem,regiao);

        return placa;
    }

    public async listRegiao(regiao: string): Promise<Placas[]> {
        const aPlaca = await this.props.prisma.placa.findMany({
            where: {regiao: regiao}
        });

        const placas: Placas[] = aPlaca.map((p) => {
            const { id, placaCinza, placaMercoS, estadoOrigem, regiao } = p;
            return Placas.with(id, placaCinza, placaMercoS, estadoOrigem, regiao);
        })

        return placas;
    }


    public async searchLastFourDigits(lastFourDigits: string, estado: string): Promise<boolean> {
        const count = await this.props.prisma.placa.count({
            where: {
                estadoOrigem: estado,
                placaCinza: { endsWith: lastFourDigits}
            }
        });

        return count > 0; 
    }

    public async delete(placaMercosul: string): Promise<void> {
        const aPlaca = await this.props.prisma.placa.findFirst({
            where: { placaMercoS: placaMercosul }
        });

        if(!aPlaca) {
            throw new Error("A placa "+ placaMercosul +" não foi encontrada.");
        };

        await this.props.prisma.placa.delete({
            where: { id: aPlaca.id }
        })
    }

}