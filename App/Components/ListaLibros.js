import React, { Component } from 'react';
import { Alert,FlatList,Text, Button, TextInput,Picker, View, StyleSheet } from 'react-native';
import { DrawerActions } from 'react-navigation';
import uuidV4 from 'uuid/v4';
import { addBook, removeBook } from '../actions'

import { connect } from 'react-redux'
import Books from '../reducers/nextPurchaseReducer';

 class ListaLibros extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      //(Array) fuente de datos del flat list
    datos:[]
    };
  }

 
openDrawer=()=>{
  //this.props.navigation.openDrawer()  ;
  this.props.navigation.toggleDrawer();

}
Seleccionado(value){
alert(value);

}
_orderPuntuacion(){
    
  let d= this.state.datos.sort(function(a,b){
     return a.puntuacion - b.puntuacion; 
     });
    
   this.setState({
       
    datos: d
     
     
     
    
   }); 
 }
 _ordertitulo(){
    
  let d= this.state.datos.sort(function(a,b){
     var x = a.titulo.toLowerCase(), y = b.titulo.toLowerCase();
        
        return x < y ? -1 : x > y ? 1 : 0;
    // return   a.titulo - b.titulo;
        }); 
   this.setState({
       
    datos: d
     
     
     
    
   }); 
 }
 _orderautor(){
    
  const d= this.state.datos.sort(function(a,b){
    var x = a.autor.toLowerCase(), y = b.autor.toLowerCase();
        
        return x < y ? -1 : x > y ? 1 : 0;
    

    });
   this.setState({
       
    datos: d
     
     
     
    
   }); 
 }
 _orderGenero(){
    
  const d= this.state.datos.sort(function(a,b){
     var x = a.genero.toLowerCase(), y = b.genero.toLowerCase();
        
    return x < y ? -1 : x > y ? 1 : 0;
     
   // return   a.genero - b.genero;
    });
   this.setState({
       
    datos: d
     
     
     
    
   }); 
 }
onPickerValueChange=(value, index)=>{
  this.setState(
    {
      language: value
    },
    () => {
     if(value==="autor"){
     
      this._orderautor();
     }
     if(value==="titulo"){
     
       this._ordertitulo();
    }
    if(value==="genero"){
    
       this._orderGenero();
    }
    if(value==="puntuacion"){
     
      this._orderPuntuacion();

    }
     //aqui poner los filtros
    }
  );
}
FlatListItemSeparator = () => {
  return (
    //Item Separator
    <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
  );
};

Eliminar=(id)=>{
  const { books}=this.props
  let datos = books;
  books.map((book, index) => {
    if(book.id===id){
      console.log(book);
return this.removeBook(book);
    }
    return null;
  })
  
  for(var i=0;i<this.state.datos.length;i++){
         
    if(this.state.datos[i].id==id){
     // console.log(this.state.datos[i]);
     
    
       this.state.datos.splice([i][0],1);
     
     //this.state.datos.reduce(id);

    } 
  }
  this.setState({
    datos:this.state.datos
  })
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
  alert("Libro Guardado");
}
//ACT 2 metodo que eliminina un elemento del array de redux 
removeBook = (book) => {
  this.props.dispatchRemoveBook(book)
}
componentDidUpdate(prevProps, prevState) {
  //refresca la lista y se asigna el nuevo valor al array L16
  const { books}=this.props
  let datos = books;
  // Don't forget to compare states
  if (prevState && prevState.datos !== datos) {
    this.setState({datos: datos});
  }
} 

componentDidMount()
//anade el valor de reducers al array de L16
{
  //asigna valores antes de el usuario vea la lista
  //el setEstate asigna los datos al array anterior L16
  const { books}=this.props
  let datos = books;
  this.setState({datos: datos});

}

  render() {
   
  /*   books.map((book, index) => (

     this.state.datos.push(book)
    )); */
    return (
      <View style={styles.container}>
      
<Picker
  /*se usa para ordenar el flatList por lo que seleccione */
  selectedValue={this.state.language}
  style={{height: 50, width:200 ,fontSize:20}}
  onValueChange={this.onPickerValueChange}>
  <Picker.Item label="Autor" value="autor" />
  <Picker.Item label="Título" value="titulo" />
  <Picker.Item label="Género" value="genero" />
  <Picker.Item label="Puntuación" value="puntuacion" />
</Picker>

           <FlatList
           /*Scroll que muestra la lista de los datos .Se utiliza el flatlist 
porque  la lista de datos es ampliable y no tiene una extención fija,en el scroll hay que configurar margenes ,altura etc
,mientras que en el flatList no es necesario 
,es mas rapido cuando se manejan gran cantidad de datos ,  */
           ItemSeparatorComponent={this.FlatListItemSeparator}
          data={this.state.datos}
          renderItem={({item}) => 
          <View style={styles.flatview}>
            <Text style={styles.tamano} >{"Título : "+item.titulo}</Text>
            <Text style={styles.tamano} >{"Autor : "+item.autor}</Text>
            <Text style={styles.tamano} >{"Genero : "+item.genero}</Text>
            <Text style={styles.tamano} >{"Puntuacion : "+item.puntuacion +" %"}</Text>
            <Button onPress={() =>this.Eliminar(item.id)} title="Eliminar"/>

          </View>
          }
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    backgroundColor: '#ecf0f1',
  },flatview: {
    justifyContent: 'center',
    paddingTop: 10,
    borderRadius: 2,
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  tamano:{
    fontSize:20,
    color:'blue'
  }
});


const mapDispatchToProps = {
  dispatchAddBook: (book) => addBook(book),
  dispatchRemoveBook: (book) => removeBook(book)
}

const mapStateToProps = (state) => ({
  
  books: state.bookReducer.books
  
})


export default connect(mapStateToProps, mapDispatchToProps)(ListaLibros)