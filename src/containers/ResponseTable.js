import React, { useState, useEffect } from 'react';
import { Table, Button } from "react-bootstrap";
// import { useAuthentication } from "./Authentication";
// import CheckCircle from '../assets/images/icons/check_green_circle.svg'
// import CrossCircle from '../assets/images/icons/cross_red_circle.svg'
import JwtService from "@affinidi/common/dist/services/JwtService";


function parseTokenTyp(token) {
    try {
        const { payload } = JwtService.fromJWT(token);
  
        return payload.typ;
    } catch (err) {
        return undefined;
    }
  }


const ResponseTable = ({ResponseToken}) => {
    const [messageList, setMessageList] = useState([]);
    const [vcData, setVCData] = useState([]);
    const [
        credentialShareResponseToken,
        setCredentialShareResponseToken,
      ] = useState([]);

      useEffect(() => {
        if (ResponseToken) {
          setCredentialShareResponseToken(prevState => [...prevState, ResponseToken]);
        }
      }, [ResponseToken]);


    // useEffect(() => {

    //    const getMessages = async () => {
    //     const messageService = window.messageService

    //     const messages = await messageService.getAll();
    //     if (!Array.isArray(messages) || messages.length <= 0) {
    //         return;
    //     }

    //     console.table(messages)
    //         messages.map((msg) => ({
    //                 ...msg,
    //                 createdAt: new Date(msg.createdAt),
    //                 typ: parseTokenTyp(msg.message.token),
    //                 token: msg.message.token
    //             }))
    //             .filter(({typ, token}) => token && (typ === 'credentialResponse') )
    //             .sort(({ createdAt: a }, { createdAt: b }) => b - a)
    //             .map(({token}) => onValidate(token))
    //    }

    //    getMessages()


    // }, []);

    useEffect(() => {
        const onValidate = async (token) => {
          const result = await window.sdk.verifyCredentialShareResponseToken(token);
          console.log('result: ', result);
          const credentialType = result.suppliedCredentials[0].type[(result.suppliedCredentials[0].type.length)-1]
            
          setVCData(prevState => [...prevState, {token, validatedResult: result}])
        }
        if (credentialShareResponseToken) {
          credentialShareResponseToken.map((token) => {
            // Check if the vcData already has the token = means it was validated before
            const existingData = vcData.filter(data => data.token == token)
            if (existingData.length == 0){
              return onValidate(token);
            }
          })
        }
      }, [credentialShareResponseToken])


    return <div>
        <Table bordered>
              <thead className="thead-light">
                <tr>
                  <th>Index</th>
                  <th>Name</th>
                  <th>Is Valid</th>
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {vcData.map((data, index) => {
                  return (
                    <tr>
                    <td scope="row">{index+1}</td>
                    <td>{data.validatedResult.suppliedCredentials[0].credentialSubject.data.givenName}</td>
                    <td>{data.validatedResult.isValid? 'True':'False'}</td>
                    {/* <td>{data.validatedResult.isValid ? <img src={CheckCircle} alt='check' style={{height: '28px'}} /> : 
                        <img src={CrossCircle} alt='cross' style={{height: '28px'}} />
                    }
                    </td> */}
                    {/* <td><Button onClick={() => onClickValidate(data.token)}>Validate</Button></td> */}
                  </tr>
                  )
                })}
              </tbody>
            </Table>
    </div>
}
export default ResponseTable;