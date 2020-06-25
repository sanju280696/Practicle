import React, {Component} from 'react';
//import react in our code.
import {
  StyleSheet,
  View,
  AsyncStorage,
  Text,
  FlatList,
  TouchableOpacity,
  Group,
  Button,
} from 'react-native';
//import all the components we are going to use.
import {RadioGroup, RadioButton} from 'react-native-custom-radio-button';
import RadioButton1 from '../src/RadioButton';

const options = [
  {
    key: 'pay',
    text: 'Most High Pay',
  },
  {
    key: 'performance',
    text: 'Most Perfomance',
  },
  {
    key: 'aToZ',
    text: 'A - Z',
  },
  {
    key: 'zToA',
    text: 'Z - A',
  },
];
export default class SecondPage extends Component {
  state = {
    data: '',
    value: 'first',
    text: '',
    filter: '',
    nameCheck: false,
    priceCheck: false,
    categoryCheck: false,
  };
  static navigationOptions = {
    title: 'ShowData Page',
    //Sets Header text of Status Bar
  };

  componentDidMount() {
    console.log('Component did mount!');
    this.getdata();
  }

  getdata = async () => {
    console.log('Component did mount1');
    var data1 = await AsyncStorage.getItem('product1');
    var data2 = JSON.parse(data1);
    this.setState({data: data2});
  };

  byName() {
    const myData = this.state.data.sort(function (a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    });
    this.setState({data: myData});
    console.log('ABC ', myData);
  }

  byPrice() {
    const parsePrice = (x) => parseFloat(x.replace(/^\$/, '')) || 0;
    const price = this.state.data
      .slice()
      .sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    this.setState({data: price});
  }

  byCategory() {
    const uniqueItems = (x, i, a) => a.indexOf(x) === i;
    const PRODUCT_CATEGORIES = this.state.data
      .map((prod) => prod.category)
      .filter(uniqueItems);

    PRODUCT_CATEGORIES.sort(function (a, b) {
      console.log('A ', a);
      console.log('B ', b);
    });
    // this.setState({data: PRODUCT_CATEGORIES});
    console.log('PRODUCT_CATEGORIES ', PRODUCT_CATEGORIES);
  }
  render() {
    if (this.state.data) {
      return (
        <View>
          <View style={styles.container}>
            <View style={styles.buttonContainer}>
              <Button title="By Name A to Z" onPress={() => this.byName()} />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="By priceLow to High"
                onPress={() => this.byPrice()}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="By Catgory" onPress={() => this.byCategory()} />
            </View>
          </View>
          <FlatList
            data={this.state.data}
            renderItem={({item, index}) => {
              return (
                <View elevation={5} style={styles.headerView}>
                  <Text style={{fontSize: 20}}>Name : {item.name}</Text>
                  <Text style={{fontSize: 20}}>Price : {item.price}</Text>
                  <Text style={{fontSize: 20}}>Category : {item.category}</Text>
                </View>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>You are on ShowData</Text>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginRight: 10,
  },
  headerView: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    opacity: 1,
    shadowColor: '#0B69FF29',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1.0,
    shadowRadius: 3.84,
    padding: 10,
  },
  title: {
    fontSize: 20,
  },
});
