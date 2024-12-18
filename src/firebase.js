import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyD2gWMCJAVB4qwVA3j0z2Je51bGuPTBkBA",
  authDomain: "netflix-clone-9c900.firebaseapp.com",
  projectId: "netflix-clone-9c900",
  storageBucket: "netflix-clone-9c900.firebasestorage.app",
  messagingSenderId: "897987859706",
  appId: "1:897987859706:web:0c34aabfaedd0b30986543"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name,email,password)=>{
    try{
    const res =await createUserWithEmailAndPassword(auth,email,password)
    const user = res.user;
    await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider:'local',
        email,
    });
    }catch(error){
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}

const login = async (email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password)
    }
    catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
}

const logout =  ()=>{
    signOut(auth)
}

export {auth,db,login,signup,logout}