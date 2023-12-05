import { Github } from "react-bootstrap-icons";
import '../../styles/Footer.css';

function Footer() {
    return ( 
        <footer className="bg-dark text-white footer d-flex justify-content-center">
            <h6 className="mx-5 my-2">Meu Zeus</h6>
            <Github className="mx-5 my-2"/>
        </footer>
     );
}

export default Footer;