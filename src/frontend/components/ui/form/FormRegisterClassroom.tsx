// Define o ambiente de execução como cliente
'use client'

// Componentes internos do projeto
import ButtonForm from '../button/buttonForm';
import CustomFormRegister from './CustomFormRegister';

// Bibliotecas externas
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, DatePicker, TimePicker, Row, Col } from 'antd';

// Variável para o componente Select do Ant Design
const { Option } = Select;

// Interface para tipar os itens de workshops
interface WorkshopItem {
  workshopid: number;
  ongid: number;
  ongname: string;
  name: string;
  description: string;
}

// Este é um componente de formulário para realizar cadastros de turmas
export default function FormRegister({ entity, url }: { entity: string, url: string }) {
  // Estado para armazenar os workshops disponíveis
  const [workshops, setWorkshops] = useState<any[]>([]);

  // Função para formatar a hora em um formato específico
  function formatTime(date: any) {
    return date.toISOString().split('T')[1].split('.')[0];
  }

  // Efeito para buscar os workshops assim que o componente é montado
  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/workshops`);
        if (!response.ok) {
          throw new Error('Erro ao buscar workshops');
        }
        // Tipagem dos dados recebidos com a interface WorkshopItem
        const data: WorkshopItem[] = await response.json();

        // Lógica para filtrar workshops duplicados
        const workshopsMap = new Map<number, WorkshopItem>();
        data.forEach((item) => {
          if (!workshopsMap.has(item.workshopid)) {
            workshopsMap.set(item.workshopid, item);
          }
        });

        // Atualização do estado com os workshops únicos
        const uniqueWorkshops = Array.from(workshopsMap.values());
        setWorkshops(uniqueWorkshops);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWorkshops();
  }, []);

  return (
    <CustomFormRegister
      name={`register${entity}`}
      onFinish={async (values: any) => {
        // Formatação dos horários de início e fim antes do envio
        const formattedValues = {
          ...values,
          startTime: formatTime(values.startTime),
          endTime: formatTime(values.endTime),
        };
        // Log dos valores do formulário ao submeter
        console.log("Valores do formulário ao enviar:", formattedValues);

        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_IP}/${url}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedValues),
          });

          if (!response.ok) {
            throw new Error(`Erro ao cadastrar ${entity}`);
          }

          // Log da resposta do backend
          const responseData = await response.json();
          console.log("Dados da resposta:", responseData);
        } catch (error) {
          console.error("Erro ao enviar formulário:", error);
        }
      }}
      layout={"vertical"}>
      <Row gutter={16}>
        <Col span={24}>
          {/* Item do formulário para selecionar a oficina */}
          <Form.Item
            name="idWorkshop"
            label="Oficina"
            rules={[{ required: true, message: 'Por favor, selecione um workshop' }]}
          >
            <Select placeholder="Selecione uma oficina">
              {workshops.map((workshop) => (
                <Option key={workshop.workshopid.toString()} value={workshop.workshopid}>
                  {workshop.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          {/* Item do formulário para o nome da turma */}
          <Form.Item
            name="name"
            label={"Nome da turma"}
            rules={[
              {
                required: true,
                message: `Por favor, insira o nome completo da ${entity}`
              }
            ]}
          >
            <Input placeholder={`Insira o nome completo da ${entity}`} />
          </Form.Item>
        </Col>
        <Col span={12}>
          {/* Item do formulário para selecionar o dia da semana */}
          <Form.Item
            name="day"
            label={"Dia"}
            rules={[
              {
                required: true,
                message: `Por favor, selecione um dia`
              }
            ]}
          >
            <Select placeholder={`Selecione o dia da ${entity}`}>
              <Option value="2">Segunda-Feira</Option>
              <Option value="3">Terça-Feira</Option>
              <Option value="4">Quarta-Feira</Option>
              <Option value="5">Quinta-Feira</Option>
              <Option value="6">Sexta-Feira</Option>
              <Option value="7">Sábado</Option>
              <Option value="1">Domingo</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        {/* Itens do formulário para selecionar os horários de início e fim */}
        <Col span={12}>
          <Form.Item
            name="startTime"
            label={"Horário de Início"}
            rules={[
              {
                required: true,
                message: `Por favor, selecione um horário`
              }
            ]}
          >
            <TimePicker style={{ width: '100%' }} minuteStep={15} format="HH:mm" placeholder={`Selecione o horário de início`} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="endTime"
            label={"Horário de Fim"}
            rules={[
              {
                required: true,
                message: `Por favor, selecione um horário`
              }
            ]}
          >
            <TimePicker style={{ width: '100%' }} minuteStep={15} format="HH:mm" placeholder={`Selecione o horário de fim`} />
          </Form.Item>
        </Col>
      </Row>
      <ButtonForm value={`Cadastrar ${entity}`} />
    </CustomFormRegister>

  );
}
