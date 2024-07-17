import { useState } from "react";
import { data } from "./data";
import "./style.css"

// single selection
export default function Accordian (){

    const [selected,setSelected] = useState(null)
    const [enableMultiSelection,setEnableMultiSelection] =useState( false)
    const [multiple,setMultiple] = useState([])

    let handleSingleSelection = (getCurrentId)=>{
        setSelected(getCurrentId === selected ? null : getCurrentId)
    }

    let handleMultiSelection = (getCurrentId)=>{
        let copyMultiple = [...multiple]
        const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId)
        if(findIndexOfCurrentId === -1) copyMultiple.push(getCurrentId)
        else copyMultiple.splice(findIndexOfCurrentId,1)
        setMultiple(copyMultiple);
    }
    return <div className="wrapper">
        <button onClick={()=>setEnableMultiSelection(!enableMultiSelection)} style={{
                    backgroundColor: enableMultiSelection ? 'green' : 'red',
                    color: 'white'
                }}>Enable Multi Selection</button>
        <div className="accordian">
            {
                data  && data.length > 0 ?
                data.map(dataItem => <div className="item">
                    <div onClick={
                        enableMultiSelection
                        ? ()=>handleMultiSelection (dataItem.id)
                        : ()=>handleSingleSelection(dataItem.id)
                        } className="title">
                        <h3>{dataItem.question}</h3>
                        <span>+</span>
                    </div>
                    {
                        selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1 ?
                        <div className="content">{dataItem.answer} </div>
                        : null
                    }
                </div>)
                : <div>Data Not Found</div>
            }

        </div>
    </div>
}
