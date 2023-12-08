import { Github } from "react-bootstrap-icons";
import '../../styles/Footer.css';
import { useEffect, useState } from "react";

function Footer() {
    const [extraClass, setExtraClass] = useState('');
    useEffect(() => {
        if (['/newpet', '/new', '/dashboard', '/profile'].includes(location.pathname)) {
            setExtraClass('fixed-bottom')
        } else {
            setExtraClass('');
        }
    }, [])
    return (
        <footer className={`bg-dark text-white footer d-flex justify-content-center ${extraClass}`}>
            <h6 className="mx-5 my-2">Meu Zeus</h6>
            <Github onClick={() => window.open('https://github.com/Shinzou27/myzeus', '_blank')} className="mx-5 my-2" />
        </footer>
    );
}

export default Footer;