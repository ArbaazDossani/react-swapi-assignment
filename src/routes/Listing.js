import React, { useEffect, useState, useLayoutEffect, Fragment, useRef } from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {
  getListingData,
  setExpandedView,
  toggleFavourite,
  setListingData,
  setSearchText
} from '../redux/actions/listingAction';

import LoadingComponent from '../components/LoadingComponent';
import ListingCard from '../components/ListingCard';

const Listing = (props) => {
  const [ showFavourite, setShowFavourite ] = useState(false);
  const { results, ajaxCallInProgress, searchText } = props.listing;
  const searchRef = useRef();

  useEffect(() => {
    if(props.listing.results.length === 0) {
      props.getListingData();
    }
  }, []);

  useLayoutEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !showFavourite) {
        props.getListingData(false);
     }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [results]);
  
  return (
    <div>
      <Fragment>
        <div>
          <input
            type="text"
            ref={searchRef}
            disabled={ajaxCallInProgress > 0}
            placeholder="Search Character here..."
            onChange={(e) => props.setSearchText(e.target.value)}
          />
          <button
            onClick={() => {
              if(searchText) {
                props.getListingData()
              }
            }}
            disabled={ajaxCallInProgress > 0}
          >
            Search
          </button>
          <button
            disabled={ajaxCallInProgress > 0}
            onClick={() => {
              searchRef.current.value = '';
              props.setSearchText("");
              props.getListingData();

            }}
          >
            Reset Search
          </button>
        </div>
        <label> 
          <input
            type='checkbox' onClick={(e) => {
              setShowFavourite(e.target.checked)
            }}
          />
            Show Only Favourite
        </label>
      </Fragment>
      <div className={ajaxCallInProgress ? 'fade' : ''}>
        {
          results.map((details, i) => {
            return (
              <ListingCard
                key={i}
                details={details}
                setExpandedView={() => props.setExpandedView(i)}
                toggleFavourite={() => props.toggleFavourite(i)}
                showFavourite={showFavourite}
              />
            )
          })
        }
      </div>
      {ajaxCallInProgress > 0 && <LoadingComponent />}
      {
        ajaxCallInProgress === 0 && results.length === 0 &&
        <div>
          No Data Found
        </div>
      }
    </div>
  )
};

const mapStateToProps = state => ({
  listing: state.listing,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getListingData,
  setExpandedView,
  toggleFavourite,
  setListingData,
  setSearchText
}, dispatch)

export default connect(
    mapStateToProps, 
    mapDispatchToProps
  )(Listing);
