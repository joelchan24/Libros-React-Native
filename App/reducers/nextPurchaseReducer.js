import uuidV4 from 'uuid/v4'
import { ADD_BOOK, REMOVE_BOOK } from '../actions'

//ACT-2
// dato con el que se va trababar en todas las vistas
const initialState = {
  books: [{"id":uuidV4(),"titulo":"100 Años de Soledad","autor":"Gabriel G.M","genero":"Novela","numeropag":100,"puntuacion":15}
  ,{"id":uuidV4(),"titulo":"cape","autor":"D G.M","genero":"Cuento","numeropag":100,"puntuacion":10},{"id":uuidV4(),"titulo":"Mouestyro","autor":"Angel G.M","genero":"Terror","numeropag":100,"puntuacion":80}],
  novela :1,
  cuento:1,
  terror:1,
  romance:0,
}

//Verificador de acciones 
const bookReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_BOOK:
    
      
       if(action.book.genero==="Novela")
       {
        return {
          books: [
            ...state.books,
            action.book
          ],
         novela:state.novela+1,
          cuento:state.cuento,
          terror:state.terror,
          romance:state.romance
        
        } 
      }else  if(action.book.genero==="Cuento")
      {
       return {
         books: [
           ...state.books,
           action.book
         ],
        novela:state.novela,
         cuento:state.cuento+1,
         terror:state.terror,
         romance:state.romance
       
       } 
     }else  if(action.book.genero==="Terror")
     {
      return {
        books: [
          ...state.books,
          action.book
        ],
       novela:state.novela,
        cuento:state.cuento,
        terror:state.terror+1,
        romance:state.romance
      
      } 
    }else  if(action.book.genero==="Romance")
    {
     return {
       books: [
         ...state.books,
         action.book
       ],
      novela:state.novela,
       cuento:state.cuento,
       terror:state.terror,
       romance:state.romance+1
     
     } 
   }
      
      
     
    
    
    case REMOVE_BOOK:
      const index = state.books.findIndex(book => book.id === action.book.id)
      console.log(action.book);
      if(action.book.genero==="Novela")
      {
      return {

        books: [
          ...state.books.slice(0, index),
          ...state.books.slice(index + 1)
        ],
        novela:state.novela-1,
         cuento:state.cuento,
         terror:state.terror,
         romance:state.romance
      } 
    }else if(action.book.genero==="Cuento")
    {
    return {

      books: [
        ...state.books.slice(0, index),
        ...state.books.slice(index + 1)
      ],
      novela:state.novela,
       cuento:state.cuento-1,
       terror:state.terror,
       romance:state.romance
    }
  }else if(action.book.genero==="Terror")
  {
  return {

    books: [
      ...state.books.slice(0, index),
      ...state.books.slice(index + 1)
    ],
    novela:state.novela,
     cuento:state.cuento,
     terror:state.terror-1,
     romance:state.romance
  }
}else if(action.book.genero==="Romance")
{
return {

  books: [
    ...state.books.slice(0, index),
    ...state.books.slice(index + 1)
  ],
  novela:state.novela,
   cuento:state.cuento,
   terror:state.terror,
   romance:state.romance-1
}
}
    default:
      return state
  }
}

//exportacions del reducers
export default bookReducer
