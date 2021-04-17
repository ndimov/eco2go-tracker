import React from 'react'
import firebase from './firebase'

class Leaderboard extends React.Component {

    createTable = (ref) => {
        
    }

    render() {

        var collectionRef = firebase.firestore().collection("log");

        collectionRef.get().then((collection) => {
            collection.forEach(doc => {
                console.log(doc.data());
            })
        });

        return (
            <div>
                <table>
                    <tbody>

                    </tbody>
                </table>
            </div>
        )
    }
}

export default Leaderboard