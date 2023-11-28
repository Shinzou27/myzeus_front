import { Carousel } from "react-bootstrap";
function PetCarousel({ pets }) {
    return (
        <Carousel>
            {
                pets.map((pet) => (
                    <Carousel.Item className="pet-carousel" interval={2000}>
                        <Carousel.Caption>
                            <h3 className="text-dark">{pet.name}</h3>
                            <p className="text-dark">{pet.breed}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))
            }
        </Carousel>
    );
}

export default PetCarousel;