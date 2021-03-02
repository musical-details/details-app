import * as React from 'react';
import { IInputState } from './IInputState';
import { IInputProps } from './IInputProps';
import styles from './Input.module.scss';

class Input extends React.Component<IInputProps, IInputState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <div className={`${styles.input}`}>
        <h3>Input Component!</h3>
      </div>
    );
  }
}

export default Input;
