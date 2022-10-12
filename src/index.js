import {createRoot} from 'react-dom/client'
import Main from './components/main'

function App() {
    return (
        <Main/>
    )

};


createRoot(document.getElementById('root')).render(<App/>)
