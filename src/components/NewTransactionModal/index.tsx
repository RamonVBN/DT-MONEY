import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";

import {z} from 'zod'
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";


const newTransactionSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome'])
})

type NewTransactionFormInputs = z.infer<typeof newTransactionSchema>

type NewTransactionModalProps = {
    handleCloseModal: () => void
}

export function NewTransactionModal({handleCloseModal}: NewTransactionModalProps){


    const createNewTransaction = useContextSelector(TransactionsContext, (context) => {
        return context.createNewTransaction
    })

    const {register, handleSubmit, formState: {isSubmitting}, control, reset} = useForm({resolver: zodResolver(newTransactionSchema),
    defaultValues: {
        type: 'income'
    }
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs){

        await createNewTransaction(data)
        handleCloseModal()
        reset()
    }

return (
        <Dialog.DialogPortal>
                <Overlay/>

                <Content >
                    <Dialog.Title>Nova transação</Dialog.Title>
                    <Dialog.DialogDescription></Dialog.DialogDescription>
                    <CloseButton onClick={handleCloseModal}  >
                        <X size={24}/>
                    </CloseButton>

                    <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                        <input
                        type="text" 
                        placeholder="Descrição"
                        required 
                        {...register('description')}
                        />

                        <input
                        type="number" 
                        placeholder="Preço" 
                        required
                        {...register('price', {valueAsNumber: true})}
                        />

                        <input
                        type="text" 
                        placeholder="Categoria"
                        required 
                        {...register('category')}
                        />

                       <Controller
                       control={control}
                       name="type"
                       render={({field}) => {
                        return (
                            <TransactionType
                            onValueChange={field.onChange}
                            value={field.value}>
                            <TransactionTypeButton value="income" variant="income">
                                Entrada
                                <ArrowCircleUp size={24}/>
                            </TransactionTypeButton>

                            <TransactionTypeButton value="outcome" variant="outcome">
                                Saída
                                <ArrowCircleDown size={24} />
                            </TransactionTypeButton>

                        </TransactionType>
                        )
                       }}

                       />

                        <button disabled={isSubmitting} type="submit">Cadastrar</button>
                    </form>

                    
                </Content>
            </Dialog.DialogPortal>
)
    
}