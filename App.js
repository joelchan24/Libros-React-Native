/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, Dimensions ,TouchableOpacity,TouchableHighlight
} from 'react-native';

//$ librerias de react navigation 17/12/2019
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import { createStackNavigator, HeaderTitle } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Menu from './App/Components/Menu';
import AgregarLibro from './App/Components/AgregarLibro';
import ListaLibros from './App/Components/ListaLibros';
import Estadisticas from './App/Components/Estadisticas';

//$ esta el import de los iconos
import Icon from 'react-native-vector-icons/FontAwesome5';

//ACT2- se importa las librerias de Redux 
import rootReducer from './App/reducers'

import { Provider } from 'react-redux'
import { createStore } from 'redux'

//$ stackDrawer muestra el menu en las vistas que esten dentro de createDrawerNavigator
//menu izquierdo:agregarlibro,lista libro,estadisticas
const  MenuDrawer =  createDrawerNavigator ({
   
  AgregarLibro:  AgregarLibro ,
  ListaLibros:ListaLibros,
  Estadisticas:Estadisticas,
  


},
{
  //diseño del emcabezado
  contentComponent: props => <Menu {...props}/>,
  drawerWidth: Dimensions.get('window').width - 100,  
  navigationOptions: ({navigation}) => ({
    headerStyle: {backgroundColor: '#A499B3'},
    title: 'LibrApp',
    headerTintColor:'#00008b',
    headerTitleStyle: {
      fontSize: 30,     
  },
    gesturesEnabled: false,
/* evento que abre el menu openDrawer */
    headerLeft:<TouchableHighlight onPress={()=>{navigation.openDrawer();}}>
    <View >
      {/*icono izquierdo de la cabecera  */}
    <Icon name="bars" size={30} color="#900" />
        
    </View>
</TouchableHighlight>
    
  })
   
}

); 
//$ el navegador de vistas
const stack = createStackNavigator(
{        
 Main: MenuDrawer,
  

 Menu:AgregarLibro

}
);

const AppContainer = createAppContainer(stack)
//ACT 2 se crea el store ,conector de la aplicación de redux
//Se encierra el AppContainer de la etiqueta PROVIDER  que se importa en la parte de arriba 
const store = createStore(rootReducer)
const App: () => React$Node = () => {
  return (
    <Provider store={store} >
    <AppContainer/>
   
    </Provider>
  );
};



export default App;
