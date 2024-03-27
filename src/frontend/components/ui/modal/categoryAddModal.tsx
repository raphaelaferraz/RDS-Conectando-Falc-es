// Componentes internos do projeto
import ButtonPrimaryModal from '../button/buttonPrimaryModal';
import ButtonSecundaryModal from '../button/buttonSecundaryModal';

// Bibliotecas externas
import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

// Este é um modal que permite a adição de uma nova categoria
export default function CategoryAddModal({ visible, onCreate, onCancel }: { visible: boolean, onCreate: any, onCancel: any }) {

  // Armazena o estado do formulário
  const [form] = Form.useForm();

  // Função para lidar com o envio do formulário
  const handleSubmit = () => {
    form.validateFields()
      .then(async (values) => {
        console.log(values);
        const url = `${process.env.NEXT_PUBLIC_BACKEND_IP}/categories`; 
  
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
  
          if (!response.ok) {
            throw new Error('Falha ao cadastrar categoria');
          }
          const newCategory = await response.json();
          console.log('Categoria cadastrada:', newCategory);
          onCreate(newCategory); 
          form.resetFields();
        } catch (error) {
          console.error('Erro ao cadastrar categoria:', error);
        }
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };
  

  return (
    <Modal
      visible={visible}
      title="Cadastrar Nova Categoria"
      onCancel={onCancel}
      footer={[
        <ButtonSecundaryModal key="back" handleClick={onCancel}>
          Cancelar
        </ButtonSecundaryModal>,
        <ButtonPrimaryModal key="submit" handleClick={handleSubmit}>
          Cadastrar
        </ButtonPrimaryModal>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item
          name="name"
          label="Nome da Categoria"
          rules={[{ required: true, message: 'Por favor, insira o nome da categoria!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="color"
          label="Cor da Categoria"
          rules={[{ required: true, message: 'Por favor, insira a cor da categoria!' }]}
        >
          <Input type="color" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
