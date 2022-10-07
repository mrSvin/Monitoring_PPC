import tanker from "./images/tanker.png"
import wheel from "./images/wheel.png"

import os1 from "./images/5.4.png"
import os2 from "./images/5.3.png"
import os3 from "./images/5.2.png"
import os4 from "./images/5.1.png"

import iconEnergy from "./images/battery.png"
import iconStop from "./images/stop.png"
import iconCompressor from "./images/compressor.png"

import iconSpeed from "./images/speed.png"


function ReportPpc({info}){


    return (
        <div className='reportPPC'>
            <img className='imgTanger' src={tanker} alt="no-image"/>
            {(info.undef !== true)?
                <PpcData info = {info}/>
                : console.log('Пустой', info)
            }
        </div>
    )
}

export default ReportPpc;

function PpcData({info}){

    console.log('Напряжение', info.lmsg.p.pwr_ext)
    console.log('Давление в пневмосистеме', info.lmsg.p.can_r6)
    console.log('Тормоз', (info.lmsg.p.can_r1 == '220')? 'нажат': 'отпущен')
    console.log('Подъемная ось', (info.lmsg.p.can_r2 == '252')? 'опущена': 'поднята', info.lmsg.p.can_r2)

    console.log('Скорость', info.pos.s)

    console.log('Нагрузка на оси', info.lmsg.p.user_d0, info.lmsg.p.user_d1, info.lmsg.p.user_d2, info.lmsg.p.user_d3)
    console.log('Давление в колесах',
        info.lmsg.p.can32bitr6, info.lmsg.p.can32bitr7, info.lmsg.p.can32bitr12, info.lmsg.p.can32bitr13,
        info.lmsg.p.user_d4, info.lmsg.p.user_d5, info.lmsg.p.user_d6, info.lmsg.p.user_d7)
    console.log('////////////////')

    let wheels = [info.lmsg.p.can32bitr6, info.lmsg.p.can32bitr7, info.lmsg.p.can32bitr12, info.lmsg.p.can32bitr13,
        info.lmsg.p.user_d4, info.lmsg.p.user_d5, info.lmsg.p.user_d6, info.lmsg.p.user_d7]
    wheels = wheels.sort((a,b)=>b-a).filter((e => e != 0))

    let osi =[info.lmsg.p.user_d0, info.lmsg.p.user_d1, info.lmsg.p.user_d2, info.lmsg.p.user_d3]
    osi = osi.sort((a,b)=>b-a).slice(0, wheels.length/2)

    let osImg = [os1,os2,os3,os4]

    console.log('Сортировочка', osi, wheels)

    return (
        <div>
            <div className="battery">
                <img src={iconEnergy} alt="no-image"/>
                <p>{info.lmsg.p.pwr_ext}V</p>
            </div>

            <div className="сompressor">
                <img src={iconCompressor} alt="no-image"/>
                <p>{info.lmsg.p.can_r6} Б</p>
            </div>

            <div className="speed">
                <img src={iconSpeed} alt="no-image"/>
                <p>{info.pos.s}км/ч</p>
            </div>

            {(info.lmsg.p.can_r1 == '220')? <img className='iconStop' src={iconStop} alt="no-image"/> : null}

            {osi.map((e,i)=>{

                let up = ''
                let upOs = ''
                if(i>1 && info.lmsg.p.can_r2 !== 252) {
                    up = 'up'
                    upOs = 'upOs'
                }

                return (
                    <div key={i}>
                        <img className={`imgWheels ${up}`} src={osImg[i]} alt="no-image"/>
                        <div className={`wheelInfoblock wheel${i*2+1}`}><p>{wheels[i*2]} Б</p></div>
                        <div className={`osInfoBlock os${i+1} ${upOs}`}>
                            <p>{e}</p>
                        </div>
                        <div className={`wheelInfoblock wheel${i*2+2}`}><p>{wheels[i*2+1]} Б</p></div>
                    </div>
                )
            })}
        </div>
    )
}

