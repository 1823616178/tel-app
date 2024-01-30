import './App.css'
import './style/home.scss'
import {useEffect, useState} from "react";
import Loading from "react-loading";

export const App = () => {
    const [inputValue, setInputValue] = useState("")
    const [resultList, setResultList] = useState([])
    const [disableButton, setDisableButton] = useState(false);
    const [loading, setLoading] = useState(false)

    const getResult = () => {
        if (!disableButton) {
            if (inputValue === '') return
            fetch(`/api/start_tdl/${inputValue}`, {
                method: "POST", headers: {
                    'Content-Type': 'application/json',
                },
            }).then(async res => {
                let data = await res.json()
                if (data?.code === 200) {
                    setLoading(true)
                    setTimeout(async () => {
                        await getMessage()
                    }, 5000)
                }
            })
            delayClickButton()
        } else {
            alert("不行了不行了，歇5秒")
        }
    }

    /**
     * 获取消息
     */
    const getMessage = async () => {
        fetch("/api/getNowMessage", {method: "POST"}).then(async result => {
            let e = await result.json()
            if (e?.data !== '') {
                if (e?.data.length===0){
                    alert("有时候抽风再试一试，如果还是没有就是没有咯")
                }
                setResultList(e?.data)
            } else {
                alert("有时候抽风再试一试，还是没有就是没有咯")
            }
        }).finally(() => {
            setLoading(false)
        })
    }
    /**
     * 定时五秒
     */
    const delayClickButton = () => {
        setDisableButton(true)
        setTimeout(() => {
            setDisableButton(false);
        }, 5000); // 180000毫秒等于三分钟
    }

    const onClickToPath = (path) => {
        window.open(path, "_blank")
    }
    return (
        <>
            <div className={"container_home"}>
                <div className={"container_home_header"}>交流学习之用，请勿用于盗版</div>
                <div className={"container_home_search"}>
                    <input className={"container_home_search_input"}
                           value={inputValue}
                           onChange={(event) => {
                               setInputValue(event.target.value)
                           }}
                           placeholder="请输入搜索内容"/>
                    <div className={"container_home_search_button"}
                         style={disableButton ? {backgroundColor: "#615f5f"} : {backgroundColor: "#7c7fe8"}}
                         onClick={getResult}>搜索
                    </div>
                </div>
                <div className={"container_home_list"}>
                    {loading ? <Loading className={"container_home_list_loading"} type={"spin"}
                                        color={"#7c7fe8"}></Loading> : resultList.map((res, index) => {
                        return <div key={index} className={"container_home_list_li"}
                                    onClick={() => onClickToPath(res)}
                                    style={res.length > 0 ? {width: "100%"} : {width: 0}}>
                            {res.toString().trim()}
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

