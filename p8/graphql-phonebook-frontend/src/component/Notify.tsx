import styled from 'styled-components'

const Divas = styled.div`
  background: Skyblue;
  padding: 1em;
  margin-top: 1em;
  
`

const Diva = styled.div`
font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border: 2px solid black;
border-radius: 3px;

`
const Notify = ({errorMessage}) =>{
    if(!errorMessage){
        return null
    }

    return(
        <Diva >
            {errorMessage}
        </Diva>
    )
}
export default Notify