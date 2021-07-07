import React, { useEffect } from 'react'
import Button from './Button'
import './Item.css'
import AOS from 'aos';
import "aos/dist/aos.css";
const Item = ({title, desc, backgroundImg, leftBtnTxt, leftBtnLink, rightBtnTxt, rightBtnLink, twoButtons, first}) => {
    AOS.init();
    return (
        <div className='itemm' style={{
            backgroundImage: `url(${backgroundImg})`
        }}>
            <div className="item_container">
                <div className="item_text" data-aos="fade-in">
                    <p>{title}</p>
                    <div className="item_des">
                        <p>{desc}</p>
                    </div>
                </div> 
                <div className="item_lowerThird"> 
                    <div className="item_buttons">
                        <Button imp="primary" text={leftBtnTxt} link={leftBtnLink}/>
                        {twoButtons && (
                        <Button imp="secondary" text={rightBtnTxt} link={rightBtnLink}/>
                        )}
                    </div>
                    {first && (
                        <div className="item_expand">
                            </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Item