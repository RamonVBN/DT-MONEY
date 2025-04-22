import styled from "styled-components";



export const PaginationContainer = styled.div`

    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 1.75rem;

    div {
        display: flex;
        gap: 1rem;

        span {
            display: flex;
            gap: 0.5rem;

        }   
        
    }
`

export const CaretContainer = styled.button`

    border: 0;
    background-color: transparent;
    cursor: pointer;
    box-shadow: 0 0 0 0px transparent;

    &:disabled{
        cursor: not-allowed;

        svg {
            color: ${props => props.theme["gray-500"]};
        }
    }

    svg {
            background-color: transparent;
            color: ${props=> props.theme["green-500"]};
        }

`