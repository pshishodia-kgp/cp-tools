import React from 'react'; 
import {Form, Button, Container, Row, Col} from 'react-bootstrap'; 

export default function Testing(){
    return(
        <Container> 
        <Row> 
            <Col xs = "12" sm = "6"> 
                <Form  >
                    <Form.Group> 
                        <Form.Label> Users </Form.Label>
                        <React.Fragment>  
                            <Form.Control type = "text"  placeholder = "Space separated user-names" />
                            <ul> 
                                <li className = "user-suggestions">ThelethalCode</li>
                                <li className = "user-suggestions">ThelethalCode</li>
                                <li className = "user-suggestions">ThelethalCode</li>
                            </ul>
                        </React.Fragment> 
                        <Form.Text className = "text-danger">pshishod2645 is an invalid user :| </Form.Text>
                    </Form.Group>

                    <Form.Group> 
                        <Form.Label> Tags </Form.Label>
                        <React.Fragment> 
                            <div> 
                                <span  className = "_selectedTags"> 
                                    <span> hello</span>
                                    <span value = 'hello' >&#10007;  </span>  
                                </span> 
                                <span>&nbsp;&nbsp;</span> 

                                <span  className = "_selectedTags"> 
                                    <span> hello</span>
                                    <span value = 'hello' >&#10007;  </span>  
                                </span> 
                                <span>&nbsp;&nbsp;</span> 

                                <span  className = "_selectedTags"> 
                                    <span> hello</span>
                                    <span value = 'hello' >&#10007;  </span>  
                                </span> 
                                <span>&nbsp;&nbsp;</span> 
                            </div> 
                            <select className = "form-rounded">
                                <option value=""></option>
                                <option value="educational" title="educational">educational</option>
                                <option value="div1" title="div1">div1</option>
                                <option value="div2" title="div2">div2</option>
                                <option value="div3" title="div3">div3</option>
                                <option value="combined" title="combined">combined</option>
                                <option value="2-sat" title="2-satisfiability">2-sat</option>
                            </select>
                    </React.Fragment>  
                    </Form.Group>

                    <Form.Group> 
                        <Form.Label> Base Round </Form.Label>
                        <Form.Control type = "number" name = "baseRound" placeholder = "Base Round in numbers" />  
                    </Form.Group>

                    <Form.Group>
                        <Form.Label> Difficulty </Form.Label>  
                        <Form.Control style = {{'width' : '40%', 'margin-right' : '10px'}} type = "number" name = "lowerDiff"/>
                        <Form.Text> - </Form.Text>
                        <Form.Control style = {{'width' : '40%', 'margin-left' : '10px'}} type = "number" name = "upperDiff" /> 
                    </Form.Group>
                    
                    <Button variant = "outline-primary" type = "submit"> Filter Problems !</Button>
                    </Form>
            </Col> 
        </Row> 

        <Row> 
            <Col xs = "12" sm = "12" lg = "12">  </Col> 
        </Row> 
    </Container> 
    )
}