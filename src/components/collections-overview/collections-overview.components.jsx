import React from 'react'; 
import './collections-overview.styles.scss';
import {connect} from 'react-redux';
import CollectionPreview from '../collection-preview/collecction-preview.component'
import {createStructuredSelector} from 'reselect'
import {selectCollections} from '../../redux/shop/shop.selectors'

const CollectionsOverview =({collections})=>(
    <div className='collection-overview'>
        {
            collections.map(({id, ...otherCollectionProps})=>(
            <CollectionPreview key={id} {...otherCollectionProps} />
             ))
        }
    </div>  
);

const mapStateToProps= createStructuredSelector({
    collections:selectCollections
})


export default connect(mapStateToProps)(CollectionsOverview);