import styled from "styled-components";


type PageContainerProps = {
    $variant?: true | false
}

export const PageContainer = styled.button<PageContainerProps>`

    width: 40px;
    height: 40px;
    border-radius: 6px;
    background-color: ${props=> props.$variant? props => props.theme["green-700"] : props.theme["gray-600"] };
    box-shadow: 0 0 0 0px transparent;
    border: 0;
    outline: none;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    /* &:disabled {
        cursor: not-allowed;
        background-color: ${props => props.theme["gray-600"]};

        span {
        color: ${props => props.theme["gray-400"]};
    }
    } */

    span {
        font-size: 1rem;
        line-height: 140%;
        font-weight: bold;
        font-family: Roboto, sans-serif;
        color: ${props => props.$variant? props.theme.white: props.theme["gray-400"]};
    }

`