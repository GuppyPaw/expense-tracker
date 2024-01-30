import './index.scss';
import { Paper } from '@mui/material';
import { addMovement, getCategories, getMovementsTotal } from '../../server/Movements';
import { getToken } from '../../server/Auth';
import Modal from '../../components/Modal';
import Card from '../../components/Card';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = props => {

    const [selectedCategory, setSelectedCategory] = useState({})
    const [income, setIncome] = useState([])
    const [expense, setExpense] = useState([])
    const [total, setTotal] = useState(0)
    const [open, setOpen] = useState(false);
    const [moveInfo, setMoveInfo] = useState({
        name:'',
        category:'',
        amount:0
    });
    const navigate = useNavigate();

    useEffect(() => {
        authToken()
        getInfo()
    },);

    const getInfo = () => {
        getCategoryInfo()
        getMoveTotalInfo()
    }

    const authToken = () => {
        if(!getToken()) navigate('/expenses/login');
    }

    const handleModalClose = () => {
        setMoveInfo({
            name:'',
            category:'',
            amount:0
        });
        setOpen(false)
    }
    const handleModalOpen = (category) => {
        setSelectedCategory(category)
        setMoveInfo({...moveInfo, category:category.id})
        setOpen(true)
    }

    const getCategoryInfo = async() => {
        try {
            const authToken = getToken()
            const categories = await getCategories(authToken)
            separateCategories(categories)
        } catch (error) {
            console.error(error)
        }
    }

    const separateCategories = categories => {
        const incomeCategories = categories.filter(category => category.type === 'income');
        const expenseCategories = categories.filter(category => category.type === 'expense');
        
        setIncome(incomeCategories)
        
        setExpense(expenseCategories)
    }

    const getMoveTotalInfo = async() => {
        try {
            const authToken = getToken()
            const movTotal = await getMovementsTotal(authToken)
            calcTotal(movTotal)
        } catch (error) {
            console.error(error)
        }
    }

    const calcTotal = movTotal => {
        const updatedTotal = movTotal.total_income - movTotal.total_expense
        setTotal(updatedTotal)
    }

    const handleSubmit = async() => {
        await addMovement(moveInfo, getToken())
        .then(response => console.log(response))
        .catch(error => console.error(error))

        handleModalClose()
        getInfo()
    }

    return (
        <div className="home-page">
            <div className="text-zone">
                <h1>wallet.</h1>
            </div>
            <Paper className='container'>
                <div className='total'>${total}</div>
                <Paper className='category-box'>
                    {income.map((category) => {
                        return(
                            <Card 
                            key={category.id}
                            category={category} 
                            cardWidth={(100/income.length)-3 + '%'} 
                            handleModalOpen={handleModalOpen}
                            />
                        )
                    })}
                </Paper>
                <Paper className='category-box'>
                    {expense.map((category) => {
                        return(
                            <Card 
                            key={category.id}
                            category={category} 
                            cardWidth={(100/expense.length)-3 + '%'} 
                            handleModalOpen={handleModalOpen}
                            />
                        )
                    })}
                </Paper>
            </Paper>
            <Modal 
            selectedCategory={selectedCategory}
            handleModalClose={handleModalClose}
            handleSubmit={handleSubmit}
            moveInfo={moveInfo}
            setMoveInfo={setMoveInfo}
            open={open}
            />
        </div>
    );
}

export default Home