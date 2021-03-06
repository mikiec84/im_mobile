import React from 'react';
import Component from 'react';
import { Text, View, ScrollView } from 'react-native';
import SearchBar from '../../components/SearchBar';
import Header from '../../components/Header';
import Tile from '../../components/Tile'
import styles from './styles';
import CountryCodes from './../../config/countryCodes';
import CountryToId from './../../config/countryToId';
import images from './../../config/images';
import Routes from '../../config/routes';


class Search extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {searchTerm: "", allTilesArr: []};
  }

  componentDidMount() {
    this.populateTiles(this.state.searchTerm);
  }

  populateTiles(searchTermVal) {
    this.setState({searchTerm: searchTermVal});

    var newArr = [];
    var i = 0;

    if (searchTermVal == "") {
      // No search term, populate with all country tiles
      for (var countryName in CountryToId){
        var countryCode = CountryToId[countryName];
        var tile = this.makeTile(countryName, images.countryIcons[countryCode], i);

        newArr.push(tile);
        i = i + 1;
      }

      this.setState({allTilesArr: newArr});
    } else {
      // Otherwise, filter tiles by search term
      for (var countryName in CountryToId) {
        if (countryName.includes(searchTermVal)) {
          var countryCode = CountryToId[countryName];
          var tile = this.makeTile(countryName, images.countryIcons[countryCode], i);

          newArr.push(tile);
          i = i + 1;
        }
      }
      this.setState({allTilesArr: newArr});
    }
    this.forceUpdate();
  }

  handleSearchTermUpdate(searchTermVal) {
    this.populateTiles(searchTermVal);
  }

  makeTile(countryName, imageDir, i) {
    return (
        <View key = {i}>
        <Tile titleText= {countryName} figureText='' detailText='' imageDir = {imageDir} tileType='country' navigator={this.props.navigator}/>
        </View>
        );
  }

  render() {
    return (
        <View style={styles.container}>
        <Header/>
        <ScrollView>
        <SearchBar updateSearchTerm={this.handleSearchTermUpdate.bind(this)}
        />
        {this.state.allTilesArr}
        </ScrollView>
        </View>
        );
  }
};

Search.propTypes = {
  handleSearchTermUpdateHa: React.PropTypes.func,
};

export default Search;
