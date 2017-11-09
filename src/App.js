import React, { Component } from 'react';

import {treeData, treeData2, mockFlatArray, debugData} from './mockData';
//import {Tree, treeUtil} from 'react-d3-tree';
import {Tree, treeUtil} from '../../lib/react-d3-tree'
import './App.css';

const shapes = {
  circle: {
    shape: 'circle',
    shapeProps: {
      r: 10,
    }
  },
  ellipse: {
    shape: 'ellipse',
    shapeProps: {
      rx: 10,
      ry: 20,
    }
  },
  rect: {
    shape: 'rect',
    shapeProps: {
      width: 140,
      height: 20,
      y: -10,
      x: -10
    }
  }
}


class App extends Component {

  constructor() {
    super();

    this.state = {
      data: treeData2,
      nodeSvgShape: {
        shape: 'circle',
        shapeProps: {
          r: 10,
        }
      },
      // pathFunc: (d, orientation) => orientation && `M${d.source.y},${d.source.x}V${d.target.x}H${d.target.y}`,
      circleRadius: undefined,
      orientation: 'horizontal',
      translateX: 200,
      translateY: 300,
      collapsible: true,
      initialDepth: 1,
      depthFactor: undefined,
      zoomable: true,
      scaleExtent: {min: 0.1, max: 1},
      separation: {siblings: 1, nonSiblings: 2},
      nodeSize: {x: 140, y: 140},
      transitionDuration: 500,
      styles: {
        nodes: {
          node: {
            circle: {
              fill: '#D5FAFF',
            },
          },
          leafNode: {
            circle: {
              fill: 'papayawhip',
            }
          }
        }
      }
    };

    this.setTreeData = this.setTreeData.bind(this);
    this.setTreeDataFromCSV = this.setTreeDataFromCSV.bind(this);
    this.setTreeDataFromJSON = this.setTreeDataFromJSON.bind(this);
    this.setTreeDataFromFlatJSON = this.setTreeDataFromFlatJSON.bind(this);
    this.setTreeDataFromFlatArray = this.setTreeDataFromFlatArray.bind(this);
    this.setOrientation = this.setOrientation.bind(this);
    this.setPathFunc = this.setPathFunc.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleShapeChange = this.handleShapeChange.bind(this);
    this.toggleCollapsible = this.toggleCollapsible.bind(this);
    this.toggleZoomable = this.toggleZoomable.bind(this);
    this.setScaleExtent = this.setScaleExtent.bind(this);
    this.setSeparation = this.setSeparation.bind(this);
    this.setNodeSize = this.setNodeSize.bind(this);
  }

  setTreeData(data) {
    this.setState({ data });
  }

  setTreeDataFromCSV(csvFile, attributeFields) {
    treeUtil.parseCSV(csvFile, attributeFields)
    .then((data) => {
      console.log(data);
      this.setState({data})
    })
    .catch((err) => console.error(err));
  }

  setTreeDataFromJSON(jsonFile) {
    treeUtil.parseJSON(jsonFile)
    .then((data) => {
      console.log(data);
      this.setState({data})
    })
    .catch((err) => console.error(err));
  }

  setTreeDataFromFlatJSON(jsonFile, attributeFields) {
    treeUtil.parseFlatJSON(jsonFile, attributeFields)
    .then((data) => {
      console.log(data);
      this.setState({data})
    })
    .catch((err) => console.error(err));
  }

  setTreeDataFromFlatArray(flatArray) {
    const data = treeUtil.generateHierarchy(flatArray);
    console.log(data);
    this.setState({data});
  }

  setOrientation(orientation) {
    this.setState({ orientation });
  }

  setPathFunc(pathFunc) {
    this.setState({ pathFunc });
  }

  handleChange(evt) {
    const target = evt.target;
    const value = parseInt(target.value, 10);
    if (!isNaN(value)) {
      this.setState({
        [target.name]: value,
      });
    }
  }

  handleShapeChange(evt) {
    const targetShape = evt.target.value;
    if (targetShape === 'rect') {
      this.setState({ 
        nodeSvgShape: shapes[targetShape],
        textLayout: {
          textAnchor: 'start',
          x: 0,
          y: 0,
          transform: 'translate(30) rotate(45 50 50)'
        }
      })
    } else {
      this.setState({ nodeSvgShape: shapes[targetShape] })
    }
  }

  toggleCollapsible() {
    this.setState((prevState) =>
      ({ collapsible: !prevState.collapsible })
    );
  }

  toggleZoomable() {
    this.setState(prevState =>
      ({ zoomable: !prevState.zoomable })
    )
  }

  setScaleExtent(scaleExtent) {
    this.setState({ scaleExtent })
  }

  setSeparation(separation) {
    if (!isNaN(separation.siblings) && !isNaN(separation.nonSiblings)) {
      this.setState({ separation })
    }
  }

  setNodeSize(nodeSize) {
    if (!isNaN(nodeSize.x) && !isNaN(nodeSize.y)) {
      this.setState({ nodeSize })
    }
  }

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect()
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: dimensions.height / 2 
      }
    })
  }

  render() {
    return (
      <div className="App">
        <div className="demo-container">
          <div className="column-left">
            <div className="controls-container">
              <div className="prop-container">
                <span className="prop">Data Set:</span>
                <button onClick={() => this.setTreeData(debugData)}>
                  Debug
                </button>
                <button onClick={() => this.setTreeData(treeData)}>
                  TreeData 1
                </button>
                <button onClick={() => this.setTreeData(treeData2)}>
                  TreeData 2
                </button>
                {/* <button onClick={() => this.setTreeData(hierarchy)}>
                  Hierarchy Test
                </button> */}
                <button
                  onClick={() => this.setTreeDataFromCSV('csv-example.csv', ["CSV Attribute A", "CSV Attribute B"])}
                >
                  From CSV File
                </button>
                <button onClick={() => this.setTreeDataFromJSON('json-example.json')}>
                  From JSON File
                </button>
                <button
                  onClick={() => this.setTreeDataFromFlatJSON('flat-json-example.json', ["FlatJSON Attribute A", "FlatJSON Attribute B"])}
                >
                  From Flat JSON File
                </button>
                <button onClick={() => this.setTreeDataFromFlatArray(mockFlatArray)}>
                  From Flat Array
                </button>
                {/* <button onClick={() => this.setTreeData(ast)}>
                  AST (experimental)
                </button> */}
              </div>

              <div className="prop-container">
                <span className="prop">Orientation:</span>
                <button onClick={() => this.setOrientation('horizontal')}>{'Horizontal'}</button>
                <button onClick={() => this.setOrientation('vertical')}>{'Vertical'}</button>
              </div>

              <div className="prop-container">
                <span className="prop">Path Func:</span>
                <button onClick={() => this.setPathFunc('diagonal')}>{'Diagonal'}</button>
                <button onClick={() => this.setPathFunc('elbow')}>{'Elbow'}</button>
                <button onClick={() => this.setPathFunc('straight')}>{'Straight'}</button>
              </div>

              <div className="prop-container">
                <span className="prop">Collapsible:</span>
                <button onClick={this.toggleCollapsible}>
                  {this.state.collapsible.toString()}
                </button>
              </div>

              <div className="prop-container">
                <label className="prop" htmlFor="nodeSvgShape">Node SVG Shape:</label>
                <br/>
                <select onChange={this.handleShapeChange}>
                  <option value="circle">{"<circle />"}</option>
                  <option value="ellipse">{"<ellipse />"}</option>
                  <option value="rect">{"<rect />"}</option>
                </select>
                <textarea
                  style={{ width: '100%', height: '90px'}}
                  name="nodeSvgShape"
                  value={JSON.stringify(this.state.nodeSvgShape, null, 2)}
                  readOnly
                /> 
              </div>

              <div className="prop-container">
                <div>
                  <label className="prop" htmlFor="translateX">Translate X:</label>
                  <input
                    name="translateX"
                    type="number"
                    defaultValue={this.state.translateX}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <label className="prop" htmlFor="translateY">Translate Y:</label>
                  <input
                    name="translateY"
                    type="number"
                    defaultValue={this.state.translateY}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="prop-container">
                <label className="prop" htmlFor="initialDepth">Initial depth on render:</label>
                <input
                  style={{color: 'grey'}}
                  name="initialDepth"
                  type="text"
                  value={this.state.initialDepth || 'maximum'}
                  readOnly
                />
              </div>

              <div className="prop-container">
                <label className="prop" htmlFor="depthFactor">Depth Factor:</label>
                <input
                  name="depthFactor"
                  type="number"
                  defaultValue={this.state.depthFactor}
                  onChange={this.handleChange}
                />
              </div>

              <div className="prop-container prop">
                {`Zoomable: ${this.state.zoomable}`}
              </div>

              <div className="prop-container">
                <span className="prop">Scale Extent:</span>
                <br/>
                <label className="sub-prop" htmlFor="scaleExtentMin">Min:</label>
                <input
                  name="scaleExtentMin"
                  type="number"
                  defaultValue={this.state.scaleExtent.min}
                  onChange={(evt) => this.setScaleExtent({min: parseFloat(evt.target.value), max: this.state.scaleExtent.max})}
                />
                <br />
                <label className="sub-prop" htmlFor="scaleExtentMax">Max:</label>
                <input
                  name="scaleExtentMax"
                  type="number"
                  defaultValue={this.state.scaleExtent.max}
                  onChange={(evt) => this.setScaleExtent({min: this.state.scaleExtent.min, max: parseFloat(evt.target.value)})}
                />
              </div>

              <div className="prop-container">
                <span className="prop">Node separation:</span>
                <br/>
                <label className="sub-prop" htmlFor="separationSiblings">Siblings:</label>
                <input
                  name="separationSiblings"
                  type="number"
                  defaultValue={this.state.separation.siblings}
                  onChange={(evt) => this.setSeparation({siblings: parseFloat(evt.target.value), nonSiblings: this.state.separation.nonSiblings})}
                />
                <br />
                <label className="sub-prop" htmlFor="separationNonSiblings">Non-Siblings:</label>
                <input
                  name="separationNonSiblings"
                  type="number"
                  defaultValue={this.state.separation.nonSiblings}
                  onChange={(evt) => this.setSeparation({siblings: this.state.separation.siblings, nonSiblings: parseFloat(evt.target.value)})}
                />
              </div>

              <div className="prop-container">
                <span className="prop">Node size:</span>
                <br/>
                <label className="sub-prop" htmlFor="nodeSizeX">X:</label>
                <input
                  name="nodeSizeX"
                  type="number"
                  defaultValue={this.state.nodeSize.x}
                  onChange={(evt) => this.setNodeSize({x: parseFloat(evt.target.value), y: this.state.nodeSize.y})}
                />
                <br />
                <label className="sub-prop" htmlFor="nodeSizeY">Y:</label>
                <input
                  name="nodeSizeY"
                  type="number"
                  defaultValue={this.state.nodeSize.y}
                  onChange={(evt) => this.setNodeSize({x: this.state.nodeSize.x, y: parseFloat(evt.target.value)})}
                />
              </div>

              <div className="prop-container">
                <label className="prop" htmlFor="transitionDuration">Transition duration:</label>
                <input
                  name="transitionDuration"
                  type="number"
                  defaultValue={this.state.transitionDuration}
                  onChange={this.handleChange}
                />
              </div>

              <div className="prop-container">
                <label className="prop" htmlFor="circleRadius">Circle radius (legacy):</label>
                <input
                  name="circleRadius"
                  type="number"
                  defaultValue={this.state.circleRadius}
                  onChange={this.handleChange}
                />
              </div>

              {/* <div>
                <label htmlFor="styles">Styles:</label>
                <textarea
                  name="styles"
                  value={JSON.sringify(this.state.styles, null, 2)}
                  onChange={this.onStylesChange}
                />
              </div> */}
            </div>

            {/* <div className="state-container">
              <h4>Current Props:</h4>
              <textarea
                className="state"
                value={JSON.stringify(this.state, null, 2)}
                readOnly
              />
            </div> */}
          </div>

          <div className="column-right">
            <div ref={tc => this.treeContainer = tc} className="tree-container">
              <Tree
                data={this.state.data}
                nodeSvgShape={this.state.nodeSvgShape}
                circleRadius={this.state.circleRadius}
                onClick={this.state.onClick}
                orientation={this.state.orientation}
                translate={{ x: this.state.translateX, y: this.state.translateY }}
                pathFunc={this.state.pathFunc}
                collapsible={this.state.collapsible}
                initialDepth={this.state.initialDepth}
                zoomable={this.state.zoomable}
                scaleExtent={this.state.scaleExtent}
                nodeSize={this.state.nodeSize}
                separation={this.state.separation}
                transitionDuration={this.state.transitionDuration}
                depthFactor={this.state.depthFactor}
                textLayout={this.state.textLayout}
                styles={this.state.styles}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
