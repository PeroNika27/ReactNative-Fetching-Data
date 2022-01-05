import React, {Component} from 'react';
import {
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  View,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  async getData() {
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        //await axios karena pakai axios
        params: {
          country: 'us',
          category: 'business',
          apiKey: 'ee9749d852b14e0cbc7d9b3efc727b7c',
        }, //tergantung API yang digunakan pakai header, params, body/authorization
      });
      this.setState({data: response.data.articles}); //data dari API dimasukkan dalam state yang bernama data
    } catch (error) {
      alert(error.message);
    }
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const {data} = this.state;

    return (
      <>
        <SafeAreaView>
          <ScrollView>
            {data &&
              data.map((item, i) => {
                return (
                  <View key={item.title + i}>
                    <View style={styles.container}>
                      <Image
                        style={styles.ShowImage}
                        source={{uri: item.urlToImage}}
                      />
                      <View>
                        <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
                        <Text>By: {item.author}</Text>
                      </View>
                    </View>
                  </View>
                );
              })}
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {margin: 15, flexDirection: 'row'},
  ShowImage: {width: 70, height: 70, marginRight: 20},
});
