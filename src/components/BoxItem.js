import React from 'react';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import './BoxItem.css';

/*
    BoxItem - a thing that appears in a box, after you drag something into the box
*/

export default class BoxItem extends React.Component {
    // the things that appear in the boxes
    constructor(props) {
      super(props);
    }
    
    handleDrop = (e) => {
      e.stopPropagation();
      console.log('handledrop ', this.props.size)
      if(this.props.size == 1){
          return;
      }
      
      this.props.swap(e.dragData.index, this.props.index, e.dragData);
      e.containerElem.style.visibility="hidden";
      
    };
  
    deleteMe = () => {
      this.props.kill(this.props.uid);
    };
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
      /*
        Notice how these are wrapped in a DragDropContainer (so you can drag them) AND
        in a DropTarget (enabling you to rearrange items in the box by dragging them on
        top of each other)
      */

      return (
        <div className="box_item_component">
          <DragDropContainer
              targetKey="boxItem"
              dragData={{drink: this.props.drink, size:this.props.size}}
              onDrop={this.deleteMe}
              disappearDraggedElement={false}
              dragHandleClassName="outer"
            >
              <DropTarget
                onHit={this.handleDrop}
                targetKey="boxItem"
              >
                <div className="outer">
                  <div className="item">
                    <span className="grabber">&#8759;</span>
                    <div>
          Drink{" "}
          {this.listIngredients(this.props.drink)}
        </div>
                  </div>
                </div>
            </DropTarget>
          </DragDropContainer>
        </div>
      );
    }
  }