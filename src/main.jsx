import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'  //tells react this is where my app starts , render here    //new rendering API- replaces reactDom.render
import './index.css'         //global CSS file 
import App from './App.jsx'     //imports main app component i.e parent component where app UI starts 

//react takes control of this DOM node and attaches virtual DOM
createRoot(document.getElementById('root')).render(      //finds the <div id="root"></div> in your index.html
  //enforce extra checks in dev mode
  <StrictMode>                      
    <App />                   
  </StrictMode>,
)
