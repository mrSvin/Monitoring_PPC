import React from "react";
import { createRoot } from 'react-dom/client'

import YandexMap from "./yandex-map.js";
import TablePpc from './tablePpc.js'

import "./styles.css";

const App = () => {
    return (
        <div className='main-app'>
            <div className='pagePpc'>
                <YandexMap/>
                <TablePpc/>
            </div>
        </div>
    );
};


createRoot(document.getElementById('root')).render(<App/>)