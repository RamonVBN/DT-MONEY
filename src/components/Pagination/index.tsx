import { CaretLeft, CaretRight } from "phosphor-react";
import { Page } from "./components/Page";
import { CaretContainer, PaginationContainer } from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";


export function Pagination(){

    const handleNextPage = useContextSelector(TransactionsContext, (context) => {

        return context.handleNextPage
    })

    const handlePrevPage = useContextSelector(TransactionsContext, (context) => {

        return context.handlePrevPage
    })

    const totalTransactions = useContextSelector(TransactionsContext, (context) => {

        return context.totalTransactions
    })

    const page = useContextSelector(TransactionsContext, (context) => {

        return context.page
    })

    const totalPages = Math.ceil(totalTransactions.length/6)
  
    const isButtonDisabled = page === totalPages

    Math.max

    return <PaginationContainer>
        <div>

        <CaretContainer disabled={page === 1} onClick={handlePrevPage}>
            <CaretLeft weight="bold" size={24}/>
        </CaretContainer>

            <span>
            {Array.from({ length: totalPages }).map((_, index) => (
            <Page pageNumber={index + 1} key={index} />))}
            </span>

        <CaretContainer disabled={isButtonDisabled} onClick={handleNextPage}>
            <CaretRight weight="bold" size={24}/>
        </CaretContainer>
        

        </div>
    </PaginationContainer>
}