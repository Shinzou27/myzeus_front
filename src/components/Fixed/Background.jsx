import '../../styles/Background.css';
import pets from '../../assets/pet_welcome.png'
import pet_paws from '../../assets/pet_paws_bg.png'
import { Image } from 'react-bootstrap';

function Background({type}) {
    let img;
    type == '1' ? img = pets : img = pet_paws;
    return ( 
        <div className={`bg-${type}`} >
            <Image width={1080} src={img} className={`bg-${type}-icon`} />
        </div>
     );
}

export default Background;