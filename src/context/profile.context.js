import { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from "../misc/firebase";

const ProfileContext = createContext();

export const ProfileProvider =({children})=>
{
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsloading] = useState(true);

    useEffect(() => {

        let userRef;
           
     const  authUnsub =  auth.onAuthStateChanged( authobj => {
            
            if(authobj){
                 userRef = database.ref(`/profiles/${authobj.uid}`);
                userRef.on('value', snap => {
                    
                    const {name , createdAt} = snap.val();
                    
                    const data ={
                        name,
                        createdAt,
                        uid: authobj.uid,
                        email: authobj.email,
                    }
                    setProfile(data);
                    setIsloading(false);
                });
                
            
                
            } else{
                    
                if(userRef)
                {
                    userRef.off();
                }



                    setProfile(null);
                    setIsloading(false);
            }
        });
       
        return () =>
        {
            authUnsub();

            if(userRef)
            {
                userRef.off()
            }
        }

    },[]);


    return (
    <ProfileContext.Provider value = {{ isLoading, profile } }>
        {children}
        </ProfileContext.Provider>
        );
};

export const useProfile =() => useContext(ProfileContext);