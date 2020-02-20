import { Injectable, NgZone} from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User, auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; //save Logged in user data;

  constructor(
    public afs:AngularFirestore,
    public afAuth:AngularFireAuth,
    public ngZone:NgZone,
    public router:Router
  ) { 
       /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user=>{
      if(user){
        this.userData=user;
        localStorage.setItem('user',JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      }else{
        
        localStorage.removeItem('user');
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  };
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email-address']);
    });
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const uData:any= {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    }
    return userRef.set(uData, {
      merge: true
    })
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }


  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

    // Auth logic to run auth providers
    AuthLogin(provider) {
      return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
         this.ngZone.run(() => {
            this.router.navigate(['dashboard']);
          })
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
    }


      // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

    // Reset Forggot password
    ForgotPassword(passwordResetEmail) {
      return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        return 'Password reset email sent, check your inbox.';
      }).catch((error) => {
        return error;
      })
    }
  

    // Sign out 
    SignOut() {
      return this.afAuth.auth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['sign-in']);
      })
    }

}
