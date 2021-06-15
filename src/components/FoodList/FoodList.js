import './FoodList.css';


function FoodList(props) {     
    return (       
      <div className='container '>
        <div className='image-list '> 
          <div className='image-view '>  
            <img alt='food'  src={props.imgUrl} /> 
          </div>
          <section className='' >
            <ul className='' style={{overflowY: 'auto'}} > 
              <li className=''>
                <b>Predicted food</b> 
                <b>Probability</b> 
              </li> 
              { 
                props.ingredientArray.length > 0 &&
                  props.ingredientArray.map(food => {
                    return (
                      <li key={food.id}  >
                        <span> {food.name} </span> 
                        <span> {food.value.toFixed(3)} </span> 
                      </li>
                    )
                  })
                 
              }
            </ul> 
         </section> 
        </div>
       
      </div> 
  
    );
}


export default FoodList;
