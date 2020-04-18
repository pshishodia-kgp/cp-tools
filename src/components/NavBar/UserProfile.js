import React from 'react'; 
import {Form, Button, Image} from 'react-bootstrap'; 

export default class UserProfile extends React.Component{
    constructor(props){
        super(props); 
        this.cached = {
            // user : {
            //     titlePhoto : '//userpic.codeforces.com/660745/title/1c9bf68721a715f4.jpg'
            // },
            user : null, 
        }
        if(localStorage.getItem('user'))
            this.cached.user = JSON.parse(localStorage.getItem('user'));
        this.state = this.cached;
        this.usernameRef = React.createRef(); 
    }

    componentDidUpdate(prevState){
        if(prevState !== this.state){
            localStorage.setItem('user', JSON.stringify(this.state.user));
        }
    }

    login = async (event) => {
        event.preventDefault(); 
        let username = this.usernameRef.current.value; 
        let resp = await fetch(`https://codeforces.com/api/user.info?handles=${username}`); 
        let data = await resp.json(); 
        if(data.status === "OK"){
            this.setState({
                user : data.result[0],
            }); 
        }else console.log(`${username} doesn't exists on codeforces`); 
    }

    logout = () => {
        this.setState({
            user : null,
        })
    }

    profilePic = () => {
        return(
            <React.Fragment > 
                <Button style = {{'marginRight' : '10px'}}size = "sm" variant = "outline-primary" onClick = {this.logout}> Logout </Button> 
                <Image src = {`https:${this.state.user.titlePhoto}`} style = {{'height' : 'auto', 'width' :'40px'}} roundedCircle/>
            </React.Fragment>
        )
    }

    searchBar = () => {
        return(
            <Form inline style = {{'float' : 'right'}} onSubmit = {this.login}> 
                <Form.Control ref = {this.usernameRef} type="text" placeholder="cf username" className="mr-sm-2" /> 
                <Button type = "submit" size = "sm" variant="outline-primary">Login</Button>
            </Form>
        )
    }
    
    render(){
        let element; 
        if(this.state.user)element = this.profilePic; 
        else element = this.searchBar; 
        return(
            <React.Fragment> 
                {element()}
            </React.Fragment> 
        )
    }
}