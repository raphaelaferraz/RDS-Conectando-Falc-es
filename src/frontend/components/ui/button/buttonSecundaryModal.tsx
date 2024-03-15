import { Button } from 'antd';
import styled from 'styled-components';

const ButtonSecundary = styled(Button)`
  &:hover, &:focus {
    background: #ffffff !important; 
    border-color: #16455b !important;
    color: #16455b !important;
  } 
`;

export default function ButtonSecundaryModal({ htmlType, icon, handleClick, children }: { htmlType?: any, icon?: any, handleClick?: any, children?: any }) {
  return (
    <ButtonSecundary htmlType={htmlType} icon={icon} onClick={handleClick}>
      {children}
    </ButtonSecundary>
  );
}