import { QTDE_MAX_PARCELAS, TAXA_JUROS_MENSAL } from "../constants";
import Parcelamento from "./Parcelamento";

export default class CalcularParcelamento {
    excutar(
        valor:number,
        qtdeParcelas:number = QTDE_MAX_PARCELAS, 
        taxaJuros:number = TAXA_JUROS_MENSAL
     ): Parcelamento {
        if(qtdeParcelas < 2 || qtdeParcelas > QTDE_MAX_PARCELAS) {
            throw new Error('Quantidade de parcelas deve ser entre 2 e 12');
        }
        const totalComJuros = this.calcularTotalComJuros(valor, taxaJuros, qtdeParcelas, );

        return {
            valorTotal: this.comDuasCasasDecimais(totalComJuros),
            valorParcela: this.comDuasCasasDecimais(totalComJuros / qtdeParcelas),
            qtdeParcelas,
            taxaJuros,
        };
        }
        private calcularTotalComJuros(valorTotal:number, taxaMensal:number, qtdeParcelas:number): number {
            return valorTotal * Math.pow(1 + taxaMensal, qtdeParcelas);
        }
        private comDuasCasasDecimais(valor:number): number {
            return Math.round(valor * 100) / 100;   
        }
}