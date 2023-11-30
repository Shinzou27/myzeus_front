import '../../styles/Background.css';
import dog from '../../assets/animals/dog.svg'
import { Image } from 'react-bootstrap';

function Background({color}) {
    return ( 
        <div className={`bg-${color}`} >
            <Image width={64} src={dog} className='bg-icon' alt="" />
        </div>
     );
}

export default Background;