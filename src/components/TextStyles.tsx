import { type CSSProperties } from "react";
import type React from "react";

type RegularTextProps = {
    children: React.ReactNode,
    style: CSSProperties
}


const BoldText = ({children, style}: RegularTextProps)=>{
 return(
        <h1 style={style}>{children}</h1>
    )
}


const RegularText = ({children, style}: RegularTextProps)=>{
    return(
        <h2 style={style}>{children}</h2>
    )
}

export  {RegularText, BoldText};