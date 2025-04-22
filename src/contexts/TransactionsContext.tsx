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
    handleNextPage: () => void
    handlePrevPage: () => void
    handleSelectPage: (page: number) => void
    page: number
    totalTransactions: Transaction[]
    
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({children}: {children: ReactNode}){

    const [transactions, setTransactions] = useState<Transaction[]>([])

    const [totalTransactions, setTotalTransactions] = useState<Transaction[]>([])
    
    const [page, setPage] = useState(1)
    
    function handleNextPage(){
        setPage((prevState) => prevState + 1 )
    }

    function handlePrevPage(){
        setPage((prevState) => prevState - 1 )
    }

    function handleSelectPage(page: number){
        setPage(page)
    }
    
    const fetchTotalTransactions = useCallback( async () => {

        const response = await api.get('/transactions')
      
          setTotalTransactions(response.data)
      }, [])

    const fetchTransactions = useCallback(async(query?: string) => {

        const response = await api.get('/transactions', {
          params: {
            _page: page,
            _limit: 6,
            _sort: 'createdAt',
            _order: 'desc',
            q: query
          }
        })
      
          setTransactions(response.data)
      }, [page])

    const createNewTransaction = useCallback(async (data: CreateNewTransaction ) => {

        await api.post('/transactions', {
            ...data,
            createdAt: new Date()
        } )

        fetchTotalTransactions()
        fetchTransactions()
    }, [])
    
    useEffect(() => {

    fetchTransactions()
    }, [page])

    useEffect(() => {
    
        fetchTotalTransactions()
    }, [])

    return (
        <TransactionsContext.Provider value={{transactions, fetchTransactions,createNewTransaction, handleNextPage, handlePrevPage, page, totalTransactions, handleSelectPage}}>
            {children}
        </TransactionsContext.Provider>
    )
}