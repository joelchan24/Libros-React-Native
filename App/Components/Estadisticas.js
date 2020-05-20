import React, { Component,useState, useEffect  } from 'react';
import { Alert, Button, Text,TextInput, View, StyleSheet,Dimensions,ScrollView  } from 'react-native';
import { DrawerActions } from 'react-navigation';

import { addBook, removeBook } from '../actions'

import { connect } from 'react-redux'
import Books from '../reducers/nextPurchaseReducer';
//libreria que importa las estadisticas
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
const val={
  novela:0,
  cuento:0,
  terror:0,
  romace:0,
  sta:false,
  datos:[]
  };
class Estadisticas extends Component {
  constructor(props) {
    super(props);
    
    this.state = val;
  }
openDrawer=()=>{
  //this.props.navigation.openDrawer()  ;
  this.props.navigation.toggleDrawer();

}




  render() {
    //calculo del # de tipo libro se hace en nextpurcherReducer.js
    const { books,novela,cuento,terror,romance}=this.props 
 


    return (
      <View style={styles.container}>
        {/*Ejemplos de estadisticas piechar,linechar y barchar */}
        <ScrollView style={styles.scrollView}>
       {/*  <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                padding: 16,
                marginTop: 16,
              }}>
              Line Chart
            </Text>
            <LineChart
              data={{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                ],
                datasets: [
                  {
                    data: [20, 45, 28, 80, 99, 43],
                    strokeWidth: 2,
                  },
                ],
              }}
              width={Dimensions.get('window').width - 16}
              height={220}
              chartConfig={{
                backgroundColor: '#1cc910',
                backgroundGradientFrom: '#eff3ff',
                backgroundGradientTo: '#efefef',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            /> */}
             <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                padding: 16,
                marginTop: 16,
              }}>
              Libros
            </Text>
            <PieChart
              data={[
                {
                  name: 'Terror',
                  population: terror,
                  color: 'rgba(131, 167, 234, 1)',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'Novelas',
                  population: novela,
                  color: '#F00',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'Cuentos',
                  population: cuento,
                  color: '#ffffff',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'Romance',
                  population: romance,
                  color: 'rgb(0, 0, 255)',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
              ]}
              width={Dimensions.get('window').width - 16}
              height={220}
              chartConfig={{
                backgroundColor: '#1cc910',
                backgroundGradientFrom: '#eff3ff',
                backgroundGradientTo: '#efefef',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute //for the absolute number remove if you want percentage
            /> 
               <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                padding: 16,
                marginTop: 16,
              }}>
              Libros
            </Text>
            <BarChart
              /*  fuentes de datos de la grafica que en futuro puede ser el array de una API */
              data={{
                //Etiquetas
                labels: [
                  'Terror',
                  'Novelas',
                  'Cuentos',
                  'Romance',
                  
                ],
                //Valores
                datasets: [
                  {
                    data: [terror, novela, cuento, romance],
                  },
                ],
              }}
              width={Dimensions.get('window').width - 16}
              height={320}
              yAxisLabel={''}
              //estilos 
              chartConfig={{
                backgroundColor: '#1cc910',
                backgroundGradientFrom: '#eff3ff',
                backgroundGradientTo: '#efefef',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
             </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: '#ecf0f1',
  }, scrollView: {
   
    marginHorizontal: 20,
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});


const mapDispatchToProps = {
  dispatchAddBook: (book) => addBook(book),
  dispatchRemoveBook: (book) => removeBook(book)
}

const mapStateToProps = (state) => ({
  
   books: state.bookReducer.books,
   novela:state.bookReducer.novela,
   cuento:state.bookReducer.cuento,
  terror:state.bookReducer.terror,
  romance:state.bookReducer.romance 

  
})


export default connect(mapStateToProps, mapDispatchToProps)(Estadisticas)