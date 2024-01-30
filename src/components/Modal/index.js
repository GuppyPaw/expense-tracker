import { Button, Box, Divider, OutlinedInput, InputAdornment, FormControl, InputLabel } from '@mui/material';
import Modal from '@mui/material/Modal';
import './index.scss'

const ModalHome = props => {

    const {selectedCategory, open, handleModalClose, handleSubmit, moveInfo, setMoveInfo} = props;

    const handleAmountChange = (e) => {
        setMoveInfo({ ...moveInfo, amount: e.target.value });
    };

    const handleNameChange = (e) => {
        setMoveInfo({ ...moveInfo, name: e.target.value });
    };
    
    const isAmountValid = moveInfo.amount !== 0 && moveInfo.amount !== '';
    const isNameValid = moveInfo.name !== '';

    return(
        <Modal
            open={open}
            onClose={handleModalClose}
        >
        <Box className="modal-responsive">
            <div className='modal-content'>
                <h1 style={{color:selectedCategory.color}}>{selectedCategory.name}</h1>
                <FormControl className='form-input' fullWidth required error={!isNameValid}>
                    <InputLabel htmlFor='name'>Name</InputLabel>
                    <OutlinedInput
                        id="name"
                        label="Amount"
                        onChange={handleNameChange}
                        autoComplete='Ejemplo'
                    />
                </FormControl>
                <FormControl className='form-input' fullWidth required error={!isAmountValid}>
                    <InputLabel  htmlFor='amount'>Amount</InputLabel>
                    <OutlinedInput
                        id="amount"
                        type='number'
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Amount"
                        onChange={handleAmountChange}
                        inputProps={{min:0}}
                        autoComplete='0'
                    />
                </FormControl>
            </div>
            <Divider/>
            <footer>
            <div>
                <Button variant="contained" color="success" onClick={handleSubmit} disabled={!isAmountValid || !isNameValid}>
                    Add
                </Button>
                <Button variant="contained" color="error" onClick={handleModalClose}>
                    Close
                </Button>
            </div>
            </footer>
        </Box>
        </Modal>
    )
}

export default ModalHome;