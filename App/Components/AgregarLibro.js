import React, { Component } from 'react';
import { Alert, Button, Text, TextInput, View, StyleSheet, Picker,TouchableOpacity, ScrollView } from 'react-native';
import { DrawerActions } from 'react-navigation';
import { Colors } from 'react-native/Libraries/NewAppScreen';

//ACT 2- importa las acciones 
import { addBook, removeBook } from '../actions'
//ACT 2- se importa el conector de redux 
import { connect } from 'react-redux'

const initialState = {
  titulo: '',
      autor: '',
      genero: 'Novela',
      numeropaginas: 0,
      puntuacion: 0,
      //variable que sirve para ocultar los campos de detalles 
      ocultar: false


}

class AgregarLibro extends Component {
  state = initialState


  //Funcion flecha que cambia
  agregarlibro = () => {


    this.setState({
      ocultar: true
    });

  }
  //funcion simple
  /*
  agregarlibro(parametros){
  
    this.setState({
      ocultar:true
     });
  }
  */



  //funcion flecha
  /* incrementCount=(var)=> {

    
      this.setstate({ count: state.count + 1})
    }); */



  //funcion normal
  /*  incrementCount(var) {
     this.setState((state) => {
       // Importante: lee `state` en vez de `this.state` al actualizar.
       return {count: state.count + 1}
     });
   } */

  //se agregan los valores de los campos al array
  agregarTodo = () => {
    let libro = { "titulo": this.state.titulo, "autor": this.state.autor, "genero": this.state.genero, "numeropag": +this.state.numeropaginas, "puntuacion": +this.state.numeropaginas };
    this.state.ListaLibros.push(libro);
  }

  updateInput = (key, value) => {
    this.setState({
      ...this.state,
      [key]: value
    })
  }

  //ACT 2 metodo que agrega el array a redux
  addBook = () => {

    this.props.dispatchAddBook(this.state)
    this.setState(initialState)
    state = initialState
    alert("Libro Guardado");
  }
//ACT 2 metodo que eliminina un elemento del array de redux 
  removeBook = (book) => {
    this.props.dispatchRemoveBook(book)
  }
  onTextChangedPuntuation(text) {
    // code to remove non-numeric characters from text
    let v=parseInt(text);
    this.setState({puntuacion: v})
  }


  render() {
  

    return (

      <View style={styles.container}>
       

        <ScrollView style={styles.scrollView}>
          <View>
            <Text style={styles.tamañoletra}>Titulo</Text>
            <TextInput style={styles.tamañoletra}
            onChangeText={(text) => this.setState({titulo: text})}             
              placeholder="Título"
              editable
              maxLength={40}
              value = {this.state.titulo}
            />
            <Text style={styles.tamañoletra} >Autor</Text>
            <TextInput style={styles.tamañoletra}
          
             onChangeText={(text) => this.setState({autor: text})}
              placeholder="Autor"
              editable
              maxLength={40}
              value = {this.state.autor}
            />
            <Button
              title={'Agregar'}
              style={styles.input}
              onPress={this.agregarlibro}
            />
          </View>
          {/* ocular ==  true muestra los detalles y ocultar == false no los muestra */}
          {this.state.ocultar ?
            <View >
              <Text style={styles.tamañoletra2}>Género</Text>
              <Picker
              /*se usa para ordenar el flatList por lo que seleccione */
              selectedValue={this.state.genero}
              style={{height: 50, width:200}}
              onValueChange={genero => this.setState({ genero })}
              >
              <Picker.Item label="Novela" value="Novela" />
              <Picker.Item label="Cuento" value="Cuento" />
              <Picker.Item label="Romance" value="Romance" />
              <Picker.Item label="Terror" value="Terror" />
            </Picker> 
              {/* <TextInput style={styles.tamañoletra2}
                onChangeText={genero => this.setState({ genero })}
                placeholder="Género"
                editable
                maxLength={40}
              /> */}
                        
              
              <Text style={styles.tamañoletra2} >Número páginas </Text>
              <TextInput style={styles.tamañoletra2}
              keyboardType="numeric"            
              onChangeText={(text) => this.setState({numeropaginas: text})}
                placeholder="número páginas"
                editable
                value = {this.state.numeropaginas}
              />
              <Text style={styles.tamañoletra2} >Puntuación</Text>
              <TextInput style={styles.tamañoletra2}
           
               onChangeText={(text) => this.setState({puntuacion: +text})}
                numeric
                placeholder="Puntuación"
                keyboardType="numeric"
               value = {this.state.puntuacion}
              />

              <Button
                title={'Guardar'}
                style={styles.input}
                onPress={this.addBook}
              />
            </View> : null
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',

  }, scrollView: {
    //https://facebook.github.io/react-native/docs/scrollview
    marginHorizontal: 20,
  },
  tamañoletra: {
    fontSize: 30,
    //https://facebook.github.io/react-native/docs/text color 
    color: 'red'
  },
  tamañoletra2: {
    fontSize: 20,
    //https://facebook.github.io/react-native/docs/text color 
    color: 'blue'
  }

});

//ACT 2- MAPEA LOS METODOS
const mapDispatchToProps = {
  dispatchAddBook: (book) => addBook(book),
  dispatchRemoveBook: (book) => removeBook(book)
}
//ACT 2 -MAPEA LOS DATOS 
const mapStateToProps = (state) => ({
  books: state.bookReducer.books
})

//ACT 2 CONECTARLOS A REDUX 
export default connect(mapStateToProps, mapDispatchToProps)(AgregarLibro)