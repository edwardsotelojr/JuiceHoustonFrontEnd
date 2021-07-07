import React from 'react';
import { DragDropContainer } from 'react-drag-drop-container';

/*
    Boxable -- a thing you can drag into a Box
*/

export default class Boxable extends React.Component {
    listIngredients(drink) {
        const list = Object.keys(drink).map((p, index) => {
          if (drink[p] > 0) {
            return (
              <div key={index}>
                <p key={index}>
                  {p}: {drink[p]}oz.
                </p>
              </div>
            );
          }
        });
        return list;
      }

    render() {
      return (
        <div className="boxable_component" style={{display: 'inline-block', 
                                       borderStyle: 'solid', borderColor: 'red',
                                        borderRadius: '12px'}}>
          <DragDropContainer
            targetKey='boxItem'
            dragData={{drink: this.props.drink}}
            customDragElement={this.props.customDragElement}
            onDragStart={()=>(console.log('start'))}
            onDrag={()=>(console.log('dragging'))}
            onDragEnd={()=>(console.log('end'))}
            onDrop={(e)=>(console.log(e))}
          >  
          <div>
          Drink{" "}
          {this.listIngredients(this.props.drink)}
        </div>
          </DragDropContainer>
        </div>
      );
    }
  }