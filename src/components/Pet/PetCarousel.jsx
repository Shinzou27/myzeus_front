import { Carousel, Image } from "react-bootstrap";

function PetCarousel({ pets }) {
    return (
        <Carousel>
            {
                pets.map((pet) => (
                    <Carousel.Item key={pet.id} className="pet-carousel" interval={2000}>
                        <Image width={32} src={`./src/assets/animals/${pet.type}.png`}/>
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