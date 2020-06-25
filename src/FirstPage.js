import React, {Component} from 'react';
//import react in our code.
import {
  StyleSheet,
  View,
  Button,
  StatusBar,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  ScrollView,
  FlatList,
  Text,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
//import all the components we are going to use.

export default class FirstPage extends Component {
  state = {
    name: '',
    price: '',
    category: '',
  };
  static navigationOptions = {
    title: 'First Page',
    //Sets Header text of Status Bar
    headerStyle: {
      backgroundColor: '#f4511e',
      //Sets Header color
    },
    headerTintColor: '#fff',
    //Sets Header text color
    headerTitleStyle: {
      fontWeight: 'bold',
      //Sets Header text style
    },
  };

  saveContacts = async () => {
    const {navigate} = this.props.navigation;

    console.log('called ', this.state.category);
    console.log('Price ', this.state.name);
    console.log('category ', this.state.price);

    if (
      this.state.name.trim() === '' ||
      this.state.name.match('/^[a-zA-Z]+$/')
    ) {
      Alert.alert('Please Enter Name');
    } else if (this.state.price.trim() === '') {
      Alert.alert('Please Enter Price');
    } else if (
      this.state.category === 'sc' ||
      this.state.category.trim() === ''
    ) {
      Alert.alert('Please Select Category');
    } else {
      try {
        let con = {
          name: this.state.name,
          price: this.state.price,
          category: this.state.category,
        };
        var product = (await AsyncStorage.getItem('product1')) || '[]';
        product = JSON.parse(product);
        product.push(con);
        console.log('Product ', product);
        AsyncStorage.setItem('product1', JSON.stringify(product)).then(() => {
          console.log('product Add.');
          navigate('SecondPage');
        });
      } catch (error) {
        alert(error);
      }
    }
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={{alignItems: 'center', top: 20}}>
            <Text style={{color: 'red', fontSize: 20}}>Add Product</Text>
            <TextInput
              style={{
                height: 40,
                top: 10,
                width: '90%',
                borderColor: 'gray',
                borderWidth: 1,
              }}
              onChangeText={(text) => this.setState({name: text})}
              placeholder="Enter Name"></TextInput>
            <TextInput
              style={{
                height: 40,
                top: 20,
                width: '90%',
                borderColor: 'gray',
                borderWidth: 1,
              }}
              onChangeText={(text) => this.setState({price: text})}
              placeholder="Enter Price"></TextInput>
            <DropDownPicker
              items={[
                {label: 'Select Category', value: 'sc'},
                {label: 'Clothes', value: 'clothes'},
                {label: 'Electronics', value: 'electronics'},
                {label: 'Beauty', value: 'beauty'},
              ]}
              // defaultValue={category}
              containerStyle={{height: 40, width: '80%'}}
              style={{backgroundColor: '#fafafa', top: 40}}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(item) => this.setState({category: item.value})}
            />
            <TouchableOpacity
              style={{top: 70, backgroundColor: 'red', padding: 10}}
              onPress={() => this.saveContacts()}>
              <Text>SAVE</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
