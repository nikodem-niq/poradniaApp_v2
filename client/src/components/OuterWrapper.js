import styled, { css } from 'styled-components';

export const OuterWrapper = styled.div`
    width: 100%-5rem;
    height: auto;
    margin-left: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    ${props => props.column && css`flex-direction: column;`}
    ${props => props.flexWrap && css`flex-wrap: wrap;`}
    ${props => props.spaceBetween && css`justify-content: space-between`}
`