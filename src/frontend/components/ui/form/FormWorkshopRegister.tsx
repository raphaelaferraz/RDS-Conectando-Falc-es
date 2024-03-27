
// Componentes internos do projeto
import CustomFormRegister from "./CustomFormRegister";
import ButtonForm from "../button/buttonForm";
import CategoryRegisterModal from "../modal/categoryAddModal";

// Bibliotecas externas
import { Input, Form, Row, Col, Select } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

// Estilização
const ContainerButton = styled.div`
  .ant-form-item-control-input-content {
    margin-bottom: 0.5rem;
  }
`;

// Este é um componente de formulário para realizar cadastros de oficinas
export default function FormWorkshopRegister({ entity, url }: { entity: string, url: string }) {

  // Armazenamento do estado de categorias
  const [categoriesInfo, setCategoriesInfos] = useState<{ id: number; name: string; color?: string }[]>([]);

  // Atualização do estado de categorias
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/categories`);
        if (!response.ok) {
          throw new Error('Erro ao buscar categorias');
        }
        const responseData = await response.json();
        console.log(responseData);
        setCategoriesInfos(responseData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategories();
  }, []);

  // Monitora mudanças em categoriesInfo
  useEffect(() => {
    console.log('Categorias atualizadas:', categoriesInfo);
  }, [categoriesInfo]);

  // Dentro do componente FormWorkshopRegister
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreate = async (newCategory: { id: number; name: string; color?: string }) => {
    setIsModalVisible(false);
    console.log('Nova categoria adicionada:', newCategory);
    setCategoriesInfos(prevCategories => [...prevCategories, newCategory]);
  };

  const handleCategoryChange = (value: any) => {
    if (value === "new") {
      showModal();
    }
  };

  return (
    <CustomFormRegister name={`register${entity}`} onFinish={async (values: any) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/${url}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error(`Erro ao cadastrar ${entity}`);
        }

        const responseData = await response.json();
        console.log(responseData);
      } catch (error) {
        console.error(error);
      }
    }}
      layout={"vertical"}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label={"Nome da Oficina"}
            rules={[
              {
                required: true,
                message: `Por favor, insira o nome da ${entity}`
              }
            ]}
          >
            <Input placeholder={`Insira o nome da ${entity}`} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="categoryId"
            label={"Categria da Oficina"}
            rules={[
              {
                required: true,
                message: `Por favor, insira a categoria da ${entity}`
              }
            ]}
          >
            <Select placeholder={`Insira a categoria da ${entity}`} onSelect={handleCategoryChange}>
              {categoriesInfo.map((category: any) => (
                <Select.Option key={category.id} value={category.id || ""}>
                  {category.name}
                </Select.Option>
              ))}
              <Select.Option key="new" value="new" onClick={showModal}>Adicionar nova categoria</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="description"
        label={"Descrição da Oficina"}
        rules={[
          {
            required: false
          }
        ]}
      >
        <Input.TextArea placeholder={`Insira a descrição da ${entity}`} />
      </Form.Item>
      <ContainerButton>
        <ButtonForm value={`Cadastrar ${entity}`} />
      </ContainerButton>

      <CategoryRegisterModal
        visible={isModalVisible}
        onCreate={handleCreate}
        onCancel={handleCancel}
      />
    </CustomFormRegister>
  )
}