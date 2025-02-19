import React from 'react';
import styled from 'styled-components';
import images from '@/assets';

/**
 * Styled container for responsive design.
 * This container sets the maximum width, margin, padding, and background styles.
 * The logo is positioned at the center-top of the container, wrapped by the top border line.
 * background-color: rgba(255, 255, 0, 0.2);
 * 
 * @styledq
 */

const Container = styled.div<{
    backgroundColor?: string
    width?: string;
    height?: string;
}>`
max-width: 100%;
width: ${(props) => props.width || '560px'};
height: ${(props) => props.height || 'auto'};
margin: 1% auto;
padding: 20px;
box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
background-color: ${(props) => props.backgroundColor || 'rgba(255, 255, 255, 0.2)'};
border-radius: 32px;
display: flex;
flex-direction: column;
align-items: center;
position: relative;
`;


/**
 * Styled container for the logo, with centered text and margin.
 * 
 * @styled
 */

const LogoContainer = styled.div`
width: 100%;
text-align: center;
margin-bottom: 30px;
`;

/**
 * Styled image for the logo with rounded corners.
 * 
 * @styled
 */

const LogoImage = styled.img`
position: absolute;
top: -40px;
left: 50%;
transform: translateX(-50%);
width: 80px;
height: 80px;
border-radius: 50%;
`;

/**
 * `AuthContainer` is a styled container component designed for authentication-related content.
 * It includes responsive design styles and a round logo image.
 *
 * @component
 * @example
 * // Example usage of AuthContainer
 * const MyComponent = () => (
 *   <AuthContainer>
 *     <p>Content goes here</p>
 *   </AuthContainer>
 * );
 *
 * @param {object} props - React props for the AuthContainer component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the container.
 * @returns {React.FC} Returns the AuthContainer component.
 */

interface AuthContainerProps {
    children: React.ReactNode;
    backgroundcolor?: string;
    width?: string;
    height?: string;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children, backgroundcolor, width, height }) => {
    return (
        <Container background-color={backgroundcolor} width={width} height={height}>
            <LogoContainer>
                <LogoImage src={images.nnpclogo} alt="NGML Logo" />
            </LogoContainer>
            {children}
        </Container>
    );
};

export default AuthContainer;
