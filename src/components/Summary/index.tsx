import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryCard, SummaryContainer } from "./styles";
import { useSummary } from "../../hooks/useSummary";
import { priceFormatter } from "../../utils/formatter";



export function Summary(){

    const summary = useSummary()
  
    return (
        <SummaryContainer>
            <SummaryCard $isTotal={false}  >
                <header>
                    <span>Entradas</span>
                    <ArrowCircleUp size={32} color="#00b37e"/>
                </header>

                <strong>{priceFormatter.format(summary.income)}</strong>
            </SummaryCard>

            <SummaryCard $isTotal={false} >
                <header>
                    <span>Saídas</span>
                    <ArrowCircleDown size={32} color="#f75a68"/>
                </header>

                <strong>{priceFormatter.format(summary.outcome)}</strong>
            </SummaryCard>

            <SummaryCard $isNegative={summary.income < summary.outcome} $isTotal={true}>
                <header>
                    <span>Total</span>
                    <CurrencyDollar size={32} color="#fff"/>
                </header>

                <strong>
                    { priceFormatter.format(summary.total) }
                </strong>
            </SummaryCard>
        </SummaryContainer>
    )
}