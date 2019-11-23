import React from 'react';

import ListingCard from '../components/ListingCard';

const CharacterDetails = (props) => {
    const { details } = props.history.location.state;
    return (
        <div>
           <ListingCard
              details={details}
              source={'detailsPage'}
            />
        </div>
    );
};

export default CharacterDetails;
