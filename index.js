import React from "react";
import ReactDOM from "react-dom";

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


const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
