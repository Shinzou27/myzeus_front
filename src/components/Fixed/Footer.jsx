import { Github } from "react-bootstrap-icons";
import '../../styles/Footer.css';
import { useEffect, useState } from "react";

function Footer({extraClass}) {

    return (
        <>
            {extraClass ?
                <footer className={'bg-dark text-white footer d-flex justify-content-center fixed-bottom'}>
                    <h6 className="mx-5 my-2">Meu Zeus</h6>
                    <Github onClick={() => window.open('https://github.com/Shinzou27/myzeus', '_blank')} className="mx-5 my-2" />
                </footer>

                :
                <footer className={'bg-dark text-white footer d-flex justify-content-center'}>
                    <h6 className="mx-5 my-2">Meu Zeus</h6>
                    <Github onClick={() => window.open('https://github.com/Shinzou27/myzeus', '_blank')} className="mx-5 my-2" />
                </footer>
            }
        </>
    );
}

export default Footer;