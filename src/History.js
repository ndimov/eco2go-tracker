import React from 'react'
import firebase from './firebase'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'

class History extends React.Component {

    getTableRows() {
        var collectionRef = firebase.firestore().collection("log");
        var usersRef = firebase.firestore().collection("users");

        var namesMap = new Map(); // Map of student id -> names
        usersRef.get().then((collection) => {
            collection.forEach(doc => {
                const data = doc.data();
                namesMap.set(data.studentID, data.name);
            })
        })

        let rows = [];

        collectionRef.get().then((collection) => {
            let id = 0;
            collection.forEach(doc => {
                const data = doc.data();
                rows.push({
                    name: namesMap.get(data.studentID),
                    studentID: data.studentID,
                    quantity: data.quantity,
                    timestamp: data.timestamp
                });
            });
        });

        return rows;
    }

    render() {
        console.log(this.getTableRows());
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Student ID</TableCell>
                        <TableCell>Boxes returned</TableCell>
                        <TableCell>Timestamp</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.getTableRows().map(row => (
                        <TableRow>
                            <TableCell scope="row" component="th">{row.name}</TableCell>
                            <TableCell>{row.studentID}</TableCell>
                            <TableCell>{row.quantity}</TableCell>
                            <TableCell>{row.timestamp}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table >
        );
    };
}

export default History