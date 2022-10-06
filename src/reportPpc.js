import tanker from "./images/tanker.png"
import wheel from "./images/wheel.png"

import os1 from "./images/5.4.png"
import os2 from "./images/5.3.png"
import os3 from "./images/5.2.png"
import os4 from "./images/5.1.png"

import iconEnergy from "./images/battery.png"
import iconStop from "./images/stop.png"
import iconCompressor from "./images/compressor.png"

function ReportPpc(){
    return (
        <div className='reportPPC'>
            <img className='imgTanger' src={tanker} alt="no-image"/>

            <div className="battery">
                <img src={iconEnergy} alt="no-image"/>
                <p>13V</p>
            </div>

            <div className="сompressor">
                <img src={iconCompressor} alt="no-image"/>
                <p>13 бар</p>
            </div>

            <img className='iconStop' src={iconStop} alt="no-image"/>

            <img className='imgWheels' src={os1} alt="no-image"/>
            <div className='wheelInfoblock wheel1'><p>Колесо 1</p></div>
            <div className='osInfoBlock os1'></div>
            <div className='wheelInfoblock wheel2'><p>Колесо 2</p></div>

            <img className='imgWheels' src={os2} alt="no-image"/>
            <div className='wheelInfoblock wheel3'><p>Колесо 3</p></div>
            <div className='osInfoBlock os2'></div>
            <div className='wheelInfoblock wheel4'><p>Колесо 4</p></div>

            <img className='imgWheels' src={os3} alt="no-image"/>
            <div className='wheelInfoblock wheel5'><p>Колесо 5</p></div>
            <div className='osInfoBlock os3'></div>
            <div className='wheelInfoblock wheel6'><p>Колесо 6</p></div>

            <img className='imgWheels' src={os4} alt="no-image"/>
            <div className='wheelInfoblock wheel7'><p>Колесо 7</p></div>
            <div className='osInfoBlock os4'></div>
            <div className='wheelInfoblock wheel8'><p>Колесо 8</p></div>

        </div>
    )
}

export default ReportPpc;