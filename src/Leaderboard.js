import React from 'react'
import firebase from './firebase'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'

class Leaderboard extends React.Component {

    state = {
        rows: []
    }

    getTableRows() {
        var leaderboardRef = firebase.firestore().collection("leaderboard");

        let rows = [];
        let rank = 1;

        leaderboardRef.orderBy("quantity", "desc").get().then((collection) => {
            collection.forEach(doc => {
                const data = doc.data();
                rows.push({
                    rank: rank,
                    name: data.name,
                    studentID: data.studentID,
                    quantity: data.quantity,
                });
                rank += 1;
            });
            this.setState({ rows: rows });
        });
    }

    componentDidMount() {
        this.getTableRows();
    }

    render() {
        const { rows } = this.state;
        return (
            < Table >
                <TableHead>
                    <TableRow>
                        <TableCell>Rank</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Student ID</TableCell>
                        <TableCell>Boxes Returned</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, idx) => (
                        <TableRow key={idx}>
                            <TableCell scope="row" component="th">{row.rank}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.studentID}</TableCell>
                            <TableCell>{row.quantity}</TableCell>
                        </TableRow>
                    ))
                    }
                </TableBody>
            </Table >
        );
    };
}

export default Leaderboard