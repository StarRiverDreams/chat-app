import React from 'react'
import onlineIcon from '../../icons/onlineIcon.png'
import closeIcon from '../../icons/closeIcon.png'

import './InfoBar.css'

const InfoBar=({room})=>{
    return(
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="onlineIcon" src={onlineIcon} alt=""></img>
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/"><img alt="" src={closeIcon}/></a>
            </div>
        </div>
    )
}
export default InfoBar