import React     from 'react';
import { Link } from 'react-router-dom'

import "../styles/scss/listing/_card.scss";

const ListingCard = (props) => {
    const { details } = props;
    if (props.showFavourite && !details.isFavourite) return null;
    const isDetailsPage = props.source === 'detailsPage';
    return(
        <div className="cardWrapper" onClick={() => !isDetailsPage && props.setExpandedView()}>
            <div className="name">
                Name: {details.name}
            </div>
            <div className="gender">
                Gender: {details.gender}
            </div>
            <div className="height">
                Height: {details.height}
            </div>
            {
                !isDetailsPage &&
                <div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            props.toggleFavourite()
                        }}
                    >
                        {details.isFavourite ? "Remove From Favourite" : "Add to Favourite"}
                    </button>
                    <Link to={{
                        pathname: '/details',
                        search: `?name=${details.name}`,
                        state: {
                            details: details
                        }
                    }}>
                        View More Details
                    </Link>
                </div>
            }
            
            {
                (details.isExpanded || isDetailsPage) &&
                <div className="basicInfo">
                    Basic Info:
                    <div className="hair_color">
                        Hair Color: {details.hair_color}
                    </div>
                    <div className="skin_color">
                        GenSkin Color: {details.skin_color}
                    </div>
                    <div className="eye_color">
                        Eye Color: {details.eye_color}
                    </div>
                    <div className="birth_year">
                        Birth Year: {details.birth_year}
                    </div>
                </div>
            }
            {
                isDetailsPage &&
                <div className="additionalInfo">
                    Additional Info:
                    <div>Mass: {details.mass}</div>
                    <div>HomeWorld: {details.homeworld}</div>
                    <div>URL: {details.url}</div>
                    <div>Films: {details.films.join(", ")}</div>
                    <div>Vehicles: {details.vehicles.join(", ")}</div>
                    <div>Species: {details.species.join(", ")}</div>
                    <div>Starships: {details.starships.join(", ")}</div>
                </div>
            }
        </div>
    );
};

export default ListingCard;