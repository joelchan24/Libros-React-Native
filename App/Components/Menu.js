import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './Menu.style';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View} from 'react-native';
import { StackNavigator } from 'react-navigation';

class Menu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.sectionHeadingStyle}>
            LIBRAPP
            </Text>
            {/* LISTA DEL MENU DE NAVEGACION */}
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('AgregarLibro')}>
              Agregar Libro
              </Text>
            </View>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('ListaLibros')}>
              Lista De Libros
              </Text>
            </View>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Estadisticas')}>
              Estadísticas
              </Text>
            </View>
          </View>
       
            
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text>This is my fixed footer</Text>
        </View>
      </View>
    );
  }
}

Menu.propTypes = {
  navigation: PropTypes.object
};

export default Menu;