import '../../styles/Background.css';
import pets from '../../assets/pet_welcome.png'
import { Image } from 'react-bootstrap';

function Background({color}) {
    return ( 
        <div className={`bg-${color}`} >
            <Image width={1080} src={pets} className='bg-icon' alt="" />
        </div>
     );
}

export default Background;