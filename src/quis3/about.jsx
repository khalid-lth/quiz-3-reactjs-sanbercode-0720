import React, {Component} from 'react'
import './public/css/style.css'


let dataDiri = [
    {
        name: 'Luthfi Khalid',
        email: 'khd.work20@gmail.com',
        sistemOS: 'Windows 10',
        akunGitlab: 'khalid3275',
        akunTele: '@LuthfiKhalid'
    }
]

class Name extends Component{
    render(){
        return <><b>Nama</b>: { this.props.name }</>
    }
}

class Email extends Component {
    render() {
        return <><b>Email</b>: {this.props.email}</>
    }
}
class SistemOS extends Component {
    render() {
        return <><b>SistemOS yang digunakan = </b>: {this.props.sistemOS}</>
    }
}
class AkunGitlab extends Component {
    render() {
        return <><b>Akun Gitlab = </b>: {this.props.akunGitlab}</>
    }
}
class AkunTele extends Component {
    render() {
        return <><b>Akun Telegram = </b>: {this.props.akunTele}</>
    }
}

class Bio extends React.Component{
    render(){
        return(
            
            <body>
                <div class="container">
                    <h1>Data Peserta Sanbercode Bootcamp Reactjs</h1>
                    {dataDiri.map(el =>{
                        return(
                    <div className = "biodata">
                        <ol>
                            <li><Name name={el.name}/></li>
                            <li><Email email={el.email}/></li>
                            <li><SistemOS sistemOS={el.sistemOS}/></li>
                            <li><AkunGitlab akunGitlab={el.akunGitlab}/></li>
                            <li><AkunTele akunTele={el.akunTele}/></li>
                        </ol>
                    </div>
                        )
                    })}
                </div>
            </body>
        )
    }
}

export default Bio