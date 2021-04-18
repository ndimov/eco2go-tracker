import React from 'react'
import firebase from './firebase'
import getNamesMap from './namesMap';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'

class History extends React.Component {

    state = {
        rows: []
    }

    getTableRows() {
        var collectionRef = firebase.firestore().collection("log");
        // Technically should be done with a .then as well, but log fetching takes longer


        let rows = [];

        getNamesMap().then((namesMap) => {
            collectionRef.orderBy("timestamp", "desc").get().then((collection) => {
                collection.forEach(doc => {
                    const data = doc.data();
                    rows.push({
                        name: namesMap.get(data.studentID),
                        studentID: data.studentID,
                        quantity: data.quantity,
                        timestamp: data.timestamp.toDate()
                    });
                });
                this.setState({ rows: rows });
            });
        });
    }

    componentDidMount() {
        this.getTableRows();
    }

    render() {
        const tsFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const { rows } = this.state;
        return (
            < Table >
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Student ID</TableCell>
                        <TableCell>Boxes returned</TableCell>
                        <TableCell>Timestamp</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, idx) => (
                        <TableRow key={idx}>
                            <TableCell scope="row" component="th">{row.name}</TableCell>
                            <TableCell>{row.studentID}</TableCell>
                            <TableCell>{row.quantity}</TableCell>
                            <TableCell>{tsFormatter.format(row.timestamp)}</TableCell>
                        </TableRow>
                    ))
                    }
                </TableBody>
            </Table >
        );
    };
}

export default History