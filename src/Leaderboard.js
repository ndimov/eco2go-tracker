import React from 'react'
import firebase from './firebase'

class Leaderboard extends React.Component {

    render() {

        var docRef = firebase.collection("log");
        
        docRef.get().then((doc) => {
            console.log(doc.data());
        });

        return (
            <div>
                
            </div>
        )
    }
}