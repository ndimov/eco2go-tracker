import React from 'react'
import firebase from './firebase'

class Leaderboard extends React.Component {

    render() {

        var docRef = firebase.firestore().collection("log");
        
        docRef.get().then((doc) => {
            console.log(doc);
        });

        return (
            <div>
                
            </div>
        )
    }
}

export default Leaderboard