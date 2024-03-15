// Define o ambiente de execução como cliente
'use client'

// Bibliotecas externas
import React from "react";
import styled from "styled-components"
import Image from "next/image";

// Estilização
const DivImage = styled.div`
    width: calc(200% / 3);
    max-height: 100vh;
    display: flex;

`;

const ImageFavela = styled(Image)`
    width: 100%;
    height: 100vh;
    position: relative;
    object-fit: fill;
    mask-image: linear-gradient(to right, black 80%, #000000f7 85%, #000000e4 89%, #000000c1 92%, #0000009c 95%, transparent);
`;

// Este componente é responsável por renderizar a imagem de fundo da página de login de forma aleatória
export default function divImagem(){

    // Armazena um número aleatório entre 1 e 6 
    const numberOfImageFavela = Math.floor((Math.random() * (6 - 1)) + 1);
    
    return(
        <DivImage>
            <ImageFavela src={`/favelaImages/favela${numberOfImageFavela}.webp`} alt="Imagem de Favela(Dall-E)" width={1000} height={1000} priority/>
        </DivImage>
    );
}