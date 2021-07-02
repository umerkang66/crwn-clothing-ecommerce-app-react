import React, { Component } from 'react';
import '../sass/pages/ShopPage.scss';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../components/Spinner.js';
import CollectionsOverview from '../components/CollectionsOverview.js';
import CollectionPage from './CollectionPage.js';
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../firebase/firebase.js';
import { updateShopCollections } from '../redux/actions/shopActions.js';

const CollectionsOverviewWithSpinner = Spinner(CollectionsOverview);
const CollectionPageWithSpinner = Spinner(CollectionPage);

class ShopPage extends Component {
  state = { isLoading: true };
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateShopCollections } = this.props;

    const collectionRef = firestore.collection('collections');
    collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateShopCollections(collectionsMap);
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { match } = this.props;
    const { isLoading } = this.state;

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionsOverviewWithSpinner isLoading={isLoading} {...props} />
          )}
        />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner isLoading={isLoading} {...props} />
          )}
        />
      </div>
    );
  }
}

export default connect(null, { updateShopCollections })(ShopPage);
