import styled from 'styled-components'

const ButtonEstilizado = styled.button`

    min-width: 8rem;
    min-height: 3rem;
    font-size: 1.1rem;  
    font-weight: 600;
    font-family: var(--Montserrat);
    padding: 0 2rem;
    color: ${props => props.$color ? props.$color : 'white'};
    background: ${props => props.$fondo ? props.$fondo : 'transparent'};
    border: ${props => props.$borde ? props.$borde : '2px solid white'};
    border-radius: 1rem;
    transition: all 0.2s ease-in-out;
    box-shadow: ${props => !props.$boxShadow ? props.$boxShadow :
        '0 0 5px #2271D1, 0 0 5px #2271D1, 0 0 5px #2271D1'}; 
    text-wrap: nowrap;
    cursor: pointer;

    &:hover {
        background: ${props => props.$hoverFondo || 'transparent'};
        box-shadow: ${props => !props.$boxShadow ? props.$boxShadow :
        '0 0 9px #2271D1, 0 0 9px #2271D1, 0 0 9px #2271D1'}; 
        transform: scale(1.02);
        transition: all 0.2s ease-in-out;
    }
`;

// eslint-disable-next-line react/prop-types
const Button = ({ children, fondo, borde, color, hoverFondo, boxShadow, type, onClick }) => {

    return (
        <ButtonEstilizado $fondo={fondo} $borde={borde} type={type} onClick={onClick}
            $color={color} $hoverFondo={hoverFondo} $boxShadow={boxShadow}>
            {children}
        </ButtonEstilizado>
    );
}

export default Button;