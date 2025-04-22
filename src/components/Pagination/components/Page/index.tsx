import { useContextSelector } from "use-context-selector";
import { PageContainer } from "./styles";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";

type PageProps = {
    pageNumber: number
}

export function Page({pageNumber}: PageProps){

    const handleSelectPage = useContextSelector(TransactionsContext , (context) => {
        return context.handleSelectPage
    })

    const page = useContextSelector(TransactionsContext , (context) => {
        return context.page
    })

    const isButtonSelected = pageNumber === page

    return <PageContainer disabled={isButtonSelected} $variant={isButtonSelected}  onClick={() => handleSelectPage(pageNumber)}>
        <span>{pageNumber}</span>
    </PageContainer>

}