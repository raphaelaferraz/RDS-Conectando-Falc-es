// Bibliotecas externas 
import React from 'react';
import { Form, Input, Select, Button } from 'antd';

// Este componente é um formulário customizado para edição de dados
export default function FormEdit({ formData, setFormData, children, handleFormSubmit }: { formData: any, setFormData: any, children: any, handleFormSubmit: any }) {
  const formattedDateOfBirth = new Date(formData.dateofbirth).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  const updatedFormData = { ...formData, dateofbirth: formattedDateOfBirth };

  return (
    <>
      <Form initialValues={updatedFormData} layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item
          label="Nome Completo"
          name="name"
          rules={[
            {
              required: true,
              message: 'Por favor, insira o nome do estudante!'
            }
          ]}
        >
          <Input
            value={formData}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Nome do Estudante:" />
        </Form.Item>
        <Form.Item
          label="Data de Aniversário:"
          name="dateofbirth"
          rules={[
            {
              required: true,
              message: 'Por favor, insira a data de aniversário do estudante!'
            }
          ]}>
          <Input
            value={formData}
            onChange={(e) => setFormData({ ...formData, dateofbirth: e.target.value })}
            placeholder="DD/MM/AAAA" />
        </Form.Item>
        <Form.Item
          label="Gênero:"
          name="gender"
          rules={[
            {
              required: true,
              message: 'Por favor, insira o gênero do estudante!'
            }
          ]}
        >
          <Select
            value={formData.gender}
            onChange={(value) => setFormData({ ...formData, gender: value })}
            placeholder="Selecione o gênero do(a) aluno(a)">
            <Select.Option value="M">Feminino</Select.Option>
            <Select.Option value="F">Masculino</Select.Option>
            <Select.Option value="O">Outro</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="RG:"
          name="rg"
          rules={[
            {
              required: true,
              message: 'Por favor, insira o RG do estudante!'
            }
          ]}
        >
          <Input
            value={formData.rg}
            onChange={(e) => setFormData({ ...formData, rg: e.target.value })}
            placeholder="RG do Estudante:" />
        </Form.Item>

        <Form.Item
          label="CPF:"
          name="cpf"
          rules={[
            {
              required: true,
              message: 'Por favor, insira o CPF do estudante!'
            }
          ]}
        >
          <Input
            value={formData.cpf}
            onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
            placeholder="CPF do Estudante:" />
        </Form.Item>

        <Form.Item
          label="Estado Civil:"
          name="maritalstatus"
          rules={[
            {
              required: true,
              message: 'Por favor, insira o estado civil do(a) aluno(a)!'
            }
          ]}
        >
          <Select
            value={formData.maritalstatus}
            onChange={(value) => setFormData({ ...formData, maritalstatus: value })}
            placeholder="Selecione o estado civil do(a) aluno(a)">
            <Select.Option value="Solteiro">Solteiro(a)</Select.Option>
            <Select.Option value="Casado">Casado(a)</Select.Option>
            <Select.Option value="Divorciado">Divorciado(a)</Select.Option>
            <Select.Option value="Viúvo">Viúvo(a)</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Raça/Etnia:"
          name="raceethnicity"
          rules={[
            {
              required: true,
              message: 'Por favor, insira a raça/etnia do(a) aluno(a)!'
            }
          ]}
        >
          <Select
            value={formData.raceEthnicity}
            onChange={(value) => setFormData({ ...formData, raceethnicity: value })}
            placeholder="Selecione a raça/etnia do(a) aluno(a)">
            <Select.Option value='branco'>Branco(a)</Select.Option>
            <Select.Option value='preto'>Preto(a)</Select.Option>
            <Select.Option value='pardo'>Pardo(a)</Select.Option>
            <Select.Option value='amarelo'>Amarelo(a)</Select.Option>
            <Select.Option value='indigena'>Indígena</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Endereço:"
          name="address"
          rules={[
            {
              required: true,
              message: 'Por favor, insira o endereço do(a) aluno(a)!'
            }
          ]}
        >
          <Input
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Endereço do(a) aluno(a):" />
        </Form.Item>

        <Form.Item
          label="Estado:"
          name="state"
          rules={[
            {
              required: true,
              message: 'Por favor, insira o estado do(a) aluno(a)!'
            }
          ]}
        >
          <Select
            value={formData.state}
            onChange={(value) => setFormData({ ...formData, state: value })}
            placeholder="Selecione o estado do(a) aluno(a)">
            <Select.Option value='Acre'>Acre</Select.Option>
            <Select.Option value='Alagoas'>Alagoas</Select.Option>
            <Select.Option value='Amapá'>Amapá</Select.Option>
            <Select.Option value='Amazonas'>Amazonas</Select.Option>
            <Select.Option value='Bahia'>Bahia</Select.Option>
            <Select.Option value='Ceará'>Ceará</Select.Option>
            <Select.Option value='Distrito Federal'>Distrito Federal</Select.Option>
            <Select.Option value='Espírito Santo'>Espírito Santo</Select.Option>
            <Select.Option value='Goiás'>Goiás</Select.Option>
            <Select.Option value='Maranhão'>Maranhão</Select.Option>
            <Select.Option value='Mato Grosso'>Mato Grosso</Select.Option>
            <Select.Option value='Mato Grosso do Sul'>Mato Grosso do Sul</Select.Option>
            <Select.Option value='Minas Gerais'>Minas Gerais</Select.Option>
            <Select.Option value='Pará'>Pará</Select.Option>
            <Select.Option value='Paraíba'>Paraíba</Select.Option>
            <Select.Option value='Paraná'>Paraná</Select.Option>
            <Select.Option value='Pernambuco'>Pernambuco</Select.Option>
            <Select.Option value='Piauí'>Piauí</Select.Option>
            <Select.Option value='Rio de Janeiro'>Rio de Janeiro</Select.Option>
            <Select.Option value='Rio Grande do Norte'>Rio Grande do Norte</Select.Option>
            <Select.Option value='Rio Grande do Sul'>Rio Grande do Sul</Select.Option>
            <Select.Option value='Rondônia'>Rondônia</Select.Option>
            <Select.Option value='Roraima'>Roraima</Select.Option>
            <Select.Option value='Santa Catarina'>Santa Catarina</Select.Option>
            <Select.Option value='São Paulo'>São Paulo</Select.Option>
            <Select.Option value='Sergipe'>Sergipe</Select.Option>
            <Select.Option value='Tocantins'>Tocantins</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Cidade:"
          name="city"
          rules={[
            {
              required: true,
              message: 'Por favor, insira a cidade do(a) aluno(a)!'
            }
          ]}
        >
          <Input
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="Cidade do(a) aluno(a):" />
        </Form.Item>

        <Form.Item
          label="Telefone Fixo:"
          name="landline"
          rules={[
            {
              required: true,
              message: 'Por favor, insira o telefone do(a) aluno(a)!'
            }
          ]}
        >
          <Input
            value={formData.landline}
            onChange={(e) => setFormData({ ...formData, landline: e.target.value })}
            placeholder="Telefone do(a) aluno(a):" />
        </Form.Item>

        <Form.Item
          label="Celular:"
          name="phonenumber"
          rules={[
            {
              required: true,
              message: 'Por favor, insira o celular do(a) aluno(a)!'
            }
          ]}
        >
          <Input
            value={formData.phonenumber}
            onChange={(e) => setFormData({ ...formData, phonenumber: e.target.value })}
            placeholder="Celular do(a) aluno(a):" />
        </Form.Item>

        <Form.Item
          label="Email:"
          name="email"
          rules={[
            {
              required: true,
              message: 'Por favor, insira o email do(a) aluno(a)!'
            }
          ]}
        >
          <Input
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email do(a) aluno(a):" />
        </Form.Item>

        {children}
      </Form>
    </>
  );
}