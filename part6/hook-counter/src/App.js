
import Button from './Button'
import Display from './Display'
import { CounterContextProvider } from './CounterContext'




const App = () => {
  

  return (
      <div>
      <CounterContextProvider>

      <Display />
      <div>
        <Button type='INC' label='+' />
        <Button type='DEC' label='-' />
         <Button type='ZERO' label='0' />

      </div>
       
         
      </CounterContextProvider>



      </div>
       
     
       
       
    


    
      
    
      
    
  )
}

export default App