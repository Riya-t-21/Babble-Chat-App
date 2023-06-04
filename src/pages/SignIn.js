import { Alert, Button, Col, Container, Grid, Icon, Panel, Row } from 'rsuite'
import {auth , database} from '../misc/firebase';
import firebase from 'firebase/app';



const SignIn = () => {

  const signInWithProvider = async(provider)=>
  {   
    try{
    const { additionalUserInfo, user } =await auth.signInWithPopup(provider);
     
      if(additionalUserInfo.isNewUser)
      {
          await database.ref(`/profiles/${user.uid}`).set({
            name: user.displayName,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
           });
      }
     Alert.success('Signed in', 4000);
    }
    catch (err)
    {
      Alert.error(err.message, 4000);
    }
  };
   

     
  const onFacebooksignin =() =>{
    signInWithProvider( new firebase.auth.FacebookAuthProvider())
  };
  
  const onGooglesignin =() =>{
    signInWithProvider(new firebase.auth.GoogleAuthProvider())
  };

  return <Container>

     <Grid className='mt-page'>
       <Row>
         <Col xs={24} md={12} mdOffset={6}>
           
            <Panel>
                <div className='text-center'>
                  <h2>Welcome to Babble</h2>
                  <p>Progressive Chat Platform for Neophytes</p>
                </div>
              
             <div className='mt-3'>
              <Button block color='blue' onClick={onFacebooksignin}>
                <Icon icon='facebook' /> Continue with Facebook

              </Button>
              <Button block color='green' onClick={onGooglesignin}>
                <Icon icon='google' /> Continue with Google

              </Button>
             </div>

            </Panel>
        
         </Col>
       </Row>


     </Grid>



  </Container>
}

export default SignIn