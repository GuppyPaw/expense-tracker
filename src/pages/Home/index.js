import { Link } from 'react-router-dom'
import './index.scss';
import { Card, CardActionArea, CardContent, Paper } from '@mui/material';
import {categories} from '../../data/categories';

const Home = () => {

    return (
        <div className="home-page">
            <div className="text-zone">
                <h1>wallet.</h1>
            </div>
            <Paper className='container'>
                <Card>
                    <CardActionArea>
                        <CardContent>
                            <div className='card-title'>Total</div>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Paper>
                    Ingresos
                </Paper>
                <Paper>
                    Gastos
                    <div className='expenses'>
                    {categories.map((category) => {
                        return(
                        <Card className='category'>
                            <CardActionArea>
                                <div className='card-title'>{category.name}</div>
                            </CardActionArea>
                        </Card>
                        )
                    })}
                    </div>
                </Paper>
            </Paper>
        </div>
    );
}

export default Home