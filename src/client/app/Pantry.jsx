import React      from 'react'


export default class Pantry extends React.Component {

  render(){
    return (
      <div className="pantry">
        <h3>Pantry Items</h3>
          {this.props.pantryThing.map((reci,i)=>{
            return(
              <div className="image_container" key={i}>
                <h4>{reci.ingredient_name}</h4>
              </div>
            )
          })
          }
      </div>
    )
  }
}

