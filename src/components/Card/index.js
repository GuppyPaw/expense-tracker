import { Card, CardActionArea } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './index.scss'
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

const CardHome = props => {

    const {category, cardWidth, handleModalOpen} = props;
    
    return (
        <Card sx={{backgroundColor: category.type === 'income' ? '#06D6A0' : '#F87666', width: cardWidth}} className='card'>
            <CardActionArea className='card-content' onClick={e => handleModalOpen(category)}>
                <div className='top'>
                    <FontAwesomeIcon icon={category.logo || faQuestion}/>
                    <div className='card-title'>&nbsp;{category.name}</div>
                </div>
                <div className='bottom'>$ {category.total_amount}</div>
            </CardActionArea>
        </Card>
    )
}

export default CardHome