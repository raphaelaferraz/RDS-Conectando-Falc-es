// Define o ambiente de execução como cliente
'use client'

// Componentes internos do projeto
import PassaroSVG from "@/public/svg/conectandoFalBird"
import LoginGoogle from '@/components/login/form/googleLogin'

// Bibliotecas externas
import React from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import styled from 'styled-components';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Estilização
const DivLogin = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% / 3);
  align-items: center;
  justify-content: center;
  padding-left: 16px;
  padding-right: 16px;
`;

const DivLogo = styled.div`
  /* - */
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

const FormLogin = styled(Form)`
  width: 70%;
  height: 50%;
  justify-content: center;
`;

const ItemForm = styled(Form.Item)`
  width: 100%;
  min-height: 10%;
`;

const InputForm = styled(Input)`
  width: 100%;
  min-height: 3vw;
`;

const CheckboxLembrar = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #1F5673; 
    border-color: #1F5673;
  }
`;

const DivRegister = styled.div`
  width: 100%;
  height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;

const ButtonLogin = styled(Button)`
  &&& {
    width: 50%;
    background-color: #1F5673;
  }
`;

// Este componente é responsável por realizar a autenticação do usuário, utilizando o email e senha
export default function App() {

  // Armanezamento do estado do roteamento
  const router = useRouter()

  // Função assíncrona que realiza a autenticação do usuário
  async function onFinish_(values:any) {
    
    // Chamada da função de autenticação do usuário
    const result = await signIn('credentials', {
      'email': values['email'],
      'password': values['password'],
      'remember': values['remember'],
      redirect: false
    });

    // Verificação de erro
    if (result?.error){
      console.log(result)
      return
    }

    // Redirecionamento para a página inicial
    router.replace('/');
  };

  return (
    <DivLogin>
      <DivLogo>
        <PassaroSVG />
      </DivLogo>
      <FormLogin
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish_}
      >
        <ItemForm
          name="email"
          rules={[{ required: true, message: 'Insira seu Email!' }]}
        >
          <InputForm prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
        </ItemForm>
        <ItemForm
          name="password"
          rules={[{ required: true, message: 'Insira sua Senha!' }]}
        >
          <InputForm
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Senha"
          />
        </ItemForm>
        <a className="login-form-forgot" href="">
          Esqueceu sua senha
        </a>
        <ItemForm>
          <ItemForm name="remember" valuePropName="checked" noStyle>
            <CheckboxLembrar>lembre de mim</CheckboxLembrar>
          </ItemForm>

        </ItemForm>

        <ItemForm>
          <DivRegister>
            <ButtonLogin type="primary" htmlType="submit" className="login-form-button">
              Login
            </ButtonLogin>
            ou

            <LoginGoogle />
          </DivRegister>
        </ItemForm>
      </FormLogin>
    </DivLogin>
  );
};