import styled from 'styled-components'
import logoimgurl from '../../statics/images/fisheeplogo.png'


export const HeaderStyle = {
  background: '#fff',
  height: '40px',
  lineHeight: '40px',
  fontWeight: 700,
  color: '#ADADAD',
  textDecoration: 'underline'
}

export const ContentStyle = {
  margin: '24px 16px 0'
}

export const FooterStyle = {
  textAlign: 'center'
}

export const LogoImg = styled.img.attrs({
  src: logoimgurl
})`
  width: 80px;
  height: auto;
  border-radius: 3px;
`