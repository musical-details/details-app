import React from "react";
import "./moment-editor.scss";


class MomentEditor extends React.Component {
  constructor(props: string) {
    super(props);
  }

  render() {
    return (
      <div className="moment-editor-container">
        <div className="moment-editor-left">
            <div className="moment-name-input-container">
                <input type="text" className="moment-name-input" placeholder="moment-name"/>
            </div>
            <div className="moment-description-container">
                <input type="text" className="moment-description-input" placeholder="Add description about your moment... "/>
            </div>
            <div className="moment-colors-grid">

            </div>
            <div className="moment-reactions-container">

            </div>
        </div>
        <div className="moment-editor-divider-container">
            <div className="moment-editor-divider"></div>
        </div>
        <div className="moment-editor-right">

        </div>
      </div>
    );
  }
}

export default MomentEditor;