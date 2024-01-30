import './App.css'
import './style/home.scss'
import {useState} from "react";

function App() {
    const [inputValue, setInputValue] = useState("")
    const getResult = () => {
        if (inputValue === '') return
        fetch(`/api/start_tdl/${inputValue}`, {
            method: "POST", headers: {
                'Content-Type': 'application/json',
            },
        }).then(async res => {
            let data = await res.json()
            if (data?.code === 200) {
                fetch("/api/getNowMessage", {method: "POST"}).then(async result => {
                    console.log(await result.text())
                })
            }
        })
    }
    return (
        <>
            <div className={"container_home"}>
                <div className={"container_home_header"}>搜索框添入内容</div>
                <div className={"container_home_search"}>
                    <input className={"container_home_search_input"}
                           value={inputValue}
                           onChange={(event) => {
                               setInputValue(event.target.value)
                           }}
                           placeholder="请输入搜索内容"/>
                    <div className={"container_home_search_button"}
                         onClick={getResult}>搜索
                    </div>
                </div>
                <div className={"container_home_list"}></div>
            </div>
        </>
    )
}

export default App
