// Bibliotecas externas
import { AntdRegistry } from '@ant-design/nextjs-registry';
import ResetCSS from './resetCSS'
import GlobalCSS from './globalCSS';
import StyledComponentsRegistry from '../lib/registry'
import NextAuthSessionProvider from '@/providers/sessionProvider';

// Metadados da página
export const metadata = {
  title: "Conectando Falcões",
  description: "Sistema para auxilio de gestão de ONGs, oficinas e estudantes."
};

// Esta página "RootLayout" é responsável por renderizar o layout padrão do sistema
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <NextAuthSessionProvider> <StyledComponentsRegistry> <AntdRegistry> <ResetCSS /> <GlobalCSS />{children} </AntdRegistry> </StyledComponentsRegistry> </NextAuthSessionProvider>
      </body>
    </html>
  )
}
