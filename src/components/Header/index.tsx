import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import * as Dialog from "@radix-ui/react-dialog";
import logoImg from '../../assets/Logo.png'
import { NewTransactionModal } from "../NewTransactionModal";
import { useState } from "react";

export function Header(){

    const [open, setOpen] = useState(false)

    function handleCloseModal(){
        setOpen(false)
    }


    return <HeaderContainer>
        <HeaderContent>
            <img src={logoImg} alt="" />


            <Dialog.Root open={open}>

            <Dialog.DialogTrigger asChild>
            <NewTransactionButton onClick={() => setOpen(true)}>Nova Transação</NewTransactionButton>
            </Dialog.DialogTrigger>
            
            <NewTransactionModal handleCloseModal={handleCloseModal}/>

            </Dialog.Root>

        </HeaderContent>
    </HeaderContainer>
}