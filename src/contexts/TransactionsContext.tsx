import { ReactNode, useCallback, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

type Transaction = {
    id: number
    description: string
    type: string
    category: string
    price: number
    createdAt: string
}

type CreateNewTransaction = {
    description: string
    price: number
    category: string
    type: 'income' | 'outcome'
}

interface TransactionContextType {
    transactions: Transaction[],
    fetchTransactions: (query?: string) => Promise<void>
    createNewTransaction: (data: CreateNewTransaction ) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({children}: {children: ReactNode}){

    const [transactions, setTransactions] = useState<Transaction[]>([])
    
    const fetchTransactions = useCallback(async(query?: string) => {
    
        const response = await api.get('/transactions', {
          params: {
              _sort: 'createdAt',
              _order: 'desc',
              q: query
          }
        })
      
          setTransactions(response.data)
      }, [])

    const createNewTransaction = useCallback(async (data: CreateNewTransaction ) => {

        const response = await api.post('/transactions', {
            ...data,
            createdAt: new Date()
        } )

        setTransactions((prevState) => [response.data, ...prevState])

    }, [])
    
    useEffect(() => {
    
    fetchTransactions()
    }, [])
    

    return (
        <TransactionsContext.Provider value={{transactions, fetchTransactions,createNewTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}