import { Button } from 'antd';
import styled from 'styled-components';

const ButtonPrimary = styled(Button)`
  background: #1F5673 !important;
  border-color: #1F5673 !important;
  color: #ffffff !important;
  margin-right: 1rem;

  &:hover, &:focus {
    background: #ffffff !important; 
    border-color: #16455b !important;
    color: #16455b !important;
  }
`;

export default function ButtonPrimaryModal({ type, icon, handleClick, children }: { type?: any, icon?: any, handleClick?: any, children?: any }) {
  return (
    <ButtonPrimary htmlType={type} icon={icon} onClick={handleClick}>
      {children}
    </ButtonPrimary>
  );
}