// Componentes internos do projeto
import PassaroSVG from "@/public/svg/conectandoFalBird"

// Este é um componente padrão para a tela de loading
export default function LoadingPassaro() {
    return (
            <div style={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <PassaroSVG />
            </div>
    );
}