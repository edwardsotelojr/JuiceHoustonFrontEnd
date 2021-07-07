import React from "react";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";
import BoxItem from "./BoxItem";

export default class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  handleDrop = (e) => {
    if (this.state.items.length == 1) {
        console.log('here 1')
        return;
      } else {
      let items = this.state.items.slice();
      items.push({ drink: e.dragData.drink });
      this.setState({ items: items });
      e.containerElem.style.visibility = "hidden";
    }
  };



  swap = (fromIndex, toIndex, dragData) => {
      console.log('swap')
    if (this.state.items.length == 1) {
        return;
      } else {
    let items = this.state.items.slice();
    const item = { drink: dragData.drink };
    items.splice(toIndex, 0, item);
    this.setState({ items: items });
      }
  };

  kill = (uid) => {
      console.log('kill')
      if (this.state.items.length == 1) {
        return;
      } else {
    let items = this.state.items.slice();
    const index = items.findIndex((item) => {
      return item.uid == uid;
    });
    if (index !== -1) {
      items.splice(index, 1);
    }
    this.setState({ items: items });
}
  };

  onLeave = () => {
      console.log('onleave')
      this.setState({items: []})
  }

  render() {
    /*
          Note the two layers of DropTarget. 
          This enables it to handle dropped items from 
          outside AND items dragged between boxes.
      */
    return (
      <div className="component_box" style={{ float: "left", width: "140px" }}>
        <DropTarget
          onHit={this.handleDrop}
          targetKey="boxItem"
          dropData={{ name: this.props.name }}
        >
          <div
            className="box"
            style={{
              border: "2px solid black",
              borderRadius: "4px",
              width: "140px",
              height: "276px",
              margin: "10px 80px 0 0",
              position: "relative",
            }}
          >
        {this.state.items.length}

            {this.state.items.map((item, index) => {
              return (
                <BoxItem
                  drink={item.drink}
                  key={index}
                  size={this.state.items.length}
                  uid={item.drink}
                  kill={this.kill}
                  index={index}
                  swap={this.swap}
                ></BoxItem>
              );
            })}
          </div>
        </DropTarget>
      </div>
    );
  }
}
