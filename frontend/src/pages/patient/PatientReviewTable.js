import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Alert from '@mui/material/Alert';
import useStyles from './styles';
import { Button } from '@mui/material';
import { useDB } from '../../contexts/dbstate';
import { useAuth } from '../../contexts/authcontext';
import { ConfirmDialog } from '../../components';
import Rating from '@mui/material/Rating';

export default function PatientReviewTable(props) {
    const { columns, rows } = props;
    const classes = useStyles();
    console.log(columns);
    console.log(rows);
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { addReviews } = useDB();
    const [confirmDialog, setConfirmDialog] = React.useState({isOpen: false, title: '', subTitle: ''});
    const { currentUser } = useAuth();
        
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleCancel = (email,review) => {
        setConfirmDialog({
            isOpen: true,
            title: 'Rate the user.',
            subTitle: 'Rate the doctor based on your exprience.',
            onConfirm: () => {onCancel(email,review)}
        });
    }

    const onCancel = async(email,review) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        });

        try {
            setError('');
            setLoading(false);
            await addReviews(currentUser.email,email,review);
            // window.location.reload()
        } catch (error) {
            setError('Failed to Rate The User.');   
        }
        setLoading(false);
    }


return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={0}>
            
                {error && <Alert severity="error" sx={{ my: 1, width:'100%' }} >{error}</Alert>}

                <TableContainer sx={{ maxHeight: 440}}>
                    <Table stickyHeader aria-label="sticky table" className={classes.table}>
                    <TableHead>
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                            <TableCell >
                                RATE STATUS
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.name || row.id}>
                                {columns.map((column) => {
                                const value = row[column.id];
                                if(column.id==='review'){
                                        return(
                                            <TableCell>
                                                <Rating name="legend" value={row[column.id]} size="large" onChange={(e,newValue)=>{e.preventDefault();handleCancel(row.email,newValue)}}/>
                                            </TableCell>
                                        );
                                }
                                return (
                                    <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number'
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                );
                                })}
                                {row['review']==='0'?                                    
                                        <TableCell align="start"> 
                                            PLEASE REVIEW YOUR DOCTOR.
                                        </TableCell>:
                                    <TableCell>
                                        YOUR REVIEW IS SUBMITTED.
                                    </TableCell>
                                }
                            </TableRow>
                            );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <ConfirmDialog 
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />

        </>
    );
}