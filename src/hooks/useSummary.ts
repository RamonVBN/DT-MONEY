
import { TransactionsContext } from "../contexts/TransactionsContext"
import { useContextSelector } from "use-context-selector"
import { useMemo } from "react"


export function useSummary(){

    const totalTransactions = useContextSelector(TransactionsContext, (context) => {
        return context.totalTransactions
    })

    const summary = useMemo(() => {
        return totalTransactions.reduce((acc, transaction) => {

            if (transaction.type === 'income') {
                acc.income += transaction.price
                acc.total += transaction.price
            }else{
                acc.outcome += transaction.price
                acc.total -= transaction.price
            }
    
            return acc
    
        }, {income: 0, outcome: 0, total: 0})
    
    

    }, [totalTransactions])

    return summary
}