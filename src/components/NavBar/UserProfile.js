import React from 'react'; 
import {Form, Button, Image} from 'react-bootstrap'; 

export default class UserProfile extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            user : {
                titlePhoto : '//userpic.codeforces.com/660745/title/1c9bf68721a715f4.jpg'
            },
            // user : null, 
        }
        this.usernameRef = React.createRef(); 
    }

    login = async () => {
        let username = this.usernameRef.current.value; 
        console.log('username is : ', username); 
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
        console.log('profilePicUrl : ', this.state.user, 'url : ', this.state.user.titlePhoto);
        return(
            <React.Fragment> 
                <Image src = {`https:${this.state.user.titlePhoto}`} style = {{'height' : 'auto', 'width' :'50px', 'float' : 'right',}} roundedCircle/>
                <Button variant = "outline-primary" onClick = {this.logout}> Logout </Button> 
            </React.Fragment>
        )
    }

    searchBar = () => {
        return(
            <React.Fragment> 
                <Form.Control ref = {this.usernameRef} type="text" placeholder="Cf username" className="mr-sm-2" /> 
                <Button variant="outline-primary" onClick = {this.login}>Login</Button>
            </React.Fragment>
        )
    }
    
    render(){
        let element; 
        if(this.state.user)element = this.profilePic; 
        else element = this.searchBar; 
        console.log('element : ', element); 
        return(
            <Form inline style = {{'float' : 'right'}}> 
                {element()}
            </Form> 
        )
    }
}